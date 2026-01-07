// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegación
    initNavigation();
    
    // Inicializar tabs
    initTabs();
    
    // Inicializar modales
    initModals();
    
    // Mostrar sección inicial
    showSection('inicio');
});

// Navegación principal
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al link clickeado
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

// Mostrar sección específica
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sistema de tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showTab(tabId);
        });
    });
}

function showTab(tabId) {
    // Remover active de todos los botones y contenidos
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Activar botón y contenido seleccionado
    const activeButton = document.querySelector(`[onclick*="${tabId}"]`);
    const activeContent = document.getElementById(tabId);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

// Sistema de modales
function initModals() {
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                openModal.style.display = 'none';
            }
        }
    });
}

// Mostrar hoja de trabajo
function showWorksheet() {
    const modal = document.getElementById('worksheetModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Mostrar plantilla
function showTemplate() {
    const modal = document.getElementById('templateModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Mostrar ejemplo (redirigir a sección de materiales)
function showExample() {
    // Cambiar a sección de materiales
    showSection('materiales');
    
    // Actualizar navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[href="#materiales"]').classList.add('active');
    
    // Scroll al ejemplo de arquitectura
    setTimeout(() => {
        const exampleSection = document.querySelector('.architecture-example');
        if (exampleSection) {
            exampleSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

// Cerrar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Descargar plantilla
function downloadTemplate() {
    const templateContent = `# MIGRACIÓN CLOUD AYUNTAMIENTO DE ELCHE

**Equipo**: [Nombre del equipo]  
**Integrantes**: [Nombres de los miembros]  
**Fecha**: [Fecha de entrega]  

---

## 1. CONTEXTO Y RESUMEN DEL CIBERATAQUE

### 1.1 Descripción del Incidente
[Describir brevemente qué ocurrió en el ciberataque al Ayuntamiento de Elche y su impacto]

### 1.2 Servicios Afectados
[Listar los principales servicios municipales que quedaron inoperativos]

### 1.3 Motivación para la Migración Cloud
[Explicar por qué consideráis que migrar a la nube es la mejor respuesta al problema]

---

## 2. ANÁLISIS DE SERVICIOS MUNICIPALES

### 2.1 Clasificación por Criticidad

| Servicio | Criticidad | Usuarios Afectados | Justificación |
|----------|------------|-------------------|---------------|
| Portal web municipal | Alta/Media/Baja | [Número] | [Razón] |
| Sistema cita previa | Alta/Media/Baja | [Número] | [Razón] |
| Padrón municipal | Alta/Media/Baja | [Número] | [Razón] |
| [Añadir más servicios] | | | |

### 2.2 Clasificación por Modelos de Servicio

| Servicio Municipal | IaaS | PaaS | SaaS | Justificación |
|-------------------|------|------|------|---------------|
| Portal web | ✓/✗ | ✓/✗ | ✓/✗ | [Explicar por qué] |
| Base datos ciudadanos | ✓/✗ | ✓/✗ | ✓/✗ | [Explicar por qué] |
| Email corporativo | ✓/✗ | ✓/✗ | ✓/✗ | [Explicar por qué] |
| [Añadir más] | | | | |

---

## 3. COMPARACIÓN DE MODELOS DE DESPLIEGUE

### 3.1 Matriz de Evaluación

| Criterio | Peso | Nube Pública | Nube Privada | Nube Híbrida | Multicloud | On-Premise |
|----------|------|--------------|--------------|--------------|------------|------------|
| Coste inicial | 20% | [1-5] | [1-5] | [1-5] | [1-5] | [1-5] |
| Coste operacional | 20% | [1-5] | [1-5] | [1-5] | [1-5] | [1-5] |
| Seguridad | 25% | [1-5] | [1-5] | [1-5] | [1-5] | [1-5] |
| Escalabilidad | 15% | [1-5] | [1-5] | [1-5] | [1-5] | [1-5] |
| Control de datos | 20% | [1-5] | [1-5] | [1-5] | [1-5] | [1-5] |
| **TOTAL** | 100% | [Total] | [Total] | [Total] | [Total] | [Total] |

*Escala: 1=Muy malo, 2=Malo, 3=Regular, 4=Bueno, 5=Excelente*

---

## 4. MODELO ELEGIDO Y JUSTIFICACIÓN

### 4.1 Decisión Final
**Modelo seleccionado**: [Nube Pública/Privada/Híbrida/Multicloud/On-Premise]

### 4.2 Justificación Técnica
[Explicar en 3-4 párrafos por qué habéis elegido este modelo, basándoos en:]
- Necesidades específicas del ayuntamiento
- Análisis coste-beneficio
- Requisitos de seguridad y compliance
- Capacidades técnicas del personal municipal

---

## 5. ARQUITECTURA PROPUESTA EN AWS

### 5.1 Servicios AWS Seleccionados

| Necesidad Municipal | Servicio AWS | Justificación |
|-------------------|--------------|---------------|
| Servidores web | EC2/Lambda/Elastic Beanstalk | [Por qué este servicio] |
| Base de datos | RDS/DynamoDB/Aurora | [Por qué este servicio] |
| Almacenamiento documentos | S3/EFS/EBS | [Por qué este servicio] |
| Red y seguridad | VPC/Security Groups/WAF | [Por qué estos servicios] |
| Identidad y acceso | IAM/Cognito | [Por qué estos servicios] |
| Monitorización | CloudWatch/CloudTrail | [Por qué estos servicios] |

### 5.2 Descripción de la Arquitectura
[Describir en texto cómo se conectan los servicios AWS entre sí]

---

## 6. PLAN DE MIGRACIÓN

### 6.1 Estrategia General
[Explicar el enfoque: Big Bang vs Migración gradual, y por qué]

### 6.2 Fases de Migración

#### FASE 1: [Nombre de la fase]
**Duración estimada**: [X semanas/meses]  
**Servicios incluidos**: [Listar servicios]  
**Objetivos**: [Qué se pretende conseguir]  
**Criterios de éxito**: [Cómo sabréis que ha funcionado]

#### FASE 2: [Nombre de la fase]
**Duración estimada**: [X semanas/meses]  
**Servicios incluidos**: [Listar servicios]  
**Objetivos**: [Qué se pretende conseguir]  
**Criterios de éxito**: [Cómo sabréis que ha funcionado]

#### FASE 3: [Nombre de la fase]
**Duración estimada**: [X semanas/meses]  
**Servicios incluidos**: [Listar servicios]  
**Objetivos**: [Qué se pretende conseguir]  
**Criterios de éxito**: [Cómo sabréis que ha funcionado]

---

## 7. ANÁLISIS DE COSTES

### 7.1 Estimación Cualitativa

| Concepto | On-Premise Actual | Nube Propuesta | Diferencia |
|----------|------------------|----------------|------------|
| Coste inicial | Alto/Medio/Bajo | Alto/Medio/Bajo | Mayor/Menor/Similar |
| Coste mensual | Alto/Medio/Bajo | Alto/Medio/Bajo | Mayor/Menor/Similar |
| Personal técnico | Alto/Medio/Bajo | Alto/Medio/Bajo | Mayor/Menor/Similar |
| Mantenimiento | Alto/Medio/Bajo | Alto/Medio/Bajo | Mayor/Menor/Similar |

---

## 8. CONCLUSIONES Y RECOMENDACIONES

### 8.1 Resumen Ejecutivo
[Resumir en 2-3 párrafos vuestra propuesta principal]

### 8.2 Recomendaciones al Ayuntamiento
1. [Primera recomendación]
2. [Segunda recomendación]
3. [Tercera recomendación]

---

## 9. REFERENCIAS Y FUENTES

- [Enlace a noticia del ciberataque]
- [Documentación de AWS consultada]
- [Otras fuentes utilizadas]`;

    // Crear y descargar archivo
    const blob = new Blob([templateContent], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_migracion_elche.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Mostrar mensaje de confirmación
    showNotification('📥 Plantilla descargada correctamente');
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Añadir animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Funcionalidad de checklist
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.checklist')) {
        // Guardar estado en localStorage
        const checklistId = e.target.closest('.checklist').id || 'default-checklist';
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        const states = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem(checklistId, JSON.stringify(states));
        
        // Mostrar progreso
        const checked = states.filter(Boolean).length;
        const total = states.length;
        if (checked === total) {
            showNotification('✅ ¡Preparación completada!');
        }
    }
});

// Cargar estado de checklist al iniciar
window.addEventListener('load', function() {
    const checklistId = 'default-checklist';
    const savedStates = localStorage.getItem(checklistId);
    if (savedStates) {
        const states = JSON.parse(savedStates);
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        checkboxes.forEach((cb, index) => {
            if (states[index] !== undefined) {
                cb.checked = states[index];
            }
        });
    }
});

// Funcionalidad de búsqueda (opcional)
function addSearchFunctionality() {
    // Crear barra de búsqueda
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 999;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Buscar...';
    searchInput.style.cssText = `
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 20px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
    
    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);
    
    // Funcionalidad de búsqueda
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const matches = text.includes(query);
            
            if (query === '') {
                // Mostrar todas las secciones si no hay búsqueda
                section.style.display = '';
            } else {
                // Mostrar/ocultar según coincidencias
                section.style.display = matches ? '' : 'none';
            }
        });
    });
}

// Inicializar búsqueda (comentado por defecto)
// addSearchFunctionality();

// Smooth scroll para enlaces internos
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Indicador de progreso de lectura
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

// Inicializar indicador de progreso
addReadingProgress();
