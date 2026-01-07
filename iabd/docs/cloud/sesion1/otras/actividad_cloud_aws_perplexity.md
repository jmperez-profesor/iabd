---
title: Cloud y AWS - Estrategia de migración a la nube para el Ayuntamiento de Elche (Perplexity)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

Esta propuesta de actividad está diseñada para una sesión de dos horas dirigida a estudiantes del curso de especialización en Inteligencia Artificial y Big Data (IABD). Se centra en el caso real del ciberataque al Ayuntamiento de Elche para aplicar conceptos de infraestructura, costes y seguridad en la nube.[^1][^2]

## Actividad: Modernización del Ayuntamiento de Elche

El Ayuntamiento de Elche busca una solución tecnológica tras el colapso de sus sistemas por un ciberataque. El objetivo de esta actividad es que, por equipos, diseñen una propuesta de migración a **Amazon Web Services (AWS)** que garantice la continuidad del servicio y la protección de los datos ciudadanos.[^1]

### Enunciado para el alumnado

Tras el reciente ciberataque, el Ayuntamiento debe decidir si mantiene su infraestructura *on-premise*, migra totalmente a la nube pública, o adopta un modelo híbrido. Vuestro equipo actúa como consultoría técnica para proponer una arquitectura basada en el **Modelo de Responsabilidad Compartida**. Debéis entregar un informe que incluya:[^2]

1. **Análisis de Gastos**: Comparativa entre la inversión actual (**CapEx**) y el modelo de pago por uso (**OpEx**) de AWS.[^1]
2. **Diseño de Arquitectura**: Elección razonada entre nube pública, privada o híbrida, identificando servicios específicos como **Amazon EC2**, **S3** y **RDS**.[^2]
3. **Plan de Seguridad**: Estrategia para mitigar ataques mediante el uso de **IAM**, **AWS Shield** y copias de seguridad en diferentes **Zonas de Disponibilidad (AZ)**.[^2][^1]

### Rúbrica de evaluación

| Criterio | Excelente (5 pts) | En desarrollo (3 pts) | Insuficiente (1 pt) |
| :-- | :-- | :-- | :-- |
| **Análisis TCO** | Identifica costes directos/indirectos y justifica el ahorro OpEx [^1]. | Menciona el ahorro pero no diferencia claramente CapEx de OpEx. | No realiza cálculos ni comparativas de costes. |
| **Arquitectura** | Selecciona un modelo (ej. Híbrido) justificando el uso de AZ y Regiones [^1]. | Propone servicios de AWS sin justificar la ubicación geográfica. | No define un modelo de infraestructura claro. |
| **Seguridad** | Aplica el principio de mínimo privilegio con IAM y protección DDoS [^2]. | Menciona herramientas de seguridad sin explicar su configuración. | No aborda la prevención de futuros ciberataques. |
| **Trabajo Equipo** | Colaboración total y presentación técnica profesional. | Participación desigual de los miembros. | Falta de coordinación y errores técnicos graves. |

## Soluciones técnicas propuestas

A continuación se detallan las opciones que el alumnado puede proponer basándose en los materiales de referencia.[^1][^2]

### Comparativa de modelos de infraestructura

| Modelo | Ventajas Técnicas | Desventajas / Retos | Recomendación para Elche |
| :-- | :-- | :-- | :-- |
| **Nube Pública** | Alta disponibilidad, escalabilidad global y CapEx de 0€ [^1]. | Dependencia de internet y posibles dudas sobre soberanía de datos [^1]. | Ideal para servicios al ciudadano de alto tráfico. |
| **Nube Híbrida** | Control de datos críticos localmente y escalabilidad en la nube [^1]. | Mayor complejidad en la gestión y latencia en conexiones [^1]. | **Solución más equilibrada** para la administración pública. |
| **Multicloud** | Evita el bloqueo con un solo proveedor (AWS/Azure) [^1]. | Dificultad para centralizar políticas de seguridad [^1]. | Recomendable para evitar dependencia total de Amazon. |
| **On-premise** | Control total físico de los servidores y los datos [^1]. | Alto coste de mantenimiento, difícil escalado y vulnerable a fallos locales [^1]. | No recomendada tras el fallo de seguridad reciente. |

### Implementación técnica en AWS

Para una migración efectiva, se proponen las siguientes fases y servicios de AWS:[^2]

- **Fase 1: Almacenamiento y Backup (S3 y Glacier)**: Migrar los archivos críticos a **Amazon S3** para obtener una durabilidad del 99.999999999%. Esto asegura que, ante un *ransomware* local, existan copias inmutables en la nube.[^2]
- **Fase 2: Computación y Redes (VPC y EC2)**: Crear una **Amazon VPC** con subredes públicas para la web municipal y subredes privadas para las bases de datos. Se utilizaría el asistente de **VPC Wizard** para configurar el aislamiento.[^2]
- **Fase 3: Seguridad de Identidad (IAM)**: Implementar políticas de acceso mediante documentos JSON para restringir permisos.[^2]

Ejemplo de política de IAM para restringir acceso a un técnico de bases de datos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "rds-db:connect",
      "Resource": "arn:aws:rds-db:us-east-1:123456789012:dbuser:pr-db-instance/db-user"
    }
  ]
}
```


## Referencias y recursos

Para profundizar en la teoría aplicada en esta actividad, se pueden consultar los siguientes enlaces:

- [Información sobre Cloud Computing](https://aitor-medrano.github.io/iabd/cloud/cloud.html)[^1]
- [Guía de servicios y seguridad en AWS](https://aitor-medrano.github.io/iabd/cloud/aws.html)[^2]
- [Calculadora de costes de AWS](https://calculator.aws)[^1]

<div align="center">⁂</div>

[^1]: https://aitor-medrano.github.io/iabd/cloud/cloud.html

[^2]: https://aitor-medrano.github.io/iabd/cloud/aws.html


