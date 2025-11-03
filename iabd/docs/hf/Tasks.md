---
title: Conceptos básicos entornos Linux
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

## Objetivos

- Diferenciar qué es un "task" en Machine Learning según Hugging Face.
- Aprender los conceptos y ejemplos de estimación de profundidad, clasificación y segmentación de imágenes.
- Probar ejemplos prácticos con pipelines de Hugging Face.


## ¿Qué es un task?

Un "task" en Hugging Face describe el tipo de problema que un modelo puede resolver.
Permite buscar, probar y reutilizar modelos según la tarea (task) deseada.

## Estimación de profundidad

Predice la distancia de cada píxel respecto a la cámara usando solo una imagen.
Ejemplo de aplicación: robótica, conducción autónoma, realidad aumentada.

## Clasificación de imágenes

Asigna una etiqueta a una imagen completa (p. ej., perro o gato).
Usos frecuentes: reconocimiento de objetos, inventario visual, diagnóstico médico.

## Segmentación de imágenes

Etiqueta cada píxel de la imagen (por objeto o por clase).
Usado en medicina, conducción autónoma, análisis de paisaje y más.


```python
#Utiliza el pipeline:

from transformers import pipeline
depth = pipeline("depth-estimation", model="Intel/zoedepth-nyu-kitti")
result = depth("ruta_o_url_imagen")

```
