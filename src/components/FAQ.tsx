import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "¿Qué es ConnectologyIA?",
      answer: "Somos una agencia especializada en democratizar la Inteligencia Artificial y la automatización para negocios de todos los tamaños. Implementamos soluciones tecnológicas a medida que optimizan flujos de trabajo, reducen costos operativos y escalan tus capacidades mediante agentes inteligentes y arquitecturas modernas."
    },
    {
      question: "¿Necesito conocimientos técnicos para usar sus soluciones?",
      answer: "No, en absoluto. Nuestro enfoque es llave en mano. Nosotros nos encargamos de todo el desarrollo técnico, integración y configuración. Te entregamos un sistema funcionando y capacitamos a tu equipo para utilizarlo de manera sencilla e intuitiva."
    },
    {
      question: "¿Cuánto cuesta implementar automatización en mi negocio?",
      answer: "Nuestros precios son adaptables a tu realidad. A diferencia de las plataformas con altos costos recurrentes, utilizamos tecnologías open-source o de costo eficiente (como n8n) para que el retorno de inversión sea rápido. Todo comienza con una evaluación gratuita para entender tus necesidades exactas."
    },
    {
      question: "¿Qué tipo de procesos pueden automatizar?",
      answer: "Podemos automatizar casi cualquier proceso digital repetitivo. Esto incluye: atención al cliente con agentes IA, sincronización de datos entre tu CRM y ERP, generación automática de reportes, flujos de correo electrónico, validación de prospectos y procesos de ventas."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-900/20 border-y border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Preguntas Frecuentes</h2>
          <p className="text-slate-400">Todo lo que necesitas saber sobre cómo trabajamos y cómo podemos ayudarte.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-5 text-left text-white hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold">{question}</span>
        <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 mt-2">
              <div className="pt-3">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
