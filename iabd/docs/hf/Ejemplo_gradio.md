---
title: Ejemplo sencillo de Gradio más un modelo
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Aplicación web Gradio + Modelo previamente entrenado

Vamos a crear una aplicación web con Gradio que use el modelo creado en una sesión anterior: [​omarques/autotrain-dogs-and-cats-1527055142](https://huggingface.co/omarques/autotrain-dogs-and-cats-1527055142)

Ejemplo de aplicación Gradio con una imagen de entrada y un Label como componente de salida:
![](./img/dogs_vs_cats1.png)

Etiquetado de la imagen de entrada:
![](./img/dogs_vs_cats2.png)

##  Código de ejemplo
```python {hl_lines="1 6" linenums="1"} 
import gradio as gr​
​
def image_classifier(inp):​
  return {'cat': 0.3, 'dog': 0.7}​

demo = gr.Interface(fn=image_classifier, inputs='image', outputs='label')​

demo.launch()​
```
##  Añadimos el modelo

```python {hl_lines="2 4 5" linenums="1"} 
import gradio as gr​
from transformers import pipeline​
​
def image_classifier(inp):​
   pipe = pipeline("image-classification", model="omarques/autotrain-dogs-and-cats-1527055142")​
   pipe("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png")​
   return {'cat': 0.3, 'dog': 0.7}​
​
demo = gr.Interface(fn=image_classifier, inputs='image', outputs='label')​

​demo.launch()​
```
##  Instalamos las librerías transformers y torch​

```bash
pip install transformers torch​
```
Volvemos a probar y comprobamos que funciona correctamente.

Dentro del componente [Image](https://www.gradio.app/docs/gradio/image), por defecto Gradio pasa un objeto tipo `numpy.ndarray` (la imagen como matriz) a las funciones de Gradio, por lo que debemos especificar el tipo con `gr.Image(type="filepath")` en la creación de la interfaz de Gradio​.
​
##  Especificar el tipo en Image
```python {linenums="1"} 
demo = gr.Interface(fn=image_classifier, inputs=gr.Image(type="filepath"), outputs='label')​
```
##  Código actualizado
```python {hl_lines="13" linenums="1"}
import gradio as gr​
from transformers import pipeline​

def image_classifier(inp):​
   #/tmp/gradio/b7be1455904a47b7fb3d953514163c828cc46e093fe7ba8bdeb950039a8e870e/1.png​
   print(inp) 
   pipe = pipeline("image-classification", model="omarques/autotrain-dogs-and-cats-1527055142")​
   #[{'label': 'cat', 'score': 0.6151219010353088}, {'label': 'dog', 'score': 0.38487812876701355}]​
   print(pipe(inp)) 
   return {'cat': 0.3, 'dog': 0.7}​

demo = gr.Interface(fn=image_classifier, inputs=gr.Image(type="filepath"), outputs='label')​

demo.launch()​
```
##  De lista a diccionario para el output label

Para convertir la lista `[{'label': 'cat', 'score': 0.6151219010353088}, {'label': 'dog', 'score': 0.38487812876701355}]​` al formato requerido por el componente de salida [Label](https://www.gradio.app/docs/gradio/label) `(dict[str, float])` de Gradio, debemos crear un diccionario donde las claves son los valores de `label` y los valores son los correspondientes a `score`​

Ejemplo sencillo:​
```python {hl_lines="5" linenums="1"} 
lista = [​
  {'label': 'cat', 'score': 0.6151219010353088},​
  {'label': 'dog', 'score': 0.38487812876701355}​
]​
resultado = {d['label']: d['score'] for d in lista}​​
# Resultado: {'cat': 0.8, 'dog': 0.2}​
print(resultado)​
```
##  Código final
```python {hl_lines="7" linenums="1"} 
import gradio as gr​
from transformers import pipeline​
​
def image_classifier(inp):​
   pipe = pipeline("image-classification", model="omarques/autotrain-dogs-and-cats-1527055142")​
   #[{'label': 'cat', 'score': 0.6151219010353088}, {'label': 'dog', 'score': 0.38487812876701355}]​
   etiquetas = pipe(inp)
   #[{'cat': 0.6151219010353088}, {'dog': 0.38487812876701355}]​
   resultado = {d['label']: d['score'] for d in etiquetas} 
   return resultado​

demo = gr.Interface(fn=image_classifier, inputs=gr.Image(type="filepath"), outputs='label')​

demo.launch()​
```
​

​
