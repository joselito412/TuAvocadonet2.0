# Estrategia de Branching y Seguridad en Git

Este documento describe el flujo de trabajo oficial de Git para el proyecto TuAvocadonet. Diseñado para mantener un entorno de desarrollo profesional, aislar los cambios y evitar código inestable en producción.

## 1. Topología de Ramas

La estrategia se basa en un flujo simplificado de Git Flow:

- **`main`**: Rama de *Producción*. El código de esta rama SIEMPRE debe ser desplegable y estable. **Nunca** se debe hacer commit directamente a esta rama.
- **`develop`**: Rama base de *Desarrollo* (Nueva rama **Default**). Aquí se integra todo el código nuevo. Cuando una versión está lista para salir al público, se fusiona de `develop` a `main`.
- **`feature/<nombre-feature>`**: Ramas temporales creadas *a partir de* `develop` para desarrollar nuevas funcionalidades (Ej: `feature/landing-redesign`).
- **`hotfix/<nombre-bug>`**: Usadas en caso de emergencias, se crean directamente desde `main` y se fusionan tanto en `main` como en `develop`.

## 2. Seguridades Aplicadas y Recomendadas

### 2.1 Hook de Seguridad Pre-Commit (Local)
Se ha configurado automáticamente un hook en `.git/hooks/pre-commit` que previene filtraciones de secretos. 
- Bloqueará el commit si detecta en los archivos modificados palabras como: `api_key`, `password`, `secret`, `token`, `sk-`, `eyJh`.

### 2.2 Protección de Ramas (GitHub)
Dado que el CLI de GitHub no estaba instalado localmente, estas configuraciones deben realizarse en los ajustes del repositorio en GitHub (Settings > Branches > Branch protection rules):
1. **Regla para `main` y `develop`**: Activar "Require a pull request before merging".
2. **Reviewers**: Requerir al menos 1 revisión de código.
3. **No direct pushes**: Bloquear pushes directos a ambas ramas.

## 3. Flujo Diario de Trabajo

1. Asegúrate de estar en `develop` y sincronizado: `git pull origin develop`
2. Crea tu rama: `git checkout -b feature/nueva-seccion`
3. Haz cambios y prueba localmente.
4. Escribe *[Conventional Commits](https://www.conventionalcommits.org/)*:
   - `feat: añade botón de whatsapp`
   - `fix: corrige animación del teléfono`
   - `docs: actualiza indice de desarrollo`
   - `refactor: optimiza HomePage.jsx`
5. Haz push de la rama: `git push origin feature/nueva-seccion`
6. Abre un Pull Request hacia `develop` en GitHub.
