import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-800 mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">Potencia tu negocio con tecnología de punta</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight"
        >
          Democratizando la <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">IA y Automatización</span> para Negocios Modernos.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Implementamos ecosistemas tecnológicos a tu medida. Desde flujos de trabajo hasta agentes inteligentes. Precios adaptables a tu realidad.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contacto"
            className="group flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3 rounded-lg text-base font-bold transition-colors w-full sm:w-auto"
          >
            Agendar Evaluación
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#servicios"
            className="flex items-center justify-center px-8 py-3 rounded-lg text-base font-semibold text-slate-300 hover:text-white bg-slate-900/40 hover:bg-slate-800 border border-slate-800 transition-all w-full sm:w-auto"
          >
            Conocer Servicios
          </a>
        </motion.div>
      </div>
    </section>
  );
}
