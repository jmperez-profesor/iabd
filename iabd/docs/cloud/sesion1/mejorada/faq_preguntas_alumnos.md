# FAQ - PREGUNTAS FRECUENTES SOBRE LA ACTIVIDAD
## Migración a Cloud AWS - Caso Ayuntamiento de Elche

### 📋 PREGUNTAS GENERALES SOBRE LA ACTIVIDAD

**1. ¿Cuánto tiempo tenemos exactamente para cada bloque?**
Los tiempos son orientativos: Bloque 1 (30 min), Bloque 2 (25 min), Bloque 3 (35 min), Bloque 4 (20 min), Bloque 5 (30 min). Podéis ajustar ligeramente si necesitáis más tiempo en algún bloque específico.

**2. ¿Podemos usar internet durante la actividad?**
Sí, podéis consultar documentación oficial de AWS, calculadoras de precios y recursos proporcionados. No podéis copiar soluciones completas de otros casos.

**3. ¿Qué pasa si nuestro equipo tiene solo 3 personas en lugar de 4?**
No hay problema. Repartid las tareas de manera equilibrada entre los 3 miembros. La evaluación del trabajo en equipo se adapta al tamaño del grupo.

**4. ¿Es obligatorio usar la plantilla de entrega?**
Sí, es obligatorio. La plantilla asegura que todos los equipos entreguen la información de manera estructurada y facilita la evaluación.

**5. ¿Podemos entregar el trabajo después de la clase?**
El documento final debe entregarse al finalizar la sesión. Las presentaciones son obligatorias y se realizan en clase.

### 🎯 PREGUNTAS SOBRE EL CASO DE ESTUDIO

**6. ¿El ciberataque al Ayuntamiento de Elche fue real?**
Sí, ocurrió en marzo de 2022. Podéis buscar información adicional en medios de comunicación para entender mejor el contexto.

**7. ¿Tenemos que proponer una solución exacta o podemos ser creativos?**
Podéis ser creativos siempre que justifiquéis vuestras decisiones técnicamente. No hay una única solución correcta.

**8. ¿Qué tamaño tiene el Ayuntamiento de Elche aproximadamente?**
Elche tiene unos 230.000 habitantes. Considerad esto para dimensionar la infraestructura y los recursos necesarios.

**9. ¿Debemos asumir que el ayuntamiento no tenía ninguna medida de seguridad?**
No asumáis eso. Tenían medidas básicas, pero no fueron suficientes. Vuestra propuesta debe mejorar significativamente la seguridad.

**10. ¿Podemos proponer soluciones híbridas (cloud + on-premise)?**
Sí, las soluciones híbridas son válidas y a menudo realistas para administraciones públicas. Justificad por qué elegís este enfoque.

### ☁️ PREGUNTAS SOBRE MODELOS CLOUD

**11. ¿Cómo diferenciamos entre IaaS, PaaS y SaaS en servicios municipales?**
IaaS: Infraestructura básica (servidores, redes). PaaS: Plataformas de desarrollo (bases de datos gestionadas). SaaS: Aplicaciones completas (email, office).

**12. ¿Un ayuntamiento puede usar cloud público para datos sensibles?**
Sí, pero debe cumplir normativas como RGPD y ENS. AWS tiene certificaciones de seguridad que lo permiten.

**13. ¿Qué significa "multicloud" en este contexto?**
Usar servicios de múltiples proveedores cloud (AWS + Azure + Google Cloud) para evitar dependencia de un solo proveedor.

**14. ¿Es mejor cloud privado para un ayuntamiento?**
Depende del presupuesto y requisitos. Cloud público suele ser más económico y seguro para ayuntamientos medianos.

**15. ¿Podemos recomendar cloud híbrido como solución principal?**
Sí, es una opción válida. Mantener algunos sistemas críticos on-premise y migrar otros a cloud público.

### 🏗️ PREGUNTAS SOBRE ARQUITECTURA AWS

**16. ¿Qué servicios AWS son imprescindibles para un ayuntamiento?**
EC2 (servidores), RDS (bases de datos), S3 (almacenamiento), VPC (red privada), IAM (seguridad), CloudFront (web).

**17. ¿Necesitamos diseñar la arquitectura de red completa?**
Sí, al menos un diagrama básico con VPC, subredes públicas/privadas, y conexiones principales.

**18. ¿Podemos usar servicios serverless como Lambda?**
Sí, son ideales para funciones específicas como procesamiento de formularios o notificaciones automáticas.

**19. ¿Qué base de datos recomendáis para un ayuntamiento?**
RDS con MySQL o PostgreSQL para aplicaciones tradicionales. DynamoDB para aplicaciones web modernas con alta escalabilidad.

**20. ¿Es necesario incluir CDN (CloudFront) en la solución?**
Recomendable para mejorar el rendimiento de la web municipal, especialmente si hay ciudadanos en diferentes ubicaciones.

### 🔒 PREGUNTAS SOBRE SEGURIDAD

**21. ¿Qué medidas de seguridad son obligatorias?**
Cifrado en tránsito y reposo, autenticación multifactor, copias de seguridad automáticas, monitorización de seguridad.

**22. ¿Cómo protegemos contra futuros ransomware?**
Backups inmutables en S3, segmentación de red, WAF, monitorización con CloudTrail, y plan de recuperación ante desastres.

**23. ¿Qué es IAM y por qué es importante?**
Identity and Access Management. Controla quién puede acceder a qué recursos. Esencial para seguridad en cualquier arquitectura AWS.

**24. ¿Necesitamos cumplir alguna normativa específica?**
Sí, RGPD (protección de datos) y ENS (Esquema Nacional de Seguridad) son obligatorios para administraciones públicas españolas.

**25. ¿Qué es AWS Shield y cuándo lo usamos?**
Protección contra ataques DDoS. Shield Standard es gratuito, Shield Advanced es de pago para protección avanzada.

### 💰 PREGUNTAS SOBRE COSTES

**26. ¿Tenemos que calcular costes exactos?**
No exactos, pero sí estimaciones realistas usando la calculadora de AWS. Considerad el presupuesto limitado de un ayuntamiento.

**27. ¿Qué servicios de AWS son más caros?**
Generalmente EC2 con instancias grandes, transferencia de datos, y servicios premium como Shield Advanced o Support Enterprise.

**28. ¿Cómo optimizamos costes en AWS?**
Instancias reservadas, auto-scaling, S3 Intelligent Tiering, eliminar recursos no utilizados, monitorización de costes.

**29. ¿Es más barato que mantener infraestructura propia?**
Generalmente sí para organizaciones medianas, especialmente considerando personal, mantenimiento, actualizaciones y seguridad.

**30. ¿Podemos usar servicios gratuitos de AWS?**
Sí, hay un tier gratuito, pero para un ayuntamiento real necesitaréis servicios de pago para garantizar disponibilidad y soporte.

### 📋 PREGUNTAS SOBRE MIGRACIÓN

**31. ¿Cuánto tiempo debería durar la migración completa?**
Entre 6-18 meses dependiendo de la complejidad. Fase 1: 2-3 meses, Fase 2: 3-6 meses, Fase 3: 3-9 meses.

**32. ¿Qué migramos primero?**
Servicios no críticos (web informativa, backups), luego aplicaciones principales, finalmente sistemas críticos.

**33. ¿Cómo minimizamos el downtime durante la migración?**
Migración por fases, horarios de baja actividad, sistemas paralelos temporales, rollback plans.

**34. ¿Qué riesgos principales debemos considerar?**
Pérdida de datos, downtime prolongado, problemas de compatibilidad, resistencia al cambio del personal, sobrecostes.

**35. ¿Necesitamos formar al personal municipal?**
Sí, es crítico. Incluir formación en AWS básico, nuevos procedimientos, y gestión de la nueva infraestructura.

### 📊 PREGUNTAS SOBRE EVALUACIÓN

**36. ¿Qué valora más el profesor en la solución?**
Coherencia técnica, justificación de decisiones, viabilidad práctica, y comprensión de conceptos cloud.

**37. ¿Es mejor una solución simple o compleja?**
Simple pero completa. Mejor pocos servicios bien justificados que muchos sin explicación clara.

**38. ¿Cómo se evalúa el trabajo en equipo?**
Participación equilibrada, colaboración efectiva, reparto de tareas, y resolución de conflictos internos.

**39. ¿Qué pasa si no terminamos todos los bloques?**
Priorizad completar bien los bloques 1, 2 y 3. Los bloques 4 y 5 pueden ser más breves si es necesario.

**40. ¿Podemos usar diagramas o solo texto?**
Los diagramas son muy valorados, especialmente para arquitectura. Usad herramientas simples como draw.io o dibujos a mano.

### 🛠️ PREGUNTAS TÉCNICAS ESPECÍFICAS

**41. ¿Qué es una VPC y por qué la necesitamos?**
Virtual Private Cloud. Crea una red privada virtual en AWS para aislar y proteger vuestros recursos.

**42. ¿Cuál es la diferencia entre EBS y S3?**
EBS: almacenamiento de bloques para EC2 (como discos duros). S3: almacenamiento de objetos para archivos y backups.

**43. ¿Qué es RDS Multi-AZ?**
Replica automática de la base de datos en múltiples zonas de disponibilidad para alta disponibilidad.

**44. ¿Necesitamos Load Balancer para un ayuntamiento?**
Recomendable para distribuir tráfico y mejorar disponibilidad, especialmente durante picos de demanda ciudadana.

**45. ¿Qué es CloudWatch y para qué sirve?**
Servicio de monitorización que permite supervisar recursos, crear alertas y analizar logs del sistema.

### 🎯 PREGUNTAS SOBRE PRESENTACIÓN

**46. ¿Qué debe incluir nuestra presentación de 5 minutos?**
Resumen del problema, solución propuesta, servicios AWS clave, beneficios principales, y costes estimados.

**47. ¿Todos los miembros del equipo deben hablar?**
Recomendable que todos participen, pero podéis organizaros como prefiráis. Lo importante es demostrar trabajo colaborativo.

**48. ¿Podemos usar slides o solo hablar?**
Podéis usar slides simples, pero no es obligatorio. Un diagrama de arquitectura en papel puede ser suficiente.

**49. ¿Qué preguntas puede hacer el profesor durante la presentación?**
Justificación de decisiones técnicas, alternativas consideradas, gestión de riesgos, y comprensión de conceptos cloud.

**50. ¿Cómo gestionamos los nervios de la presentación?**
Preparad un guión básico, repartid las partes, practicad brevemente, y recordad que es una actividad de aprendizaje, no un examen final.

---

## 🔧 PREGUNTAS TÉCNICAS AVANZADAS DE CLOUD

**51. ¿Qué es la elasticidad en cloud computing?**
Capacidad de escalar recursos automáticamente según demanda. AWS Auto Scaling ajusta instancias EC2 según tráfico web del ayuntamiento.

**52. ¿Cuál es la diferencia entre escalabilidad horizontal y vertical?**
Vertical: aumentar potencia de una máquina (más CPU/RAM). Horizontal: añadir más máquinas. Cloud favorece escalabilidad horizontal.

**53. ¿Qué son las zonas de disponibilidad (AZ) en AWS?**
Centros de datos separados físicamente dentro de una región. Usar múltiples AZ garantiza alta disponibilidad ante fallos.

**54. ¿Cómo funciona el modelo de responsabilidad compartida de AWS?**
AWS protege infraestructura física, vosotros protegéis datos, aplicaciones, configuración de seguridad y accesos.

**55. ¿Qué es edge computing y cómo se relaciona con CloudFront?**
Procesamiento cerca del usuario final. CloudFront cachea contenido en ubicaciones edge para reducir latencia.

**56. ¿Cuándo usar contenedores (ECS/EKS) vs máquinas virtuales (EC2)?**
Contenedores para aplicaciones modernas, microservicios, desarrollo ágil. VMs para aplicaciones legacy, mayor aislamiento.

**57. ¿Qué es serverless y cuándo aplicarlo en un ayuntamiento?**
Ejecutar código sin gestionar servidores. Ideal para formularios web, notificaciones automáticas, procesamiento de documentos.

**58. ¿Cómo garantizar compliance con GDPR en AWS?**
Cifrado de datos, logs de auditoría, controles de acceso, Data Processing Agreements, herramientas de AWS compliance.

**59. ¿Qué es Infrastructure as Code (IaC) y por qué usarlo?**
Definir infraestructura mediante código (CloudFormation, Terraform). Permite reproducibilidad, versionado y automatización.

**60. ¿Cuál es la diferencia entre backup y disaster recovery?**
Backup: copias de datos. Disaster Recovery: plan completo para restaurar operaciones tras incidente mayor.

## 🏗️ PREGUNTAS AVANZADAS DE ARQUITECTURA

**61. ¿Qué patrones de arquitectura cloud recomendáis para alta disponibilidad?**
Multi-AZ deployment, load balancing, auto-scaling, circuit breakers, graceful degradation, health checks.

**62. ¿Cómo diseñar una arquitectura tolerante a fallos?**
Redundancia en múltiples niveles, eliminación de puntos únicos de fallo, timeouts, retries, fallback mechanisms.

**63. ¿Qué es una arquitectura de microservicios y cuándo usarla?**
Aplicación dividida en servicios pequeños independientes. Útil para equipos grandes, escalabilidad independiente, tecnologías diversas.

**64. ¿Cómo implementar blue-green deployment en AWS?**
Dos entornos idénticos (blue/green). Desplegar en green, probar, cambiar tráfico. Permite rollback instantáneo.

**65. ¿Qué es API Gateway y por qué lo necesitamos?**
Punto de entrada único para APIs. Gestiona autenticación, rate limiting, monitorización, transformación de datos.

**66. ¿Cómo diseñar para peak loads (picos de tráfico ciudadano)?**
Auto Scaling Groups, CloudFront CDN, ElastiCache, SQS para desacoplar, dimensionado basado en métricas históricas.

**67. ¿Qué es event-driven architecture y sus beneficios?**
Componentes comunican mediante eventos. Desacoplamiento, escalabilidad, procesamiento asíncrono. Usar SNS/SQS/EventBridge.

**68. ¿Cómo implementar CQRS (Command Query Responsibility Segregation)?**
Separar operaciones de lectura y escritura. Optimizar cada una independientemente. Útil para sistemas con alta carga.

**69. ¿Qué consideraciones hay para arquitecturas multi-tenant?**
Aislamiento de datos, seguridad por tenant, escalabilidad independiente, personalización, compliance por cliente.

**70. ¿Cómo diseñar APIs RESTful escalables en cloud?**
Stateless design, caching apropiado, paginación, rate limiting, versionado, documentación OpenAPI, monitorización.

## 🌐 PREGUNTAS AVANZADAS DE REDES

**71. ¿Cómo configurar subredes públicas y privadas correctamente?**
Públicas: con Internet Gateway, para load balancers. Privadas: sin acceso directo internet, para bases de datos, con NAT Gateway.

**72. ¿Qué es un NAT Gateway y cuándo usarlo?**
Permite a instancias en subredes privadas acceder a internet para actualizaciones, sin recibir conexiones entrantes.

**73. ¿Cómo funciona el routing en una VPC?**
Route tables definen destinos de tráfico. Cada subred asociada a una route table. Rutas más específicas tienen prioridad.

**74. ¿Qué son los Security Groups vs NACLs?**
Security Groups: firewall a nivel instancia, stateful. NACLs: firewall a nivel subred, stateless. Usar ambos en capas.

**75. ¿Cómo conectar VPC con redes on-premise?**
VPN Site-to-Site para conexiones cifradas por internet. Direct Connect para conexiones dedicadas de alta velocidad.

**76. ¿Qué es VPC Peering y cuándo usarlo?**
Conectar dos VPCs para comunicación privada. Útil para separar entornos (prod/dev) manteniendo conectividad.

**77. ¿Cómo implementar network segmentation efectiva?**
Múltiples subredes por función, Security Groups restrictivos, NACLs como segunda capa, VPC Flow Logs para auditoría.

**78. ¿Qué es AWS Transit Gateway?**
Hub central para conectar múltiples VPCs y redes on-premise. Simplifica topologías de red complejas.

**79. ¿Cómo optimizar el ancho de banda y reducir costes de transferencia?**
CloudFront CDN, VPC Endpoints, colocación en misma AZ, compresión, optimización de protocolos.

**80. ¿Qué consideraciones hay para IPv6 en AWS?**
Soporte dual-stack, mayor espacio de direcciones, consideraciones de seguridad, migración gradual desde IPv4.

## 🔄 PREGUNTAS AVANZADAS DE MIGRACIÓN

**81. ¿Qué estrategias de migración cloud existen (6 Rs)?**
Rehost (lift-and-shift), Replatform, Refactor, Repurchase, Retain, Retire. Elegir según complejidad y beneficios.

**82. ¿Cómo evaluar la readiness de aplicaciones para cloud?**
Assessment de dependencias, performance, seguridad, compliance, costes, skills del equipo, business case.

**83. ¿Qué es AWS Application Discovery Service?**
Herramienta para mapear aplicaciones on-premise, dependencias, utilización de recursos, planificar migración.

**84. ¿Cómo migrar bases de datos grandes con mínimo downtime?**
AWS Database Migration Service (DMS), replicación continua, cambio de DNS, validación de datos, rollback plan.

**85. ¿Qué es el patrón Strangler Fig para migración?**
Reemplazar gradualmente sistema legacy redirigiendo tráfico a nuevos componentes hasta eliminar el antiguo.

**86. ¿Cómo gestionar datos durante la migración?**
Data sync tools, validación de integridad, backup completo, testing exhaustivo, plan de rollback de datos.

**87. ¿Qué consideraciones hay para migrar aplicaciones stateful?**
Persistencia de sesiones, shared storage, clustering, load balancer sticky sessions, database clustering.

**88. ¿Cómo planificar el testing post-migración?**
Performance testing, security testing, user acceptance testing, disaster recovery testing, monitoring setup.

**89. ¿Qué es cloud-native refactoring?**
Rediseñar aplicaciones para aprovechar servicios cloud: microservicios, containers, serverless, managed services.

**90. ¿Cómo gestionar el change management durante migración?**
Comunicación clara, training programs, pilot groups, feedback loops, support durante transición.

## 🔐 PREGUNTAS AVANZADAS DE SEGURIDAD

**91. ¿Cómo implementar Zero Trust architecture en AWS?**
Verificar siempre, nunca confiar. IAM granular, MFA, network segmentation, encryption everywhere, continuous monitoring.

**92. ¿Qué es AWS WAF y cómo configurarlo para un ayuntamiento?**
Web Application Firewall. Protege contra OWASP Top 10, SQL injection, XSS, rate limiting, geo-blocking.

**93. ¿Cómo funciona AWS KMS para gestión de claves?**
Key Management Service. Cifrado centralizado, rotación automática, audit trails, integración con servicios AWS.

**94. ¿Qué son los AWS Config Rules para compliance?**
Reglas automáticas que evalúan configuraciones AWS contra estándares de compliance, alertas de desviaciones.

**95. ¿Cómo implementar logging y monitoring de seguridad?**
CloudTrail para API calls, VPC Flow Logs, GuardDuty para threat detection, Security Hub para centralizar.

**96. ¿Qué es AWS Secrets Manager vs Parameter Store?**
Secrets Manager: rotación automática de credenciales. Parameter Store: configuración de aplicaciones, más económico.

**97. ¿Cómo proteger contra insider threats?**
Principio de menor privilegio, segregación de funciones, audit logs, approval workflows, background checks.

**98. ¿Qué es AWS Inspector y cuándo usarlo?**
Evaluación automática de vulnerabilidades en EC2 y container images. Esencial para security posture.

**99. ¿Cómo implementar network security monitoring?**
VPC Flow Logs, AWS GuardDuty, third-party SIEM, anomaly detection, automated response workflows.

**100. ¿Qué consideraciones hay para data classification y DLP?**
Clasificar datos por sensibilidad, AWS Macie para discovery, encryption basado en clasificación, access controls granulares.

---

**💡 Consejo final**: Si tenéis dudas durante la actividad, preguntad al profesor inmediatamente. Es mejor aclarar conceptos sobre la marcha que entregar una solución basada en malentendidos.
