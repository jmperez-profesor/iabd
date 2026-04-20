---
title: Sesión 4 
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

---
title: "Chainlit: resumen práctico del tutorial de DataCamp"
layout: page
---

# Chainlit: resumen práctico del tutorial de DataCamp

El objetivo es que el alumnado:

- entienda **qué es Chainlit** y para qué sirve,  
- pueda **seguir los ejemplos básicos** (chatbot “Sorpréndeme” y bot con Ollama),  
- sepa **cómo integrarlo** con sus propias aplicaciones LLM. [web:214][web:215]

---

## 1. ¿Qué es Chainlit?

Chainlit es un framework de Python, de código abierto, que permite crear **interfaces de chat interactivas** para aplicaciones basadas en modelos de lenguaje, sin necesidad de programar un frontend complejo. [web:214][web:215]

Ideas clave:

- Está pensado para **prototipos rápidos**, demos educativas y herramientas internas. [web:214]  
- Se integra bien con otras librerías como **LangChain** o clientes de LLM (por ejemplo, Ollama). [web:214][web:215]  
- Gestiona por ti elementos típicos de una UI de chat:
  - mensajes,
  - acciones (botones, etc.),
  - streaming de respuestas,
  - persistencia de sesiones. [web:214][web:215]

---

## 2. Instalación y requisitos

Según el tutorial, los requisitos básicos son:

- Python 3.8 o superior.  
- Instalar Chainlit desde `pip`: [web:214][web:215]

```bash
pip install chainlit
```

Para el ejemplo con **Ollama + LangChain**, se añaden: [web:214][web:215]

```bash
pip install chainlit langchain langchain-community
```

---

## 3. Conceptos básicos de Chainlit

El artículo explica que todas las apps de Chainlit se apoyan en unos pocos conceptos fundamentales. [web:214][web:215]

### 3.1. Hooks del ciclo de vida del chat

Chainlit proporciona decoradores que se ejecutan en distintos momentos de la conversación: [web:214][web:215]

- `@cl.on_chat_start`: se lanza al empezar un chat.  
- `@cl.on_message`: se lanza cuando el usuario envía un mensaje.  
- `@cl.on_chat_end`: se lanza al terminar una sesión.  

Ejemplo mínimo (idea basada en el tutorial): [web:214][web:215]

```python
import chainlit as cl

@cl.on_chat_start
def on_chat_start():
    print("Nueva sesión de chat iniciada")

@cl.on_message
async def on_message(message: cl.Message):
    await cl.Message(content=f"Has dicho: {message.content}").send()
```

Al ejecutar `chainlit run main.py`, la aplicación abre una UI de chat en el navegador. [web:214][web:215]

### 3.2. Acciones (`cl.Action`) y callbacks

Chainlit permite añadir **botones y acciones** a los mensajes. [web:214][web:215]

- Definimos acciones con `cl.Action`.  
- Las gestionamos con `@cl.action_callback("nombre")`. [web:214][web:215]

Esto facilita crear UIs tipo “elige una opción” sin escribir HTML. [web:214][web:215]

### 3.3. Streaming de respuestas

El tutorial muestra cómo usar `stream=True` para enviar la respuesta del modelo poco a poco, dando sensación de chat “en directo”. [web:214][web:215]

Idea general:

- llamas al modelo en modo streaming,  
- vas actualizando el mensaje en pantalla mientras llega la respuesta.

---

## 4. Configuración con `config.toml`

Chainlit utiliza un fichero `config.toml` para activar características sin tocar el código Python. [web:214][web:215]

Algunas posibilidades que menciona el tutorial:

- **Persistencia del chat**: guardar sesiones para reanudarlas después.  
- **Carga de ficheros**: permitir que el usuario suba archivos.  
- **Personalización visual**: nombre del asistente, tema y opciones de UI. [web:214][web:215]

Ejemplo de fragmento de configuración (adaptado de la idea del tutorial): [web:214][web:215]

```toml
[persistence]
enabled = true

[UI]
name = "Assistant"
```

---

## 5. Primer ejemplo: chatbot “Sorpréndeme” estático

El primer ejemplo del tutorial es un bot muy simple que **no usa ningún modelo LLM**, solo botones y lógica fija. [web:214][web:215]

Idea (sin copiar el código literal): [web:214][web:215]

1. En `@cl.on_chat_start` se muestran botones con opciones de “sorpresa”.  
2. Cada botón dispara un `@cl.action_callback` distinto.  
3. El bot responde con un mensaje predefinido según el botón.  

Esto sirve para entender:

- cómo crear botones,
- cómo reaccionar a las acciones del usuario,
- cómo enviar mensajes desde callbacks. [web:214][web:215]

---

## 6. Segundo ejemplo: bot “Sorpréndeme” con Ollama

El segundo ejemplo conecta Chainlit con **Ollama** utilizando **LangChain**. [web:214][web:215]

La estructura general, según el tutorial, es:

1. Definir un LLM de LangChain que use Ollama, por ejemplo:

   ```python
   from langchain_community.llms import Ollama

   llm = Ollama(model="mistral", temperature=0.7)
   ```

   [web:214][web:215]

2. Crear un flujo en `@cl.on_message` que:
   - recibe el mensaje del usuario,
   - llama al LLM,
   - envía la respuesta en Chainlit (posiblemente en streaming). [web:214][web:215]

3. Opcionalmente, combinarlo con botones (`cl.Action`) para generar diferentes “tipos de sorpresa” (chistes, datos curiosos, etc.). [web:214][web:215]

Este ejemplo muestra cómo:

- usar Chainlit como **front-end de chat**,
- mientras la lógica de IA vive en LangChain y Ollama. [web:214][web:215]

---

## 7. Casos de uso recomendados

El tutorial sugiere varios escenarios donde Chainlit encaja muy bien: [web:214][web:215][web:216]

- **Prototipos de aplicaciones LLM**: probar ideas de agentes o chatbots sin tener que construir un frontend completo.  
- **Herramientas internas**: interfaces de chat para equipos (por ejemplo, asistentes de documentación, bots internos de soporte).  
- **Demos educativas**: mostrar cómo funcionan LLMs, LangChain u otras librerías con una UI amigable.  
- **Conexión con APIs y herramientas externas**: crear interfaces de chat que llamen a APIs, bases de datos u otros servicios.  

---

## 8. Cómo usar este resumen en clase

Sugerencias para integrarlo en tus materiales:

- Usarlo como **apunte previo** antes de mandarles al tutorial completo.  
- Montar en directo un “Sorpréndeme” básico en clase siguiendo la estructura descrita.  
- Plantear como práctica:
  - que el alumnado modifique el ejemplo estático para añadir nuevos botones,
  - o que conecte un modelo diferente en la demo con Ollama.

---

## 9. Enlaces útiles

- Tutorial original en español:  
  [https://www.datacamp.com/es/tutorial/chainlit](https://www.datacamp.com/es/tutorial/chainlit) [web:214]

- Versión en inglés (contenido equivalente):  
  [https://www.datacamp.com/tutorial/chainlit](https://www.datacamp.com/tutorial/chainlit) [web:215]

- Otros tutoriales de IA generativa en DataCamp:  
  [https://www.datacamp.com/es/tutorial/category/generative-ai](https://www.datacamp.com/es/tutorial/category/generative-ai) [web:216]

---

> Nota: este documento es un **resumen original** basado en el tutorial de DataCamp. No reproduce literalmente su contenido, por lo que, para detalles completos y código exacto, se recomienda consultar el artículo original. [web:214][web:215]
