export const services = [
  {
    "slug": "automatizacion-con-n8n",
    "number": "01",
    "label": "Automatización de procesos",
    "title": "Automatización con n8n y Python en Perú",
    "description": "Conecta tus herramientas y reduce tareas repetitivas con flujos n8n y Python. Diseñamos automatizaciones para empresas de Perú, con monitoreo y control.",
    "intro": "Recupera el tiempo que tu equipo dedica a copiar datos, preparar reportes y perseguir pendientes. Diseñamos flujos que conectan tus herramientas y te avisan cuando algo necesita atención.",
    "cases": [
      [
        "Leads que llegan al lugar correcto",
        "Del formulario o canal de atención al CRM: validación, deduplicación, asignación y aviso al responsable."
      ],
      [
        "Reportes sin copiar y pegar",
        "Consolidación de datos de distintas fuentes, revisión de inconsistencias y envío de resúmenes programados."
      ],
      [
        "Documentos con revisión humana",
        "Extracción de campos de documentos y envío de excepciones a una persona antes de registrar datos definitivos."
      ]
    ],
    "deliverables": [
      "Mapa del proceso y reglas de negocio.",
      "Flujos n8n y scripts Python cuando el proceso lo requiera.",
      "Tratamiento de errores, reintentos y alertas.",
      "Documentación operativa y capacitación según el alcance acordado."
    ],
    "requirements": "Necesitamos conocer tus herramientas, el volumen de operaciones, las excepciones habituales y quién valida el resultado. Si no existe una API, evaluamos las alternativas antes de comprometer la integración.",
    "cost": "El presupuesto depende del número de sistemas, complejidad, volumen y soporte. Separamos implementación de costos recurrentes: hosting, licencias, APIs y mantenimiento. El alojamiento propio también tiene costos operativos.",
    "faq": [
      [
        "¿Todo proceso necesita inteligencia artificial?",
        "No. Para reglas claras y datos estructurados suele ser mejor una automatización determinista. Incorporamos IA cuando aporta valor al interpretar texto o documentos."
      ],
      [
        "¿Puedo usar mi propia instancia de n8n?",
        "Sí, evaluando su configuración, accesos, respaldos y capacidad. También podemos trabajar con n8n Cloud según las necesidades del proyecto."
      ]
    ],
    "posts": [
      "automatizar-leads-n8n-crm",
      "orquestacion-n8n-vs-zapier",
      "cuanto-cuesta-automatizar-procesos-peru"
    ],
    "source": "https://docs.n8n.io/",
    "sourceName": "Documentación oficial de n8n"
  },
  {
    "slug": "agentes-de-inteligencia-artificial",
    "number": "02",
    "label": "Agentes de IA",
    "title": "Agentes de IA para web, Telegram y WhatsApp",
    "description": "Implementamos agentes de IA con n8n para atención y procesos internos en Perú. Conecta web, Telegram y WhatsApp con tus datos y supervisión humana.",
    "intro": "Un agente útil conoce su tarea y sus límites. Creamos asistentes que consultan información autorizada, califican solicitudes y derivan a una persona cuando el caso lo requiere.",
    "cases": [
      [
        "Atención desde tu web",
        "Respuestas basadas en tu documentación, captura de solicitudes y derivación con el contexto de la conversación."
      ],
      [
        "Operaciones por Telegram",
        "Bots para consultar información, recibir alertas o solicitar acciones con permisos y confirmaciones."
      ],
      [
        "Agentes para WhatsApp",
        "Atención y clasificación conectadas a la API oficial. Evaluamos permisos, reglas de mensajería y transferencia al equipo."
      ]
    ],
    "deliverables": [
      "Definición de tareas permitidas y límites del agente.",
      "Conexión con una base de conocimiento aprobada.",
      "Integración con herramientas y canales acordados.",
      "Evaluación con preguntas de prueba, fallos esperados y derivación humana."
    ],
    "requirements": "Necesitamos documentos actualizados, acceso limitado a los sistemas y ejemplos de consultas frecuentes. Definimos qué información puede ver cada usuario antes de habilitar búsquedas o acciones.",
    "cost": "El costo considera la integración, el modelo de IA, el volumen de mensajes, almacenamiento, pruebas y mantenimiento. Un piloto acotado permite estimar consumo y utilidad antes de ampliar el alcance.",
    "faq": [
      [
        "¿El agente puede equivocarse?",
        "Sí. Por eso diseñamos respuestas limitadas a fuentes aprobadas, controles en las herramientas y derivación humana. Las operaciones sensibles necesitan validación explícita."
      ],
      [
        "¿El mismo agente puede funcionar en varios canales?",
        "Puede compartir lógica y fuentes de información, pero cada canal necesita integración, identidad, permisos y pruebas propias."
      ]
    ],
    "posts": [
      "agentes-ia-atencion-cliente",
      "agente-ia-telegram-n8n",
      "whatsapp-api-oficial-coexistencia-peru"
    ],
    "source": "https://docs.n8n.io/advanced-ai/",
    "sourceName": "Documentación de IA en n8n"
  },
  {
    "slug": "integraciones-y-apis",
    "number": "03",
    "label": "Integraciones y sistemas",
    "title": "Integraciones de APIs y sistemas con Python",
    "description": "Integramos CRM, formularios y sistemas mediante APIs, webhooks y Python. Automatiza el intercambio de datos de tu empresa en Perú con trazabilidad.",
    "intro": "Haz que tus sistemas compartan información sin depender de hojas copiadas a mano. Conectamos aplicaciones con reglas claras sobre el origen, el destino y la calidad de los datos.",
    "cases": [
      [
        "CRM y formularios conectados",
        "Registro de oportunidades con origen, responsable y estados consistentes, evitando contactos duplicados."
      ],
      [
        "Sincronización entre sistemas",
        "Intercambio de clientes, pedidos o inventario según las posibilidades de las APIs y las reglas de tu operación."
      ],
      [
        "Sistemas web de apoyo",
        "Paneles y formularios a medida para revisar excepciones, aprobar solicitudes y dar visibilidad a tus automatizaciones."
      ]
    ],
    "deliverables": [
      "Mapeo de datos y definición del sistema fuente.",
      "Conexiones con autenticación y permisos limitados.",
      "Control de duplicados, límites de API y fallos.",
      "Documentación del intercambio de datos y del procedimiento de recuperación."
    ],
    "requirements": "Revisamos la documentación y los permisos de cada API. La integración depende de las funciones que el proveedor exponga; no todos los sistemas permiten leer o modificar los mismos datos.",
    "cost": "La complejidad depende de la calidad de las APIs, las transformaciones y las condiciones de sincronización. Un formulario básico y una integración bidireccional con conciliación tienen alcances distintos.",
    "faq": [
      [
        "¿También desarrollan sistemas web?",
        "Sí, como apoyo a la automatización: paneles operativos, formularios y herramientas básicas conectadas con tus procesos. Definimos el alcance según el problema a resolver."
      ],
      [
        "¿Qué ocurre si un proveedor cambia su API?",
        "La integración puede necesitar ajustes. Proponemos controles y documentación para detectar el cambio; el mantenimiento se define en la propuesta."
      ]
    ],
    "posts": [
      "automatizar-leads-n8n-crm",
      "desarrollo-web-moderno-nextjs"
    ],
    "source": "https://developer.mozilla.org/es/docs/Web/HTTP",
    "sourceName": "Referencia de HTTP de MDN"
  },
  {
    "slug": "whatsapp-api-oficial",
    "number": "04",
    "label": "WhatsApp para empresas",
    "title": "WhatsApp API oficial y coexistencia en Perú",
    "description": "Conecta WhatsApp con n8n, tu CRM y agentes de IA. Evaluamos API oficial y coexistencia con WhatsApp Business para automatizar la atención en Perú.",
    "intro": "Conecta las conversaciones de tu negocio con tus procesos. Implementamos automatizaciones mediante la API oficial de WhatsApp, con reglas de atención y coordinación con tu equipo.",
    "cases": [
      [
        "De conversación a oportunidad",
        "Recopila los datos necesarios, identifica el motivo de contacto y registra solicitudes en tu CRM."
      ],
      [
        "Atención con agentes de IA",
        "Resuelve consultas dentro de un alcance definido y deriva situaciones complejas con un resumen para el asesor."
      ],
      [
        "Coexistencia cuando sea elegible",
        "Evaluamos el uso del mismo número en WhatsApp Business y la plataforma API mediante el flujo oficial habilitado por Meta."
      ]
    ],
    "deliverables": [
      "Revisión de cuenta, número y opciones de incorporación.",
      "Integración de webhooks con n8n y los sistemas acordados.",
      "Reglas para evitar respuestas duplicadas entre agente y asesor.",
      "Pruebas de entrada, salida, estados y derivación a una persona."
    ],
    "requirements": "La coexistencia no se garantiza para cualquier cuenta o número. Verificamos los requisitos vigentes de Meta y del proveedor, la elegibilidad y las limitaciones antes de definir el alta. No prometemos verificación ni aprobación de plantillas.",
    "cost": "Distinguimos implementación, proveedor, tarifas de mensajería aplicables, consumo de IA y soporte. Los cargos y condiciones de Meta pueden cambiar; se revisan para tu caso al preparar la propuesta.",
    "faq": [
      [
        "¿Puedo mantener mi número de WhatsApp Business?",
        "La coexistencia puede permitirlo mediante una incorporación oficial, si la cuenta y el número cumplen los requisitos vigentes. Primero verificamos la elegibilidad."
      ],
      [
        "¿Se puede enviar cualquier mensaje automáticamente?",
        "No. El flujo debe respetar las políticas, permisos y reglas de mensajería aplicables. Diseñamos el proceso con esas condiciones y un mecanismo de baja cuando corresponda."
      ]
    ],
    "posts": [
      "whatsapp-api-oficial-coexistencia-peru",
      "agentes-ia-atencion-cliente"
    ],
    "source": "https://developers.facebook.com/docs/whatsapp/",
    "sourceName": "Documentación oficial de WhatsApp"
  }
] as const;
