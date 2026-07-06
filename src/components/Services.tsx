import { Bot, Workflow, Code } from 'lucide-react';
import { motion } from 'motion/react';

export function Services() {
  const services = [
    {
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      iconBg: "bg-cyan-500/10",
      title: "Agentes IA",
      description: "Desarrollamos desde chatbots básicos hasta agentes autónomos avanzados con LangChain y LangGraph que interactúan con tus sistemas internos."
    },
    {
      icon: <Workflow className="w-6 h-6 text-blue-400" />,
      iconBg: "bg-blue-500/10",
      title: "Automatización",
      description: "Integraciones de APIs, scripts en Python y orquestación pura utilizando n8n para conectar tus herramientas sin costos recurrentes excesivos."
    },
    {
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      iconBg: "bg-indigo-500/10",
      title: "Desarrollo Web",
      description: "Creación de páginas web ultrarrápidas y optimizadas utilizando Next.js, React o WordPress, diseñadas para escalar tu negocio."
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Nuestros Servicios</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Soluciones tecnológicas diseñadas para optimizar tus procesos, reducir costos y aumentar tus ventas.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors group"
            >
              <div className={`${service.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
