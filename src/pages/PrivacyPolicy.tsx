import { SEO } from '../components/SEO';
import { motion } from 'motion/react';

export function PrivacyPolicy() {
  const today = new Date().toLocaleDateString('es-ES');

  return (
    <>
      <SEO title="Política de Privacidad" description="Política de privacidad y manejo de datos de ConnectologyIA." />
      <main className="pt-32 pb-24 bg-[#030712] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Política de Privacidad</h1>
            <p className="text-slate-400 mb-8 text-sm">Última actualización: {today}</p>

            <div className="prose prose-invert prose-slate max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
              <p>
                Esta Política de Privacidad describe cómo ConnectologyIA ("nosotros", "nuestro" o "la aplicación") maneja la información cuando utilizas nuestros servicios integrados con la Plataforma de Facebook/Meta u otras plataformas externas.
              </p>

              <h3>1. Información que recopilamos</h3>
              <p>
                Nuestra aplicación está diseñada para fines comerciales y de gestión. Solo accedemos a la información necesaria para el funcionamiento técnico de la integración, que puede incluir:
              </p>
              <ul>
                <li>Información básica del perfil público (nombre, identificador de usuario).</li>
                <li>Datos necesarios para la gestión de mensajes o leads (si aplica a tu funcionalidad).</li>
              </ul>

              <h3>2. Cómo usamos la información</h3>
              <p>
                Utilizamos la información recopilada exclusivamente para:
              </p>
              <ul>
                <li>Proporcionar la funcionalidad principal de la aplicación (automatización, gestión de respuestas, etc.).</li>
                <li>Mejorar la experiencia del usuario y corregir errores técnicos.</li>
              </ul>
              <p>
                No vendemos ni compartimos tus datos privados con terceros ajenos a la funcionalidad de la app.
              </p>

              <h3>3. Eliminación de Datos</h3>
              <p>
                De acuerdo con las políticas de la Plataforma de Facebook, los usuarios pueden solicitar la eliminación de sus datos. Si deseas eliminar tus datos de nuestra base de registros, por favor contáctanos en el correo que aparece abajo.
              </p>

              <h3>4. Cambios en esta política</h3>
              <p>
                Podemos actualizar esta política ocasionalmente. Te recomendamos revisar esta página periódicamente para ver cualquier cambio.
              </p>

              <h3>Contacto</h3>
              <p>
                Si tienes preguntas sobre esta política, contáctanos en:
                <br />
                <a href="mailto:connectologyaia@gmail.com">connectologyaia@gmail.com</a>
              </p>
              
              <p className="text-sm mt-8 border-t border-slate-800 pt-8">
                &copy; {new Date().getFullYear()} ConnectologyIA. Todos los derechos reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
