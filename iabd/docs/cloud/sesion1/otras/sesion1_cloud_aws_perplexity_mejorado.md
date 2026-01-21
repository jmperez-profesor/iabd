---
title: Cloud y AWS - Situación de Aprendizaje "Ciberataque al Ayuntamiento de Elche – Migración a AWS" (Preplexity con claude)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. Dossier para el docente (Cloud + AWS con caso real). 
---

# Situación de Aprendizaje: Ciberataque al Ayuntamiento de Elche – Migración a AWS

> **Curso:** Especialización en Inteligencia Artificial y Big Data  
> **Duración:** 1 hora  
> **Caso real:** Ciberataque ransomware al Ayuntamiento de Elche (agosto 2025)

---

## Introducción para el docente

Esta situación de aprendizaje utiliza el caso real del ciberataque al Ayuntamiento de Elche para que el alumnado comprenda, de forma práctica, los conceptos fundamentales de Cloud Computing y Amazon Web Services (AWS). El enfoque es **tomar decisiones** como si fueran consultores técnicos que deben proponer una solución para que el ayuntamiento no vuelva a quedarse sin servicio.

### Fuentes de referencia

- **Apuntes teóricos:**
  - [Cloud computing / computación en la nube](https://aitor-medrano.github.io/iabd/cloud/cloud.html)
  - [Amazon Web Services. Servicios, redes, seguridad](https://aitor-medrano.github.io/iabd/cloud/aws.html)

- **Caso del ciberataque:**
  - [Noticia oficial del Ayuntamiento de Elche](https://www.elche.es/actualidad-ciber-ataque-elche/)
  - [Análisis: 5 lecciones de ciberseguridad](https://www.apdtic.com/ciberataque-ayuntamiento-elche-5-lecciones-ciberseguridad/)

---

## Bloque 1: Resumen Teórico "Just-in-Time" (15 min)

*Explicación ultra-simplificada para transmitir al alumnado antes de la actividad.*

### 1.1 On-premise vs Cloud

| Concepto | On-premise | Cloud |
|----------|------------|-------|
| **Qué es** | Servidores físicos en el edificio del ayuntamiento (CPD propio). | Servidores virtuales en centros de datos de AWS, Azure o Google. |
| **Inversión** | CapEx: comprar hardware por adelantado (servidores, discos, climatización). | OpEx: pagar solo por lo que se usa, cada mes. |
| **Escalabilidad** | Limitada: si necesitas más potencia, compras más hardware (semanas/meses). | Inmediata: en minutos puedes tener más servidores o más almacenamiento. |
| **Mantenimiento** | Responsabilidad total del ayuntamiento (parches, electricidad, seguridad física). | AWS se encarga del hardware; el cliente configura su parte. |
| **Riesgo ante desastres** | Si el CPD se incendia o sufre un ransomware, todo puede caer. | Los datos pueden estar replicados en varias zonas geográficas. |

**Analogía para el aula:**  
> On-premise es como tener tu propia central eléctrica en casa. Cloud es como enchufarte a la red eléctrica: pagas por lo que consumes y no te preocupas de mantener turbinas.

### 1.2 Modelos de servicio: IaaS, PaaS, SaaS

| Modelo | Qué te dan | Qué gestionas tú | Ejemplo en el ayuntamiento |
|--------|------------|------------------|----------------------------|
| **IaaS** (Infraestructura) | Servidores virtuales, red, almacenamiento. | Sistema operativo, aplicaciones, datos. | EC2: máquina virtual para la sede electrónica. |
| **PaaS** (Plataforma) | Todo lo anterior + sistema operativo + herramientas de desarrollo. | Solo tu código y tus datos. | RDS: base de datos gestionada para el padrón. |
| **SaaS** (Software) | Aplicación lista para usar. | Solo tus datos y configuración. | Office 365 para el correo del ayuntamiento. |

**Clave:** Cuanto más "as a Service", menos te preocupas de infraestructura y más te centras en el negocio.

### 1.3 Modelo de Responsabilidad Compartida de AWS

> "AWS protege **la** nube. El cliente protege lo que pone **en** la nube."

| AWS es responsable de... | El cliente (Ayuntamiento) es responsable de... |
|--------------------------|------------------------------------------------|
| Seguridad física de los centros de datos. | Configurar bien los permisos (IAM). |
| Hardware: servidores, discos, red. | Actualizar el sistema operativo de sus máquinas virtuales (EC2). |
| Software de virtualización. | Cifrar los datos sensibles (padrón, tributos). |
| Redundancia eléctrica y de red. | Configurar copias de seguridad y probarlas. |
| Cumplimiento de certificaciones (ISO 27001, ENS...). | Definir quién puede acceder a qué. |

**Implicación para el caso Elche:**  
Si el ayuntamiento hubiera tenido sus backups en S3 con bloqueo de objetos (inmutables), el ransomware no habría podido cifrarlos.

### 1.4 Conceptos clave para la continuidad de negocio

- **Alta disponibilidad:**  
  El servicio sigue funcionando aunque falle un servidor o un centro de datos. AWS lo consigue replicando en varias *Zonas de Disponibilidad* (AZ) dentro de una región.

- **Escalabilidad:**  
  Capacidad de crecer (o reducir) recursos según demanda. Ejemplo: en campaña de impuestos, el portal de tributos necesita más potencia.

- **Recuperación ante desastres (DR):**  
  Plan para restaurar los sistemas tras un fallo grave (ransomware, incendio, terremoto). Incluye:
  - **RTO** (*Recovery Time Objective*): ¿Cuánto tiempo puedo estar caído? (horas, minutos).
  - **RPO** (*Recovery Point Objective*): ¿Cuántos datos puedo perder? (última hora, último día).

**Conexión con el caso Elche:**  
El ayuntamiento estuvo semanas sin servicio porque no tenía un plan de DR efectivo ni backups externos. Con AWS, se puede diseñar para recuperarse en horas o incluso minutos.

---

## Bloque 2: Guía de AWS para "No Expertos"

*Servicios clave explicados en el contexto del ayuntamiento.*

### 2.1 Computación

| Servicio | Para qué sirve | Ejemplo en el ayuntamiento |
|----------|----------------|----------------------------|
| **EC2** (Elastic Compute Cloud) | Máquinas virtuales que puedes crear en minutos. Tú eliges CPU, RAM, SO. | Servidor para la sede electrónica o para aplicaciones internas (padrón, tributos). |
| **Lambda** | Ejecutar código sin gestionar servidores (serverless). Solo pagas cuando se ejecuta. | Procesar automáticamente formularios de cita previa o enviar notificaciones. |

**Diferencia clave:**  
- EC2 → Tienes un servidor 24/7 (pagas siempre).  
- Lambda → Solo pagas cuando alguien usa la función (ideal para picos).

### 2.2 Almacenamiento y Backup

| Servicio | Para qué sirve | Ejemplo en el ayuntamiento |
|----------|----------------|----------------------------|
| **S3** (Simple Storage Service) | Almacenar cualquier cantidad de archivos (documentos, backups, imágenes). Durabilidad del 99,999999999%. | Guardar expedientes digitalizados, copias de seguridad de bases de datos, archivos de la sede electrónica. |
| **AWS Backup** | Gestión centralizada de copias de seguridad de todos los servicios (EC2, RDS, S3...). | Programar backups automáticos diarios de las BBDD del padrón y tributos, con retención de 30 días. |

**Protección anti-ransomware en S3:**
- **Versionado:** Guarda todas las versiones de cada archivo. Si alguien lo cifra, recuperas la versión anterior.
- **Object Lock:** Hace los objetos inmutables durante un periodo. Ni siquiera un admin puede borrarlos.

### 2.3 Bases de Datos

| Servicio | Para qué sirve | Ejemplo en el ayuntamiento |
|----------|----------------|----------------------------|
| **RDS** (Relational Database Service) | Base de datos relacional gestionada (MySQL, PostgreSQL, etc.). AWS se encarga de parches, backups automáticos y replicación. | Base de datos del padrón, tributos, registro de entrada/salida. |

**Ventaja sobre on-premise:**  
Con RDS Multi-AZ, la base de datos se replica automáticamente en otra zona de disponibilidad. Si cae una, la otra toma el relevo en segundos.

### 2.4 Seguridad

| Servicio | Para qué sirve | Ejemplo en el ayuntamiento |
|----------|----------------|----------------------------|
| **IAM** (Identity and Access Management) | Controlar quién puede hacer qué. Usuarios, grupos, roles y políticas de permisos. | Crear un rol "Operador de tributos" que solo puede leer datos de tributos, no modificar el padrón. |
| **AWS WAF** (Web Application Firewall) | Proteger aplicaciones web de ataques comunes (SQL injection, XSS, bots maliciosos). | Filtrar tráfico malicioso antes de que llegue al portal ciudadano. |
| **AWS Shield** | Protección contra ataques DDoS (denegación de servicio). | Evitar que un ataque masivo de tráfico tumbe la sede electrónica. |

**Buenas prácticas IAM:**

- Nunca usar la cuenta root para tareas diarias.
- Activar MFA (autenticación multifactor) en todas las cuentas privilegiadas.
- Principio de mínimo privilegio: dar solo los permisos estrictamente necesarios.

---

## Bloque 3: Diseño de la Actividad Grupal (60 min)

### Organización

- **Grupos:** 3–4 alumnos.

- **Roles sugeridos:**
  - Analista de riesgos.
  - Arquitecto cloud.
  - Responsable de seguridad.
  - Responsable de costes/comunicación.

### Fase A: Análisis – ¿Qué falló? (15 min)

**Contexto para los alumnos:**

> El Ayuntamiento de Elche sufrió un ataque de ransomware en agosto de 2025. Los sistemas quedaron cifrados y los servicios municipales (sede electrónica, padrón, tributos, cita previa, correo interno) estuvieron caídos durante semanas. Las copias de seguridad estaban en el mismo CPD y también fueron afectadas.

**Tarea del grupo:**

1. Leer brevemente el resumen del caso (proporcionado por el docente o en las URLs de referencia).
2. Responder en un post-it o documento compartido:
   - ¿Qué servicios municipales quedaron afectados?
   - ¿Por qué las copias de seguridad no sirvieron?
   - ¿Qué riesgos tiene tener toda la infraestructura en un único CPD?

**Preguntas guía del docente:**

- "Si el ransomware cifró también los backups, ¿dónde estaban esos backups?"
- "¿Qué habría pasado si los backups estuvieran en otro edificio? ¿Y en otra ciudad?"
- "¿Cuánto tiempo puede un ayuntamiento estar sin sede electrónica antes de que sea un problema grave?"

**Producto esperado:**  
Lista de 3–5 vulnerabilidades detectadas en la infraestructura on-premise del ayuntamiento.

---

### Fase B: Propuesta – ¿Qué modelo elegimos? (20 min)

**Tarea del grupo:**

1. Decidir si recomiendan:
   - **Todo a la nube pública (AWS):** máxima flexibilidad, mínima infraestructura local.
   - **Modelo híbrido:** parte en AWS (portal, backups) y parte on-premise (sistemas legacy, datos muy sensibles).
   - **On-premise modernizado:** quedarse en local pero mejorar backups y seguridad.

2. Para cada sistema municipal, indicar dónde iría:

| Sistema | ¿Nube o local? | Justificación breve |
|---------|----------------|---------------------|
| Portal web y sede electrónica | | |
| Base de datos del padrón | | |
| Base de datos de tributos | | |
| Correo y colaboración | | |
| Copias de seguridad | | |
| Aplicaciones legacy muy antiguas | | |

3. Justificar la decisión con al menos 3 argumentos (seguridad, disponibilidad, costes, cumplimiento normativo, dependencia de proveedor...).

**Preguntas guía del docente:**

- "¿Qué pasa si AWS sufre una caída? ¿Cómo os protegéis?"
- "¿Hay datos que por ley no puedan salir de España? ¿AWS tiene región en España?"
- "Si elegís híbrido, ¿cómo conectáis el CPD local con AWS de forma segura?"
- "¿Qué modelo os permite recuperaros más rápido de otro ransomware?"

**Producto esperado:**  
Tabla de decisión + párrafo de justificación (5–8 líneas).

---

### Fase C: Arquitectura – Diseño anti-ransomware (25 min)

**Tarea del grupo:**

Dibujar (en papel, pizarra o herramienta online) un esquema básico de arquitectura en AWS que:

1. Mantenga el portal ciudadano siempre disponible.
2. Proteja las bases de datos del padrón y tributos.
3. Garantice que un ransomware no pueda cifrar los backups.
4. Permita recuperarse en pocas horas si hay un desastre.

**Elementos que deben aparecer (mínimo):**

- VPC con subredes públicas y privadas.
- EC2 o Lambda para aplicaciones.
- RDS Multi-AZ para bases de datos.
- S3 con versionado y Object Lock para backups.
- IAM para control de acceso.
- Al menos un servicio de seguridad (WAF, Shield o ambos).

**Preguntas guía del docente:**

- "¿Dónde ponéis la base de datos, en subred pública o privada? ¿Por qué?"
- "¿Quién puede acceder a los backups en S3? ¿Cómo evitáis que un atacante con credenciales robadas los borre?"
- "Si cae la zona de disponibilidad principal, ¿qué pasa con vuestra base de datos?"
- "¿Cómo sabéis si alguien está intentando atacar el portal? ¿Qué servicio usáis?"

**Producto esperado:**  
Diagrama de arquitectura con los servicios AWS etiquetados y flechas de flujo de datos.

---

## Bloque 4: Solución Técnica Recomendada (Hoja de respuestas para el docente)

### 4.1 Modelo recomendado: Nube híbrida con AWS como nube principal

**Justificación:**

- El ayuntamiento tiene algunas aplicaciones legacy difíciles de migrar a corto plazo.
- Los datos del padrón y tributos son sensibles, pero AWS tiene región en España (eu-south-2) y cumple ENS.
- Los servicios de cara al ciudadano (portal, sede electrónica, cita previa) se benefician de la alta disponibilidad y escalabilidad de AWS.
- Los backups deben estar fuera del CPD local para ser inmunes a ransomware.

### 4.2 Distribución de sistemas

| Sistema | Ubicación | Servicio AWS | Razón |
|---------|-----------|--------------|-------|
| Portal web y sede electrónica | AWS | EC2 en Auto Scaling + ALB | Alta disponibilidad, escala en picos (impuestos, elecciones). |
| Base de datos del padrón | AWS | RDS Multi-AZ (PostgreSQL) | Replicación automática, backups gestionados, cifrado. |
| Base de datos de tributos | AWS | RDS Multi-AZ (PostgreSQL) | Ídem. |
| Documentos y expedientes | AWS | S3 Standard + S3 Glacier | Almacenamiento duradero, clases de coste según antigüedad. |
| Copias de seguridad | AWS | S3 con versionado + Object Lock + AWS Backup | Inmutabilidad: ransomware no puede cifrar ni borrar. |
| Correo y colaboración | SaaS externo (M365/Google) | — | Ya es nube; no requiere gestión de infraestructura. |
| Aplicaciones legacy internas | On-premise (temporal) | — | Se mantienen localmente mientras se modernizan; conectadas a AWS por VPN. |

### 4.3 Arquitectura anti-ransomware


### 4.4 Por qué cada servicio evita que el ayuntamiento se detenga otra vez

| Servicio | Problema que resuelve | Cómo lo resuelve |
|----------|----------------------|------------------|
| **EC2 + Auto Scaling + ALB** | Un servidor cae y el portal deja de funcionar. | Si una instancia falla, el balanceador redirige a otra. Auto Scaling lanza nuevas instancias automáticamente. |
| **RDS Multi-AZ** | La base de datos se corrompe o cae. | AWS mantiene una réplica sincronizada en otra zona de disponibilidad; failover automático en segundos. |
| **S3 con versionado** | El ransomware cifra los archivos. | Se recupera la versión anterior (no cifrada) de cada archivo. |
| **S3 Object Lock** | El atacante borra los backups. | Nadie (ni siquiera un admin) puede borrar objetos durante el periodo de retención. |
| **AWS Backup** | Olvido de hacer copias o copias inconsistentes. | Programación centralizada, políticas de retención, restauración con un clic. |
| **IAM (roles + MFA)** | Un atacante roba credenciales y accede a todo. | Mínimo privilegio: cada usuario/rol solo puede hacer lo estrictamente necesario. MFA añade segunda capa. |
| **WAF + Shield** | Ataques DDoS o inyecciones SQL tumban el portal. | WAF filtra peticiones maliciosas. Shield absorbe tráfico DDoS. |
| **VPC + subredes privadas** | La base de datos es accesible desde Internet. | RDS está en subred privada sin IP pública; solo los frontales pueden conectarse. |
| **Región eu-south-2 (España)** | Preocupación por residencia de datos. | Los datos no salen de España; cumplimiento ENS y GDPR más sencillo. |

### 4.5 Estimación de costes (orden de magnitud)

Para un escenario similar al de un ayuntamiento mediano:

| Recurso | Configuración | Coste aprox. mensual |
|---------|---------------|----------------------|
| EC2 (2 × t3.medium 24/7) | Frontales web | ~80 € |
| RDS Multi-AZ (db.t3.medium, 100 GB) | Padrón + tributos | ~150 € |
| S3 (2 TB Standard + 3 TB archivo) | Documentos + backups | ~80 € |
| AWS Backup | Políticas de retención | ~30 € |
| WAF + Shield Standard | Protección básica | ~30 € |
| Tráfico, CloudWatch, otros | — | ~50 € |
| **Total aproximado** | | **~420 €/mes** |

*Estos valores son orientativos y se pueden recalcular con [AWS Pricing Calculator](https://calculator.aws).*

---

## Bloque 5: Rúbrica de Evaluación

| Criterio | Excelente (9–10) | Aceptable (6–8) | Insuficiente (0–5) | Peso |
|----------|------------------|-----------------|---------------------|------|
| **Trabajo en equipo** | Todos los miembros participan activamente, hay reparto claro de roles y colaboración visible. | Participación desigual o poca evidencia de colaboración, pero el trabajo se entrega completo. | Un solo miembro hace casi todo o el grupo no funciona. | 20% |
| **Análisis del caso (Fase A)** | Identifica correctamente las vulnerabilidades clave (backups locales, único CPD, falta de DR) y las conecta con el impacto real. | Identifica algunas vulnerabilidades pero sin profundidad o sin conectar con el caso. | No identifica vulnerabilidades relevantes o las confunde. | 20% |
| **Justificación de la migración (Fase B)** | Elige un modelo (nube/híbrido/on-prem) con argumentos técnicos sólidos (seguridad, disponibilidad, costes, normativa) y descarta otras opciones razonadamente. | Elige un modelo coherente pero con justificación superficial o incompleta. | Elección arbitraria o sin justificación técnica. | 25% |
| **Diseño de arquitectura (Fase C)** | Diagrama claro con servicios AWS correctos (EC2/RDS/S3/IAM/seguridad), flujo de datos coherente y medidas anti-ransomware evidentes. | Diagrama con algunos servicios correctos pero incompleto o con errores menores de diseño. | Diagrama confuso, servicios incorrectos o ausencia de medidas de seguridad. | 25% |
| **Comprensión de seguridad cloud** | Demuestra entender el modelo de responsabilidad compartida, aplica IAM correctamente y propone medidas contra ransomware (versionado, Object Lock, subredes privadas). | Menciona algunos aspectos de seguridad pero sin aplicarlos bien al caso o con lagunas. | Confusión sobre quién es responsable de qué, o propuestas de seguridad inadecuadas. | 10% |

---

## Anexo: Temporización resumida (1 hora)

| Tiempo | Bloque | Actividad |
|--------|--------|-----------|
| 0–10 min | Introducción | Presentar el caso, formar grupos, asignar roles. |
| 10–15 min | Teoría Just-in-Time | Explicación rápida: on-prem vs cloud, responsabilidad compartida, HA/DR. |
| 15–30 min | Fase A | Análisis: ¿Qué falló en el ayuntamiento? |
| 30–50 min | Fase B + C | Propuesta de modelo + diseño de arquitectura. |
| 50–60 min | Puesta en común | 1–2 grupos exponen (2–3 min). Feedback del docente. |

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

## Recursos adicionales

- [AWS Pricing Calculator](https://calculator.aws) – para que los alumnos estimen costes.
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) – buenas prácticas de arquitectura.
- [Guía CCN-STIC-887 ENS para Landing Zone en AWS](https://aws.amazon.com/blogs/security/ccn-releases-guide-for-spains-ens-landing-zones-using-landing-zone-accelerator-on-aws/) – referencia para cumplimiento ENS.


---


