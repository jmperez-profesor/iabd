---
title: Cloud y AWS - Proyecto "Resiliencia Elche Cloud" (Gamini)
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# Actividad: Proyecto "Resiliencia Elche Cloud" 🚀

Este proyecto forma parte del curso de especialización en **IA y Big Data**. El objetivo es aplicar conceptos teóricos de Cloud Computing y servicios de Amazon Web Services (AWS) a un caso de uso real y crítico.

---

## 📝 Contexto del Proyecto
El **Ayuntamiento de Elche** ha sufrido recientemente un ciberataque de tipo *ransomware* que ha colapsado sus sistemas de información. Como equipo de consultoría experta en Cloud, vuestra misión es diseñar una arquitectura en la nube que garantice:
1. **Alta disponibilidad** (que los servicios no se detengan).
2. **Resiliencia** (capacidad de recuperarse ante ataques o fallos).
3. **Seguridad** (protección de los datos de los ciudadanos).

---

## 🛠️ Instrucciones para el Alumnado

La actividad se desarrollará en grupos y tendrá una duración de **120 minutos**.

### Fase 1: Análisis e Inventario (20 min)
Identificad **tres servicios críticos** que el ayuntamiento deba migrar con prioridad (ej. Sede Electrónica, Base de Datos de Empadronamiento, Gestión de Nóminas).

### Fase 2: Selección del Modelo de Servicio (20 min)
Para cada servicio, decidid qué modelo de despliegue es más adecuado basándoos en el **Modelo de Responsabilidad Compartida**:
* **IaaS** (Infraestructura como Servicio).
* **PaaS** (Plataforma como Servicio).
* **SaaS** (Software como Servicio).

### Fase 3: Diseño de Infraestructura Global (30 min)
Diseñad la arquitectura física y lógica:
* **Región:** ¿En qué región de AWS desplegaréis y por qué?
* **Zonas de Disponibilidad (AZ):** ¿Cómo usaréis las AZ para evitar que un fallo físico tumbe el sistema?

### Fase 4: Selección de Stack AWS (30 min)
Elegid al menos **4 servicios de AWS** y explicad su función específica en la solución:
* *Ejemplos:* EC2, S3, RDS, IAM, VPC, CloudFront, Route 53.

### Fase 5: Elevator Pitch (20 min)
Cada equipo expondrá su solución en un máximo de **3 minutos** simulando una reunión con el comité de crisis del Ayuntamiento.

---

## 📊 Rúbrica de Evaluación

| Criterio | Excelente (5) | Adecuado (3) | Insuficiente (1) |
| :--- | :--- | :--- | :--- |
| **Uso de Terminología** | Emplea correctamente términos como Región, AZ, IaaS/PaaS y Responsabilidad Compartida. | Emplea la mayoría de los términos pero con pequeñas imprecisiones. | Confunde conceptos básicos del Cloud. |
| **Arquitectura y Resiliencia** | Propone una solución multi-AZ que garantiza alta disponibilidad real. | La solución es funcional pero depende de un único punto de fallo. | No considera la redundancia geográfica. |
| **Justificación de Servicios** | Selecciona servicios de AWS que encajan perfectamente con las necesidades del caso. | Selecciona servicios adecuados pero no justifica bien su elección. | Los servicios elegidos no resuelven el problema. |
| **Seguridad y Responsabilidad** | Define claramente qué parte de la seguridad gestiona el Ayuntamiento y cuál AWS. | Menciona la seguridad de forma genérica. | No identifica las responsabilidades de seguridad. |

---

## 💡 Soluciones de Referencia (Para el Docente)

### Opción A: Enfoque de Continuidad (Híbrido/IaaS)
* **Estrategia:** Prioriza la rapidez de migración y el control.
* **Servicios clave:** * **Amazon S3:** Para backups inmutables (anti-ransomware).
    * **Amazon EC2:** Servidores espejo listos para arrancar.
    * **VPC:** Red privada para conectar la sede física con la nube de forma segura.

### Opción B: Modernización Nativa (PaaS/SaaS)
* **Estrategia:** Delegar la gestión del hardware y SO a AWS para centrarse en los datos.
* **Servicios clave:** * **Amazon RDS (Multi-AZ):** Bases de datos con replicación automática.
    * **AWS IAM:** Control de accesos estricto bajo el principio de menor privilegio.
    * **Amazon CloudFront:** Protección contra ataques DDoS en la web municipal.

---
*Ficha diseñada para el Módulo de Cloud Computing - Especialización IA y Big Data.*

# 📝 Test de Autoevaluación: Cloud Computing y AWS
**Módulo:** Especialización en IA y Big Data  
**Total de preguntas:** 30  

---

### 1. ¿Cuál es la característica del Cloud Computing que permite ajustar los recursos de forma automática según la demanda?
* a) Agrupamiento de recursos.
* **b) Elasticidad rápida.** (Correcta: Permite escalar recursos horizontal o verticalmente de forma dinámica).
* c) Autoservicio bajo demanda.
* d) Pago por visión.

### 2. Si gestionas el Sistema Operativo pero el proveedor te da el hardware virtual, ¿qué modelo es?
* a) SaaS.
* b) PaaS.
* **c) IaaS.** (Correcta: Infrastructure as a Service te da control sobre el SO).
* d) FaaS.

### 3. En el Modelo de Responsabilidad Compartida, ¿quién es responsable de la seguridad física del centro de datos?
* **a) AWS.** (Correcta: Todo lo referente a la infraestructura global es responsabilidad del proveedor).
* b) El cliente.
* c) Ambos al 50%.
* d) La empresa de seguridad contratada por el cliente.

### 4. ¿Qué es una Zona de Disponibilidad (AZ)?
* a) Un país donde AWS tiene oficinas.
* **b) Uno o más centros de datos discretos con alimentación y conectividad redundante.** (Correcta: Están diseñadas para el aislamiento de fallos).
* c) Un punto de caché para contenido web.
* d) Un tipo de servidor de alto rendimiento.

### 5. ¿Qué servicio de AWS ofrece almacenamiento de objetos con durabilidad del 99,999999999%?
* a) Amazon EBS.
* **b) Amazon S3.** (Correcta: Simple Storage Service es el estándar para almacenamiento de objetos).
* c) Amazon RDS.
* d) Amazon EFS.

### 6. ¿Qué significa que un servicio sea "Serverless"?
* a) Que no usa servidores físicos en ningún lugar.
* **b) Que el usuario no gestiona ni aprovisiona servidores.** (Correcta: El proveedor se encarga de la infraestructura).
* c) Que es un servicio offline.
* d) Que es gratuito.

### 7. ¿Cuál es la función de AWS IAM?
* a) Aumentar la velocidad de la CPU.
* **b) Gestionar el acceso seguro a los servicios y recursos.** (Correcta: Identity and Access Management).
* c) Almacenar archivos de configuración.
* d) Crear bases de datos NoSQL.

### 8. ¿Qué es una Nube Híbrida?
* a) Una nube que funciona con energía solar y eólica.
* **b) Una mezcla de infraestructura propia (on-premise) y nube pública.** (Correcta: Permite conectar ambos entornos).
* c) Una nube compartida por varias universidades.
* d) El uso de dos proveedores de nube pública distintos.

### 9. ¿Para qué sirve Amazon RDS?
* a) Para enviar correos masivos.
* **b) Para gestionar bases de datos relacionales.** (Correcta: Facilita tareas como parches y backups).
* c) Para registrar dominios web.
* d) Para analizar imágenes con IA.

### 10. ¿Qué beneficio económico aporta el Cloud al eliminar la inversión inicial en hardware?
* a) Aumento del CapEx.
* **b) Cambio de CapEx a OpEx.** (Correcta: Pasas de gastos de capital a gastos operativos por uso).
* c) Eliminación total de impuestos.
* d) Reducción del salario de los técnicos.

### 11. ¿Qué es una Región en AWS?
* a) Un centro de datos individual.
* **b) Un área geográfica que contiene dos o más Zonas de Disponibilidad.** (Correcta: Es la unidad geográfica principal).
* c) Un grupo de usuarios con los mismos permisos.
* d) Un límite de facturación por país.

### 12. En PaaS, ¿de qué se olvida normalmente el desarrollador?
* **a) De parchear el Sistema Operativo.** (Correcta: El proveedor gestiona el runtime y el SO).
* b) De escribir el código.
* c) De sus datos.
* d) De pagar la factura.

### 13. ¿Qué servicio permite crear una red virtual aislada en AWS?
* a) Amazon Route 53.
* **b) Amazon VPC.** (Correcta: Virtual Private Cloud).
* c) Amazon Direct Connect.
* d) AWS Snowball.

### 14. ¿Cuál es el objetivo de los Puntos de Presencia (Edge Locations)?
* a) Almacenar copias de seguridad de larga duración.
* **b) Reducir la latencia entregando contenido cerca del usuario.** (Correcta: Se usan con CloudFront).
* c) Ejecutar algoritmos de entrenamiento de IA.
* d) Alojar la base de datos principal.

### 15. ¿Qué modelo es una aplicación como Microsoft 365 o Salesforce?
* a) IaaS.
* b) PaaS.
* **c) SaaS.** (Correcta: Software as a Service).
* d) On-premise.

### 16. ¿Qué define la "Alta Disponibilidad"?
* a) Que el sistema sea el más rápido del mercado.
* **b) Que el sistema sea accesible la mayor parte del tiempo, incluso ante fallos.** (Correcta: Se logra con redundancia).
* c) Que los datos estén cifrados.
* d) Que el soporte técnico atienda en 5 minutos.

### 17. ¿Qué es una AMI (Amazon Machine Image)?
* a) Un tipo de monitor de AWS.
* **b) Una plantilla con el SO y software para lanzar instancias EC2.** (Correcta: Es el "molde" del servidor).
* c) Una foto del centro de datos.
* d) Un servicio de edición de imágenes.

### 18. ¿Cuál es la ventaja de la configuración Multi-AZ en bases de datos?
* a) Que es más barata.
* **b) Resiliencia ante desastres en un centro de datos.** (Correcta: Si falla una zona, la otra toma el control).
* c) Que los datos se borran más rápido.
* d) Que no requiere contraseñas.

### 19. ¿Qué servicio reparte el tráfico entre varios servidores?
* a) Auto Scaling.
* **b) Elastic Load Balancing (ELB).** (Correcta: Distribuye la carga entrante).
* c) Amazon CloudWatch.
* d) AWS Artifact.

### 20. ¿Qué dice el Principio de Menor Privilegio?
* **a) Dar solo los permisos mínimos necesarios para una tarea.** (Correcta: Reduce el riesgo de seguridad).
* b) Dar acceso total a todos los administradores.
* c) No dar permisos a nadie.
* d) Cambiar las contraseñas cada hora.

---

### [NUEVAS] Preguntas de Nivel Avanzado y Servicios Específicos

### 21. ¿Qué servicio permite aumentar o disminuir el número de instancias EC2 automáticamente según el uso de CPU?
* a) Elastic Load Balancing.
* **b) Amazon EC2 Auto Scaling.** (Correcta: Ajusta la capacidad para mantener el rendimiento).
* c) Amazon Lightsail.
* d) AWS Lambda.

### 22. En una base de datos Amazon RDS, ¿quién es responsable de realizar los backups y parches del motor de base de datos?
* **a) AWS.** (Correcta: Es una de las ventajas del modelo PaaS/Gestionado).
* b) El cliente.
* c) El fabricante del motor (ej. Oracle o Microsoft).
* d) Nadie, los backups no son necesarios en la nube.

### 23. ¿Cuál es el factor principal para elegir una Región de AWS específica?
* a) El color de los servidores.
* **b) El cumplimiento legal (soberanía de datos) y la latencia para los usuarios.** (Correcta: Los datos deben estar cerca del usuario o cumplir leyes locales).
* c) La cantidad de ingenieros que trabajan allí.
* d) Siempre se debe elegir la más barata sin importar nada más.

### 24. ¿Cómo deben ser los nombres de los "Buckets" en Amazon S3?
* a) Únicos dentro de una Región.
* **b) Únicos a nivel mundial (globalmente).** (Correcta: No puede haber dos buckets con el mismo nombre en todo AWS).
* c) Pueden repetirse si son de distintas cuentas.
* d) Solo pueden contener números.

### 25. ¿Qué servicio de AWS es una red de entrega de contenido (CDN)?
* a) Amazon VPC.
* b) Amazon Route 53.
* **c) Amazon CloudFront.** (Correcta: Acelera la entrega de contenido estático y dinámico).
* d) Amazon AppStream.

### 26. ¿Cuál es el servicio de computación "Serverless" que ejecuta código en respuesta a eventos?
* a) Amazon EC2.
* **b) AWS Lambda.** (Correcta: Ejecuta código sin gestionar servidores, pagando solo por el tiempo de ejecución).
* c) Amazon Redshift.
* d) AWS WorkSpaces.

### 27. ¿Qué servicio de AWS se usa para monitorizar recursos y aplicaciones, permitiendo crear alarmas?
* a) AWS Config.
* **b) Amazon CloudWatch.** (Correcta: Recopila métricas y registros de casi todos los servicios de AWS).
* c) Amazon CloudTrail.
* d) AWS Trusted Advisor.

### 28. ¿Qué actúa como un firewall virtual para controlar el tráfico entrante y saliente de una instancia EC2?
* a) Network ACL.
* **b) Security Group (Grupo de Seguridad).** (Correcta: Funciona a nivel de instancia/interfaz de red).
* c) AWS WAF.
* d) Route Table.

### 29. ¿Qué servicio de AWS es un sistema de nombres de dominio (DNS) con alta disponibilidad?
* a) Amazon Connect.
* b) Amazon API Gateway.
* **c) Amazon Route 53.** (Correcta: Resuelve nombres de dominio y gestiona el tráfico de red).
* d) AWS Direct Connect.

### 30. ¿Cuál de estos NO es uno de los pilares del "AWS Well-Architected Framework"?
* a) Excelencia Operativa.
* b) Seguridad.
* c) Optimización de Costes.
* **d) Diseño Visual Atractivo.** (Correcta: Los pilares son técnicos y de gestión: Excelencia, Seguridad, Fiabilidad, Rendimiento, Costes y Sostenibilidad).

---
