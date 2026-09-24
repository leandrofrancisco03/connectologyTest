import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { parse } from 'parse5';
const root = resolve('dist');
const origin = 'https://connectologyia.pages.dev';
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name)))).flat(); }
function elements(node) { return [node, ...(node.childNodes || []).flatMap(elements)]; }
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
const pages = new Map();
for (const file of (await walk(root)).filter(f => f.endsWith('.html') && !f.includes('googleff'))) {
 const route = '/' + relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '').replace(/\.html$/, '');
 const html = await readFile(file, 'utf8'); const nodes = elements(parse(html));
 pages.set(route, { file, route, html, nodes });
}
const titles = new Set(), descriptions = new Set(), incoming = new Set(), expectedSitemap = new Set();
let links = 0, schemas = 0, articles = 0;
for (const page of pages.values()) {
 const { route, html, nodes } = page;
 const select = tag => nodes.filter(n => n.tagName === tag);
 const oneMeta = (key, value) => select('meta').filter(n => attr(n, key) === value);
 const title = select('title');
 assert(title.length === 1 && text(title[0]).length > 10, route + ': título único y válido');
 assert(!titles.has(text(title[0])), route + ': título duplicado'); titles.add(text(title[0]));
 const description = oneMeta('name', 'description');
 assert(description.length === 1 && attr(description[0], 'content')?.length > 40, route + ': descripción');
 const desc = attr(description[0], 'content');
 assert(!descriptions.has(desc), route + ': descripción duplicada'); descriptions.add(desc);
 assert(select('h1').length === 1, route + ': debe tener un H1');
 assert(select('main').length === 1, route + ': debe tener un main');
 assert(nodes.some(n => attr(n,'id') === 'main-content'), route + ': destino del enlace de salto');
 assert(!html.includes('/undefined') && !html.includes('client:only'), route + ': contenido o URL inválida');
 const canonical = select('link').filter(n => attr(n, 'rel') === 'canonical');
 const expected = new URL(route, origin).href;
 assert(canonical.length === 1 && attr(canonical[0], 'href') === expected, route + ': canonical incorrecto');
 assert(attr(oneMeta('property','og:url')[0], 'content') === expected, route + ': og:url incorrecto');
 const noindex = attr(oneMeta('name', 'robots')[0], 'content')?.includes('noindex');
 assert(route === '/404' ? noindex : !noindex, route + ': directiva de indexación incorrecta');
 if (!noindex) expectedSitemap.add(expected);
 const scripts = select('script').filter(n => attr(n,'type') === 'application/ld+json');
 assert(scripts.length === 1, route + ': debe tener un grafo JSON-LD');
 for (const script of scripts) {
  try {
   const data = JSON.parse(text(script)); schemas++;
   assert(data['@context'] === 'https://schema.org', route + ': contexto schema');
   const graph = data['@graph'];
   assert(graph.find(n => n['@type'] === 'Organization')?.telephone === '+51970430127', route + ': teléfono de organización incorrecto');
   for (const kind of ['Organization', 'WebSite']) assert(graph.some(n => n['@type'] === kind), route + ': falta ' + kind);
   const article = graph.find(n => n['@type'] === 'BlogPosting');
   if (route.startsWith('/blog/')) {
    articles++; assert(!!article, route + ': falta BlogPosting');
    assert(article?.mainEntityOfPage?.['@id'] === expected + '#webpage', route + ': mainEntityOfPage');
    assert(article?.author?.['@type'] === 'Organization', route + ': autoría');
    assert(new Date(article?.dateModified) >= new Date(article?.datePublished), route + ': fechas');
    assert(graph.some(n => n['@type'] === 'BreadcrumbList'), route + ': breadcrumb');
   }
   if (route.startsWith('/servicios/')) assert(graph.some(n => n['@type'] === 'Service'), route + ': falta Service');
  } catch (e) { failures.push(route + ': schema inválido: ' + e.message); }
 }
 for (const img of select('img')) {
  assert(attr(img,'alt') !== undefined, route + ': imagen sin alt');
  assert(attr(img,'width') && attr(img,'height'), route + ': imagen sin dimensiones');
 }
 assert(select('a').some(n => attr(n, 'href') === 'https://wa.me/51970430127'), route + ': enlace WhatsApp incorrecto');
 const refs = [...select('a').map(n => ({ value: attr(n,'href'), anchor: true })), ...select('img').map(n => ({ value: attr(n,'src') })), ...oneMeta('property','og:image').map(n => ({ value: attr(n,'content') })), ...select('link').filter(n => ['stylesheet','icon'].includes(attr(n,'rel'))).map(n => ({ value: attr(n,'href') })), ...select('script').filter(n => attr(n,'src')).map(n => ({ value: attr(n,'src') }))];
 for (const ref of refs) {
  if (!ref.value || /^(mailto:|tel:)/.test(ref.value)) continue;
  const url = new URL(ref.value, expected); if (url.origin !== origin) continue;
  links++;
  const path = decodeURIComponent(url.pathname);
  const target = pages.get(path);
  if (target) {
   if (ref.anchor && route !== path) incoming.add(path);
   if (url.hash) assert(target.nodes.some(n => attr(n,'id') === decodeURIComponent(url.hash.slice(1))), route + ': ancla rota ' + ref.value);
  } else {
   const pathOnDisk = resolve(root, '.' + path);
   assert(pathOnDisk.startsWith(root), route + ': referencia fuera de dist');
   let exists = false; try { exists = (await stat(pathOnDisk)).isFile(); } catch {}
   assert(exists, route + ': archivo o enlace roto ' + ref.value);
  }
 }
}
const sitemap = await readFile(join(root,'sitemap-0.xml'),'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).href));
for (const url of expectedSitemap) assert(sitemapUrls.has(url), 'Falta en sitemap: ' + url);
for (const url of sitemapUrls) assert(expectedSitemap.has(url), 'URL inesperada en sitemap: ' + url);
for (const route of pages.keys()) if (!['/', '/404'].includes(route)) assert(incoming.has(route), 'Página huérfana: ' + route);
const rss = await readFile(join(root,'rss.xml'),'utf8');
assert((rss.match(/<item>/g) || []).length === articles, 'RSS y artículos no coinciden');
assert(!rss.includes('undefined'), 'URL inválida en RSS');
const home = pages.get('/').html;
assert(!home.includes('<astro-island'), 'La portada no debe depender de islas hidratadas');
const robots = await readFile(join(root,'robots.txt'),'utf8');
assert(robots.includes(origin + '/sitemap-index.xml'), 'robots: sitemap incorrecto');
assert(!(await walk(root)).includes(join(root,'sitemap.xml')), 'Sitemap estático duplicado');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`SEO OK: ${pages.size} páginas, ${articles} artículos, ${schemas} grafos JSON-LD y ${links} enlaces/recursos internos. Canonicals, RSS, sitemap, anclas y páginas huérfanas verificados.`);
