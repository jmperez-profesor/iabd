# HOJA DE TRABAJO PARA EQUIPOS

**Equipo**: ________________  
**Integrantes**: ________________  

---

## BLOQUE 1: ANÁLISIS DE SERVICIOS MUNICIPALES (20 min)

### Actividad 1.1: Lista de Servicios Afectados
*Basándoos en el ciberataque real, identificad los servicios municipales que quedaron inoperativos:*

1. ________________________________
2. ________________________________
3. ________________________________
4. ________________________________
5. ________________________________

### Actividad 1.2: Matriz de Criticidad
*Evaluad cada servicio según estos criterios (1=Bajo, 5=Alto):*

| Servicio | Ciudadanos Afectados | Ingresos Municipales | Urgencia Legal | TOTAL |
|----------|---------------------|---------------------|----------------|-------|
| | /5 | /5 | /5 | /15 |
| | /5 | /5 | /5 | /15 |
| | /5 | /5 | /5 | /15 |
| | /5 | /5 | /5 | /15 |

**Top 3 servicios más críticos:**
1. ________________________________
2. ________________________________  
3. ________________________________

---

## BLOQUE 2: MODELOS DE SERVICIO Y DESPLIEGUE (25 min)

### Actividad 2.1: Clasificación IaaS/PaaS/SaaS
*Para cada servicio crítico, marcad qué modelo sería más apropiado:*

| Servicio Municipal | IaaS | PaaS | SaaS | ¿Por qué? |
|-------------------|------|------|------|-----------|
| Portal web municipal | ☐ | ☐ | ☐ | |
| Base datos padrón | ☐ | ☐ | ☐ | |
| Email corporativo | ☐ | ☐ | ☐ | |
| Sistema cita previa | ☐ | ☐ | ☐ | |

### Actividad 2.2: Evaluación de Modelos de Despliegue
*Puntuad cada modelo (1-5) según los criterios del ayuntamiento:*

| Criterio | Nube Pública | Nube Privada | Nube Híbrida | On-Premise |
|----------|--------------|--------------|--------------|------------|
| Coste inicial | /5 | /5 | /5 | /5 |
| Seguridad datos | /5 | /5 | /5 | /5 |
| Facilidad gestión | /5 | /5 | /5 | /5 |
| Escalabilidad | /5 | /5 | /5 | /5 |
| **TOTAL** | **/20** | **/20** | **/20** | **/20** |

**Modelo elegido**: ________________________________

**Justificación (3 razones principales)**:
1. ________________________________
2. ________________________________
3. ________________________________

---

## BLOQUE 3: ARQUITECTURA AWS (35 min)

### Actividad 3.1: Mapeo de Servicios AWS
*Para cada necesidad municipal, elegid el servicio AWS más apropiado:*

| Necesidad | Opciones AWS | Servicio Elegido | Justificación |
|-----------|--------------|------------------|---------------|
| Servidores web | EC2 / Lambda / Elastic Beanstalk | | |
| Base de datos | RDS / DynamoDB / Aurora | | |
| Almacenamiento | S3 / EFS / EBS | | |
| Balanceador | ALB / NLB / CloudFront | | |
| Seguridad red | VPC / Security Groups / WAF | | |
| Identidades | IAM / Cognito / Directory Service | | |

### Actividad 3.2: Diseño de Red y Seguridad
*Completad el diseño básico de vuestra VPC:*

```
Internet Gateway
        |
    [Subnet Pública]
    IP: 10.0.1.0/24
    Contiene: ________________
        |
    [Subnet Privada]  
    IP: 10.0.2.0/24
    Contiene: ________________
        |
    [Subnet Base Datos]
    IP: 10.0.3.0/24  
    Contiene: ________________
```

**Security Groups necesarios:**
1. ________________________________ (puertos: ________)
2. ________________________________ (puertos: ________)
3. ________________________________ (puertos: ________)

---

## BLOQUE 4: PLAN DE MIGRACIÓN (20 min)

### Actividad 4.1: Definición de Fases

#### FASE 1: ________________________________
**Duración**: ________ semanas  
**Servicios incluidos**: ________________________________  
**Objetivo**: ________________________________  
**Riesgos**: ________________________________

#### FASE 2: ________________________________  
**Duración**: ________ semanas  
**Servicios incluidos**: ________________________________  
**Objetivo**: ________________________________  
**Riesgos**: ________________________________

#### FASE 3: ________________________________
**Duración**: ________ semanas  
**Servicios incluidos**: ________________________________  
**Objetivo**: ________________________________  
**Riesgos**: ________________________________

### Actividad 4.2: Análisis de Costes
*Estimad de forma cualitativa (Alto/Medio/Bajo):*

| Concepto | Situación Actual | Con AWS | Diferencia |
|----------|------------------|---------|------------|
| Coste inicial | | | |
| Coste mensual | | | |
| Personal técnico | | | |
| Mantenimiento | | | |

**¿Cuándo se amortizaría la migración?** ________________

---

## PREPARACIÓN PRESENTACIÓN (Final del Bloque 4)

### Estructura de Presentación (4 minutos)
1. **Decisión principal** (30 seg): ¿Qué modelo habéis elegido?
2. **Arquitectura clave** (90 seg): ¿Qué servicios AWS y por qué?
3. **Plan de migración** (90 seg): ¿Cómo lo haríais por fases?
4. **Justificación final** (30 seg): ¿Por qué es la mejor opción?

### Reparto de Roles
- **Presentador principal**: ________________________________
- **Experto en arquitectura**: ________________________________  
- **Experto en migración**: ________________________________
- **Experto en costes**: ________________________________

### Mensajes Clave (máximo 3)
1. ________________________________
2. ________________________________
3. ________________________________

---

## AUTOEVALUACIÓN DEL EQUIPO

### Funcionamiento del Equipo
- ¿Todos habéis participado activamente? ☐ Sí ☐ No
- ¿Habéis respetado las opiniones de todos? ☐ Sí ☐ No  
- ¿Habéis llegado a consensos o ha dominado alguien? ☐ Consenso ☐ Dominio

### Dificultades Encontradas
1. ________________________________
2. ________________________________
3. ________________________________

### Aspectos a Mejorar
1. ________________________________
2. ________________________________

---

**NOTAS ADICIONALES:**

[Espacio libre para anotaciones durante la sesión]
