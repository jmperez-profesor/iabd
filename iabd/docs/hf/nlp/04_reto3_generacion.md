---
title: Tasks NLP con los Transformers y pipelines de Hugging Face - Reto 3
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 🏆 Reto 3: Asistente de escritura creativa

**⏱️ Tiempo:** 30 minutos  
**🎯 Nivel:** Avanzado  
**🚀 Objetivo:** Desarrollar un generador de texto contextual para escritura creativa

## 🎬 Contexto y Motivación (5 min)

### El problema real
Una agencia de marketing digital necesita generar contenido constantemente:

- **50+ posts** para redes sociales semanalmente
- **Artículos de blog** personalizados para diferentes clientes
- **Copys publicitarios** creativos y únicos
- **Historias** para campañas de storytelling

### ¿Por qué es revolucionario?
- **Creatividad aumentada:** IA como co-piloto creativo, no reemplazo
- **Velocidad:** De horas a minutos para generar borradores
- **Consistencia de marca:** Mantener tono y estilo específicos
- **Superación del bloqueo creativo:** Inspiración infinita

## 🧠 Teoría Just-in-Time (10 min)

### Generación de Texto: Tipos y Aplicaciones

| Tipo | Descripción | Ejemplo de Uso |
|------|-------------|----------------|
| **Completado** | Continúa un texto iniciado | "Era una noche oscura y..." |
| **Condicional** | Genera según condiciones | "Escribe un poema sobre el mar" |
| **Conversacional** | Diálogo interactivo | Chatbots, asistentes |
| **Resumen** | Condensa información | Resúmenes automáticos |

### Modelos de generación populares

```python {linenums="1"} 
modelos_generacion = {
    "gpt2": "gpt2",  # Clásico, rápido
    "gpt2_spanish": "DeepESP/gpt2-spanish",  # Especializado en español
    "bloom": "bigscience/bloom-560m",  # Multiidioma
    "flan_t5": "google/flan-t5-base",  # Instrucciones específicas
}
```

### Parámetros clave para controlar la generación

```python {linenums="1" hl_lines="1"} 
generator = pipeline("text-generation", model="gpt2")

texto = generator(
    "Había una vez",
    max_length=100,        # Longitud máxima
    num_return_sequences=3, # Número de variaciones
    temperature=0.8,       # Creatividad (0.1=conservador, 1.5=muy creativo)
    do_sample=True,        # Activar sampling
    top_k=50,             # Top-k sampling
    top_p=0.95,           # Nucleus sampling
    repetition_penalty=1.2 # Evitar repeticiones
)
```
Resultado:
```bash
Truncation was not explicitly activated but `max_length` is provided a specific value, please use `truncation=True` to explicitly truncate examples to max length. Defaulting to 'longest_first' truncation strategy. If you encode pairs of sequences (GLUE-style) with the tokenizer you can select this strategy more precisely by providing a specific strategy to `truncation`.
Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.
Both `max_new_tokens` (=256) and `max_length`(=100) seem to have been set. `max_new_tokens` will take precedence. Please refer to the documentation for more information. (https://huggingface.co/docs/transformers/main/en/main_classes/text_generation)
```
Estos mensajes son avisos de configuración de la generación de texto. Veamos cada uno de ellos.

1. Aviso sobre max_length y truncado

`Truncation was not explicitly activated but max_length is provided…`

El tokenizer ve que hemos puesto `max_length=100`, pero no le hemos dicho si debe truncar las entradas largas. Nos avisa de que aplica la estrategia por defecto (longest_first).​

Solución simple: podríamos activar el truncado de forma explícita en la llamada:

```python {linenums="1" hl_lines="1"}
texto = generator(
    "Había una vez",
    max_length=100,
    num_return_sequences=3,
    temperature=0.8,
    do_sample=True,
    top_k=50,
    top_p=0.95,
    repetition_penalty=1.2,
    truncation=True      # <- añadido
)
```
2. Aviso sobre pad_token_id
`Setting pad_token_id to eos_token_id:50256…`

**GPT‑2** no tiene `pad_token` definido, así que **Transformers**, por defecto, usa el token de fin de secuencia (`eos_token_id=50256) para rellenar cuando hace batching. 

3. Aviso sobre `max_new_tokens` y `max_length`

`Both max_new_tokens (=256) and max_length(=100) seem to have been set…`

Indica que en algún sitio (por defecto del pipeline o de la versión de Transformers que usamos) se ha fijado `max_new_tokens=256`, y nosotros además pasamos `max_length=100`. Cuando están ambos:​ Gana `max_new_tokens`, y `max_length` se ignora.

Para controlar claramente la longitud, deberíamos usar solo uno, lo más recomendable hoy es `max_new_tokens`:

```python
from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="gpt2",
    pad_token_id=50256,
)

texto = generator(
    "Había una vez",
    max_new_tokens=100,      # nº de tokens NUEVOS generados
    num_return_sequences=3,
    temperature=0.8,
    do_sample=True,
    top_k=50,
    top_p=0.95,
    repetition_penalty=1.2,
    truncation=True
)

for t in texto:
    print("----")
    print(t["generated_text"])
```
Con esto deberíamos dejar de ver esos avisos y tener un control claro sobre la longitud y el comportamiento de la generación.

### Técnicas de Prompting Efectivo

```python {linenums="1"} {linenums="1"}
# ❌ Prompt básico
"Escribe una historia"

# ✅ Prompt estructurado
"""
Escribe una historia corta de ciencia ficción que incluya:
- Protagonista: Una científica joven
- Escenario: Marte en el año 2150
- Conflicto: Descubre algo inesperado
- Tono: Misterioso pero esperanzador
- Longitud: 200 palabras aproximadamente
"""
```

## 💻 Implementación Guiada (10 min)

### Paso 1: Configuración y generación básica

```python {linenums="1"} {linenums="1"}
from transformers import pipeline
import random

# Crear generador
generator = pipeline("text-generation", model="gpt2")

# Prompts creativos de ejemplo
prompts_creativos = [
    "En un mundo donde los sueños se pueden comprar y vender",
    "La última persona en la Tierra recibe un mensaje de radio",
    "Un detective investiga crímenes que aún no han ocurrido",
    "En una biblioteca infinita, cada libro cuenta una vida diferente",
    "El día que los robots aprendieron a mentir"
]

def generar_historia(prompt, longitud=150, creatividad=0.8):
    """Genera una historia creativa basada en un prompt"""
    resultado = generator(
        prompt,
        max_length=longitud,
        num_return_sequences=1,
        temperature=creatividad,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        repetition_penalty=1.2,
        pad_token_id=generator.tokenizer.eos_token_id
    )
    
    return resultado[0]['generated_text']

# Generar historias de ejemplo
print("🎭 GENERADOR DE HISTORIAS CREATIVAS")
print("=" * 50)

for i, prompt in enumerate(prompts_creativos[:3], 1):
    historia = generar_historia(prompt)
    print(f"\n📖 Historia {i}:")
    print(f"💡 Prompt: {prompt}")
    print(f"📝 Historia generada:")
    print(historia)
    print("-" * 50)
```

### Paso 2: Generador de contenido para redes sociales

```python {linenums="1"} {linenums="1"}
def generar_post_social(tema, plataforma, tono="profesional"):
    """Genera posts optimizados para diferentes redes sociales"""
    
    # Plantillas por plataforma
    plantillas = {
        "X": f"Hilo sobre {tema}: 🧵\n1/",
        "linkedin": f"Reflexiones sobre {tema} en el mundo profesional:",
        "instagram": f"✨ {tema} ✨\n\n",
        "facebook": f"¿Sabías que {tema}?"
    }
    
    # Ajustar longitud por plataforma
    longitudes = {
        "X": 100,
        "linkedin": 200,
        "instagram": 150,
        "facebook": 180
    }
    
    # Modificadores de tono
    modificadores_tono = {
        "profesional": "Usa un lenguaje formal y datos concretos.",
        "casual": "Usa un lenguaje relajado y emojis.",
        "inspiracional": "Incluye frases motivadoras y llamadas a la acción.",
        "educativo": "Explica conceptos de forma clara y didáctica."
    }
    
    prompt_completo = f"""
    {plantillas[plataforma]}
    Tema: {tema}
    Tono: {tono}
    Instrucciones: {modificadores_tono[tono]}
    
    Contenido:
    """
    
    post = generator(
        prompt_completo,
        max_length=longitudes[plataforma],
        temperature=0.7,
        do_sample=True,
        top_k=40,
        top_p=0.9
    )[0]['generated_text']
    
    return post

# Generar posts para diferentes plataformas
tema = "inteligencia artificial"
plataformas = ["X", "linkedin", "instagram"]

print("📱 GENERADOR DE CONTENIDO PARA REDES SOCIALES")
print("=" * 60)

for plataforma in plataformas:
    post = generar_post_social(tema, plataforma, "inspiracional")
    print(f"\n📲 {plataforma.upper()}:")
    print(post)
    print("-" * 40)
```

### Paso 3: Asistente de Escritura Interactivo

```python {linenums="1"} {linenums="1"}
class AsistenteEscritura:
    def __init__(self, modelo="gpt2"):
        self.generator = pipeline("text-generation", model=modelo)
        self.historial = []
    
    def continuar_texto(self, texto_inicial, palabras=50):
        """Continúa un texto existente"""
        resultado = self.generator(
            texto_inicial,
            max_length=len(texto_inicial.split()) + palabras,
            temperature=0.7,
            do_sample=True,
            top_k=50
        )[0]['generated_text']
        
        # Extraer solo la parte nueva
        texto_nuevo = resultado[len(texto_inicial):].strip()
        return texto_nuevo
    
    def reescribir_con_estilo(self, texto, estilo):
        """Reescribe texto en un estilo específico"""
        estilos = {
            "formal": "Reescribe este texto de manera formal y académica:",
            "casual": "Reescribe este texto de manera informal y amigable:",
            "poetico": "Reescribe este texto como si fuera un poema:",
            "periodistico": "Reescribe este texto como una noticia:"
        }
        
        prompt = f"{estilos[estilo]} {texto}\n\nVersión reescrita:"
        
        resultado = self.generator(
            prompt,
            max_length=200,
            temperature=0.6,
            do_sample=True
        )[0]['generated_text']
        
        return resultado.split("Versión reescrita:")[-1].strip()
    
    def generar_variaciones(self, texto, num_variaciones=3):
        """Genera múltiples variaciones de un texto"""
        variaciones = []
        for i in range(num_variaciones):
            variacion = self.generator(
                texto,
                max_length=len(texto.split()) + 30,
                temperature=0.8 + (i * 0.1),  # Aumentar creatividad
                do_sample=True,
                num_return_sequences=1
            )[0]['generated_text']
            variaciones.append(variacion)
        
        return variaciones
    
    def sugerir_titulos(self, contenido, num_titulos=5):
        """Sugiere títulos para un contenido"""
        prompt = f"""
        Basándote en este contenido, sugiere {num_titulos} títulos atractivos:
        
        Contenido: {contenido[:200]}...
        
        Títulos sugeridos:
        1.
        """
        
        resultado = self.generator(
            prompt,
            max_length=150,
            temperature=0.9,
            do_sample=True
        )[0]['generated_text']
        
        return resultado

# Demostración del asistente
asistente = AsistenteEscritura()

print("🤖 ASISTENTE DE ESCRITURA CREATIVA")
print("=" * 50)

# Ejemplo 1: Continuar texto
texto_inicial = "La inteligencia artificial está transformando"
continuacion = asistente.continuar_texto(texto_inicial, 40)
print(f"📝 Texto inicial: {texto_inicial}")
print(f"🔄 Continuación: {continuacion}")

# Ejemplo 2: Reescribir con estilo
texto_base = "La IA es muy útil para automatizar tareas repetitivas"
version_poetica = asistente.reescribir_con_estilo(texto_base, "poetico")
print(f"\n🎭 Versión poética: {version_poetica}")

# Ejemplo 3: Generar variaciones
print(f"\n🔀 Variaciones del texto:")
variaciones = asistente.generar_variaciones("El futuro de la tecnología", 2)
for i, var in enumerate(variaciones, 1):
    print(f"{i}. {var}")
```

### Paso 4: Evaluador de Calidad del Texto

```python {linenums="1"} {linenums="1"}
def evaluar_calidad_texto(texto):
    """Evalúa la calidad de un texto generado"""
    
    # Métricas básicas
    palabras = len(texto.split())
    oraciones = len([s for s in texto.split('.') if s.strip()])
    palabras_por_oracion = palabras / max(oraciones, 1)
    
    # Diversidad léxica (palabras únicas / total palabras)
    palabras_unicas = len(set(texto.lower().split()))
    diversidad_lexica = palabras_unicas / max(palabras, 1)
    
    # Detección de repeticiones
    palabras_lista = texto.lower().split()
    repeticiones = len(palabras_lista) - len(set(palabras_lista))
    
    # Puntuación de calidad (0-100)
    puntuacion_longitud = min(100, (palabras / 50) * 100)  # Óptimo: 50 palabras
    puntuacion_diversidad = diversidad_lexica * 100
    puntuacion_repeticion = max(0, 100 - (repeticiones * 10))
    
    puntuacion_total = (puntuacion_longitud + puntuacion_diversidad + puntuacion_repeticion) / 3
    
    return {
        'puntuacion_total': round(puntuacion_total, 2),
        'palabras': palabras,
        'oraciones': oraciones,
        'palabras_por_oracion': round(palabras_por_oracion, 1),
        'diversidad_lexica': round(diversidad_lexica, 2),
        'repeticiones': repeticiones,
        'calidad': 'Excelente' if puntuacion_total > 80 else 
                  'Buena' if puntuacion_total > 60 else 
                  'Regular' if puntuacion_total > 40 else 'Necesita mejoras'
    }

# Evaluar textos generados
textos_prueba = [
    generar_historia("En un laboratorio secreto", 100, 0.7),
    generar_historia("El último día de clases", 100, 0.9)
]

print("\n📊 EVALUACIÓN DE CALIDAD")
print("=" * 40)

for i, texto in enumerate(textos_prueba, 1):
    evaluacion = evaluar_calidad_texto(texto)
    print(f"\n📝 Texto {i}:")
    print(f"Puntuación: {evaluacion['puntuacion_total']}/100 ({evaluacion['calidad']})")
    print(f"Palabras: {evaluacion['palabras']} | Oraciones: {evaluacion['oraciones']}")
    print(f"Diversidad léxica: {evaluacion['diversidad_lexica']}")
    print(f"Texto: {texto[:100]}...")
```

## 🎯 Experimentación Libre (5 min)

### Desafíos para Explorar

1. **Generación Condicional:**
   ```python {linenums="1"}
   # Genera texto basado en múltiples condiciones
   condiciones = {
       "genero": "ciencia ficción",
       "protagonista": "robot",
       "escenario": "espacio",
       "emocion": "nostalgia"
   }
   ```

2. **Chatbot Creativo:**
   ```python {linenums="1"}
   def chatbot_creativo(mensaje_usuario):
       prompt = f"Usuario: {mensaje_usuario}\nAsistente creativo:"
       # Implementar respuesta contextual
   ```

3. **Generador de Poesía:**
   ```python {linenums="1"}
   def generar_poema(tema, estilo="libre"):
       # Haiku, soneto, verso libre, etc.
       pass
   ```

### Experimentos Avanzados

```python {linenums="1"}
# 1. Control de creatividad dinámico
def generar_con_creatividad_adaptativa(prompt, contexto="profesional"):
    creatividad_map = {
        "profesional": 0.3,
        "creativo": 0.8,
        "experimental": 1.2
    }
    return generator(prompt, temperature=creatividad_map[contexto])

# 2. Generación colaborativa
def escritura_colaborativa(prompts_multiples):
    """Combina múltiples prompts para crear una narrativa cohesiva"""
    historia_completa = ""
    for prompt in prompts_multiples:
        continuacion = generar_historia(historia_completa + prompt, 50)
        historia_completa += continuacion
    return historia_completa

# 3. Análisis de estilo
def analizar_estilo_autor(texto_muestra):
    """Analiza el estilo de escritura para replicarlo"""
    # Implementar análisis de patrones lingüísticos
    pass
```

## 🏅 Criterios de Éxito

Al completar este reto, deberías poder:

- ✅ Generar texto creativo con diferentes niveles de creatividad
- ✅ Crear contenido específico para diferentes plataformas
- ✅ Implementar un asistente de escritura interactivo
- ✅ Evaluar la calidad del texto generado
- ✅ Controlar el estilo y tono de la generación

## 🚀 Extensiones Opcionales

### Para los más rápidos:

1. **Interfaz Web Completa:**
   ```python {linenums="1"}
   import gradio as gr

    # Se asume que ya tienes definida esta función
    # def generar_historia(prompt: str, creatividad: float) -> str:
    #     ...

    def generar_historia_interface(tipo_contenido, prompt, creatividad):
        if tipo_contenido != "Historia":
            return "Por ahora solo está implementado el modo 'Historia'."
        if not prompt:
            return "Escribe al menos el inicio de la historia."
        return generar_historia(prompt, creatividad=creatividad)

    with gr.Blocks(title="✍️ Asistente de Escritura IA") as demo:
        gr.Markdown("# ✍️ Asistente de Escritura IA")

        tipo_contenido = gr.Dropdown(
            ["Historia", "Post social", "Artículo", "Poema"],
            value="Historia",
            label="Tipo de contenido"
        )

        prompt = gr.Textbox(
            label="Comienza tu historia:",
            placeholder="Érase una vez...",
            lines=3
        )

        creatividad = gr.Slider(
            minimum=0.1,
            maximum=1.5,
            value=0.8,
            step=0.1,
            label="Nivel de creatividad"
        )

        boton = gr.Button("Generar")
        salida = gr.Textbox(label="Resultado", lines=10)

        boton.click(
            fn=generar_historia_interface,
            inputs=[tipo_contenido, prompt, creatividad],
            outputs=salida,
        )

    if __name__ == "__main__":
        demo.launch()
   ```

2. **Sistema de Plantillas:**
   ```python {linenums="1"}
   plantillas = {
       "email_marketing": "Asunto: {asunto}\n\nHola {nombre},\n\n{contenido_principal}",
       "post_blog": "# {titulo}\n\n## Introducción\n{intro}\n\n## Desarrollo\n{desarrollo}",
       "historia_corta": "Personaje: {personaje}\nEscenario: {escenario}\nConflicto: {conflicto}"
   }
   ```

3. **Análisis de Sentimientos del Texto Generado:**
   ```python {linenums="1"}
   def analizar_tono_generado(texto):
       sentiment_analyzer = pipeline("sentiment-analysis")
       resultado = sentiment_analyzer(texto)
       return resultado[0]['label'], resultado[0]['score']
   ```

### 🚀 Próximos Pasos Recomendados:
1. **Combina las tres técnicas** en un proyecto integrado
2. **Explora modelos más avanzados** como GPT-3.5 o Claude
3. **Implementa fine-tuning** para casos de uso específicos
4. **Crea APIs** para integrar en aplicaciones reales

---

## 📚 Recursos del Reto

- [Text Generation Guide](https://huggingface.co/docs/transformers/tasks/language_modeling)
- [GPT-2 Documentation](https://huggingface.co/gpt2)
- [Prompt Engineering Best Practices](https://huggingface.co/docs/transformers/tasks/prompting)
