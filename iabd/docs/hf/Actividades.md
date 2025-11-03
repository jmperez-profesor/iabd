---
title: Actividades
description: Actividades del curso de especialización en IA y Big Data. Actividades sobre Tasks I de HF.
---

## Ejercicios

1. **Estimación de profundidad**
   - Utiliza el pipeline:
     ```
     from transformers import pipeline
     depth = pipeline("depth-estimation", model="Intel/zoedepth-nyu-kitti")
     result = depth("ruta_o_url_imagen")
     ```

2. **Clasificación de imágenes**
   - Usa el pipeline:
     ```
     from transformers import pipeline
     classifier = pipeline("image-classification")
     res = classifier("ruta_o_url_imagen")
     print(res)
     ```

3. **Avanzado (Optativo): Integrar clasificación y segmentación**
   - Ejecuta ambos pipelines y visualiza el resultado conjunto.