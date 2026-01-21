---
title: Cloud y AWS - ANEXO "EJEMPLOS DE SALIDA REAL - AWS CLI"
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data.
---

# ANEXO: EJEMPLOS DE SALIDA REAL - AWS CLI

## EJEMPLOS COMPLETOS DE CADA COMANDO

Este anexo muestra ejemplos reales de lo que verás al ejecutar cada comando.

---

## EJEMPLO 1: `aws --version`

### Comando ejecutado:
```bash
PS C:\Users\profesor> aws --version
```

### Salida esperada:
```bash
aws-cli/2.13.27 Python/3.11.5 Windows/10.0.19045 exe/AMD64.10.0.19045
```

### Explicación línea por línea:

- `aws-cli/2.13.27` → Versión de AWS CLI (la 2.13.27)
- `Python/3.11.5` → Versión de Python que usa internamente
- `Windows/10.0.19045` → Sistema operativo (Windows 10, build 19045)
- `exe/AMD64.10.0.19045` → Arquitectura del ejecutable (64 bits)

### ¿Qué significa cada versión?

- **2.x.x** = AWS CLI v2 (versión actual, más rápida que v1)
- **3.11.5** = Python 3.11 (versión 3, actualización 11, patch 5)
- Si ves versión diferente, ¡no importa! Lo importante es que aparezca algo parecido

---

## EJEMPLO 2: `aws sts get-caller-identity`

### Comando ejecutado:
```bash
PS C:\Users\profesor> aws sts get-caller-identity
```

### Salida esperada (JSON formateado):
```json
{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/profesor-ias-bd"
}
```

### Explicación de cada campo:

#### UserId
```
AIDACKCEVSQ6C2EXAMPLE
│││└── Caracteres alfanuméricos únicos para ti
││└─── Código de servicio (C = IAM user)
│└──── Prefijo regional
└───── Prefijo de tipo de ID (AID = Access ID)
```

#### Account
```
123456789012
└──── Tu número de cuenta AWS (12 dígitos)
      Este número es único en todo AWS
```

#### Arn (Amazon Resource Name)
```
arn:aws:iam::123456789012:user/profesor-iabd
│  │   │  │  │            │    │
│  │   │  │  │            │    └─ Nombre del usuario
│  │   │  │  │            └────── Número de cuenta
│  │   │  │  └────────────────── Región (vacío para IAM)
│  │   │  └───────────────────── ID de partición
│  │   └────────────────────────── Tipo de recurso
│  └───────────────────────────── Servicio (IAM)
└──────────────────────────────── Prefijo obligatorio
```

### ¿Por qué es importante?

- **Validación de credenciales:** Si ves un error de "InvalidUserID", tus credenciales son incorrectas
- **Auditoría:** AWS registra todos los accesos a este usuario
- **Permisos:** Tu usuario tiene los permisos definidos en tu política IAM

---

## EJEMPLO 3: `aws ec2 describe-vpcs`

### Comando ejecutado:
```
PS C:\Users\profesor> aws ec2 describe-vpcs
```

### Salida esperada (JSON completo):
```json
{
    "Vpcs": [
        {
            "CidrBlock": "10.0.0.0/16",
            "DhcpOptionsId": "dopt-32bdc05f",
            "State": "available",
            "VpcId": "vpc-0d5f55429e55f89a2",
            "OwnerId": "123456789012",
            "InstanceTenancy": "default",
            "Ipv6CidrBlockAssociationSet": [],
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "vpc-produccion-elche"
                }
            ]
        },
        {
            "CidrBlock": "172.31.0.0/16",
            "DhcpOptionsId": "dopt-12345678",
            "State": "available",
            "VpcId": "vpc-12345678",
            "OwnerId": "123456789012",
            "InstanceTenancy": "default",
            "Ipv6CidrBlockAssociationSet": [],
            "IsDefault": true,
            "Tags": []
        }
    ]
}
```

### Explicación detallada:

#### Primera VPC (VPC de Producción):

```json
{
    "CidrBlock": "10.0.0.0/16",
    ├─ Rango de IPs: desde 10.0.0.0 hasta 10.0.255.255 (65.536 IPs)
    ├─ /16 = máscara de red (primeros 16 bits fijos)
    
    "VpcId": "vpc-0d5f55429e55f89a2",
    ├─ Identificador único de la VPC en tu cuenta
    
    "State": "available",
    ├─ Estado: "available" (disponible)
    ├─ Otros estados posibles: "pending", "deleting"
    
    "OwnerId": "123456789012",
    ├─ Tu número de cuenta AWS
    
    "InstanceTenancy": "default",
    ├─ "default" = recursos compartidos (más económico)
    ├─ "dedicated" = hardware dedicado (más caro)
    
    "Tags": [
        {
            "Key": "Name",
            "Value": "vpc-produccion-elche"
        }
    ]
    ├─ Etiqueta para identificar la VPC
    └─ Útil para organizar y buscar recursos
}
```

#### Segunda VPC (VPC por Defecto):

```json
{
    "CidrBlock": "172.31.0.0/16",
    ├─ AWS crea esta VPC automáticamente
    
    "IsDefault": true,
    ├─ Indica que es la VPC por defecto
    ├─ La primera VPC puede eliminar instancias aquí por error
    
    "Tags": []
    └─ Sin etiquetas (no la modificaste)
}
```

### Rango CIDR explicado:

```
10.0.0.0/16
├─ 10.0.0.0     = Primera IP (red)
├─ 10.0.0.1     = Primera IP usable (gateway)
├─ 10.0.x.x     = IPs para instancias
├─ 10.0.255.255 = Última IP (broadcast)
└─ /16 = 2^(32-16) = 65.536 IPs totales

Otros ejemplos:
├─ 192.168.0.0/24 = 256 IPs (típico en redes locales)
├─ 172.16.0.0/12  = 1.048.576 IPs
└─ 10.0.0.0/8     = 16.777.216 IPs
```

---

## EJEMPLO 4: `aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"`

### Comando ejecutado:
```
PS C:\Users\profesor> aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"
```

### Salida esperada (lista de zonas de disponibilidad):
```json
[
    "eu-south-2a",
    "eu-south-2a",
    "eu-south-2b",
    "eu-south-2b",
    "us-east-1a",
    "us-east-1b"
]
```

### Explicación de las zonas:

#### Nomenclatura de región y zona:

```
eu-south-2a
├─ eu           = Continente (Europa)
├─ south        = Ubicación (Sur)
├─ 2            = Número de región sur en Europa
└─ a            = Zona de disponibilidad (Centro de datos físico)

Desglose de regiones:
├─ eu-west-1       = Irlanda (1ª región oeste)
├─ eu-west-2       = Londres (2ª región oeste)
├─ eu-central-1    = Frankfurt (central)
├─ eu-south-1      = Milán (1ª región sur)
├─ eu-south-2      = Barcelona/Palermo (2ª región sur) ← ESPAÑA
└─ eu-north-1      = Estocolmo (norte)

us-east-1a
├─ us             = Estados Unidos
├─ east           = Costa Este
├─ 1              = 1ª región este
└─ a              = Zona A (Virginia - datos reales)
```

### Número de zonas por región:

| Región | Zonas | Ubicación |
|--------|-------|-----------|
| eu-south-2 | a, b, c | España/Italia |
| us-east-1 | a, b, c, d, e, f | Virginia, USA |
| eu-west-1 | a, b, c | Irlanda |

### Distancia entre zonas:

```
eu-south-2 (Zona a y Zona b):
├─ Distancia: ~50-100 km (ambas en península Ibérica)
├─ Tiempo de latencia: <10 ms
└─ Propósito: Redundancia (si una falla, la otra funciona)

Ventaja para anti-ransomware:
├─ Si zona a es atacada y cifrada
├─ Zona b tiene copias sin cifrar
└─ Puedes recuperarte en minutos
```

### ¿Por qué importa el `--query`?

Sin `--query`:
```json
{
    "Subnets": [
        {
            "SubnetId": "subnet-123...",
            "AvailabilityZone": "eu-south-2a",
            "AvailabilityZoneId": "eus2-az1",
            "CidrBlock": "10.0.1.0/24",
            ... (20+ campos más)
        }
    ]
}
```

Con `--query "Subnets[*].AvailabilityZone"`:
```json
[
    "eu-south-2a"
]
```

**Beneficio:** Filtra solo la información que necesitas (mucho más legible).

---

## COMBINACIÓN DE LOS 4 COMANDOS

### Flujo completo que verías:

```bash
PS C:\Users\profesor> aws --version
aws-cli/2.13.27 Python/3.11.5 Windows/10.0.19045

PS C:\Users\profesor> aws sts get-caller-identity
{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/profesor-ias-bd"
}

PS C:\Users\profesor> aws ec2 describe-vpcs
{
    "Vpcs": [
        {
            "CidrBlock": "10.0.0.0/16",
            "VpcId": "vpc-0d5f55429e55f89a2",
            "State": "available"
            ...
        }
    ]
}

PS C:\Users\profesor> aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"
[
    "eu-south-2a",
    "eu-south-2b"
]
```

---

## INTERPRETACIÓN PARA LA CLASE

### Qué demuestra cada comando:

1. **`aws --version`**

   - ✅ AWS CLI está instalado
   - ✅ Tu sistema lo reconoce
   - Equivalente: "¿Tengo la herramienta?"

2. **`aws sts get-caller-identity`**

   - ✅ Tus credenciales son válidas
   - ✅ Estás autenticado en AWS
   - ✅ AWS sabe quién eres
   - Equivalente: "¿Soy quien digo ser?"

3. **`aws ec2 describe-vpcs`**

   - ✅ Tienes una red privada en AWS
   - ✅ Puedes ver todos tus recursos de red
   - ✅ VPCs aisladas = seguridad
   - Equivalente: "¿Qué redes tengo disponibles?"

4. **`aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"`**

   - ✅ Tu infraestructura está distribuida geográficamente
   - ✅ Múltiples centros de datos
   - ✅ Redundancia automática
   - Equivalente: "¿Dónde están distribuidos mis datos?"

### Conexión con arquitectura anti-ransomware:

```
CLI muestra infraestructura AWS
        ↓
        ├─ Datos en múltiples zonas (eu-south-2a y eu-south-2b)
        ├─ Replicación automática entre zonas
        └─ Si ransomware cifra zona A
           → Zona B sigue disponible sin cifrar
           → Recuperación en minutos (no semanas)
```

---

## ERRORES COMUNES Y SOLUCIONES

### Error 1: "aws: command not found"

```bash
$ aws --version
bash: aws: command not found
```

**Causas y soluciones:**

1. AWS CLI no está instalado → Reinstala siguiendo PARTE 1
2. PATH no actualizado → Reinicia tu terminal/ordenador
3. Instalación incompleta → Desinstala y reinstala

---

### Error 2: "Unable to locate credentials"

```json
{
    "Error": {
        "Code": "InvalidUserID.NotFound",
        "Message": "The user ID does not exist"
    }
}
```

**Causas:**

- Credenciales no configuradas
- Credenciales incorrectas
- Archivo `~/.aws/credentials` no existe

**Solución:**
```bash
aws configure
# Introduce:
# - Access Key ID
# - Secret Access Key
# - Default region: eu-south-2
# - Output format: json
```

---

### Error 3: "AccessDenied"

```json
{
    "Error": {
        "Code": "UnauthorizedOperation",
        "Message": "You are not authorized to perform this operation"
    }
}
```

**Causa:** Tu usuario no tiene permiso para ver EC2

**Solución:**

1. Ve a AWS Console → IAM → Users
2. Selecciona tu usuario
3. "Add permissions" → "AmazonEC2ReadOnlyAccess"
4. Espera 5 minutos
5. Reintenta

---

### Error 4: "Invalid credentials"

```json
{
    "Error": {
        "Code": "InvalidUserID.Malformed",
        "Message": "Invalid id: 'AKIA...'"
    }
}
```

**Causa:** Access Key ID inválida o expirada

**Solución:**

1. Comprueba que copiaste correctamente la Access Key
2. Si expiró, crea una nueva en AWS Console
3. Ejecuta `aws configure` nuevamente

---

## COMANDOS ÚTILES ADICIONALES

### Ver configuración actual:
```bash
aws configure list
```

Salida:
```
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key                 AKIA...             config  ~/.aws/credentials
secret_key                 ****                config  ~/.aws/credentials
    region                eu-south-2           config  ~/.aws/config
```

---

### Cambiar región por defecto:
```bash
aws configure set region eu-west-1
```

---

### Ver detalles de una VPC específica:
```bash
aws ec2 describe-vpcs --vpc-ids vpc-0d5f55429e55f89a2
```

---

### Listar subredes con más detalles:
```bash
aws ec2 describe-subnets --query "Subnets[*].[SubnetId,AvailabilityZone,CidrBlock]"
```

Salida:
```json
[
    ["subnet-12345678", "eu-south-2a", "10.0.1.0/24"],
    ["subnet-87654321", "eu-south-2b", "10.0.2.0/24"]
]
```

---

## CHEAT SHEET (Referencia rápida)

```bash
# Instalación y verificación
aws --version
aws configure
aws configure list

# Identidad y autenticación
aws sts get-caller-identity
aws iam get-user

# Redes
aws ec2 describe-vpcs
aws ec2 describe-subnets
aws ec2 describe-network-interfaces

# Instancias
aws ec2 describe-instances
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"

# Almacenamiento
aws s3 ls
aws s3 ls s3://bucket-name

# Bases de datos
aws rds describe-db-instances

# Backup
aws backup list-backup-vaults

# Seguridad
aws iam list-users
aws iam get-role --role-name nombre-rol
```

---

**Referencia preparada para Ciclos Formativos - IA y Big Data**
**Elche, enero 2026**
