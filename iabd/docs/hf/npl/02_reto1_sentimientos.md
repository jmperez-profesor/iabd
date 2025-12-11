---
title: Tasks NLP con los Transformers y pipelines de Hugging Face - Reto 1
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 🏆 Reto 1: Detector de Emociones en Redes Sociales

**⏱️ Tiempo:** 30 minutos  
**🎯 Nivel:** Principiante  
**🚀 Objetivo:** Crear un analizador de sentimientos para monitorizar la percepción de marca en Twitter

## 🎬 Contexto y Motivación (5 min)

### El Problema Real
Una startup de tecnología quiere monitorizar qué dice la gente sobre su nueva app en redes sociales. Necesitan:
- Detectar comentarios positivos y negativos automáticamente
- Identificar crisis de reputación temprano
- Medir el impacto de sus campañas de marketing

### ¿Por Qué es Importante?
- **85% de las empresas** usan análisis de sentimientos para tomar decisiones
- **Detección temprana** de problemas puede ahorrar millones
- **Automatización** permite analizar miles de comentarios por minuto

## 🧠 Teoría Just-in-Time (10 min)

### ¿Qué es el Análisis de Sentimientos?

El análisis de sentimientos clasifica texto según la **emoción** o **actitud** que expresa:

```
"¡Me encanta esta app!" → POSITIVO (0.95)
"Esta app es terrible" → NEGATIVO (0.89)
"La app funciona bien" → NEUTRAL (0.72)
```

### Modelos Disponibles en Hugging Face

| Modelo | Idioma | Especialidad | Uso Recomendado |
|--------|--------|--------------|-----------------|
| `cardiffnlp/twitter-roberta-base-sentiment-latest` | EN | Twitter | Redes sociales |
| `nlptown/bert-base-multilingual-uncased-sentiment` | Multi | General | Textos variados |
| `pysentimiento/robertuito-sentiment-analysis` | ES | Español | Textos en español |

### Parámetros Importantes

```python
classifier = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest",
    return_all_scores=True  # Ver todas las probabilidades
)
```

## 💻 Implementación Guiada (10 min)

### Paso 1: Configuración Básica

```python
from transformers import pipeline
import pandas as pd

# Crear el clasificador
classifier = pipeline("sentiment-analysis")

# Datos de ejemplo (simula tweets reales)
tweets = [
    "¡Esta nueva app es increíble! 🚀",
    "La app se cuelga constantemente 😡",
    "Funciona bien, pero podría mejorar",
    "¡Gracias por esta herramienta tan útil! ❤️",
    "No entiendo cómo usarla, muy confusa",
    "Perfecta para lo que necesitaba 👌"
]
```

### Paso 2: Análisis Básico

```python
# Analizar cada tweet
resultados = []
for tweet in tweets:
    resultado = classifier(tweet)
    resultados.append({
        'tweet': tweet,
        'sentimiento': resultado[0]['label'],
        'confianza': resultado[0]['score']
    })

# Mostrar resultados
for r in resultados:
    print(f"Tweet: {r['tweet']}")
    print(f"Sentimiento: {r['sentimiento']} (Confianza: {r['confianza']:.2f})")
    print("-" * 50)
```

### Paso 3: Análisis Avanzado con Múltiples Modelos

```python
# Comparar diferentes modelos
modelos = [
    "cardiffnlp/twitter-roberta-base-sentiment-latest",
    "nlptown/bert-base-multilingual-uncased-sentiment"
]

def comparar_modelos(texto, modelos):
    resultados = {}
    for modelo in modelos:
        classifier = pipeline("sentiment-analysis", model=modelo)
        resultado = classifier(texto)
        resultados[modelo.split('/')[-1]] = {
            'label': resultado[0]['label'],
            'score': resultado[0]['score']
        }
    return resultados

# Probar con un tweet específico
tweet_test = "Esta app es genial pero tiene algunos bugs"
comparacion = comparar_modelos(tweet_test, modelos)

print(f"Tweet: {tweet_test}")
for modelo, resultado in comparacion.items():
    print(f"{modelo}: {resultado['label']} ({resultado['score']:.2f})")
```

### Paso 4: Dashboard Simple

```python
import matplotlib.pyplot as plt

def crear_dashboard(resultados):
    # Contar sentimientos
    sentimientos = [r['sentimiento'] for r in resultados]
    conteo = pd.Series(sentimientos).value_counts()
    
    # Crear gráfico
    plt.figure(figsize=(10, 6))
    
    # Gráfico de barras
    plt.subplot(1, 2, 1)
    conteo.plot(kind='bar', color=['green', 'red', 'gray'])
    plt.title('Distribución de Sentimientos')
    plt.ylabel('Número de Tweets')
    
    # Gráfico de confianza
    plt.subplot(1, 2, 2)
    confianzas = [r['confianza'] for r in resultados]
    plt.hist(confianzas, bins=10, alpha=0.7, color='blue')
    plt.title('Distribución de Confianza')
    plt.xlabel('Nivel de Confianza')
    plt.ylabel('Frecuencia')
    
    plt.tight_layout()
    plt.show()

# Crear dashboard
crear_dashboard(resultados)
```

## 🎯 Experimentación Libre (5 min)

### Desafíos para Explorar

1. **Prueba con Emojis:**
   ```python
   tweets_emojis = ["😍", "😡", "🤔", "👍", "💔"]
   # ¿Cómo los interpreta el modelo?
   ```

2. **Textos Ambiguos:**
   ```python
   tweets_ambiguos = [
       "Esta app es... interesante",
       "Bueno, funciona",
       "No está mal, supongo"
   ]
   ```

3. **Diferentes Idiomas:**
   ```python
   tweets_multiidioma = [
       "I love this app!",
       "J'adore cette application!",
       "¡Me encanta esta aplicación!"
   ]
   ```

### Preguntas para Reflexionar
- ¿Qué modelo funciona mejor para tu caso de uso?
- ¿Cómo manejas la incertidumbre (scores bajos)?
- ¿Qué harías con sentimientos neutrales?

## 🏅 Criterios de Éxito

Al completar este reto, deberías poder:
- ✅ Implementar análisis de sentimientos básico
- ✅ Comparar diferentes modelos
- ✅ Interpretar scores de confianza
- ✅ Crear visualizaciones simples
- ✅ Identificar limitaciones del modelo

## 🚀 Extensiones Opcionales

### Para los Más Rápidos:
1. **Análisis en Tiempo Real:** Conectar con la API de Twitter
2. **Alertas Automáticas:** Notificar cuando el sentimiento baja del 70%
3. **Análisis Temporal:** Seguir la evolución del sentimiento por horas/días

### Código de Extensión:
```python
def monitor_sentimiento(tweets, umbral=0.7):
    """Monitoriza sentimientos y genera alertas"""
    negativos = []
    for tweet in tweets:
        resultado = classifier(tweet)
        if resultado[0]['label'] == 'NEGATIVE' and resultado[0]['score'] > umbral:
            negativos.append({
                'tweet': tweet,
                'score': resultado[0]['score']
            })
    
    if negativos:
        print(f"🚨 ALERTA: {len(negativos)} tweets muy negativos detectados!")
        for neg in negativos:
            print(f"- {neg['tweet']} (Score: {neg['score']:.2f})")
```

## 🎯 Próximo Reto

¡Excelente trabajo! Has creado tu primer sistema de análisis de sentimientos. 

En el siguiente reto, subiremos el nivel: **clasificaremos noticias automáticamente** para crear un sistema de organización inteligente.

[👉 Ir al Reto 2: Clasificador de Noticias](03_reto2_clasificacion.md)

---

## 📚 Recursos del Reto

- [Modelos de Sentimientos en Hugging Face](https://huggingface.co/models?pipeline_tag=text-classification&sort=downloads)
- [Documentación de Text Classification](https://huggingface.co/docs/transformers/tasks/sequence_classification)
