---
title: Cloud y AWS - MIGRACIÓN A LA NUBE - CASO AYUNTAMIENTO DE ELCHE - SESIÓN CLOUD AWS
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---
# SESIÓN PRÁCTICA: CLOUD COMPUTING Y AWS
## Migración del Ayuntamiento de Elche tras Ciberataque
---

## OBJETIVOS DE LA SESIÓN

### Objetivos Conceptuales
1. **Distinguir modelos de servicio cloud** (IaaS, PaaS, SaaS) y aplicarlos a casos reales
2. **Comparar modelos de despliegue** (pública, privada, híbrida, multicloud, on-premise) evaluando ventajas e inconvenientes
3. **Identificar servicios clave de AWS** (EC2, RDS, S3, VPC, IAM) y su aplicación en arquitecturas empresariales

### Objetivos Procedimentales
4. **Diseñar una arquitectura cloud básica** utilizando servicios AWS para un caso real
5. **Elaborar un plan de migración por fases** con estimación de tiempos y costes

### Objetivos Actitudinales
6. **Trabajar colaborativamente** en la resolución de problemas técnicos complejos
7. **Argumentar decisiones técnicas** de forma fundamentada y profesional

---

## SECUENCIA TEMPORAL DE ACTIVIDADES

### BLOQUE 1: Contextualización y Análisis (20 minutos)

#### Actividad 1.1: Presentación del Caso (10 min)
- **Agrupamiento**: Plenaria
- **Actividad**: Presentación del ciberataque al Ayuntamiento de Elche
- **Producto**: Notas individuales sobre el impacto del ataque

#### Actividad 1.2: Formación de Equipos y Análisis Inicial (20 min)
- **Agrupamiento**: Equipos de 3-4 alumnos
- **Actividad**: Análisis de la situación actual y identificación de servicios críticos
- **Producto**: Lista priorizada de servicios municipales a migrar

### BLOQUE 2: Fundamentos Cloud (25 minutos)

#### Actividad 2.1: Modelos de Servicio (15 min)
- **Agrupamiento**: Equipos
- **Actividad**: Clasificar servicios municipales según IaaS/PaaS/SaaS
- **Producto**: Tabla comparativa con ejemplos concretos

#### Actividad 2.2: Modelos de Despliegue (10 min)
- **Agrupamiento**: Equipos
- **Actividad**: Evaluar pros/contras de cada modelo para el ayuntamiento
- **Producto**: Matriz de decisión con puntuaciones

### BLOQUE 3: Arquitectura AWS (25 minutos)

#### Actividad 3.1: Servicios AWS Core (10 min)
- **Agrupamiento**: Equipos
- **Actividad**: Mapear servicios municipales con servicios AWS
- **Producto**: Diagrama básico de arquitectura

#### Actividad 3.2: Seguridad y Redes (15 min)
- **Agrupamiento**: Equipos
- **Actividad**: Diseñar VPC, subnets y grupos de seguridad
- **Producto**: Esquema de red con medidas de seguridad

### BLOQUE 4: Plan de Migración (20 minutos)

#### Actividad 4.1: Fases de Migración (20 min)
- **Agrupamiento**: Equipos
- **Actividad**: Definir 3 fases con cronograma y estimación de costes
- **Producto**: Cronograma detallado con hitos y riesgos

### BLOQUE 5: Presentaciones y Síntesis (30 minutos)

#### Actividad 5.1: Presentaciones de Equipos (20 min)
- **Agrupamiento**: Plenaria
- **Actividad**: Cada equipo presenta su propuesta (4 min/equipo)
- **Producto**: Presentación oral con justificación técnica

#### Actividad 5.2: Debate y Conclusiones (10 min)
- **Agrupamiento**: Plenaria
- **Actividad**: Comparación de propuestas y lecciones aprendidas
- **Producto**: Conclusiones grupales sobre mejores prácticas

---

## DESCRIPCIÓN DETALLADA DE LA ACTIVIDAD CENTRAL

### Contexto del Caso Real

El **Ayuntamiento de Elche** sufrió un ciberataque que colapsó sus sistemas informáticos, afectando:

- Portal web municipal y servicios online
- Sistema de cita previa ciudadana
- Gestión de multas y sanciones
- Padrón municipal y censo
- Sistemas internos (RRHH, contabilidad, licencias)

### Misión de los Equipos

Actuar como **consultores cloud** para diseñar la migración de servicios municipales a AWS, considerando:

1. **Análisis de criticidad**: ¿Qué servicios son más urgentes de migrar?
2. **Modelo de despliegue**: ¿Nube pública, híbrida o privada?
3. **Arquitectura AWS**: ¿Qué servicios usar para cada necesidad?
4. **Plan de migración**: ¿Cómo hacerlo por fases minimizando riesgos?
5. **Análisis coste-beneficio**: ¿Merece la pena vs mantener on-premise?

### Entregables por Equipo

1.**Documento técnico** con:
  
   - Análisis de servicios críticos
   - Justificación del modelo elegido
   - Arquitectura AWS propuesta
   - Plan de migración en 3 fases
   - Estimación cualitativa de costes

2.**Presentación oral** (5 minutos) destacando:

   - Decisión principal y justificación
   - Arquitectura clave (servicios AWS)
   - Cronograma y riesgos principales

---

## PREGUNTAS GUÍA PARA LOS EQUIPOS

### Análisis de criticidad
- ¿Qué servicios no pueden estar caídos ni un minuto?
- ¿Cuáles afectan directamente a los ciudadanos?
- ¿Qué sistemas manejan datos más sensibles?

### Modelos de despliegue
- ¿Qué pasaría si se repite un ransomware en la nube pública?
- ¿Puede el ayuntamiento permitirse gestionar infraestructura propia?
- ¿Qué datos NUNCA pueden salir del territorio español?

### Servicios AWS
- ¿Usarías EC2 o Lambda para el portal web? ¿Por qué?
- ¿RDS o DynamoDB para el padrón municipal?
- ¿Cómo garantizas que solo empleados autorizados accedan a datos sensibles?
- ¿Qué servicio AWS usarías para copias de seguridad automáticas?

### Migración y costes
- ¿Por dónde empezarías la migración? ¿Portal web o sistemas internos?
- ¿Cuánto tiempo necesitaría cada fase?
- ¿Será más caro o barato que mantener servidores propios?
- ¿Qué riesgos tiene migrar demasiado rápido?

### Seguridad y compliance
- ¿Cómo cumples con el RGPD en la nube?
- ¿Qué pasa si AWS tiene una caída en Europa?
- ¿Cómo monitorizas intentos de intrusión?

---

## RÚBRICA DE EVALUACIÓN

**Puntuación Total: 100 puntos**

| Criterio | Peso | Excelente (9-10) | Aceptable (6-8) | Insuficiente (0-5) |
|----------|------|------------------|-----------------|-------------------|
| **Comprensión Modelos Cloud** (20 pts) | 20% | Distingue claramente IaaS/PaaS/SaaS y modelos de despliegue con ejemplos precisos | Identifica la mayoría de conceptos con algunos ejemplos correctos | Confunde conceptos básicos o no los aplica correctamente |
| **Calidad Solución Propuesta** (25 pts) | 25% | Propuesta coherente, bien justificada y técnicamente viable | Propuesta razonable con justificación básica | Propuesta poco realista o sin justificación técnica |
| **Arquitectura AWS** (20 pts) | 20% | Selecciona servicios AWS apropiados y explica su interconexión | Identifica servicios principales con explicación básica | Servicios inadecuados o sin explicar su uso |
| **Plan de Migración** (15 pts) | 15% | Fases lógicas con cronograma realista y análisis de riesgos | Fases definidas con cronograma básico | Fases poco claras o cronograma irrealista |
| **Trabajo en Equipo** (10 pts) | 10% | Colaboración efectiva, roles claros, participación equilibrada | Buena colaboración con participación desigual | Poca colaboración o conflictos evidentes |
| **Presentación** (10 pts) | 10% | Comunicación clara, argumentos sólidos, tiempo respetado | Presentación adecuada con argumentos básicos | Presentación confusa o fuera de tiempo |

### Descriptores Detallados

**Comprensión Modelos Cloud (20 pts)**

- **Excelente**: Explica diferencias entre IaaS (EC2), PaaS (RDS), SaaS (Office 365) con ejemplos del ayuntamiento. Justifica elección entre nube pública/privada/híbrida.
- **Aceptable**: Identifica conceptos básicos y da algunos ejemplos correctos.
- **Insuficiente**: Confunde IaaS con SaaS o no entiende diferencias entre modelos de despliegue.

**Arquitectura AWS (20 pts)**

- **Excelente**: Propone EC2+RDS+S3+VPC con justificación técnica. Incluye IAM, grupos de seguridad y considera servicios Big Data si procede.
- **Aceptable**: Identifica servicios principales (EC2, RDS, S3) con explicación básica.
- **Insuficiente**: Servicios inadecuados (ej: DynamoDB para datos relacionales críticos) o sin explicar por qué los elige.

---

## RECURSOS Y MATERIALES

- [Calculadora AWS para estimaciones](https://calculator.aws/)
- [Diagramas de arquitectura](https://aws.amazon.com/architecture/)
- [Casos de éxito en el sector público](https://aws.amazon.com/government-education/case-studies/)
- Draw.io o Lucidchart para diagramas (opcional)


---

## ADAPTACIONES Y EXTENSIONES

### Si sobra tiempo
- Calcular costes reales con calculadora AWS
- Diseñar dashboard de monitorización con CloudWatch
- Considerar servicios de Big Data (EMR, Redshift) para análisis de datos municipales

### Si falta tiempo
- Reducir presentaciones a 2 minutos por equipo
- Simplificar arquitectura a servicios básicos (EC2, RDS, S3)
- Plan de migración en 2 fases en lugar de 3

### Para alumnado avanzado
- Incluir consideraciones de DevOps (CI/CD)
- Diseñar estrategia multi-región para disaster recovery
- Evaluar servicios serverless (Lambda, API Gateway)