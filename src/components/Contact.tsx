import { useState, type SubmitEvent } from 'react';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '../lib/site';
export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const webhook = import.meta.env.PUBLIC_N8N_WEBHOOK_URL;
  const configured = typeof webhook === 'string' && webhook.startsWith('https://') && !webhook.includes('tu-instancia');
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || status === 'loading') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return;
    setStatus('loading');
    try {
      const response = await fetch(webhook, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: data.get('nombre'), correo: data.get('correo'), telefono: data.get('telefono'), mensaje: data.get('mensaje'), consentimiento: true }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('No se pudo entregar');
      setStatus('success'); form.reset();
    } catch { setStatus('error'); }
  }
  return <section aria-labelledby="contact-form-heading">
    <h2 id="contact-form-heading" className="section-title" style={{ marginBottom: 24 }}>Cuéntanos tu proceso</h2>
    {configured ? <form onSubmit={submit} className="form-grid">
      <label className="field">Nombre<input name="nombre" autoComplete="name" required maxLength={120} /></label>
      <label className="field">Correo electrónico<input name="correo" type="email" autoComplete="email" required maxLength={254} /></label>
      <label className="field field-full">Teléfono (opcional)<input name="telefono" type="tel" autoComplete="tel" maxLength={30} /></label>
      <label className="field field-full">¿Qué tarea quieres automatizar?<textarea name="mensaje" required rows={5} minLength={15} maxLength={4000} placeholder="Qué haces hoy, qué herramientas utilizas y cuántas veces al día se repite." /></label>
      <div hidden aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="form-note field-full"><input type="checkbox" name="consentimiento" required /> He leído la <a href="/privacidad">política de privacidad</a> y autorizo el uso de mis datos para responder esta solicitud.</label>
      <button className="button field-full" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando…' : 'Enviar solicitud ↗'}</button>
      <div className="field-full form-status" role="status" aria-live="polite">{status === 'success' ? 'Recibimos tu solicitud. Te contactaremos por el correo indicado.' : status === 'error' ? <>No pudimos confirmar el envío. Inténtalo de nuevo o escribe a <a href="mailto:connectologyaia@gmail.com">connectologyaia@gmail.com</a>.</> : ''}</div>
    </form> : <div className="info-card"><h3>Hablemos directamente</h3><p>Escríbenos qué proceso quieres mejorar, qué herramientas utilizas y cuántas veces se repite. Con esa información podemos revisar un primer alcance.</p><a className="button" href="mailto:connectologyaia@gmail.com?subject=Evaluaci%C3%B3n%20de%20automatizaci%C3%B3n">Enviar un correo ↗</a></div>}
    <p className="form-note" style={{ marginTop: 18 }}>También puedes escribirnos a <a href="mailto:connectologyaia@gmail.com">connectologyaia@gmail.com</a> o <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">contactarnos por WhatsApp</a> al <a href={'tel:' + PHONE}>{PHONE_DISPLAY}</a>.</p>
    {configured && <noscript><p>Para enviar el formulario activa JavaScript, o utiliza los enlaces de correo y WhatsApp.</p></noscript>}
  </section>;
}
