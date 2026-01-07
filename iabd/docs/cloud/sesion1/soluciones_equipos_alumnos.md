---
title: Cloud y AWS - MIGRACIÓN A LA NUBE - CASO AYUNTAMIENTO DE ELCHE - SOLUCIONES PROPUESTAS POR EQUIPOS DE ALUMNOS
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# POSIBLES SOLUCIONES PROPUESTAS POR EQUIPOS DE ALUMNOS
## Actividad: Migración a Cloud AWS - Caso Ayuntamiento de Elche

---

## 🏆 EQUIPO 1: "CloudSecure Solutions"
### Miembros: Ana García, Carlos López, María Rodríguez

### 📋 ANÁLISIS DEL CASO
El ciberataque de Elche nos enseña que los sistemas on-premise tradicionales son vulnerables. El ayuntamiento perdió servicios críticos durante días, afectando a más de 250.000 ciudadanos. Identificamos tres problemas principales:

- Falta de backups seguros y aislados
- Sistemas desactualizados sin parches de seguridad
- No había plan de continuidad de negocio

### ☁️ CLASIFICACIÓN DE SERVICIOS CLOUD

| Servicio Municipal | Modelo Cloud | Justificación |
|-------------------|--------------|---------------|
| Web municipal | SaaS | WordPress gestionado o similar |
| Bases de datos ciudadanos | PaaS | RDS gestionado por AWS |
| Servidores aplicaciones | IaaS | EC2 con control total |
| Email corporativo | SaaS | Microsoft 365 o Google Workspace |
| Almacenamiento documentos | PaaS | S3 con lifecycle policies |

**Modelo de despliegue recomendado**: **Cloud Híbrido**

- Datos sensibles (padrón, hacienda) en cloud privado local
- Servicios públicos (web, trámites online) en cloud público AWS
- Conexión segura mediante VPN Site-to-Site

### 🏗️ ARQUITECTURA AWS PROPUESTA

**Servicios principales:**

- **EC2**: t3.medium para aplicaciones web (2 instancias en Multi-AZ)
- **RDS**: MySQL Multi-AZ para bases de datos críticas
- **S3**: Almacenamiento de documentos con versionado
- **CloudFront**: CDN para acelerar web municipal
- **VPC**: Red privada con subredes públicas/privadas
- **IAM**: Control de acceso granular por departamentos
- **WAF**: Protección contra ataques web
- **CloudWatch**: Monitorización 24/7

**Arquitectura de red:**
```
Internet → CloudFront → ALB → EC2 (Multi-AZ) → RDS (Multi-AZ)
                              ↓
                         S3 (Backups)
```

### 📅 PLAN DE MIGRACIÓN (3 FASES - 12 MESES)

**Fase 1 (Meses 1-3): Fundamentos**

- Configurar VPC y conectividad
- Migrar web municipal a EC2
- Implementar backups en S3
- Formar equipo técnico básico

**Fase 2 (Meses 4-8): Aplicaciones críticas**

- Migrar bases de datos a RDS
- Implementar aplicaciones de trámites
- Configurar monitorización y alertas
- Testing exhaustivo

**Fase 3 (Meses 9-12): Optimización**

- Implementar auto-scaling
- Optimizar costes
- Documentación completa
- Plan de disaster recovery

**Coste estimado**: 2.500€/mes (30.000€/año)

---

## 🚀 EQUIPO 2: "InnovaCloud"
### Miembros: David Martín, Laura Sánchez, Pedro Jiménez, Elena Torres

### 📋 ANÁLISIS DEL CASO
El ransomware paralizó Elche porque dependían de infraestructura local sin redundancia. Nuestra propuesta se centra en **resiliencia máxima** y **recuperación rápida**. El ayuntamiento necesita disponibilidad 99.9% mínimo para servicios ciudadanos.

### ☁️ CLASIFICACIÓN DE SERVICIOS CLOUD

**Estrategia**: Maximizar servicios gestionados (PaaS/SaaS) para reducir carga operativa.

| Servicio | Modelo | Solución AWS |
|----------|--------|--------------|
| Portal ciudadano | PaaS | Elastic Beanstalk + RDS |
| Gestión documental | SaaS | WorkDocs + S3 |
| CRM ciudadano | PaaS | Lambda + DynamoDB |
| Backup sistemas | PaaS | AWS Backup automático |
| Monitorización | SaaS | CloudWatch + SNS |

**Modelo de despliegue**: **Cloud Público Multi-Región**

- Región principal: eu-west-1 (Irlanda)
- Región backup: eu-central-1 (Frankfurt)
- Disaster Recovery automático entre regiones

### 🏗️ ARQUITECTURA AWS PROPUESTA

**Enfoque Serverless + Containers:**

- **ECS Fargate**: Aplicaciones containerizadas sin gestión servidores
- **Lambda**: Funciones para trámites automáticos
- **API Gateway**: Punto único entrada APIs
- **DynamoDB**: Base datos NoSQL para alta performance
- **S3**: Almacenamiento con replicación cross-region
- **Route 53**: DNS con health checks automáticos
- **CloudFormation**: Infrastructure as Code

**Innovación**: Chatbot con Amazon Lex para consultas ciudadanas 24/7

### 📅 PLAN DE MIGRACIÓN (AGILE - 9 MESES)

**Sprint 1-3 (Meses 1-3): MVP**

- Desplegar portal básico en Fargate
- Configurar CI/CD con CodePipeline
- Implementar autenticación con Cognito

**Sprint 4-6 (Meses 4-6): Funcionalidades**
- Migrar aplicaciones legacy
- Implementar APIs RESTful
- Testing automatizado

**Sprint 7-9 (Meses 7-9): Optimización**

- Machine Learning para análisis ciudadano
- Optimización costes con Spot Instances
- Documentación y formación

**Coste estimado**: 1.800€/mes (21.600€/año)

---

## 🛡️ EQUIPO 3: "SecureGov"
### Miembros: Roberto Fernández, Carmen Ruiz, Alejandro Moreno

### 📋 ANÁLISIS DEL CASO
El factor crítico fue la **falta de seguridad en capas**. Nuestra solución prioriza cumplimiento normativo (ENS, RGPD) y seguridad Zero Trust. Un ayuntamiento maneja datos muy sensibles que requieren máxima protección.

### ☁️ CLASIFICACIÓN DE SERVICIOS CLOUD

**Principio**: Seguridad por diseño en cada capa.

| Servicio | Modelo | Justificación Seguridad |
|----------|--------|------------------------|
| Aplicaciones web | IaaS | Control total configuración seguridad |
| Bases de datos | PaaS | RDS con cifrado automático |
| Almacenamiento | PaaS | S3 con bucket policies restrictivas |
| Identidad | SaaS | AWS SSO + MFA obligatorio |
| Logs auditoría | PaaS | CloudTrail + Config |

**Modelo de despliegue**: **Cloud Privado Virtual (VPC dedicada)**

- VPC aislada con conexión dedicada (Direct Connect)
- Subredes completamente privadas
- Bastion hosts para acceso administrativo

### 🏗️ ARQUITECTURA AWS PROPUESTA

**Seguridad en capas:**

- **WAF + Shield**: Protección DDoS y aplicaciones
- **GuardDuty**: Detección amenazas con ML
- **Inspector**: Evaluación vulnerabilidades automática
- **KMS**: Gestión claves cifrado centralizada
- **Secrets Manager**: Rotación automática credenciales
- **VPC Flow Logs**: Auditoría completa tráfico red
- **Config**: Compliance automático configuraciones

**Arquitectura de red ultra-segura:**
```
Direct Connect → VGW → Private Subnets → WAF → ALB → EC2
                                        ↓
                                   GuardDuty + Inspector
                                        ↓
                                 CloudTrail + Config
```

### 📅 PLAN DE MIGRACIÓN (SECURITY-FIRST - 15 MESES)

**Fase 1 (Meses 1-5): Fundamentos Seguridad**

- Implementar toda la infraestructura de seguridad
- Configurar logging y monitoring completo
- Certificación ENS Medio
- Formación intensiva equipo

**Fase 2 (Meses 6-10): Migración Controlada**

- Migrar aplicaciones una por una
- Testing seguridad exhaustivo cada paso
- Penetration testing externo
- Documentación compliance

**Fase 3 (Meses 11-15): Operación Segura**

- Monitorización 24/7 con SOC
- Simulacros ciberataques regulares
- Optimización detectores amenazas
- Certificación ENS Alto

**Coste estimado**: 4.200€/mes (50.400€/año)
*Incluye servicios seguridad premium y soporte 24/7*

---

## 💰 EQUIPO 4: "EconoCloud"
### Miembros: Sofía Vega, Miguel Ángel Castro, Lucía Herrera, Javier Ortega

### 📋 ANÁLISIS DEL CASO
Como ayuntamiento con presupuesto limitado, necesitamos **máximo valor con mínima inversión**. El ciberataque costó más que una migración cloud bien planificada. Nuestro enfoque: solución robusta pero económica.

### ☁️ CLASIFICACIÓN DE SERVICIOS CLOUD

**Estrategia**: Aprovechar servicios gratuitos y de bajo coste.

| Servicio | Modelo | Solución Económica |
|----------|--------|--------------------|
| Web municipal | SaaS | WordPress en Lightsail |
| Email | SaaS | WorkMail (más barato que O365) |
| Almacenamiento | PaaS | S3 Standard-IA + Glacier |
| Aplicaciones | IaaS | EC2 t3.micro + Reserved Instances |
| Base datos | PaaS | RDS t3.micro con backup automático |

**Modelo de despliegue**: **Cloud Público con optimización costes**

- Una sola región (eu-west-1) para minimizar transferencias
- Uso intensivo de Reserved Instances (descuento 60%)
- Auto-scaling para pagar solo lo que se usa

### 🏗️ ARQUITECTURA AWS PROPUESTA

**Optimizada para costes:**

- **Lightsail**: VPS simple para web municipal (10$/mes)
- **EC2 t3.micro**: Aplicaciones con burstable performance
- **RDS t3.micro**: Base datos pequeña con Multi-AZ
- **S3 Intelligent Tiering**: Optimización automática costes
- **CloudFront**: Solo para contenido estático
- **Route 53**: DNS básico sin health checks premium

**Innovación low-cost**: 

- Lambda para tareas batch (solo pagar ejecución)
- SES para emails transaccionales (más barato que servicios externos)
- EventBridge para automatizaciones sin servidores

### 📅 PLAN DE MIGRACIÓN (LEAN - 6 MESES)

**Mes 1-2: Quick Wins**

- Migrar web a Lightsail inmediatamente
- Configurar backups S3 (protección básica)
- Email a WorkMail

**Mes 3-4: Aplicaciones Core**

- Migrar base datos a RDS
- Aplicaciones principales a EC2
- Configurar monitorización básica

**Mes 5-6: Optimización**

- Comprar Reserved Instances (ahorro 60%)
- Implementar lifecycle policies S3
- Automatizar tareas con Lambda

**Coste estimado**: 890€/mes (10.680€/año)
*Ahorro del 65% vs otras soluciones manteniendo funcionalidad*

**ROI**: La inversión se recupera en 8 meses comparado con coste del downtime por ciberataque.

---

## 📊 COMPARATIVA DE SOLUCIONES

| Aspecto | CloudSecure | InnovaCloud | SecureGov | EconoCloud |
|---------|-------------|-------------|-----------|------------|
| **Enfoque** | Híbrido equilibrado | Innovación serverless | Seguridad máxima | Coste mínimo |
| **Coste anual** | 30.000€ | 21.600€ | 50.400€ | 10.680€ |
| **Tiempo migración** | 12 meses | 9 meses | 15 meses | 6 meses |
| **Nivel seguridad** | Alto | Medio-Alto | Máximo | Básico-Medio |
| **Complejidad** | Media | Alta | Muy Alta | Baja |
| **Escalabilidad** | Buena | Excelente | Buena | Limitada |

### 🎯 RECOMENDACIÓN FINAL
Para el Ayuntamiento de Elche recomendaríamos **EconoCloud** como punto de partida, evolucionando hacia **CloudSecure** según crezcan necesidades y presupuesto. La clave es empezar rápido con protección básica y mejorar iterativamente.