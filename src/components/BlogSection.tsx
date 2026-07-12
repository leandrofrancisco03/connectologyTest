import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPostProps {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  date: string;
  imageUrl?: string;
}

export function BlogSection({ blogs = [] }: { blogs?: BlogPostProps[] }) {
  const latestBlogs = blogs.length > 0 ? blogs.slice(0, 3) : [];

  if (latestBlogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Últimos Artículos</h2>
            <p className="text-slate-400 max-w-xl">Descubre tendencias, guías y casos de éxito sobre automatización e Inteligencia Artificial.</p>
          </div>
          <a href="/blog" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-sm font-medium">
            Ver todos <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/50 border border-slate-800/30 p-6 rounded-2xl">
          {latestBlogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-slate-900/80 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors overflow-hidden"
            >
              {blog.imageUrl && (
                <div className="h-48 w-full overflow-hidden border-b border-slate-800">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  <a href={`/blog/${blog.slug}`}>
                    {blog.title}
                  </a>
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                  {blog.excerpt || blog.description}
                </p>
                <a href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-white transition-colors mt-auto">
                  Leer artículo <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <a href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-sm font-medium">
            Ver todos los artículos <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
