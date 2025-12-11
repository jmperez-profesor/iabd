---
title: Tasks NLP con los Transformers y pipelines de Hugging Face
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

## Objetivos de la sesión
- Comprender la arquitectura Transformer
- Aprender a usar la librería Hugging Face Transformers
- Realizar tareas NLP con pipelines

# ¿Qué es un task?

Un "task" en Hugging Face describe el tipo de problema que un modelo puede resolver.
Permite buscar, probar y reutilizar modelos según la tarea (task) deseada.

![Tasks (tareas) en Hugging Face](./img/01hf-tasks.png)
*Tasks (tareas) en Hugging Face*

# Uso de Hugging Face para tareas de visión por computadora

Hugging Face también proporciona una amplia colección de modelos preentrenados para tareas de visión artificial. Con todos estos modelos alojados previamente entrenados, podemos crear aplicaciones interesantes que detectan objetos en imágenes, la edad de una persona y más. En este tema, aprenderemos a realizar las primeras cuatro tareas utilizando modelos de Hugging Face. 

# 🔥 Introducción: El Poder de los Transformers

## 🎬 Demo en Vivo: "5 Líneas de Código, Infinitas Posibilidades"

### ¡Empezamos con magia! ✨

```python
from transformers import pipeline

# ¡Una línea para crear un analizador de sentimientos!
classifier = pipeline("sentiment-analysis")
result = classifier("¡Este taller va a ser increíble!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]
```

**¿Qué acabamos de hacer?** En 3 líneas hemos creado un sistema de IA que entiende emociones humanas. ¡Sin entrenar nada, sin configurar modelos complejos!

## 🧠 Conceptos Clave (Just-in-Time Learning)

### ¿Qué son los Pipelines de Hugging Face?

Los **pipelines** son como "herramientas mágicas" que encapsulan modelos complejos en interfaces súper simples:

```python
# Formato general
pipeline("tarea", model="modelo_específico")
```

### 🎯 Tareas NLP Principales

| Tarea | Pipeline | Ejemplo de Uso |
|-------|----------|----------------|
| **Análisis de Sentimientos** | `sentiment-analysis` | Redes sociales, reviews |
| **Clasificación de Texto** | `text-classification` | Categorizar noticias, emails |
| **Generación de Texto** | `text-generation` | Chatbots, escritura creativa |
| **Traducción** | `translation` | Apps multiidioma |
| **Resumen** | `summarization` | Resúmenes automáticos |

### 🏗️ Arquitectura Simplificada

```
Texto de Entrada → Tokenización → Modelo Transformer → Post-procesado → Resultado
```

## 🚀 Demo Interactiva: "Probemos Juntos"

### Experimento 1: Sentimientos Multiidioma
```python
classifier = pipeline("sentiment-analysis")

textos = [
    "I love this workshop!",
    "Este taller es aburrido",
    "Je suis très content",
    "😍🎉✨"
]

for texto in textos:
    resultado = classifier(texto)
    print(f"{texto} → {resultado[0]['label']} ({resultado[0]['score']:.2f})")
```

### Experimento 2: Generación Instantánea
```python
generator = pipeline("text-generation", model="gpt2")
prompt = "En el futuro, la inteligencia artificial"
resultado = generator(prompt, max_length=50, num_return_sequences=2)

for i, texto in enumerate(resultado):
    print(f"Versión {i+1}: {texto['generated_text']}")
```

## 🎯 ¿Por Qué Funciona Tan Bien?

### El Secreto: Modelos Pre-entrenados
- **Millones de parámetros** entrenados en enormes datasets
- **Transfer Learning**: Conocimiento general aplicado a tareas específicas
- **Fine-tuning**: Adaptación a dominios específicos

### Ventajas de Hugging Face
- ✅ **Simplicidad**: Una línea de código para tareas complejas
- ✅ **Variedad**: Miles de modelos disponibles
- ✅ **Comunidad**: Modelos compartidos y mejorados constantemente
- ✅ **Flexibilidad**: Desde uso básico hasta personalización avanzada

## 🎮 Preparación para los Retos

### Instalación Rápida
```bash
pip install transformers torch datasets evaluate
```

### Estructura Mental para los Retos
1. **Identifica el problema** → ¿Qué tarea NLP necesito?
2. **Elige el pipeline** → ¿Cuál es el más adecuado?
3. **Experimenta** → Prueba con diferentes textos
4. **Optimiza** → Ajusta parámetros y modelos
5. **Evalúa** → ¿Funciona bien para mi caso de uso?

## 🏆 ¡Listos para el Primer Reto!

Ahora que hemos visto la magia en acción, es hora de crear nuestro primer proyecto real: **un detector de emociones para redes sociales**.

**¿El objetivo?** Ayudar a una empresa a monitorizar la percepción de su marca en Twitter.

[👉 Ir al Reto 1: Detector de Emociones](02_reto1_sentimientos.md)

---

## 📚 Recursos Adicionales

- [Documentación oficial de Transformers](https://huggingface.co/docs/transformers)
- [Hugging Face Model Hub](https://huggingface.co/models)
- [Curso completo de NLP](https://huggingface.co/learn/nlp-course)
