export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  seoKeywords: string[];
  author: string;
  imageUrl?: string;
}
