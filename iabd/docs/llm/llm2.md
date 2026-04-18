---
title: Sesión 2 
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Sesión 2  - Creación de un agente en Mistral AI

## 1. Contexto de la sesión

En la sesión anterior (LLM01) vimos:

- Qué es un LLM y cómo funciona a alto nivel.
- Conceptos de **tokens**, **ventana de contexto**, **system prompt** y **alucinaciones**.
- Un primer ejemplo de interacción tipo chatbot.

En esta sesión damos un paso más: vamos a crear y utilizar un **agente** en Mistral AI, apoyándonos en la API de Agents y Conversations.

La idea clave es pasar de **“hablar con un modelo”** a **“definir un asistente con rol, memoria y comportamiento propios”**.

---

## 2. Objetivos de la sesión

Al finalizar esta sesión, el alumnado será capaz de:

- Explicar la diferencia entre **modelo**, **agente** y **conversación** en Mistral AI.
- Crear un agente básico en la plataforma de Mistral con instrucciones adaptadas al curso.
- Invocar ese agente desde Python usando el cliente oficial de Mistral.
- Observar cómo cambia la experiencia frente a un simple chatbot directo sobre el modelo.

---

## Agentes IA

Los agentes IA son entidades artificiales que pueden percibir y actuar de forma autónoma sobre el entorno circundante para lograr objetivos específicos.

- Los *agentes IA* no es algo nuevo
- Los antiguos agentes funcionaban con reinforcement learning (aprendizaje por refuerzo)
- Agentes poco flexibles, estados y acciones predefinidas

**Ejemplo**: Un agente que aprende a moverse en una cuadrícula para alcanzar un objetivo evitando obstáculos.

![Agente IA obstáculos](./images/agenteia_obstaculos.png)

## Agentes LLM

Son agentes que usan LLMs como el cerebro. Se puede ver como una forma de **extender los LLMs permitiéndoles interactuar con herramientas y entornos externos**.

![Arquitectura interna de un Agente LLM](./images/agente_arquitectura.png)

Tienen tres componentes:

- **Planificación**:
    - **Subobjetivos y descomposición**: El agente divide las tareas grandes en subobjetivos más pequeños y manejables, lo que permite una gestión eficiente de tareas complejas.
    - **Reflexión y perfeccionamiento**: El agente puede autocriticarse y reflexionar sobre sus acciones pasadas, aprender de sus errores y perfeccionarlos para los pasos futuros, mejorando así la calidad de los resultados finales.
- **Memoria**:
    - **Memoria a corto plazo**: utiliza la memoria a corto plazo del modelo para aprender.
    - **Memoria a largo plazo**: Esto proporciona al agente la capacidad de retener y recordar información (infinita) durante períodos prolongados, a menudo aprovechando un almacenamiento vectorial externo y una recuperación rápida (RAG).
- **Percepción y acción (uso de herramientas - tools)**: 
    - El agente aprende a llamar a API externas para obtener información adicional que falta en los pesos del modelo (que a menudo son difíciles de cambiar después del preentrenamiento), incluyendo información actual, capacidad de ejecución de código, acceso a fuentes de información propietarias y más.

![Agente LLM](./images/agente_llm.png)

**Descripción general de un sistema de agente autónomo basado en LLM:**

![Descripción general de un sistema de agente autónomo basado en LLM](./images/agentes_llm_overview.png)

##### Un ejemplo es el agente de GitHub Copilot:

- Usa un LLM como motor principal (se puede seleccionar el LLM).
- Percibe el contexto: ficheros del proyecto actual e incluso puede estar conectado con herramientas externas.
- Actúa sugiriendo líneas, funciones completas o tests.

![Agente LLM](./images/copilot.png)


## Patrones *agénticos*

Los patrones agénticos organizan cómo interactúan esos tres componentes (plan,
memoria y percepción/acción).

Vamos a ver los más usados:

- **ReAct (Reason and Action)**: el LLM genera trazas de thought, action y observation
- **CodeAct**: es como ReAct, pero las acciones son llamadas programáticas a APIs (smolagents)
- **Planning first**: primero se genera un plan completo explícito y se ejecuta poco a poco

### ReAct

ReAct es una estrategia muy sencilla e intuitiva. Dada una user request, el sistema sigue un bucle que genera:

- **Thought**: razonamiento interno
- **Action**: llamada a una herramienta
- **Observation**: resultado devuelto por la herramienta hasta que la respuesta final es obtenida.

La plantilla de indicaciones de ReAct incorpora pasos explícitos para que LLM piense, con un formato aproximado como:

```bash
Thought: ...
Action: ...
Observation: ...
... (Repeated many times)
```
Ejemplos de trayectorias de razonamiento para tareas intensivas en conocimiento (por ejemplo, HotpotQA, FEVER) y tareas de toma de decisiones (por ejemplo, AlfWorld Env, WebShop):

![Ejemplos de trayectorias de razonamiento para tareas intensivas en conocimiento (por ejemplo, HotpotQA, FEVER) y tareas de toma de decisiones (por ejemplo, AlfWorld Env, WebShop).](./images/ejemplo_razonamientos.png)

![](./images/agente_running.gif)

## 3. Conceptos clave en Mistral AI

### 3.1. Modelo vs. Agente

- **Modelo**: red neuronal entrenada para completar texto, traducir, razonar, etc.  
- **Agente** (en Mistral AI): configuración reutilizable que envuelve un modelo y añade:

  - Instrucciones (system prompt persistente).
  - Parámetros (temperatura, estilo, etc.).
  - Opcionalmente, tools o integraciones adicionales.

Trabajar directamente con el modelo es suficiente para un **chatbot simple**, pero repetir siempre las mismas instrucciones y parámetros en cada llamada no es práctico.  
Un **agente** permite centralizar esa configuración y reutilizarla.

### 3.2. Conversación

En Mistral, una **conversación** (Conversation) es la entidad que:

- mantiene el historial de mensajes,
- guarda el contexto,
- y representa el diálogo entre usuario y asistente.

Características:

- Las conversaciones se pueden iniciar **a partir de un agente** (usando `agent_id`) o directamente con un modelo.
- Cada mensaje nuevo se añade como una entrada (entry) en la conversación.

### 3.3. Entradas (Entries)

Una **entrada** representa una acción dentro de la conversación:

- mensajes del usuario,
- respuestas del asistente,
- o actualizaciones generadas por otras operaciones.

El API de Mistral permite:

- crear una conversación inicial con una lista de entradas,
- añadir nuevas entradas,
- recuperar el estado de la conversación.

---

## 4. Escenario de trabajo: “Tutor IA de apoyo al módulo”

En toda la sesión trabajaremos con el mismo caso práctico:

> Un agente llamado **TutorFP-IA**, cuyo objetivo es ayudar a estudiantes de ciclos formativos de informática a entender conceptos de IA y Big Data.

### 4.1. Comportamiento deseado

El agente:

- Responde siempre en castellano.
- Explica conceptos de forma clara, con ejemplos sencillos.
- Adapta el nivel al de estudiantes de FP de grado superior.
- Pide aclaraciones si la pregunta no está bien definida.
- No se inventa normativa ni datos críticos (lo indica cuando no sabe algo).

---

## 5. Parte 1 – Creación del agente en la plataforma de Mistral

> Nota: esta parte se realiza en la interfaz web de Mistral AI con la cuenta configurada por el profesor.

### 5.1. Pasos generales (orientativos)

1. Accede a la consola web de Mistral AI e inicia sesión.  
2. Ve a la sección de **Agents** (Agentes).  
3. Crea un nuevo agente:

   - Nombre: `TutorFP-IA`.
   - Descripción: Asistente didáctico para estudiantes de FP de informática.
   - Idioma por defecto: Español.
   - Rol/instrucciones: ver sección siguiente.

4. Guarda el agente y copia su **Agent ID**.  
   - Este identificador será necesario para usar el agente desde Python.

### 5.2. Instrucciones sugeridas para el agente

Puedes adaptar este texto a tus necesidades:

```text
Eres TutorFP-IA, un asistente de Inteligencia Artificial para estudiantes de ciclos formativos de grado superior de informática.

Tu comportamiento debe seguir estas reglas:

- Respondes SIEMPRE en castellano.
- Explicas los conceptos de forma clara, con ejemplos sencillos, adecuados a estudiantes de FP.
- Si la pregunta es ambigua o faltan datos importantes, primero pides aclaraciones.
- Cuando hables de normativa, leyes u otros datos sensibles, indicas siempre que deben verificarse con fuentes oficiales.
- Si no sabes algo, lo dices de forma explícita en lugar de inventar la respuesta.
- Puedes usar enumeraciones y listas para organizar tus explicaciones, pero intenta no ser excesivamente largo.
```

---

## 6. Parte 2 – Preparación del entorno Python

> Esta parte se realiza en local, en el entorno de desarrollo del alumno.

### 6.1. Requisitos

- Python 3.10 o superior.
- Entorno virtual creado para el proyecto.
- Paquete oficial de Mistral AI instalado:

```bash
pip install mistralai
```

### 6.2. Variables de entorno necesarias

Define al menos estas dos variables:

- `MISTRAL_API_KEY`: tu clave de API de Mistral AI.
- `MISTRAL_AGENT_ID`: el `agent_id` del agente `TutorFP-IA`.

En Linux/macOS (ejemplo):

```bash
export MISTRAL_API_KEY="TU_CLAVE_REAL"
export MISTRAL_AGENT_ID="ag_xxx..."
```

En Windows (PowerShell):

```powershell
$env:MISTRAL_API_KEY="TU_CLAVE_REAL"
$env:MISTRAL_AGENT_ID="ag_xxx..."
```

---

## 7. Parte 3 – Primer script: invocar al agente desde Python

Crea un archivo, por ejemplo `llm02_agente_mistral.py`, con el siguiente contenido base:

```python
import os
from mistralai import Mistral

def main():
    api_key = os.getenv("MISTRAL_API_KEY", "").strip()
    agent_id = os.getenv("MISTRAL_AGENT_ID", "").strip()

    if not api_key:
        raise ValueError("Falta la variable de entorno MISTRAL_API_KEY")

    if not agent_id:
        raise ValueError("Falta la variable de entorno MISTRAL_AGENT_ID")

    client = Mistral(api_key=api_key)

    # Primer mensaje del usuario
    inputs = [
        {
            "role": "user",
            "content": "Hola, ¿puedes explicarme qué es un token en un LLM con un ejemplo sencillo?"
        }
    ]

    response = client.beta.conversations.start(
        agent_id=agent_id,
        agent_version=0,
        inputs=inputs,
    )

    print("=== RESPUESTA DEL AGENTE ===")
    print(response)

if __name__ == "__main__":
    main()
```

### 7.1. Qué hace este script

1. Lee las variables de entorno `MISTRAL_API_KEY` y `MISTRAL_AGENT_ID`.  
2. Crea un cliente `Mistral` con la API key.  
3. Construye una lista de `inputs` con un mensaje de usuario.  
4. Llama a `client.beta.conversations.start(...)` para iniciar una conversación con el agente `TutorFP-IA`.  
5. Imprime el objeto de respuesta (que incluye información de la conversación y del mensaje generado).

### 7.2. Ejecución

Desde el terminal:

```bash
python llm02_agente_mistral.py
```

---

## 8. Actividades prácticas de la sesión

### Actividad 1 – Comprobación de variables y conexión

1. Modifica el script para que, antes de crear el cliente, imprima:

   - si `MISTRAL_API_KEY` está cargada,  
   - si `MISTRAL_AGENT_ID` está cargado.

2. Ejecuta el script y verifica que ambas están correctamente definidas.

Fragmento de ayuda:

```python
print("API key cargada:", bool(api_key))
print("Agent ID cargado:", bool(agent_id))
print("Agent ID:", agent_id)
```

3. Si alguna no está cargada, corrige la configuración de tu entorno.

---

### Actividad 2 – Cambiar la pregunta y observar el comportamiento

1. Modifica el contenido del mensaje de usuario:

   - Pregunta 1:  
     `¿Qué es la Inteligencia Artificial?`
   - Pregunta 2:  
     `Explícame qué es el overfitting con un ejemplo en clasificación.`
   - Pregunta 3:  
     `Compara brevemente un árbol de decisión y una red neuronal.`

2. Observa si el agente:

   - responde en castellano,  
   - adapta el nivel,  
   - pide aclaraciones si la pregunta es ambigua.

3. Comenta (en un pequeño `.md` o como comentario en el código):

   - ¿En qué se nota que el agente tiene instrucciones específicas?  
   - ¿Qué diferencia aprecias respecto a un simple modelo sin agent?

---

### Actividad 3 – Simular una conversación con varias preguntas

Aunque la API de Conversations permite mantener el estado de una conversación en la plataforma, en esta sesión haremos una simulación simple de intercambio.

1. Dentro de `main()`, sustituye el bloque de mensaje único por un bucle:

```python
while True:
    user_input = input("\nTú: ")
    if user_input.lower() in {"salir", "exit", "quit"}:
        break

    inputs = [{"role": "user", "content": user_input}]

    response = client.beta.conversations.start(
        agent_id=agent_id,
        agent_version=0,
        inputs=inputs,
    )

    print("\nAgente:", response)
```

2. Haz varias preguntas seguidas relacionadas entre sí (por ejemplo, todas sobre LLMs).  
3. Discute en clase:

   - ¿Qué parte de la memoria se está gestionando aquí manualmente?  
   - ¿Qué crees que permitiría hacer una gestión más robusta de conversaciones persistentes?

---

### Actividad 4 – Detectar errores y sus causas

Durante la sesión pueden aparecer errores como:

- `Unauthorized (401)`: problemas con la API key (ausente, incorrecta, con espacios, etc.).  
- Errores de `agent_id`: agente inexistente o mal copiado.  
- Timeouts o problemas de red.

Tarea:

1. Simula uno de estos errores (por ejemplo, cambiando un carácter del `agent_id`).  
2. Observa el mensaje de error.  
3. Escribe una breve nota explicando:

   - qué crees que significa,  
   - cómo lo has resuelto.

---

## 9. Comparación con la sesión 1

Es importante que el alumnado vea claramente el salto respecto a la primera sesión.

### 9.1. Sesión 1 (LLM01)

- Interacción directa con un **modelo**.
- System prompt definido en el código o en el entorno, pero no centralizado en un agente.
- Foco en:
  - tokens,
  - contexto,
  - prompts.

### 9.2. Sesión 2 (LLM02)

- Interacción a través de un **agente** de Mistral.
- System prompt e instrucciones encapsulados en el agente.
- Foco en:
  - diferencia entre modelo y agente,
  - uso de la API de Agents & Conversations,
  - ventajas de centralizar configuración y rol.

---

## 10. Preguntas de reflexión

Puedes proponer estas preguntas para cierre de sesión (por escrito o discusión):

1. ¿Qué ventaja tiene definir un agente frente a llamar directamente a un modelo?
2. ¿Qué elementos del comportamiento del agente has podido controlar desde sus instrucciones?
3. ¿En qué tipo de proyectos te parece especialmente útil trabajar con agentes?
4. ¿Qué limitaciones sigue teniendo el sistema actual que crees que se pueden mejorar con herramientas (tools) o RAG en sesiones posteriores?

---

## 11. Relación con sesiones futuras

Lo que has aprendido en LLM02 servirá como base para:

- Comparar en próximas sesiones este enfoque con **frameworks de agentes en código** (smolagents).
- Entender cómo un agente puede usar **tools** para realizar acciones externas.
- Introducir **RAG** y agentes con **LangChain** para trabajar con documentación propia del módulo.

En resumen, en esta sesión has dado el primer paso hacia aplicaciones LLM más estructuradas, donde el modelo ya no es solo “el que responde”, sino parte de un **agente** con rol y memoria definidos.
