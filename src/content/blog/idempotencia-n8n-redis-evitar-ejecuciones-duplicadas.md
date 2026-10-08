---
title: "Idempotencia en n8n con Redis: evita procesos duplicados"
seoTitle: "Idempotencia en n8n con Redis: evita duplicados | ConnectologyIA"
description: "Aprende a diseñar idempotencia en n8n con claves únicas, Redis, TTL y reintentos seguros para no duplicar pedidos, mensajes ni registros."
primaryKeyword: "idempotencia n8n Redis"
secondaryKeywords: ["evitar duplicados n8n", "reintentos seguros n8n", "SET NX Redis"]
category: "Automatización de procesos"
tags: ["automatizacion-con-n8n", "integraciones-y-apis"]
datePublished: "2026-10-08"
image: "/og/n8n.png"
imageAlt: "Flujo de idempotencia entre n8n y Redis"
relatedPosts: ["automatizar-leads-n8n-crm", "observabilidad-logging-workflows-n8n-produccion", "webhooks-vs-polling-automatizaciones"]
relatedServices: ["automatizacion-con-n8n", "integraciones-y-apis"]
---

Un webhook puede llegar dos veces. Una API puede agotar el tiempo de espera aunque haya guardado el dato. Un operador puede pulsar “reintentar” sin saber que una parte del flujo terminó. Si el workflow vuelve a cobrar, crear un pedido o enviar un mensaje, el problema no es el disparador: falta idempotencia.

Una operación idempotente produce el mismo estado aunque reciba varias veces la misma solicitud. No significa ignorar todos los eventos repetidos. Significa identificar cada operación de negocio y decidir, de forma atómica, si es nueva, está en curso o ya terminó.

## Elige una clave ligada al negocio

La clave debe representar la acción que no quieres repetir. Un `executionId` de n8n cambia en cada reintento y por eso no suele servir. Son mejores un identificador de evento entregado por el proveedor, el número de pedido o una combinación estable:

```text
whatsapp:message:{message_id}
crm:lead:{source}:{external_id}
invoice:create:{customer_id}:{period}
```

Evita construirla solo con nombre, teléfono o fecha si esos valores pueden cambiar o coincidir legítimamente. Cuando el proveedor no envía un ID, normaliza los campos relevantes y calcula un hash. Documenta qué atributos forman la clave y durante cuánto tiempo debe considerarse duplicada.

## Reserva la operación de forma atómica

Consultar si una clave existe y luego crearla son dos acciones separadas: dos ejecuciones simultáneas podrían superar la consulta antes de que alguna escriba. Redis permite reservar una clave solo cuando todavía no existe mediante `SET ... NX`, con una expiración para evitar bloqueos permanentes.

```text
SET idempotency:{key} processing NX EX 300
```

Si Redis responde que creó la clave, el workflow continúa. Si no, la ejecución debe consultar el estado y finalizar, esperar o devolver el resultado anterior según el caso. La documentación de Redis muestra este patrón de exclusión con `SET NX` y TTL en su guía sobre [bloqueo distribuido para respuestas duplicadas](https://redis.io/tutorials/chat-sdk-slackbot-distributed-locking/).

El TTL de `processing` debe superar la duración habitual del flujo, con margen. Si es demasiado corto, otra ejecución podría entrar mientras la primera sigue trabajando. Si es demasiado largo, una caída podría bloquear el proceso durante horas.

## Separa “en curso” de “completado”

Una sola marca `seen=true` no informa si la acción terminó. Guarda un estado pequeño:

1. `processing`: la ejecución obtuvo la reserva.
2. `completed`: la operación terminó, con referencia del resultado.
3. `failed`: se puede reintentar según una política explícita.

Al completar, reemplaza el valor y amplía el TTL al periodo en que el proveedor podría repetir el evento. Para un webhook, pueden ser horas o días; para una factura mensual, la clave quizá deba persistir durante todo el periodo contable. No copies datos sensibles completos a Redis si basta un ID de resultado.

## Orden correcto en un workflow n8n

Un flujo robusto suele seguir esta secuencia:

1. Validar autenticidad, formato y campos obligatorios.
2. Extraer o construir la clave idempotente.
3. Intentar la reserva atómica en Redis o en una base de datos con restricción única.
4. Ejecutar el efecto irreversible.
5. Guardar `completed` y una referencia de respuesta.
6. Registrar métricas y responder al origen.

La idempotencia debe aplicarse antes del efecto que importa. Ponerla después de enviar el mensaje solo impide duplicar los pasos posteriores. En operaciones críticas, una restricción única en la base de datos de destino ofrece una segunda defensa.

## Reintentos que no agravan el error

Reintenta fallos transitorios, como un `429`, `502` o timeout, con espera creciente y un límite. No reintentes indefinidamente errores de validación o permisos. Si el estado externo quedó incierto, consulta el destino con la clave de negocio antes de repetir la escritura.

n8n permite revisar y reintentar ejecuciones fallidas con los datos guardados, según su documentación de [ejecuciones](https://docs.n8n.io/workflows/executions/all-executions/). Esa capacidad ayuda a recuperar un proceso, pero no sustituye la protección en el diseño: un reintento manual también debe pasar por la misma comprobación idempotente.

## Pruebas mínimas antes de producción

Envía el mismo evento dos veces de forma secuencial y luego simultánea. Simula un timeout justo después de escribir en el destino. Fuerza una caída antes de marcar `completed` y comprueba qué sucede al vencer el TTL. Verifica además que dos operaciones legítimas parecidas no compartan clave.

Este patrón complementa una arquitectura de [webhooks frente a polling](/blog/webhooks-vs-polling-automatizaciones) y el control de [leads duplicados entre n8n y un CRM](/blog/automatizar-leads-n8n-crm). Si necesitas diseñarlo dentro de un proceso real, revisa nuestro servicio de [automatización con n8n](/servicios/automatizacion-con-n8n).

La meta es poder repetir una solicitud sin miedo. Una clave estable, una reserva atómica, estados explícitos y pruebas de concurrencia convierten los reintentos en una herramienta de recuperación en lugar de una fuente de duplicados.
