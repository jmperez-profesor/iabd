---
title: Cloud y AWS - MIGRACIÓN A LA NUBE - CASO AYUNTAMIENTO DE ELCHE (Amazon Q)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# ACTIVIDAD PRÁCTICA: MIGRACIÓN A LA NUBE - CASO AYUNTAMIENTO DE ELCHE

## CONTEXTO DE LA ACTIVIDAD

El Ayuntamiento de Elche sufrió recientemente un ciberataque que dejó prácticamente colapsados todos los sistemas de información, afectando tanto a ciudadanos como a trabajadores municipales. Ante esta situación crítica, el consistorio está valorando migrar parte de sus servicios a la nube, específicamente a Amazon Web Services (AWS), para mejorar la seguridad, disponibilidad y resiliencia de sus sistemas.

## ENUNCIADO PARA EL ALUMNADO

### Situación Actual del Ayuntamiento de Elche

Tras el ciberataque, se ha identificado la siguiente infraestructura crítica afectada:

**Servicios Ciudadanos:**
- Portal web municipal (información, trámites online)
- Sistema de cita previa
- Padrón municipal y censo
- Gestión de multas y sanciones
- Plataforma de participación ciudadana

**Sistemas Internos:**
- Gestión de recursos humanos y nóminas
- Contabilidad y presupuestos
- Gestión de licencias y permisos
- Sistema de expedientes administrativos
- Base de datos de proveedores

**Infraestructura Técnica:**
- Servidores físicos (15 servidores)
- Sistema de copias de seguridad
- Red interna y conectividad
- Sistemas de seguridad y monitorización

### TAREA A REALIZAR

Trabajando en equipos de 3-4 personas, debéis actuar como consultores especializados en Cloud Computing para el Ayuntamiento de Elche. Vuestra misión es:

1. **Análisis de la situación actual** (30 minutos)
   - Identificar los servicios más críticos para migrar
   - Evaluar los riesgos de mantener sistemas on-premise
   - Determinar las ventajas de migrar a AWS

2. **Diseño de la arquitectura cloud** (60 minutos)
   - Proponer qué servicios AWS utilizar para cada necesidad
   - Definir la estrategia de migración (IaaS, PaaS, SaaS)
   - Establecer medidas de seguridad y backup
   - Considerar aspectos de cumplimiento normativo (RGPD)

3. **Presentación de la propuesta** (30 minutos)
   - Cada equipo presenta su solución (5-7 minutos)
   - Justificar las decisiones técnicas tomadas
   - Explicar los beneficios esperados

### ENTREGABLES

1. **Documento técnico** (máximo 3 páginas) que incluya:
   - Análisis de servicios a migrar (priorización)
   - Arquitectura AWS propuesta con diagrama
   - Justificación de servicios AWS seleccionados
   - Plan de migración por fases
   - Medidas de seguridad implementadas

2. **Presentación** (máximo 8 slides) para exponer la solución

### RECURSOS DISPONIBLES

- Documentación teórica sobre Cloud Computing y AWS
- AWS Architecture Center (diagramas de referencia)
- Calculadora de precios de AWS
- Casos de estudio de administraciones públicas

---

## RÚBRICA DE EVALUACIÓN

| Criterio | Excelente (4) | Bueno (3) | Satisfactorio (2) | Insuficiente (1) |
|----------|---------------|-----------|-------------------|------------------|
| **Análisis de la situación** | Identifica correctamente todos los servicios críticos y evalúa riesgos de forma exhaustiva | Identifica la mayoría de servicios críticos con buena evaluación de riesgos | Identifica servicios básicos con evaluación superficial de riesgos | Análisis incompleto o incorrecto |
| **Conocimiento técnico Cloud/AWS** | Demuestra dominio avanzado de conceptos cloud y servicios AWS específicos | Buen conocimiento de conceptos cloud y servicios AWS principales | Conocimiento básico de cloud computing y algunos servicios AWS | Conocimiento limitado o incorrecto |
| **Arquitectura propuesta** | Diseño coherente, escalable y bien justificado con servicios AWS apropiados | Diseño sólido con buena selección de servicios AWS | Diseño básico pero funcional | Diseño incompleto o inadecuado |
| **Seguridad y cumplimiento** | Implementa medidas de seguridad avanzadas y considera RGPD completamente | Buenas medidas de seguridad con consideración del RGPD | Medidas de seguridad básicas | Seguridad insuficiente o no considerada |
| **Plan de migración** | Plan detallado por fases con cronograma realista | Plan estructurado con fases definidas | Plan básico de migración | Plan inexistente o poco realista |
| **Presentación y comunicación** | Presentación clara, profesional y convincente | Buena presentación con argumentos sólidos | Presentación adecuada | Presentación deficiente |

**Puntuación total: ___/24 puntos**

**Calificación:**
- 22-24 puntos: Sobresaliente (9-10)
- 18-21 puntos: Notable (7-8)
- 14-17 puntos: Bien (6-7)
- 10-13 puntos: Suficiente (5-6)
- <10 puntos: Insuficiente (<5)

---

## SOLUCIÓN 1: MIGRACIÓN HÍBRIDA PROGRESIVA

### Análisis Detallado de Prioridades

#### Matriz de Criticidad y Complejidad

| Servicio | Criticidad | Complejidad | Usuarios | Prioridad |
|----------|------------|-------------|----------|-----------|
| Portal web municipal | Alta | Media | 50,000+ | 1 |
| Sistema cita previa | Alta | Baja | 15,000/mes | 1 |
| Gestión multas | Alta | Media | 8,000/mes | 1 |
| Padrón municipal | Media | Alta | 220,000 | 2 |
| Licencias y permisos | Media | Alta | 2,000/mes | 2 |
| Participación ciudadana | Baja | Baja | 1,500/mes | 2 |
| RRHH y nóminas | Media | Alta | 800 empleados | 3 |
| Contabilidad | Alta | Alta | 50 usuarios | 3 |
| Expedientes | Media | Muy Alta | 1,200 usuarios | 3 |

#### Cronograma Detallado por Fases

**FASE 1 - SERVICIOS CRÍTICOS CIUDADANOS (0-3 meses)**

*Mes 1 - Preparación y Fundación:*
- Semana 1-2: Auditoría técnica completa de sistemas actuales
- Semana 3: Configuración AWS Organizations y cuentas (Prod, Dev, Test)
- Semana 4: Implementación VPC multi-AZ con subnets públicas/privadas

*Mes 2 - Portal Web Municipal:*
- Semana 1: Migración base de datos a RDS MySQL Multi-AZ
- Semana 2: Despliegue aplicación web en EC2 con Auto Scaling
- Semana 3: Configuración CloudFront + Route 53 + certificados SSL
- Semana 4: Testing y optimización de rendimiento

*Mes 3 - Sistemas de Citas y Multas:*
- Semana 1-2: Migración sistema cita previa (API REST + base datos)
- Semana 3-4: Migración gestión multas con integración DGT

### Arquitectura AWS Detallada

#### Diagrama de Red y Seguridad

```
┌─────────────────────────────────────────────────────────────┐
│                        AWS CLOUD                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                VPC (10.0.0.0/16)                       ││
│  │  ┌──────────────────┐    ┌──────────────────┐          ││
│  │  │   AZ-1a          │    │   AZ-1b          │          ││
│  │  │ ┌──────────────┐ │    │ ┌──────────────┐ │          ││
│  │  │ │Public Subnet │ │    │ │Public Subnet │ │          ││
│  │  │ │10.0.1.0/24   │ │    │ │10.0.2.0/24   │ │          ││
│  │  │ │              │ │    │ │              │ │          ││
│  │  │ │  ALB         │ │    │ │  ALB         │ │          ││
│  │  │ │  NAT Gateway │ │    │ │  NAT Gateway │ │          ││
│  │  │ └──────────────┘ │    │ └──────────────┘ │          ││
│  │  │ ┌──────────────┐ │    │ ┌──────────────┐ │          ││
│  │  │ │Private Subnet│ │    │ │Private Subnet│ │          ││
│  │  │ │10.0.3.0/24   │ │    │ │10.0.4.0/24   │ │          ││
│  │  │ │              │ │    │ │              │ │          ││
│  │  │ │  EC2 Web     │ │    │ │  EC2 Web     │ │          ││
│  │  │ │  EC2 App     │ │    │ │  EC2 App     │ │          ││
│  │  │ └──────────────┘ │    │ └──────────────┘ │          ││
│  │  │ ┌──────────────┐ │    │ ┌──────────────┐ │          ││
│  │  │ │DB Subnet     │ │    │ │DB Subnet     │ │          ││
│  │  │ │10.0.5.0/24   │ │    │ │10.0.6.0/24   │ │          ││
│  │  │ │              │ │    │ │              │ │          ││
│  │  │ │  RDS Primary │ │    │ │  RDS Standby │ │          ││
│  │  │ └──────────────┘ │    │ └──────────────┘ │          ││
│  │  └──────────────────┘    └──────────────────┘          ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

#### Configuraciones Específicas de Servicios

**1. Amazon EC2 - Servidores de Aplicación**

*Configuración Portal Web:*
```yaml
Instance Type: t3.medium (2 vCPU, 4GB RAM)
AMI: Amazon Linux 2023
Auto Scaling Group:
  Min: 2 instances
  Max: 10 instances
  Desired: 2 instances
  Target Tracking: CPU 70%
Security Groups:
  - HTTP/HTTPS from ALB only
  - SSH from Bastion Host only
User Data Script:
  - Install Apache/Nginx
  - Deploy application code from S3
  - Configure CloudWatch agent
```

*Configuración Aplicaciones Backend:*
```yaml
Instance Type: t3.large (2 vCPU, 8GB RAM)
Auto Scaling Group:
  Min: 2 instances
  Max: 6 instances
  Desired: 2 instances
Load Balancer: Application Load Balancer
Health Checks: /health endpoint
```

**2. Amazon RDS - Base de Datos**

*Configuración Principal:*
```yaml
Engine: MySQL 8.0
Instance Class: db.t3.medium
Multi-AZ: Yes
Storage: 500GB GP3 SSD
Backup Retention: 30 days
Maintenance Window: Sunday 03:00-04:00 UTC
Security Groups:
  - MySQL port 3306 from EC2 security group only
Encryption: Yes (AWS KMS)
Performance Insights: Enabled
```

*Configuración Read Replicas:*
```yaml
Read Replica 1: Same AZ as primary (reporting)
Read Replica 2: Different region (disaster recovery)
```

**3. Amazon S3 - Almacenamiento**

*Buckets Configurados:*
```yaml
ayto-elche-web-assets:
  Purpose: Static web content, images, CSS, JS
  Versioning: Enabled
  Lifecycle: Delete old versions after 90 days
  
ayto-elche-documents:
  Purpose: Citizen documents, PDFs, forms
  Versioning: Enabled
  Encryption: SSE-S3
  Access: Presigned URLs only
  
ayto-elche-backups:
  Purpose: Database and application backups
  Storage Class: IA after 30 days, Glacier after 90 days
  Cross-Region Replication: Madrid region
  
ayto-elche-logs:
  Purpose: Application and access logs
  Lifecycle: Delete after 2 years
```

**4. Amazon CloudFront - CDN**

*Configuración Distribución:*
```yaml
Origins:
  - ALB (dynamic content)
  - S3 (static assets)
Behaviors:
  - /api/* → ALB (no cache)
  - /static/* → S3 (cache 1 year)
  - /* → ALB (cache 1 hour)
Security:
  - WAF Web ACL attached
  - HTTPS redirect
  - Custom SSL certificate
Geo Restrictions: Spain only
```

**5. AWS WAF - Firewall de Aplicaciones**

*Reglas Configuradas:*
```yaml
Rate Limiting:
  - 2000 requests per 5 minutes per IP
  - 100 requests per minute to /login
SQL Injection Protection:
  - Query string inspection
  - Body inspection
XSS Protection:
  - HTML entity decode
  - URL decode
IP Reputation:
  - Block known malicious IPs
  - AWS managed rules
Geographic Blocking:
  - Allow only Spain and EU
Custom Rules:
  - Block common attack patterns
  - Allow only business hours for admin panel
```

#### Configuración de Seguridad Avanzada

**1. AWS IAM - Gestión de Identidades**

*Estructura de Roles:*
```yaml
EC2InstanceRole:
  Policies:
    - S3ReadOnlyAccess (specific buckets)
    - CloudWatchAgentServerPolicy
    - SSMInstanceCore
    
LambdaExecutionRole:
  Policies:
    - VPC access
    - RDS connect
    - SES send email
    
DeveloperRole:
  Policies:
    - EC2 read/write (dev environment only)
    - RDS read (dev databases only)
    - S3 read/write (dev buckets only)
    
AdminRole:
  Policies:
    - PowerUserAccess
    - Billing read access
    MFA Required: Yes
```

*Políticas de Contraseñas:*
```yaml
Password Policy:
  Minimum length: 14 characters
  Require uppercase: Yes
  Require lowercase: Yes
  Require numbers: Yes
  Require symbols: Yes
  Password expiration: 90 days
  Prevent reuse: 12 passwords
```

**2. Amazon VPC - Configuración de Red**

*Network ACLs:*
```yaml
Public Subnet NACL:
  Inbound:
    - HTTP (80) from 0.0.0.0/0
    - HTTPS (443) from 0.0.0.0/0
    - SSH (22) from office IP only
  Outbound:
    - All traffic allowed
    
Private Subnet NACL:
  Inbound:
    - HTTP/HTTPS from public subnets only
    - MySQL (3306) from app subnets only
  Outbound:
    - HTTPS (443) to 0.0.0.0/0
    - MySQL (3306) to DB subnets only
```

*VPC Flow Logs:*
```yaml
Destination: CloudWatch Logs
Traffic Type: ALL
Log Format: Custom (src, dst, port, protocol, action)
Retention: 30 days
```

#### Monitorización y Alertas Detalladas

**1. Amazon CloudWatch - Métricas Personalizadas**

*Dashboards Configurados:*
```yaml
Infrastructure Dashboard:
  - EC2 CPU, Memory, Disk utilization
  - RDS connections, CPU, read/write IOPS
  - ALB request count, latency, error rate
  - CloudFront cache hit ratio, origin latency
  
Application Dashboard:
  - Custom application metrics
  - User session counts
  - Transaction success rates
  - API response times by endpoint
  
Security Dashboard:
  - WAF blocked requests
  - Failed login attempts
  - Unusual traffic patterns
  - Security group changes
```

*Alertas Críticas:*
```yaml
High Priority Alerts:
  - EC2 CPU > 80% for 10 minutes
  - RDS CPU > 80% for 5 minutes
  - ALB 5xx errors > 5% for 5 minutes
  - RDS connection count > 80% of max
  
Medium Priority Alerts:
  - Disk usage > 85%
  - Memory usage > 85%
  - CloudFront 4xx errors > 10%
  - Backup job failures
  
Security Alerts:
  - WAF blocking > 1000 requests/hour
  - Multiple failed logins from same IP
  - Root account usage
  - Security group modifications
```

**2. AWS Config - Compliance Monitoring**

*Reglas de Cumplimiento:*
```yaml
Security Rules:
  - ec2-security-group-attached-to-eni
  - rds-storage-encrypted
  - s3-bucket-ssl-requests-only
  - root-access-key-check
  
Backup Rules:
  - rds-backup-enabled
  - ec2-backup-enabled
  - s3-cross-region-replication-enabled
  
Network Rules:
  - vpc-flow-logs-enabled
  - vpc-default-security-group-closed
  - subnet-auto-assign-public-ip-disabled
```

#### Plan de Migración Detallado

**PREPARACIÓN (Mes 1)**

*Semana 1 - Auditoría y Análisis:*
```yaml
Actividades:
  - Inventario completo de aplicaciones y dependencias
  - Análisis de tráfico y patrones de uso
  - Identificación de datos sensibles y requisitos RGPD
  - Evaluación de integraciones con sistemas externos
  
Entregables:
  - Documento de arquitectura actual
  - Matriz de dependencias
  - Plan de clasificación de datos
  - Análisis de riesgos
```

*Semana 2 - Diseño de Arquitectura:*
```yaml
Actividades:
  - Diseño detallado de VPC y subnets
  - Definición de security groups y NACLs
  - Planificación de estrategia de backup
  - Diseño de monitorización y alertas
  
Entregables:
  - Diagramas de arquitectura AWS
  - Documentación de seguridad
  - Plan de disaster recovery
  - Estimación de costes detallada
```

*Semana 3 - Configuración Base:*
```yaml
Actividades:
  - Creación de cuentas AWS y Organizations
  - Configuración de VPC, subnets, gateways
  - Implementación de security groups base
  - Configuración de IAM roles y políticas
  
Entregables:
  - Infraestructura base desplegada
  - Documentación de configuración
  - Procedimientos de acceso
  - Tests de conectividad
```

*Semana 4 - Preparación de Herramientas:*
```yaml
Actividades:
  - Configuración de pipelines CI/CD
  - Implementación de herramientas de monitorización
  - Configuración de backup automatizado
  - Preparación de entornos de testing
  
Entregables:
  - Pipelines de despliegue funcionales
  - Dashboards de monitorización
  - Procedimientos de backup/restore
  - Entorno de pruebas validado
```

#### Estimación de Costes Detallada

**Costes Mensuales Estimados (EUR):**

```yaml
Compute (EC2):
  - Web servers (2x t3.medium): €60/mes
  - App servers (2x t3.large): €120/mes
  - Bastion host (1x t3.micro): €8/mes
  Total Compute: €188/mes

Storage:
  - RDS MySQL (db.t3.medium, 500GB): €180/mes
  - S3 Standard (1TB): €20/mes
  - S3 IA (2TB): €25/mes
  - EBS volumes (1TB total): €80/mes
  Total Storage: €305/mes

Network:
  - CloudFront (500GB transfer): €40/mes
  - Data transfer out: €30/mes
  - NAT Gateway: €32/mes
  Total Network: €102/mes

Security & Monitoring:
  - WAF requests: €15/mes
  - CloudWatch logs/metrics: €25/mes
  - Config rules: €10/mes
  Total Security: €50/mes

TOTAL MENSUAL: €645/mes
TOTAL ANUAL: €7,740/año
```

**Comparación con Infraestructura Actual:**
```yaml
Costes On-Premise Actuales:
  - Hardware (amortización): €2,000/mes
  - Mantenimiento: €800/mes
  - Personal IT: €3,500/mes
  - Electricidad/Refrigeración: €400/mes
  - Licencias software: €600/mes
  Total On-Premise: €7,300/mes

Ahorro Estimado: €6,655/mes (91% reducción)
ROI: 12 meses
```

---

## SOLUCIÓN 2: MIGRACIÓN CLOUD-NATIVE ACELERADA

### Análisis Estratégico Detallado

#### Filosofía Serverless-First

La estrategia cloud-native prioriza servicios completamente gestionados para eliminar la gestión de infraestructura y maximizar la seguridad, escalabilidad y eficiencia operativa.

**Principios de Diseño:**
1. **Serverless por defecto**: Lambda, API Gateway, DynamoDB
2. **Servicios gestionados**: RDS, ElastiCache, OpenSearch
3. **Automatización completa**: Infrastructure as Code (CloudFormation)
4. **Seguridad integrada**: Cognito, WAF, GuardDuty
5. **Observabilidad nativa**: CloudWatch, X-Ray, EventBridge

#### Matriz de Servicios por Funcionalidad

| Funcionalidad | Servicio AWS | Justificación | SLA |
|---------------|--------------|---------------|-----|
| Autenticación ciudadanos | Amazon Cognito | SAML/OAuth2, MFA integrado | 99.9% |
| APIs públicas | API Gateway + Lambda | Auto-scaling, sin servidores | 99.95% |
| Base datos ciudadanos | DynamoDB | NoSQL, escalado automático | 99.99% |
| Base datos legacy | RDS Aurora Serverless | Compatible SQL, auto-scaling | 99.99% |
| Almacenamiento docs | S3 + CloudFront | CDN global, 11 9s durabilidad | 99.99% |
| Búsqueda documentos | OpenSearch Serverless | Elasticsearch gestionado | 99.9% |
| Notificaciones | SNS + SES | Push, email, SMS | 99.9% |
| Procesamiento batch | Step Functions + Lambda | Orquestación visual | 99.9% |
| Monitorización | CloudWatch + X-Ray | Métricas, trazas, logs | 99.9% |

### Arquitectura Serverless Detallada

#### Diagrama de Arquitectura Cloud-Native

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Web Portal    │  │  Mobile App     │  │  Admin Panel    │ │
│  │   (Amplify)     │  │   (React)       │  │   (React)       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         CDN LAYER                               │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                  CloudFront + WAF                           │ │
│  │  • Global edge locations                                   │ │
│  │  • DDoS protection                                         │ │
│  │  • SSL termination                                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Public APIs    │  │  Internal APIs  │  │  Admin APIs     │ │
│  │ (API Gateway)   │  │ (API Gateway)   │  │ (API Gateway)   │ │
│  │ • Rate limiting │  │ • VPC endpoints │  │ • IAM auth      │ │
│  │ • Caching       │  │ • Private       │  │ • Audit logs    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      COMPUTE LAYER                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Lambda         │  │  Step Functions │  │  ECS Fargate    │ │
│  │  Functions      │  │  Workflows      │  │  (Legacy apps)  │ │
│  │ • Auto-scaling  │  │ • State machine │  │ • Containerized │ │
│  │ • Event-driven  │  │ • Error handling│  │ • Managed       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   DynamoDB      │  │  RDS Aurora     │  │  OpenSearch     │ │
│  │ • NoSQL         │  │ • SQL legacy    │  │ • Full-text     │ │
│  │ • Auto-scaling  │  │ • Serverless    │  │ • Analytics     │ │
│  │ • Global tables │  │ • Multi-AZ      │  │ • Dashboards    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Configuraciones Específicas de Servicios

**1. AWS Amplify - Frontend Hosting**

*Configuración Portal Ciudadano:*
```yaml
Repository: GitHub integration
Build Settings:
  Node.js version: 18
  Build command: npm run build
  Output directory: dist
  
Environment Variables:
  REACT_APP_API_URL: https://api.aytoelche.es
  REACT_APP_COGNITO_USER_POOL: eu-west-1_XXXXXXX
  REACT_APP_COGNITO_CLIENT_ID: XXXXXXXXXXXXXXXXX
  
Custom Domain: portal.aytoelche.es
SSL Certificate: Auto-generated
  
Branch Settings:
  main: Production deployment
  develop: Staging deployment
  feature/*: Preview deployments
  
Performance:
  Compression: Gzip enabled
  Caching: Static assets 1 year, HTML 1 hour
```

**2. Amazon Cognito - Autenticación**

*User Pool Configuración:*
```yaml
User Pool Name: ayto-elche-citizens
Attributes:
  Required: email, phone_number
  Custom: dni, address, birth_date
  
Password Policy:
  Minimum length: 12
  Require uppercase: Yes
  Require lowercase: Yes  
  Require numbers: Yes
  Require symbols: Yes
  
MFA Configuration:
  SMS: Enabled for all users
  TOTP: Optional
  
Account Recovery:
  Email verification: Required
  Phone verification: Optional
  
Lambda Triggers:
  Pre-signup: Validate DNI format
  Post-confirmation: Create user profile in DynamoDB
  Pre-authentication: Check account status
```

*Identity Pool Configuración:*
```yaml
Identity Pool Name: ayto-elche-identity
Authentication Providers:
  - Cognito User Pool
  - SAML (for employees)
  
Roles:
  Authenticated Role: CitizenRole
  Unauthenticated Role: GuestRole (read-only)
  
Role Mappings:
  Citizens: Basic citizen permissions
  Employees: Extended admin permissions
  Admins: Full system access
```

**3. API Gateway - Gestión de APIs**

*API Pública Ciudadanos:*
```yaml
API Type: REST API
Endpoint Type: Regional
  
Resources:
  /appointments:
    GET: List available slots
    POST: Create appointment
    PUT: Modify appointment
    DELETE: Cancel appointment
    
  /documents:
    GET: List citizen documents
    POST: Upload document
    
  /payments:
    GET: List pending payments
    POST: Process payment
    
  /notifications:
    GET: List notifications
    POST: Mark as read

Authorizers:
  Cognito User Pool Authorizer
  
Throttling:
  Rate: 1000 requests/second
  Burst: 2000 requests
  
Caching:
  TTL: 300 seconds for GET requests
  Cache key: User ID + request parameters
  
CORS:
  Origins: https://portal.aytoelche.es
  Methods: GET, POST, PUT, DELETE, OPTIONS
  Headers: Authorization, Content-Type
```

*API Interna Empleados:*
```yaml
API Type: REST API
Endpoint Type: Private (VPC)
  
Resources:
  /citizens:
    GET: Search citizens
    POST: Create citizen record
    PUT: Update citizen data
    
  /licenses:
    GET: List license applications
    POST: Process license
    PUT: Update license status
    
  /reports:
    GET: Generate reports
    POST: Schedule report
    
Authorization: IAM roles
VPC Endpoint: Required
Rate Limiting: 500 req/sec per user
```

**4. AWS Lambda - Funciones Serverless**

*Función: Gestión de Citas*
```python
import json
import boto3
from datetime import datetime, timedelta

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('appointments')

def lambda_handler(event, context):
    """
    Gestiona las citas ciudadanas con validaciones de negocio
    """
    http_method = event['httpMethod']
    
    if http_method == 'GET':
        return get_available_slots(event)
    elif http_method == 'POST':
        return create_appointment(event)
    elif http_method == 'PUT':
        return update_appointment(event)
    elif http_method == 'DELETE':
        return cancel_appointment(event)

def get_available_slots(event):
    """Obtiene slots disponibles para citas"""
    department = event['queryStringParameters'].get('department')
    date = event['queryStringParameters'].get('date')
    
    # Lógica de negocio para slots disponibles
    response = table.query(
        IndexName='department-date-index',
        KeyConditionExpression='department = :dept AND date_slot = :date',
        FilterExpression='is_available = :available',
        ExpressionAttributeValues={
            ':dept': department,
            ':date': date,
            ':available': True
        }
    )
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps(response['Items'])
    }

# Configuración Lambda
Runtime: Python 3.11
Memory: 512 MB
Timeout: 30 seconds
Environment Variables:
  DYNAMODB_TABLE: appointments
  SNS_TOPIC_ARN: arn:aws:sns:eu-west-1:123456789:notifications
VPC: No (public internet access needed)
```

*Función: Procesamiento de Documentos*
```python
import boto3
import json
from PIL import Image
import pytesseract

s3 = boto3.client('s3')
textract = boto3.client('textract')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    """
    Procesa documentos subidos por ciudadanos
    - OCR con Textract
    - Validación de formato
    - Almacenamiento de metadatos
    """
    
    # Triggered by S3 event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    # Extract text using Textract
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        }
    )
    
    # Process extracted text
    extracted_text = ""
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            extracted_text += item['Text'] + "\n"
    
    # Store metadata in DynamoDB
    table = dynamodb.Table('documents')
    table.put_item(
        Item={
            'document_id': key,
            'citizen_id': extract_citizen_id(key),
            'extracted_text': extracted_text,
            'upload_date': datetime.now().isoformat(),
            'status': 'processed'
        }
    )
    
    return {'statusCode': 200}

# Configuración Lambda
Runtime: Python 3.11
Memory: 1024 MB
Timeout: 5 minutes
Layers: PIL, pytesseract
Triggers: S3 bucket events
```

**5. DynamoDB - Base de Datos NoSQL**

*Tabla: Citizens*
```yaml
Table Name: citizens
Partition Key: citizen_id (String)
Sort Key: None

Attributes:
  citizen_id: DNI/NIE
  email: String
  phone: String
  address: Map
  birth_date: String
  status: String (active/inactive)
  created_at: String (ISO timestamp)
  updated_at: String (ISO timestamp)

Global Secondary Indexes:
  email-index:
    Partition Key: email
    Projection: ALL
    
  phone-index:
    Partition Key: phone
    Projection: ALL

Billing Mode: On-Demand
Encryption: AWS managed key
Point-in-time Recovery: Enabled
Streams: Enabled (for audit trail)
```

*Tabla: Appointments*
```yaml
Table Name: appointments
Partition Key: department (String)
Sort Key: date_time (String)

Attributes:
  appointment_id: String (UUID)
  citizen_id: String
  department: String
  date_time: String (ISO timestamp)
  duration: Number (minutes)
  status: String (scheduled/completed/cancelled)
  notes: String
  employee_id: String

Global Secondary Indexes:
  citizen-appointments:
    Partition Key: citizen_id
    Sort Key: date_time
    Projection: ALL
    
  employee-schedule:
    Partition Key: employee_id
    Sort Key: date_time
    Projection: ALL

Local Secondary Indexes:
  department-status:
    Partition Key: department
    Sort Key: status
    Projection: Keys only

Billing Mode: Provisioned
Read Capacity: 100 RCU
Write Capacity: 50 WCU
Auto Scaling: Enabled (10-1000 RCU/WCU)
```

**6. Step Functions - Orquestación de Procesos**

*Workflow: Procesamiento de Licencias*
```json
{
  "Comment": "Workflow para procesamiento automático de licencias",
  "StartAt": "ValidateApplication",
  "States": {
    "ValidateApplication": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:eu-west-1:123456789:function:ValidateLicense",
      "Next": "CheckDocuments",
      "Retry": [
        {
          "ErrorEquals": ["States.TaskFailed"],
          "IntervalSeconds": 2,
          "MaxAttempts": 3,
          "BackoffRate": 2.0
        }
      ]
    },
    "CheckDocuments": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:eu-west-1:123456789:function:CheckDocuments",
      "Next": "DocumentsComplete?"
    },
    "DocumentsComplete?": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.documentsComplete",
          "BooleanEquals": true,
          "Next": "AutoApprovalCheck"
        }
      ],
      "Default": "RequestAdditionalDocs"
    },
    "AutoApprovalCheck": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:eu-west-1:123456789:function:AutoApprovalCheck",
      "Next": "CanAutoApprove?"
    },
    "CanAutoApprove?": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.autoApprove",
          "BooleanEquals": true,
          "Next": "ApproveLicense"
        }
      ],
      "Default": "AssignToEmployee"
    },
    "ApproveLicense": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:eu-west-1:123456789:function:ApproveLicense",
      "Next": "SendApprovalNotification"
    },
    "AssignToEmployee": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:eu-west-1:123456789:function:AssignToEmployee",
      "Next": "WaitForManualReview"
    },
    "WaitForManualReview": {
      "Type": "Wait",
      "Seconds": 86400,
      "Next": "CheckReviewStatus"
    },
    "SendApprovalNotification": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:eu-west-1:123456789:license-notifications",
        "Message.$": "$.approvalMessage"
      },
      "End": true
    }
  }
}
```

**7. Amazon RDS Aurora Serverless - Base de Datos Legacy**

*Configuración Aurora Serverless v2:*
```yaml
Engine: Aurora MySQL 8.0
Serverless Type: v2
Capacity Range:
  Minimum: 0.5 ACU (1GB RAM)
  Maximum: 16 ACU (32GB RAM)
Auto Pause: After 5 minutes of inactivity
  
Database Configuration:
  Database Name: ayto_elche_legacy
  Master Username: admin
  Password: Stored in Secrets Manager
  
Backup Configuration:
  Backup Retention: 35 days
  Backup Window: 03:00-04:00 UTC
  Copy Tags: Yes
  
Monitoring:
  Performance Insights: Enabled (7 days retention)
  Enhanced Monitoring: 60 seconds interval
  
Security:
  VPC Security Groups: database-sg
  Subnet Group: private-db-subnets
  Encryption: Yes (AWS KMS)
  
Migration from On-Premise:
  Tool: AWS DMS (Database Migration Service)
  Source: MySQL 5.7 on-premise
  Migration Type: Full load + CDC
  Validation: Data validation enabled
```

**8. Amazon OpenSearch - Búsqueda y Analytics**

*Configuración OpenSearch Serverless:*
```yaml
Collection Name: ayto-elche-search
Collection Type: Search

Data Sources:
  - DynamoDB streams (citizens, documents)
  - S3 documents (via Lambda indexing)
  - Application logs (via Kinesis Data Firehose)

Index Templates:
  citizens-index:
    Mappings:
      properties:
        citizen_id: keyword
        full_name: text (analyzer: spanish)
        address: text (analyzer: spanish)
        documents: nested
        
  documents-index:
    Mappings:
      properties:
        document_id: keyword
        title: text (analyzer: spanish)
        content: text (analyzer: spanish)
        category: keyword
        upload_date: date
        
Search Features:
  - Full-text search in Spanish
  - Faceted search by category
  - Auto-complete suggestions
  - Fuzzy matching for typos
  
Security:
  Access Policy: IAM-based
  Encryption: In transit and at rest
  VPC Access: Private endpoints only
```

#### Seguridad Avanzada y Cumplimiento

**1. AWS WAF - Protección Avanzada**

*Reglas Personalizadas:*
```yaml
Rate-Based Rules:
  CitizenPortalRateLimit:
    Rate: 2000 requests per 5 minutes
    Scope: IP address
    Action: Block for 10 minutes
    
  APIRateLimit:
    Rate: 1000 requests per minute
    Scope: IP + User-Agent
    Action: Block for 5 minutes
    
  LoginRateLimit:
    Rate: 10 failed attempts per minute
    Scope: IP address
    Action: Block for 30 minutes

Managed Rule Groups:
  - AWSManagedRulesCommonRuleSet
  - AWSManagedRulesKnownBadInputsRuleSet
  - AWSManagedRulesSQLiRuleSet
  - AWSManagedRulesLinuxRuleSet
  - AWSManagedRulesUnixRuleSet

Custom Rules:
  SpanishGeoRestriction:
    Type: GeoMatch
    Countries: [ES]
    Action: Allow
    Priority: 1
    
  BlockSuspiciousUserAgents:
    Type: ByteMatch
    Field: User-Agent
    Patterns: [bot, crawler, scanner]
    Action: Block
    Priority: 2
    
  AllowOnlyBusinessHours:
    Type: TimeRange
    Hours: 08:00-20:00 CET
    Days: Monday-Friday
    Scope: Admin panel only
    Action: Allow admin access only during business hours
```

**2. Amazon GuardDuty - Detección de Amenazas**

*Configuración de Detección:*
```yaml
Threat Intelligence:
  - AWS threat intelligence feeds
  - Custom threat intelligence (Spanish cybersecurity feeds)
  - Malware protection for S3
  
Finding Types Monitored:
  - Backdoor:EC2/C&CActivity.B
  - CryptoCurrency:EC2/BitcoinTool.B
  - Malware:EC2/SuspiciousFile
  - Trojan:EC2/BlackholeTraffic
  - UnauthorizedAPI:IAMUser/InstanceCredentialExfiltration
  
Suppression Rules:
  - Suppress known good IPs (office networks)
  - Suppress scheduled maintenance activities
  - Suppress known false positives
  
Integration:
  - SNS notifications for HIGH severity findings
  - Lambda auto-remediation for specific threats
  - Security Hub for centralized dashboard
```

**3. AWS Config - Compliance Monitoring**

*Reglas de Cumplimiento RGPD:*
```yaml
Data Protection Rules:
  s3-bucket-public-access-prohibited:
    Description: Ensure S3 buckets don't allow public access
    Trigger: Configuration change
    
  rds-storage-encrypted:
    Description: Ensure RDS instances are encrypted
    Trigger: Configuration change
    
  dynamodb-encryption-enabled:
    Description: Ensure DynamoDB tables are encrypted
    Trigger: Configuration change
    
  lambda-function-settings-check:
    Description: Ensure Lambda functions don't have public access
    Trigger: Configuration change

Access Control Rules:
  iam-password-policy:
    Description: Ensure IAM password policy meets requirements
    Parameters:
      RequireUppercaseCharacters: true
      RequireLowercaseCharacters: true
      RequireNumbers: true
      RequireSymbols: true
      MinimumPasswordLength: 14
      
  mfa-enabled-for-iam-console-access:
    Description: Ensure MFA is enabled for console access
    Trigger: Configuration change
    
Audit Rules:
  cloudtrail-enabled:
    Description: Ensure CloudTrail is enabled
    Trigger: Periodic (24 hours)
    
  cloudwatch-log-group-encrypted:
    Description: Ensure CloudWatch log groups are encrypted
    Trigger: Configuration change
```

#### Plan de Migración Acelerada Detallado

**FASE 1 - FUNDACIÓN CLOUD (Mes 1)**

*Semana 1 - Configuración de Cuentas y Seguridad:*
```yaml
Día 1-2: AWS Organizations Setup
  - Crear organization master account
  - Configurar Service Control Policies (SCPs)
  - Establecer billing alerts y budgets
  
Día 3-4: AWS Control Tower Deployment
  - Configurar landing zone
  - Crear cuentas para prod/dev/test
  - Implementar guardrails de seguridad
  
Día 5: IAM y Seguridad Base
  - Configurar roles y políticas base
  - Implementar MFA obligatorio
  - Configurar AWS SSO para empleados
```

*Semana 2 - Infraestructura Base:*
```yaml
Día 1-2: Networking
  - Crear VPC en múltiples AZs
  - Configurar subnets públicas/privadas
  - Implementar VPC endpoints para servicios AWS
  
Día 3-4: Seguridad Perimetral
  - Configurar WAF con reglas base
  - Implementar GuardDuty
  - Configurar Config rules
  
Día 5: Monitorización Base
  - Configurar CloudTrail
  - Implementar CloudWatch dashboards
  - Configurar alertas críticas
```

*Semana 3 - Servicios Core:*
```yaml
Día 1-2: Autenticación
  - Configurar Cognito User Pools
  - Implementar federación SAML para empleados
  - Configurar MFA y políticas de contraseñas
  
Día 3-4: APIs Base
  - Crear API Gateway para servicios públicos
  - Implementar authorizers de Cognito
  - Configurar throttling y caching
  
Día 5: Almacenamiento
  - Configurar buckets S3 con políticas
  - Implementar lifecycle policies
  - Configurar cross-region replication
```

*Semana 4 - Testing y Validación:*
```yaml
Día 1-3: Desarrollo de Funciones Lambda Base
  - Función de autenticación
  - Función de gestión de usuarios
  - Función de logging y auditoría
  
Día 4-5: Testing Integral
  - Tests de seguridad (penetration testing)
  - Tests de rendimiento
  - Validación de compliance RGPD
```

**FASE 2 - SERVICIOS CRÍTICOS (Meses 2-3)**

*Mes 2 - Portal Ciudadano:*
```yaml
Semana 1: Frontend Development
  - Desarrollo React app con Amplify
  - Integración con Cognito
  - Implementación de componentes base
  
Semana 2: APIs Ciudadanas
  - API de gestión de citas
  - API de consulta de documentos
  - API de notificaciones
  
Semana 3: Integración y Testing
  - Integración frontend-backend
  - Tests de usabilidad
  - Tests de accesibilidad (WCAG 2.1)
  
Semana 4: Despliegue y Optimización
  - Despliegue en producción
  - Configuración CDN
  - Optimización de rendimiento
```

*Mes 3 - Servicios Administrativos:*
```yaml
Semana 1-2: Migración de Datos
  - Migración padrón municipal a DynamoDB
  - Migración documentos a S3
  - Configuración de índices de búsqueda
  
Semana 3: Procesos Automatizados
  - Workflow de licencias con Step Functions
  - Automatización de notificaciones
  - Integración con sistemas externos
  
Semana 4: Panel de Administración
  - Desarrollo panel web para empleados
  - Dashboards de métricas
  - Herramientas de gestión
```

#### Análisis de Costes Detallado

**Costes Mensuales Serverless (EUR):**

```yaml
Compute Serverless:
  Lambda Invocations:
    - 10M requests/month: €20
    - Compute time (GB-seconds): €35
  API Gateway:
    - 10M API calls: €35
    - Data transfer: €15
  Step Functions:
    - 100K state transitions: €25
  Total Compute: €130/mes

Storage Serverless:
  DynamoDB On-Demand:
    - 100GB storage: €25
    - 10M read requests: €12.5
    - 5M write requests: €62.5
  S3 Storage:
    - 500GB Standard: €11.5
    - 1TB IA: €12.5
    - Requests: €5
  Total Storage: €128.5/mes

Managed Services:
  RDS Aurora Serverless:
    - Average 2 ACU: €90
  OpenSearch Serverless:
    - 100GB indexed data: €180
  Cognito:
    - 50K MAU: €275
  Total Managed: €545/mes

Security & Monitoring:
  WAF: €20/mes
  GuardDuty: €30/mes
  Config: €15/mes
  CloudWatch: €40/mes
  Total Security: €105/mes

Network & CDN:
  CloudFront: €50/mes
  Data Transfer: €25/mes
  Total Network: €75/mes

TOTAL MENSUAL SERVERLESS: €983.5/mes
TOTAL ANUAL: €11,802/año
```

**Comparación de Costes:**
```yaml
Solución 1 (Híbrida): €7,740/año
Solución 2 (Serverless): €11,802/año
Diferencia: +€4,062/año (+52%)

Justificación del Coste Adicional:
  - Zero server management (ahorro 2 FTE técnicos)
  - Auto-scaling ilimitado
  - 99.99% availability SLA
  - Seguridad avanzada integrada
  - Compliance RGPD automático
  - Disaster recovery automático
  
ROI Calculado:
  Ahorro en personal: €120,000/año (2 técnicos)
  Ahorro en downtime: €50,000/año (estimado)
  Coste adicional cloud: €4,062/año
  ROI neto: €165,938/año
```

### Beneficios Cuantificados

**Técnicos:**
- **Disponibilidad**: 99.99% vs 95% actual (+4.99% uptime)
- **Escalabilidad**: Automática vs manual (0 intervención)
- **Tiempo de despliegue**: 5 minutos vs 2 horas (-96%)
- **Tiempo de recuperación**: 5 minutos vs 4 horas (-95%)

**Operacionales:**
- **Mantenimiento**: 2 horas/mes vs 40 horas/mes (-95%)
- **Actualizaciones**: Automáticas vs manuales
- **Backups**: Automáticos vs manuales
- **Monitorización**: Proactiva vs reactiva

**Seguridad:**
- **Detección de amenazas**: Tiempo real vs manual
- **Compliance**: Automático vs manual
- **Cifrado**: Por defecto vs configuración manual
- **Auditoría**: Completa vs parcial

**Económicos:**
- **CAPEX**: €0 vs €50,000 (hardware)
- **OPEX**: Reducción 60% en costes operativos
- **Escalabilidad**: Coste variable vs fijo
- **ROI**: 12 meses vs 36 meses

---

## RECURSOS ADICIONALES

### Enlaces de Referencia
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Public Sector Solutions](https://aws.amazon.com/government-education/)
- [GDPR Compliance on AWS](https://aws.amazon.com/compliance/gdpr-center/)

### Herramientas de Apoyo
- [AWS Pricing Calculator](https://calculator.aws/)
- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
- [AWS Migration Hub](https://aws.amazon.com/migration-hub/)

### Casos de Estudio Relevantes
- Migración Gobierno de Aragón a AWS
- Transformación digital Ayuntamiento de Madrid
- Modernización servicios públicos Generalitat de Catalunya
