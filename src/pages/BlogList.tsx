import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { BlogPost as BlogPostType } from '../types';
import { SEO } from '../components/SEO';

export function BlogList() {
  const blogs = blogsData as BlogPostType[];

  return (
    <>
      <SEO 
        title="Blog" 
        description="Explora nuestros artículos sobre Inteligencia Artificial, automatización de procesos y desarrollo web para empresas." 
      />
      <main className="pt-32 pb-24 bg-[#030712] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Nuestro Blog</h1>
            <p className="text-xl text-slate-400 max-w-2xl">Últimas tendencias, guías y casos de éxito para transformar tu negocio con tecnología.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-950/50 border border-slate-800/30 p-6 rounded-2xl">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-slate-900/80 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors overflow-hidden"
              >
                {blog.imageUrl && (
                  <div className="h-56 w-full overflow-hidden border-b border-slate-800">
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                    {blog.excerpt}
                  </p>
                  <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-white transition-colors mt-auto">
                    Leer artículo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
