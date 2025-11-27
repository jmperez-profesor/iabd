---
title: Introducción a Amazon Bedrock
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 📘 Sesión 1: Introducción a Amazon Bedrock

## Objetivos:

- Comprender qué es Amazon Bedrock, sus funcionalidades principales y su propósito.
- Explorar los conceptos de “modelos fundacionales” (FMs), “RAG” (generación aumentada por recuperación), “fine-tuning” y “guards / guardrails” para una IA responsable.
- Formular hipótesis sobre cómo una empresa (hotel, restaurante, ...) o centros educativos, ayuntamientos, etcétera podrían beneficiarse de la IA generativa.
- Diseñar, en equipo, una propuesta de aplicación concreta usando Amazon Bedrock adaptada a un caso real.

## 1. Introducción a Amazon Bedrock
Amazon Bedrock es un servicio de AWS que permite a los desarrolladores construir aplicaciones generativas utilizando modelos fundacionales (FMs) sin necesidad de gestionar infraestructura. Ofrece acceso a modelos como **Claude (Anthropic)**, **Titan (Amazon)** y **Stable Diffusion (Stability AI)**.

## Capacidades destacadas

- **RAG (Retrieval-Augmented Generation)**: podemos conectar Bedrock a nuestras propias fuentes de datos (documentos, bases de conocimiento) de modo que las respuestas del modelo estén informadas por datos reales de nuestra empresa. Esto ayuda a responder consultas concretas basadas en información actualizada. 
Amazon Web Services, Inc. 
- **Fine-tuning / personalización privada**: es posible adaptar un modelo para tareas específicas o para un dominio concreto (por ejemplo, hotelería, turismo, restaurante, etc.), usando nuestros propios datos, sin que esos datos entren a formar parte del modelo base. 
- **Seguridad, privacidad e IA responsable**: Bedrock integra funcionalidades de protección, guardrails, control de contenidos y privacidad de datos, para reducir riesgos — por ejemplo, filtrado de contenido inapropiado, protección de datos, auditoría… 
- **Flexibilidad de modelos**: podemos elegir entre muchos FMs de distintos proveedores según el uso: algunos serán mejores para generación de texto creativa; otros para respuestas precisas; otros para integración con datos. 

### ¿Qué es **"Retrieval Augmented Generation"** (RAG) o **Generación Aumentada por Recuperación** ?

La *Retrieval Augmented Generation* (RAG) o Generación Aumentada por Recuperación en español, es una técnica de IA que combina dos componentes: un sistema de recuperación de información y un modelo de lenguaje grande (LLM). 
El objetivo es mejorar la precisión y la actualidad de las respuestas del LLM al permitirle acceder y utilizar información de fuentes de datos externas y específicas antes de generar su respuesta, sin necesidad de reentrenamiento. 

#### Cómo funciona
1. **Recuperación**: Cuando se hace una consulta, un sistema de recuperación busca y selecciona los fragmentos de información más relevantes de una base de conocimiento externa (que puede incluir documentos privados, bases de datos o fuentes de noticias).
2. **Generación**: El modelo de lenguaje grande (LLM) toma la consulta original junto con la información recuperada para generar una respuesta más precisa, actualizada y contextualizada.
3. **Ejemplo**: Si un usuario pregunta sobre un producto específico, el sistema RAG puede buscar en la base de datos de la empresa información sobre ese producto y luego usarla para que el LLM genere una respuesta detallada y precisa. 

### Beneficios de RAG
- **Acceso a datos actualizados**: Permite a los LLM acceder a información más reciente que la que tenían durante su entrenamiento inicial.
- **Reducción de *alucinaciones*** : Disminuye la probabilidad de que el modelo "invente" información, ya que se basa en datos concretos.
- **Adaptación a dominios específicos**: Facilita la creación de chatbots o aplicaciones que pueden responder preguntas sobre temas muy específicos o propietarios, como el conocimiento interno de una empresa.
- **Referencia de fuentes**: Puede citar las fuentes de información utilizadas, lo que aumenta la transparencia y la confianza en las respuestas.
- **Eficiencia**: Es una forma más rápida y económica de actualizar la información de un LLM en comparación con el reentrenamiento completo del modelo. 

Más información en este vídeo: [https://www.youtube.com/watch?v=-NqZehslaNk](https://www.youtube.com/watch?v=-NqZehslaNk)

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
| **Generación de contenido** | Crear artículos, descripciones de productos o *scripts* automáticamente. | Amazon Titan Text, Anthropic Claude |
| **Búsqueda y resumen** | Crear *chatbots* que responden preguntas basándose en documentos internos (patrones RAG). | Amazon Titan Embeddings, Meta Llama 2 |
| **Automatización de agentes** | Construir agentes de IA que pueden realizar tareas complejas de varios pasos (ej. procesar reclamaciones). | Agents for Amazon Bedrock (usando modelos como Claude) |
| **Generación de código** | Asistencia para desarrolladores que genera fragmentos de código, traduce lenguajes o explica funciones. | Anthropic Claude Code |

### Ejemplo ilustrativo

Imagina que gestinamos un hotel y queremos ofrecer a nuestros clientes un “asistente inteligente” (chatbot) que:

- **Responda preguntas frecuentes**: horarios, servicios, recomendaciones locales.
- **Sugiera experiencias según perfil del cliente (familia, pareja, negocios, con mascotas)**.
- **Responda en varios idiomas**.

Con Amazon Bedrock podríamos:

- **Crear una base de conocimiento con información propia del hotel**: descripciones de servicios, normas, tarifas, actividades, recomendaciones locales.
- Usar **RAG (Retrieval-Augmented Generation)** para que el modelo *se base* en esa información interna cuando responda.
- Si queremos precisión en el estilo de las respuestas (por ejemplo, tono amable, cercano, profesional), *haríamos un *fine-tuning* con ejemplos de interacciones típicas*.
- **Publicar ese asistente como chatbot web, Bot de Telegram, WhatsApp o similar** sin tener que disponer de servidores propios: Bedrock lo gestiona.

---

## 2. Requisitos previos
- Cuenta activa en AWS.
- Permisos IAM para Amazon Bedrock.
- SDK de AWS (Python o Node.js).
- Activación de modelos en la consola.

---


## 3. Parámetros de Inferencia y Experimentación
Los alumnos deben experimentar con las configuraciones del prompt para controlar el comportamiento del modelo.

| Parámetro | Descripción | Impacto en el resultado |
| :--- | :--- | :--- |
| **Temperatura** | Controla la creatividad y la diversidad de las respuestas. | Un valor superior genera respuestas más creativas y diversas. |
| **P Superior (Top P)** | Permite seleccionar palabras más probables. | Permite variar entre respuestas más probables o menos probables. |
| **Longitud Máxima (MaxTokenCount)** | Define el tamaño máximo de la respuesta generada. | Limita el coste y la extensión de la respuesta. |

## 4. Elección estratégica del modelo
Amazon Bedrock ofrece flexibilidad para elegir el modelo que mejor se adapte a cada necesidad.

- **Modelos de Amazon (Titan/Nova)**: Modelos propietarios que ofrecen inteligencia multimodal rápida y rentable, incluyendo generación de texto, imágenes, comprensión de documentos y código. El modelo Nova Lite es multimodal y sensible a los costes, mientras que Nova Pro es competente para tareas más complejas. Los modelos Titan Text Express son recomendados para tareas de alto volumen y bajo coste como el resumen.
- **Anthropic (Claude)**: Modelos que destacan en razonamiento complejo, generación de código y seguimiento de instrucciones, adecuados para industrias que exigen cumplimiento y confianza.
- **Stability AI**: Conocidos por sus modelos de generación de imágenes, como Stable Diffusion 3.5 Large.
- **DeepSeek**: Modelos avanzados de razonamiento que resuelven problemas complejos paso a paso.
- **Mistral AI**: Modelos especializados para el razonamiento agentic y tareas multimodales.

## Ejemplo básico: Generar texto con Claude
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




