import { services } from '../data/services';
import { PHONE, PHONE_DISPLAY } from '../lib/site';
export function Footer() {
  return <footer className="bg-[#030712] border-t border-slate-800 mt-20">
    <div className="shell py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div><a href="/" className="brand"><img src="/favicon.png" width={32} height={32} alt="" />Connectology<span>IA</span></a><p className="text-slate-400 text-sm leading-7 mt-5">Automatización de procesos, agentes de IA e integraciones para empresas de Perú.</p></div>
        <div><h2 className="text-white font-semibold mb-4">Soluciones</h2><ul className="space-y-3 text-sm text-slate-400">{services.map(service => <li key={service.slug}><a className="hover:text-cyan-300" href={'/servicios/' + service.slug}>{service.label}</a></li>)}</ul></div>
        <div><h2 className="text-white font-semibold mb-4">Explora</h2><ul className="space-y-3 text-sm text-slate-400"><li><a href="/blog">Blog y guías</a></li><li><a href="/recursos">Recursos gratuitos</a></li><li><a href="/recursos/calculadora-ahorro-automatizacion">Calculadora de ahorro</a></li><li><a href="/sobre-nosotros">Sobre nosotros</a></li><li><a href="/rss.xml">Suscribirse por RSS</a></li></ul></div>
        <div><h2 className="text-white font-semibold mb-4">Hablemos</h2><ul className="space-y-3 text-sm text-slate-400"><li>Lima, Perú</li><li><a href={'tel:' + PHONE}>{PHONE_DISPLAY}</a></li><li><a className="break-all" href="mailto:connectologyaia@gmail.com">connectologyaia@gmail.com</a></li><li><a href="/contacto">Evaluar mi proceso ↗</a></li><li><a href="/privacidad">Política de privacidad</a></li></ul></div>
      </div><p className="text-xs text-slate-400 mt-12 pt-6 border-t border-slate-800">© {new Date().getFullYear()} ConnectologyIA. Todos los derechos reservados.</p>
    </div>
  </footer>;
}
