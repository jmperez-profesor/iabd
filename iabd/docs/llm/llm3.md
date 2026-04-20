---
title: Sesión 3 - Chainlit
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Chainlit: framework de Python para crear **interfaces de chat interactivas**

## 1. ¿Qué es Chainlit?

Chainlit nos ayuda a crear frontends para chatbots de IA, herramientas y flujos de trabajo LLM. Abstrae la complejidad del front-end y nos permite centrarnos en la lógica de Python, a la vez que proporciona soporte para añadir botones, controles deslizantes, soporte para subir archivos o incluso conectarte a herramientas que utilicen el **protocolo de contexto de modelo (MCP)**. 

Chainlit es ideal para:

- Prototipos de aplicaciones basadas en LLM
- Crear herramientas internas
- Construir demostraciones educativas
- Conectar tus modelos a herramientas o API externas

Ideas clave:

- Está pensado para **prototipos rápidos**, demos educativas y herramientas internas.  
- Se integra bien con otras librerías como **LangChain** o clientes de LLM (por ejemplo, Ollama). 
- Gestiona por nosotros elementos típicos de una UI de chat:
    - mensajes,
    - acciones (botones, etc.),
    - streaming de respuestas,
    - persistencia de sesiones. 

---

## Componentes de Chainlit

Todas las aplicaciones de Chainlit se basan en unas pocas características esenciales:

1. **Hooks del ciclo de vida del chat**: permiten controlar lo que ocurre en las distintas fases de un chat. Por ejemplo:

    - **`@cl.on_chat_start`** se ejecuta cuando se inicia un chat.
    - **`@cl.on_message`** se ejecuta cuando el usuario envía un mensaje.
    - **`@cl.on_chat_end`** se ejecuta cuando finaliza el chat.

2. **Acciones del IU**: Chainlit permite añadir botones con **`cl.Action`** y manejarlos con **`@cl.action_callback`**. Son perfectas para crear interfaces de usuario limpias e interactivas sin necesidad de que el usuario introduzca texto.

3. **Transmisión de mensajes**: Con los **LLM que admiten la transmisión de tokens**, podemos transmitir respuestas en tiempo real utilizando **`stream=True`**, haciendo que nuestra aplicación parezca más dinámica y receptiva.

4. **Configuración con `config.toml`**: Este archivo permite activar funciones como la persistencia del chat, la carga de archivos, la personalización del tema y los ajustes de usabilidad, todo ello sin modificar tu código Python.

## 2. Instalación y requisitos

Requisitos básicos son:

- Python 3.8 o superior.  
- Instalar Chainlit desde `pip`: 

```bash
pip install chainlit
```

Para el ejemplo con **Ollama + LangChain**, se añaden: 

```bash
pip install chainlit langchain langchain-community
```

---

## 3. Conceptos básicos de Chainlit

Todas las apps de Chainlit se apoyan en unos pocos conceptos fundamentales. 

### 3.1. Hooks del ciclo de vida del chat

Chainlit proporciona **decoradores** que se ejecutan en distintos momentos de la conversación: 

- **`@cl.on_chat_start`**: se lanza al empezar un chat.  
- **`@cl.on_message`**: se lanza cuando el usuario envía un mensaje.  
- **`@cl.on_chat_end`**: se lanza al terminar una sesión.  


#### Construir con @cl.on_chat_start

Este hook se ejecuta cuando se inicia una nueva sesión de chat. Podemos utilizarlo, por ejemplo, **para saludar al usuario, mostrar un mensaje de bienvenida o inicializar el estado de la sesión**.

```python
import chainlit as cl
@cl.on_chat_start
def on_chat_start():
    print("A new chat session has started!")
```
![](./images/chainlist/on_chat_start.png)


#### Construir con @cl.on_message
Este hook de mensaje se ejecuta cuando el usuario envía un nuevo mensaje. Lo utilizamos para procesar la entrada del usuario, llamar a un LLM o devolver una respuesta.

```python
import chainlit as cl

@cl.on_message
async def on_message(msg: cl.Message):
    print("The user sent:", msg.content)
    await cl.Message(content=f"You said: {msg.content}").send()
```

Explicación del código: 
```python
@cl.on_message
async def on_message(msg: cl.Message):
```

- **`@cl.on_message`** es un **decorador** de hook: le dice a Chainlit que esta función se debe ejecutar cada vez que la interfaz reciba un mensaje nuevo del usuario.

- **`async def`** indica que la función es **asíncrona**, porque dentro va a hacer operaciones de E/S (enviar mensajes de vuelta) que Chainlit gestiona con await.

- El parámetro **`msg: cl.Message`** es el objeto mensaje que llega desde la UI; tiene atributos como **`content (texto que ha escrito el usuario)`**, **`author`**, **`created_at`**, etc.

```python
await cl.Message(content=f"You said: {msg.content}").send()
```

- Aquí creamos un nuevo mensaje de respuesta hacia la UI usando la clase **`cl.Message`**.
- Le pasamos el texto de respuesta en el parámetro content, usando una **`f-string`** para incluir lo que escribió el usuario:
    - Si el usuario pone **`“hola”`**, la respuesta será **`“You said: hola”`**.

- **`.send()`** envía ese mensaje a la interfaz de Chainlit, y como es una operación **asíncrona**, necesitas **`await**.

##### Resumen conceptual

Cada vez que el usuario escribe algo en la app Chainlit:

- Chainlit recibe el mensaje y llama automáticamente a tu función decorada con @cl.on_message.

Nuestra función:

- imprime el texto recibido en la terminal (**`print(...)),
- envía un nuevo mensaje de vuelta al usuario repitiendo lo que dijo (**`You said: ...).


Ejemplo mínimo (idea basada en el tutorial): 

```python
import chainlit as cl

@cl.on_chat_start
def on_chat_start():
    print("Nueva sesión de chat iniciada")

@cl.on_message
async def on_message(message: cl.Message):
    await cl.Message(content=f"Has dicho: {message.content}").send()
```

Al ejecutar `chainlit run main.py`, la aplicación abre una UI de chat en el navegador. 

### 3.2. Acciones (`cl.Action`) y callbacks

Chainlit permite añadir **botones y acciones** a los mensajes. 

- Definimos acciones con `cl.Action`.  
- Las gestionamos con `@cl.action_callback("nombre")`. 

Esto facilita crear UIs tipo “elige una opción” sin escribir HTML. 

### 3.3. Streaming de respuestas

El tutorial muestra cómo usar `stream=True` para enviar la respuesta del modelo poco a poco, dando sensación de chat “en directo”. 

Idea general:

- llamas al modelo en modo streaming,  
- vas actualizando el mensaje en pantalla mientras llega la respuesta.

---

## 4. Configuración con `config.toml`

Chainlit utiliza un fichero `config.toml` para activar características sin tocar el código Python. 

Algunas posibilidades que menciona el tutorial:

- **Persistencia del chat**: guardar sesiones para reanudarlas después.  
- **Carga de ficheros**: permitir que el usuario suba archivos.  
- **Personalización visual**: nombre del asistente, tema y opciones de UI. 

Ejemplo de fragmento de configuración (adaptado de la idea del tutorial): 

```toml
[persistence]
enabled = true

[UI]
name = "Assistant"
```

---

## 5. Primer ejemplo: chatbot “Sorpréndeme” estático

El primer ejemplo del tutorial es un bot muy simple que **no usa ningún modelo LLM**, solo botones y lógica fija. 

Idea (sin copiar el código literal): 

1. En `@cl.on_chat_start` se muestran botones con opciones de “sorpresa”.  
2. Cada botón dispara un `@cl.action_callback` distinto.  
3. El bot responde con un mensaje predefinido según el botón.  

Esto sirve para entender:

- cómo crear botones,
- cómo reaccionar a las acciones del usuario,
- cómo enviar mensajes desde callbacks. 

---

## 6. Segundo ejemplo: bot “Sorpréndeme” con Ollama

El segundo ejemplo conecta Chainlit con **Ollama** utilizando **LangChain**. 

La estructura general, según el tutorial, es:

1. Definir un LLM de LangChain que use Ollama, por ejemplo:

   ```python
   from langchain_community.llms import Ollama

   llm = Ollama(model="mistral", temperature=0.7)
   ```

  

2. Crear un flujo en `@cl.on_message` que:
   - recibe el mensaje del usuario,
   - llama al LLM,
   - envía la respuesta en Chainlit (posiblemente en streaming).

3. Opcionalmente, combinarlo con botones (`cl.Action`) para generar diferentes “tipos de sorpresa” (chistes, datos curiosos, etc.). 

Este ejemplo muestra cómo:

- usar Chainlit como **front-end de chat**,
- mientras la lógica de IA vive en LangChain y Ollama. 

---

## 7. Casos de uso recomendados

El tutorial sugiere varios escenarios donde Chainlit encaja muy bien: 

- **Prototipos de aplicaciones LLM**: probar ideas de agentes o chatbots sin tener que construir un frontend completo.  
- **Herramientas internas**: interfaces de chat para equipos (por ejemplo, asistentes de documentación, bots internos de soporte).  
- **Demos educativas**: mostrar cómo funcionan LLMs, LangChain u otras librerías con una UI amigable.  
- **Conexión con APIs y herramientas externas**: crear interfaces de chat que llamen a APIs, bases de datos u otros servicios.  

---
