# MATERIALES DE APOYO PARA EL PROFESORADO

## PRESENTACIÓN INICIAL (10 minutos)

### Diapositiva 1: Contexto del Ciberataque
**Título**: "Ciberataque al Ayuntamiento de Elche - Caso Real"

**Contenido**:
- **Fecha**: Marzo 2022
- **Tipo**: Ransomware que cifró sistemas críticos
- **Duración**: Varios días sin servicios digitales
- **Impacto**: 
  - Portal web inaccesible
  - Cita previa ciudadana paralizada
  - Sistemas internos (RRHH, contabilidad) bloqueados
  - Comunicación por redes sociales y teléfono únicamente

### Diapositiva 2: Consecuencias del Ataque
- **Ciudadanos**: Imposibilidad de realizar trámites online
- **Empleados**: Trabajo manual, pérdida de productividad
- **Reputación**: Pérdida de confianza en servicios digitales
- **Económico**: Costes de recuperación y pérdida de ingresos

### Diapositiva 3: La Oportunidad Cloud
"¿Y si este ataque hubiera sido la oportunidad perfecta para replantearse toda la infraestructura municipal?"

---

## RECURSOS TÉCNICOS DE REFERENCIA

### Servicios AWS - Hoja de Consulta Rápida

| Servicio | Categoría | Descripción | Caso de Uso Municipal |
|----------|-----------|-------------|----------------------|
| **EC2** | Compute | Servidores virtuales escalables | Portal web, aplicaciones internas |
| **Lambda** | Compute | Funciones serverless | Procesamiento de formularios |
| **RDS** | Database | Base de datos relacional gestionada | Padrón, censo, expedientes |
| **DynamoDB** | Database | Base de datos NoSQL | Sesiones web, logs |
| **S3** | Storage | Almacenamiento de objetos | Documentos, copias de seguridad |
| **VPC** | Network | Red privada virtual | Aislamiento de servicios |
| **IAM** | Security | Gestión de identidades | Control de acceso empleados |
| **CloudWatch** | Monitoring | Monitorización y alertas | Supervisión de servicios |
| **CloudTrail** | Security | Auditoría de acciones | Cumplimiento normativo |
| **WAF** | Security | Firewall de aplicaciones web | Protección contra ataques |

### Modelos de Servicio - Ejemplos Municipales

#### IaaS (Infrastructure as a Service)
- **AWS**: EC2, VPC, EBS
- **Ejemplo municipal**: Migrar servidores físicos a máquinas virtuales en la nube
- **Control**: Alto (SO, aplicaciones, datos)
- **Responsabilidad**: Media-Alta

#### PaaS (Platform as a Service)  
- **AWS**: RDS, Elastic Beanstalk, Lambda
- **Ejemplo municipal**: Base de datos gestionada para el padrón
- **Control**: Medio (aplicaciones, datos)
- **Responsabilidad**: Media

#### SaaS (Software as a Service)
- **Ejemplos**: Office 365, Salesforce, Google Workspace
- **Ejemplo municipal**: Email corporativo, suite ofimática
- **Control**: Bajo (solo datos y configuración)
- **Responsabilidad**: Baja

---

## PREGUNTAS GUÍA DETALLADAS POR BLOQUE

### Bloque 1: Análisis de Criticidad

**Para el profesorado - Lanzar estas preguntas si los equipos se atascan:**

1. **"¿Qué servicios generan ingresos directos al ayuntamiento?"**
   - Multas y sanciones
   - Tasas e impuestos
   - Licencias de actividad

2. **"¿Cuáles afectan a más ciudadanos si fallan?"**
   - Portal web (información general)
   - Cita previa (todos los trámites)
   - Padrón (certificados)

3. **"¿Qué sistemas no pueden esperar ni un día para funcionar?"**
   - Servicios de emergencia
   - Comunicaciones internas
   - Acceso a expedientes urgentes

### Bloque 2: Modelos de Despliegue

**Preguntas para provocar debate:**

1. **"¿Confiarías los datos del padrón a Amazon?"**
   - Explorar percepciones sobre seguridad
   - Discutir compliance y RGPD
   - Comparar con seguridad actual

2. **"¿Qué pasa si se cae AWS en toda Europa?"**
   - Introducir conceptos de multi-región
   - Hablar de SLAs y disponibilidad
   - Comparar con riesgos actuales

3. **"¿Puede el ayuntamiento permitirse un equipo de 5 técnicos cloud?"**
   - Analizar costes de personal
   - Comparar con servicios gestionados
   - Evaluar capacidades internas

### Bloque 3: Arquitectura AWS

**Preguntas técnicas progresivas:**

1. **Nivel básico**: "¿Dónde pondrías la base de datos del padrón?"
   - Guiar hacia RDS vs DynamoDB
   - Discutir SQL vs NoSQL
   - Hablar de backups automáticos

2. **Nivel intermedio**: "¿Cómo evitas que cualquiera acceda a datos sensibles?"
   - Introducir VPC y subnets privadas
   - Explicar Security Groups
   - Mencionar IAM roles

3. **Nivel avanzado**: "¿Cómo sabes si alguien está intentando hackear el sistema?"
   - Introducir CloudTrail
   - Mencionar GuardDuty
   - Hablar de alertas automáticas

---

## EJEMPLOS DE RESPUESTAS ESPERADAS

### Ejemplo de Clasificación de Servicios

**Criticidad ALTA** (migrar primero):
- Portal web municipal → EC2 + RDS + S3
- Sistema cita previa → Lambda + API Gateway + DynamoDB
- Gestión de multas → RDS + EC2

**Criticidad MEDIA** (migrar segundo):
- Padrón municipal → RDS con cifrado + backup cross-region
- Licencias de actividad → Workflow con Step Functions

**Criticidad BAJA** (migrar último):
- Participación ciudadana → Static website en S3
- Archivo histórico → S3 Glacier

### Ejemplo de Arquitectura Básica

```
Internet
    |
[CloudFront CDN]
    |
[Application Load Balancer]
    |
[Auto Scaling Group - EC2 instances]
    |
[RDS MySQL Multi-AZ] + [S3 Buckets]
    |
[VPC con subnets públicas/privadas]
```

**Justificación esperada**:
- CloudFront: Acelera carga del portal web
- ALB: Distribuye tráfico entre servidores
- Auto Scaling: Maneja picos de tráfico automáticamente
- RDS Multi-AZ: Alta disponibilidad para datos críticos
- S3: Almacena documentos con durabilidad 99.999999999%

---

## GESTIÓN DEL TIEMPO Y DINÁMICAS

### Si un Equipo Va Muy Rápido
**Extensiones avanzadas**:
1. "Diseñad un plan de disaster recovery cross-región"
2. "¿Cómo implementaríais CI/CD para actualizaciones automáticas?"
3. "Calculad costes reales con la calculadora de AWS"
4. "¿Qué servicios de Big Data usaríais para analizar patrones ciudadanos?"

### Si un Equipo Va Lento
**Simplificaciones**:
1. Centrarse solo en 3 servicios: EC2, RDS, S3
2. Plan de migración en 2 fases en lugar de 3
3. Proporcionar plantilla pre-rellenada con servicios AWS
4. Permitir trabajo en parejas en lugar de grupos de 4

### Señales de que Necesitan Ayuda
- Llevan >10 minutos sin escribir nada
- Discuten sobre conceptos básicos incorrectos
- Proponen soluciones claramente inviables
- Uno domina y otros no participan

### Intervenciones Sugeridas
1. **Pregunta abierta**: "¿En qué punto estáis? ¿Qué os está costando más?"
2. **Pista indirecta**: "¿Habéis pensado en qué pasaría si...?"
3. **Ejemplo paralelo**: "Imaginad que Netflix quisiera migrar a la nube..."
4. **Redistribución de roles**: "¿Quién puede hacer de arquitecto de seguridad?"

---

## CRITERIOS DE EVALUACIÓN DETALLADOS

### Rúbrica Expandida con Indicadores

#### Comprensión Modelos Cloud (20 puntos)

**Excelente (18-20 puntos)**:
- Explica diferencias claras entre IaaS/PaaS/SaaS con ejemplos municipales específicos
- Justifica elección de modelo de despliegue con al menos 3 criterios técnicos
- Usa terminología técnica correctamente
- Demuestra comprensión de trade-offs (coste vs control vs flexibilidad)

**Aceptable (12-17 puntos)**:
- Identifica conceptos básicos con algunos ejemplos correctos
- Justificación básica del modelo elegido
- Terminología mayormente correcta
- Comprende algunos trade-offs

**Insuficiente (0-11 puntos)**:
- Confunde conceptos fundamentales
- No justifica decisiones o justificación incorrecta
- Terminología incorrecta o ausente
- No comprende implicaciones de las decisiones

#### Arquitectura AWS (20 puntos)

**Excelente (18-20 puntos)**:
- Selecciona servicios AWS apropiados para cada necesidad municipal
- Explica interconexiones entre servicios
- Incluye consideraciones de seguridad (VPC, IAM, Security Groups)
- Menciona monitorización y backup

**Aceptable (12-17 puntos)**:
- Identifica servicios principales (EC2, RDS, S3) correctamente
- Explicación básica de su uso
- Algunas consideraciones de seguridad
- Arquitectura técnicamente viable

**Insuficiente (0-11 puntos)**:
- Servicios inadecuados para las necesidades
- No explica por qué elige cada servicio
- Ignora aspectos de seguridad
- Arquitectura técnicamente inviable

---

## RECURSOS ADICIONALES

### Enlaces de Consulta Rápida
- [Calculadora de precios AWS](https://calculator.aws/)
- [Diagramas de arquitectura AWS](https://aws.amazon.com/architecture/)
- [Casos de éxito sector público](https://aws.amazon.com/government-education/case-studies/)

### Herramientas Recomendadas
- **Draw.io**: Para diagramas de arquitectura
- **GitHub**: Para subir trabajos finales
- **AWS Well-Architected Tool**: Para validar arquitecturas

### Lecturas Complementarias
- Guía de migración a la nube para administraciones públicas
- Casos de estudio de ciberseguridad en el sector público
- Mejores prácticas de AWS para compliance RGPD
