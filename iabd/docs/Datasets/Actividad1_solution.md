---
title: Actividad 1 Solución - Datasets de Hugging Face
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 1. Descargar los datos de SquadES desde fuente remota
El primer paso es cargar los archivos de entrenamiento y validación desde URLs remotas. Utilizaremos la función load_dataset() de la librería 🤗 Datasets, indicando que queremos cargar archivos JSON alojados en GitHub. Los datos remotos se corresponden con train-v2.0-es.json (entrenamiento) y dev-v2.0-es.json (validación).

```python {linenums="1"}
from datasets import load_dataset

url = "https://raw.githubusercontent.com/ccasimiro88/TranslateAlignRetrieve/master/SQuAD-es-v2.0/"
data_files = {
    "train": url + "train-v2.0-es.json",
    "val": url + "dev-v2.0-es.json"
}
squad_es = load_dataset("json", data_files=data_files, field="data")  # field="data" porque los datos están bajo esa clave
print(squad_es)
```
Esto produce un objeto DatasetDict con splits train y val, donde cada elemento tiene las claves title y paragraphs.​

# 2. Dividir los datos de entrenamiento en entrenamiento y prueba
Para realizar una partición del split de entrenamiento en dos partes (por ejemplo, 90% entrenamiento y 10% prueba), usamos el método train_test_split():

```python {linenums="1"}
squad_train_full = squad_es["train"]
split_dataset = squad_train_full.train_test_split(test_size=0.1, seed=42)
squad_train = split_dataset["train"]
squad_test = split_dataset["test"]
print(squad_train)
print(squad_test)
```
Ahora disponemos de squad_train (entrenamiento 90%) y squad_test (prueba 10%).​

# 3. Añadir una columna con el número de párrafos
Podemos emplear el método map para agregar una columna llamada, por ejemplo, num_paragraphs, contando los elementos en la clave paragraphs de cada ejemplo.

```python {linenums="1"}
squad_train = squad_train.map(lambda x: {"num_paragraphs": len(x["paragraphs"])})
print(squad_train.column_names)  # Debe incluir 'num_paragraphs'
print(squad_train[0]["num_paragraphs"])
```
De este modo, cada registro en el split de entrenamiento tiene la columna con el número de párrafos.​

# 4. Filtrar los ejemplos con más de 10 párrafos
Usaremos el método filter, pasando una función lambda que conserve solo aquellos ejemplos cuya columna num_paragraphs sea mayor que 10:

```python {linenums="1"}
squad_train_large = squad_train.filter(lambda x: x["num_paragraphs"] > 10)
print(squad_train_large)
```
Así, el dataset de entrenamiento contiene únicamente los registros relevantes para el criterio pedido.​

# 5. Eliminar la columna num_paragraphs
Para dejar el dataset limpio, eliminamos la columna extra:

```python {linenums="1"}
squad_train_final = squad_train_large.remove_columns("num_paragraphs")
print(squad_train_final.column_names)
```
Esto deja únicamente las columnas originales: title y paragraphs.​

# 6. Persistir el dataset en formato Parquet
El método to_parquet() permite guardar el dataset resultante en disco en formato Parquet, que es eficiente y compatible para grandes volúmenes de datos.

```python {linenums="1"}
squad_train_final.to_parquet("squad_train_filtered.parquet")
```
Esto crea el archivo Parquet con los ejemplos filtrados.​

# 7. Publicar el dataset en Hugging Face
Antes de publicar necesitas autenticarte con tu cuenta (asegúrate de tener instalado huggingface_hub y un token de escritura):

```python {linenums="1"}
from huggingface_hub import login
login()  # Te pedirá el token
```
A continuación, puedes usar el método push_to_hub del dataset. Opcionalmente, crea primero un DatasetDict si quieres incluir también el split de validación o test:

```python {linenums="1"}
from datasets import DatasetDict

final_dataset = DatasetDict({
    "train": squad_train_final,
    "test": squad_test
})
```

Sube el dataset (reemplaza <tu_usuario>/squad_es_filtrado por tu nombre de usuario/repositorio en Hugging Face)
final_dataset.push_to_hub("<tu_usuario>/squad_es_filtrado")

# Opcionalmente, añade un ejemplo en la documentación editando la "Dataset Card" en la propia web de Hugging Face, tal como recomienda la sesión[attached_file:1].

> Notas finales
- Durante el proceso, imprime ejemplos y utiliza pequeños prints para comprobar cada paso.
- La edición de la tarjeta del dataset ("Dataset Card") se realiza desde la web de Hugging Face: ahí puedes añadir un ejemplo, uso previsto y detalles del proceso seguido, favoreciendo la comprensión de terceros usuarios.
- Todos estos pasos están alineados con la metodología y ejemplos detallados en la sesión teórica enlazada.​

---

## 🔗 Recursos
- [Hugging Face Datasets](https://huggingface.co/datasets)
- [Documentación oficial](https://huggingface.co/docs/datasets)
