import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const target = e.target as typeof e.target & {
      nombre: { value: string };
      correo: { value: string };
      mensaje: { value: string };
      telefono: { value: string };
      reset: () => void;
    };

    const payload = {
      nombre: target.nombre.value,
      correo: target.correo.value,
      mensaje: target.mensaje.value,
      telefono: target.telefono.value
    };

    try {
      // URL del Webhook de n8n
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus("success");
        target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error conectando al webhook:", error);
      setStatus("error");
    }
    
    // Auto reset status after 5 seconds if success or error
    setTimeout(() => {
        if(status === "success" || status === "error") {
            setStatus("idle");
        }
    }, 5000);
  };

  return (
    <section id="contacto" className="py-24 bg-[#030712] relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Contacto Estratégico</h2>
          <p className="text-slate-400">Agenda una evaluación gratuita y descubre cómo podemos optimizar tu negocio.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
                  placeholder="Nombre Completo"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
                  placeholder="Correo Corporativo"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
                placeholder="Teléfono (Opcional)"
              />
            </div>

            <div className="space-y-1">
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 outline-none focus:border-cyan-500 transition-colors resize-none placeholder:text-slate-500"
                placeholder="¿Cómo podemos ayudarte?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-slate-800 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500 hover:text-white transition-all border border-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "idle" && <><Send className="w-5 h-5" /> Enviar Solicitud</>}
              {status === "loading" && <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>}
              {status === "success" && <><CheckCircle2 className="w-5 h-5" /> ¡Mensaje Enviado!</>}
              {status === "error" && <><AlertCircle className="w-5 h-5" /> Error al enviar</>}
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2">Respuesta garantizada en menos de 24 horas.</p>
            
            {status === "success" && (
                <p className="text-green-400 text-sm text-center mt-2">Gracias por contactarnos. Te responderemos a la brevedad.</p>
            )}
             {status === "error" && (
                <p className="text-red-400 text-sm text-center mt-2">Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
