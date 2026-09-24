import type { APIRoute } from 'astro';
import { publishedPosts } from '../lib/posts';
import { absoluteUrl } from '../lib/site';
const escape = (value: string) => value.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!);
export const GET: APIRoute = async () => {
  const posts = await publishedPosts();
  const items = posts.map(post => { const url = absoluteUrl('/blog/' + post.id); return '<item><title>' + escape(post.data.title) + '</title><link>' + url + '</link><guid isPermaLink="true">' + url + '</guid><description>' + escape(post.data.description) + '</description><pubDate>' + post.data.datePublished.toUTCString() + '</pubDate></item>'; }).join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>ConnectologyIA: automatización e IA</title><link>' + absoluteUrl('/blog') + '</link><description>Guías prácticas para empresas de Perú.</description><language>es-pe</language><atom:link href="' + absoluteUrl('/rss.xml') + '" rel="self" type="application/rss+xml"/>' + items + '</channel></rss>', { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
