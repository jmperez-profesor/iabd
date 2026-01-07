# ACTIVIDAD PRÁCTICA: MIGRACIÓN A CLOUD AWS
## Caso Real: Ciberataque al Ayuntamiento de Elche

### 📋 INFORMACIÓN GENERAL
- **Duración**: 2 horas
- **Modalidad**: Equipos de 3-4 alumnos
- **Entrega**: Documento final usando plantilla proporcionada

### 🎯 OBJETIVOS DE APRENDIZAJE
Al finalizar esta actividad serás capaz de:
1. Distinguir entre modelos de servicio cloud (IaaS, PaaS, SaaS)
2. Comparar modelos de despliegue (pública, privada, híbrida, multicloud)
3. Identificar servicios clave de AWS para diferentes necesidades
4. Diseñar una arquitectura cloud básica para un caso real
5. Elaborar un plan de migración por fases
6. Trabajar colaborativamente en problemas técnicos complejos

### 📖 CONTEXTO DEL CASO
En marzo de 2022, el Ayuntamiento de Elche sufrió un **ciberataque ransomware** que comprometió gravemente sus sistemas informáticos:

- **Servicios afectados**: Página web municipal, sistemas internos, bases de datos ciudadanas
- **Duración del incidente**: Varios días sin servicios digitales
- **Impacto**: Imposibilidad de realizar trámites online, pérdida de productividad administrativa
- **Respuesta**: Activación de protocolos de emergencia y restauración gradual

**Tu misión**: Diseñar una solución cloud que hubiera prevenido o minimizado este incidente.

### 🏗️ ESTRUCTURA DE LA ACTIVIDAD

#### **BLOQUE 1: Análisis del Caso (30 min)**
**Actividades del equipo:**
- Analizar el impacto del ciberataque
- Identificar vulnerabilidades del sistema on-premise
- Definir requisitos para la nueva solución

**Preguntas guía:**
- ¿Qué servicios críticos se vieron afectados?
- ¿Cómo habría ayudado una infraestructura cloud?
- ¿Qué nivel de disponibilidad necesita un ayuntamiento?

#### **BLOQUE 2: Fundamentos Cloud (25 min)**
**Actividades del equipo:**
- Clasificar servicios municipales según modelo cloud (IaaS/PaaS/SaaS)
- Evaluar modelos de despliegue apropiados
- Justificar decisiones técnicas

**Entregables:**
- Tabla de servicios clasificados por modelo
- Recomendación de modelo de despliegue
- Argumentación de decisiones

#### **BLOQUE 3: Arquitectura AWS (35 min)**
**Actividades del equipo:**
- Seleccionar servicios AWS apropiados
- Diseñar arquitectura de red y seguridad
- Planificar backup y recuperación ante desastres

**Servicios a considerar:**
- **Computación**: EC2, Lambda, ECS
- **Almacenamiento**: S3, EBS, EFS
- **Base de datos**: RDS, DynamoDB
- **Red**: VPC, CloudFront, Route 53
- **Seguridad**: IAM, WAF, Shield

#### **BLOQUE 4: Plan de Migración (20 min)**
**Actividades del equipo:**
- Definir fases de migración
- Estimar tiempos y recursos
- Identificar riesgos y mitigaciones

**Fases sugeridas:**
1. **Fase 1**: Servicios no críticos y backup
2. **Fase 2**: Aplicaciones web y bases de datos
3. **Fase 3**: Sistemas críticos y optimización

#### **BLOQUE 5: Presentaciones (30 min)**
**Formato de presentación:**
- **Duración**: 5 minutos por equipo
- **Contenido**: Solución propuesta y justificación
- **Evaluación**: Por parte del profesor y compañeros

### 📝 ENTREGABLES

#### **Documento Final** (usar plantilla proporcionada)
1. **Análisis del caso** (1 página)
2. **Clasificación de servicios cloud** (1 página)
3. **Arquitectura AWS propuesta** (2 páginas)
4. **Plan de migración** (1 página)
5. **Conclusiones y lecciones aprendidas** (0.5 páginas)

#### **Presentación Oral**
- Resumen ejecutivo de la solución
- Justificación de decisiones clave
- Respuesta a preguntas del profesor

### 🎯 CRITERIOS DE EVALUACIÓN

| **Criterio** | **Puntos** | **Descripción** |
|--------------|------------|-----------------|
| **Comprensión modelos cloud** | 20 | Correcta clasificación IaaS/PaaS/SaaS y modelos de despliegue |
| **Calidad solución propuesta** | 25 | Coherencia, viabilidad técnica y justificación |
| **Arquitectura AWS** | 20 | Selección apropiada de servicios y diseño de red/seguridad |
| **Plan de migración** | 15 | Fases realistas, gestión de riesgos, estimaciones |
| **Trabajo en equipo** | 10 | Participación equilibrada, colaboración efectiva |
| **Presentación** | 10 | Claridad, estructura, manejo del tiempo |
| **TOTAL** | **100** | |

### 🛠️ RECURSOS DISPONIBLES

#### **Herramientas recomendadas:**
- [Calculadora de precios AWS](https://calculator.aws/)
- [Diagramas de arquitectura AWS](https://aws.amazon.com/architecture/)
- Draw.io para diagramas (opcional)

#### **Documentación de referencia:**
- Casos de éxito en sector público
- Guías de mejores prácticas de AWS
- Plantilla de entrega estructurada

### ⚠️ CONSIDERACIONES IMPORTANTES

#### **Restricciones del caso:**
- Presupuesto limitado (ayuntamiento pequeño-mediano)
- Personal técnico con conocimientos básicos
- Necesidad de alta disponibilidad para servicios críticos
- Cumplimiento normativo (RGPD, ENS)

#### **Aspectos a tener en cuenta:**
- **Seguridad**: Cifrado, control de acceso, auditoría
- **Escalabilidad**: Picos de demanda ciudadana
- **Costes**: Optimización y control de gastos
- **Formación**: Capacitación del personal municipal

### 🚀 CONSEJOS PARA EL ÉXITO

1. **Pensad como consultores**: Vuestra solución debe ser práctica y realista
2. **Justificad todas las decisiones**: No hay respuesta única, pero debe estar bien argumentada
3. **Trabajad en equipo**: Repartid tareas y aprovechad las fortalezas de cada miembro
4. **Preguntad dudas**: El profesor está para orientaros durante la actividad
5. **Gestionad el tiempo**: Seguid el cronograma para completar todas las fases

### 📞 SOPORTE DURANTE LA ACTIVIDAD
- **Dudas técnicas**: Consultad al profesor
- **Problemas de equipo**: Comunicad inmediatamente
- **Recursos adicionales**: Disponibles bajo petición

---

**¡Buena suerte! Recordad que estáis resolviendo un problema real que afecta a miles de ciudadanos.**
