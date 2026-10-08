# ConnectologyIA

Web estática en Astro para servicios de automatización e IA en Perú. Preparada para Cloudflare Pages.

## Desarrollo

Recomendado: Node 24.15.0 (archivo `.node-version`).

```sh
npm ci
npm run dev
```

Vista previa: http://localhost:3000. Astro 7 gestiona el servidor de desarrollo en segundo plano; se puede detener con `npx astro dev stop`.

## Verificación antes de publicar

```sh
npm run lint
npm test
npm run build
npm run check:seo
```

La auditoría SEO comprueba el HTML de `dist`: H1, main, títulos y descripciones únicos, canonical, Open Graph, JSON-LD, enlaces y recursos locales, anclas, páginas huérfanas, sitemap, RSS y contenido estático de la portada. No mide posiciones en Google ni sustituye la validación posterior en producción.

## Cloudflare Pages

- Framework: Astro.
- Comando de compilación: `npm run build && npm run check:seo`.
- Directorio de salida: `dist`.
- Node: 24.15.0 (o configurar `NODE_VERSION=24.15.0`).
- Sitio estático: no necesita adaptador SSR, Functions ni servidor Node en producción.
- Las rutas se generan como archivos HTML. Cloudflare sirve las URLs sin extensión; los canonicals eliminan `.html`.
- `public/_headers`: cabeceras básicas, caché anual solo para assets con hash y noindex de subdominios de preview.
- `src/pages/sitemap.xml.ts`: genera un único `/sitemap.xml` desde las páginas Astro y los artículos publicados.
- Se conserva el archivo y la meta de verificación de Google existentes.

No añadas una regla SPA `/* /index.html 200`: ocultaría los errores 404.

Antes de publicar, revisa el contenido comercial, el correo de contacto y las condiciones de privacidad de tu operación. La documentación de Meta puede limitar las opciones de alta; verifica la elegibilidad de cada cliente antes de ofrecer coexistencia.

### Formulario de contacto

Configura `PUBLIC_N8N_WEBHOOK_URL` en Cloudflare Pages **antes de compilar** y vuelve a desplegar. Usa HTTPS y la URL de producción de un workflow activo. No incluyas secretos en variables `PUBLIC_*`: el endpoint es visible en el navegador.

El receptor debe:
- Aceptar POST JSON y responder con un estado 2xx solo al aceptar la solicitud.
- Resolver CORS/preflight para el dominio de producción.
- Validar campos, tamaños y consentimiento en el servidor.
- Aplicar límites contra abuso y registrar errores de entrega.
- No devolver información sensible.

Payload: `nombre`, `correo`, `telefono`, `mensaje`, `consentimiento`.

Sin endpoint configurado, la página ofrece correo y WhatsApp en lugar de un formulario que falle. El honeypot del navegador es solo una ayuda, no reemplaza protección en el receptor. No se enviaron solicitudes reales durante las pruebas.

### Si utilizas un dominio propio

Actualmente el dominio canónico sigue siendo `https://connectologyia.pages.dev`. No se cambió ni compró ningún dominio.

Actualiza de forma coordinada `src/lib/site.ts`, `astro.config.mjs`, `public/robots.txt`, las reglas específicas de `public/_headers`, `scripts/check-seo.mjs` y los enlaces absolutos de recursos/docs. Configura redirecciones del dominio anterior al definitivo en Cloudflare; valida que no haya cadenas ni bucles. Vuelve a compilar y registrar el sitemap del dominio definitivo.

## Contenido

- Artículos: `src/content/blog/*.md`.
- Servicios: `src/data/services.ts`.
- Layout SEO: `src/layouts/Layout.astro`.
- Recursos: `src/pages/recursos`.
- Imágenes sociales: `public/og`; regenerar con `npm run images:generate`.

Los posts se identifican por `entry.id`. `draft: true` y fechas futuras se excluyen de rutas, listados y RSS. Para que un post programado aparezca se requiere otra compilación tras su fecha. Conserva las URLs ya publicadas y usa `dateModified` solo cuando revises el contenido.

Consulta [el plan SEO y backlinks](docs/SEO-PLAN.md) y [las pruebas realizadas](docs/VALIDACION.md).
