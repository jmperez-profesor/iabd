---
title: Cloud y AWS - Elche Cloud Move — Actividad de Migración a AWS (Copilot)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Elche Cloud Move — Actividad de Migración a AWS

**Versión descargable en formato Markdown**. Preparado para una sesión de **2 horas** en equipos de **3–4 estudiantes**.

> Basado en los contenidos de: 
> - Cloud computing / computación en la nube (modelos, ventajas, TCO, CapEx/OpEx) — https://aitor-medrano.github.io/iabd/cloud/cloud.html  
> - Amazon Web Services (servicios principales: compute, datos, red, seguridad, gobierno y costes; VPC y responsabilidad compartida) — https://aitor-medrano.github.io/iabd/cloud/aws.html  
> - Arquitecturas cloud y **AWS Well‑Architected Framework (WAF)** — https://aitor-medrano.github.io/iabd/cloud/waf.html

---

## 🧩 Actividad: “Elche Cloud Move: decisión y arquitectura en AWS”
**Duración:** 120 minutos  
**Equipo:** 3–4 estudiantes  
**Contexto:** Tras un ciberataque, el Ayuntamiento de Elche evalúa migrar parte de sus servicios a **AWS** para mejorar **resiliencia, seguridad, escalabilidad y control de costes (OpEx frente a CapEx)**. Los equipos deben **analizar y proponer** qué migrar, por qué y cómo (modelo de despliegue y servicios concretos de AWS).  
**Fuentes clave:** NIST y ventajas/inconvenientes de la nube; modelos IaaS/PaaS/SaaS; pública/privada/híbrida/multicloud; TCO y pago por uso; **VPC**, **IAM**, **responsabilidad compartida** y **WAF**.  
[Referencia 1](https://aitor-medrano.github.io/iabd/cloud/cloud.html) · [Referencia 2](https://aitor-medrano.github.io/iabd/cloud/aws.html) · [Referencia 3](https://aitor-medrano.github.io/iabd/cloud/waf.html)

---

## 📝 Enunciado
Como equipo consultor, entregad una **propuesta técnica** y defendedla al final de la sesión. Debe responder:
1. **Qué cargas migrar vs mantener on‑premise** (criterios: criticidad, exposición pública, compliance, dependencia de legado) y su **clasificación** por **IaaS/PaaS/SaaS** y **pública/privada/híbrida/multicloud**.  
2. **Modelo de despliegue** recomendado (p. ej., **híbrido** con VPN/Direct Connect) y consideraciones de **latencia, cumplimiento y residencia de datos**.  
3. **Servicios de AWS** elegidos (ejemplos: **S3, Glacier, EBS/EFS, EC2/Auto Scaling, ALB, Lambda, Fargate, RDS/Aurora, DynamoDB, CloudFront, Route 53, VPC, IAM, KMS, Shield, Cognito, CloudWatch, CloudTrail, Config, Budgets, Cost Explorer**), con **justificación**.  
4. **Esquema de red y seguridad** (VPC con subredes públicas/privadas, IGW/NAT, SG/NACL; **responsabilidad compartida**).  
5. **Costes y TCO** (CapEx→OpEx; pago por uso; optimizaciones) y **riesgos/mitigaciones**.  
6. **Mini‑diagrama** y **plan por fases** (piloto → ampliación → operación).

> Apoyad las decisiones en las **ventajas de la nube** (alta disponibilidad, elasticidad, escalabilidad, alcance global, agilidad) y en los **pilares WAF** (seguridad, fiabilidad, rendimiento, coste y excelencia operativa).  
> [Cloud](https://aitor-medrano.github.io/iabd/cloud/cloud.html) · [AWS servicios y VPC](https://aitor-medrano.github.io/iabd/cloud/aws.html) · [WAF](https://aitor-medrano.github.io/iabd/cloud/waf.html)

---

## 🎯 Objetivos de aprendizaje
- Aplicar **modelos de servicio y despliegue** a un caso real.  
- Seleccionar y combinar **servicios AWS** en una **arquitectura segura y resiliente**.  
- Valorar **costes y TCO** y **trade‑offs** (latencia, cumplimiento).  
- Comunicar una solución **clara y defendible** usando **AWS WAF**.

---

## ⏱️ Dinámica (120’)
**1) Activación (10’)**: repaso de NIST, ventajas/inconvenientes; IaaS/PaaS/SaaS; pública/privada/híbrida; CapEx/OpEx.  
**2) Análisis del caso (15’)**: inventario de servicios municipales y sensibilidad de datos.  
**3) Diseño (45’)**: decisión de qué migrar; VPC y conectividad; selección de servicios; decisiones WAF.  
**4) Entregables (20’)**: 5–7 diapositivas + diagrama + resumen de costes.  
**5) Presentación (30’)**: defensa 5–7’ + feedback cruzado (1 pregunta por pilar WAF).

---

## 📦 Entregables
- **Documento** (1–2 páginas) con: alcance, arquitectura, seguridad, costes/TCO, riesgos.  
- **Diagrama** (ASCII o imagen) de red/aplicación.  
- **Diapositivas** (5–7) para la defensa.  
- **Cuadro de decisión**: cargas migrables ahora vs más adelante (legado/compliance).

---

## 📊 Rúbrica de evaluación (0–10)
| Criterio | Descripción | Puntos |
|---|---|---|
| **Modelos cloud y despliegue** | Uso correcto de IaaS/PaaS/SaaS; pública/privada/híbrida/multicloud | **0–2** |
| **Selección de cargas migrables** | Justificación técnica y de negocio (resiliencia, exposición, compliance) | **0–2** |
| **Arquitectura AWS** | Coherencia y seguridad: VPC, subredes, SG/NACL, IGW/NAT, balanceadores | **0–2** |
| **Servicios AWS y justificación** | Mapeo claro: compute, datos, front, seguridad, observabilidad | **0–3** |
| **Coste/TCO y riesgos** | OpEx vs CapEx; pago por uso; ventajas/inconvenientes; mitigaciones | **0–1** |

> **Bonus**: **+0,5** por aplicar explícitamente los **pilares WAF** en las decisiones de diseño.  
[WAF](https://aitor-medrano.github.io/iabd/cloud/waf.html)

---

## 🧠 Soluciones ejemplo

### ✅ Solución A — **Híbrida (HA + protección perimetral)**
**Migrar ahora:** portal ciudadano, trámites online, backups, BD de consulta no sensible.  
**Mantener on‑premise (temporalmente):** padrón, gestión económica, aplicaciones legadas.  
**Despliegue:** **Cloud híbrido** con **VPC** (subred pública/privada) + **VPN/Direct Connect** al CPD municipal.  
**Servicios:** **EC2 + ALB + Auto Scaling**, **RDS**, **S3/Glacier**, **CloudFront**, **Route 53**, **IAM/KMS**, **Shield**, **CloudWatch/CloudTrail/Config**, **Budgets/Cost Explorer**.  
**Esquema (ASCII):**
```
Usuarios → CloudFront → ALB → EC2 (Auto Scaling) → RDS (Multi-AZ)
                           ↘ S3 (estático) / S3 Glacier (archivo)
Ayto (CPD) ── VPN/Direct Connect ── VPC (subred privada) ── servicios internos
DNS: Route 53  |  Seguridad: IAM/KMS/Shield  |  Observabilidad: CloudWatch/CloudTrail/Config
```
**Ventajas:** alta disponibilidad, elasticidad y alcance global; reducción de **CapEx** → **OpEx**; separación claro **público/privado**; mitigación DDoS con **CDN** y **Shield**.  
**Riesgos/mitigaciones:** dependencia de conectividad; latencia (optimizar con **CloudFront** y Multi‑AZ); residencia de datos (elegir región, cifrado).  
[Cloud](https://aitor-medrano.github.io/iabd/cloud/cloud.html) · [AWS servicios/VPC](https://aitor-medrano.github.io/iabd/cloud/aws.html)

---

### ✅ Solución B — **Serverless‑first (coste y superficie de ataque)**
**Migrar ahora:** APIs para formularios/trámites, notificaciones al ciudadano, webs informativas estáticas.  
**Despliegue:** **Nube pública AWS** con mínima gestión de servidores.  
**Servicios:** **S3 + CloudFront** (hosting), **API Gateway → Lambda**, **Cognito** (auth), **DynamoDB/Aurora Serverless**, **SNS**; observabilidad con **CloudWatch/CloudTrail** y costes con **Budgets/Cost Explorer**.  
**Esquema (ASCII):**
```
S3 (hosting) + CloudFront → Portal estático
Portal → API Gateway → Lambda → DynamoDB / Aurora Serverless
                      ↘ SNS (notificaciones)
Auth: Cognito | Seguridad: IAM/KMS | Gobierno: CloudWatch/CloudTrail | DNS: Route 53
```
**Ventajas:** pago por ejecución, escalado automático, menor mantenimiento, menor superficie de ataque.  
**Riesgos/mitigaciones:** límites de servicio y *cold starts* (optimizar funciones/provisión), diseño *event‑driven*, identidad robusta (IAM/Cognito).  
[AWS servicios](https://aitor-medrano.github.io/iabd/cloud/aws.html)

---

## 🧰 Plantilla de presentación (Markdown)
Incluye estos apartados en vuestras diapositivas/markdown:
- **Portada**: título, equipo, fecha. *(En versión PPT: insertar logos del IES y Ayuntamiento en las áreas designadas)*
- **Objetivo y alcance**  
- **Roles y responsabilidades** (arquitectura/VPC; datos; seguridad; costes/operación)  
- **Análisis del caso** (servicios públicos vs internos; sensibilidad de datos)  
- **Modelo de servicio y despliegue** (IaaS/PaaS/SaaS; pública/privada/híbrida/multicloud; conectividad)  
- **Arquitectura de red (VPC)** (subred pública/privada; IGW/NAT; SG/NACL; rutas; Multi‑AZ)  
- **Servicios AWS elegidos** (Front/Acceso; Cómputo; Datos; Seguridad/Gobierno; Observabilidad/Costes)  
- **Coste y TCO** (pago por uso; optimizaciones)  
- **Seguridad y responsabilidad compartida**  
- **Decisiones según WAF** (2–3 por pilar)  
- **Riesgos y mitigaciones**  
- **Plan por fases** (Piloto → Fase 2 → Fase 3)

### Inserción de logos (opcional)
Si convertís este markdown a presentación, colocad los logos en la portada y pie de página. En PPT, usad: *Insertar → Imagen*.

---

## 🗒️ Guion de equipo
1. **Equipo y roles** — integrantes y responsabilidades.  
2. **Contexto y objetivos** — resiliencia/seguridad/continuidad.  
3. **Alcance de migración** — qué migra ahora vs on‑premise (justificar).  
4. **Modelo de servicio y despliegue** — IaaS/PaaS/SaaS; pública/privada/híbrida; conectividad (VPN/DC).  
5. **Arquitectura de red (VPC)** — subredes, IGW/NAT, SG/NACL, rutas, Multi‑AZ.  
6. **Servicios AWS seleccionados** — Front/CDN, cómputo, datos, seguridad, observabilidad, DNS.  
7. **Seguridad y responsabilidad compartida** — IAM/KMS, cifrado, MFA, parches, auditoría.  
8. **Coste (TCO) y optimización** — pago por uso, Budgets/Cost Explorer, medidas de optimización.  
9. **Plan por fases y riesgos** — hitos y mitigaciones.  
10. **Diagrama** — incluir ASCII o imagen.

---

## ✅ Checklist de revisión (WAF)
- **Seguridad**: mínimo privilegio (IAM), cifrado en tránsito/reposo (KMS/TLS), trazabilidad (CloudTrail).  
- **Fiabilidad**: Multi‑AZ, backups, pruebas de DR, *health checks*.  
- **Rendimiento**: tipos de instancia adecuados, caché/CDN, uso de *serverless* donde aplique.  
- **Coste**: *right‑sizing*, *schedules*, clases S3, *pay‑per‑use*.  
- **Excelencia operativa**: infraestructura como código, cambios pequeños y reversibles, automatización.  
- **Cumplimiento**: residencia de datos, retención de logs, mínimos legales.

---

## 📚 Referencias (selección)
- **Cloud computing (definición NIST, ventajas, TCO, CapEx/OpEx, modelos de servicio y despliegue)**: https://aitor-medrano.github.io/iabd/cloud/cloud.html  
- **Servicios AWS (compute, data, networking, security, governance, costes) y VPC/responsabilidad compartida**: https://aitor-medrano.github.io/iabd/cloud/aws.html  
- **AWS Well‑Architected Framework (pilares y buenas prácticas)**: https://aitor-medrano.github.io/iabd/cloud/waf.html

---





