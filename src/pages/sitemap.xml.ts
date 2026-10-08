import type { APIRoute } from 'astro';
import { readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { publishedPosts } from '../lib/posts';

export const prerender = true;

const site = 'https://connectologyia.pages.dev';

async function findAstroPages(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? findAstroPages(path) : path.endsWith('.astro') ? [path] : [];
  }))).flat();
}

function routeFromPage(file: string) {
  if (file.includes('[')) return null;

  const route = file
    .replace(/^\.\//, '/')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '') || '/';

  if (route === '/404') return null;
  return route;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = await publishedPosts();
  const entries = new Map<string, Date | undefined>();
  const pagesDirectory = resolve('src/pages');
  const pageFiles = await findAstroPages(pagesDirectory);

  for (const absoluteFile of pageFiles) {
    const file = './' + relative(pagesDirectory, absoluteFile).replaceAll('\\', '/');
    const route = routeFromPage(file);
    if (route) entries.set(new URL(route, site).href, undefined);
  }

  for (const post of posts) {
    entries.set(
      new URL(`/blog/${post.id}`, site).href,
      post.data.dateModified ?? post.data.datePublished,
    );
  }

  const urls = [...entries.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, modified]) => [
      '  <url>',
      `    <loc>${escapeXml(url)}</loc>`,
      modified ? `    <lastmod>${modified.toISOString().slice(0, 10)}</lastmod>` : null,
      '  </url>',
    ].filter(Boolean).join('\n'))
    .join('\n');

  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n'), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
};
