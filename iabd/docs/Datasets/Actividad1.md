---
title: Actividad 1 - Datasets de Hugging Face
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
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
dataset = load_dataset("PlanTL-GOB-ES/squad-es")
print(dataset)

# Nivel 2: Dividir en train/test
train_dataset = dataset["train"]
split_dataset = train_dataset.train_test_split(test_size=0.2)
train_split = split_dataset["train"]
test_split = split_dataset["test"]

# Nivel 3: Añadir columna con cantidad de párrafos
def add_num_paragraphs(example):
    return {"num_paragraphs": len(example["paragraphs"])}
train_split = train_split.map(add_num_paragraphs)

# Nivel 4: Filtrar y persistir
filtered_train = train_split.filter(lambda x: x["num_paragraphs"] > 10)
filtered_train = filtered_train.remove_columns(["num_paragraphs"])
filtered_train.to_parquet("filtered_train.parquet")

# Nivel 5: Publicar en Hugging Face
# filtered_train.push_to_hub("usuario/nombre-dataset")
```

---

## 🔗 Recursos
- [Hugging Face Datasets](https://huggingface.co/datasets)
- [Documentación oficial](https://huggingface.co/docs/datasets)
