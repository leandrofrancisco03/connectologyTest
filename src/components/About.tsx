import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">Sobre Nosotros</h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Estudiamos tu negocio, identificamos cuellos de botella y recomendamos tecnología desde la base más económica y escalable. <strong className="text-white">No vendemos plantillas, creamos soluciones.</strong>
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              En ConnectologyIA, creemos que la tecnología avanzada no debe ser exclusiva de las grandes corporaciones. Nuestro enfoque es pragmático: implementamos lo que realmente necesitas para crecer, sin complejidades innecesarias.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 mt-1">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Enfoque a medida</h4>
                  <p className="text-sm text-slate-400">Soluciones diseñadas específicamente para tus procesos actuales.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400 mt-1">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Innovación accesible</h4>
                  <p className="text-sm text-slate-400">Implementamos IA y automatización ajustada a presupuestos de PyMEs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400 mt-1">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Escalabilidad garantizada</h4>
                  <p className="text-sm text-slate-400">Sistemas preparados para crecer junto con tu volumen de negocio.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-slate-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px]"></div>
               <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-slate-900/80 rounded-xl h-24 sm:h-32 border border-slate-800 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm">
                       <div className="text-center">
                          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">+40%</p>
                          <p className="text-[10px] sm:text-xs text-slate-400">Eficiencia Promedio</p>
                       </div>
                    </div>
                    <div className="bg-slate-900/80 rounded-xl h-36 sm:h-48 border border-slate-800 backdrop-blur-sm"></div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                    <div className="bg-slate-900/80 rounded-xl h-36 sm:h-48 border border-slate-800 backdrop-blur-sm"></div>
                    <div className="bg-slate-900/80 rounded-xl h-24 sm:h-32 border border-slate-800 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm">
                       <div className="text-center">
                          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</p>
                          <p className="text-[10px] sm:text-xs text-slate-400">Operación Continua</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
