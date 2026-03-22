# Guía de Despliegue (Deployment) - tuavocado.net

Este documento describe el flujo oficial para desplegar la Landing Page de TuAvocadoNet en **Hostinger** (o cualquier servidor web Apache/Nginx que sirva estáticos).

## Prerrequisitos
1. Asegúrate de tener Node.js instalado.
2. Descarga todas las dependencias: `npm install --legacy-peer-deps`

## Pipeline de Despliegue Manual (Opción A)

El repositorio está configurado libre de dependencias de GitHub Pages, por lo que el empaquetado es puro.

### 1. Variables de Entorno
Antes de compilar, verifica el archivo `.env.production`. Aquí se configuran los endpoints de backend si los hubiera.

### 2. Generar el Build (Compilación)
Ejecuta el siguiente comando en la raíz del proyecto para generar el directorio estático:
```bash
npm run build
```

Este comando:
- Analiza y "minifica" JavaScript y CSS usando Vite y esbuild.
- Optimiza automáticamente las imágenes (reduciendo hasta 60% su peso para SEO).
- Copia el archivo vital `.htaccess` desde la carpeta `public/` hacia la raíz del build.

### 3. Subir a Producción
La salida generada estará ubicada en la carpeta `dist/`.

1. Abre el **Administrador de Archivos** en Hostinger.
2. Navega al directorio público de tu dominio (`public_html`).
3. Sube el **contenido interior** de la carpeta `dist/` a `public_html`. (No subas la carpeta "dist" en sí, sino los archivos que están dentro).
4. El archivo `.htaccess` recién subido se encargará de interceptar todas las rutas (ej. `/legal` o `/aprende-ia`) y enviarlas adecuadamente al `index.html` para que React Router funcione.

---
*Nota arquitectónica:* El archivo `404.html` y la dependencia `gh-pages` fueron erradicados en la migración a la v2 para mantener una arquitectura agnóstica de servidor.
