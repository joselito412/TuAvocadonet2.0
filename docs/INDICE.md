# Índice de Documentación - TuAvocadonet

**Repositorio:** Landing Page Legal Tech

Este documento es el punto de entrada **OBLIGATORIO** para cualquier agente antes de analizar, modificar o extender la arquitectura.

## 🎯 Contexto del Proyecto
TuAvocadonet es una Landing Page optimizada para actuar como 'Top of Funnel' en la captación de clientes. Su objetivo primordial es dirigir a los usuarios hacia el embudo de ventas "Click-to-WhatsApp". La aplicación compleja reside en un repositorio/proyecto independiente.

## 🧱 Arquitectura Cero-Suposiciones
- **Frontend (Principal):** React 19, Vite, TailwindCSS, Jotai, Framer Motion.
- **Backend (Secundario/Ligero):** FastAPI (Uvicorn), usado para integraciones mínimas en el puerto 8000.
- **Internacionalización:** i18next configurado para múltiples idiomas (incluyendo lenguas indígenas).
- **Estética:** Retro/Glassmorphism optimizado para conversiones y SEO.

## 📁 Estructura del Proyecto
- `.antigravity/` -> Espacio de trabajo exclusivo del Agente (Reglas, hojas de trucos, flujos). NUNCA documentar lógica del proyecto aquí.
- `docs/` -> Documentación técnica oficial del proyecto. Todo lo referenciado por el agente va aquí.
- `src/` -> Código fuente del Frontend.
- `backend/` -> Código fuente del Backend FastAPI.

## 📖 Documentos Secundarios Existentes
- [SEO Strategy](./SEO_STRATEGY.md) - Estrategia de indexación y etiquetas.
- [i18n Implementation](./i18n_implementation.md) - Guía de la implementación multi-idioma.
- [Framework Changelog](./FRAMEWORK_CHANGELOG.md) - Notas de actualización.
- [Git Workflow](./GIT_WORKFLOW.md) - Estrategia oficial de branching y seguridad.

## ⚠️ Reglas Generales de Documentación
Cualquier solicitud del usuario que diga "documentar X" se deberá realizar creando o actualizando archivos en este directorio `docs/` y referenciándolos en este `INDICE.md`.
