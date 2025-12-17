---
title: Tasks NLP 🏆 SOLUCIÓN COMPLETA Reto 1: Detector de Emociones en Redes Sociales - 
description: Apuntes, prácticas, ejercicio del curso de especialización en IA y Big Data. 
---

# 🏆 Reto 1: Detector de Emociones en Redes Sociales - SOLUCIÓN COMPLETA
## Análisis de sentimientos para monitorización de marca en Twitter

```python {linenums="1"}
from transformers import pipeline
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

class DetectorEmociones:
    def __init__(self, modelo="cardiffnlp/twitter-roberta-base-sentiment-latest"):
        """Inicializa el detector de emociones"""
        self.classifier = pipeline("sentiment-analysis", model=modelo)
        self.resultados = []
    
    def analizar_texto(self, texto):
        """Analiza el sentimiento de un texto individual"""
        resultado = self.classifier(texto)
        return {
            'texto': texto,
            'sentimiento': resultado[0]['label'],
            'confianza': resultado[0]['score']
        }
    
    def analizar_lote(self, textos):
        """Analiza múltiples textos de una vez"""
        self.resultados = []
        for texto in textos:
            resultado = self.analizar_texto(texto)
            self.resultados.append(resultado)
        return self.resultados
    
    def comparar_modelos(self, texto, modelos):
        """Compara diferentes modelos en el mismo texto"""
        comparacion = {}
        for modelo in modelos:
            classifier = pipeline("sentiment-analysis", model=modelo)
            resultado = classifier(texto)
            comparacion[modelo.split('/')[-1]] = {
                'label': resultado[0]['label'],
                'score': resultado[0]['score']
            }
        return comparacion
    
    def crear_dashboard(self):
        """Crea visualizaciones de los resultados"""
        if not self.resultados:
            print("No hay resultados para visualizar. Ejecuta analizar_lote() primero.")
            return
        
        # Preparar datos
        sentimientos = [r['sentimiento'] for r in self.resultados]
        confianzas = [r['confianza'] for r in self.resultados]
        
        # Crear figura con subplots
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
        fig.suptitle('📊 Dashboard de Análisis de Sentimientos', fontsize=16)
        
        # 1. Distribución de sentimientos
        conteo = pd.Series(sentimientos).value_counts()
        colors = ['green' if 'POS' in label else 'red' if 'NEG' in label else 'gray' 
                 for label in conteo.index]
        ax1.bar(conteo.index, conteo.values, color=colors, alpha=0.7)
        ax1.set_title('Distribución de Sentimientos')
        ax1.set_ylabel('Número de Textos')
        
        # 2. Distribución de confianza
        ax2.hist(confianzas, bins=15, alpha=0.7, color='blue', edgecolor='black')
        ax2.set_title('Distribución de Confianza')
        ax2.set_xlabel('Nivel de Confianza')
        ax2.set_ylabel('Frecuencia')
        ax2.axvline(np.mean(confianzas), color='red', linestyle='--', 
                   label=f'Media: {np.mean(confianzas):.2f}')
        ax2.legend()
        
        # 3. Confianza por sentimiento
        df_temp = pd.DataFrame(self.resultados)
        df_temp.boxplot(column='confianza', by='sentimiento', ax=ax3)
        ax3.set_title('Confianza por Tipo de Sentimiento')
        ax3.set_xlabel('Sentimiento')
        ax3.set_ylabel('Confianza')
        
        # 4. Textos con menor confianza (posibles errores)
        textos_inciertos = sorted(self.resultados, key=lambda x: x['confianza'])[:5]
        y_pos = range(len(textos_inciertos))
        confianzas_bajas = [t['confianza'] for t in textos_inciertos]
        
        ax4.barh(y_pos, confianzas_bajas, color='orange', alpha=0.7)
        ax4.set_yticks(y_pos)
        ax4.set_yticklabels([t['texto'][:30] + '...' for t in textos_inciertos])
        ax4.set_title('Textos con Menor Confianza')
        ax4.set_xlabel('Confianza')
        
        plt.tight_layout()
        plt.show()
    
    def monitor_sentimiento(self, umbral_negativo=0.8):
        """Monitoriza sentimientos negativos y genera alertas"""
        if not self.resultados:
            print("No hay resultados para monitorizar.")
            return
        
        negativos_altos = [
            r for r in self.resultados 
            if 'NEG' in r['sentimiento'] and r['confianza'] > umbral_negativo
        ]
        
        if negativos_altos:
            print(f"🚨 ALERTA: {len(negativos_altos)} textos muy negativos detectados!")
            print("=" * 60)
            for i, neg in enumerate(negativos_altos, 1):
                print(f"{i}. {neg['texto']}")
                print(f"   Confianza: {neg['confianza']:.2f}")
                print("-" * 40)
        else:
            print("✅ No se detectaron sentimientos muy negativos.")
    
    def generar_reporte(self):
        """Genera un reporte completo del análisis"""
        if not self.resultados:
            print("No hay resultados para reportar.")
            return
        
        total_textos = len(self.resultados)
        sentimientos = [r['sentimiento'] for r in self.resultados]
        confianzas = [r['confianza'] for r in self.resultados]
        
        # Estadísticas básicas
        conteo_sentimientos = pd.Series(sentimientos).value_counts()
        confianza_promedio = np.mean(confianzas)
        confianza_min = np.min(confianzas)
        
        print("📋 REPORTE DE ANÁLISIS DE SENTIMIENTOS")
        print("=" * 50)
        print(f"📊 Total de textos analizados: {total_textos}")
        print(f"📈 Confianza promedio: {confianza_promedio:.2f}")
        print(f"📉 Confianza mínima: {confianza_min:.2f}")
        print("\n🎯 Distribución de sentimientos:")
        for sentimiento, cantidad in conteo_sentimientos.items():
            porcentaje = (cantidad / total_textos) * 100
            print(f"   {sentimiento}: {cantidad} ({porcentaje:.1f}%)")
        
        # Recomendaciones
        print("\n💡 RECOMENDACIONES:")
        if confianza_promedio < 0.7:
            print("⚠️  La confianza promedio es baja. Considera usar un modelo más específico.")
        
        negativos_pct = (conteo_sentimientos.get('NEGATIVE', 0) / total_textos) * 100
        if negativos_pct > 30:
            print(f"🚨 Alto porcentaje de sentimientos negativos ({negativos_pct:.1f}%). Revisar estrategia.")
        elif negativos_pct < 10:
            print(f"✅ Bajo porcentaje de sentimientos negativos ({negativos_pct:.1f}%). ¡Buen trabajo!")


def demo_completa():
    """Demostración completa del detector de emociones"""
    
    # Datos de ejemplo (tweets simulados)
    tweets_ejemplo = [
        "¡Esta nueva app es increíble! Me ha cambiado la vida 🚀",
        "La app se cuelga constantemente, muy frustrante 😡",
        "Funciona bien, pero podría mejorar la interfaz",
        "¡Gracias por esta herramienta tan útil! La recomiendo 100% ❤️",
        "No entiendo cómo usarla, muy confusa la navegación",
        "Perfecta para lo que necesitaba, muy intuitiva 👌",
        "Meh, es una app más del montón 🤷‍♀️",
        "¡Increíble actualización! Ahora funciona mucho mejor ✨",
        "Demasiados anuncios, es molesto",
        "La mejor app de productividad que he usado 💪"
    ]
    
    print("🚀 DEMO COMPLETA: DETECTOR DE EMOCIONES")
    print("=" * 60)
    
    # Crear detector
    detector = DetectorEmociones()
    
    # Análisis básico
    print("\n1️⃣ ANÁLISIS BÁSICO")
    print("-" * 30)
    resultados = detector.analizar_lote(tweets_ejemplo)
    
    for resultado in resultados[:3]:  # Mostrar solo los primeros 3
        print(f"Tweet: {resultado['texto']}")
        print(f"Sentimiento: {resultado['sentimiento']} (Confianza: {resultado['confianza']:.2f})")
        print()
    
    # Comparación de modelos
    print("\n2️⃣ COMPARACIÓN DE MODELOS")
    print("-" * 30)
    modelos = [
        "cardiffnlp/twitter-roberta-base-sentiment-latest",
        "nlptown/bert-base-multilingual-uncased-sentiment"
    ]
    
    tweet_test = "Esta app es genial pero tiene algunos bugs"
    comparacion = detector.comparar_modelos(tweet_test, modelos)
    
    print(f"Tweet de prueba: {tweet_test}")
    for modelo, resultado in comparacion.items():
        print(f"{modelo}: {resultado['label']} ({resultado['score']:.2f})")
    
    # Monitorización
    print("\n3️⃣ MONITORIZACIÓN DE ALERTAS")
    print("-" * 30)
    detector.monitor_sentimiento(umbral_negativo=0.7)
    
    # Reporte final
    print("\n4️⃣ REPORTE FINAL")
    print("-" * 30)
    detector.generar_reporte()
    
    # Dashboard (comentado para evitar dependencias gráficas)
    # print("\n5️⃣ CREANDO DASHBOARD...")
    # detector.crear_dashboard()


if __name__ == "__main__":
    demo_completa()
``` 
Resultados:
```bash

```