---
title: Tasks NLP 🏆 SOLUCIÓN COMPLETA Reto 3 "Asistente de Escritura Creativa"
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 🏆 Reto 3: Asistente de Escritura Creativa - SOLUCIÓN COMPLETA
## Generador de texto contextual para escritura creativa y marketing

```python {linenums="1"}
from transformers import pipeline
import random
import re
from typing import List, Dict, Optional

class AsistenteEscrituraCreativa:
    def __init__(self, modelo="DeepESP/gpt2-spanish"):
        """Inicializa el asistente de escritura creativa"""
        self.generator = pipeline("text-generation", model=modelo)
        self.historial = []
        
        # Plantillas para diferentes tipos de contenido
        self.plantillas = {
            "historia_corta": "Había una vez {personaje} que vivía en {lugar}. Un día, {evento_inicial}",
            "post_twitter": "🧵 Hilo sobre {tema}:\n\n1/ {primer_punto}",
            "post_linkedin": "💼 Reflexiones sobre {tema} en el mundo profesional:\n\n{contenido_principal}",
            "post_instagram": "✨ {tema} ✨\n\n{descripcion}\n\n#{hashtag1} #{hashtag2} #{hashtag3}",
            "articulo_blog": "# {titulo}\n\n## Introducción\n{introduccion}\n\n## Desarrollo\n{desarrollo}",
            "email_marketing": "Asunto: {asunto}\n\nHola {nombre},\n\n{contenido_principal}\n\nSaludos,\n{firma}"
        }
        
        # Modificadores de tono
        self.modificadores_tono = {
            "profesional": "Usa un lenguaje formal, datos concretos y terminología técnica apropiada.",
            "casual": "Usa un lenguaje relajado, contracciones y emojis ocasionales.",
            "inspiracional": "Incluye frases motivadoras, llamadas a la acción y un tono optimista.",
            "educativo": "Explica conceptos de forma clara, usa ejemplos y estructura didáctica.",
            "humoristico": "Incluye toques de humor apropiados y un tono ligero.",
            "urgente": "Crea sensación de urgencia y usa llamadas a la acción directas."
        }
    
    def generar_historia(self, prompt: str, longitud: int = 150, creatividad: float = 0.8) -> str:
        """Genera una historia creativa basada en un prompt"""
        try:
            resultado = self.generator(
                prompt,
                max_length=longitud,
                num_return_sequences=1,
                temperature=creatividad,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                repetition_penalty=1.2,
                pad_token_id=self.generator.tokenizer.eos_token_id
            )
            
            historia = resultado[0]['generated_text']
            self.historial.append({
                'tipo': 'historia',
                'prompt': prompt,
                'resultado': historia,
                'parametros': {'longitud': longitud, 'creatividad': creatividad}
            })
            
            return historia
        except Exception as e:
            return f"Error al generar historia: {str(e)}"
    
    def continuar_texto(self, texto_inicial: str, palabras_adicionales: int = 50) -> str:
        """Continúa un texto existente"""
        try:
            longitud_objetivo = len(texto_inicial.split()) + palabras_adicionales
            
            resultado = self.generator(
                texto_inicial,
                max_length=longitud_objetivo,
                temperature=0.7,
                do_sample=True,
                top_k=50,
                pad_token_id=self.generator.tokenizer.eos_token_id
            )[0]['generated_text']
            
            # Extraer solo la parte nueva
            texto_nuevo = resultado[len(texto_inicial):].strip()
            return texto_nuevo
        except Exception as e:
            return f"Error al continuar texto: {str(e)}"
    
    def generar_post_social(self, tema: str, plataforma: str, tono: str = "profesional") -> str:
        """Genera posts optimizados para diferentes redes sociales"""
        
        # Configuración por plataforma
        config_plataformas = {
            "twitter": {
                "longitud": 100,
                "plantilla": f"🧵 Hilo sobre {tema}:\n\n1/",
                "hashtags": True,
                "emojis": True
            },
            "linkedin": {
                "longitud": 200,
                "plantilla": f"💼 Reflexiones sobre {tema} en el mundo profesional:",
                "hashtags": False,
                "emojis": False
            },
            "instagram": {
                "longitud": 150,
                "plantilla": f"✨ {tema} ✨\n\n",
                "hashtags": True,
                "emojis": True
            },
            "facebook": {
                "longitud": 180,
                "plantilla": f"¿Sabías que {tema}?",
                "hashtags": False,
                "emojis": True
            }
        }
        
        if plataforma not in config_plataformas:
            return "Plataforma no soportada. Usa: twitter, linkedin, instagram, facebook"
        
        config = config_plataformas[plataforma]
        
        prompt_completo = f"""
        {config['plantilla']}
        Tema: {tema}
        Tono: {tono}
        Instrucciones: {self.modificadores_tono.get(tono, '')}
        Plataforma: {plataforma}
        
        Contenido:
        """
        
        try:
            resultado = self.generator(
                prompt_completo,
                max_length=config['longitud'],
                temperature=0.7,
                do_sample=True,
                top_k=40,
                top_p=0.9,
                pad_token_id=self.generator.tokenizer.eos_token_id
            )[0]['generated_text']
            
            return resultado
        except Exception as e:
            return f"Error al generar post: {str(e)}"
    
    def reescribir_con_estilo(self, texto: str, estilo: str) -> str:
        """Reescribe texto en un estilo específico"""
        estilos_prompt = {
            "formal": "Reescribe este texto de manera formal y académica:",
            "casual": "Reescribe este texto de manera informal y amigable:",
            "poetico": "Reescribe este texto como si fuera un poema:",
            "periodistico": "Reescribe este texto como una noticia:",
            "publicitario": "Reescribe este texto como un anuncio publicitario:",
            "tecnico": "Reescribe este texto usando terminología técnica:"
        }
        
        if estilo not in estilos_prompt:
            return "Estilo no soportado. Usa: formal, casual, poetico, periodistico, publicitario, tecnico"
        
        prompt = f"{estilos_prompt[estilo]} {texto}\n\nVersión reescrita:"
        
        try:
            resultado = self.generator(
                prompt,
                max_length=200,
                temperature=0.6,
                do_sample=True,
                pad_token_id=self.generator.tokenizer.eos_token_id
            )[0]['generated_text']
            
            # Extraer solo la parte reescrita
            if "Versión reescrita:" in resultado:
                return resultado.split("Versión reescrita:")[-1].strip()
            else:
                return resultado[len(prompt):].strip()
        except Exception as e:
            return f"Error al reescribir: {str(e)}"
    
    def generar_variaciones(self, texto: str, num_variaciones: int = 3) -> List[str]:
        """Genera múltiples variaciones de un texto"""
        variaciones = []
        
        for i in range(num_variaciones):
            try:
                temperatura = 0.6 + (i * 0.2)  # Aumentar creatividad gradualmente
                resultado = self.generator(
                    texto,
                    max_length=len(texto.split()) + 30,
                    temperature=temperatura,
                    do_sample=True,
                    num_return_sequences=1,
                    pad_token_id=self.generator.tokenizer.eos_token_id
                )[0]['generated_text']
                
                variaciones.append(resultado)
            except Exception as e:
                variaciones.append(f"Error en variación {i+1}: {str(e)}")
        
        return variaciones
    
    def sugerir_titulos(self, contenido: str, num_titulos: int = 5) -> List[str]:
        """Sugiere títulos atractivos para un contenido"""
        prompt = f"""
        Basándote en este contenido, sugiere {num_titulos} títulos atractivos y llamativos:
        
        Contenido: {contenido[:300]}...
        
        Títulos sugeridos:
        1.
        """
        
        try:
            resultado = self.generator(
                prompt,
                max_length=200,
                temperature=0.9,
                do_sample=True,
                pad_token_id=self.generator.tokenizer.eos_token_id
            )[0]['generated_text']
            
            # Extraer títulos
            lineas = resultado.split('\n')
            titulos = []
            for linea in lineas:
                if re.match(r'^\d+\.', linea.strip()):
                    titulo = re.sub(r'^\d+\.\s*', '', linea.strip())
                    if titulo:
                        titulos.append(titulo)
            
            return titulos[:num_titulos]
        except Exception as e:
            return [f"Error al generar títulos: {str(e)}"]
    
    def generar_contenido_plantilla(self, tipo_contenido: str, **kwargs) -> str:
        """Genera contenido usando plantillas predefinidas"""
        if tipo_contenido not in self.plantillas:
            return f"Tipo de contenido no soportado. Usa: {', '.join(self.plantillas.keys())}"
        
        try:
            plantilla = self.plantillas[tipo_contenido]
            prompt_base = plantilla.format(**kwargs)
            
            resultado = self.generator(
                prompt_base,
                max_length=300,
                temperature=0.7,
                do_sample=True,
                pad_token_id=self.generator.tokenizer.eos_token_id
            )[0]['generated_text']
            
            return resultado
        except KeyError as e:
            return f"Falta el parámetro requerido: {str(e)}"
        except Exception as e:
            return f"Error al generar contenido: {str(e)}"
    
    def evaluar_calidad_texto(self, texto: str) -> Dict:
        """Evalúa la calidad de un texto generado"""
        palabras = texto.split()
        oraciones = [s for s in texto.split('.') if s.strip()]
        
        # Métricas básicas
        num_palabras = len(palabras)
        num_oraciones = len(oraciones)
        palabras_por_oracion = num_palabras / max(num_oraciones, 1)
        
        # Diversidad léxica
        palabras_unicas = len(set([p.lower() for p in palabras]))
        diversidad_lexica = palabras_unicas / max(num_palabras, 1)
        
        # Detección de repeticiones
        repeticiones = num_palabras - palabras_unicas
        
        # Puntuación de calidad (0-100)
        puntuacion_longitud = min(100, (num_palabras / 100) * 100)
        puntuacion_diversidad = diversidad_lexica * 100
        puntuacion_repeticion = max(0, 100 - (repeticiones * 5))
        
        puntuacion_total = (puntuacion_longitud + puntuacion_diversidad + puntuacion_repeticion) / 3
        
        return {
            'puntuacion_total': round(puntuacion_total, 2),
            'palabras': num_palabras,
            'oraciones': num_oraciones,
            'palabras_por_oracion': round(palabras_por_oracion, 1),
            'diversidad_lexica': round(diversidad_lexica, 2),
            'repeticiones': repeticiones,
            'calidad': self._clasificar_calidad(puntuacion_total)
        }
    
    def _clasificar_calidad(self, puntuacion: float) -> str:
        """Clasifica la calidad basada en la puntuación"""
        if puntuacion > 80:
            return 'Excelente'
        elif puntuacion > 60:
            return 'Buena'
        elif puntuacion > 40:
            return 'Regular'
        else:
            return 'Necesita mejoras'
    
    def generar_reporte_historial(self) -> str:
        """Genera un reporte del historial de generaciones"""
        if not self.historial:
            return "No hay historial disponible."
        
        reporte = "📋 REPORTE DEL HISTORIAL DE GENERACIONES\n"
        reporte += "=" * 60 + "\n"
        reporte += f"Total de generaciones: {len(self.historial)}\n\n"
        
        tipos = {}
        for item in self.historial:
            tipo = item.get('tipo', 'desconocido')
            tipos[tipo] = tipos.get(tipo, 0) + 1
        
        reporte += "Distribución por tipo:\n"
        for tipo, cantidad in tipos.items():
            reporte += f"  {tipo}: {cantidad}\n"
        
        return reporte


def demo_completa():
    """Demostración completa del asistente de escritura creativa"""
    
    print("🚀 DEMO COMPLETA: ASISTENTE DE ESCRITURA CREATIVA")
    print("=" * 70)
    
    # Crear asistente
    asistente = AsistenteEscrituraCreativa()
    
    # 1. Generación de historias
    print("\n1️⃣ GENERACIÓN DE HISTORIAS CREATIVAS")
    print("-" * 50)
    
    prompts_creativos = [
        "En un mundo donde los sueños se pueden comprar y vender",
        "La última persona en la Tierra recibe un mensaje de radio",
        "Un detective investiga crímenes que aún no han ocurrido"
    ]
    
    for i, prompt in enumerate(prompts_creativos[:2], 1):
        historia = asistente.generar_historia(prompt, longitud=120, creatividad=0.8)
        print(f"📖 Historia {i}:")
        print(f"💡 Prompt: {prompt}")
        print(f"📝 Historia: {historia[:200]}...")
        print()
    
    # 2. Generación de contenido para redes sociales
    print("\n2️⃣ CONTENIDO PARA REDES SOCIALES")
    print("-" * 50)
    
    tema = "inteligencia artificial"
    plataformas = ["twitter", "linkedin"]
    
    for plataforma in plataformas:
        post = asistente.generar_post_social(tema, plataforma, "inspiracional")
        print(f"📱 {plataforma.upper()}:")
        print(post[:150] + "...")
        print()
    
    # 3. Reescritura con diferentes estilos
    print("\n3️⃣ REESCRITURA CON ESTILOS")
    print("-" * 50)
    
    texto_base = "La inteligencia artificial está transformando la manera en que trabajamos y vivimos"
    estilos = ["formal", "casual", "poetico"]
    
    print(f"📝 Texto original: {texto_base}")
    print()
    
    for estilo in estilos:
        version_reescrita = asistente.reescribir_con_estilo(texto_base, estilo)
        print(f"🎭 Estilo {estilo}: {version_reescrita[:100]}...")
        print()
    
    # 4. Generación de variaciones
    print("\n4️⃣ GENERACIÓN DE VARIACIONES")
    print("-" * 50)
    
    texto_variaciones = "El futuro de la tecnología es"
    variaciones = asistente.generar_variaciones(texto_variaciones, 3)
    
    print(f"🔀 Texto base: {texto_variaciones}")
    for i, variacion in enumerate(variaciones, 1):
        print(f"{i}. {variacion[:100]}...")
    print()
    
    # 5. Sugerencia de títulos
    print("\n5️⃣ SUGERENCIA DE TÍTULOS")
    print("-" * 50)
    
    contenido_ejemplo = "Un artículo sobre cómo la inteligencia artificial está revolucionando la educación, mejorando la personalización del aprendizaje y ayudando a los profesores a crear contenido más efectivo."
    titulos = asistente.sugerir_titulos(contenido_ejemplo, 3)
    
    print("📰 Títulos sugeridos:")
    for i, titulo in enumerate(titulos, 1):
        print(f"{i}. {titulo}")
    print()
    
    # 6. Evaluación de calidad
    print("\n6️⃣ EVALUACIÓN DE CALIDAD")
    print("-" * 50)
    
    texto_evaluar = asistente.generar_historia("En un laboratorio secreto", 80, 0.7)
    evaluacion = asistente.evaluar_calidad_texto(texto_evaluar)
    
    print(f"📊 Evaluación del texto generado:")
    print(f"Puntuación total: {evaluacion['puntuacion_total']}/100 ({evaluacion['calidad']})")
    print(f"Palabras: {evaluacion['palabras']} | Oraciones: {evaluacion['oraciones']}")
    print(f"Diversidad léxica: {evaluacion['diversidad_lexica']}")
    print(f"Repeticiones: {evaluacion['repeticiones']}")
    print()
    
    # 7. Contenido con plantillas
    print("\n7️⃣ GENERACIÓN CON PLANTILLAS")
    print("-" * 50)
    
    email = asistente.generar_contenido_plantilla(
        "email_marketing",
        asunto="Nueva funcionalidad disponible",
        nombre="Usuario",
        contenido_principal="Te presentamos nuestra nueva herramienta de IA",
        firma="El equipo de desarrollo"
    )
    
    print("📧 Email generado:")
    print(email[:200] + "...")
    print()
    
    # 8. Reporte final
    print("\n8️⃣ REPORTE DEL HISTORIAL")
    print("-" * 50)
    reporte = asistente.generar_reporte_historial()
    print(reporte)


if __name__ == "__main__":
    demo_completa()
```

```bash

```