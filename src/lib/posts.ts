import { getCollection } from 'astro:content';
export async function publishedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft && data.datePublished <= new Date()))
    .sort((a, b) => b.data.datePublished.valueOf() - a.data.datePublished.valueOf() || a.id.localeCompare(b.id));
}
