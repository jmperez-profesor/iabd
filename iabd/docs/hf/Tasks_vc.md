---
title: Tasks de Hugging face relacionadas con la Visión por computador
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

# Uso de Hugging Face para tareas de Visión por Computadora

Hugging Face también proporciona una amplia colección de modelos preentrenados para tareas de visión artificial. Con todos estos modelos alojados previamente entrenados, podemos crear aplicaciones interesantes que detectan objetos en imágenes, la edad de una persona y más. En este tema, aprenderemos a realizar las primeras cuatro tareas utilizando modelos de Hugging Face. 

## 1. Clasificación de Imágenes (Image Classification)

La clasificación de imágenes es una tarea de visión artificial que implica categorizar o etiquetar una imagen en una o varias clases o categorías predefinidas. El objetivo de la clasificación de imágenes es reconocer y asignar la etiqueta más adecuada a una imagen determinada en función de su contenido. 

![Tasks (tareas) en Hugging Face](./img/image-classification-input_hf.png)

### Ejemplos de aplicaciones

- Diagnóstico médico (clasificar radiografías)
- Reconocimiento de objetos
- Clasificación de productos en e-commerce
- Moderación de contenido visual

### Modelos disponibles en Hugging Face

Hugging Face ofrece múltiples modelos preentrenados para clasificación de imágenes. Algunos destacados:

| Modelo | Arquitectura | Dataset de entrenamiento | Enlace |
|--------|--------------|---------------------------|--------|
| `google/vit-base-patch16-224` | Vision Transformer (ViT) | ImageNet | [🔗 Ver modelo](https://huggingface.co/google/vit-base-patch16-224) |
| `microsoft/resnet-50` | ResNet-50 | ImageNet | [🔗 Ver modelo](https://huggingface.co/microsoft/resnet-50) |
| `facebook/deit-base-patch16-224` | DeiT | ImageNet | [🔗 Ver modelo](https://huggingface.co/facebook/deit-base-patch16-224) |

### "Quick, Draw!" de Google

![](./img/quickdraw1.png)

Este juego fue creado con aprendizaje automático, donde cuando dibujas algo, una red neuronal intenta adivinar qué estás dibujando. Evidentemente, no siempre funciona; pero cuanto más tiempo pasemos jugando, más aprenderá. Destacar que ya reconoce cientos de conceptos y esperan poder añadir más en el futuro. El gran objetivo de esta aplicación, es mostrar un ejemplo de cómo se puede usar el aprendizaje automático de forma divertida. 

**Características clave**

- **Juego con IA**: El juego es un experimento de aprendizaje automático. El jugador dibuja y la red neuronal intenta adivinar el dibujo en tiempo real.

- **Aprendizaje continuo**: La IA aprende de cada dibujo, mejorando su capacidad para adivinar correctamente en el futuro. Esto ayuda a Google a recopilar uno de los conjuntos de datos de garabatos más grandes del mundo para la investigación en aprendizaje automático.

- **Mecánica simple**: El juego es similar al Pictionary. Consiste en seis rondas, y en cada una se nos pide dibujar un objeto diferente en 20 segundos. Al final, podemos ver nuestros dibujos y los resultados.

Podemos acceder al juego en el sitio web oficial: [Web oficial](https://quickdraw.withgoogle.com/). 

**Importancia de los datos - BigData**

Los datos recopilados en el juego "Quick, Draw!" son fundamentales en el ámbito del Big Data y el aprendizaje automático porque conforman el conjunto de datos de garabatos más grande del mundo, esencial para entrenar y mejorar los modelos de inteligencia artificial de Google. 
Su importancia radica en varios puntos clave:

- **Entrenamiento de IA**: Los millones de dibujos (actualmente más de 50 millones en 345 categorías) sirven como un vasto corpus de datos para entrenar redes neuronales, enseñándoles a reconocer e interpretar garabatos de formas muy diversas. La IA aprende a identificar patrones visuales, sin importar el estilo individual del dibujante.

- **Diversidad y variabilidad**: A diferencia de conjuntos de datos de imágenes tradicionales, los garabatos muestran una enorme variabilidad en cómo las personas de diferentes culturas y con distintas habilidades dibujan un mismo objeto. Esta diversidad es crucial para crear modelos de IA más robustos y menos sesgados que puedan funcionar globalmente.

- **Datos en tiempo real y secuenciales**: Los dibujos se capturan como series temporales de posiciones del lápiz (vectores con marca de tiempo), no solo como imágenes estáticas. Esto permite a los investigadores comprender no solo el resultado final, sino también el proceso de dibujo (qué trazo se hizo primero, en qué dirección), lo cual es valioso para desarrollar modelos de IA más avanzados, como el modelo Sketch-RNN.

- **Investigación abierta**: Google ha hecho público este conjunto de datos para que investigadores de todo el mundo puedan utilizarlo en sus propios proyectos y estudios de aprendizaje automático, fomentando la innovación en el campo.

- **Ejemplo de gamificación para la recolección de datos**: El juego es un excelente ejemplo de cómo la gamificación puede motivar a un gran número de usuarios a generar datos valiosos de forma divertida y a gran escala, un desafío común en el Big Data

[Datos de entrenamiento](https://quickdraw.withgoogle.com/data)

![](./img/quickdraw2.webp)

En esta página podemos ver, en el momento en el que se redactaban estos apuntes, 126.372 dibujos de pelotas de baloncesto hechas por personales reales...en Internet. Incluso, podemos ver los trazos que han realizado estas personas hasta que el modelo ha sido capaz de adivinar el dibujo. 
Destacar la importancia del Big Data, ya que, los datos de entrenamiento son muy importantes para cualquier modelo de aprendizaje. 

[Datos de entrenamiento para la pelota de baloncesto](https://quickdraw.withgoogle.com/data/basketball)

![](./img/data_basketball_quickdraw.png)

### Desarrollo de nuestro propio Pictionary con Gradio

Vamos a crear una aplicación web con Gradio que use el modelo creado en una sesión anterior: [​omarques/autotrain-dogs-and-cats-1527055142](https://huggingface.co/omarques/autotrain-dogs-and-cats-1527055142)

Ejemplo de aplicación Gradio con una imagen de entrada y un Label como componente de salida:
![](./img/dogs_vs_cats1.png)

Etiquetado de la imagen de entrada:
![](./img/dogs_vs_cats2.png)

## 2. Detección de objetos 

![Tasks - Object detection in Hugging Face](./img/object-detecction-hf.png)

La detección de objetos predice la distancia de cada píxel respecto a la cámara usando solo una imagen. Es una técnica fundamental en visión computacional que permite identificar y localizar instancias de objetos definidos dentro de imágenes. Es ampliamente utilizada en aplicaciones como conducción autónoma, seguimiento de objetos en deportes, búsqueda de imágenes y conteo de objetos en diferentes escenarios. 

Hugging Face alberga varios modelos que han sido entrenados previamente para detectar objetos en imágenes. Podemos ver una lista de modelos en [](https://huggingface.co/models?pipeline_tag=object-detection&sort=trending) 

En la figura siguiente podemos visualizar un listado de la categoría *Object Detection*:

![](./img/tasks_hf_object_detection.png)

Ejemplo del **facebook/detr-resnet-50** para la detección de objetos:

![](./img/tasks_hf_object_detection_example.png)

Podemos probar el modelo directamente utilizando la API de inferencia alojada en Hugging Face. Para ello, usaremos una imagen de una oficina con algunas mujeres [](https://en.wikipedia.org/wiki/Office#/media/File:Good_Smile_Company_offices_ladies.jpg;). 

![](./img/Good_Smile_Company_offices_ladies.jpg)

Al arrastrar y soltar la imagen en la sección "Inference API" alojada en la página del modelo en Hugging Face, veremos la lista de objetos detectados, así como sus probabilidades correspondientes:

Objetos detectados en la imagen y sus probabilidades correspondientes:
![](./img/object_detection_good_Smile_Company_offices_ladies.png)

Al pasar el ratón por encima del nombre de un objeto detectado, la imagen resalta el cuadro delimitador del objeto seleccionado.

### Algunos modelos disponibles en Hugging Face

Hugging Face ofrece modelos preentrenados que permiten realizar detección de objetos sin necesidad de entrenamiento adicional.

| Modelo | Arquitectura | Dataset | Enlace |
|--------|--------------|---------|--------|
| `facebook/detr-resnet-50` | DETR (DEtection TRansformer) | COCO | 🔗 [Ver modelo](https://huggingface.co/facebook/detr-resnet-50) |
| `hustvl/yolos-small` | YOLOS (Vision Transformer) | COCO | 🔗 Ver modelo |

### Principales Aplicaciones

- **Conducción autónoma:** Los coches sin conductor usan la detección de objetos para reconocer peatones, bicicletas, semáforos y señales de tráfico, ayudando a la toma de decisiones en tiempo real.
- **Seguimiento en deportes:** En partidos de fútbol o tenis se rastrea el balón o los jugadores para mejorar el arbitraje y el análisis estadístico.
- **Búsqueda de imágenes:** Los teléfonos inteligentes permiten buscar lugares u objetos directamente en internet mediante la detección de entidades en fotos.
- **Conteo de objetos:** La detección ayuda a contar existencias en almacenes, tiendas, o personas en eventos.

### Métricas de Evaluación

- **Precisión media promedio (AP):** Área bajo la curva de precisión versus recall para cada clase.
- **mAP (mean Average Precision):** Promedio de AP en todas las clases.
- **APα:** Precisión promedio según el umbral de IoU (por ejemplo, AP50 muestra AP cuando el IoU es >0,5).


## 3. Segmentación de imágenes (Image segmentation)

Otra técnica de visión por computadora comúnmente utilizada es la segmentación de imágenes. La segmentación de imágenes es una técnica que consiste en separar una imagen en varios segmentos o regiones. Cada segmento corresponde a un objeto de interés particular. Con la segmentación de imágenes, podemos analizar una imagen y extraer información valiosa de ella. 

Algunos de sus usos son: 

- **Imágenes médicas**: se utilizan para identificar y segmentar tumores en resonancias magnéticas o tomografías computarizadas 
- **Detección y reconocimiento de objetos**: al igual que la detección de objetos que hemos visto anteriormente, también podemos utilizar la segmentación de imágenes para identificar y localizar objetos en una imagen 
- **Procesamiento de documentos**: se utiliza para segmentar regiones de texto en documentos escaneados 
- **Biometría**: se utiliza para identificar y localizar rostros en imágenes o fotogramas de vídeo 

Hugging Face contiene varios modelos de segmentación de imágenes que podemos utilizar. Uno de ellos es el modelo "SegFormer model fine-tuned on ADE20k" (https://huggingface.co/nvidia/segformer-b0-finetuned-ade-512-512). 
La siguente imagen muestra el modelo SegFormer ajustado en el modelo ADE20k en el sitio web de Hugging Face:

![](./img/tasks_image_segmentation_ade20k_hf.png)

Para probar el modelo de segmentación, usaremos una imagen del Taj Mahal. La arrastraremos y la soltaremos en la sección de "Hosted inference API" alojada en la página de Hugging Face:

Imagen del Taj Mahal (Fuente: https://mng.bz/5vzD)
![](./img/Taj_Mahal_Agra,_India_edit3.jpg)

Resultado de la segmentación de imágenes utilizando una imagen del Taj Mahal:
![](./img/tasks_image_segmentation_taj_mahal_result.png)

Como podomos ver en el resultado, el modelo puede detectar diferentes objetos (como edificios, cielos, árboles, etc.) en la imagen y resaltar los diversos segmentos en la imagen. De hecho, podemos pasar el ratón sobre las diversas etiquetas segmentadas y la imagen resaltará dicha etiqueta seleccionada. 

### 3.1. Uso del modelo con pipeline

Como es habitual, usaremos el modelo mediante programación. Primero, cargamos el modelo y luego verificamos cuántos objetos puede detectar el modelo. La forma más fácil de usar el modelo es usar un pipeline  de la librería transformer: 
```python
from transformers import pipeline 
  
segmentation = pipeline("image-segmentation",  
               model="nvidia/segformer-b0-finetuned-ade-512-512") 
  
segmentation.model.config.id2label
```
Estos son los primeros y últimos cinco objetos que puede detectar (el modelo puede detectar un total de 150 objetos): 
```json
{0: 'wall', 
 1: 'building', 
 2: 'sky', 
 3: 'floor', 
 4: 'tree', 
 ... 
 145: 'shower', 
 146: 'radiator', 
 147: 'glass', 
 148: 'clock', 
 149: 'flag'} 
```
Para este ejemplo, usaremos una imagen donde vemos a un hombre y a un avión que vuela por encima, para así descubrir los distintos segmentos de dicha imagen: 

![](./img/photo-1487553333251-6c8e26d3dc2c.avif) 

Fuente: [https://unsplash.com/photos/EC_GhFRGTAY](https://unsplash.com/photos/EC_GhFRGTAY)

Para detectar los distintos segmentos de la imagen, pasamos la dirección URL de una imagen al objeto *pipeline*: 
```python {hl_lines="4 6 8" linenums="1"} 
from PIL import Image
import requests

url = 'https://bit.ly/46iDeJQ'

results = segmentation(url)

results
```
La salida de la variable *results* es una lista de diccionarios que contiene detalles de cada uno de los segmentos detectados en la imagen: 
```json
[{'score': None,
  'label': 'wall',
  'mask': <PIL.Image.Image image mode=L size=1587x2381>},
 {'score': None,
  'label': 'building',
  'mask': <PIL.Image.Image image mode=L size=1587x2381>},
 {'score': None,
  'label': 'sky',
  'mask': <PIL.Image.Image image mode=L size=1587x2381>},
 {'score': None,
  'label': 'person',
  'mask': <PIL.Image.Image image mode=L size=1587x2381>},
 {'score': None,
  'label': 'airplane',
  'mask': <PIL.Image.Image image mode=L size=1587x2381>}]
```
En particular, el elemento *mask* contiene la máscara del segmento detectado. Para ver cada una de las máscaras detectadas, recorremos la variable *results*: 

```python {hl_lines="2 3" linenums="1"} 
for result in results:
    print(result['label'])
    display(result['mask'])
``` 

La figura siguiente muestra las máscaras detectadas para *person* (persona) y *airplane* (avión):
![](./img/parte_blanca_hombre_avion.jpg)

Máscaras para los segmentos *person* y *airplane*

La parte blanca de la máscara representa la parte de la imagen que contiene el segmento de interés. Podemos aplicar la máscara sobre la imagen original mediante el siguiente fragmento de código: 

```python {hl_lines="8 10" linenums="1"} 
image = Image.open(requests.get(url, stream=True).raw) 
  
for result in results: 
    base_image = image.copy() 
    mask_image = result['mask'] 
     
    # Aplica la máscara sobre la imagen original
    base_image.paste(mask_image, mask=mask_image) 
    #Imprime la etiqueta del segmento
    print(result['label']) 
    display(base_image) 
``` 
La figura siguiente muestra las máscaras de *person* (persona) y *airplane* (avión) aplicadas sobre la imagen original:
![](./img/mascaras_en_imagen_original.jpg)

Cuando aplicamos la máscara sobre la imagen, observaremos que el segmento de interés está en blanco. Sería más natural invertir esto, es decir, el segmento de interés debería mostrarse mientras que el resto debería estar en blanco. Para hacer esto, puede invertir la máscara usando la función ```invert()``` de la clase ```ImageOps``` en el paquete ```PIL```. Los siguientes cambios invierten la máscara y, a continuación, la aplican sobre la imagen original: 

```python {hl_lines="8 10" linenums="1"} 
from PIL import ImageOps 
  
for result in results: 
    base_image = image.copy() 
    mask_image = result['mask'] 
     
    mask_image = ImageOps.invert(mask_image)  #Invierte la máscara 
    base_image.paste(mask_image, mask=mask_image)  #Aplica la máscara sobre la imagen original 
    print(result['label'])  #Imprime la etiqueta del segmento
    display(base_image) 
```
La figura siguiente muestra las máscaras invertidas para *person* (persona) y *airplane* (avión)aplicadas en la imagen original. 

![](./img/imagenes_mascaras_invertidas.jpg)

### 3.2. Enlazando con Gradio
En lugar de especificar manualmente la dirección URL de la imagen que queremos usar en el modelo, sería más conveniente crear una interfaz de usuario para que probemos el modelo de segmentación. Tal y como ya hemos utilizado anteiriormente, vamos a hacer uso del paquete Gradio para crear una interfaz de usuario y luego vincularla a la función que realiza la segmentación. 


## Actividades

1. **Usar un Space de Hugging Face**  
Utiliza el pipeline:

```python
from transformers import pipeline

depth = pipeline("depth-estimation", model="Intel/zoedepth-nyu-kitti")

result = depth("ruta_o_url_imagen")
```

2. **Clasificación de imágenes**
Crear un aplicación con Gradio 
En lugar de especificar manualmente la dirección URL de la imagen que queremos usar en el modelo, sería más conveniente crear una interfaz de usuario para que el usuario pruebe el modelo de segmentación. Aquí, vamos a hacer uso del paquete Gradio para crear una interfaz de usuario y luego vincularla a la función que realiza la segmentación. 






Usa el pipeline:
```python

from transformers import pipeline
classifier = pipeline("image-classification")
res = classifier("ruta_o_url_imagen")

print(res)
```

3. **Avanzado (Optativo): Integrar clasificación y segmentación** 

Ejecuta ambos pipelines y visualiza el resultado conjunto.


