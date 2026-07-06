import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo-connectologyIA-sin-texto.png" alt="ConnectologyIA Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Connectology<span className="text-cyan-400">IA</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              Agencia especializada en la implementación de Inteligencia Artificial y automatización de procesos para negocios modernos que buscan escalar.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-tight">Enlaces</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a></li>
              <li><a href="/#nosotros" className="hover:text-cyan-400 transition-colors">Sobre Nosotros</a></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link to="/privacidad" className="hover:text-cyan-400 transition-colors">Política de Privacidad</Link></li>
              <li><a href="/#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-tight">Contacto</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Lima, Perú</li>
              <li>
                <a href="mailto:connectologyaia@gmail.com" className="hover:text-cyan-400 transition-colors">
                  connectologyaia@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ConnectologyIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
