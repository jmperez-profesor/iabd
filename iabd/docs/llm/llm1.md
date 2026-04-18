---
title: Evolución de una aplicación LLM: de chatbot a agentes y RAG
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Sesión 1 – Evolución de una aplicación LLM: de chatbot a agentes y RAG

## Idea central

Vamos a estudiar una evolución muy habitual en aplicaciones basadas en modelos de lenguaje:

1. Primero construimos un **chatbot básico** con un modelo fundacional como **Mistral**.
2. Después evolucionamos hacia una **aplicación agéntica** con **smolagents**.
3. Finalmente llegamos a una aplicación más avanzada con **RAG + agentes** usando **LangChain**.

La idea no es añadir complejidad por añadirla, sino entender que **cada nueva arquitectura resuelve una limitación real de la anterior**.

---

## Objetivo didáctico

Al finalizar esta sesión, deberías ser capaz de:

- Explicar por qué se empieza normalmente por una aplicación sencilla con un LLM.
- Entender qué aporta una arquitectura basada en agentes.
- Comprender por qué RAG aparece cuando necesitamos trabajar con documentación propia o conocimiento externo.
- Comparar ventajas e inconvenientes de cada fase.

---

## Fase 1: Chatbot simple con un modelo fundacional como Mistral

### ¿Qué construimos?

La primera versión de nuestra aplicación es un **chatbot** que recibe mensajes del usuario y responde usando un modelo fundacional como **Mistral**.

Ejemplo de uso:

- El usuario pregunta: *"¿Qué es un token en un LLM?"*
- El chatbot responde generando texto a partir del prompt recibido.

### ¿Qué aprendemos aquí?

Esta fase es ideal para aprender lo esencial:

- Qué es un prompt.
- Qué es un **system prompt**.
- Cómo se envían mensajes a un modelo.
- Cómo se recibe una respuesta.
- Qué limitaciones tiene un LLM cuando solo “conversa”.

### Ventajas

- Es la forma más simple de empezar.
- Requiere poco código.
- Permite ver resultados muy rápido.
- Sirve para introducir conceptos clave como:
  - prompt,
  - system prompt,
  - contexto,
  - temperatura,
  - longitud de salida.

### Desventajas

- El modelo **solo responde**: no actúa sobre herramientas ni consulta fuentes externas.
- Puede **alucinar** o inventarse información.
- No sabe nada de nuestros documentos propios si no se los pasamos en el prompt.
- El alumnado puede pensar erróneamente que “usar IA generativa” es solo hacer chatbots.

### Idea clave

> Un chatbot con un modelo fundacional es un excelente punto de partida, pero no suele ser suficiente para construir una aplicación útil y robusta en un entorno real.

---

## Fase 2: Aplicación agéntica con smolagents

### ¿Qué cambia?

Ahora dejamos de pensar en el modelo como un simple generador de texto y pasamos a verlo como un **agente**.

Un agente no solo responde: también puede

- decidir,
- planificar,
- usar herramientas,
- ejecutar acciones,
- encadenar pasos.

Con **smolagents** podemos construir agentes de forma bastante ligera.

### Ejemplo de evolución

Antes:

- El chatbot respondía:  
  *"Creo que tienes estos documentos..."*

Ahora:

- El agente puede llamar a una tool como `listar_documentos()`.
- Puede leer una función.
- Puede decidir usar una herramienta antes de responder.

### ¿Qué aprendemos aquí?

- Qué es una **tool**.
- Qué es un **agente**.
- Qué diferencia hay entre “responder” y “actuar”.
- Cómo delegar pequeñas tareas al modelo.

### Ventajas

- Introduce una arquitectura mucho más útil.
- Permite automatizar acciones.
- Hace visibles conceptos fundamentales de IA aplicada:
  - decisión,
  - planificación,
  - observación,
  - ejecución.
- smolagents es muy adecuado para aprender porque tiene una curva de entrada relativamente baja.

### Desventajas

- Añade complejidad mental y técnica.
- Puede parecer “magia” si no entendemos bien cómo decide el agente.
- Si la aplicación crece mucho, podemos necesitar una arquitectura más completa y modular.

### Idea clave

> Un agente es más potente que un chatbot porque no solo habla: también puede actuar usando herramientas.

---

## Fase 3: Aplicación avanzada con RAG y agentes usando LangChain

### ¿Qué problema aparece ahora?

Aunque tengamos agentes, sigue existiendo una limitación importante:

- el modelo no tiene acceso fiable a nuestros apuntes,
- no conoce documentos privados,
- no puede responder bien sobre contenidos específicos del curso si no se los damos explícitamente.

Aquí aparece **RAG**.

### ¿Qué es RAG?

**RAG** significa **Retrieval-Augmented Generation**.

La idea es:

1. Recuperar fragmentos relevantes de documentación.
2. Pasarlos al modelo como contexto.
3. Generar una respuesta apoyada en esas fuentes.

### ¿Por qué usar LangChain aquí?

Porque LangChain proporciona piezas muy útiles para construir esta arquitectura:

- carga de documentos,
- fragmentación,
- embeddings,
- recuperación,
- cadenas de generación,
- integración con agentes.

### Ejemplo de evolución

Antes:

- El agente intentaba responder “de memoria”.

Ahora:

- El sistema busca en apuntes o documentos del curso.
- Recupera los fragmentos más relevantes.
- Responde usando ese contexto.

### ¿Qué aprendemos aquí?

- Qué problema resuelve RAG.
- Cómo conectar documentos y modelos.
- Cómo construir una aplicación más robusta y útil.
- Cómo integrar agentes con recuperación de información.

### Ventajas

- Reduce alucinaciones.
- Permite trabajar con conocimiento propio.
- Mejora la precisión.
- Hace la arquitectura más profesional y reutilizable.
- Encaja muy bien en aplicaciones reales de empresa y educación.

### Desventajas

- Es la fase más compleja.
- Requiere más componentes.
- Necesita más diseño, pruebas y depuración.
- Si no se entiende primero el problema, puede parecer una receta técnica sin sentido.

### Idea clave

> RAG no sustituye al LLM: lo complementa con acceso a conocimiento externo relevante.

---

## Comparativa global

| Fase | Qué hace | Ventajas | Limitaciones |
|---|---|---|---|
| Chatbot con Mistral | Conversa con el usuario | Simple, rápido, ideal para empezar | No usa tools ni documentos externos |
| Agente con smolagents | Usa herramientas y toma decisiones | Más útil y flexible | Más complejidad y depuración |
| RAG + agentes con LangChain | Recupera información y responde con contexto | Más robusto, más realista, más profesional | Arquitectura más compleja |

---

## El mismo ejemplo evolucionando

Vamos a imaginar siempre el mismo caso: un **Asistente técnico del módulo**.

### Versión 1 – Chatbot

- Responde dudas generales.
- Usa solo el modelo Mistral.
- No consulta apuntes ni herramientas.

### Versión 2 – Agente con smolagents

- Puede usar tools.
- Por ejemplo:
  - listar documentos,
  - leer un resumen,
  - consultar un dato auxiliar.

### Versión 3 – RAG + agentes con LangChain

- Busca en una colección de apuntes o documentación.
- Recupera fragmentos relevantes.
- Construye una respuesta fundamentada en esos documentos.
- Puede incluir además un agente coordinador que decida cuándo usar RAG.

---

## Mensaje docente clave

La evolución correcta no es:

> “Como existe una tecnología más compleja, la usamos desde el principio.”

La evolución correcta es:

> “Primero resolvemos el problema con la solución más simple posible; después añadimos nuevas capas cuando aparece una limitación real.”

---

## Preguntas para reflexionar

1. ¿Qué puede hacer un agente que no puede hacer un chatbot simple?
2. ¿Por qué un modelo fundacional no basta cuando queremos trabajar con apuntes del curso?
3. ¿Qué aporta RAG frente a pedirle al modelo que responda “de memoria”?
4. ¿Qué inconvenientes tiene introducir demasiada complejidad demasiado pronto?

---

## Actividad breve

En grupos de 2 o 3 personas:

1. Pensad en una aplicación educativa basada en IA.
2. Describid cómo sería en estas tres versiones:
   - chatbot simple,
   - agente con tools,
   - sistema con RAG y agentes.
3. Indicad:
   - qué problema resuelve cada versión,
   - qué nueva capacidad aporta,
   - qué complejidad añade.

---

## Cierre

La evolución que vamos a seguir en esta unidad será:

**chatbot básico → agente con tools → sistema con RAG y agentes**

porque refleja muy bien cómo se diseñan aplicaciones LLM reales:

- primero entendemos el modelo,
- luego aprendemos a darle capacidad de actuar,
- y finalmente lo conectamos con conocimiento útil y arquitectura modular.