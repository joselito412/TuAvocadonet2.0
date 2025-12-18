# Registro de Actualizaciones de Frameworks y Dependencias

Este documento centraliza el historial de actualizaciones, parches y cambios de versión de los principales frameworks y librerías del proyecto. El objetivo es mantener un registro concreto de **qué** cambió, **cuándo** y **por qué**, facilitando la trazabilidad de problemas y decisiones de seguridad.

## Historial de Cambios

| Fecha          | Componente        | Versión (Ant -> Nueva) | Tipo         | Impacto y Notas                                                                                                       |
| :------------- | :---------------- | :--------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------- |
| **2025-12-18** | React & React DOM | `19.2.0` -> `19.2.3`   | 🛡️ Seguridad | **Crítico.** Parches de seguridad de Dic. 2025. Soluciona vulnerabilidades y definiciones de tipos. Build verificado. |

## Guía de Mantenimiento

- **Frecuencia:** Registrar cambios inmediatamente después de verificar una actualización.
- **Tipo:** Usar 🛡️ (Seguridad), 🚀 (Feature), 🐛 (Bugfix), 🔧 (Mantenimiento).
- **Verificación:** Siempre confirmar que el proyecto compila (`npm run build`) antes de registrar la entrada.

## Registro de Decisiones de Mantenimiento

| Fecha          | Decisión                                                                                                                       | Razón / Contexto                                                                                                                  |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **2025-12-18** | **Centralización de Logs:** Se crea este archivo único para registrar todos los cambios de frameworks.                         | Minimizar la proliferación de archivos `.md` pequeños y dispersos en la carpeta `docs/`.                                          |
| **2025-12-18** | **Protocolo de Actualización:** React se actualizará siempre a la última versión de parche estable tras verificación de build. | Priorizar la seguridad y corrección de tipos sobre el mantenimiento de versiones legacy, dado el bajo riesgo de hacks en parches. |
