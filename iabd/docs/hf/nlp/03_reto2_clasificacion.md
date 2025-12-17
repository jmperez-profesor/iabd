---
title: Tasks NLP con los Transformers y pipelines de Hugging Face - Reto 2
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 🏆 Reto 2: Clasificador Inteligente de Noticias

**⏱️ Tiempo:** 30 minutos  
**🎯 Nivel:** Intermedio  
**🚀 Objetivo:** Construir un sistema de categorización automática de noticias

## 🎬 Contexto y Motivación (5 min)

### El problema real
Un periódico digital recibe **500+ artículos diarios** de diferentes fuentes. Su equipo editorial necesita:

- Clasificar automáticamente las noticias por categorías
- Priorizar noticias importantes para la portada
- Detectar noticias duplicadas o similares
- Organizar el contenido para diferentes secciones

### ¿Por qué es crucial?
- **Ahorro de tiempo:** De 4 horas manuales a 10 minutos automáticos
- **Consistencia:** Clasificación uniforme sin sesgos humanos
- **Escalabilidad:** Manejar volúmenes masivos de información
- **Personalización:** Contenido relevante para cada usuario

## 🧠 Teoría Just-in-Time (10 min)

### Clasificación de Texto vs Análisis de Sentimientos

| Aspecto | Análisis de Sentimientos | Clasificación de Texto |
|---------|-------------------------|------------------------|
| **Objetivo** | Detectar emociones | Categorizar por tema |
| **Clases** | Positivo/Negativo/Neutral | Deportes/Política/Tecnología/etc |
| **Complejidad** | 2-3 categorías | 10+ categorías |
| **Aplicaciones** | Redes sociales, reviews | Noticias, emails, documentos |

### Modelos Especializados

```python {linenums="1"}
# Modelos populares para clasificación
modelos_clasificacion = {
    "noticias_español": "bertin-project/bertin-roberta-base-spanish",
    "noticias_general": "facebook/bart-large-mnli",
    "multiidioma": "microsoft/DialoGPT-medium",
    "zero_shot": "facebook/bart-large-mnli",  # ¡Sin entrenamiento previo!
    "zero_shot" : "MoritzLaurer/mDeBERTa-v3-base-mnli-xnli" # Admite el idioma español 
}
```

### Zero-Shot Classification: Un poco de "magia"

```python {linenums="1" hl_lines="3"}
from transformers import pipeline
# ¡Clasificar SIN entrenar el modelo!
classifier = pipeline("zero-shot-classification")
texto = "El Real Madrid ganó 3-1 al Barcelona en el Clásico"
categorias = ["deportes", "política", "tecnología", "economía"]

resultado = classifier(texto, categorias)
print(resultado)
# Resultado esperado: "deportes" debería de tener alta confianza
# Resultado obtenido: "política" con alta confianza
```
```bash
No model was supplied, defaulted to facebook/bart-large-mnli and revision d7645e1 (https://huggingface.co/facebook/bart-large-mnli).
Using a pipeline without specifying a model name and revision in production is not recommended.
Device set to use cpu
```
```json
{
    'sequence': 'El Real Madrid ganó 3-1 al Barcelona en el Clásico', 
    'labels': ['política', 'economía', 'deportes', 'tecnología'], 
    'scores': [0.5234475135803223, 0.18149752914905548, 0.15290531516075134, 0.14214962720870972]
    }
```
**¿Funciona?** 

No funciona por cómo funciona realmente la **clasificación zero-shot** con modelos **NLI** como `facebook/bart-large-mnli`: el modelo no “entiende” las etiquetas como humanos, sino que compara texto y etiqueta a través de frases en inglés, y ahí se le cuela el sesgo.​

1. Cómo decide el modelo en zero‑shot

El `pipeline("zero-shot-classification")` con **BART‑MNLI** hace, de forma simplificada, algo así para cada etiqueta:​
- Construye una hipótesis tipo:

    - “This text is about política.”
    - “This text is about deportes.”
    
- Pasa `(premisa = tu texto, hipótesis) al modelo NLI (entailment / contradiction / neutral).
- Convierte esos *scores* en probabilidades y se queda con la etiqueta cuya hipótesis tiene mayor probabilidad de *“entailment”* (que el texto implique esa etiqueta).

No usa un diccionario semántico ni sabe que “Real Madrid” y “Barcelona” son clubes de fútbol; solo ve que ciertas palabras coocurren más a menudo con “política” que con “deportes” en sus datos de entrenamiento, o que la frase **“is about política”** le parece más probable en general.​

2. Problemas concretos de nuestro caso

Algunos factores que hacen que gane “política”:

- El modelo es **inglés‑céntrico**: está entrenado principalmente con datos y plantillas en inglés; al ver etiquetas en español, su comportamiento es menos fiable.​
- Las etiquetas son palabras muy generales: “política”, “economía”, “deportes”, “tecnología”. La diferencia semántica en el **embedding** de la hipótesis puede no ser tan clara, y el modelo puede haber visto muchas veces “This text is about politics” en sus datos de preentrenamiento, lo que le da una especie de “prioridad” a favor de política.​
- El texto está en español: entiende algo (por contexto multilingüe parcial), pero la alineación entre texto español y etiquetas españolas no es perfecta.

El resultado que vemos:
```python
'labels': ['política', 'economía', 'deportes', 'tecnología'],
'scores': [0.52, 0.18, 0.15, 0.14]
```
indica exactamente eso: para el modelo, “es sobre política” es ligeramente más plausible que “es sobre deportes”, aunque para nosotros sea evidente lo contrario.

En resumen, gana “política” porque el modelo compara nuestro texto con hipótesis generadas a partir de las etiquetas, en un espacio **NLI** centrado en inglés, y en ese espacio la hipótesis “es política” le resulta ligeramente más plausible que “es deportes”. No es un “error lógico” del programa, sino una limitación del modelo y de cómo se formulan las etiquetas en zero‑shot.

Vamos a modificar el ejemplo seleccionando un modelo que admite Zero-shot y el idioma español. El modelo es [`MoritzLaurer/mDeBERTa-v3-base-mnli-xnli`](
https://huggingface.co/MoritzLaurer/mDeBERTa-v3-base-mnli-xnli)

```python {linenums="1" hl_lines="3"}
from transformers import pipeline
# ¡Clasificar SIN entrenar el modelo!
classifier = pipeline(
    "zero-shot-classification",
    model="MoritzLaurer/mDeBERTa-v3-base-mnli-xnli")
    
texto = "El Real Madrid ganó 3-1 al Barcelona en el Clásico"
categorias = ["deportes", "política", "tecnología", "economía"]

resultado = classifier(texto, categorias)
print(resultado)
# Resultado esperado: "deportes" debería de tener alta confianza
# Resultado obtenido: "política" con alta confianza
```
```bash
No model was supplied, defaulted to facebook/bart-large-mnli and revision d7645e1 (https://huggingface.co/facebook/bart-large-mnli).
Using a pipeline without specifying a model name and revision in production is not recommended.
Device set to use cpu
```
```json
{
    'sequence': 'El Real Madrid ganó 3-1 al Barcelona en el Clásico', 
    'labels': ['política', 'economía', 'deportes', 'tecnología'], 
    'scores': [0.5234475135803223, 0.18149752914905548, 0.15290531516075134, 0.14214962720870972]
    }
```

## 💻 Implementación guiada (10 min)

### Paso 1: Configuración y Datos

```python {linenums="1"}
from transformers import pipeline
import pandas as pd
import numpy as np

# Datos de ejemplo (noticias reales simuladas)
noticias = [
    {
        "titulo": "El Real Madrid ficha a Mbappé por 180 millones",
        "contenido": "El delantero francés firma por cinco temporadas con el club blanco..."
    },
    {
        "titulo": "Nueva ley de inteligencia artificial aprobada en Europa",
        "contenido": "El Parlamento Europeo aprueba regulaciones para el uso de IA..."
    },
    {
        "titulo": "Bitcoin alcanza nuevo máximo histórico",
        "contenido": "La criptomoneda supera los 70.000 dólares por primera vez..."
    },
    {
        "titulo": "Descubren nueva especie de dinosaurio en Argentina",
        "contenido": "Paleontólogos argentinos encuentran restos de un titanosaurio..."
    },
    {
        "titulo": "Apple presenta el iPhone 16 con IA integrada",
        "contenido": "La nueva generación incluye procesador neuronal avanzado..."
    }
]

# Categorías objetivo
categorias = ["deportes", "política", "economía", "ciencia", "tecnología"]
```

### Paso 2: Clasificación Zero-Shot

```python {linenums="1"}
# Crear clasificador zero-shot
classifier = pipeline("zero-shot-classification", 
                     model="facebook/bart-large-mnli")

def clasificar_noticia(noticia, categorias):
    """Clasifica una noticia usando zero-shot learning"""
    texto_completo = f"{noticia['titulo']} {noticia['contenido']}"
    resultado = classifier(texto_completo, categorias)
    
    return {
        'titulo': noticia['titulo'],
        'categoria_predicha': resultado['labels'][0],
        'confianza': resultado['scores'][0],
        'todas_las_scores': dict(zip(resultado['labels'], resultado['scores']))
    }

# Clasificar todas las noticias
resultados = []
for noticia in noticias:
    resultado = clasificar_noticia(noticia, categorias)
    resultados.append(resultado)
    
    print(f"📰 {resultado['titulo'][:50]}...")
    print(f"🏷️  Categoría: {resultado['categoria_predicha']} ({resultado['confianza']:.2f})")
    print("-" * 60)
```

### Paso 3: Análisis Avanzado con Múltiples Categorías

```python {linenums="1"}
def clasificacion_multinivel(noticia, categorias_principales, subcategorias):
    """Clasificación jerárquica: primero categoría principal, luego subcategoría"""
    
    # Paso 1: Categoría principal
    texto = f"{noticia['titulo']} {noticia['contenido']}"
    resultado_principal = classifier(texto, categorias_principales)
    categoria_principal = resultado_principal['labels'][0]
    
    # Paso 2: Subcategoría (si existe)
    if categoria_principal in subcategorias:
        resultado_sub = classifier(texto, subcategorias[categoria_principal])
        subcategoria = resultado_sub['labels'][0]
    else:
        subcategoria = "general"
    
    return {
        'categoria_principal': categoria_principal,
        'subcategoria': subcategoria,
        'confianza_principal': resultado_principal['scores'][0],
        'ruta_completa': f"{categoria_principal}/{subcategoria}"
    }

# Definir jerarquía de categorías
categorias_principales = ["deportes", "tecnología", "ciencia", "economía", "política"]
subcategorias = {
    "deportes": ["fútbol", "baloncesto", "tenis", "otros deportes"],
    "tecnología": ["inteligencia artificial", "móviles", "software", "hardware"],
    "ciencia": ["medicina", "física", "biología", "paleontología"],
    "economía": ["criptomonedas", "bolsa", "empresas", "comercio"]
}

# Probar clasificación multinivel
for noticia in noticias[:3]:  # Solo las primeras 3 para el ejemplo
    resultado = clasificacion_multinivel(noticia, categorias_principales, subcategorias)
    print(f"📰 {noticia['titulo']}")
    print(f"🗂️  Ruta: {resultado['ruta_completa']}")
    print(f"📊 Confianza: {resultado['confianza_principal']:.2f}")
    print("-" * 50)
```

### Paso 4: Sistema de Recomendación Simple

```python {linenums="1"}
def recomendar_noticias_similares(noticia_objetivo, todas_las_noticias, top_k=3):
    """Encuentra noticias similares basándose en la clasificación"""
    
    # Clasificar la noticia objetivo
    resultado_objetivo = clasificar_noticia(noticia_objetivo, categorias)
    categoria_objetivo = resultado_objetivo['categoria_predicha']
    
    # Clasificar todas las noticias
    noticias_clasificadas = []
    for noticia in todas_las_noticias:
        if noticia != noticia_objetivo:  # Excluir la noticia objetivo
            resultado = clasificar_noticia(noticia, categorias)
            noticias_clasificadas.append(resultado)
    
    # Filtrar por misma categoría y ordenar por confianza
    similares = [n for n in noticias_clasificadas 
                if n['categoria_predicha'] == categoria_objetivo]
    similares.sort(key=lambda x: x['confianza'], reverse=True)
    
    return similares[:top_k]

# Probar recomendaciones
noticia_test = noticias[0]  # Noticia de fútbol
recomendaciones = recomendar_noticias_similares(noticia_test, noticias)

print(f"🎯 Noticia objetivo: {noticia_test['titulo']}")
print("\n📋 Noticias similares recomendadas:")
for i, rec in enumerate(recomendaciones, 1):
    print(f"{i}. {rec['titulo']}")
    print(f"   Categoría: {rec['categoria_predicha']} ({rec['confianza']:.2f})")
```

## 🎯 Experimentación Libre (5 min)

### Desafíos para Explorar

1. **Categorías Personalizadas:**
   ```python
   # Prueba con tus propias categorías
   mis_categorias = ["urgente", "no urgente", "entretenimiento", "educativo"]
   ```

2. **Detección de Fake News:**
   ```python
   categorias_veracidad = ["noticia real", "posible fake news", "sátira"]
   ```

3. **Análisis de Sentimiento + Clasificación:**
   ```python
   def analisis_completo(noticia):
       # Combinar clasificación temática + análisis de sentimientos
       pass
   ```

### Experimentos Avanzados

```python {linenums="1"}
# 1. Clasificación con confianza mínima
def clasificar_con_umbral(noticia, categorias, umbral_confianza=0.7):
    resultado = clasificar_noticia(noticia, categorias)
    if resultado['confianza'] < umbral_confianza:
        return "clasificación_incierta"
    return resultado['categoria_predicha']

# 2. Detección de noticias atípicas
def detectar_noticias_atipicas(noticias, categorias):
    confianzas = []
    for noticia in noticias:
        resultado = clasificar_noticia(noticia, categorias)
        confianzas.append(resultado['confianza'])
    
    umbral_atipico = np.percentile(confianzas, 25)  # 25% más bajas
    return [n for n, c in zip(noticias, confianzas) if c < umbral_atipico]
```

## 🏅 Criterios de Éxito

Al completar este reto, deberías poder:

- ✅ Implementar clasificación zero-shot
- ✅ Crear sistemas de clasificación jerárquica
- ✅ Construir recomendadores simples basados en categorías
- ✅ Manejar múltiples categorías y subcategorías
- ✅ Evaluar la confianza de las predicciones

## 🚀 Extensiones Opcionales

### Para los más rápidos:

1. **Dashboard Interactivo:**
   ```python {linenums="1"}
   import gradio as gr

    # Se asume que ya tienes definida esta función y la lista `categorias`
    # def clasificar_noticia(noticia: dict, categorias: list) -> dict:
    #     # devuelve, por ejemplo: {"categoria_predicha": "Política", "confianza": 0.87}
    #     ...
    # categorias = ["Política", "Economía", "Deportes", "Tecnología", "Cultura"]

    def clasificar_noticia_interface(texto_noticia):
        if not texto_noticia.strip():
            return "Por favor, pega una noticia para clasificar.", ""
        resultado = clasificar_noticia({"titulo": "", "contenido": texto_noticia}, categorias)
        categoria = f"Categoría: {resultado['categoria_predicha']}"
        confianza = f"Confianza: {resultado['confianza']:.2f}"
        return categoria, confianza

    with gr.Blocks(title="📰 Clasificador de Noticias IA") as demo:
        gr.Markdown("# 📰 Clasificador de Noticias IA")

        texto_noticia = gr.Textbox(
            label="Pega aquí tu noticia:",
            lines=10,
            placeholder="Copia y pega el texto completo de la noticia..."
        )

        boton = gr.Button("Clasificar")

        salida_categoria = gr.Markdown()
        salida_confianza = gr.Markdown()

        boton.click(
            fn=clasificar_noticia_interface,
            inputs=texto_noticia,
            outputs=[salida_categoria, salida_confianza],
        )

    if __name__ == "__main__":
        demo.launch()
   ```

2. **API REST Simple:**
   ```python {linenums="1"}
   from flask import Flask, request, jsonify
   
   app = Flask(__name__)
   
   @app.route('/clasificar', methods=['POST'])
   def clasificar_api():
       data = request.json
       resultado = clasificar_noticia(data, categorias)
       return jsonify(resultado)
   ```

3. **Análisis de Tendencias:**
   ```python {linenums="1"}
   def analizar_tendencias_diarias(noticias_por_dia):
       """Analiza qué categorías son trending cada día"""
       tendencias = {}
       for dia, noticias in noticias_por_dia.items():
           categorias_dia = [clasificar_noticia(n, categorias)['categoria_predicha'] for n in noticias]
           tendencias[dia] = pd.Series(categorias_dia).value_counts()
       return tendencias
   ```

## 🎯 Próximo Reto

Has construido un sistema completo de clasificación de noticias. 

Para el reto final, vamos a explorar la frontera más emocionante del NLP: **la generación de texto creativo**. Crearemos un asistente de escritura que ayude a generar contenido original.

[👉 Ir al Reto 3: Asistente de Escritura Creativa](04_reto3_generacion.md)

---

## 📚 Recursos del Reto

- [Zero-Shot Classification Guide](https://huggingface.co/docs/transformers/tasks/zero_shot_classification)
- [Modelos de Clasificación](https://huggingface.co/models?pipeline_tag=zero-shot-classification)
- [BART Model Documentation](https://huggingface.co/facebook/bart-large-mnli)
