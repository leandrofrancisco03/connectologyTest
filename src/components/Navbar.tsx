import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar({ currentPath = '/' }: { currentPath?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isHome = currentPath === '/';

  const navLinks = [
    { name: 'Servicios', href: '/servicios', isAnchor: false },
    { name: 'Sobre Nosotros', href: '/sobre-nosotros', isAnchor: false },
    { name: 'Blog', href: '/blog', isAnchor: false },
    { name: 'Contacto', href: '/contacto', isAnchor: false },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#030712]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/favicon.png" alt="ConnectologyIA Logo" className="w-full h-full object-contain rounded-md" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Connectology<span className="text-cyan-400">IA</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`${currentPath === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/contacto"
                className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-all text-sm font-medium"
              >
                Evaluación Gratuita
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-slate-900 border-b border-slate-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`${currentPath === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'} block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="block mt-4 text-center bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-5 py-3 rounded-full text-base font-medium hover:bg-cyan-500 hover:text-white transition-all"
              >
                Evaluación Gratuita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
