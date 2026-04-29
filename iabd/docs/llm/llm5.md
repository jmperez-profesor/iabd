---
title: Sesión 5- Agentes con Chainlit + API de Mistral 2 (herramientas integradas y funciones personalizadas)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

## Probar funciones propias en Mistral Studio

### Usar la herramienta integrada "búsqueda" en el Agente Meeting Summarizer

![Activar la herramienta integrada "búsqueda" en el Agente Meeting Summarizer](./images/chainlit/meeting_summarizer_mistralai.png)

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

## Actividad guiada: Chainlit+agente con herramientas personalizadas

Vamos ahora a integrar el uso de tools personalizadas con la interfaz de Chainlit. 

El objetivo de la actividad es construir un asistente en Chainlit capaz de responder preguntas generales y, cuando sea necesario, llamar a una tool real get_weather() para consultar el tiempo de una ciudad. 

Vemos: 

* Eventos de Chainlit
* Persistencia de estado por sesión
* Arquitectura de tool calling con un LLM.

### Paso 1- Idea de arquitectura : Chainlit gestiona la interfaz, Mistral decide si necesita una tool y Python ejecuta la tool real. 

Código de referencia para explicar el flujo:

```python
# Chainlit recibe el mensaje
# Mistral decide si responde o llama a una tool
# Python ejecuta la tool
# Mistral redacta la respuesta final
```

**¿Quién ejecuta realmente get_weather: el modelo o nuestro backend? **

La respuesta correcta es: el backend en Python.

### Paso 2 - Pue preparen el entorno y el bloque inicial de configuración. 

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

* load_dotenv() carga las variables del .env.

* API_KEY y MODEL parametrizan la aplicación.

* Mistral(...) crea el cliente con el que se llamará a la API.
​
### Paso 3

Introducimos el **`SYSTEM_PROMPT`** y la definición de **`TOOLS`**. La variable `tool` no es solo una función Python, sino también una descripción estructurada que el modelo puede leer para saber cuándo usarla y con qué argumentos.

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

**IMPORTANTE**: no confundir la lista TOOLS con la función real **`get_weather()`**. Conviene insistir en que:

* TOOLS es la descripción para el modelo.
* `get_weather()` es la implementación real en Python.

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

### Paso 5: tool real get_weather()

Este es el bloque más importante del lado backend porque muestra que una tool puede encadenar dos APIs: una para geocodificación y otra para tiempo actual. 
Además, el decorador **`@cl.step(type="tool")`** permite que Chainlit muestre visualmente la ejecución de la herramienta.

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

* La tool devuelve texto JSON, no un dict Python sin serializar, porque luego se añade al historial como **`content`**.
* **`@cl.step(type="tool")`** permite ver la tool como paso intermedio en Chainlit.
​* Se controlan errores para que el agente no se rompa ante fallos de red


### Paso 6 - AVAILABLE_TOOLS

Es un detalle pequeño, pero muy importante conceptualmente: aquí se hace el puente entre el nombre que el modelo genera y la función Python que realmente se ejecutará.

```python
AVAILABLE_TOOLS = {
    "get_weather": get_weather
}
```

**¿Por qué no ejecutamos directamente `tool_call.function.name` como si fuera una función?**
Porque el modelo solo devuelve texto estructurado; el backend necesita resolver ese nombre en una función segura y conocida.

### Paso 7 @cl.on_chat_start

Chainlit lo usa para reaccionar al inicio de una nueva sesión de chat. Aquí se inicializa el historial y se envía el mensaje de bienvenida.

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
​* El primer mensaje del historial es el system prompt, que actúa como contexto permanente de la conversación.

### Paso 8 @cl.on_message

Recibe el mensaje del usuario, lo añade al historial, consulta al modelo, ejecuta tools si hace falta y finalmente devuelve la respuesta al chat. Chainlit documenta este callback como el punto de entrada principal para mensajes de la UI.
​

```python
@cl.on_message
async def on_message(message: cl.Message):
```

Esquema:

1. Recuperar historial.

2. Añadir mensaje usuario.

3. Llamar al modelo.

4. ¿Pide tool?

5. Si sí, ejecutar tool y volver al paso 3.

6. Si no, enviar respuesta final.

Paso 9
Explica el bloque inicial de recuperación de sesión y añadido del mensaje del usuario. Esta parte conecta con el concepto de memoria conversacional.

```python
messages = cl.user_session.get("messages", [])
messages.append({"role": "user", "content": message.content})

final_answer = None
```
Explicación:

* `messages` es la historia completa.
* Sin este historial, cada pregunta sería aislada.
* `final_answer` guardará la respuesta final que se enviará al usuario.

Paso 10
Explica el bucle controlado de hasta cinco iteraciones. La documentación de Mistral contempla cadenas sucesivas de function calling, por eso tiene sentido iterar.
​

python
for _ in range(5):
Insiste en que este for:

no es para repetir siempre cinco veces,

sino para permitir varias rondas de “modelo -> tool -> modelo”,

con un límite que evita loops infinitos.
​

Paso 11
Muestra la llamada al modelo. Es uno de los puntos donde más dudas suelen aparecer.

python
response = await client.chat.complete_async(
    model=MODEL,
    messages=messages,
    tools=TOOLS,
    tool_choice="auto",
)
Explicación:

messages da contexto.

tools=TOOLS informa al modelo de qué herramientas existen.

tool_choice="auto" deja que el modelo decida si necesita una tool o no.

Pregunta para clase: ¿Qué pasaría si quitamos tools=TOOLS? El modelo ya no sabría que puede usar get_weather.
​

Paso 12
Enseña cómo se extrae el mensaje del asistente y se prepara su estructura para el historial.
​

python
assistant_message = response.choices[0].message

assistant_payload = {
    "role": "assistant",
    "content": assistant_message.content or ""
}
Aquí puedes remarcar que el mensaje del asistente puede venir:

con texto normal,

con tool_calls,

o con ambas cosas.

Paso 13
Explica la detección de tool_calls. Este es el corazón del patrón.

python
tool_calls = getattr(assistant_message, "tool_calls", None)
Si hay tool_calls, el modelo está pidiendo que el backend haga algo antes de seguir. Si no hay tool_calls, ya tenemos respuesta final.
​

Paso 14
Muestra el bloque que añade las tool calls al historial. Esto es importante porque el historial debe reflejar también lo que el asistente pidió hacer.

python
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
Después se añade el mensaje del asistente al historial:

python
messages.append(assistant_payload)
Punto didáctico: el historial no guarda solo lo que dice el usuario, sino también lo que dice el asistente y lo que devuelven las tools.

Paso 15
Explica la salida temprana cuando no hay tools.
​

python
if not tool_calls:
    final_answer = assistant_message.content or "No tengo respuesta."
    break
Esto significa: “el modelo ya ha terminado; no necesita ninguna herramienta externa”. En ese caso se guarda la respuesta y se rompe el bucle.
​

Paso 16
Ahora presenta la ejecución real de tools. Aquí el alumnado ve la diferencia entre “el modelo propone” y “el backend ejecuta”.

python
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
Explicación:

function_name es el nombre generado por el modelo.

function_args transforma el JSON en un diccionario Python.

AVAILABLE_TOOLS actúa como tabla de resolución segura.

Paso 17
Explica cómo se devuelve el resultado de la tool al historial.

python
messages.append(
    {
        "role": "tool",
        "name": function_name,
        "tool_call_id": tool_call.id,
        "content": tool_result,
    }
)
Este bloque es clave porque en la siguiente iteración el modelo leerá ese resultado y podrá producir una respuesta final como “En Elche hay 18°C y cielo parcialmente nuboso”.

Paso 18
Cierra con el guardado del historial y el envío del mensaje final al usuario.

python
cl.user_session.set("messages", messages)

await cl.Message(
    content=final_answer or "No he podido generar una respuesta final."
).send()
Explicación:

set("messages", messages) persiste la conversación en la sesión actual.
​

cl.Message(...).send() muestra la salida en la interfaz.




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



### Documentación paso a paso de `on_message` en Chainlit con Mistral

Esta función implementa el **bucle principal de conversación** entre Chainlit, el modelo de Mistral y las herramientas externas o *tools*. Chainlit ejecuta `@cl.on_message` cada vez que el usuario envía un mensaje desde la interfaz, y Mistral soporta llamadas asíncronas con herramientas mediante `chat.complete_async(..., tools=..., tool_choice="auto")`. 

#### Función completa

```python
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

#### 1. Decorador y firma

```python
@cl.on_message
async def on_message(message: cl.Message):
```

- `@cl.on_message` indica a Chainlit que esta función debe ejecutarse cada vez que el usuario envía un mensaje desde la interfaz. 
- La palabra clave `async` convierte la función en asíncrona, lo que permite hacer llamadas HTTP o a APIs sin bloquear la aplicación. 
- El parámetro `message: cl.Message` representa el mensaje recibido y su contenido textual está disponible en `message.content`. 

#### 2. Recuperar el historial y añadir el nuevo mensaje

```python
messages = cl.user_session.get("messages", [])
messages.append({"role": "user", "content": message.content})
```

- `cl.user_session.get("messages", [])` recupera el historial guardado para ese usuario y devuelve una lista vacía si todavía no existe. Chainlit documenta `user_session` precisamente para mantener estado por conversación. 
- Después se añade el nuevo mensaje del usuario al historial con el formato esperado por las APIs de chat: un diccionario con `role` y `content`. 
- Gracias a esto, el modelo recibe contexto acumulado y no solo el último mensaje aislado. 

#### 3. Preparar la variable de respuesta final

```python
final_answer = None
```

- Esta variable se usa para almacenar la respuesta final que se mostrará al usuario al terminar el proceso. 
- Se inicializa con `None` porque todavía no se sabe si el modelo responderá directamente o si antes necesitará llamar a una herramienta.

#### 4. Bucle de iteración controlado

```python
for _ in range(5):
```

- Este bucle permite repetir el ciclo de **modelo -> tool -> modelo** varias veces. 
- El límite de 5 iteraciones actúa como medida de seguridad para evitar bucles infinitos si el modelo sigue solicitando tools sin cerrar la respuesta.

#### 5. Llamada al modelo de Mistral

```python
response = await client.chat.complete_async(
    model=MODEL,
    messages=messages,
    tools=TOOLS,
    tool_choice="auto",
)
```

- `client.chat.complete_async(...)` realiza una llamada asíncrona al modelo de Mistral. El cliente Python oficial documenta este patrón para chat completions. 
- `model=MODEL` indica el nombre del modelo que se quiere usar. 
- `messages=messages` envía el historial completo al modelo. 
- `tools=TOOLS` registra las herramientas que el modelo puede invocar. 
- `tool_choice="auto"` deja que el modelo decida si necesita o no usar una herramienta. 

#### 6. Extraer el mensaje del asistente

```python
assistant_message = response.choices[0].message
```

- La API devuelve una lista de posibles respuestas en `choices`, y aquí se toma la primera.
- `assistant_message` contiene el mensaje generado por el asistente, incluyendo tanto texto natural como posibles `tool_calls`. 

#### 7. Crear la estructura base del mensaje del asistente

```python
assistant_payload = {
    "role": "assistant",
    "content": assistant_message.content or ""
}
```

- Se construye un diccionario que representa el mensaje del asistente dentro del historial.
- `role` vale `"assistant"` porque ese mensaje proviene del modelo. 
- `assistant_message.content or ""` evita problemas si el contenido viene vacío porque el modelo solo ha devuelto llamadas a herramientas. 

#### 8. Comprobar si el modelo ha pedido herramientas

```python
tool_calls = getattr(assistant_message, "tool_calls", None)
```

- `getattr(...)` intenta leer el atributo `tool_calls` y devuelve `None` si no existe. 
- Si el modelo necesita información externa, `tool_calls` contendrá una lista de llamadas a herramientas con nombre y argumentos. 

#### 9. Guardar las tool calls en el historial

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

- Si existen llamadas a tools, se añaden al mensaje del asistente para que el historial refleje exactamente lo que el modelo ha pedido hacer.
- Cada llamada incluye un `id`, el tipo `function`, el nombre de la herramienta y los argumentos serializados en JSON.
- Ese `id` es importante porque luego se utilizará para vincular la respuesta de la tool con la llamada original.

#### 10. Añadir el mensaje del asistente al historial

```python
messages.append(assistant_payload)
```

- En este punto el historial ya incluye la intervención del asistente, tanto si es una respuesta normal como si es una petición de tools. 
- Mantener este historial consistente es clave para que el siguiente turno del modelo entienda lo que ya ha ocurrido en la conversación. 

#### 11. Salida temprana si no hay tools

```python
if not tool_calls:
    final_answer = assistant_message.content or "No tengo respuesta."
    break
```

- Si `tool_calls` está vacío o es `None`, significa que el modelo ya ha generado una respuesta final y no necesita herramientas adicionales. 
- Esa respuesta se guarda en `final_answer` y se interrumpe el bucle con `break`. 
- Este es el caso más simple: usuario pregunta, modelo responde directamente. 

#### 12. Recorrer cada llamada a herramienta

```python
for tool_call in tool_calls:
    function_name = tool_call.function.name
    function_args = json.loads(tool_call.function.arguments)
```

- Si el modelo ha pedido tools, se recorre cada llamada en un bucle.
- `function_name` extrae el nombre de la herramienta solicitada. 
- `tool_call.function.arguments` llega como texto JSON y `json.loads(...)` lo convierte en un diccionario Python listo para usar. 

#### 13. Verificar si la herramienta existe y ejecutarla

```python
if function_name not in AVAILABLE_TOOLS:
    tool_result = json.dumps(
        {"error": f"Herramienta no implementada: {function_name}"},
        ensure_ascii=False
    )
else:
    tool_result = await AVAILABLE_TOOLS[function_name](**function_args)
```

- `AVAILABLE_TOOLS` es un diccionario que relaciona nombres de herramientas con funciones Python reales. 
- Si la herramienta pedida por el modelo no existe, se genera una respuesta de error en JSON. 
- Si la herramienta sí existe, se ejecuta con `await`, pasando los argumentos con `**function_args`. 
- Esta es la parte donde el backend realmente ejecuta lógica externa; el modelo solo decide qué función quiere usar, pero no la ejecuta por sí mismo.

#### 14. Guardar el resultado de la tool en el historial

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

- El resultado de la herramienta se añade al historial como un mensaje con `role: "tool"`. 
- `tool_call_id` enlaza este resultado con la llamada original hecha por el modelo. 
- En la siguiente iteración del bucle, Mistral verá este resultado y podrá generar una respuesta final basada en esos datos. 

#### 15. Guardar el historial actualizado en la sesión

```python
cl.user_session.set("messages", messages)
```

- Cuando termina el bucle, el historial completo se guarda otra vez en la sesión del usuario.
- Esto permite que la conversación continúe en mensajes posteriores manteniendo todo el contexto previo. 

#### 16. Enviar la respuesta final a Chainlit

```python
await cl.Message(
    content=final_answer or "No he podido generar una respuesta final."
).send()
```

- Se construye un mensaje de salida para la interfaz de Chainlit y se envía con `.send()`. 
- Si `final_answer` tiene contenido, eso es lo que verá el usuario. Si no, se muestra un mensaje de error controlado. 

#### Resumen conceptual

Esta función implementa el siguiente flujo de trabajo: Chainlit recibe el mensaje del usuario, recupera el historial, consulta a Mistral, detecta si el modelo quiere usar herramientas, ejecuta esas herramientas en Python, añade los resultados al historial y vuelve a consultar al modelo hasta obtener una respuesta final. Ese patrón corresponde al flujo estándar de *tool calling* documentado por Mistral y puede integrarse de forma natural en los hooks de Chainlit. 

#### Esquema mental

Puede explicarse en seis pasos: 

1. Chainlit recibe un mensaje del usuario.
2. Se añade ese mensaje al historial de conversación.
3. Se pregunta a Mistral si puede responder o si necesita una tool.
4. Si pide una tool, el backend ejecuta la función Python correspondiente.
5. El resultado de la tool se devuelve al historial como `role="tool"`.
6. Mistral genera la respuesta final y Chainlit la muestra en pantalla.

### Otro ejemplo de la documentación de Chainlit 

A continuación podemos ver un caso de uso donde un modelo usa dos funciones personalizadas **`get_current_weather`** y **`get_home_town`** externa para obtener información y mostrar un resultado.

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
JSON tool definitions provided to the LLM.
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


## Actividad: Migrar agentes de Mistral Studio a una app Chainlit con funciones propias

### Contexto

En la sesión anterior (LLM2) creaste en **Mistral Studio AI** dos agentes en el playground:

- **Agente A – Tutor técnico de Flask**  
- **Agente B – Generador creativo de ideas**

Aquella actividad se centraba en definir bien el **rol**, las **instrucciones** y el **tono** de cada agente, pero **sin usar herramientas (tools)** ni funciones propias del agente.

En esta sesión vamos a dar un paso más: vas a construir una **aplicación propia** en Python usando **Chainlit** como interfaz de chat, reutilizando la idea de los dos agentes, pero añadiendo **funciones personalizadas** que el modelo pueda llamar cuando lo necesite, siguiendo el patrón de integración oficial entre Chainlit y Mistral. 

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
   - El código debe llamar a la API de Mistral con una lista de `tools` (funciones) definidas en JSON, siguiendo el modelo de *function calling*. 
   - Cuando el modelo decida usar una tool, tu backend debe:
     - leer el `tool_call` devuelto,  
     - ejecutar la función Python correspondiente,  
     - y devolver el resultado al modelo para que este construya la respuesta final.  

4. **Integración de las funciones personalizadas**  
   - Las funciones `get_weather`, `get_time`, `get_stock_price` (u otras que definas) deben estar realmente implementadas en el código y ser invocadas por el agente. 
   - El comportamiento debe ser observable en la conversación (por ejemplo, Chainlit puede mostrar un paso tipo “tool” cuando se ejecuta la función, usando `@cl.step(type="tool")`).

5. **Demostraciones de uso**  
   - Debes probar la app con varios ejemplos, de forma que:
     - en algunos casos el agente responda sin tools,  
     - y en otros casos el agente necesite llamar a una o varias tools para completar la respuesta. 

---

### Pasos guiados (recomendados)

1. **Paso 1: App Chainlit mínima**  
   - Crea un `app.py` que use Chainlit y un modelo de Mistral, sin tools.  
   - Comprueba que puedes enviar y recibir mensajes.   

2. **Paso 2: Añadir un solo tool sencillo**  
   - Implementa `get_time` como función Python.  
   - Define el tool JSON y pásalo al modelo.  
   - Comprueba, con algún prompt tipo “¿Qué hora es en Londres?”, que el modelo decide llamar a la función. 

3. **Paso 3: Añadir `get_weather` y `get_stock_price`**  
   - Implementa estas funciones y añádelas a la lista de tools. 
   - Diseña prompts donde tenga sentido usarlas (tiempo en una ciudad, precio de una acción, etc.).  

4. **Paso 4: Instrucciones de los agentes A y B**  
   - Adapta en el código los prompts de sistema / instrucciones que ya diseñaste en Mistral Studio para el Tutor Flask y el Generador creativo.   
   - Ajusta el rol de A hacia algo más práctico/planificador, y deja B como creativo.  

5. **Paso 5: Selector de agente**  
   - Añade un mecanismo sencillo para indicar con qué agente hablas (por ejemplo, guardando una variable en la sesión de usuario de Chainlit). 
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

