---
title: Sesión 3 - Chainlit
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Chainlit: framework de Python para crear **interfaces de chat interactivas**

![](./images/chainlist/overview.mp4)

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

**Nota**: Esto funciona mejor con los modelos que admiten **streaming**.


#### Configuración de Chainlit (config.toml)

Para desbloquear potentes funciones como la **persistencia del chat**, **la subida de archivos**, la **tematización** y mucho más, podemos personalizar nuestra aplicación Chainlit utilizando el archivo **`config.toml`**. Este archivo reside en la raíz del directorio de nuestro proyecto (en la carpeta **`.chainlit`** ) y nos permite ajustar el comportamiento en tiempo de ejecución sin modificar el código.

##### Persistencia
Este parámetro permite a Chainlit persistir el historial de chat y el estado de la sesión. Activa el *hook* **`@cl.on_chat_resume`**, por lo que es ideal para aplicaciones en las que los usuarios pueden desconectarse y volver más tarde.

```bash
[persistence]
enabled = true
```

##### Carga de archivos

Este ajuste permite a los usuarios subir archivos en la interfaz del chat. Podemos restringir los tipos y tamaños de archivo permitidos para garantizar la seguridad y el rendimiento.

```bash
[features.spontaneous_file_upload]
enabled = true
accept = ["*/*"] 
max_files = 5
max_size_mb = 500
```
Ejemplos de algunos tipos de archivos que acepta Chainlit.

```json
# 1. For specific file types:
    # accept = ["image/jpeg", "image/png", "application/pdf"]
# 2. For all files of a certain type:
    #    accept = ["image/*", "audio/*", "video/*"]
# 3. For specific file extensions:
    #    accept = { "application/octet-stream" = [".xyz", ".pdb"] }
```

Esto permite adaptar las cargas para **casos de uso de seguridad, rendimiento o específicos del dominio**.

##### Personalización de la IU

Esta personalización cambia el nombre del asistente en el parámetro de la IU y activa la **Cadena de Pensamiento (CoT)**(dar las instrucciones adecuadas para facilitar al modelo la realización de tareas complejas que requieran razonamiento o resolución de problemas) en el modo de representación, que es útil para razonar paso a paso o depurar.

```json
[UI]
name = "Assistant"
cot = "full"
```

##### Ajustes de usabilidad
Mejoran la experiencia del usuario desplazando automáticamente los mensajes nuevos a la vista y permitiendo la edición de mensajes.

```json
[features]
user_message_autoscroll = true
edit_message = true
```

Los ajustes de usabilidad anteriores permiten al usuario activar las funciones de desplazamiento automático y edición de mensajes dentro de la interfaz de usuario.


## 4. Primer ejemplo: chatbot “Sorpréndeme” estático (sin LLM)

Ahora que conocemos los componentes básicos de Chainlit, vamos a crear una sencilla aplicación basada en una interfaz de usuario que utilice botones para mostrar datos divertidos predefinidos o mensajes de motivación para programadores.

**bot_surprise_sin_llm.py**

```python
import chainlit as cl
import random

FUN_FACTS = [
    "💡 ¿Sabías que Chainlit admite la subida de archivos y temas personalizados?",
    "💡 ¡Puedes añadir botones, controles deslizantes e imágenes directamente en la interfaz de usuario de tu chatbot!",
    "💡 ¡Chainlit admite la ejecución de herramientas en tiempo real con LangChain y LLM!",
    "💡 ¡Puedes personalizar el aspecto de tu chatbot con solo un archivo CSS!",
    "💡 ¡Chainlit te permite conectarte a herramientas utilizando el Protocolo de Contexto de Modelo (MCP)!
]
SURPRISES = [
    "🎉 ¡Sorpresa! ¡Lo estás haciendo genial!",
    "🚀 ¡Sigue así, estás haciendo un progreso increíble!",
    "🌟 Dato curioso: alguien ahí fuera acaba de sonreír gracias a ti. ¿Por qué no hacer que sean dos?",
    "👏 ¡Bravo! ¡Acabas de desbloquear +10 XP de desarrollador imaginario!",
    "💪 Recuerda: ¡incluso los errores temen tus habilidades de depuración!"
]

@cl.on_chat_start
async def start():
    actions = [
        cl.Action(
            name="surprise_button",
            label="🎁 Sorpréndeme",
            icon="gift",
            payload={"value": "surprise"}
        ),
        cl.Action(
            name="fact_button",
            label="💡 ¿Los sabías?",
            icon="lightbulb",
            payload={"value": "fact"}
        )
    ]
    await cl.Message(content="Elige una acción:", actions=actions).send()

@cl.action_callback("surprise_button")
async def on_surprise(action: cl.Action):
    suprise = random.choice(SUPRISES)
    await cl.Message(content=suprise).send()

@cl.action_callback("fact_button")
async def on_fact(action: cl.Action):
    fact = random.choice(FUN_FACTS)
    await cl.Message(content=fact).send()
```

El código anterior define dos listas: **`"FUN_FACTS"`** para consejos interesantes de Chainlit y **`"SUPRISES"`** para mensajes motivadores.

- Cuando se inicia un nuevo chat, se muestran dos botones: **"Sorpréndeme"** y **"¿Lo sabías?"** utilizando **`cl.Action`**
- Al hacer clic en **"Sorpréndeme"** se activa **`@cl.action_callback("surprise_button")`**, el cual envía un mensaje sorpresa aleatorio.
- Al hacer clic en **"¿Lo sabías?"** se activa **`@cl.action_callback("fact_button")`**, que envía un hecho divertido aleatorio.

Esto crea un chatbot sencillo e interactivo mediante botones que no requiere LLM y es perfecto para aprender cómo funcionan las acciones y las llamadas de retorno de Chainlit.

Para ejecutar esta aplicación, simplemente ejecuta el siguiente comando en el terminal:

```bash
chainlit run main.py
```

Veremos botones interactivos en la interfaz de usuario que activan datos o mensajes divertidos.

![Sorpréndeme Bot (sin LLM)](./images/chainlist/bot_sorpresa_sin_llm.png)


## 5. Proyecto: Bot Sorpréndeme Powered by Ollama

Ahora, vamos a automatizar este proceso y a generar los mensajes de sorpresa y de hecho utilizando un LLM local a través de Ollama.

```python
import chainlit as cl
from langchain_community.llms import Ollama
import random

llm = Ollama(model="mistral", temperature=0.7)  # Usamos cualquier modelo local ligero

# Reusable action buttons
def get_action_buttons():
    return [
        cl.Action(
            name="surprise_button",
            label="🎁 Sorpréndeme",
            icon="gift",
            payload={"value": "surprise"}
        ),
        cl.Action(
            name="fact_button",
            label="💡 ¿Los sabías?",
            icon="lightbulb",
            payload={"value": "fact"}
        )
    ]

@cl.on_chat_start
async def start():
    await cl.Message(content="Elige una acción a continuación para ver algo divertido:").send()
    await cl.Message(content="", actions=get_action_buttons()).send()

@cl.action_callback("surprise_button")
async def on_surprise(action: cl.Action):
    prompt = "Envía un mensaje sorpresa breve y motivador a un desarrollador. ¡Hazlo divertido!"

    try:
        surprise = llm.invoke(prompt).strip()
    except Exception:
        surprise = "🎉 ¡Sorpresa! ¡Lo estás haciendo genial!"
    
    await cl.Message(content=surprise).send()
    await cl.Message(content="", actions=get_action_buttons()).send()  

@cl.action_callback("fact_button")
async def on_fact(action: cl.Action):
    prompt = "Dame un dato divertido y útil sobre los LLM o Chainlit."
    
    try:
        fact = llm.invoke(prompt).strip()
    except Exception:
        fact = "💡 ¿Sabías que puedes añadir controles deslizantes y botones a Chainlit con tan solo unas pocas líneas de código?"
    
    await cl.Message(content=fact).send()
    await cl.Message(content="", actions=get_action_buttons()).send()  
```
Esta app de Chainlit integra un LLM local (a través de Ollama con el modelo Mistral) para generar dinámicamente respuestas basadas en las interacciones del usuario.

- Define dos botones **`cl.Action`**: **"Sorpréndeme"** y **"¿Lo sabías?"** utilizando una función reutilizable get_action_buttons().
- Al inicializar el chat (**`@cl.on_chat_start`**) envía un mensaje con estos botones interactivos.
- Cuando el usuario pulsa el botón **"Sorpréndeme"**, el gestor **`@cl.action_callback`** envía un mensaje al LLM solicitando un mensaje breve y edificante de los programadores. La respuesta se limpia con la función **`.strip()`** y se devuelve al chat.
- Del mismo modo, al hacer clic en **"¿Sabías que...?"** se invoca el LLM con una pregunta que solicita un dato informativo sobre Chainlit o los LLM.
- Si el LLM falla, se devuelven respuestas estáticas de emergencia.
- Después de cada interacción, los botones se reenvían para mantener el bucle conversacional.

Esto demuestra cómo **combinar `Chainlit UI` con la generación de contenidos basada en LLM**, ofreciendo una base modular y extensible para aplicaciones de chat locales potenciadas por IA.

Ejecuta el siguiente comando en el terminal:

```bash
ollama run mistral
chainlit run main.py
```

Ahora tenemos un asistente de IA local y en directo que genera mensajes automatizados.

![Bot Sorprendeme impulsado por Ollama](./images/chainlist/bot_sorpresa_ollama.png)

Conclusión
---

## 7. Casos de uso recomendados

El tutorial sugiere varios escenarios donde Chainlit encaja muy bien: 

- **Prototipos de aplicaciones LLM**: probar ideas de agentes o chatbots sin tener que construir un frontend completo.  
- **Herramientas internas**: interfaces de chat para equipos (por ejemplo, asistentes de documentación, bots internos de soporte).  
- **Demos educativas**: mostrar cómo funcionan LLMs, LangChain u otras librerías con una UI amigable.  
- **Conexión con APIs y herramientas externas**: crear interfaces de chat que llamen a APIs, bases de datos u otros servicios.  

---

## Actividad: Migrar agentes de Mistral Studio a una app Chainlit con funciones propias

### Contexto

En la sesión anterior (LLM2) creaste en **Mistral Studio AI** dos agentes en el playground:

- **Agente A – Tutor técnico de Flask**  
- **Agente B – Generador creativo de ideas**

Aquella actividad se centraba en definir bien el **rol**, las **instrucciones** y el **tono** de cada agente, pero **sin usar herramientas (tools)** ni funciones propias del agente.

En esta sesión (LLM3) vamos a dar un paso más: vas a construir una **aplicación propia** en Python usando **Chainlit** como interfaz de chat, reutilizando la idea de los dos agentes, pero añadiendo **funciones personalizadas** que el modelo pueda llamar cuando lo necesite, siguiendo el patrón de integración oficial entre Chainlit y Mistral. 

---

### Objetivo de la actividad

Construir una aplicación llamada, por ejemplo, `llm3-chainlit-agentes`, que:

- use **Chainlit** como interfaz de chat, 
- se conecte a **Mistral AI** desde Python, 
- implemente **dos agentes lógicos** (A y B) con instrucciones distintas,  
- y añada **funciones personalizadas (tools)** que el modelo pueda invocar mediante *function calling*, para tareas como obtener el tiempo, la hora o el precio de una acción. 

---

### Definición de los agentes

Puedes mantener los nombres originales, pero se recomienda actualizar ligeramente el rol del agente A para encajarlo mejor con el uso de tools:

- **Agente A – Planificador práctico / consultor técnico**  
  - Ayuda a planificar tareas, proyectos o pequeñas “rutas” (por ejemplo, un mini plan de estudio, una ruta de viaje sencillo, etc.).  
  - Se centrará más en **información factual y estructurada** y en usar tools como `get_time` o `get_weather`.  

- **Agente B – Generador creativo de ideas**  
  - Genera ideas de contenido, propuestas creativas, textos breves o variaciones de un mismo concepto.  
  - Puede apoyarse en `get_stock_price` u otras tools si quieres que genere ideas de contenido financiero/tecnológico.  

Las instrucciones (prompt del agente) de A y B pueden reutilizar y adaptar lo que ya definiste en Mistral Studio, ajustando ahora las descripciones para mencionar que el agente **puede llamar a funciones auxiliares cuando lo considere útil**.

---

### Funciones personalizadas (tools)

Debes implementar al menos **tres funciones propias** en Python que el modelo pueda usar como herramientas. Algunas funciones recomendadas son:

- `get_weather(location, date_range)`  
  - Devuelve un tiempo simulado o consultado vía API (puede ser una respuesta inventada pero coherente, o una llamada real a una API de clima si quieres). 
- `get_time(city_or_timezone)`  
  - Devuelve la hora local de una ciudad o zona horaria.  
- `get_stock_price(symbol)`  
  - Devuelve el precio simulado de una acción (o real, si integras una API sencilla). 

Puedes añadir otras funciones si te interesa, siempre que:

- tengan parámetros bien definidos,  
- devuelvan datos estructurados,  
- y sean razonablemente útiles para alguno de los dos agentes. 

El patrón a seguir es similar al del que hemos visto en el apartado **Mistral + Chainlit**, donde se definen tools como `get_home_town` y `get_current_weather` con un decorador `@cl.step(type="tool")` y un bloque `tools = [...]` con el esquema JSON que se pasa al modelo. 

---

### Requisitos mínimos de la aplicación

Tu aplicación deberá cumplir, como mínimo, los siguientes puntos:

1. **Interfaz en Chainlit**  
   - La app se ejecuta con `chainlit run app.py`.  
   - Al abrirla en el navegador puedes escribir mensajes y recibir respuestas. 

2. **Selección de agente**  
   - Debes poder elegir si hablas con el **Agente A** o con el **Agente B**.  
   - Esto puede hacerse de varias formas:
     - mediante un comando inicial (`/agenteA` o `/agenteB`),  
     - mediante un selector en el arranque,  
     - o detectando el modo por el primer mensaje.  

3. **Uso de Mistral con tools**  
   - El código debe llamar a la API de Mistral con una lista de `tools` (funciones) definidas en JSON, siguiendo el modelo de *function calling*. [web:231][web:298][web:301]  
   - Cuando el modelo decida usar una tool, tu backend debe:
     - leer el `tool_call` devuelto,  
     - ejecutar la función Python correspondiente,  
     - y devolver el resultado al modelo para que este construya la respuesta final.  

4. **Integración de las funciones personalizadas**  
   - Las funciones `get_weather`, `get_time`, `get_stock_price` (u otras que definas) deben estar realmente implementadas en el código y ser invocadas por el agente. [web:231][web:329][web:330]  
   - El comportamiento debe ser observable en la conversación (por ejemplo, Chainlit puede mostrar un paso tipo “tool” cuando se ejecuta la función, usando `@cl.step(type="tool")`). [web:231]

5. **Demostraciones de uso**  
   - Debes probar la app con varios ejemplos, de forma que:
     - en algunos casos el agente responda sin tools,  
     - y en otros casos el agente necesite llamar a una o varias tools para completar la respuesta. [web:231][web:298]

---

### Pasos guiados (recomendados)

1. **Paso 1: App Chainlit mínima**  
   - Crea un `app.py` que use Chainlit y un modelo de Mistral, sin tools.  
   - Comprueba que puedes enviar y recibir mensajes. [web:268][web:166]  

2. **Paso 2: Añadir un solo tool sencillo**  
   - Implementa `get_time` como función Python.  
   - Define el tool JSON y pásalo al modelo.  
   - Comprueba, con algún prompt tipo “¿Qué hora es en Londres?”, que el modelo decide llamar a la función. [web:231][web:298][web:301]  

3. **Paso 3: Añadir `get_weather` y `get_stock_price`**  
   - Implementa estas funciones y añádelas a la lista de tools. [web:231][web:329][web:330]  
   - Diseña prompts donde tenga sentido usarlas (tiempo en una ciudad, precio de una acción, etc.).  

4. **Paso 4: Instrucciones de los agentes A y B**  
   - Adapta en el código los prompts de sistema / instrucciones que ya diseñaste en Mistral Studio para el Tutor Flask y el Generador creativo. [web:323][web:325]  
   - Ajusta el rol de A hacia algo más práctico/planificador, y deja B como creativo.  

5. **Paso 5: Selector de agente**  
   - Añade un mecanismo sencillo para indicar con qué agente hablas (por ejemplo, guardando una variable en la sesión de usuario de Chainlit). [web:268][web:166]  
   - Asegúrate de que las tools se comportan de forma coherente con cada agente (el A usará más `get_time`/`get_weather`, el B quizá use `get_stock_price` para ideas financieras, etc.).  

---

### Entrega mínima (para esta actividad)

Para la actividad asociada a esta sesión se pedirá, como mínimo:

- El fichero `app.py` (o equivalente) con la integración de Chainlit + Mistral + tools.  
- Un breve `README.md` (o texto en la entrega) que explique:
  - cómo arrancar la app,  
  - qué hace el agente A,  
  - qué hace el agente B,  
  - qué funciones personalizadas se han implementado,  
  - y cómo probarlas (ejemplos de prompts). 

En sesiones posteriores se podrá ampliar esta base para incluir **RAG** y otras capacidades más avanzadas, pero en esta actividad el foco está en **migrar los agentes del playground a una app propia y darles herramientas mediante function calling**. 

