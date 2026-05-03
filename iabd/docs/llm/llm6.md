---
title: Sesión 6 - Smolagents y orquestación multiagente con Chainlit
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Smolagents y orquestación multiagente con Chainlit

![](./images/agente_running.gif)

### 1️⃣ Por qué usar smolagents

`smolagents` es uno de los muchos frameworks de agentes de código abierto disponibles para el desarrollo de aplicaciones. Las opciones alternativas incluyen `LlamaIndex` y `LangGraph`. `smolagents` ofrece varias características clave que podrían hacerlo una gran opción para casos de uso específicos, pero siempre debemos considerar todas las opciones al seleccionar un framework. 

### 2️⃣ Agentes de Código

Los `CodeAgents` (Agentes de Código) son el tipo principal de agente en `smolagents`. En lugar de generar JSON o texto, estos agentes producen código Python para realizar acciones. 

### 3️⃣ Agentes de Llamada a Herramientas

Los `ToolCallingAgents` (Agentes de Llamada a Herramientas) son el segundo tipo de agente soportado por `smolagents`. A diferencia de los `CodeAgents`, que generan código Python, estos agentes dependen de bloques JSON/texto que el sistema debe analizar e interpretar para ejecutar acciones. 

### 4️⃣ Herramientas

Como vimos en otras sesiones, las herramientas son funciones que un LLM puede usar dentro de un sistema de agentes, y actúan como los bloques de construcción esenciales para el comportamiento del agente. Veremos cómo crear herramientas, su estructura y diferentes métodos de implementación usando la clase `Tool` o el decorador `@tool`. 

### 5️⃣ Agentes de Recuperación

Los agentes de recuperación permiten a los modelos acceder a bases de conocimiento, haciendo posible buscar, sintetizar y recuperar información de múltiples fuentes. Aprovechan los almacenes vectoriales para una recuperación eficiente e implementan patrones de **Generación Aumentada por Recuperación (RAG)**. Estos agentes son particularmente útiles para integrar la búsqueda web con bases de conocimiento personalizadas mientras mantienen el contexto de la conversación a través de sistemas de memoria. Este módulo explora estrategias de implementación, incluyendo mecanismos de respaldo para una recuperación de información robusta.

### 6️⃣ Sistemas Multi-Agente

Orquestar múltiples agentes de manera efectiva es crucial para construir sistemas multi-agente potentes. Al combinar agentes con diferentes capacidades—como un agente de búsqueda web con un agente de ejecución de código—puedes crear soluciones más sofisticadas. 

### 7️⃣ Agentes de Visión y Navegador

Los agentes de visión extienden las capacidades tradicionales de los agentes al incorporar **Modelos de Visión-Lenguaje (VLMs)**, permitiéndoles procesar e interpretar información visual. Es posible diseñar e integrar agentes potenciados por VLM, desbloqueando funcionalidades avanzadas como razonamiento basado en imágenes, análisis de datos visuales e interacciones multimodales. También se pueden usar agentes de visión para construir un agente de navegador que pueda navegar por la web y extraer información de ella.

# ¿Por qué usar smolagents?

## ¿Qué es `smolagents`?

`smolagents` es un framework simple pero potente para construir agentes de IA. Proporciona a los LLMs la _capacidad de acción_ para interactuar con el mundo real, como buscar o generar imágenes.

Como vimos anteriormente, los agentes de IA son programas que utilizan LLMs para generar **pensamientos** basados en **observaciones** para realizar **acciones**. 

### Ventajas clave de `smolagents`
- **Simplicidad:** Mínima complejidad de código y abstracciones, para hacer que el framework sea fácil de entender, adoptar y extender
- **Soporte flexible para LLM:** Funciona con cualquier LLM a través de la integración con herramientas de Hugging Face y APIs externas
- **Enfoque centrado en el código:** Soporte de primera clase para Agentes de Código que escriben sus acciones directamente en código, eliminando la necesidad de análisis y simplificando la llamada a herramientas
- **Integración con HF Hub:** Integración perfecta con Hugging Face Hub, permitiendo el uso de **Espacios Gradio** como herramientas

### ¿Cuándo usar smolagents?

`smolagents` es ideal cuando:
- Necesitas una **solución ligera y mínima.**
- Quieres **experimentar rápidamente** sin configuraciones complejas.
- La **lógica de tu aplicación es sencilla.**

### Acciones de Código vs. JSON
A diferencia de otros frameworks donde los agentes escriben acciones en JSON, `smolagents` **se centra en llamadas a herramientas en código**, simplificando el proceso de ejecución. Esto se debe a que no hay necesidad de analizar el JSON para construir código que llame a las herramientas: la salida puede ejecutarse directamente.

El siguiente diagrama ilustra esta diferencia:

![Acciones de Código vs. JSON](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/code_vs_json_actions.png)

### Tipos de Agentes en `smolagents`

Los agentes en `smolagents` operan como **agentes de múltiples pasos**.

Cada [`MultiStepAgent`](https://huggingface.co/docs/smolagents/main/en/reference/agents#smolagents.MultiStepAgent) realiza:
- Un pensamiento
- Una llamada a herramienta y ejecución

Además de usar **[CodeAgent](https://huggingface.co/docs/smolagents/main/en/reference/agents#smolagents.CodeAgent)** como el tipo principal de agente, smolagents también soporta **[ToolCallingAgent](https://huggingface.co/docs/smolagents/main/en/reference/agents#smolagents.ToolCallingAgent)**, que escribe llamadas a herramientas en JSON.

> En smolagents, las herramientas se definen usando el decorador @tool que envuelve una función de Python o la clase Tool.

### Integración de Modelos en `smolagents`
`smolagents` soporta una integración flexible de LLM, permitiéndote usar cualquier modelo invocable que cumpla con [ciertos criterios](https://huggingface.co/docs/smolagents/main/en/reference/models). El framework proporciona varias clases predefinidas para simplificar las conexiones de modelos:

- **[TransformersModel](https://huggingface.co/docs/smolagents/main/en/reference/models#smolagents.TransformersModel):** Implementa un pipeline local de `transformers` para una integración perfecta.
- **[InferenceClientModel](https://huggingface.co/docs/smolagents/main/en/reference/models#smolagents.InferenceClientModel):** Soporta llamadas de [inferencia sin servidor](https://huggingface.co/docs/huggingface_hub/main/en/guides/inference) a través de la [infraestructura de Hugging Face](https://huggingface.co/docs/api-inference/index), o a través de un número creciente de [proveedores de inferencia de terceros](https://huggingface.co/docs/huggingface_hub/main/en/guides/inference#supported-providers-and-tasks).
- **[LiteLLMModel](https://huggingface.co/docs/smolagents/main/en/reference/models#smolagents.LiteLLMModel):** Aprovecha [LiteLLM](https://www.litellm.ai/) para interacciones ligeras con modelos.
- **[OpenAIServerModel](https://huggingface.co/docs/smolagents/main/en/reference/models#smolagents.OpenAIServerModel):** Se conecta a cualquier servicio que ofrezca una interfaz de API de OpenAI.
- **[AzureOpenAIServerModel](https://huggingface.co/docs/smolagents/main/en/reference/models#smolagents.AzureOpenAIServerModel):** Soporta la integración con cualquier despliegue de Azure OpenAI.

Esta flexibilidad asegura que los desarrolladores puedan elegir el modelo y servicio más adecuados para sus casos de uso específicos, y permite una fácil experimentación.

# Construcción de agentes que usan código

Los agentes de código son el tipo de agente predeterminado en `smolagents`. Generan llamadas a herramientas en Python para realizar acciones, logrando representaciones de acciones que son eficientes, expresivas y precisas.

Su enfoque simplificado reduce el número de acciones requeridas, simplifica operaciones complejas y permite la reutilización de funciones de código existentes. `smolagents` proporciona un framework ligero para construir agentes de código, implementado en aproximadamente 1,000 líneas de código.

![Acciones de Código vs JSON](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/code_vs_json_actions.png)
Gráfico del artículo [Executable Code Actions Elicit Better LLM Agents](https://huggingface.co/papers/2402.01030)

## ¿Por qué Agentes de Código?

En un proceso de agente de múltiples pasos, el LLM escribe y ejecuta acciones, típicamente involucrando llamadas a herramientas externas. Los enfoques tradicionales utilizan un formato JSON para especificar nombres de herramientas y argumentos como cadenas de texto, **que el sistema debe analizar para determinar qué herramienta ejecutar**.

Sin embargo, la investigación muestra que **los LLMs que llaman a herramientas funcionan más efectivamente con código directamente**. Este es un principio fundamental de `smolagents`, como se muestra en el diagrama anterior del artículo [Executable Code Actions Elicit Better LLM Agents](https://huggingface.co/papers/2402.01030).

Escribir acciones en código en lugar de JSON ofrece varias ventajas clave:

* **Componibilidad**: Combinar y reutilizar acciones fácilmente
* **Gestión de Objetos**: Trabajar directamente con estructuras complejas como imágenes
* **Generalidad**: Expresar cualquier tarea computacionalmente posible
* **Natural para LLMs**: Código de alta calidad ya está presente en los datos de entrenamiento de LLMs

## ¿Cómo funciona un agente de código?

![De https://huggingface.co/docs/smolagents/conceptual_guides/react](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/smolagents/codeagent_docs.png)

El diagrama anterior ilustra cómo funciona `CodeAgent.run()`, siguiendo el marco **ReAct** mencionado anteriormente. La abstracción principal para agentes en `smolagents` es un `MultiStepAgent`, que sirve como el bloque de construcción central. `CodeAgent` es un tipo especial de `MultiStepAgent`, como veremos en un ejemplo a continuación.

Un `CodeAgent` realiza acciones a través de un ciclo de pasos, con variables y conocimientos existentes incorporados en el contexto del agente, que se mantiene en un registro de ejecución:

1. El prompt del sistema se almacena en un `SystemPromptStep`, y la consulta del usuario se registra en un `TaskStep`.

2. Luego, se ejecuta el siguiente bucle while:

    2.1 El método `agent.write_memory_to_messages()` escribe los registros del agente en una lista de [mensajes de chat](https://huggingface.co/docs/transformers/en/chat_templating) legibles por el LLM.
    
    2.2 Estos mensajes se envían a un `Model`, que genera una finalización.
    
    2.3 La finalización se analiza para extraer la acción, que, en nuestro caso, debería ser un fragmento de código ya que estamos trabajando con un `CodeAgent`.
    
    2.4 La acción se ejecuta.
    
    2.5 Los resultados se registran en la memoria en un `ActionStep`.

Al final de cada paso, si el agente incluye alguna llamada a función (en `agent.step_callback`), estas se ejecutan.

## Veamos algunos ejemplos

Alfred está planeando una fiesta en la mansión de la familia Wayne y necesita tu ayuda para asegurarse de que todo salga bien. Para ayudarlo, aplicaremos lo que hemos aprendido sobre cómo opera un `CodeAgent` de múltiples pasos.

![](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/smolagents/alfred-party.jpg)

Instalamos `smolagents` dede el siguiente comando:

```bash
pip install smolagents -U
```
También debemos iniciar sesión en el ***Hugging Face Hub*** para tener acceso a la API de Inferencia *`Serverless`*.

**login_hf.py**
```python
from huggingface_hub import login

login()
```

Prueba sencilla de funcionamiento:

```python
from huggingface_hub import InferenceClient

client = InferenceClient(model="google/gemma-7b") # O el modelo que prefieras
response = client.text_generation("Hola, ¿cómo estás?")
print(response)

```
### Seleccionando una lista de reproducción para la fiesta usando `smolagents`

¡La música es una parte esencial de una fiesta exitosa! Alfred necesita ayuda para seleccionar la lista de reproducción. Por suerte, ¡`smolagents` nos tiene cubiertos! Podemos construir un agente capaz de buscar en la web usando DuckDuckGo. Para dar al agente acceso a esta herramienta, la incluimos en la lista de herramientas al crear el agente.

![](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/smolagents/alfred-playlist.jpg)

Para el modelo, confiaremos en **`InferenceClientModel`**, que proporciona acceso a la [API de Inferencia Serverless](https://huggingface.co/docs/api-inference/index) de Hugging Face. El modelo predeterminado es `"Qwen/Qwen2.5-Coder-32B-Instruct"`, que es eficiente y está disponible para inferencia rápida, pero puedes seleccionar cualquier modelo compatible del Hub.

Para poder utilizar la herrameinta (tool) **`DuckDuckGoSearchTool`** (herramienta que utiliza **DuckDuckGo** para realizar búsquedas. Permite a los agentes aprovechar su motor de búsqueda para recuperar información y además no requiere una clave API) necesitamos instalar la librería ddgs (DuckDuckGoSearch):

```bash
pip install ddgs
```
Un vez instalado, ejecutar un agente es bastante sencillo:

```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, InferenceClientModel

agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=InferenceClientModel())

agent.run("Busca las mejores recomendaciones de música para una fiesta en la mansión de los Wayne.")
```

Cuando ejecutamos este ejemplo, la salida **mostrará un seguimiento de los pasos del flujo de trabajo siendo ejecutados**. También imprimirá el código Python correspondiente con el mensaje:

```python
 ─ Ejecutando código analizado: ──────────────────────────────────────────────────────────────────────────────────── 
  results = web_search(query="mejor música para una fiesta de Batman")                                                      
  print(results)                                                                                                   
 ───────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
```
**Ejecución del paso 1 del *Agente Alfred***
![Agente Alfred Paso 1](./images/06/agente_alfred_paso1.png)
**Ejecución del paso 2 del *Agente Alfred***
![Agente Alfred Paso 2](./images/06/agente_alfred_paso2.png)

¡Después de algunos pasos, veremos la lista de reproducción generada que Alfred puede usar para la fiesta! 🎵

### Usando una herramienta personalizada para preparar el menú

![](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/smolagents/alfred-menu.jpg)

Ahora que hemos seleccionado una lista de reproducción, necesitamos organizar el menú para los invitados. De nuevo, Alfred puede aprovechar `smolagents` para hacerlo. Aquí, usamos el decorador `@tool` para definir una función personalizada que actúa como herramienta. Cubriremos la creación de herramientas con más detalle más adelante, así que por ahora, simplemente podemos ejecutar el código.

Como podemos ver en el siguiente ejemplo, crearemos una herramienta usando el decorador `@tool` y la incluiremos en la lista de `tools`.

```python
from smolagents import CodeAgent, tool, InferenceClientModel

# Herramienta para sugerir un menú basado en la ocasión
@tool
def suggest_menu(occasion: str) -> str:
    """
    Sugiere un menú basado en la ocasión.
    Args:
        occasion: El tipo de ocasión para la fiesta.
    """
    if occasion == "casual":
        return "Pizza, aperitivos y bebidas."
    elif occasion == "formal":
        return "Cena de 3 platos con vino y postre."
    elif occasion == "superhero":
        return "Buffet con comida saludable y de alta energía."
    else:
        return "Menú personalizado para el mayordomo."

# Alfred, el mayordomo, preparando el menú para la fiesta
agent = CodeAgent(tools=[suggest_menu], model=InferenceClientModel())

# Preparando el menú para la fiesta
agent.run("Prepara un menú formal para la fiesta.")
```

El agente se ejecutará durante algunos pasos hasta encontrar la respuesta.

![](./images/06/agente_alfred_menu.png)

¡El menú está listo! 🥗

### Usando importaciones (imports) de Python dentro del agente

Tenemos la lista de reproducción y el menú listos, pero necesitamos verificar un detalle más crucial: ¡el tiempo de preparación!

Alfred necesita calcular cuándo todo estaría listo si comenzara a preparar ahora, en caso de que necesiten asistencia de otros superhéroes.

`smolagents` se especializa en agentes que escriben y ejecutan fragmentos de código Python, ofreciendo ejecución en sandbox para seguridad.
**La ejecución de código tiene medidas de seguridad estrictas** - las importaciones fuera de una lista predefinida segura están bloqueadas por defecto. Sin embargo, puedes autorizar importaciones adicionales pasándolas como cadenas en `additional_authorized_imports`.
Para más detalles sobre la ejecución segura de código, consulta la [guía](https://huggingface.co/docs/smolagents/tutorials/secure_code_execution) oficial.

Al crear el agente, usaremos `additional_authorized_imports` para permitir la importación del módulo `datetime`.

Como en el ejemplo vamos numpy, la instalamos usando pip:

```bash
pip install numpy
```
**Ejemplo de uso de imports en los agentes:**
```python
from smolagents import CodeAgent, InferenceClientModel
import numpy as np
import time
import datetime

agent = CodeAgent(tools=[], model=InferenceClientModel(), additional_authorized_imports=['datetime'])

agent.run(
    """
    Alfred necesita prepararse para la fiesta. Aquí están las tareas:
    1. Preparar las bebidas - 30 minutos
    2. Decorar la mansión - 60 minutos
    3. Configurar el menú - 45 minutos
    4. Preparar la música y la lista de reproducción - 45 minutos

    Si comenzamos ahora mismo, ¿a qué hora estará lista la fiesta?
    """
)
```

![](./images/06/agente_alfred_imports.png)

Estos ejemplos son solo el comienzo de lo que podemos hacer con agentes de código, y ya estamos empezando a ver su utilidad para preparar la fiesta.

En resumen, **`smolagents`** se especializa en agentes que escriben y ejecutan fragmentos de código Python, ofreciendo ejecución en un **sandbox para seguridad**. Soporta modelos de lenguaje tanto locales como basados en API, haciéndolo adaptable a varios entornos de desarrollo.

### Compartiendo nuestro agente preparador de fiestas personalizado en el Hub

Vamos a crear un spacio en hugging para probar la herramienta de forma remota y haciendo de Gradio 

La biblioteca `smolagents` hace esto posible al permitirte compartir un agente completo con la comunidad y descargar otros para uso inmediato. Es tan simple como lo siguiente:

```python
# Cambia a tu nombre de usuario y nombre de repositorio
agent.push_to_hub('sergiopaniego/AlfredAgent')
```

Para descargar el agente nuevamente, usa el código a continuación:

```python
# Cambia a tu nombre de usuario y nombre de repositorio
alfred_agent = agent.from_hub('sergiopaniego/AlfredAgent')

alfred_agent.run("Dame la mejor lista de reproducción para una fiesta en la mansión de Wayne. La idea de la fiesta es un tema de 'mascarada de villanos'")  
```

Por ejemplo, el _AlfredAgent_ está disponible [aquí](https://huggingface.co/spaces/sergiopaniego/AlfredAgent). Puedes probarlo directamente a continuación:

Veamos el ejemplo completo:

```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, FinalAnswerTool, InferenceClientModel, Tool, tool, VisitWebpageTool

@tool
def suggest_menu(occasion: str) -> str:
    """
    Sugiere un menú basado en la ocasión.
    Args:
        occasion: El tipo de ocasión para la fiesta.
    """
    if occasion == "casual":
        return "Pizza, aperitivos y bebidas."
    elif occasion == "formal":
        return "Cena de 3 platos con vino y postre."
    elif occasion == "superhero":
        return "Buffet con comida saludable y de alta energía."
    else:
        return "Menú personalizado para el mayordomo."

@tool
def catering_service_tool(query: str) -> str:
    """
    Esta herramienta devuelve el servicio de catering mejor calificado en Ciudad Gótica.
    
    Args:
        query: Un término de búsqueda para encontrar servicios de catering.
    """
    # Lista de ejemplo de servicios de catering y sus calificaciones
    services = {
        "Gotham Catering Co.": 4.9,
        "Wayne Manor Catering": 4.8,
        "Gotham City Events": 4.7,
    }
    
    # Encuentra el servicio de catering mejor calificado (simulando filtrado de consulta de búsqueda)
    best_service = max(services, key=services.get)
    
    return best_service

class SuperheroPartyThemeTool(Tool):
    name = "superhero_party_theme_generator"
    description = """
    Esta herramienta sugiere ideas creativas para fiestas temáticas de superhéroes basadas en una categoría.
    Devuelve una idea única de tema para la fiesta."""
    
    inputs = {
        "category": {
            "type": "string",
            "description": "El tipo de fiesta de superhéroes (por ejemplo, 'héroes clásicos', 'mascarada de villanos', 'Gotham futurista').",
        }
    }
    
    output_type = "string"

    def forward(self, category: str):
        themes = {
            "classic heroes": "Gala de la Liga de la Justicia: Los invitados vienen vestidos como sus héroes favoritos de DC con cócteles temáticos como 'El Ponche de Kryptonita'.",
            "villain masquerade": "Baile de los Pícaros de Gotham: Una mascarada misteriosa donde los invitados se visten como villanos clásicos de Batman.",
            "futuristic Gotham": "Noche Neo-Gotham: Una fiesta de estilo cyberpunk inspirada en Batman Beyond, con decoraciones de neón y gadgets futuristas."
        }
        
        return themes.get(category.lower(), "Idea de fiesta temática no encontrada. Prueba con 'héroes clásicos', 'mascarada de villanos' o 'Gotham futurista'.")

# Alfred, el mayordomo, preparando el menú para la fiesta
agent = CodeAgent(
    tools=[
        DuckDuckGoSearchTool(), 
        VisitWebpageTool(),
        suggest_menu,
        catering_service_tool,
        SuperheroPartyThemeTool()
    ], 
    model=InferenceClientModel(),
    max_steps=10,
    verbosity_level=2
)

agent.run("Dame la mejor lista de reproducción para una fiesta en la mansión de Wayne. La idea de la fiesta es un tema de 'mascarada de villanos'")
```

Como podemos ver, hemos creado un `CodeAgent` con varias herramientas que mejoran la funcionalidad del agente:

![](./images/06/agente_fiesta_villanos.png)

### Inspeccionando nuestro agente preparador de fiestas con OpenTelemetry y Langfuse 📡

A medida que Alfred perfecciona el Agente Preparador de Fiestas, se está cansando de depurar sus ejecuciones. Los agentes, por naturaleza, son impredecibles y difíciles de inspeccionar. Pero como su objetivo es construir el mejor Agente Preparador de Fiestas y desplegarlo en producción, necesita una trazabilidad robusta para monitoreo y análisis futuros.

¡Una vez más, `smolagents` viene al rescate! Adopta el estándar [OpenTelemetry](https://opentelemetry.io/) para instrumentar ejecuciones de agentes, permitiendo una inspección y registro sin problemas. Con la ayuda de [Langfuse](https://langfuse.com/) y el `SmolagentsInstrumentor`, Alfred puede rastrear y analizar fácilmente el comportamiento de su agente.

Primero, necesitamos instalar las dependencias necesarias:

```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp openinference-instrumentation-smolagents
```

A continuación, Alfred ya ha creado una cuenta en Langfuse y tiene sus claves API listas. Si aún no lo has hecho, puedes registrarte en Langfuse Cloud [aquí](https://cloud.langfuse.com/) o explorar [alternativas](https://huggingface.co/docs/smolagents/tutorials/inspect_runs).

Una vez que tengamos nuestras claves API, deben configurarse correctamente de la siguiente manera:

```python
import os
import base64

LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."
LANGFUSE_AUTH=base64.b64encode(f"{LANGFUSE_PUBLIC_KEY}:{LANGFUSE_SECRET_KEY}".encode()).decode()

os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "https://cloud.langfuse.com/api/public/otel" # Región de datos EU
# os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "https://us.cloud.langfuse.com/api/public/otel" # Región de datos US
os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = f"Authorization=Basic {LANGFUSE_AUTH}"
```

Finalmente, Alfred está listo para inicializar el `SmolagentsInstrumentor` y comenzar a rastrear el rendimiento de su agente.

```python
from opentelemetry.sdk.trace import TracerProvider

from openinference.instrumentation.smolagents import SmolagentsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import SimpleSpanProcessor

trace_provider = TracerProvider()
trace_provider.add_span_processor(SimpleSpanProcessor(OTLPSpanExporter()))

SmolagentsInstrumentor().instrument(tracer_provider=trace_provider)
```

¡Alfred ahora está conectado 🔌! Las ejecuciones de `smolagents` se están registrando en Langfuse, dándole visibilidad completa del comportamiento del agente. Con esta configuración, está listo para revisar ejecuciones anteriores y refinar aún más su Agente Preparador de Fiestas.

```python
from smolagents import CodeAgent, InferenceClientModel

agent = CodeAgent(tools=[], model=InferenceClientModel())
alfred_agent = agent.from_hub('sergiopaniego/AlfredAgent', trust_remote_code=True)
alfred_agent.run("Dame la mejor lista de reproducción para una fiesta en la mansión de Wayne. La idea de la fiesta es un tema de 'mascarada de villanos'")  
```

Alfred ahora puede acceder a estos registros [aquí](https://cloud.langfuse.com/project/cm7bq0abj025rad078ak3luwi/traces/995fc019255528e4f48cf6770b0ce27b?timestamp=2025-02-19T10%3A28%3A36.929Z) para revisarlos y analizarlos.

Mientras tanto, la [lista de reproducción sugerida](https://open.spotify.com/playlist/0gZMMHjuxMrrybQ7wTMTpw) establece el ambiente perfecto para los preparativos de la fiesta. ¿Genial, verdad? 🎶

---


# Escribiendo acciones como fragmentos de código o estructuras JSON

Los Agentes que invocan a herramientas son el segundo tipo de agente disponible en **`smolagents`**. A diferencia de los **Agentes de Código** que utilizan fragmentos de Python, estos agentes **utilizan las capacidades integradas de invocación a herramientas de los proveedores de LLM** para generar llamadas a herramientas como **estructuras JSON**. Este es el enfoque estándar utilizado por **OpenAI, Anthropic y muchos otros proveedores**.

Veamos un ejemplo. Cuando Alfred quiere buscar servicios de catering e ideas para fiestas, un `CodeAgent` generaría y ejecutaría código Python como este:

```python
for query in [
    "Mejores servicios de catering en Ciudad Gótica", 
    "Ideas de temas de fiesta para superhéroes"
]:
    print(web_search(f"Buscar: {query}"))
```

Un `ToolCallingAgent` en cambio crearía una estructura JSON:

```python
[
    {"name": "web_search", "arguments": "Mejores servicios de catering en Ciudad Gótica"},
    {"name": "web_search", "arguments": "Ideas de temas de fiesta para superhéroes"}
]
```

Esta estructura JSON se utiliza luego para ejecutar las llamadas a herramientas.

Aunque `smolagents` se centra principalmente en `CodeAgents` ya que [tienen un mejor rendimiento general](https://huggingface.co/papers/2402.01030), los `ToolCallingAgents` pueden ser efectivos para sistemas simples que no requieren manejo de variables o llamadas a herramientas complejas.

![Acciones de Código vs JSON](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/code_vs_json_actions.png)  

## ¿Cómo funcionan los Agentes de llamada a herramientas?  

Los Agentes de llamada a herramientas siguen el mismo flujo de trabajo de múltiples pasos que los Agentes de Código. 

La diferencia clave está en **cómo estructuran sus acciones**: en lugar de código ejecutable, **generan objetos JSON que especifican nombres de herramientas y argumentos**. El sistema luego **analiza estas instrucciones** para ejecutar las herramientas apropiadas.

## Ejemplo: Ejecutando un agente de llamada a herramientas  

Revisemos el ejemplo anterior donde Alfred comenzó los preparativos de la fiesta, pero esta vez usaremos un `ToolCallingAgent` para destacar la diferencia. Construiremos un agente que pueda buscar en la web usando DuckDuckGo, al igual que en nuestro ejemplo de Agente de Código. La única diferencia es el tipo de agente - el framework se encarga de todo lo demás:

```python
'''
#CÓDIGO CodeAgente
from smolagents import CodeAgent, DuckDuckGoSearchTool, InferenceClientModel

agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=InferenceClientModel())
'''
#Código ToolCallingAgent
from smolagents import ToolCallingAgent, DuckDuckGoSearchTool, InferenceClientModel

model = InferenceClientModel(
    # ejemplo de la documentación, 
    # pero podemos usar cualquier modelo compatible con Hugging Face Inference API 
    model_id="meta-llama/Llama-3.3-70B-Instruct", 
    token="hf_xxx" #o usar HF_TOKEN en entorno
)

agent = ToolCallingAgent(
        tools=[DuckDuckGoSearchTool()], 
        model=model,
        verbosity_level=2
)

agent.run("Busca las mejores recomendaciones de música para una fiesta en la mansión Wayne.")

```

Cuando veamos el rastro del agente, en lugar de ver `Executing parsed code:`, veremos algo como:

![](./images/06/alfred_json_1.png)
![](./images/06/alfred_json_2.png)
![](./images/06/alfred_json_3.png)

El agente genera una llamada a la herramienta de forma estructurada que el sistema procesa para producir la salida, en lugar de ejecutar directamente código como un `CodeAgent`.

Ahora que entendemos ambos tipos de agentes, podemos elegir el adecuado para nuestras necesidades. 

# Herramientas  

Como exploramos anteriormente, los agentes utilizan herramientas para realizar diversas acciones. En `smolagents`, las herramientas son tratadas como **funciones que un LLM pueden llamar dentro de un sistema de agentes**.

Para interactuar con una herramienta, el LLM necesita una **descripción de la interfaz** con estos componentes clave:  

- **Nombre**: Cómo se llama la herramienta
- **Descripción de la herramienta**: Qué hace la herramienta  
- **Tipos de entrada y descripciones**: Qué argumentos acepta la herramienta
- **Tipo de salida**: Qué devuelve la herramienta

Por ejemplo, mientras prepara una fiesta en la Mansión Wayne, Alfred necesita varias herramientas para recopilar información - desde buscar servicios de catering hasta encontrar ideas para temas de fiesta. Así es como podría verse la interfaz de una herramienta de búsqueda simple:

- **Nombre:** `web_search`
- **Descripción de la herramienta:** Busca en la web consultas específicas
- **Entrada:** `query` (cadena) - El término de búsqueda a consultar
- **Salida:** Cadena que contiene los resultados de la búsqueda

Al utilizar estas herramientas, Alfred puede tomar decisiones informadas y recopilar toda la información necesaria para planificar la fiesta perfecta.

A continuación, puedes ver una animación que ilustra cómo se gestiona una llamada a una herramienta:

![Pipeline de agente de https://huggingface.co/docs/smolagents/conceptual_guides/react](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/transformers/Agent_ManimCE.gif)

## Métodos de creación de herramientas

En `smolagents`, las herramientas pueden definirse de dos maneras:  
1. **Usando el decorador `@tool`** para herramientas simples basadas en funciones
2. **Creando una subclase de `Tool`** para funcionalidades más complejas    

### El decorador `@tool`  

El decorador `@tool` es **la forma recomendada para definir herramientas simples**. Internamente, smolagents analizará la información básica sobre la función desde Python. Por lo tanto, si nombramos nuestra función claramente y escribimos un buen docstring, será más fácil para el LLM utilizarla.

Usando este enfoque, definimos una función con:  

- **Un nombre de función claro y descriptivo** que ayuda al LLM a entender su propósito.  
- **Anotaciones de tipo tanto para entradas como para salidas** para garantizar un uso adecuado.  
- **Una descripción detallada**, que incluye una sección `Args:` donde cada argumento se describe explícitamente. Estas descripciones proporcionan un contexto valioso para el LLM, por lo que es importante escribirlas cuidadosamente.  

#### Generando una herramienta que recupera el servicio de catering mejor valorado

![](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/smolagents/alfred-catering.jpg)

Imaginemos que Alfred ya ha decidido el menú para la fiesta, pero ahora necesita ayuda para preparar comida para un número tan grande de invitados. Para hacerlo, le gustaría contratar un servicio de catering y necesita identificar las opciones mejor valoradas disponibles. Alfred puede aprovechar una herramienta para buscar los mejores servicios de catering en su área.

A continuación se muestra un ejemplo de cómo Alfred puede usar el decorador `@tool` para lograrlo:

```python
from smolagents import CodeAgent, InferenceClientModel, tool

# Imaginemos que tenemos una función que obtiene los servicios de catering mejor valorados.
@tool
def catering_service_tool(query: str) -> str:
    """
    Esta herramienta devuelve el servicio de catering mejor valorado en Ciudad Gótica.
    
    Args:
        query: Un término de búsqueda para encontrar servicios de catering.
    """
    # Lista de ejemplo de servicios de catering y sus calificaciones
    services = {
        "Gotham Catering Co.": 4.9,
        "Wayne Manor Catering": 4.8,
        "Gotham City Events": 4.7,
    }
    
    # Encuentra el servicio de catering mejor valorado (simulando el filtrado de consultas de búsqueda)
    best_service = max(services, key=services.get)
    
    return best_service

agent = CodeAgent(tools=[catering_service_tool], model=InferenceClientModel())

# Ejecuta el agente para encontrar el mejor servicio de catering
result = agent.run(
    "¿Puedes darme el nombre del servicio de catering mejor valorado en Ciudad Gótica?"
)

print(result)   # Salida: Gotham Catering Co.
```

### Definiendo una herramienta como una clase de Python  

Este enfoque implica crear una subclase de [`Tool`](https://huggingface.co/docs/smolagents/v1.8.1/en/reference/tools#smolagents.Tool). Para herramientas complejas, podemos implementar una clase en lugar de una función de Python. La clase envuelve la función con metadatos que ayudan al LLM a entender cómo usarla de manera efectiva. En esta clase, definimos:  

- **`name`**: El nombre de la herramienta.  
- **`description`**: Una descripción utilizada para completar el prompt del sistema del agente.  
- **`inputs`**: Un diccionario con claves `type` y `description`, proporcionando información para ayudar al intérprete de Python a procesar las entradas.  
- **`output_type`**: Especifica el tipo de salida esperado.  
- **`forward`**: El método que contiene la lógica de inferencia a ejecutar.

A continuación, podemos ver un ejemplo de una herramienta construida usando `Tool` y cómo integrarla dentro de un `CodeAgent`.

#### Generando una herramienta para generar ideas sobre la fiesta temática de superhéroes

La fiesta de Alfred en la mansión es un **evento temático de superhéroes**, pero necesita algunas ideas creativas para hacerla verdaderamente especial. Como anfitrión fantástico, quiere sorprender a los invitados con un tema único.

Para hacer esto, puede usar un agente que genere ideas de fiestas temáticas de superhéroes basadas en una categoría dada. De esta manera, Alfred puede encontrar el tema de fiesta perfecto para impresionar a sus invitados.

```python
from smolagents import Tool, CodeAgent, InferenceClientModel

class SuperheroPartyThemeTool(Tool):
    name = "superhero_party_theme_generator"
    description = """
    Esta herramienta sugiere ideas creativas para fiestas temáticas de superhéroes basadas en una categoría.
    Devuelve una idea única de tema para la fiesta."""
    
    inputs = {
        "category": {
            "type": "string",
            "description": "El tipo de fiesta de superhéroes (por ejemplo, 'héroes clásicos', 'mascarada de villanos', 'Gotham futurista').",
        }
    }
    
    output_type = "string"

    def forward(self, category: str):
        themes = {
            "classic heroes": "Gala de la Liga de la Justicia: Los invitados vienen vestidos como sus héroes favoritos de DC con cócteles temáticos como 'El Ponche de Kryptonita'.",
            "villain masquerade": "Baile de los Pícaros de Gotham: Una mascarada misteriosa donde los invitados se visten como villanos clásicos de Batman.",
            "futuristic Gotham": "Noche Neo-Gotham: Una fiesta de estilo cyberpunk inspirada en Batman Beyond, con decoraciones de neón y gadgets futuristas."
        }
        
        return themes.get(category.lower(), "Idea de fiesta temática no encontrada. Prueba con 'héroes clásicos', 'mascarada de villanos' o 'Gotham futurista'.")

# Instancia la herramienta
party_theme_tool = SuperheroPartyThemeTool()
agent = CodeAgent(tools=[party_theme_tool], model=InferenceClientModel())

# Ejecuta el agente para generar una idea de tema para la fiesta
result = agent.run(
    "¿Cuál sería una buena idea para una fiesta de superhéroes con el tema 'mascarada de villanos'?"
)

print(result)  # Salida: "Baile de los Pícaros de Gotham: Una mascarada misteriosa donde los invitados se visten como villanos clásicos de Batman."
```

Con esta herramienta, ¡Alfred será el mejor anfitrión, impresionando a sus invitados con una fiesta temática de superhéroes que no olvidarán! 🦸‍♂️🦸‍♀️

## Caja de Herramientas Predeterminada  

`smolagents` viene con un conjunto de herramientas preintegradas que pueden inyectarse directamente en tu agente. La [caja de herramientas predeterminada](https://huggingface.co/docs/smolagents/guided_tour?build-a-tool=Decorate+a+function+with+%40tool#default-toolbox) incluye:  

- **`PythonInterpreterTool`**  
- **`FinalAnswerTool`**  
- **`UserInputTool`**  
- **`DuckDuckGoSearchTool`**  
- **`GoogleSearchTool`**  
- **`VisitWebpageTool`**  

Alfred podría usar varias herramientas para asegurar una fiesta impecable en la Mansión Wayne:

- Primero, podría usar la `DuckDuckGoSearchTool` para encontrar ideas creativas para fiestas temáticas de superhéroes.

- Para el catering, confiaría en la `GoogleSearchTool` para encontrar los servicios mejor valorados en Gotham.

- Para gestionar la distribución de asientos, Alfred podría realizar cálculos con la `PythonInterpreterTool`.

- Una vez recopilado todo, compilaría el plan usando la `FinalAnswerTool`.

Con estas herramientas, Alfred garantiza que la fiesta sea excepcional e impecable. 🦇💡

## Compartir e importar herramientas

Una de las características más poderosas de **smolagents** es su capacidad para compartir herramientas personalizadas en el Hub e integrar perfectamente herramientas creadas por la comunidad. Esto incluye la conexión con **HF Spaces** y **herramientas de LangChain**, mejorando significativamente la capacidad de Alfred para organizar una fiesta inolvidable en la Mansión Wayne. 🎭

Con estas integraciones, Alfred puede aprovechar herramientas avanzadas de planificación de eventos, ya sea ajustar la iluminación para el ambiente perfecto, seleccionar la lista de reproducción ideal para la fiesta, o coordinar con los mejores servicios de catering de Gotham.

Aquí hay ejemplos que muestran cómo estas funcionalidades pueden elevar la experiencia de la fiesta:

### Compartir una Herramienta en el Hub

¡Compartir tu herramienta personalizada con la comunidad es fácil! Simplemente súbela a tu cuenta de Hugging Face usando el método `push_to_hub()`.

Por ejemplo, Alfred puede compartir su `party_theme_tool` para ayudar a otros a encontrar los mejores servicios de catering en Gotham. Así es cómo hacerlo:

```python
party_theme_tool.push_to_hub("{tu_nombre_de_usuario}/party_theme_tool", token="")
```

### Importar una Herramienta desde el Hub

Puedes importar fácilmente herramientas creadas por otros usuarios usando la función `load_tool()`. Por ejemplo, Alfred podría querer generar una imagen promocional para la fiesta usando IA. En lugar de construir una herramienta desde cero, puede aprovechar una predefinida de la comunidad:

```python
from smolagents import load_tool, CodeAgent, InferenceClientModel

image_generation_tool = load_tool(
    "m-ric/text-to-image",
    trust_remote_code=True
)

agent = CodeAgent(
    tools=[image_generation_tool],
    model=InferenceClientModel()
)

agent.run("Genera una imagen de una lujosa fiesta temática de superhéroes en la Mansión Wayne con superhéroes inventados.")
```

### Importar un Hugging Face Space como Herramienta

También puedes importar un HF Space como herramienta usando `Tool.from_space()`. Esto abre posibilidades para integrar miles de spaces de la comunidad para tareas desde generación de imágenes hasta análisis de datos.

La herramienta se conectará con el backend Gradio del space usando `gradio_client`, así que asegúrate de instalarlo via `pip` si aún no lo tienes.

Para la fiesta, Alfred puede usar un HF Space existente para la generación de la imagen generada por IA que se usará en el anuncio (en lugar de la herramienta preintegrada que mencionamos antes). ¡Vamos a construirla!

```python
from smolagents import CodeAgent, InferenceClientModel, Tool

image_generation_tool = Tool.from_space(
    "black-forest-labs/FLUX.1-schnell",
    name="image_generator",
    description="Generar una imagen a partir de un prompt"
)

model = InferenceClientModel("Qwen/Qwen2.5-Coder-32B-Instruct")

agent = CodeAgent(tools=[image_generation_tool], model=model)

agent.run(
    "Mejora este prompt, luego genera una imagen del mismo.", 
    additional_args={'user_prompt': 'Una gran fiesta temática de superhéroes en la Mansión Wayne, con Alfred supervisando una lujosa gala'}
)
```

### Importar una herramienta de LangChain

Discutiremos el framework `LangChain` en las próximas secciones. Por ahora, solo notamos que ¡podemos reutilizar herramientas de LangChain en tu flujo de trabajo de smolagents!

Puedes cargar fácilmente herramientas de LangChain usando el método `Tool.from_langchain()`. Alfred, siempre perfeccionista, está preparando una espectacular noche de superhéroes en la Mansión Wayne mientras los Wayne están fuera. Para asegurarse de que cada detalle supere las expectativas, aprovecha las herramientas de LangChain para encontrar ideas de entretenimiento de primera categoría.

Al usar `Tool.from_langchain()`, Alfred añade sin esfuerzo funcionalidades de búsqueda avanzadas a su smolagent, permitiéndole descubrir ideas y servicios exclusivos para fiestas con solo unos pocos comandos.

Así es como lo hace:

```python
from langchain.agents import load_tools
from smolagents import CodeAgent, InferenceClientModel, Tool

search_tool = Tool.from_langchain(load_tools(["serpapi"])[0])

agent = CodeAgent(tools=[search_tool], model=model)

agent.run("Busca ideas de entretenimiento de lujo para un evento temático de superhéroes, como actuaciones en vivo y experiencias interactivas.")
```

Con esta configuración, Alfred puede descubrir rápidamente opciones de entretenimiento lujosas, asegurando que los invitados de élite de Gotham tengan una experiencia inolvidable. ¡Esta herramienta le ayuda a organizar el evento temático de superhéroes perfecto para la Mansión Wayne! 🎉

## Recursos

- [Blog de smolagents](https://huggingface.co/blog/smolagents) - Introducción a smolagents e interacciones de código
- [smolagents: Construyendo Buenos Agentes](https://huggingface.co/docs/smolagents/tutorials/building_good_agents) - Mejores prácticas para agentes confiables
- [Construyendo Agentes Efectivos - Anthropic](https://www.anthropic.com/research/building-effective-agents) - Principios de diseño de agentes
- [Compartiendo ejecuciones con OpenTelemetry](https://huggingface.co/docs/smolagents/tutorials/inspect_runs) - Detalles sobre cómo configurar OpenTelemetry para rastrear tus agentes.
- [Documentación de ToolCallingAgent](https://huggingface.co/docs/smolagents/v1.8.1/en/reference/agents#smolagents.ToolCallingAgent) - Documentación oficial para ToolCallingAgent
- [Tutorial de Herramientas](https://huggingface.co/docs/smolagents/tutorials/tools) - Explora este tutorial para aprender a trabajar efectivamente con herramientas.
- [Documentación de Herramientas](https://huggingface.co/docs/smolagents/v1.8.1/en/reference/tools) - Documentación de referencia completa sobre herramientas.
- [Tour Guiado de Herramientas](https://huggingface.co/docs/smolagents/v1.8.1/en/guided_tour#tools) - Un tour guiado paso a paso para ayudarte a construir y utilizar herramientas eficientemente.
- [Construyendo Agentes Efectivos](https://huggingface.co/docs/smolagents/tutorials/building_good_agents) - Una guía detallada sobre mejores prácticas para desarrollar agentes de función personalizados fiables y de alto rendimiento.

