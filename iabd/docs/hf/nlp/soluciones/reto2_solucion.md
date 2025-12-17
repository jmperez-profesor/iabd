---
title: Tasks NLP 🏆 SOLUCIÓN COMPLETA Reto 2: Clasificador Inteligente de Noticias
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 🏆 Reto 2: Clasificador Inteligente de Noticias - SOLUCIÓN COMPLETA
## Sistema de categorización automática de noticias con zero-shot learning

```python {linenums="1"}
from transformers import pipeline
import pandas as pd
import numpy as np
from collections import defaultdict
import json

class ClasificadorNoticias:
    def __init__(self, modelo="facebook/bart-large-mnli"):
        """Inicializa el clasificador de noticias"""
        self.classifier = pipeline("zero-shot-classification", model=modelo)
        self.resultados = []
        self.categorias_principales = ["deportes", "tecnología", "política", "economía", "ciencia", "entretenimiento"]
        
        # Subcategorías jerárquicas
        self.subcategorias = {
            "deportes": ["fútbol", "baloncesto", "tenis", "otros deportes"],
            "tecnología": ["inteligencia artificial", "móviles", "software", "hardware"],
            "ciencia": ["medicina", "física", "biología", "paleontología"],
            "economía": ["criptomonedas", "bolsa", "empresas", "comercio"],
            "política": ["elecciones", "legislación", "internacional", "local"],
            "entretenimiento": ["cine", "música", "televisión", "celebridades"]
        }
    
    def clasificar_noticia(self, noticia, categorias=None):
        """Clasifica una noticia individual"""
        if categorias is None:
            categorias = self.categorias_principales
        
        # Combinar título y contenido
        if isinstance(noticia, dict):
            texto = f"{noticia.get('titulo', '')} {noticia.get('contenido', '')}"
            titulo = noticia.get('titulo', 'Sin título')
        else:
            texto = noticia
            titulo = texto[:50] + "..."
        
        resultado = self.classifier(texto, categorias)
        
        return {
            'titulo': titulo,
            'texto_completo': texto,
            'categoria_predicha': resultado['labels'][0],
            'confianza': resultado['scores'][0],
            'todas_las_scores': dict(zip(resultado['labels'], resultado['scores']))
        }
    
    def clasificacion_jerarquica(self, noticia):
        """Clasificación en dos niveles: categoría principal y subcategoría"""
        
        # Paso 1: Categoría principal
        resultado_principal = self.clasificar_noticia(noticia, self.categorias_principales)
        categoria_principal = resultado_principal['categoria_predicha']
        
        # Paso 2: Subcategoría
        if categoria_principal in self.subcategorias:
            resultado_sub = self.clasificar_noticia(noticia, self.subcategorias[categoria_principal])
            subcategoria = resultado_sub['categoria_predicha']
            confianza_sub = resultado_sub['confianza']
        else:
            subcategoria = "general"
            confianza_sub = 0.0
        
        return {
            'titulo': resultado_principal['titulo'],
            'categoria_principal': categoria_principal,
            'subcategoria': subcategoria,
            'confianza_principal': resultado_principal['confianza'],
            'confianza_subcategoria': confianza_sub,
            'ruta_completa': f"{categoria_principal}/{subcategoria}"
        }
    
    def clasificar_lote(self, noticias, jerarquico=False):
        """Clasifica múltiples noticias"""
        self.resultados = []
        
        for noticia in noticias:
            if jerarquico:
                resultado = self.clasificacion_jerarquica(noticia)
            else:
                resultado = self.clasificar_noticia(noticia)
            
            self.resultados.append(resultado)
        
        return self.resultados
    
    def recomendar_similares(self, noticia_objetivo, todas_las_noticias, top_k=3):
        """Encuentra noticias similares basándose en la clasificación"""
        
        # Clasificar la noticia objetivo
        resultado_objetivo = self.clasificar_noticia(noticia_objetivo)
        categoria_objetivo = resultado_objetivo['categoria_predicha']
        
        # Clasificar todas las noticias
        noticias_clasificadas = []
        for noticia in todas_las_noticias:
            if noticia != noticia_objetivo:
                resultado = self.clasificar_noticia(noticia)
                noticias_clasificadas.append(resultado)
        
        # Filtrar por misma categoría y ordenar por confianza
        similares = [n for n in noticias_clasificadas if n['categoria_predicha'] == categoria_objetivo]
        similares.sort(key=lambda x: x['confianza'], reverse=True)
        
        return similares[:top_k]
    
    def detectar_noticias_atipicas(self, umbral_confianza=0.5):
        """Detecta noticias con clasificación incierta"""
        if not self.resultados:
            print("No hay resultados. Ejecuta clasificar_lote() primero.")
            return []
        
        atipicas = [r for r in self.resultados if r.get('confianza', 0) < umbral_confianza]
        return atipicas
    
    def analizar_tendencias(self, noticias_por_periodo):
        """Analiza tendencias de categorías por período"""
        tendencias = {}
        
        for periodo, noticias in noticias_por_periodo.items():
            resultados_periodo = []
            for noticia in noticias:
                resultado = self.clasificar_noticia(noticia)
                resultados_periodo.append(resultado['categoria_predicha'])
            
            # Contar categorías
            conteo = pd.Series(resultados_periodo).value_counts()
            tendencias[periodo] = conteo.to_dict()
        
        return tendencias
    
    def crear_dashboard_categorias(self):
        """Crea visualizaciones de las categorías"""
        if not self.resultados:
            print("No hay resultados para visualizar.")
            return
        
        import matplotlib.pyplot as plt
        
        # Preparar datos
        if 'categoria_principal' in self.resultados[0]:
            # Clasificación jerárquica
            categorias = [r['categoria_principal'] for r in self.resultados]
            subcategorias = [r['subcategoria'] for r in self.resultados]
            confianzas = [r['confianza_principal'] for r in self.resultados]
        else:
            # Clasificación simple
            categorias = [r['categoria_predicha'] for r in self.resultados]
            confianzas = [r['confianza'] for r in self.resultados]
        
        # Crear figura
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
        fig.suptitle('📊 Dashboard de Clasificación de Noticias', fontsize=16)
        
        # 1. Distribución de categorías
        conteo_cat = pd.Series(categorias).value_counts()
        ax1.pie(conteo_cat.values, labels=conteo_cat.index, autopct='%1.1f%%')
        ax1.set_title('Distribución de Categorías')
        
        # 2. Confianza por categoría
        df_temp = pd.DataFrame({'categoria': categorias, 'confianza': confianzas})
        df_temp.boxplot(column='confianza', by='categoria', ax=ax2)
        ax2.set_title('Confianza por Categoría')
        ax2.set_xlabel('Categoría')
        ax2.set_ylabel('Confianza')
        
        # 3. Histograma de confianza
        ax3.hist(confianzas, bins=15, alpha=0.7, color='green', edgecolor='black')
        ax3.set_title('Distribución de Confianza')
        ax3.set_xlabel('Confianza')
        ax3.set_ylabel('Frecuencia')
        ax3.axvline(np.mean(confianzas), color='red', linestyle='--', 
                   label=f'Media: {np.mean(confianzas):.2f}')
        ax3.legend()
        
        # 4. Top categorías por volumen
        ax4.bar(conteo_cat.index, conteo_cat.values, color='skyblue', alpha=0.7)
        ax4.set_title('Volumen por Categoría')
        ax4.set_xlabel('Categoría')
        ax4.set_ylabel('Número de Noticias')
        ax4.tick_params(axis='x', rotation=45)
        
        plt.tight_layout()
        plt.show()
    
    def generar_reporte_completo(self):
        """Genera un reporte completo del análisis"""
        if not self.resultados:
            print("No hay resultados para reportar.")
            return
        
        total_noticias = len(self.resultados)
        
        # Determinar tipo de clasificación
        es_jerarquica = 'categoria_principal' in self.resultados[0]
        
        if es_jerarquica:
            categorias = [r['categoria_principal'] for r in self.resultados]
            confianzas = [r['confianza_principal'] for r in self.resultados]
        else:
            categorias = [r['categoria_predicha'] for r in self.resultados]
            confianzas = [r['confianza'] for r in self.resultados]
        
        # Estadísticas
        conteo_categorias = pd.Series(categorias).value_counts()
        confianza_promedio = np.mean(confianzas)
        confianza_min = np.min(confianzas)
        
        print("📋 REPORTE DE CLASIFICACIÓN DE NOTICIAS")
        print("=" * 60)
        print(f"📊 Total de noticias analizadas: {total_noticias}")
        print(f"📈 Confianza promedio: {confianza_promedio:.2f}")
        print(f"📉 Confianza mínima: {confianza_min:.2f}")
        print(f"🏷️  Tipo de clasificación: {'Jerárquica' if es_jerarquica else 'Simple'}")
        
        print("\n🎯 Distribución por categorías:")
        for categoria, cantidad in conteo_categorias.items():
            porcentaje = (cantidad / total_noticias) * 100
            print(f"   {categoria}: {cantidad} noticias ({porcentaje:.1f}%)")
        
        # Noticias con baja confianza
        noticias_inciertas = self.detectar_noticias_atipicas(0.6)
        if noticias_inciertas:
            print(f"\n⚠️  Noticias con clasificación incierta: {len(noticias_inciertas)}")
            for noticia in noticias_inciertas[:3]:
                print(f"   - {noticia['titulo']} (Confianza: {noticia.get('confianza', 0):.2f})")
        
        # Recomendaciones
        print("\n💡 RECOMENDACIONES:")
        if confianza_promedio < 0.7:
            print("⚠️  Confianza promedio baja. Considera ajustar las categorías o usar un modelo específico.")
        
        categoria_dominante = conteo_categorias.index[0]
        pct_dominante = (conteo_categorias.iloc[0] / total_noticias) * 100
        if pct_dominante > 50:
            print(f"📊 La categoría '{categoria_dominante}' domina ({pct_dominante:.1f}%). Considera subcategorías.")
        
        print("✅ Análisis completado exitosamente.")


def demo_completa():
    """Demostración completa del clasificador de noticias"""
    
    # Noticias de ejemplo
    noticias_ejemplo = [
        {
            "titulo": "El Real Madrid ficha a Mbappé por 180 millones de euros",
            "contenido": "El delantero francés firma por cinco temporadas con el club blanco tras una larga negociación..."
        },
        {
            "titulo": "Nueva ley de inteligencia artificial aprobada en Europa",
            "contenido": "El Parlamento Europeo aprueba regulaciones estrictas para el uso de IA en sectores críticos..."
        },
        {
            "titulo": "Bitcoin alcanza nuevo máximo histórico de 75.000 dólares",
            "contenido": "La criptomoneda líder supera expectativas tras anuncios de adopción institucional..."
        },
        {
            "titulo": "Descubren nueva especie de dinosaurio gigante en Argentina",
            "contenido": "Paleontólogos argentinos encuentran restos de un titanosaurio de 40 metros de longitud..."
        },
        {
            "titulo": "Apple presenta el iPhone 16 con IA integrada",
            "contenido": "La nueva generación incluye procesador neuronal avanzado y funciones de IA generativa..."
        },
        {
            "titulo": "Elecciones presidenciales: resultados preliminares",
            "contenido": "Los primeros datos muestran una reñida competencia entre los principales candidatos..."
        }
    ]
    
    print("🚀 DEMO COMPLETA: CLASIFICADOR DE NOTICIAS")
    print("=" * 70)
    
    # Crear clasificador
    clasificador = ClasificadorNoticias()
    
    # 1. Clasificación básica
    print("\n1️⃣ CLASIFICACIÓN BÁSICA")
    print("-" * 40)
    resultados_basicos = clasificador.clasificar_lote(noticias_ejemplo[:3])
    
    for resultado in resultados_basicos:
        print(f"📰 {resultado['titulo']}")
        print(f"🏷️  Categoría: {resultado['categoria_predicha']} (Confianza: {resultado['confianza']:.2f})")
        print()
    
    # 2. Clasificación jerárquica
    print("\n2️⃣ CLASIFICACIÓN JERÁRQUICA")
    print("-" * 40)
    resultados_jerarquicos = clasificador.clasificar_lote(noticias_ejemplo, jerarquico=True)
    
    for resultado in resultados_jerarquicos[:3]:
        print(f"📰 {resultado['titulo']}")
        print(f"🗂️  Ruta: {resultado['ruta_completa']}")
        print(f"📊 Confianza: {resultado['confianza_principal']:.2f}")
        print()
    
    # 3. Recomendaciones
    print("\n3️⃣ SISTEMA DE RECOMENDACIONES")
    print("-" * 40)
    noticia_objetivo = noticias_ejemplo[0]  # Noticia de fútbol
    recomendaciones = clasificador.recomendar_similares(noticia_objetivo, noticias_ejemplo)
    
    print(f"🎯 Noticia objetivo: {noticia_objetivo['titulo']}")
    print("\n📋 Noticias similares recomendadas:")
    for i, rec in enumerate(recomendaciones, 1):
        print(f"{i}. {rec['titulo']}")
        print(f"   Categoría: {rec['categoria_predicha']} (Confianza: {rec['confianza']:.2f})")
    
    # 4. Detección de noticias atípicas
    print("\n4️⃣ DETECCIÓN DE NOTICIAS ATÍPICAS")
    print("-" * 40)
    atipicas = clasificador.detectar_noticias_atipicas(0.8)
    if atipicas:
        print(f"⚠️  Encontradas {len(atipicas)} noticias con clasificación incierta:")
        for atipica in atipicas:
            print(f"   - {atipica['titulo']} (Confianza: {atipica.get('confianza', 0):.2f})")
    else:
        print("✅ Todas las noticias tienen clasificación confiable.")
    
    # 5. Análisis de tendencias
    print("\n5️⃣ ANÁLISIS DE TENDENCIAS")
    print("-" * 40)
    noticias_por_dia = {
        "lunes": noticias_ejemplo[:2],
        "martes": noticias_ejemplo[2:4],
        "miércoles": noticias_ejemplo[4:]
    }
    
    tendencias = clasificador.analizar_tendencias(noticias_por_dia)
    for dia, categorias in tendencias.items():
        print(f"📅 {dia.capitalize()}:")
        for categoria, cantidad in categorias.items():
            print(f"   {categoria}: {cantidad} noticias")
    
    # 6. Reporte final
    print("\n6️⃣ REPORTE FINAL")
    print("-" * 40)
    clasificador.generar_reporte_completo()


if __name__ == "__main__":
    demo_completa()
```

Resultados:
```bash

```