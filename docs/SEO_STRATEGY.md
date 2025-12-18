# Estrategia y Evaluación SEO

Este documento define la metodología para la optimización continua de Motores de Búsqueda (SEO) en TuAvocadonet.

## 1. Metodología de Evaluación y Mejora

Seguiremos un ciclo de 4 fases para asegurar un SEO técnico y de contenido robusto.

### Fase 1: Diagnóstico Técnico (Auditoría)

- **Meta Etiquetas:** Verificar presencia de Title, Description, y Open Graph (OG) en todas las páginas.
- **Estructura HTML:** Asegurar uso correcto de jerarquía (H1 único, H2, H3).
- **Rastreo:** Validar `sitemap.xml` y `robots.txt`.
- **Performance:** Monitorear Core Web Vitals (LCP, CLS, FID).

### Fase 2: Implementación Técnica

- Uso de `react-helmet-async` para gestión dinámica de metadatos por ruta.
- Canonicalización de URLs.
- Optimización de activos (imágenes, scripts).

### Fase 3: Accesibilidad y Contenido

- Textos alternativos (`alt`) en todas las imágenes.
- Contraste de color y legibilidad.
- Palabras clave en títulos y descripciones.

### Fase 4: Verificación Continua

- Auditorías con Lighthouse periódicas.
- Revisión de logs de errores de rastreo.

---

## 2. Registro de Logros de Optimización

### 🚀 Optimización de Imágenes (Dic 2025)

Como parte de la mejora de **Performance (Fase 1 y 2)**, se implementó un pipeline de optimización de imágenes en el build.

- **Herramienta:** `vite-plugin-image-optimizer`
- **Resultado:** Reducción del **67%** en el peso de los assets (de ~6.8MB a ~2.2MB).
- **Impacto SEO:** Mejora directa en _Largest Contentful Paint (LCP)_ y experiencia móvil.
- **Estado:** ✅ Implementado y Verificado.
