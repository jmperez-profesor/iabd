---
title: Cloud y AWS - ACTIVIDAD 2 - INSTALACIÓN AWS CLI Y CONEXIÓN A AWS
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data.
---

# ACTIVIDAD 2: INSTALACIÓN AWS CLI Y CONEXIÓN A AWS
## RAPIA.3 / CEPIA.3d - Acceso a servicios cloud desde terminal

**Objetivo:** Instalar AWS CLI, autenticarse en AWS y ejecutar comandos para explorar la infraestructura cloud.

**Requisitos previos:**

- Ordenador con acceso a internet
- Cuenta de AWS activa (si es cuenta de estudiante, validar permisos)
- Permisos de administrador en el PC
- Terminal/CMD accesible

---

## PARTE 1: INSTALACIÓN DE AWS CLI

### Opción 1: Windows (MÁS RECOMENDADO)

#### Paso 1: Descargar el instalador

1. Abre navegador y ve a: [AWSCLIV2.msi](https://awscli.amazonaws.com/AWSCLIV2.msi)
2. Se descargará automáticamente el archivo **AWSCLIV2.msi**
3. Guarda el archivo en una carpeta fácil de encontrar

#### Paso 2: Ejecutar el instalador

1. Haz doble clic en **AWSCLIV2.msi**
2. Aparecerá el asistente de instalación de AWS CLI
3. Haz clic en **Next** → **Install**
4. Cuando termine, haz clic en **Finish**
5. **Reinicia tu ordenador** (importante para que se actualice PATH)

#### Paso 3: Verificar instalación

Abre **PowerShell** o **CMD** (como administrador):

```powershell
aws --version
```

**Resultado esperado:**
```
aws-cli/2.x.x Python/3.x.x Windows/10.x
```

Si ves la versión, ✅ **AWS CLI está instalado correctamente**.

---

### Opción 2: Mac (si aplica)

```bash
# Descargar el archivo
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"

# Ejecutar el instalador
sudo installer -pkg AWSCLIV2.pkg -target /

# Verificar instalación
aws --version
```

---

### Opción 3: Linux (Ubuntu/Debian)

```bash
# Actualizar paquetes
sudo apt update

# Instalar AWS CLI desde repositorio
sudo apt install -y awscli

# O descargar versión más reciente
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verificar instalación
aws --version
```

---

## PARTE 2: CONFIGURAR CREDENCIALES DE AWS

### Obtener credenciales de AWS

Necesitarás:

- **Access Key ID**
- **Secret Access Key**
- **Default Region** (ej: eu-south-2 para España)

**¿Dónde obtenerlas?**

1. Abre tu consola de AWS: [AWS Console](https://aws.amazon.com/console/)
2. Inicia sesión con tu cuenta
3. Ve a tu perfil (esquina superior derecha) → **Security Credentials**
4. En la sección "Access keys", haz clic en **Create access key**
5. Copia los valores (guárdalos en un lugar seguro)

⚠️ **IMPORTANTE:** Nunca compartas estas credenciales. Son como tu contraseña de AWS.

### Configurar AWS CLI

Abre **PowerShell** o **CMD** y ejecuta:

```cmd
aws configure
```

Te pedirá:

```
AWS Access Key ID [None]: AKIA...
AWS Secret Access Key [None]: wJalrXU...
Default region name [None]: eu-south-2
Default output format [None]: json
```

**Explicación:**

- **Access Key ID:** Tu clave de acceso (empieza con AKIA)
- **Secret Access Key:** Tu contraseña (NO la vuelvas a compartir)
- **Default region:** Para España usa `eu-south-2` (si es otra región, ajusta)
- **Output format:** Deja `json` (es el formato más legible)

✅ **Si no hay errores, la configuración está lista.**

---

## PARTE 3: EJECUTAR LOS COMANDOS AWS

Abre **PowerShell** o **CMD** y ejecuta cada comando por separado.

### Comando 1: `aws --version`

```cmd
aws --version
```

**Resultado esperado:**
```
aws-cli/2.13.27 Python/3.11.5 Windows/10.0.19045
```

**¿Qué hace?**

- Muestra la versión de AWS CLI instalada
- Verifica que AWS CLI está correctamente instalado
- Muestra también la versión de Python y el sistema operativo

---

### Comando 2: `aws sts get-caller-identity`

```cmd
aws sts get-caller-identity
```

**Resultado esperado (formato JSON):**
```json
{
    "UserId": "AIDAI1234567890ABCDE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/tu-usuario"
}
```

**¿Qué hace?**

- **STS** = Security Token Service (Servicio de Tokens de Seguridad)
- Verifica que tus credenciales son válidas
- Muestra:
  - **UserId:** Tu ID único en AWS
  - **Account:** El número de tu cuenta AWS (12 dígitos)
  - **Arn:** Amazon Resource Name (identificador único de tu usuario)

**En clase:** Este comando demuestra que estamos autenticados en AWS.

---

### Comando 3: `aws ec2 describe-vpcs`

```cmd
aws ec2 describe-vpcs
```

**Resultado esperado (muchas líneas JSON):**
```json
{
    "Vpcs": [
        {
            "VpcId": "vpc-0a1b2c3d4e5f6g7h8",
            "InstanceTenancy": "default",
            "State": "available",
            "CidrBlock": "10.0.0.0/16",
            "DhcpOptionsId": "dopt-0a1b2c3d",
            "IsDefault": false,
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "Mi-VPC-Principal"
                }
            ]
        }
    ]
}
```

**¿Qué hace?**

- **EC2** = Elastic Compute Cloud (máquinas virtuales)
- **describe-vpcs** = Describe todas las VPCs (Virtual Private Cloud)
- Una **VPC** es una red privada aislada en AWS donde viven tus recursos
- Muestra:

  - **VpcId:** ID único de la VPC
  - **CidrBlock:** Rango de IPs de la VPC (ej: 10.0.0.0/16)
  - **State:** Estado (available = disponible)
  - **Tags:** Etiquetas personalizadas para identificar la VPC

**En clase:** Enseña cómo AWS organiza los recursos en redes privadas.

---

### Comando 4: `aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"`

```cmd
aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"
```

**Resultado esperado:**
```json
[
    "eu-south-2a",
    "eu-south-2b",
    "eu-south-2a",
    "eu-south-2b"
]
```

**¿Qué hace?**

- **describe-subnets** = Describe todas las subredes
- Una **subred** es una división de una VPC
- **--query "Subnets[*].AvailabilityZone"** = Filtra solo la columna de Zonas de Disponibilidad
- Muestra:

  - **Availability Zones:** Ubicaciones geográficas donde están las subredes
  - **eu-south-2a, eu-south-2b:** Diferentes centros de datos en España
  - Esto demuestra **redundancia geográfica** (si falla un centro, hay otro)

**En clase:** Conecta con arquitectura anti-ransomware (datos replicados en múltiples zonas).

---

## RESUMEN DE RESULTADOS

| COMANDO | PROPÓSITO | INFORMACIÓN CLAVE |
|---------|-----------|-------------------|
| `aws --version` | Verificar instalación | Versión AWS CLI + Python + SO |
| `aws sts get-caller-identity` | Validar autenticación | UserId, Account (12 dígitos), ARN |
| `aws ec2 describe-vpcs` | Ver redes privadas | VpcId, CidrBlock, State, Tags |
| `aws ec2 describe-subnets --query ...` | Ver zonas de disponibilidad | Distribución geográfica de subredes |

---

## PARTE 4: CAPTURA DE PANTALLA (PARA LA ENTREGA)

Realiza una captura de pantalla (Print Screen) que incluya:

1. El resultado de `aws --version`
2. El resultado de `aws sts get-caller-identity`
3. El resultado de `aws ec2 describe-vpcs` (parcial)
4. El resultado de `aws ec2 describe-subnets --query ...`

---

## PARTE 5: SOLUCIÓN DE PROBLEMAS

### Problema: "aws: command not found"

**Solución:**

1. Reinicia tu ordenador (AWS CLI modifica PATH)
2. Si aún no funciona, reinstala AWS CLI
3. Verifica que AWS CLI está en: `C:\Program Files\Amazon\AWSCLIV2\` (Windows)

---

### Problema: "Unable to locate credentials"

**Solución:**

1. Abre **PowerShell** como administrador
2. Ejecuta: `aws configure`
3. Introduce tus credenciales nuevamente
4. Verifica que el archivo existe: `C:\Users\[TU_USUARIO]\.aws\credentials`

---

### Problema: "AccessDenied" en comandos

**Causa:** Tu usuario de AWS no tiene permisos para EC2.

**Solución:**

1. Ve a AWS Console → IAM → Users
2. Haz clic en tu usuario
3. Añade política: **AmazonEC2ReadOnlyAccess** (para leer, sin modificar)
4. Espera 5 minutos y vuelve a intentar

---

### Problema: "Invalid credentials"

**Solución:**

1. Ve a AWS Console → Security Credentials
2. Verifica que tu Access Key aún está activa
3. Si expiró, crea una nueva key
4. Ejecuta: `aws configure` nuevamente

---

## PARTE 6: EXPLICACIÓN PARA LA CLASE

### Conexión con arquitectura anti-ransomware

**¿Por qué ejecutamos estos comandos?**

1. **`aws --version`** → Verifica que tenemos herramientas para gestionar AWS programáticamente

2. **`aws sts get-caller-identity`** → Demuestra **autenticación y autorización (IAM)**
   - Conecta con seguridad cloud
   - Muestra quién accede a AWS (responsabilidad compartida)

3. **`aws ec2 describe-vpcs`** → Muestra cómo AWS organiza **infraestructura de red**
   - VPC = red privada aislada
   - Base para arquitectura anti-ransomware

4. **`aws ec2 describe-subnets --query ...`** → Demuestra **redundancia geográfica**
   - eu-south-2a y eu-south-2b = dos centros de datos
   - Si uno cae, el otro sigue funcionando
   - **Esto es lo que evitó la paralización en la arquitectura anti-ransomware**

### Analógía para explicar

```
AWS CLI es como un "mando a distancia" para AWS:

- Sin AWS CLI: Tienes que entrar a la consola web (lento, gráfico)
- Con AWS CLI: Ejecutas comandos en terminal (rápido, automatizable)

Analógía:
- Consola web = Telecomando de TV (botones físicos)
- AWS CLI = Lenguaje para controlar TV por voz (más potente)
```

---

## PARTE 7: EXTENSIÓN (ACTIVIDADES ADICIONALES)

### Listar todas las instancias EC2 en ejecución

```cmd
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"
```

---

### Ver todos los buckets S3

```cmd
aws s3 ls
```

---

### Ver políticas de backup

```cmd
aws backup list-backup-vaults
```

---

### Crear alias para comandos frecuentes

En **PowerShell**, edita tu perfil:

```powershell
# Abre editor
notepad $PROFILE

# Añade estas líneas:
function aws-version { aws --version }
function aws-identity { aws sts get-caller-identity }
function aws-vpcs { aws ec2 describe-vpcs }
function aws-zones { aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone" }

# Guarda y cierra PowerShell
# La próxima vez, ejecuta: aws-identity (en lugar del comando completo)
```

---

## EXPLICACIÓN DETALLADA POR COMANDO

### `aws --version`

**Desglose:**

- **aws:** Comando principal de AWS CLI
- **--version:** Bandera que pide mostrar la versión

**Información en la salida:**
```
aws-cli/2.13.27        <- Versión de AWS CLI
Python/3.11.5          <- Versión de Python que usa AWS CLI
Windows/10.0.19045     <- Tu sistema operativo
```

**Importancia:**

- Confirma que AWS CLI está instalado
- Útil para debugging (si algo falla, la versión ayuda a identificar el problema)
- Primera verificación después de la instalación

---

### `aws sts get-caller-identity`

**Desglose:**

- **aws:** Comando principal
- **sts:** Security Token Service (gestión de tokens de seguridad)
- **get-caller-identity:** Obtén la identidad del usuario que ejecuta el comando

**Información en la salida:**
```json
{
    "UserId": "AIDAI1234567890ABCDE",
        └─ Identificador único de tu usuario IAM
    
    "Account": "123456789012",
        └─ Número de tu cuenta AWS (12 dígitos)
    
    "Arn": "arn:aws:iam::123456789012:user/tu-usuario"
        └─ Amazon Resource Name (nombre único de tu recurso)
        └─ Formato: arn:aws:[SERVICIO]::[CUENTA]:[RECURSO]
}
```

**Importancia:**

- Valida que tus credenciales son correctas
- Verifica que tienes acceso a AWS
- Muestra con quién estás autenticado (usuario/rol)
- **Conecta con IAM:** Control granular de permisos (responsabilidad compartida)

**En contexto de ransomware:**

- Si un atacante tiene tus credenciales, verá SU usuario en lugar del tuyo
- MFA (multi-factor authentication) impide que ejecute este comando sin aprobación

---

### `aws ec2 describe-vpcs`

**Desglose:**

- **aws:** Comando principal
- **ec2:** Elastic Compute Cloud (máquinas virtuales)
- **describe-vpcs:** Describe todas las VPCs (Virtual Private Clouds)

**Información en la salida:**
```json
{
    "Vpcs": [                          <- Lista de VPCs
        {
            "VpcId": "vpc-0a1b2c3d",   <- ID único de la VPC
            "InstanceTenancy": "default",
            "State": "available",       <- Estado (disponible)
            "CidrBlock": "10.0.0.0/16", <- Rango de IPs (10.0.0.1 - 10.0.255.254)
            "DhcpOptionsId": "dopt-...",
            "IsDefault": false,         <- ¿Es la VPC por defecto?
            "Tags": [
                {
                    "Key": "Name",
                    "Value": "Mi-VPC"   <- Nombre identificativo
                }
            ]
        }
    ]
}
```

**Importancia:**

- Una VPC es como tu "red privada personal" dentro de AWS
- Muestra todas tus redes disponibles
- Cada VPC es aislada de otras (seguridad)
- Base para desplegar aplicaciones de forma segura

**En contexto de ransomware:**

- Las VPCs con subredes privadas protegen BBDD (RDS)
- No son accesibles desde Internet directamente
- Necesitas estar "dentro" de la VPC para acceder

---

### `aws ec2 describe-subnets --query "Subnets[*].AvailabilityZone"`

**Desglose:**

- **aws ec2 describe-subnets:** Lista todas las subredes
- **--query "Subnets[*].AvailabilityZone":** Filtra solo la columna AvailabilityZone
  - `Subnets[*]` = todos los elementos de la lista Subnets
  - `.AvailabilityZone` = toma solo ese atributo

**Información en la salida:**
```json
[
    "eu-south-2a",    <- Centro de datos en Palermo/Barcelona (zona A)
    "eu-south-2b",    <- Centro de datos en Palermo/Barcelona (zona B)
    "eu-south-2a",    <- Otra subred en zona A
    "eu-south-2b"     <- Otra subred en zona B
]
```

**Nomenclatura de zonas:**

- **eu-south-2** = Región Europa (Sur)
  - **eu** = Europa
  - **south** = Sur (es España/Italia)
  - **2** = Es la segunda región sur de AWS en Europa
- **a, b, c, ...** = Zonas de Disponibilidad (AZs)
  - Cada una es un centro de datos físico separado
  - Están a decenas de km de distancia
  - Si uno se incendia/apaga, los otros siguen

**Importancia:**

- Muestra **redundancia geográfica**
- Datos replicados en múltiples centros físicos
- Si AWS-es-sur-2a falla, AWS-eu-south-2b sigue disponible
- **Esto es la base de High Availability (HA)**

**En contexto de ransomware:**

- Elche tenía un único CPD (punto único de fallo)
- AWS tiene múltiples AZs (múltiples puntos de fallo tolerable)
- RDS Multi-AZ copia datos automáticamente a otra zona
- Si atacan zona A, datos están seguros en zona B

---

## CONEXIÓN CON ARQUITECTURA ANTI-RANSOMWARE

**Los 4 comandos demuestran:**

1. **`aws --version`** → Herramientas para gestión programática (DevOps)

2. **`aws sts get-caller-identity`** → **SEGURIDAD (IAM + MFA)**
   - Autenticación válida
   - Mínimo privilegio
   - Auditoría de quién accede

3. **`aws ec2 describe-vpcs`** → **AISLAMIENTO (VPC + Subredes privadas)**
   - BBDD en subred privada
   - No accesible desde Internet
   - Protección contra ataques web

4. **`aws ec2 describe-subnets --query`** → **REDUNDANCIA GEOGRÁFICA (Multi-AZ)**
   - Replicación automática
   - Si cae un centro, hay otro
   - RTO bajo (Recovery Time Objective)

**Conexión con Elche:**
- Elche: 1 CPD → Ransomware cifra todo
- AWS: Múltiples AZs → Ransomware cifra datos en AZ-a, pero AZ-b tiene copias sin cifrar

---

## REFERENCIAS

**Documentación oficial AWS:**

- [AWS CLI User Guide](https://docs.aws.amazon.com/cli/)
- [EC2 describe-vpcs](https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-vpcs.html)
- [EC2 describe-subnets](https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-subnets.html)
- [STS get-caller-identity](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetCallerIdentity.html)

**Apuntes del curso:**
- aitor-medrano.github.io/iabd/cloud/aws.html#aws-cloudshell

---

**Actividad preparada para Ciclos Formativos de Grado Superior - IA y Big Data**
**Elche, enero 2026**
