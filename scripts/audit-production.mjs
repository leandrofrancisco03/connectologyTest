import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { parse } from 'parse5';

// Read-only HTTP audit. Does not submit forms, deploy, or request Google indexing.
const origin = 'https://connectologyia.pages.dev';
const run = promisify(execFile);
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const nodesOf = node => [node, ...(node.childNodes || []).flatMap(nodesOf)];
const attr = (node, key) => node?.attrs?.find(a => a.name === key)?.value;
const content = node => node?.nodeName === '#text' ? node.value : (node?.childNodes || []).map(content).join('');
const locs = xml => [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map(m => new URL(m[1]).href);

async function request(url, method = 'GET') {
  if (new URL(url).origin !== origin) throw new Error('Unexpected host: ' + url);
  const dir = await mkdtemp(join(tmpdir(), 'connectology-seo-'));
  try {
    const args = ['--silent', '--show-error', '--max-time', '25', '--proto', '=https',
      '--dump-header', join(dir, 'headers'), '--output', join(dir, 'body'), '--write-out', '%{http_code}'];
    if (method === 'HEAD') args.push('--head');
    const { stdout } = await run('curl', [...args, url], { maxBuffer: 1024 * 1024 });
    const rawHeaders = await readFile(join(dir, 'headers'), 'utf8');
    const headers = {};
    for (const line of rawHeaders.split(/\r?\n/)) {
      const match = /^([^:\s]+):\s*(.*)$/.exec(line);
      if (match) { const key = match[1].toLowerCase(); headers[key] = headers[key] ? headers[key] + ', ' + match[2] : match[2]; }
    }
    return { url, method, status: Number(stdout), location: headers.location || null,
      xRobotsTag: headers['x-robots-tag'] || null, contentType: headers['content-type'] || null,
      body: method === 'GET' ? await readFile(join(dir, 'body'), 'utf8') : '' };
  } finally {
    const target = resolve(dir);
    if (dirname(target) !== resolve(tmpdir()) || !basename(target).startsWith('connectology-seo-')) throw new Error('Unsafe temporary path');
    await rm(target, { recursive: true, force: true });
  }
}

async function follow(url, method = 'GET') {
  const hops = [];
  const seen = new Set();
  for (let i = 0; i < 6; i++) {
    if (seen.has(url)) throw new Error('Redirect loop: ' + url);
    seen.add(url);
    const response = await request(url, method);
    const { body, ...hop } = response;
    hops.push(hop);
    if (![301, 302, 303, 307, 308].includes(response.status)) return { ...response, hops };
    if (!response.location) throw new Error('Redirect without Location: ' + url);
    url = new URL(response.location, url).href;
  }
  throw new Error('Too many redirects: ' + url);
}

function inspect(response) {
  const nodes = nodesOf(parse(response.body));
  const tags = tag => nodes.filter(n => n.tagName === tag);
  const meta = name => tags('meta').filter(n => attr(n, 'name')?.toLowerCase() === name).map(n => attr(n, 'content'));
  const schemaIssues = [];
  let schemaCount = 0;
  function visit(value) {
    if (Array.isArray(value)) return value.forEach(visit);
    if (value && typeof value === 'object') return Object.values(value).forEach(visit);
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      const url = new URL(value);
      if (/localhost|127\.0\.0\.1|connectologyia/.test(url.hostname) && url.origin !== origin) schemaIssues.push(value);
    }
  }
  for (const script of tags('script').filter(n => attr(n, 'type') === 'application/ld+json')) {
    try { schemaCount++; visit(JSON.parse(content(script))); } catch (error) { schemaIssues.push(error.message); }
  }
  const canonicals = tags('link').filter(n => attr(n, 'rel') === 'canonical').map(n => attr(n, 'href'));
  const ogUrls = tags('meta').filter(n => attr(n, 'property') === 'og:url').map(n => attr(n, 'content'));
  return { title: tags('title').map(content), description: meta('description'), canonicals, ogUrls,
    robots: [...meta('robots'), ...meta('googlebot')], h1: tags('h1').map(content),
    mainTextLength: content(tags('main')[0]).trim().length,
    internalLinks: tags('a').filter(n => { const href = attr(n, 'href'); return href && new URL(href, response.url).origin === origin; }).length,
    schemaCount, schemaIssues };
}

const report = { checkedAt: new Date().toISOString(), origin, resources: [], pages: [], variants: [], failures };
try {
  const sitemap = await follow(origin + '/sitemap.xml');
  check(sitemap.status === 200, 'Sitemap not 200');
  check(!/noindex|none/i.test(sitemap.xRobotsTag || ''), 'Sitemap has noindex');
  check(sitemap.body.includes('<urlset') && !sitemap.body.includes('<sitemapindex'), 'Sitemap is not a single urlset');
  const urls = locs(sitemap.body);
  check(urls.length > 0, 'Sitemap is empty');
  report.resources.push({ url: sitemap.url, status: sitemap.status, xRobotsTag: sitemap.xRobotsTag, urls: urls.length });
  check(new Set(urls).size === urls.length, 'Duplicate sitemap URLs');
  const robots = await follow(origin + '/robots.txt');
  report.resources.push({ url: robots.url, status: robots.status, xRobotsTag: robots.xRobotsTag, body: robots.body });
  check(robots.status === 200 && !/^Disallow:\s*\/\s*$/mi.test(robots.body), 'robots.txt blocks crawling or is unavailable');
  check(robots.body.includes(origin + '/sitemap.xml'), 'robots.txt sitemap missing');
  const local = locs(await readFile('dist/sitemap.xml', 'utf8'));
  for (const url of local) check(urls.includes(url), 'Local URL absent from production sitemap: ' + url);
  for (const url of urls) check(local.includes(url), 'Production URL absent from local sitemap: ' + url);
  for (let i = 0; i < urls.length; i += 4) {
    const batch = await Promise.all(urls.slice(i, i + 4).map(async url => {
      const response = await follow(url);
      const html = inspect(response);
      const row = { url, status: response.status, finalUrl: response.url, xRobotsTag: response.xRobotsTag, hops: response.hops, ...html };
      check(response.status === 200, url + ': not 200');
      check(response.hops.length === 1, url + ': sitemap URL redirects');
      check(!response.hops.some(h => /noindex|none/i.test(h.xRobotsTag || '')), url + ': X-Robots-Tag blocks indexing');
      check(!html.robots.some(r => /noindex|nofollow|none/i.test(r || '')), url + ': meta robots blocks indexing/crawling');
      check(html.canonicals.length === 1 && html.canonicals[0] === url, url + ': canonical mismatch');
      check(html.ogUrls.length === 1 && html.ogUrls[0] === url, url + ': og:url mismatch');
      check(html.title.length === 1 && html.title[0].length > 10, url + ': title missing');
      check(html.description.length === 1 && html.description[0]?.length > 40, url + ': description missing');
      check(html.h1.length === 1 && html.mainTextLength > 100 && html.internalLinks > 1, url + ': initial HTML incomplete');
      check(html.schemaCount > 0 && html.schemaIssues.length === 0, url + ': schema invalid/wrong host');
      return row;
    }));
    report.pages.push(...batch);
    console.log('Production HTML checked:', report.pages.length + '/' + urls.length);
  }
  check(new Set(report.pages.map(p => p.title[0])).size === report.pages.length, 'Duplicate production titles');
  check(new Set(report.pages.map(p => p.description[0])).size === report.pages.length, 'Duplicate production descriptions');
  for (const path of ['/', '/blog/', '/servicios/', '/robots.txt', '/sitemap.xml']) {
    const response = await follow(origin + path, 'HEAD');
    report.resources.push({ request: path, method: 'HEAD', status: response.status, hops: response.hops });
    check(response.status === 200, path + ': HEAD not 200 after redirects');
    check(!response.hops.some(h => /noindex|none/i.test(h.xRobotsTag || '')), path + ': HEAD has noindex');
  }
  for (const path of ['/index.html', '/blog.html', '/blog/', '/blog?utm_source=seo-audit', '/servicios/', '/sitemap.xml', '/404', '/404.html', '/__seo-audit-missing-20260924', '/blog/__seo-audit-missing-20260924']) {
    const response = await follow(origin + path);
    const isMissing = path.includes('__seo-audit-missing');
    const is404 = path.startsWith('/404') || isMissing;
    const isSitemap = path === '/sitemap.xml';
    const html = isSitemap ? {} : inspect(response);
    report.variants.push({ request: path, status: response.status, finalUrl: response.url, hops: response.hops, ...html });
    if (isMissing) check(response.status === 404, path + ': soft 404');
    if (is404) check(html.robots.some(r => /noindex/i.test(r)), path + ': missing meta noindex');
    else {
      check(response.status === 200, path + ': final status not 200');
      check(!response.hops.some(h => /noindex/i.test(h.xRobotsTag || '')), path + ': unexpected noindex');
      if (!isSitemap) check(html.canonicals[0] === response.url.split('?')[0], path + ': variant canonical mismatch');
    }
  }
} catch (error) { failures.push('Audit incomplete: ' + error.message); }
await writeFile('docs/indexability-production.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ pages: report.pages.length, variants: report.variants.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
