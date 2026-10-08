# Plan de posicionamiento para ConnectologyIA

## Enfoque

Mercado: empresas de Perú. Servicios prioritarios: automatización con n8n y Python, reducción de trabajo manual, agentes para web/Telegram/WhatsApp e integración con API oficial de WhatsApp. Sistemas web básicos como apoyo al proceso.

No se dispone de datos privados de Search Console ni de una herramienta de volumen de búsqueda. Las consultas siguientes son hipótesis por intención y afinidad comercial, no keywords con volumen o dificultad certificados. No se prometen posiciones.

## Qué está implementado

- Portada, navegación y contenido principal entregados en HTML.
- Cuatro páginas comerciales con alcance, requisitos, presupuesto, preguntas y enlaces.
- Corrección de URLs del blog que usaban `slug` en vez de `id`.
- Canonicals coherentes con las rutas de Cloudflare y metadatos sociales.
- Organization, WebSite, WebPage, Service, BreadcrumbList y BlogPosting; autor corporativo real.
- Sitemap único generado, RSS y exclusión de borradores/futuros.
- Trece guías originales organizadas por automatización, IA, WhatsApp e integraciones, conservando las URLs ya publicadas.
- Calculadora y plantilla abiertas como recursos útiles que pueden recibir enlaces.
- Sin valoraciones, clientes, certificaciones, perfiles sociales ni resultados inventados.

El marcado estructurado ayuda a describir el contenido; no garantiza resultados enriquecidos. Referencia: [Article de Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/article).

## Mapa de intención y páginas

| Intención orientativa | Destino principal | Contenido de apoyo |
| --- | --- | --- |
| automatización n8n Perú / automatizar procesos | /servicios/automatizacion-con-n8n | Leads, costos, comparación de herramientas, IA para pymes |
| agentes IA para empresas / agente web o Telegram | /servicios/agentes-de-inteligencia-artificial | Atención al cliente y diseño de agente Telegram |
| WhatsApp API oficial Perú / coexistencia | /servicios/whatsapp-api-oficial | Guía de evaluación de WhatsApp |
| integrar CRM / APIs / sistemas Python | /servicios/integraciones-y-apis | Leads y web conectada |
| ahorro por automatización | /recursos/calculadora-ahorro-automatizacion | Guía de costos |
| diagnóstico de procesos | /recursos | Plantilla descargable |

Una página comercial por intención principal. Evitar crear muchas páginas casi iguales cambiando ciudades o palabras. Los textos deben resolver la consulta y llevar al siguiente paso pertinente, siguiendo el enfoque de [contenido útil de Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Publicación y primeros 14 días

1. Publicar en Cloudflare usando el README y revisar dominio canónico, estado 200 de páginas, 404 real y disponibilidad del sitemap.
2. En Google Search Console, enviar `https://connectologyia.pages.dev/sitemap.xml`. La verificación existente se conservó, pero no se comprobó el acceso a la cuenta.
3. Inspeccionar portada, las cuatro páginas de servicios y dos artículos prioritarios. Comprobar HTML renderizado, canonical elegido y bloqueos de indexación.
4. Revisar un artículo con [Rich Results Test](https://search.google.com/test/rich-results) y el grafo con [Schema Markup Validator](https://validator.schema.org/). Algunos tipos no tienen una presentación enriquecida específica.
5. Medir con PageSpeed Insights la portada, contacto y una guía en móvil. Las pruebas locales no constituyen Core Web Vitals de usuarios reales.
6. Comprobar envío de contacto y recepción con una solicitud controlada cuando el webhook real esté configurado.
7. Registrar una línea base: páginas indexadas, impresiones, clics, consultas por país y solicitudes comerciales.

## Backlinks: activos preparados y acciones externas pendientes

Un enlace que colocamos hacia n8n o Meta es saliente. Un backlink existe cuando otro sitio enlaza a ConnectologyIA. No se han creado cuentas, publicado enlaces, contactado personas ni comprado menciones.

### Recursos a ofrecer

- Calculadora: explica supuestos, fórmulas y un ejemplo; se puede citar en recursos de productividad.
- Plantilla: ficha reutilizable para consultores, capacitadores y equipos de operaciones.
- Guías de decisiones: útiles para acompañar una demostración o formación.
- Futuro caso real: necesita permiso del cliente, mediciones antes/después y limitaciones.

### Priorización de oportunidades

| Tipo de sitio o relación | Aporte que puedes proponer | Enlace pertinente |
| --- | --- | --- |
| Socios reales de CRM, desarrollo o consultoría | Guía conjunta de integración y responsabilidades | Servicio o guía específica |
| Comunidades técnicas de n8n/Python | Ejemplo reproducible, solución a una pregunta real | Artículo técnico, cuando las reglas lo permitan |
| Capacitadores y recursos para pymes peruanas | Plantilla y explicación de cálculo de capacidad | /recursos o calculadora |
| Cliente que autorice un caso | Caso documentado con contexto y resultados verificables | Caso publicado |
| Perfil empresarial propio y verificable | Descripción coherente, datos reales y sitio oficial | Portada |

Estas son categorías para investigar; no representan acuerdos ni dominios verificados que acepten enlaces. Prioriza relevancia editorial, audiencia real y utilidad sobre métricas de autoridad aisladas.

Lleva un registro en una tabla con: sitio, página concreta, motivo de afinidad, recurso propuesto, persona de contacto pública, fecha, respuesta, URL obtenida, atributo del enlace y visitas referidas. Revisa cada oportunidad manualmente.

Evita paquetes de backlinks, comentarios masivos, redes de blogs y acuerdos para forzar palabras clave. Google describe estas prácticas en sus [políticas sobre spam de enlaces](https://developers.google.com/search/docs/essentials/spam-policies#link-spam). Los enlaces pagados deben identificarse apropiadamente, sin presentarlos como recomendaciones espontáneas.

### Borrador de propuesta, no enviado

> Hola, [nombre]. Vi su recurso sobre [tema concreto]. Preparamos una calculadora de horas recuperadas y una ficha abierta para diagnosticar procesos antes de automatizarlos. Explican los supuestos y pueden servir a [audiencia concreta]. Si les resulta útil para su guía, pueden revisarlas aquí: [URL pertinente]. Gracias por considerarlo.

Personalizar después de revisar la página. No exigir un enlace ni enviar mensajes masivos. Compartir las guías en redes puede dar visibilidad, pero no equivale automáticamente a obtener backlinks editoriales.

## Plan editorial de 90 días

Publicar solo cuando haya ejemplos y fuentes suficientes. Actualizar una guía existente cuando la intención ya esté cubierta.

| Periodo | Trabajo | Evidencia necesaria |
| --- | --- | --- |
| Semanas 1–2 | Publicar y validar la nueva base | Rastreo, indexación y contacto funcionando |
| Semanas 3–4 | Ampliar leads con un flujo de demostración descargable | Workflow probado sin credenciales ni datos reales |
| Semanas 5–6 | Guía de reportes operativos con Python y n8n | Datos de ejemplo, reglas de conciliación y errores |
| Semanas 7–8 | Caso de clasificación de documentos | Ejemplos autorizados, precisión medida y revisión humana |
| Semanas 9–10 | Ampliar WhatsApp con preguntas recibidas en ventas | Requisitos de Meta revisados para los casos concretos |
| Semanas 11–12 | Primer caso real de ahorro de tiempo | Permiso del cliente y mediciones comparables |

No convertir cada variación de keyword en una página. Mantener un servicio destino por artículo, enlaces contextuales a otras guías y documentación primaria. Añadir autores individuales solo con nombres y experiencia verificables.

## Cómo medir y decidir

Revisión mensual, comparando periodos equivalentes y separando búsquedas de marca:
- Impresiones y clics por consulta/página en Perú.
- Indexación y canonical seleccionado.
- CTR de páginas con impresiones suficientes.
- Solicitudes comerciales útiles, fuente y servicio de interés.
- Enlaces nuevos relevantes y visitas que generan.
- Errores de contacto y experiencia móvil.

Si una página aparece pero no recibe clics, revisar el título y la coincidencia con la consulta. Si recibe visitas sin solicitudes, revisar la propuesta y el camino de contacto. Si no se indexa, investigar primero rastreo, duplicación y valor del contenido. No cambiar URLs para perseguir fluctuaciones diarias.

## Datos que fortalecerían el sitio después

Identidad real del responsable y experiencia demostrable; casos con autorización; perfiles oficiales que ya existan; condiciones de soporte; datos legales exactos y política de conservación de consultas. No se inventaron para completar el schema.

Un dominio propio puede reforzar la marca y facilitar su gestión a largo plazo; no se presenta como garantía de ranking. Si se adopta, migrar canonicals y redirecciones antes de difundir nuevas URLs.
