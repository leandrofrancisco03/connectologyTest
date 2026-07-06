import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import blogsData from '../data/blogs.json';
import { BlogPost as BlogPostType } from '../types';
import { SEO } from '../components/SEO';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const blog = (blogsData as BlogPostType[]).find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "author": {
      "@type": "Organization",
      "name": blog.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ConnectologyIA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://connectologyia.pages.dev/logo-connectologyia.png"
      }
    },
    "datePublished": blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://connectologyia.pages.dev/blog/${blog.slug}`
    }
  };

  return (
    <>
      <SEO 
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.seoKeywords}
        schema={articleSchema}
      />
      <main className="pt-32 pb-24 bg-[#030712] min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-2xl"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition-colors mb-8 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Volver al Blog
            </Link>
            
            <header className="mb-10 border-b border-slate-800 pb-10">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              </div>
            </header>

            {blog.imageUrl && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-slate-800 h-[300px] md:h-[450px]">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
              {/* Note: In a real Next.js app with markdown/MDX, we'd render it here. 
                  Since we have a simple JSON with 'content' as string, we'll map paragraphs */}
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-300 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-800">
              <h3 className="text-white font-medium mb-4">Etiquetas:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.seoKeywords.map((keyword, index) => (
                  <span key={index} className="bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </article>
      </main>
    </>
  );
}
