---
title: Cloud y AWS - Proyecto Actividad Práctica: Proyecto Fénix Ilicitano (Gemini pro + notebookLM)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Actividad: Proyecto Fénix Ilicitano - Migración a AWS (Gemini pro + NoteBookLM)

Este documento contiene la planificación completa para una sesión de 2 horas sobre arquitectura Cloud y AWS, basada en un escenario real de recuperación de desastres.

---

## 📅 1. Planificación de la Sesión (2 Horas)

1.  **Introducción y Contexto (15 min):** Presentación del caso real del ciberataque y formación de equipos (3-4 personas).
2.  **Fase de Diseño y Debate (60 min):** Los alumnos, usando los apuntes y la hoja de trucos, diseñan la arquitectura.
3.  **Fase de Defensa "Pitch" (30 min):** Cada grupo tiene 5 minutos para "vender" su solución al CIO del Ayuntamiento (el profesor).
4.  **Feedback y Cierre (15 min):** Análisis de las propuestas y conclusiones.

---

## 📝 2. Enunciado para el Alumnado

### Contexto
El Ayuntamiento de Elche ha sufrido un ciberataque de *ransomware* que ha encriptado servidores locales, paralizando la atención al ciudadano y la gestión interna. El equipo de gobierno ha decidido que mantener toda la infraestructura *on-premise* (en sus propias instalaciones) es un riesgo inasumible.

### Vuestro Rol
Sois un equipo de **Arquitectos de Soluciones Cloud** de una consultora tecnológica. El Ayuntamiento os ha contratado de urgencia.

### El Desafío
Debéis diseñar una propuesta de migración a la nube de **Amazon Web Services (AWS)** para restaurar los servicios críticos y prevenir futuros desastres. No es necesario migrar *todo* (puede ser una arquitectura híbrida), pero sí lo más crítico.

### Requisitos del Cliente

1.  **Alta Disponibilidad y Tolerancia a Fallos:** El sistema no puede volver a caerse por completo si falla un servidor físico.
2.  **Seguridad:** Necesitan blindaje contra ataques DDoS y una gestión estricta de quién accede a qué.
3.  **Almacenamiento Seguro:** Hay terabytes de documentos históricos y expedientes que deben guardarse con una durabilidad extrema, y copias de seguridad que no se tocan a menudo pero deben ser baratas.
4.  **Costes:** El interventor del ayuntamiento quiere dejar de invertir en hardware que se queda obsoleto (CapEx) y pasar a un modelo de pago por uso (OpEx).

### Entregable (Pizarra / Diapositiva)

1.  **Diagrama de Arquitectura:** ¿Qué servicios de AWS usaréis? (Nombrad servicios específicos: EC2, S3, VPC, RDS, etc.).
2.  **Estrategia de Red:** ¿Cómo se conectará el Ayuntamiento a la nube de forma segura?
3.  **Modelo de Responsabilidad:** Explicad al Alcalde de qué será responsable él y de qué AWS en vuestra solución.
4.  **Selección de Región:** ¿Dónde alojaréis los datos y por qué?

---

## 📊 3. Rúbrica de Evaluación

| Criterio | Excelente (25 pts) | Satisfactorio (15 pts) | Mejorable (5 pts) |
| :--- | :--- | :--- | :--- |
| **Selección de Servicios** | Elige la combinación óptima (ej. EC2/Lambda + RDS/DynamoDB) justificando carga de trabajo. | Elige servicios correctos sin justificar claramente por qué esos y no otros. | Confunde servicios (ej. usa S3 para BBDD relacionales). |
| **Almacenamiento y Backup** | Diferencia claramente entre almacenamiento "caliente" (S3) y archivado barato (Glacier). | Usa S3 para todo sin distinguir clases de almacenamiento ni costes. | No propone una solución clara de respaldo. |
| **Seguridad y Redes** | Diseña VPC, subredes, define IAM y menciona protección DDoS (Shield/WAF). | Menciona seguridad general sin especificar herramientas como IAM. | Ignora la configuración de red (VPC) o control de accesos. |
| **Argumentación Cloud** | Argumenta sólidamente usando CapEx/OpEx, escalabilidad y tolerancia a fallos. | Menciona ventajas genéricas sin terminología técnica. | No logra convencer de por qué migrar es mejor que *on-premise*. |

---

## 💡 4. Soluciones Posibles (Guía para el Docente)

### Solución A: Arquitectura Híbrida (Conservadora)

* **Conexión:** VPN o AWS Direct Connect.
* **Datos:** S3 para expedientes activos, Glacier para históricos (ahorro de costes).
* **Web:** EC2 con Auto Scaling para la web pública.
* **Justificación:** Mantiene datos sensibles bajo control legal estricto pero usa la nube para disponibilidad pública y backups.

### Solución B: Modernización "Cloud Native" (Innovadora)

* **Cómputo:** AWS Lambda (Serverless) para trámites (pago por ejecución, no por servidor encendido).
* **Datos:** Amazon RDS para el padrón (gestión automatizada de parches).
* **Resiliencia:** Despliegue en Región España (eu-south-2) usando 2 Zonas de Disponibilidad (Multi-AZ).
* **Seguridad:** AWS CloudTrail para auditoría forense y AWS Shield para DDoS.

---

## 📄 5. Hoja de Trucos: Arquitectos Cloud AWS

*Material de apoyo para el alumnado durante la sesión.*

### Servicios de Almacenamiento
| Servicio | Tipo | Descripción y Uso |
| :--- | :--- | :--- |
| **Amazon S3** | Objetos | Almacenamiento escalable, durabilidad del 99,99...%. [cite_start]Ideal para Data Lakes y backups[cite: 10, 11]. |
| **S3 Glacier** | Archivo | [cite_start]Almacenamiento de muy bajo coste para datos de larga duración y poco acceso[cite: 12]. |
| **Amazon EBS** | Bloques | [cite_start]Discos duros virtuales de alto rendimiento para conectar a instancias EC2[cite: 14]. |
| **Amazon EFS** | Archivos | [cite_start]Sistema de archivos NFS elástico para compartir entre servidores[cite: 17, 18]. |

### Servicios de Cómputo
| Servicio | Tipo | Descripción y Uso |
| :--- | :--- | :--- |
| **Amazon EC2** | IaaS | Máquinas virtuales. Control total del SO. [cite_start]Ideal para servidores tradicionales[cite: 21]. |
| **AWS Lambda** | Serverless | Ejecuta código sin servidores. [cite_start]Solo se paga por tiempo de ejecución[cite: 24, 26]. |
| **Elastic Beanstalk** | PaaS | [cite_start]Despliegue de apps web (Java, PHP) sin gestionar infraestructura[cite: 23]. |

### Bases de Datos
| Servicio | Tipo | Descripción y Uso |
| :--- | :--- | :--- |
| **Amazon RDS** | Relacional | MySQL/PostgreSQL gestionado. [cite_start]Backups y parches automáticos[cite: 33]. |
| **DynamoDB** | NoSQL | [cite_start]Base de datos clave-valor de rendimiento en milisegundos[cite: 36]. |
| **Redshift** | Analytics | [cite_start]Datawarehouse para consultas complejas sobre Big Data[cite: 37]. |

### Redes y Seguridad
| Servicio | Descripción | Importancia para el Ayuntamiento |
| :--- | :--- | :--- |
| **Amazon VPC** | [cite_start]Red privada virtual aislada lógicamente[cite: 40]. | [cite_start]**Obligatorio** para aislar los servidores del acceso público[cite: 81]. |
| **AWS VPN** | [cite_start]Túnel seguro[cite: 47]. | [cite_start]Conecta la oficina física con la nube[cite: 47]. |
| **IAM** | [cite_start]Gestión de Identidad[cite: 48]. | [cite_start]Define quién puede acceder a qué (Usuarios, Grupos, Roles)[cite: 136]. |
| **AWS Shield** | [cite_start]Protección DDoS[cite: 56]. | [cite_start]Protege la web de ataques de denegación de servicio[cite: 56]. |
| **CloudTrail** | [cite_start]Auditoría[cite: 62]. | [cite_start]Registra "quién hizo qué" (seguridad forense)[cite: 63]. |

### Conceptos Clave para el Pitch

* [cite_start]**CapEx vs OpEx:** Cambiar la inversión inicial en hardware (CapEx) por gasto operativo variable según consumo (OpEx)[cite: 237, 239].
* **Regiones y AZ:** Una **Región** (ej. España) tiene varias **Zonas de Disponibilidad (AZ)** aisladas físicamente. [cite_start]Usar 2+ AZ garantiza que si un edificio falla, el servicio sigue[cite: 343, 357].
* [cite_start]**Responsabilidad Compartida:** AWS protege la "nube" (hardware, datacenters); el Ayuntamiento protege lo que está "en la nube" (datos, cifrado, accesos)[cite: 118, 123].

# 🛡️ Hoja de Trucos AWS: Conceptos y Servicios Clave

Este recurso resume los pilares fundamentales de Cloud Computing y los servicios esenciales de Amazon Web Services (AWS) necesarios para el diseño de arquitecturas seguras y escalables.

---

## ☁️ Conceptos Fundamentales de Cloud Computing

### Modelos de Servicio

* **IaaS (Infraestructura como Servicio):** Control total sobre el hardware virtual (servidores, red). Ejemplo: **Amazon EC2**.
* **PaaS (Plataforma como Servicio):** Te centras en el código; la plataforma gestiona el hardware y el SO. Ejemplo: **AWS Elastic Beanstalk**.
* **SaaS (Software como Servicio):** Producto terminado gestionado por el proveedor. Ejemplo: **Dropbox** o **Gmail**.

### Ventajas Financieras

* **CapEx (Capital Expenditure):** Inversión previa en hardware físico. Es un gasto fijo y arriesgado.
* **OpEx (Operational Expenditure):** Gasto operativo basado en el pago por uso. Permite ahorrar costes y ganar agilidad.

---

## 📂 Almacenamiento (Storage)

| Servicio | Tipo | Uso Recomendado |
| :--- | :--- | :--- |
| **Amazon S3** | Objetos | Almacenamiento masivo de archivos (imágenes, documentos, backups). Alta durabilidad. |
| **S3 Glacier** | Archivo | Almacenamiento a muy bajo coste para datos que se consultan raramente (archivo histórico). |
| **Amazon EBS** | Bloques | El "disco duro" para instancias EC2. Ideal para bases de datos instaladas a mano. |
| **Amazon EFS** | Archivos | Sistema de archivos compartido que puede ser montado por varios servidores a la vez. |

---

## ⚡ Computación (Compute)

* **Amazon EC2:** Servidores virtuales con control total sobre el sistema operativo.
* **AWS Lambda (Serverless):** Ejecución de código por eventos sin gestionar servidores. Solo pagas por los milisegundos de ejecución.
* **Elastic Beanstalk:** Herramienta para desplegar y escalar aplicaciones web automáticamente (soporta Java, .NET, PHP, Python, etc.).

---

## 📊 Bases de Datos (Databases)

* **Amazon RDS:** Bases de datos relacionales gestionadas (MySQL, PostgreSQL, SQL Server). AWS se encarga de los parches y backups.
* **Amazon DynamoDB:** Base de datos NoSQL clave-valor de baja latencia para aplicaciones a gran escala.
* **Amazon Redshift:** Almacén de datos (Data Warehouse) para análisis de Big Data y BI.

---

## 🔐 Redes y Seguridad

### Infraestructura Global

* **Región:** Área geográfica física (ej. España). Contiene varias Zonas de Disponibilidad.
* **Zona de Disponibilidad (AZ):** Uno o más centros de datos discretos. Diseñar para "Multi-AZ" garantiza alta disponibilidad.

### Seguridad de Red

* **Amazon VPC:** Tu red privada aislada en la nube. Tú controlas las IPs y subredes.
* **IAM (Identity & Access Management):** Gestión de usuarios y permisos. Principio de "mínimo privilegio".
* **AWS WAF & Shield:** Cortafuegos de aplicaciones web y protección contra ataques de denegación de servicio (DDoS).
* **CloudTrail:** Registro de auditoría. Permite saber qué usuario hizo qué acción en la consola o API.

---

## 🤝 Modelo de Responsabilidad Compartida

1.  **AWS es responsable de la seguridad "DE" la nube:** Hardware, centros de datos, red global, software de virtualización.
2.  **El Cliente es responsable de la seguridad "EN" la nube:** Configuración de firewalls, gestión de identidades (IAM), cifrado de datos y actualizaciones del Sistema Operativo.


