---
title: Conceptos básicos entornos Linux
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

## Objetivos

- Diferenciar qué es un "task" en Machine Learning según Hugging Face.
- Aprender los conceptos y ejemplos de estimación de profundidad, clasificación y segmentación de imágenes.
- Probar ejemplos prácticos con pipelines de Hugging Face.

Hugging Face es el portal para todas las tareas de aprendizaje automático. Aquí encontraremos todo lo necesario para empezar con una tarea: demostraciones, casos de uso, modelos, conjuntos de datos y mucho más.

# ¿Qué es un task?

Un "task" en Hugging Face describe el tipo de problema que un modelo puede resolver.
Permite buscar, probar y reutilizar modelos según la tarea (task) deseada.

![Tasks (tareas) en Hugging Face](./img/01hf-tasks.png)
*Tasks (tareas) en Hugging Face*

# Uso de Hugging Face para tareas de visión por computadora

Hugging Face también proporciona una amplia colección de modelos preentrenados para tareas de visión artificial. Con todos estos modelos alojados previamente entrenados, podemos crear aplicaciones interesantes que detectan objetos en imágenes, la edad de una persona y más. En este tema, aprenderemos a realizar las primeras cuatro tareas utilizando modelos de Hugging Face. 


### 1. Estimación de Profundidad (Depth Estimation)
- **Definición**: Predice la distancia de cada píxel respecto a la cámara usando solo una imagen.
- **Aplicaciones**: Robótica, realidad aumentada, vehículos autónomos, etc.
- **Modelos populares**: DPT, MiDaS

## Clasificación de imágenes


### 2. Clasificación de Imágenes (Image Classification)
- **Definición**: Asigna una etiqueta a una imagen completa (p. ej., perro o gato).
- **Aplicaciones**: Reconocimiento médico, control de calidad, organización de fotos, inventario visual, etc.
- **Modelos populares**: ResNet, Vision Transformer (ViT), EfficientNet

## Segmentación de imágenes

Etiqueta cada píxel de la imagen (por objeto o por clase).
Usado en medicina, conducción autónoma, análisis de paisaje y más.


```python {hl_lines="5 7" linenums="1"} 
# Utiliza el pipeline:

from transformers import pipeline

depth = pipeline("depth-estimation", model="Intel/zoedepth-nyu-kitti")

result = depth("ruta_o_url_imagen")

```
### 3. Segmentación de Imágenes (Image Segmentation)
- **Definición**: Clasifica cada píxel de la imagen
- **Tipos**: Semántica (por clase) vs Instancia (por objeto individual)
- **Aplicaciones**: Medicina, conducción autónoma, edición de imágenes
- **Modelos populares**: SegFormer, Mask2Former




