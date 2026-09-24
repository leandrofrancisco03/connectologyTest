# Validación de la mejora

## Comprobaciones realizadas

- Compilación Astro estática: 21 páginas HTML y RSS.
- Astro check: 0 errores, 0 warnings, 0 hints en el último control de tipos.
- Cuatro pruebas de la calculadora: ejemplo, retorno negativo, ceros y valores inválidos.
- Auditoría de HTML: 21 páginas, 8 artículos, 21 grafos JSON-LD y 963 referencias internas verificadas (incluye enlaces repetidos y assets).
- Canonicals, Open Graph, títulos/descripciones únicos, H1, main, imágenes locales, anclas, sitemap, RSS y páginas huérfanas comprobados.
- Portada renderizada sin islas React hidratadas.
- Revisión visual en navegador a tamaño de escritorio y viewport de 390 × 844.
- Menú móvil abierto y calculadora operada: ejemplo devuelve 32 h, S/ 800 brutos, S/ 600 netos y 4 meses.
- Artículo con tabla e índice probado en móvil; sin desbordamiento horizontal del documento.

La auditoría detectó que `build.format: file` expone `.html` en `Astro.url` durante la compilación. Se corrigió normalizando la URL canónica al formato público sin extensión.

## Límites de la verificación

No se desplegó a Cloudflare ni se consultó Search Console. Las cabeceras y redirecciones deben comprobarse tras publicar en Cloudflare; el servidor local de Astro no reproduce sus reglas.

No se enviaron contactos reales ni se verificó un webhook de producción. En este entorno no hay endpoint configurado y el contacto muestra correo/WhatsApp.

No se verificó elegibilidad de ninguna cuenta para coexistencia de WhatsApp. La documentación técnica de Meta limitó algunas consultas; los textos no incluyen una lista cerrada de requisitos ni garantizan disponibilidad.

No se midieron Core Web Vitals de usuarios reales ni se atribuye una puntuación Lighthouse. La comprobación estructural local no garantiza resultados enriquecidos ni posicionamiento.

La integración React instalada emite avisos de obsolescencia de opciones internas de Vite/esbuild; no impiden compilar. No se cambió de versión mayor de Astro o React para silenciarlos.
