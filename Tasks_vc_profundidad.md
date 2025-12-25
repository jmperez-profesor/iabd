---
title: Tasks de Hugging face relacionadas con la Visión por computador
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# POR HACER

---------------------------------------------------

## 4. Estimación de Profundidad (Depth Estimation)
- **Definición**: Predice la distancia de cada píxel respecto a la cámara usando solo una imagen.
- **Aplicaciones**: Robótica, realidad aumentada, vehículos autónomos, etc.
- **Modelos populares**: DPT, MiDaS

```python {hl_lines="5 7" linenums="1"} 
# Utiliza el pipeline:

from transformers import pipeline

depth = pipeline("depth-estimation", model="Intel/zoedepth-nyu-kitti")

result = depth("ruta_o_url_imagen")

```

