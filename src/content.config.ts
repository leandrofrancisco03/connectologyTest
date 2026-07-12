import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    excerpt: z.string().optional(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).optional(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string().default("Equipo ConnectologyIA"),
    datePublished: z.string().transform((str) => new Date(str)),
    dateModified: z.string().transform((str) => new Date(str)).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    relatedPosts: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
