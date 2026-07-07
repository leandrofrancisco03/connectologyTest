import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://connectologyia.pages.dev';

const blogsPath = path.resolve(__dirname, '../src/data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));

const staticRoutes = [
  '/',
  '/blog',
  '/privacidad'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add static routes
staticRoutes.forEach(route => {
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}${route}</loc>\n`;
  xml += `    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>\n`;
  xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
  xml += `  </url>\n`;
});

// Add dynamic blog routes
blogs.forEach(blog => {
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}/blog/${blog.slug}</loc>\n`;
  if (blog.date) {
    xml += `    <lastmod>${blog.date}</lastmod>\n`;
  }
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.7</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicPath, xml);

console.log('✅ Sitemap generated successfully at public/sitemap.xml');
