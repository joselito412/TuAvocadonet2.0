# Plan de Implementación de Traducción Global (100%)

Este plan detalla el proceso para extraer todos los textos hardcodeados de la aplicación principal y generar archivos de traducción completos para los 11 idiomas estándar, asegurando la preservación de la marca "Avocado".

## 1. Análisis de Contenido

Se extraerán textos de las siguientes rutas críticas:

- **Páginas**: `HomePage`, `AboutPage`, `BlogPage`, `LegalPage`, `SustainabilityPage`, `UsersPage`, `WhatWeDoPage`, `WhatsAppPage`.
- **Componentes**: `Navigation`, `Footer`, `WhatsAppButton`, `AIChat`, `SocialImpact`.

## 2. Estructura Maestra (es.json)

La estructura del JSON será jerárquica para facilitar el mantenimiento.

```json
{
  "navigation": { "..." },
  "footer": { "..." },
  "home": {
    "hero": { ... },
    "features": { ... },
    "testimonials": { ... }
  },
  "about": { ... },
  "what_we_do": { ... },
  "users": { ... },
  "legal": { ... },
  "blog": { ... },
  "sustainability": { ... },
  "whatsapp": { ... },
  "components": {
    "ai_chat": { ... },
    "whatsapp_button": { ... }
  }
}
```

## 3. Idiomas a Generar

Se crearán archivos JSON completos para:

1.  `es` (Español - Base)
2.  `en` (Inglés)
3.  `pt` (Portugués)
4.  `fr` (Francés)
5.  `de` (Alemán)
6.  `ja` (Japonés)
7.  `zh` (Chino)
8.  `ko` (Coreano)
9.  `ar` (Árabe)
10. `hi` (Hindi)
11. `th` (Tailandés)

**Nota sobre Indígenas**: Para `guc`, `pbb`, `gum`, `inb`, `cmi`, se mantendrá el fallback a español configurado en `i18n.ts` ya que no existen traductores automáticos fiables para estas lenguas específicas en este entorno, garantizando así que no se rompa la UI (se mostrará español).

## 4. Reglas de Traducción

- **Marca**: "Avocado", "TuAvocado", "TuAvocadonet" -> **NO SE TRADUCEN**.
- **Variables**: Se mantendrán las interpolaciones `{{value}}`.
- **Formato**: Se respetarán mayúsculas y puntuación.

## 5. Pasos de Ejecución

1.  **Extracción**: Crear `src/locales/es.json` con TODO el texto del sitio.
2.  **Traducción**: Generar los otros 10 archivos JSON usando la base de español.
3.  **Refactorización**: Reemplazar textos en componentes React con `t("key")`.
    - Ejemplo: `<h1>Bienvenido</h1>` -> `<h1>{t('home.hero.title')}</h1>`
4.  **Verificación**: Recorrer la app para asegurar que no queden textos planos.

## User Review Required

- Confirmar si se tiene contenido específico para las lenguas indígenas o si el fallback a español es aceptable por ahora.
- Confirmar la lista de páginas (¿Se me escapa alguna?).
