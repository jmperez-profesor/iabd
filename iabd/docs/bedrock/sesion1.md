---
title: Bedrock 
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 📘 Material Docente: Amazon Bedrock

## 1. Introducción a Amazon Bedrock
Amazon Bedrock es un servicio de AWS que permite a los desarrolladores construir aplicaciones generativas utilizando modelos fundacionales (FMs) sin necesidad de gestionar infraestructura. Ofrece acceso a modelos como **Claude (Anthropic)**, **Titan (Amazon)** y **Stable Diffusion (Stability AI)**.

### Ventajas
- Sin necesidad de entrenar modelos desde cero.
- Integración nativa con servicios AWS.
- Escalabilidad y seguridad empresarial.

### Casos de uso
- Chatbots inteligentes.
- Generación de contenido.
- Resúmenes automáticos.
- Recuperación aumentada (RAG).

### 💡 Ejemplos Clave de Uso de Bedrock

| Área de Uso | Descripción | Modelo Fundacional Típico |
| :--- | :--- | :--- |
| **Generación de Contenido** | Crear artículos, descripciones de productos o *scripts* automáticamente. | Amazon Titan Text, Anthropic Claude |
| **Búsqueda y Resumen** | Crear *chatbots* que responden preguntas basándose en documentos internos (patrones RAG). | Amazon Titan Embeddings, Meta Llama 2 |
| **Automatización de Agentes** | Construir agentes de IA que pueden realizar tareas complejas de varios pasos (ej. procesar reclamaciones). | Agents for Amazon Bedrock (usando modelos como Claude) |
| **Generación de Código** | Asistencia para desarrolladores que genera fragmentos de código, traduce lenguajes o explica funciones. | Anthropic Claude Code |

---

## 2. Requisitos previos
- Cuenta activa en AWS.
- Permisos IAM para Amazon Bedrock.
- SDK de AWS (Python o Node.js).
- Activación de modelos en la consola.

---



## 3. Primeros pasos con la consola
Accede al **Playground** de Amazon Bedrock para probar prompts y modelos.

![Consola Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/images/playground.png)

---

## 4. Ejemplo básico: Generar texto con Claude
Código en Python usando **boto3**:

```python
import boto3

client = boto3.client('bedrock-runtime', region_name='us-east-1')

prompt = "Resume en 3 puntos las ventajas de Amazon Bedrock"
response = client.invoke_model(
    modelId="anthropic.claude-v2",
    body={"input": prompt}
)

print(response['body'])
```

---

## 5. Aprendizaje basado en retos

### ✅ Reto 1
Crear un prompt que genere un plan de marketing para un producto tecnológico.

### ✅ Reto 2
Implementar un flujo con **Bedrock Agents** para responder preguntas sobre documentos internos.

### ✅ Reto 3
Conectar Bedrock con **Amazon S3** para usar datos propios en la generación de respuestas.

---

## 6. Proyecto integrador real

### Caso
Automatizar resúmenes de informes técnicos en una empresa manufacturera.

### Arquitectura
- **AWS Lambda** + **API Gateway** + **Amazon Bedrock**.

### Flujo
1. Técnico sube informe a S3.
2. Lambda invoca Bedrock para generar resumen.
3. API Gateway expone endpoint para consultar resumen.

### Código Lambda (Python)
```python
import json
import boto3

def lambda_handler(event, context):
    client = boto3.client('bedrock-runtime')
    report_text = event['body']

    response = client.invoke_model(
        modelId="anthropic.claude-v2",
        body={"input": f"Resume el siguiente informe técnico: {report_text}"}
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'summary': response['body']})
    }
```

### Resultado esperado
- Endpoint `/summarize` devuelve resumen en segundos.
- Beneficio: reduce tiempo de análisis en un 70%.

---

## 7. Recursos adicionales
- [Documentación oficial](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- [Guía rápida AWS](https://aws.amazon.com/bedrock/)




