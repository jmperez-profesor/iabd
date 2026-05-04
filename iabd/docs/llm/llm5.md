---
title: Sesión 5 - Agentes con Chainlit + API de Mistral 2 (herramientas integradas y funciones personalizadas)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

## Probar funciones propias en Mistral Studio

### Usar la herramienta integrada "búsqueda" en el Agente Meeting Summarizer

![Activar la herramienta integrada "búsqueda" en el Agente Meeting Summarizer](./images/chainlit/meeting_summarizer_mistralai.png)

**Ejemplo de uso en Mistral IA de agente razonando y usando herramientas integradas (Patrón ReAct)**
![Ejemplo de uso en Mistral IA de agente razonando y usando herramientas integradas](./images/05/agente_con_funciones_razonando_paso1.png)

**Patrón ReAct (Reason-Acting)**
![Patrón ReAct](./images/react_pattern.gif)

## Actividad guiada: Crear un agente con herramientas personalizadas

![](./images/chainlit/agente_temperatura.png)

En esta actividad vamos a usar modelo de Mistral que acceda a funciones externas y que pueda llamar durante una conversación.

* Definir un esquema de herramienta que describa su función.
* Enviar un mensaje que active una llamada a la herramienta
* Ejecutar la función localmente y devuelve el resultado al modelo.

Este patrón funciona con cualquier fuente de datos: API, bases de datos o servicios internos.

### Paso 1: Definir la función

Definir la función que el modelo va a llamar. Este ejemplo crea una `get_weather` herramienta que acepta el nombre de una ciudad.

```bash
pip install mistralai dotenv
```


```python
import json
import os
from mistralai.client import Mistral
from dotenv import load_dotenv

load_dotenv()

client = Mistral(api_key=os.environ["MISTRAL_API_KEY"])

# Definir el esquema de la herramienta.
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene la temperatura actual de una ciudad dada.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad, e.g. 'Madrid'."
                    }
                },
                "required": ["city"]
            }
        }
    }
]
```
### Paso 2: Enviar una solicitud con la herramienta

Hacer al modelo una pregunta que requiera la herramienta. El modelo devuelve una respuesta de tipo `tool_calls` en lugar de una respuesta de texto.

```python
messages = [
    {"role": "user", "content": "¿Qué tiempo hace en Madrid hoy?"}
]

response = client.chat.complete(
    model="mistral-medium-latest",
    messages=messages,
    tools=tools,
)

tool_call = response.choices[0].message.tool_calls[0]
print(f"El modelo va a invocar a: {tool_call.function.name}")
print(f"Con los argumentos: {tool_call.function.arguments}")
```

### Paso 3: Ejecutar la función y devolver el resultado.

Ejecutar la función con los argumentos del modelo y, a continuación, devolver el resultado para que el modelo pueda generar una respuesta en lenguaje natural.

```python
# Simular la función (reemplazar con una llamada a la API real)
def get_weather(city: str) -> dict:
    return {"city": city, "temperature": "27°C", "condition": "Soleado"}

# Ejecutar la llamada a la herramienta
args = json.loads(tool_call.function.arguments)
result = get_weather(**args)

# Devuelve el resultado al modelo
messages.append(response.choices[0].message)
messages.append({
    "role": "tool",
    "name": tool_call.function.name,
    "content": json.dumps(result),
    "tool_call_id": tool_call.id,
})

final_response = client.chat.complete(
    model="mistral-medium-latest",
    messages=messages,
    tools=tools,
)

print(final_response.choices[0].message.content)
# "Hoy hace 25ºC en Madrid y está soleado."
```

**Código completo:**

```python
import json
import os
from mistralai.client import Mistral
from dotenv import load_dotenv

load_dotenv()

client = Mistral(api_key=os.environ["MISTRAL_API_KEY"])

# Definir el esquema de la herramienta.
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene la temperatura actual de una ciudad dada.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad, e.g. 'Madrid'."
                    }
                },
                "required": ["city"]
            }
        }
    }
]

messages = [
    {
        "role": "system",
        "content": "Eres un asistente útil. Usa la herramienta get_weather cuando el usuario pregunte por el tiempo."
    },
    {
        "role": "user",
        "content": "¿Qué tiempo hace en Madrid?"
    }
]

response = client.chat.complete(
    model="mistral-medium-latest",
    messages=messages,
    tools=tools,
)

tool_call = response.choices[0].message.tool_calls[0]
print(f"El modelo va a invocar a: {tool_call.function.name}")
print(f"Con los argumentos: {tool_call.function.arguments}")

# Simular la función (reemplazar con una llamada a la API real)
def get_weather(city: str) -> dict:
    return {"city": city, "temperature": "25°C", "condition": "Soleado"}

# Ejecutar la llamada a la herramienta
args = json.loads(tool_call.function.arguments)
result = get_weather(**args)

# Devuelve el resultado al modelo
messages.append(response.choices[0].message)
messages.append({
    "role": "tool",
    "name": tool_call.function.name,
    "content": json.dumps(result),
    "tool_call_id": tool_call.id,
})

final_response = client.chat.complete(
    model="mistral-medium-latest",
    messages=messages,
    tools=tools,
)

print(final_response.choices[0].message.content)
# "Hoy hace 25ºC en Madrid y está soleado."
```
#### Paso 4: Verificar

Una ejecución exitosa imprime una respuesta en lenguaje natural que incluye el valor de retorno de la herramienta. El modelo:

* Detectó que la solicitud requería datos externos.
* `tool_calls` generó una solicitud estructurada
* Incorporó el resultado de nuestra función en una respuesta conversacional.

Podemos configurar la opción `tool_choice: "any"` para forzar al modelo a llamar siempre a una herramienta, o podemos utilizar `tool_choice: "auto"` (opción predeterminada) para dejar que el modelo decida.

### Paso 5: Añadir una llamada a una API que devuelve el tiempo

**Importamos la librería `requests`:**

```python
import requests
```

**Modificamos la función/herramienta `get_weather`**

```python
def get_weather(city: str) -> dict:
    # 1) Geocodificación
    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    geo_resp = requests.get(geo_url, params={"name": city, "count": 1, "language": "es", "format": "json"}, timeout=20)
    geo_resp.raise_for_status()
    geo_data = geo_resp.json()

    results = geo_data.get("results", [])
    if not results:
        return {
            "city": city,
            "error": f"No se encontró la ciudad '{city}'."
        }

    place = results[0]
    latitude = place["latitude"]
    longitude = place["longitude"]
    resolved_name = place["name"]
    country = place.get("country", "")

    # 2) Tiempo actual
    weather_url = "https://api.open-meteo.com/v1/forecast"
    weather_resp = requests.get(
        weather_url,
        params={
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,weather_code",
            "timezone": "auto"
        },
        timeout=20
    )
    weather_resp.raise_for_status()
    weather_data = weather_resp.json()

    current = weather_data.get("current", {})
    temp = current.get("temperature_2m")
    code = current.get("weather_code")

    code_map = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nuboso",
        3: "Cubierto",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna densa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nieve ligera",
        73: "Nieve moderada",
        75: "Nieve intensa",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos violentos",
        95: "Tormenta"
    }

    return {
        "city": resolved_name,
        "country": country,
        "temperature_c": temp,
        "condition": code_map.get(code, f"Código meteorológico {code}"),
        "latitude": latitude,
        "longitude": longitude
    }
```

**Comprobamos que funciona correctamente:**

![Ejemplo de uso de la herramienta (tool) get_weather](./images/chainlit/ejemplo_uso_get_weather_api.png)

**Código completo:**

```python
import requests
import json
import os
from mistralai.client import Mistral
from dotenv import load_dotenv

load_dotenv()

client = Mistral(api_key=os.environ["MISTRAL_API_KEY"])

# Definir el esquema de la herramienta.
# ¿Por qué get_country_info() debe estar descrita tanto en Python como en la lista tools? 
# Eso es así porque una parte define la función real y la otra informa al modelo de que esa 
# herramienta existe y cómo puede invocarla. 
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene la temperatura actual de una ciudad dada.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad, e.g. 'Madrid'."
                    }
                },
                "required": ["city"]
            }
        }
    }
]

messages = [
    {
        "role": "system",
        "content": "Eres un asistente útil. Usa la herramienta get_weather cuando el usuario pregunte por el tiempo."
    },
    {
        "role": "user",
        "content": "¿Qué tiempo hace en Madrid?"
    }
]

response = client.chat.complete(
    model="mistral-medium-latest",
    messages=messages,
    tools=tools,
)

tool_call = response.choices[0].message.tool_calls[0]
print(f"El modelo va a invocar a: {tool_call.function.name}")
print(f"Con los argumentos: {tool_call.function.arguments}")

def get_weather(city: str) -> dict:
    # 1) Geocodificación
    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    geo_resp = requests.get(geo_url, params={"name": city, "count": 1, "language": "es", "format": "json"}, timeout=20)
    geo_resp.raise_for_status()
    geo_data = geo_resp.json()

    results = geo_data.get("results", [])
    if not results:
        return {
            "city": city,
            "error": f"No se encontró la ciudad '{city}'."
        }

    place = results[0]
    latitude = place["latitude"]
    longitude = place["longitude"]
    resolved_name = place["name"]
    country = place.get("country", "")

    # 2) Tiempo actual
    weather_url = "https://api.open-meteo.com/v1/forecast"
    weather_resp = requests.get(
        weather_url,
        params={
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,weather_code",
            "timezone": "auto"
        },
        timeout=20
    )
    weather_resp.raise_for_status()
    weather_data = weather_resp.json()

    current = weather_data.get("current", {})
    temp = current.get("temperature_2m")
    code = current.get("weather_code")

    code_map = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nuboso",
        3: "Cubierto",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna densa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nieve ligera",
        73: "Nieve moderada",
        75: "Nieve intensa",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos violentos",
        95: "Tormenta"
    }

    return {
        "city": resolved_name,
        "country": country,
        "temperature_c": temp,
        "condition": code_map.get(code, f"Código meteorológico {code}"),
        "latitude": latitude,
        "longitude": longitude
    }

# Ejecutar la llamada a la herramienta
args = json.loads(tool_call.function.arguments)
result = get_weather(**args)

# Devuelve el resultado al modelo
messages.append(response.choices[0].message)
messages.append({
    "role": "tool",
    "name": tool_call.function.name,
    "content": json.dumps(result),
    "tool_call_id": tool_call.id,
})

final_response = client.chat.complete(
    model="mistral-medium-latest",
    messages=messages,
    tools=tools,
)

print(final_response.choices[0].message.content)
```

## Actividad guiada: Chainlit+agente con herramientas personalizadas

Vamos ahora a integrar el uso de tools personalizadas con la interfaz de Chainlit. El objetivo de la actividad es construir un asistente en Chainlit capaz de responder preguntas generales y, cuando sea necesario, llamar a una **tool real**, por ejemplo, **`get_weather()`** para consultar el tiempo de una ciudad. 

Veremos: 

* Eventos de chainlit
* Persistencia de estado por sesión
* Arquitectura de **`tool calling`** con un LLM.

### Paso 1- Idea de arquitectura : Chainlit gestiona la interfaz, Mistral decide si necesita una tool y Python ejecuta la tool real. 

Flujo de trabajo:

```python
# Chainlit recibe el mensaje
# Mistral decide si responde o llama a una tool
# Python ejecuta la tool
# Mistral redacta la respuesta final
```

**¿Quién ejecuta realmente `get_weather()`: el modelo o nuestro backend?**

La respuesta correcta es: el **backend en Python**.

### Paso 2 - Preparar el entorno y el bloque inicial de configuración. 

Primero se carga la clave, luego se crea el cliente y finalmente se define el prompt del sistema. Esto da contexto antes de entrar en los callbacks de Chainlit.

**NOTA**: Se ha añadido una nueva variable de configuración llamada MODEL para no hardcodear el modelo seleccionado.

```python
import os
import json
import requests
import chainlit as cl
from dotenv import load_dotenv
from mistralai.client import Mistral

load_dotenv()

API_KEY = os.getenv("MISTRAL_API_KEY")
MODEL = os.getenv("MISTRAL_MODEL", "mistral-medium-latest")

if not API_KEY:
    raise ValueError("Falta la variable de entorno MISTRAL_API_KEY")

client = Mistral(api_key=API_KEY)
```
Explicación:

* **`load_dotenv()`** carga las variables del .env.

* **`API_KEY`** y **`MODEL`** parametrizan la aplicación.

* **`Mistral(...)`** crea el cliente con el que se llamará a la API.
​
### Paso 3

Introducimos la variable **`SYSTEM_PROMPT`** y la definición de **`TOOLS`**. La variable `tool` no es solo una función Python, sino también una descripción estructurada que el modelo puede leer para saber cuándo usarla y con qué argumentos.

```python
SYSTEM_PROMPT = """
Eres un asistente útil y conciso.
Si el usuario pregunta por el tiempo o la meteorología de una ciudad,
usa la herramienta get_weather.
Responde en español.
""".strip()

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene el tiempo actual de una ciudad",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad, por ejemplo Elche, Madrid o Paris"
                    }
                },
                "required": ["city"]
            }
        }
    }
]
```

**IMPORTANTE**: no confundir la lista TOOLS con la función real **`get_weather()`**. 

Conviene insistir en que:

* **`TOOLS`** es la descripción para el modelo.
* **`get_weather()`** es la implementación real en Python.

#### Paso 4: Función función auxiliar weather_code_to_text()

Buena práctica: separar la transformación de datos de la lógica principal del agente. Así el código queda más limpio y además es más fácil de testear.
​
```python
def weather_code_to_text(code: int | None) -> str:
    code_map = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nuboso",
        3: "Cubierto",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nieve ligera",
        73: "Nieve moderada",
        75: "Nieve intensa",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos fuertes",
        95: "Tormenta",
        96: "Tormenta con granizo ligero",
        99: "Tormenta con granizo fuerte",
    }
    return code_map.get(code, f"Código meteorológico {code}")
```

### Paso 5: tool real **`get_weather()`**

Este es el bloque más importante del lado del backend porque muestra que una **`tool`** puede **encadenar dos APIs**: una para geocodificación y otra para obtener el tiempo actual. 
Además, el decorador **`@cl.step(type="tool")`** permite que **Chainlit muestre visualmente la ejecución de la herramienta**.

```python
@cl.step(type="tool", name="get_weather")
async def get_weather(city: str) -> str:
    try:
        geo_resp = requests.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            params={
                "name": city,
                "count": 1,
                "language": "es",
                "format": "json"
            },
            timeout=20,
        )
        geo_resp.raise_for_status()
        geo_data = geo_resp.json()

        results = geo_data.get("results", [])
        if not results:
            return json.dumps(
                {
                    "city": city,
                    "error": f"No se encontró la ciudad '{city}'."
                },
                ensure_ascii=False
            )

        place = results[0]
        latitude = place["latitude"]
        longitude = place["longitude"]

        weather_resp = requests.get(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": latitude,
                "longitude": longitude,
                "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
                "timezone": "auto"
            },
            timeout=20,
        )
        weather_resp.raise_for_status()
        weather_data = weather_resp.json()

        current = weather_data.get("current", {})

        result = {
            "city": place["name"],
            "country": place.get("country"),
            "latitude": latitude,
            "longitude": longitude,
            "temperature_c": current.get("temperature_2m"),
            "humidity": current.get("relative_humidity_2m"),
            "wind_kmh": current.get("wind_speed_10m"),
            "condition": weather_code_to_text(current.get("weather_code")),
        }

        return json.dumps(result, ensure_ascii=False)

    except requests.RequestException as e:
        return json.dumps(
            {
                "city": city,
                "error": f"Error consultando la API meteorológica: {str(e)}"
            },
            ensure_ascii=False
        )
    except Exception as e:
        return json.dumps(
            {
                "city": city,
                "error": f"Error inesperado: {str(e)}"
            },
            ensure_ascii=False
        )
```
Aspectos a remarcar:

* La **`tool`** devuelve texto JSON, no un dicccionario Python sin serializar. Eso es así porque luego se añade al historial como **`content`**.
* **`@cl.step(type="tool")`** permite ver la tool como paso intermedio en Chainlit.
* Se controlan errores para que el agente no se rompa ante fallos de red

### Paso 6 - `AVAILABLE_TOOLS`

Variable que hace de puente entre el nombre que el modelo genera y la función Python que realmente se ejecutará.

```python
AVAILABLE_TOOLS = {
    "get_weather": get_weather
}
```

**¿Por qué no ejecutamos directamente `tool_call.function.name` como si fuera una función?**
Porque el modelo solo devuelve texto estructurado; el backend necesita resolver ese nombre en una función segura y conocida.

### Paso 7 `@cl.on_chat_start`

Chainlit lo usa para *reaccionar* al inicio de una nueva sesión de chat. Aquí se inicializa el historial y se envía el mensaje de bienvenida.

```python
@cl.on_chat_start
async def on_chat_start():
    cl.user_session.set(
        "messages",
        [{"role": "system", "content": SYSTEM_PROMPT}]
    )

    await cl.Message(
        content=(
            "Hola, soy tu asistente con Mistral + Chainlit.\n\n"
            "Puedes preguntarme cosas generales o algo como:\n"
            "- ¿Qué tiempo hace en Elche?\n"
            "- Dime la temperatura actual en Valencia\n"
        )
    ).send()
```
Puntos clave:

* **`cl.user_session`** guarda datos por sesión de usuario, no globalmente.
* El primer mensaje del historial es el **`system prompt`**, que actúa como contexto permanente de la conversación.

### Paso 8 **`@cl.on_message`**

Recibe el mensaje del usuario, lo añade al historial, consulta al modelo, ejecuta **`tools`** si hace falta y finalmente devuelve la respuesta al chat. 
Chainlit documenta este **`callback`** como el punto de entrada principal para mensajes de la **UI**.
​
```python
@cl.on_message
async def on_message(message: cl.Message):
```

Esquema:

1. Recuperar historial.
2. Añadir mensaje usuario.
3. Llamar al modelo.
4. ¿Pide **`tool`**?
5. Si sí, ejecutar **`tool`** y volver al paso 3.
6. Si no, enviar respuesta final.

### Paso 9 - Memoria conversacional

Explica el bloque inicial de recuperación de sesión y añadido del mensaje del usuario. Esta parte conecta con el concepto de memoria conversacional.

```python
    messages = cl.user_session.get("messages", [])
    messages.append({"role": "user", "content": message.content})

    final_answer = None
```
Explicación:

* **`messages`** es la historia completa.
* Sin este historial, cada pregunta sería aislada.
* **`final_answer`** guardará la respuesta final que se enviará al usuario.

### Paso 10 - Bucle controlado de hasta 5 iteraciones

La documentación de Mistral contempla **cadenas sucesivas** de **`function calling`**, por eso tiene sentido iterar.
​
```python
for _ in range(5):
```

Ojo, este for:

* no es para repetir siempre cinco veces,
* sino para permitir varias rondas de **“`modelo -> tool -> modelo`”**,
* con un límite que evita **bucles infinitos**.
​
### Paso 11 - llamada al modelo

```python
response = await client.chat.complete_async(
    model=MODEL,
    messages=messages,
    tools=TOOLS,
    tool_choice="auto",
)
```
Explicación:

* **`messages`** da contexto.

* **`tools=TOOLS`** informa al modelo de qué herramientas existen.

* **`tool_choice="auto"`** deja que el modelo decida si necesita una tool o no.

**¿Qué pasaría si quitamos tools=TOOLS?** El modelo ya no sabría que puede usar **`get_weather`**.
​
### Paso 12 - Cómo se extrae el mensaje del asistente y se prepara su estructura para el historial.

```python
assistant_message = response.choices[0].message
# Construir el payload del mensaje del asistente, 
# incluyendo las llamadas a herramientas si las hay
assistant_payload = {
    "role": "assistant",
    "content": assistant_message.content or ""
}
```

Ojo, **el mensaje del asistente puede venir**:

* con texto normal,

* con **`tool_calls`**,

* o con ambas cosas.

### Paso 13 - Detección de **`tool_calls`**. Este es el corazón del patrón.

```python
tool_calls = getattr(assistant_message, "tool_calls", None)
```

Si hay **`tool_calls`**, el modelo está pidiendo que el backend haga algo antes de seguir. Si no hay **`tool_calls`**, ya tenemos respuesta final.
​
### Paso 14 - Añadir las **`tool calls`** al historial. 

Esto es importante porque el historial debe reflejar también lo que el asistente pidió hacer.

```python
if tool_calls:
    assistant_payload["tool_calls"] = [
        {
            "id": tool_call.id,
            "type": "function",
            "function": {
                "name": tool_call.function.name,
                "arguments": tool_call.function.arguments,
            },
        }
        for tool_call in tool_calls
    ]
```
Después se añade el mensaje del asistente al historial:

```python
messages.append(assistant_payload)
```
Ojo, el historial no guarda solo lo que dice el usuario, sino también lo que dice el asistente y lo que devuelven las **`tools`**.

### Paso 15 - Salida temprana cuando no hay `tools`
​
```python
if not tool_calls:
    final_answer = assistant_message.content or "No tengo respuesta."
    break
```
Esto significa: **“el modelo ya ha terminado; no necesita ninguna herramienta externa”**. En ese caso se guarda la respuesta y se rompe el bucle.
​
### Paso 16 - Ejecución real de **`tools`**. 

Diferencia entre “el modelo propone” y “el backend ejecuta”.

```python
for tool_call in tool_calls:
    function_name = tool_call.function.name
    function_args = json.loads(tool_call.function.arguments)

    if function_name not in AVAILABLE_TOOLS:
        tool_result = json.dumps(
            {"error": f"Herramienta no implementada: {function_name}"},
            ensure_ascii=False
        )
    else:
        print(f"Invocando a la tool: {function_name} con los argumentos: {function_args}")
        tool_result = await AVAILABLE_TOOLS[function_name](**function_args)
```
Explicación:

* **`function_name`** es el nombre generado por el modelo.

* **`function_args`** transforma el **JSON** en un diccionario Python.

* **`AVAILABLE_TOOLS`** actúa como tabla de resolución segura.

### Paso 17 - ¿Cómo se devuelve el resultado de la **`tool`** al historial?

```python
messages.append(
    {
        "role": "tool",
        "name": function_name,
        "tool_call_id": tool_call.id,
        "content": tool_result,
    }
)
```
En la siguiente iteración, el modelo leerá ese resultado y podrá producir una respuesta final como “En Elche hay 18°C y cielo parcialmente nuboso”.

### Paso 18 - Cierra con el guardado del historial y el envío del mensaje final al usuario.

```python
cl.user_session.set("messages", messages)

await cl.Message(
    content=final_answer or "No he podido generar una respuesta final."
).send()
```

**Explicación:**

* **`set("messages", messages)`** persiste la conversación en la sesión actual.
​
* **`cl.Message(...).send()`** muestra la salida en la interfaz.

**Solución completa:**

```python
import os
import json
import requests
import chainlit as cl
from dotenv import load_dotenv
from mistralai.client import Mistral

load_dotenv()

API_KEY = os.getenv("MISTRAL_API_KEY")
MODEL = os.getenv("MISTRAL_MODEL", "mistral-medium-latest")

if not API_KEY:
    raise ValueError("Falta la variable de entorno MISTRAL_API_KEY")

client = Mistral(api_key=API_KEY)

SYSTEM_PROMPT = """
Eres un asistente útil y conciso.
Si el usuario pregunta por el tiempo o la meteorología de una ciudad,
usa la herramienta get_weather.
Responde en español.
""".strip()

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene el tiempo actual de una ciudad",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad, por ejemplo Elche, Madrid o Paris"
                    }
                },
                "required": ["city"]
            }
        }
    }
]

def weather_code_to_text(code: int | None) -> str:
    code_map = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nuboso",
        3: "Cubierto",
        45: "Niebla",
        48: "Niebla con escarcha",
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",
        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia intensa",
        71: "Nieve ligera",
        73: "Nieve moderada",
        75: "Nieve intensa",
        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos fuertes",
        95: "Tormenta",
        96: "Tormenta con granizo ligero",
        99: "Tormenta con granizo fuerte",
    }
    return code_map.get(code, f"Código meteorológico {code}")


@cl.step(type="tool", name="get_weather")
async def get_weather(city: str) -> str:
    try:
        geo_resp = requests.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            params={
                "name": city,
                "count": 1,
                "language": "es",
                "format": "json"
            },
            timeout=20,
        )
        geo_resp.raise_for_status()
        geo_data = geo_resp.json()

        results = geo_data.get("results", [])
        if not results:
            return json.dumps(
                {
                    "city": city,
                    "error": f"No se encontró la ciudad '{city}'."
                },
                ensure_ascii=False
            )

        place = results[0]
        latitude = place["latitude"]
        longitude = place["longitude"]

        weather_resp = requests.get(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": latitude,
                "longitude": longitude,
                "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
                "timezone": "auto"
            },
            timeout=20,
        )
        weather_resp.raise_for_status()
        weather_data = weather_resp.json()

        current = weather_data.get("current", {})

        result = {
            "city": place["name"],
            "country": place.get("country"),
            "latitude": latitude,
            "longitude": longitude,
            "temperature_c": current.get("temperature_2m"),
            "humidity": current.get("relative_humidity_2m"),
            "wind_kmh": current.get("wind_speed_10m"),
            "condition": weather_code_to_text(current.get("weather_code")),
        }

        return json.dumps(result, ensure_ascii=False)

    except requests.RequestException as e:
        return json.dumps(
            {
                "city": city,
                "error": f"Error consultando la API meteorológica: {str(e)}"
            },
            ensure_ascii=False
        )
    except Exception as e:
        return json.dumps(
            {
                "city": city,
                "error": f"Error inesperado: {str(e)}"
            },
            ensure_ascii=False
        )


AVAILABLE_TOOLS = {
    "get_weather": get_weather
}

@cl.on_chat_start
async def on_chat_start():
    cl.user_session.set(
        "messages",
        [{"role": "system", "content": SYSTEM_PROMPT}]
    )

    await cl.Message(
        content=(
            "Hola, soy tu asistente con Mistral + Chainlit.\n\n"
            "Puedes preguntarme cosas generales o algo como:\n"
            "- ¿Qué tiempo hace en Elche?\n"
            "- Dime la temperatura actual en Valencia\n"
        )
    ).send()

@cl.on_message
async def on_message(message: cl.Message):
    messages = cl.user_session.get("messages", [])
    messages.append({"role": "user", "content": message.content})

    final_answer = None

    for _ in range(5):
        response = await client.chat.complete_async(
            model=MODEL,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )

        assistant_message = response.choices[0].message

        assistant_payload = {
            "role": "assistant",
            "content": assistant_message.content or ""
        }

        tool_calls = getattr(assistant_message, "tool_calls", None)

        if tool_calls:
            assistant_payload["tool_calls"] = [
                {
                    "id": tool_call.id,
                    "type": "function",
                    "function": {
                        "name": tool_call.function.name,
                        "arguments": tool_call.function.arguments,
                    },
                }
                for tool_call in tool_calls
            ]

        messages.append(assistant_payload)

        if not tool_calls:
            final_answer = assistant_message.content or "No tengo respuesta."
            break

        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            if function_name not in AVAILABLE_TOOLS:
                tool_result = json.dumps(
                    {"error": f"Herramienta no implementada: {function_name}"},
                    ensure_ascii=False
                )
            else:
                tool_result = await AVAILABLE_TOOLS[function_name](**function_args)

            messages.append(
                {
                    "role": "tool",
                    "name": function_name,
                    "tool_call_id": tool_call.id,
                    "content": tool_result,
                }
            )

    cl.user_session.set("messages", messages)

    await cl.Message(
        content=final_answer or "No he podido generar una respuesta final."
    ).send()

```

#### Esquema mental

Puede explicarse en seis pasos: 

1. Chainlit recibe un mensaje del usuario.
2. Se añade ese mensaje al historial de conversación.
3. Se pregunta a Mistral si puede responder o si necesita una tool.
4. Si pide una tool, el backend ejecuta la función Python correspondiente.
5. El resultado de la tool se devuelve al historial como `role="tool"`.
6. Mistral genera la respuesta final y Chainlit la muestra en pantalla.

### Otro ejemplo de la documentación de Chainlit: un modelo usa dos funciones personalizadas

A continuación podemos ver un caso de uso donde un modelo usa dos funciones personalizadas **`get_current_weather`** y **`get_home_town`** para obtener información y mostrar un resultado.

![](./images/chainlit/agente_napoleon.png)

**Fuente**: documentación de Mistral

```python
import os
import json
import asyncio
import chainlit as cl
from dotenv import load_dotenv

from mistralai.client import Mistral

load_dotenv()

mai_client = Mistral(api_key=os.getenv("MISTRAL_API_KEY", "").strip())

@cl.step(type="tool", name="get_current_weather")
async def get_current_weather(location):
    # Make an actual API call! To open-meteo.com for instance.
    return json.dumps(
        {
            "location": location,
            "temperature": "29",
            "unit": "celsius",
            "forecast": ["sunny"],
        }
    )


@cl.step(type="tool", name="get_home_town")
async def get_home_town(person: str) -> str:
    """Get the hometown of a person"""
    if "Napoleon" in person:
        return "Ajaccio, Corsica"
    elif "Michel" in person:
        return "Caprese, Italy"
    else:
        return "Paris, France"


"""
La lista tools contiene el contrato JSON de cada función. 
Esto le indica al modelo qué nombre tiene cada herramienta, 
para qué sirve y qué argumentos espera.
"""
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_home_town",
            "description": "Get the home town of a specific person",
            "parameters": {
                "type": "object",
                "properties": {
                    "person": {
                        "type": "string",
                        "description": "The name of a person (first and last names) to identify.",
                    }
                },
                "required": ["person"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                },
                "required": ["location"],
            },
        },
    },
]

"""
La función run_multiple(...) se encarga de ejecutar en paralelo todas las herramientas 
que el modelo haya pedido. 
Esto es útil cuando Mistral solicita varias tools en la misma iteración. 
"""
async def run_multiple(tool_calls):
    """
    Ejecutar múltiples llamadas a herramientas (tools) asíncronamente.
    """
    available_tools = {
        "get_current_weather": get_current_weather,
        "get_home_town": get_home_town,
    }

    async def run_single(tool_call):
        function_name = tool_call.function.name
        function_to_call = available_tools[function_name]
        function_args = json.loads(tool_call.function.arguments)

        function_response = await function_to_call(**function_args)
        return {
            "tool_call_id": tool_call.id,
            "role": "tool",
            "name": function_name,
            "content": function_response,
        }

    # Ejecuta varias llamadas de manera concurrente.
    tool_results = await asyncio.gather(
        *(run_single(tool_call) for tool_call in tool_calls)
    )
    return tool_results


@cl.step(type="run", tags=["to_score"])
async def run_agent(user_query: str):
    messages = [{"role": "user", "content": f"{user_query}"}]

    number_iterations = 0
    answer_message_content = None

    while number_iterations < 5:
        completion = mai_client.chat.complete(
            model="mistral-large-latest",
            messages=messages,
            tool_choice="auto",
            tools=tools,
        )
        message = completion.choices[0].message
        messages.append(message)
        answer_message_content = message.content

        if not message.tool_calls:
            break

        tool_results = await run_multiple(message.tool_calls)
        messages.extend(tool_results)

        number_iterations += 1

    return answer_message_content


@cl.set_starters
async def set_starters():
    return [
        cl.Starter(
            label="What's the weather in Napoleon's hometown",
            message="What's the weather in Napoleon's hometown?",
        ),
        cl.Starter(
            label="What's the weather in Paris, TX?",
            message="What's the weather in Paris, TX?",
        ),
        cl.Starter(
            label="What's the weather in Michel-Angelo's hometown?",
            message="What's the weather in Michel-Angelo's hometown?",
        ),
    ]

@cl.on_message
async def main(message: cl.Message):
    """
    Main message handler for incoming user messages.
    """
    answer_message = await run_agent(message.content)
    await cl.Message(content=answer_message).send()
```

## Ejemplo de Chainlit + Mistral con tools de tiempo y “pueblo natal”

Este ejemplo implenta, con Chainlit y Mistral, un **agente conversacional que puede llamar a dos herramientas (*`tools`*)** para responder preguntas sobre el tiempo, incluso cuando el usuario pregunta por el clima en el pueblo natal de alguien.

---

#### Descripción JSON de las herramientas para Mistral

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_home_town",
            "description": "Get the home town of a specific person",
            "parameters": {
                "type": "object",
                "properties": {
                    "person": {
                        "type": "string",
                        "description": "The name of a person (first and last names) to identify.",
                    }
                },
                "required": ["person"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                },
                "required": ["location"],
            },
        },
    },
]
```
Esta lista es lo que se pasa al modelo en **`tools=tools`**.

Cada tool tiene:

* **`name`**: nombre que el modelo debe usar.

* **`description`**: qué hace.

* **`parameters`**: esquema JSON de los argumentos esperados (person o location).

El modelo lee esta “API spec” y decide cuándo llamar a qué función y con qué argumentos.

#### Ejecución de múltiples tool calls en paralelo

```python
async def run_multiple(tool_calls):
    """
    Execute multiple tool calls asynchronously.
    """
    available_tools = {
        "get_current_weather": get_current_weather,
        "get_home_town": get_home_town,
    }

    async def run_single(tool_call):
        function_name = tool_call.function.name
        function_to_call = available_tools[function_name]
        function_args = json.loads(tool_call.function.arguments)

        function_response = await function_to_call(**function_args)
        return {
            "tool_call_id": tool_call.id,
            "role": "tool",
            "name": function_name,
            "content": function_response,
        }

    # Run tool calls in parallel.
    tool_results = await asyncio.gather(
        *(run_single(tool_call) for tool_call in tool_calls)
    )
    return tool_results
```

* **`tool_calls`** viene del modelo: lista de llamadas que quiere hacer.

* **`available_tools`** mapea nombres a funciones Python reales.

* **`run_single`**:

    * Lee el nombre de la tool y sus argumentos.

    * Ejecuta la función Python correspondiente.

    * Devuelve un mensaje con role: "tool" y el resultado, listo para añadir al historial.

* **`asyncio.gather(...)`** ejecuta todas las **`tool calls`** en paralelo, útil si el modelo pide varias herramientas a la vez.

#### Motor del agente: **`run_agent`**

```python
@cl.step(type="run", tags=["to_score"])
async def run_agent(user_query: str):
    messages = [{"role": "user", "content": f"{user_query}"}]

    number_iterations = 0
    answer_message_content = None

    while number_iterations < 5:
        completion = mai_client.chat.complete(
            model=MODEL,
            messages=messages,
            tool_choice="auto",
            tools=tools,
        )
        message = completion.choices.message
        messages.append(message)
        answer_message_content = message.content

        if not message.tool_calls:
            break

        tool_results = await run_multiple(message.tool_calls)
        messages.extend(tool_results)

        number_iterations += 1

    return answer_message_content
```

Flujo:

1. Inicializa el historial con el mensaje del usuario.

2. Bucle (hasta 5 veces):

    * Llama al modelo con **`messages`** y **`tools`**.

    * Añade el mensaje del asistente al historial.

    * Guarda el texto de respuesta en **`answer_message_content`**.

    * Si no hay **`tool_calls`**, sale del bucle (ya hay respuesta final).

    * Si sí hay **`tool_calls`**, llama a **`run_multiple(...)`** para ejecutar las herramientas pedidas y añade los resultados (role: "tool") al historial.

3. Devuelve el texto final (**`answer_message_content`**) que se enviará al usuario.

Ejemplo de cadena de llamadas:

* Usuario: What's the weather in Napoleon's hometown?

* Modelo:

    1. Llama a **`get_home_town(person="Napoleon Bonaparte")`** → “Ajaccio, Corsica”.

    2. Llama a **`get_current_weather(location="Ajaccio, Corsica")`**.

* Modelo: con esos datos, **genera la respuesta en lenguaje natural**.

#### Starters en Chainlit
```python
@cl.set_starters
async def set_starters():
    return [
        cl.Starter(
            label="What's the weather in Napoleon's hometown",
            message="What's the weather in Napoleon's hometown?",
            icon="/public/idea.svg",
        ),
        cl.Starter(
            label="What's the weather in Paris, TX?",
            message="What's the weather in Paris, TX?",
            icon="/public/learn.svg",
        ),
        cl.Starter(
            label="What's the weather in Michel-Angelo's hometown?",
            message="What's the weather in Michel-Angelo's hometown?",
            icon="/public/write.svg",
        ),
    ]
```

Define “tarjetas de inicio” en la UI para que el usuario pueda lanzar ejemplos con un clic.

Cada starter tiene:

* **`label`**: texto del botón.

* **`message`**: mensaje que se envía al agente.

* **`icon`**: icono mostrado.

### Integración con Chainlit: **`on_message`**

```python
@cl.on_message
async def main(message: cl.Message):
    """
    Main message handler for incoming user messages.
    """
    answer_message = await run_agent(message.content) #llamar al agente
    await cl.Message(content=answer_message).send()
```
Es el manejador de mensajes del usuario. Cuando el usuario escribe algo en el chat:

* Llama a **`run_agent(message.content)`**.

* Espera a que el agente termine todas las llamadas de tools necesarias.

* Envía la respuesta final de vuelta al chat.

Resumen final

* Implementación de agente con Chainlit y Mistral que:

* Recibe preguntas del usuario.

* Deja que el modelo decida si necesita llamar a:

    * **`get_home_town`** (para averiguar el pueblo natal de alguien).

    * **`get_current_weather`** (para consultar el tiempo de una ciudad).

* Ejecuta las **`tools`** en paralelo si hace falta.

* Devuelve al usuario una respuesta final en lenguaje natural.

Ejemplo claro de **`function calling`** con múltiples herramientas y de cómo integrarlo en una interfaz de chat con Chainlit.


# Actividad de ampliación: agente con Chainlit, Mistral y tools encadenadas

Esta actividad de ampliación parte de un ejemplo funcional con Chainlit y Mistral en el que el agente puede consultar el tiempo y averiguar el pueblo natal de una persona mediante tools. Chainlit permite gestionar la interfaz con callbacks como **`@cl.on_message`**, acciones y elementos visuales, mientras que Mistral soporta *function calling* para que el modelo solicite herramientas externas cuando las necesita. 

## Título de la práctica

**Ampliación de un agente conversacional con Mistral: tools múltiples, memoria de sesión e interfaz mejorada en Chainlit**

## Objetivos de aprendizaje

- Comprender cómo un modelo de lenguaje puede decidir qué tool necesita para responder.
- Implementar una nueva herramienta personalizada y registrarla en el agente.
- Mantener el historial de conversación usando **`cl.user_session`**. 
- Mejorar la interfaz con botones de acción de Chainlit mediante **`cl.Action`** y **`@cl.action_callback(...)`**. 
- Diseñar una pequeña ampliación funcional manteniendo una arquitectura clara y reutilizable.

## Propuesta de ampliación

Se propone ampliar el proyecto en tres direcciones: 

1. Añadir una nueva tool llamada **`get_country_info(location)`**.
2. Guardar el historial de conversación usando **`cl.user_session`**.
3. Incorporar botones de acción en la interfaz con preguntas predefinidas.

## Resultado esperado

Al final de la práctica, el agente deberá ser capaz de responder preguntas como estas: 

- *What’s the weather in Napoleon’s hometown and in which country is it?*
- *Tell me the hometown, country and weather for Michel-Angelo.*
- *Compare Napoleon’s hometown and Michel-Angelo’s hometown.*
- Pulsar un botón para lanzar automáticamente una de esas preguntas desde la interfaz. 

## Parte 1: añadir una nueva tool

### Objetivo

Crear una tool adicional llamada `get_country_info(location)` que devuelva información básica del país asociado a una ciudad o localización. Esto permitirá que el agente combine información meteorológica y geográfica en una misma respuesta. 

### Implementación sugerida

```python
@cl.step(type="tool", name="get_country_info")
async def get_country_info(location: str) -> str:
    if "Ajaccio" in location:
        return json.dumps({
            "country": "France",
            "capital": "Paris",
            "continent": "Europe"
        })
    elif "Caprese" in location:
        return json.dumps({
            "country": "Italy",
            "capital": "Rome",
            "continent": "Europe"
        })
    elif "Paris" in location:
        return json.dumps({
            "country": "France",
            "capital": "Paris",
            "continent": "Europe"
        })
    else:
        return json.dumps({
            "country": "Unknown",
            "capital": "Unknown",
            "continent": "Unknown"
        })
```

### Tareas del alumnado

- Añadir la función al código.  
- Registrar su definición en la lista **`tools`**.
- Incluirla en el diccionario **`available_tools`**. 
- Probar una pregunta que obligue al modelo a usar más de una tool. 

### Pregunta

¿Por qué **`get_country_info()`** debe estar descrita tanto en Python como en la lista **`tools`**? La respuesta esperada es que una parte define la función real y la otra informa al modelo de que esa herramienta existe y cómo puede invocarla. 

## Parte 2: añadir memoria con **`cl.user_session`**

### Objetivo

Modificar el ejemplo para que el historial conversacional se mantenga entre mensajes. Chainlit documenta **`cl.user_session`** como el mecanismo para guardar estado asociado a cada sesión de usuario. [5]

### Cambio conceptual

En el ejemplo original, **`run_agent()`** parte siempre de un historial nuevo:

```python
messages = [{"role": "user", "content": f"{user_query}"}]
```

Eso impide que el asistente recuerde el contexto anterior. La ampliación consiste en cambiar este comportamiento por uno basado en sesión. 

### Implementación orientativa

```python
@cl.on_chat_start
async def on_chat_start():
    cl.user_session.set("messages", [])


@cl.step(type="run")
async def run_agent(user_query: str):
    messages = cl.user_session.get("messages", [])
    messages.append({"role": "user", "content": user_query})

    number_iterations = 0
    answer_message_content = None

    while number_iterations < 5:
        completion = mai_client.chat.complete(
            model=MODEL,
            messages=messages,
            tool_choice="auto",
            tools=tools,
        )
        message = completion.choices[0].message
        messages.append(message)
        answer_message_content = message.content

        if not message.tool_calls:
            break

        tool_results = await run_multiple(message.tool_calls)
        messages.extend(tool_results)
        number_iterations += 1

    cl.user_session.set("messages", messages)
    return answer_message_content
```

### Tareas del alumnado

- Añadir **`@cl.on_chat_start`** para inicializar la sesión. 
- Modificar `run_agent()` para leer y escribir en `cl.user_session`. 
- Probar una conversación de dos turnos, por ejemplo:  
        - *What’s the weather in Napoleon’s hometown?*  
        - *And in Michel’s hometown?*  
- Comprobar si el bot entiende la continuidad. 

### Pregunta

**¿Qué diferencia hay entre una variable global de Python y **`cl.user_session`**?** La idea es que **`cl.user_session`** mantiene datos por **usuario/sesión**, mientras que una global podría mezclar conversaciones de usuarios distintos. 

## Parte 3: añadir botones con **`cl.Action`**

### Objetivo

Incorporar una interfaz más guiada en Chainlit mediante botones que lancen preguntas predefinidas. Chainlit soporta acciones interactivas con **`cl.Action`** y **`@cl.action_callback(...)`**. 

### Implementación sugerida

```python
def get_action_buttons():
    return [
        cl.Action(
            name="napoleon_button",
            label="Napoleón",
            payload={"prompt": "What's the weather in Napoleon's hometown?"}
        ),
        cl.Action(
            name="michel_button",
            label="Michel-Angelo",
            payload={"prompt": "What's the weather in Michel-Angelo's hometown?"}
        ),
        cl.Action(
            name="compare_button",
            label="Comparar",
            payload={"prompt": "Compare Napoleon's hometown and Michel-Angelo's hometown."}
        )
    ]
```

Y un callback de ejemplo:

```python
@cl.action_callback("napoleon_button")
async def on_napoleon(action: cl.Action):
    prompt = action.payload.get("prompt", "What's the weather in Napoleon's hometown?")
    answer = await run_agent(prompt)
    await cl.Message(content=answer, actions=get_action_buttons()).send()
```

### Tareas del alumnado

- Crear al menos tres botones de acción. 
- Asociar cada botón a un callback. 
- Reutilizar **`run_agent(...)`** en lugar de duplicar lógica del agente. 
- Mostrar los botones al inicio o después de cada respuesta. 

### Pregunta de reflexión

¿Por qué es mejor reutilizar **`run_agent()`** dentro de un **`action_callback`** que escribir una lógica distinta en cada callback? Porque así toda la lógica de conversación y uso de tools queda centralizada y es más mantenible. 

## Parte 4: reto opcional de interfaz visual

### Objetivo

Mostrar el resultado usando algún elemento adicional de Chainlit, no solo texto plano. Chainlit soporta distintos elementos visuales y de contenido además de mensajes básicos. 

### Ideas posibles

- Añadir una tabla resumen con ciudad, país y temperatura. 
- Mostrar una imagen o icono meteorológico según la previsión. 
- Devolver una comparación formateada cuando se consulten dos ciudades.

## Secuencia de trabajo recomendada

1. Revisar el código base y explicar su arquitectura. 
2. Implementar **`get_country_info(location)`**.  
3. Registrar la nueva tool en **`tools`** y **`available_tools`**.
4. Añadir memoria con **`cl.user_session`**.
5. Incorporar botones con **`cl.Action`**. 
6. Probar preguntas simples, compuestas y comparativas. 
7. Realizar el reto visual opcional si queda tiempo. 

## Entregables

El alumnado debe entregar: 

- Un fichero Python funcional con la ampliación implementada.
- Capturas de pantalla del agente funcionando en Chainlit.
- Una breve explicación escrita de los cambios realizados.
- Respuestas a las preguntas de reflexión.

## Criterios de evaluación

| Criterio | Descripción | Puntuación orientativa |
|---------|-------------|------------------------|
| Nueva tool | La tool **`get_country_info()`** está bien implementada e integrada | 3 puntos |
| Memoria de sesión | El agente usa correctamente **`cl.user_session`** | 2 puntos |
| Interfaz | Se añaden botones o elementos de Chainlit funcionales | 2 puntos |
| Integración | El agente combina correctamente varias tools | 2 puntos |
| Claridad técnica | El código es limpio y la explicación es correcta | 1 punto |

## Extensión opcional para alumnado avanzado

Como reto extra, se puede sustituir la tool **`get_current_weather()`** simulada por una llamada real a una API meteorológica como Open-Meteo. Así el proyecto dejaría de usar datos simulados y pasaría a consultar información real. Esto añade dificultad técnica, pero también acerca mucho más la práctica a un caso de uso profesional.

