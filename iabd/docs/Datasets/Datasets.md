---
title: Datasets de Hugging Face
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 📘 Hugging Face Datasets: Guía + Reto Gamificado

## 1️⃣ Introducción
El paquete **`datasets`** de Hugging Face es una potente herramienta para **acceder, compartir y procesar conjuntos de datos (datasets)** de IA para una amplia gama de tareas, que incluyen:

- Procesamiento del Lenguaje Natural (PLN)
- Visión por computadora
- Procesamiento de audio

Está diseñado para manejar **grandes volúmenes de datos** de manera eficiente mediante el uso de **mapeo de memoria** y el formato [**Apache Arrow**](https://arrow.apache.org/), lo que permite trabajar con datos que superan la RAM disponible.

> Arrow Apache Arrow define un formato de memoria columnar independiente del lenguaje para datos planos y anidados, organizado para operaciones analíticas eficientes en hardware moderno como CPU y GPU. El formato de memoria Arrow también admite lecturas sin copia para un acceso a datos ultrarrápido sin sobrecarga de serialización.
>
>El proyecto del formato Apache Arrow comenzó en febrero de 2016, centrándose en cargas de trabajo de análisis columnar en memoria. A diferencia de formatos de archivo como Parquet o CSV, que especifican cómo se organizan los datos en el disco, Arrow se centra en cómo se organizan los datos en la memoria.
![](./images/arrow_vs_partquet_format.png)
>
>Los creadores buscan consolidar Arrow como un formato estándar en memoria para el análisis de cargas de trabajo. Estos fundamentos atraen a numerosos colaboradores de proyectos como Pandas, Spark, Cassandra, Apache Calcite, Dremio e Ibis.
---

## 🔑 Características Clave
- **Vasto Repositorio (Hub):** Gran cantidad de datasets públicos y privados.
- **Fácil Acceso:** Carga en una sola línea de código con `load_dataset`.
- **Procesamiento Eficiente:** Métodos como `map()` paralelizados.
- **Escalabilidad:** Objetos `Dataset` y `IterableDataset`.
- **Gestión de Datos:** Crear y subir datasets propios al Hub de Hugging    Face.

Los datasets de Hugging Face sirven para:
## ✅ 1. Acceder a datos listos para IA

Hugging Face ofrece un repositorio enorme de conjuntos de datos públicos y privados para tareas como:

- Procesamiento del Lenguaje Natural (PLN)
- Visión por computadora
- Audio y multimodalidad

## ✅ 2. Facilitar el preprocesamiento

Permite aplicar transformaciones como:

- Tokenización de texto
- Filtrado y remuestreo
- Conversión a formatos como Pandas, NumPy, PyTorch y TensorFlow

## ✅ 3. Escalabilidad y eficiencia

Usa Apache Arrow y mapeo de memoria, lo que permite trabajar con datasets que superan la RAM disponible.
Soporta dos tipos:
- Dataset (acceso aleatorio rápido)
- IterableDataset (para streaming de datos grandes)

## ✅ 4. Compartir y colaborar

Podemos crear y subir nuestros propios datasets al Hugging Face Hub, con documentación y ejemplos. Esto fomenta la reproducibilidad y el trabajo en equipo.

## ✅ 5. Integración directa con modelos

Los datasets se integran fácilmente con transformers y otros frameworks para entrenamiento y evaluación.

---

## ⚙️ Instalación
```bash
pip install datasets
pip install datasets[audio]
pip install datasets[vision]
```

---

## 🧩 Ejemplo: Cargar un dataset local
```python {linenums="1"}
from datasets import load_dataset

squad_dataset = load_dataset("json", data_files="train-v2.0-es.json", field="data")

print(squad_dataset)
```

Salida esperada:
```
DatasetDict({
    train: Dataset({ features: ['title', 'paragraphs'], num_rows: 442 })
})
```

---

## 2️⃣ Reto Gamificado: Publica tu primer Dataset en Hugging Face

### 🎯 Objetivo
Aprender a trabajar con **datasets en Hugging Face**, realizar transformaciones y publicar un dataset en el **Hugging Face Hub**.

### 🕹️ Niveles del reto
1. **Descarga y explora:** Cargar `SquadES`.
2. **Divide en train/test:** Crear split adicional.
3. **Añade columna:** `num_paragraphs`.
4. **Filtra y persiste:** Guardar en Parquet.
5. **Publica en Hugging Face:** Añadir documentación.

---

## 📂 Plantilla del ejercicio
```python
from datasets import load_dataset

# Nivel 1: Descargar y explorar


# Nivel 2: Dividir en train/test


# Nivel 3: Añadir columna con cantidad de párrafos


# Nivel 4: Filtrar y persistir

# Nivel 5: Publicar en Hugging Face

```

---

## 🔗 Recursos
- [Hugging Face Datasets](https://huggingface.co/datasets)
- [Documentación oficial](https://huggingface.co/docs/datasets)
