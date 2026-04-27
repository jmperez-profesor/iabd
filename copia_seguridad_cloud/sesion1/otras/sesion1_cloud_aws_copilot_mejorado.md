---
title: Cloud y AWS - Migración a AWS tras ciberataque en el Ayuntamiento de Elche (Copilot mejorado)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. Dossier para el docente (Cloud + AWS con caso real). 
---

# Situación de Aprendizaje: Migración a AWS tras ciberataque en el Ayuntamiento de Elche

**Rol del docente:** Arquitecto de Soluciones Cloud (AWS) + Experto en Pedagogía FP  
**Duración total:** 120 minutos (2 horas)  
**Objetivo:** Comprender Cloud y AWS **de forma práctica**, aplicándolo al caso real del **ciberataque por ransomware** que paralizó el Ayuntamiento de **Elche**.

> **Fuentes del caso y verificación**
> - Resumen del ciberataque, paralización operativa y afectación a sede electrónica y nóminas: [Genbeta](https://www.genbeta.com/seguridad/ayuntamiento-elche-paralizado-ciberataque-ransomware-que-no-se-ha-pedido-rescate)  
> - Parada de actividad, rescate millonario y actuaciones policiales: [Antena3](https://www.antena3.com/noticias/sociedad/ciberataque-ayuntamiento-elche-hackers-exigen-rescate-millonario_2025082868b09f1c506ef67d06e55d60.html)  
> - “Red blanca”, 1.500 equipos apagados y 52 infectados; daño en copias de seguridad: [Computing](https://www.computing.es/administracion/elche-levanta-una-red-blanca-tras-el-ciberataque-52-equipos-infectados-1-500-desconectados/)  
> - Recuperación por fases y coordinación estatal/autonómica: [El Español](https://www.elespanol.com/alicante/elche/20250829/ayuntamiento-elche-crea-red-segura-recupera-dias-despues-ciberataque/1003743904837_0.html) y [Esto Es Elche](https://www.estoeselche.es/elche-avanza-en-la-recuperacion-tras-el-ciberataque-que-paralizo-el-ayuntamiento/)

---

## Índice

1. [Resumen Teórico “Just-in-Time”] (15 min) 
2. [Guía de AWS para “No Expertos”]
3. [Actividad Grupal (90 min)](#actividad-grupalca Recomendada)  
5. [Rúbrica de Evaluación]
6. [Cuatro soluciones profesionales+ Estimación de costes]
7. [Plan detallado para la sesión de 2 horas](#plan-detallado-para-la-sesionona para el docente](#por-queografía y recursos)

---

## Resumen Teórico “Just-in-Time” (15 min)

### On‑Premise vs Cloud

**On‑Premise:** infraestructura en el edificio municipal (hardware propio, backups locales, seguridad interna). En Elche, un **ransomware** cifró sistemas y paralizó operaciones, afectando trámites, sede electrónica y nóminas, obligando a apagar hasta **1.500** equipos y reconstruir una **red blanca** para retomar servicios esenciales [(Genbeta)](https://www.genbeta.com/seguridad/ayuntamiento-elche-paralizado-ciberataque-ransomware-que-no-se-ha-pedido-rescate), [(Computing)](https://www.computing.es/administracion/elche-levanta-una-red-blanca-tras-el-ciberataque-52-equipos-infectados-1-500-desconectados/).

**Cloud (AWS):** alquiler de infraestructura profesional y segura.

- **IaaS**: Infraestructura como servicio (EC2, S3).  
- **PaaS**: Plataforma gestionada (RDS, Lambda).  
- **SaaS**: Aplicaciones completas (p. ej. Microsoft 365).

### Modelo de Responsabilidad Compartida (AWS)

- **AWS — “Seguridad de la nube”**: CPDs, hardware, red física.  
- **Ayuntamiento — “Seguridad en la nube”**: IAM, cifrado, configuraciones, backups.

### Conceptos clave

- **Alta disponibilidad (HA):** servicio sigue aunque falle una parte (Multi‑AZ).  
- **Escalabilidad:** crecer según demanda (Auto Scaling, serverless).  
- **Recuperación de Desastres (DR):** restauración desde copias **inmutables** y externas (S3 Object Lock, AWS Backup). En el incidente de Elche, la **afectación de copias** obligó a reconstruir infra en una **red limpia** [(Computing)](https://www.computing.es/administracion/elche-levanta-una-red-blanca-tras-el-ciberataque-52-equipos-infectados-1-500-desconectados/), [(El Español)](https://www.elespanol.com/alicante/elche/20250829/ayuntamiento-elche-crea-red-segura-recupera-dias-despues-ciberataque/1003743904837_0.html).

---

## Guía de AWS para “No Expertos”

### Computación

- **EC2**: servidores virtuales. Útil para “lift & shift” de apps municipales legacy.  
- **Lambda**: funciones sin servidor para automatización y tareas event‑driven.

### Almacenamiento y Backup

- **S3**: almacenamiento seguro; **Object Lock** permite **inmutabilidad** (clave anti‑ransomware).  
- **AWS Backup**: orquestación central de copias (EC2, RDS, EFS), con políticas y retención.

### Bases de Datos

- **RDS (Multi‑AZ)**: base de datos relacional gestionada, backups automáticos y failover.

### Seguridad

- **IAM**: identidades y permisos (MFA, mínimo privilegio).  
- **AWS WAF**: firewall de aplicaciones web contra inyecciones, bots, etc.  
- **AWS Shield**: protección DDoS (recomendable para portales municipales y sede electrónica).

*(Ver hoja de servicios y fichas rápidas en esta sección durante la sesión)*

---

## Actividad Grupal (90 min)

### Fase A — Análisis (30 min)
- ¿Qué falló? (backups afectados, red sin segmentación, dependencia CPD local).  
- ¿Por qué el ransomware paraliza un ayuntamiento entero?  
- ¿Consecuencias? (interrupción trámites, pagos manuales, reputación).  
- ¿Qué medidas preventivas? (copias externas, Zero Trust, nube/híbrido).

> Datos reales para discusión: paralización por ransomware, rescate millonario bajo investigación, 1.500 equipos apagados, “red blanca” para recuperar [(Genbeta)](https://www.genbeta.com/seguridad/ayuntamiento-elche-paralizado-ciberataque-ransomware-que-no-se-ha-pedido-rescate), [(Antena3)](https://www.antena3.com/noticias/sociedad/ciberataque-ayuntamiento-elche-hackers-exigen-rescate-millonario_2025082868b09f1c506ef67d06e55d60.html), [(Computing)](https://www.computing.es/administracion/elche-levanta-una-red-blanca-tras-el-ciberataque-52-equipos-infectados-1-500-desconectados/).

### Fase B — Propuesta (30 min)
- ¿Todo a la nube o híbrido?  
- ¿Qué migrar primero? (sede electrónica, BBDD padrón/censo, backups).  
- ¿Cómo evitar una nueva paralización? (RDS Multi‑AZ, S3 Object Lock, WAF/Shield, IAM con MFA).

### Fase C — Arquitectura (30 min)
- Dibujo orientativo: VPC (subredes públicas/privadas), EC2 en HA, RDS Multi‑AZ, S3 + Backup inmutable, WAF + CloudFront, IAM/MFA, Shield, Client VPN.  
- Preguntas guía: ¿cómo impedir cifrado de copias?, ¿qué ocurre ante fallo AZ?, ¿cómo acceden funcionarios si la red local cae?

---

## Solución Técnica Recomendada

### Objetivo
Evitar la **paralización total** ante futuros ataques; priorizar **continuidad de negocio** (servicio al ciudadano) y **disponibilidad de datos** para analítica/Big Data.

### Arquitectura por capas (resumen)

1. **Red (VPC + segmentación)**: subredes separadas para públicos/privados/backup.  
2. **Computación**: EC2 en **Auto Scaling** y **Multi‑AZ**; Lambda para automatización.  
3. **Almacenamiento y DR**: S3 con **Object Lock** + **AWS Backup** (copias inmutables y replicadas).  
4. **BBDD**: RDS Multi‑AZ (padrón, censo, expedientes, tributos).  
5. **Seguridad**: IAM (MFA), WAF, Shield.  
6. **Acceso interno**: AWS Client VPN para continuidad aunque la red municipal esté caída.

> Ajuste al caso Elche: backups afectados y reconstrucción de “red blanca” → se resuelve con **inmutabilidad** y **replicación**, además de segmentación estricta y servicios gestionados [(Computing)](https://www.computing.es/administracion/elche-levanta-una-red-blanca-tras-el-ciberataque-52-equipos-infectados-1-500-desconectados/), [(Genbeta)](https://www.genbeta.com/seguridad/ayuntamiento-elche-paralizado-ciberataque-ransomware-que-no-se-ha-pedido-rescate).

---

## Rúbrica de Evaluación

| Criterio | 4 – Excelente | 3 – Notable | 2 – Aceptable | 1 – Insuficiente |
|---------|---------------|-------------|---------------|------------------|
| **Trabajo en equipo** | Roles claros, participación equilibrada, colaboración efectiva. | Buena coordinación con pequeñas lagunas. | Participación irregular, dominancia de algunos miembros. | Descoordinación y poca participación. |
| **Justificación técnica** | Qué migrar y por qué; servicios adecuados; relación con fallos del caso (backups, CPD, paralización). | Justificación sólida pero menos profunda. | Decisiones con poca argumentación. | Propuesta incoherente o desconectada del caso. |
| **Seguridad y continuidad** | Domina inmutabilidad, Multi‑AZ, WAF/IAM; explica cómo evitar nueva paralización. | Comprensión buena, con huecos menores. | Conceptos básicos sin integración. | No demuestra comprensión útil. |

**Calificación sugerida:** Total 12 puntos → 11–12 (Sobresaliente), 9–10 (Notable), 6–8 (Aprobado), <6 (Suspenso).

---

## Cuatro soluciones profesionales + Estimación de costes

> **Notas de costes:**  
> - Referencias de reducción de costes y valor de negocio: **The Hackett Group/AWS** (20% menos en infraestructura; +66% productividad; +43% time‑to‑market), y mejores prácticas de control financiero **CFM** en migraciones a gran escala [(eBook)](https://d1.awsstatic.com/psc-digital/2022/gc-mig/business-value-of-migration/Business-Value-of-Migration-eBook-ES-ES.pdf), [(Blog AWS CFM)](https://aws.amazon.com/es/blogs/aws-spanish/como-administro-los-costos-durante-las-migraciones-a-gran-escala/).  
> - Casos de migración completa con ahorros sustanciales (200 servidores, >1M USD acumulados): **NTT DATA** en AWS [(NTT DATA Case Study)](https://mexico.nttdata.com/insights/case-studies/migracion-a-la-cloud-aws-de-una-gran-aseguradora-brasilena).  
> - Los cálculos aquí son **estimaciones docentes** basadas en configuraciones típicas que el alumnado puede reproducir en la **AWS Pricing Calculator** [(Calculator)](https://calculator.aws/) y su documentación [(Docs ejemplos)](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/estimate-examples.html).

### 1) Migración híbrida con servicios críticos en AWS — **~7.600 €/año (estimado)**
- **Servicios**: VPC, EC2 (2×t3.medium HA), RDS Multi‑AZ (db.t3.medium), S3 + Backup (inmutable), WAF + Shield Basic, Client VPN.  
- **Razonamiento**: minimizar riesgo, proteger backups y mantener continuidad.  
- **Respaldo de ahorro**: -20% en infra al migrar a AWS (Hackett Group/AWS) [(eBook)](https://d1.awsstatic.com/psc-digital/2022/gc-mig/business-value-of-migration/Business-Value-of-Migration-eBook-ES-ES.pdf).

### 2) Lift & Shift completo — **~31.600 €/año (estimado)**
- **Servicios**: 10 instancias EC2 mixtas, 2×RDS Multi‑AZ, S3+Glacier+Backup, WAF + **Shield Advanced**.  
- **Razonamiento**: máxima resiliencia y salida del CPD local tras ataque grave.  
- **Respaldo**: caso real de migración de centro de datos (200 servidores) con >1M USD ahorro [(NTT DATA)](https://mexico.nttdata.com/insights/case-studies/migracion-a-la-cloud-aws-de-una-gran-aseguradora-brasilena) + -20% en infra (Hackett) [(eBook)](https://d1.awsstatic.com/psc-digital/2022/gc-mig/business-value-of-migration/Business-Value-of-Migration-eBook-ES-ES.pdf).

### 3) Modernización progresiva (DB gestionada primero) — **~6.800 €/año (estimado)**
- **Servicios**: RDS Multi‑AZ, S3 + Backup inmutable, EC2 mínimos (legacy), WAF.  
- **Razonamiento**: mover datos críticos y asegurar DR; menor esfuerzo inicial.  
- **Respaldo**: prácticas de modernización y HA descritas en experiencias de clientes (7Rs) [(NTT DATA Case)](https://mexico.nttdata.com/insights/case-studies/migracion-a-la-cloud-aws-de-una-gran-aseguradora-brasilena).

### 4) Cloud‑Native con serverless y Zero Trust — **~5.300 €/año (estimado)**
- **Servicios**: Lambda + API Gateway, RDS serverless, S3 + Backup, WAF + Shield Basic.  
- **Razonamiento**: mayor eficiencia y menor superficie de ataque; pagos por uso.  
- **Respaldo**: enfoque CAF y CI/CD; seguridad en capas y automatización [(Prezi CAF)](https://prezi.com/p/oq0p_ejw_05v/migracion-a-la-nube-con-aws-caf-caso-practico/).

> **Comparativa rápida:**
>
> | Solución | Coste anual estimado | Ventaja principal |
> |---------|----------------------:|-------------------|
> | Híbrida | 7.600 € | Minimiza riesgo y permite transición gradual |
> | Lift & Shift | 31.600 € | Máxima resiliencia y salida del CPD local |
> | Modernización | 6.800 € | Protege datos y DR con menos esfuerzo inicial |
> | Cloud‑Native | 5.300 € | Eficiencia, automatización y seguridad por diseño |

---

## Plan detallado para la sesión de 2 horas

**Min 0–15 – Introducción del caso**  
- Proyecta noticias del ciberataque y pregunta:  
  **“¿Cuánto dinero y tiempo pierde la ciudad por cada hora de paro?”**  
  > Apoyo: paralización y rescate millonario bajo investigación [(Antena3)](https://www.antena3.com/noticias/sociedad/ciberataque-ayuntamiento-elche-hackers-exigen-rescate-millonario_2025082868b09f1c506ef67d06e55d60.html), [(Genbeta)](https://www.genbeta.com/seguridad/ayuntamiento-elche-paralizado-ciberataque-ransomware-que-no-se-ha-pedido-rescate).

**Min 15–30 – Hoja de herramientas AWS**  
- Entrega el bloque “Guía de AWS para No Expertos”.

**Min 30–100 – Trabajo por equipos**  
- Fase A: Análisis.  
- Fase B: Propuesta (híbrida, completa, progresiva o cloud‑native).  
- Fase C: Dibujo de arquitectura (Excalidraw/pizarra).

**Min 100–120 – Elevator pitch de cada grupo + cierre**  
- Compara con la **Solución Técnica Recomendada**.  
- Conecta con **continuidad de negocio**: que el ciudadano **no pierda el servicio**.

---

## Por qué este enfoque funciona para el docente

- **Rol doble** (Arquitecto + Pedagogo): asegura rigor técnico y claridad didáctica.  
- **Estructura “Just‑in‑Time”**: se enseña **solo lo necesario** para resolver el problema real de Elche.  
- **Contexto real** con fuentes: los alumnos vinculan **ransomware** y **fallo de backups externos** con soluciones AWS (**S3 Object Lock**, **AWS Backup**).  
- **Hoja de respuestas**: el docente tiene una **arquitectura ideal** para contrastar con propuestas de alumnos.

---

## Bibliografía y recursos

- **Caso Ayuntamiento de Elche (ransomware, paralización, red blanca)**  
  - [Genbeta (26/08/2025)](https://www.genbeta.com/seguridad/ayuntamiento-elche-paralizado-ciberataque-ransomware-que-no-se-ha-pedido-rescate)  
  - [Computing (16/09/2025)](https://www.computing.es/administracion/elche-levanta-una-red-blanca-tras-el-ciberataque-52-equipos-infectados-1-500-desconectados/)  
  - [Antena3 (28/08/2025)](https://www.antena3.com/noticias/sociedad/ciberataque-ayuntamiento-elche-hackers-exigen-rescate-millonario_2025082868b09f1c506ef67d06e55d60.html)  
  - [El Español (29/08/2025)](https://www.elespanol.com/alicante/elche/20250829/ayuntamiento-elche-crea-red-segura-recupera-dias-despues-ciberataque/1003743904837_0.html)  
  - [Esto Es Elche (2025)](https://www.estoeselche.es/elche-avanza-en-la-recuperacion-tras-el-ciberataque-que-paralizo-el-ayuntamiento/)

- **Migración y costes en AWS**  
  - **AWS Pricing Calculator**: [calculator.aws](https://calculator.aws/) — **Documentación**: [estimate examples](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/estimate-examples.html)  
  - **Valor de negocio (Hackett/AWS)**: [eBook ES](https://d1.awsstatic.com/psc-digital/2022/gc-mig/business-value-of-migration/Business-Value-of-Migration-eBook-ES-ES.pdf)  
  - **Gestión financiera en migraciones (CFM)**: [Blog AWS en español](https://aws.amazon.com/es/blogs/aws-spanish/como-administro-los-costos-durante-las-migraciones-a-gran-escala/)  
  - **Caso de migración masiva (NTT DATA)**: [Case Study](https://mexico.nttdata.com/insights/case-studies/migracion-a-la-cloud-aws-de-una-gran-aseguradora-brasilena)

---


