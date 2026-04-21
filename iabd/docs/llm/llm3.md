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


#### Construir con **`@cl.on_chat_start`**

Este hook se ejecuta cuando se inicia una nueva sesión de chat. Podemos utilizarlo, por ejemplo, **para saludar al usuario, mostrar un mensaje de bienvenida o inicializar el estado de la sesión**.

```python
import chainlit as cl

@cl.on_chat_start
def on_chat_start():
    print("A new chat session has started!")
```
![](./images/chainlist/on_chat_start.png)

#### Construir con `@cl.on_message`

Este hook de mensaje se ejecuta cuando el usuario envía un nuevo mensaje. Lo utilizamos para procesar la entrada del usuario, llamar a un LLM o devolver una respuesta.

```python
import chainlit as cl

@cl.on_message
async def on_message(msg: cl.Message):
    print("The user sent:", msg.content)
    await cl.Message(content=f"You said: {msg.content}").send()
```

![](./images/chainlist/on_message.png)

Explicación del código: 
```python
@cl.on_message
async def on_message(msg: cl.Message):
```

- **`@cl.on_message`** es un **decorador** de hook: le dice a Chainlit que esta función se debe ejecutar cada vez que la interfaz reciba un mensaje nuevo del usuario.

- **`async def`** indica que la función es **asíncrona**, porque dentro va a hacer operaciones de E/S (enviar mensajes de vuelta) que Chainlit gestiona con **`await`**.

- El parámetro **`msg: cl.Message`** es el objeto **mensaje** que llega desde la UI; tiene atributos como **`content (texto que ha escrito el usuario)`**, **`author`**, **`created_at`**, etc.

```python
await cl.Message(content=f"You said: {msg.content}").send()
```

- Aquí creamos un nuevo mensaje de respuesta hacia la UI usando la clase **`cl.Message`**.
- Le pasamos el texto de respuesta en el parámetro `content`, usando una **`f-string`** para incluir lo que escribió el usuario:
    - Si el usuario pone **`“hola”`**, la respuesta será **`“You said: hola”`**.

- **`.send()`** envía ese mensaje a la interfaz de Chainlit, y como es una operación **asíncrona**, necesitas **`await`**.

#### Construyendo con `@cl.on_stop`

El gancho **`on_stop`** se ejecuta cuando el usuario pulsa el botón de parada (⏹) durante una tarea en ejecución. Sirve para cancelar operaciones de larga duración o limpiar sesiones interrumpidas.

```python
import chainlit as cl
import asyncio

@cl.on_chat_start
async def start():
    await cl.Message("Type anything and I'll pretend to work on it.").send()

@cl.on_message
async def on_message(msg: cl.Message):
    await cl.Message("Working on it... you can press Stop").send()
    try:
        # Simulamos una tarea larga de 10 segundos
        await asyncio.sleep(10)
        await cl.Message("Task complete!").send()
    except asyncio.CancelledError:
        print("Task was interrupted!")
        # Opcional, tan solo para los logs del servidor
        raise

@cl.on_stop
async def on_stop():
    print("The user clicked Stop!")
```
Cuando el usuario envía un mensaje, Chainlit simula una tarea con **`asyncio.sleep(10)`**. Si el usuario pulsa el botón de parada (⏹), la tarea se cancela y se activa **`@cl.on_stop`** para registrar la interrupción.

![](./images/chainlist/on_chat_stop.png)

#### Construir con **`@cl.on_chat_end`**

Este hook se activa cuando finaliza la sesión, ya sea porque el usuario actualiza, cierra la pestaña o inicia una nueva sesión. **Suele utilizarse para registrar desconexiones o guardar el estado**.

```python
import chainlit as cl

@cl.on_chat_start
async def on_chat_start():
    await cl.Message("Welcome! Feel free to leave anytime").send()

@cl.on_chat_end
async def on_chat_end():
    print("The user disconnected!")
```

Una vez abierto el **`localhost`**, podmeos trabajar con él. Cuando cerremos la pestaña o la ventana de localhost, el terminal mostrará lo siguiente:

![on_chat_end() chainlit output](./images/chainlist/on_chat_end.png)

#### Acciones de IU (botones)

Chainlit nos permite añadir botones interactivos directamente en la interfaz de nuestro chatbot. Cada botón se define como una acción y se conecta a una **función de llamada de retorno de Python**. Podemos enviar botones como parte de un **Mensaje** utilizando el argumento **acciones**:

```python
import chainlit as cl

@cl.on_chat_start
async def start():
    actions = [
        cl.Action(
            name="hello", #nombre del callback
            label="👋 Say Hello",
            icon="smile",
            payload={"value": "hi"}
        )
    ]
    await cl.Message("Click a button!", actions=actions).send()
```

Así es como podemeos gestionar la pulsación de un botón:

```python
@cl.action_callback("hello")
async def on_hello(action: cl.Action):
    await cl.Message("Hello there! 👋").send()
```

El decorador **`@cl.action_callback("hello")`** indica a Chainlit que escuche los clics en un botón con el nombre **`"hola"`**. Cuando se pulsa, envía un mensaje amistoso al usuario en la interfaz de chat.

![@cl.action_callback chainlit salida](./images/chainlist/callback_hello.png)

**Consejo**: podemos personalizar la carga útil con cualquier dato que quieras enviar al servidor.

#### Transmisión de mensajes 

**Chainlit** admite la transmisión en tiempo real de las respuestas LLM. Esto significa que podemos enviar contenido al usuario de forma incremental a medida que se genera.

```python
@cl.on_message
async def on_message(message: cl.Message):
    await cl.Message(content="Pensando...").send()
    async for chunk in llm.astream(message.content):
        await cl.Message(content=chunk, author="LLM", stream=True).send()
```

**Vamos a desglosarlo:**

- En primer lugar, muestra inmediatamente un mensaje "Pensando..." para que el usuario sepa que la aplicación está funcionando.
- Después, envía el mensaje del usuario a un **LLM compatible con streaming**.
- A medida que el modelo genera resultados, transmite cada **fragmento (chunk)** a la interfaz de usuario en tiempo real.
- El parámetro **`stream=True`** garantiza que cada trozo aparezca de forma incremental en lugar de esperar a la respuesta completa.

**Nota**: Esto funciona mejor con los modelos que admiten streaming.







##### Resumen conceptual

Cada vez que el usuario escribe algo en la app de Chainlit:

- Chainlit recibe el mensaje y llama automáticamente a tu función decorada con **`@cl.on_message`**.

Nuestra función:

- imprime el texto recibido en la terminal (**`print(...)`**),
- envía un nuevo mensaje de vuelta al usuario repitiendo lo que dijo (**`You said: ...`**).


Ejemplo mínimo: 

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
