# TuAvocadonet - Landing Page Legal Tech

Este repositorio contiene la **Landing Page** de TuAvocadonet, diseñada principalmente como una plataforma de ventas y captación de clientes. La aplicación principal y su backend complejo de IA residen en otro proyecto independiente.

## 🎯 Justificación y Resumen

TuAvocadonet busca democratizar el acceso a servicios legales de alta calidad en Colombia y Latinoamérica. Esta plataforma actúa como el punto de entrada principal (Top of Funnel) para usuarios que buscan orientación jurídica.

### Objetivo

Captar la atención del usuario con una estética moderna, accesible y confiable, dirigiéndolo eficientemente hacia nuestros canales de conversión y atención.

## 🔄 Embudo de Ventas a WhatsApp

La estrategia principal de conversión es el **"Click-to-WhatsApp"**. Todo el diseño de la Landing Page está optimizado para guiar al usuario a iniciar una conversación directa.

1.  **Atracción**: SEO optimizado y soporte multi-idioma (i18n) para captar tráfico local e internacional.
2.  **Interés**: Presentación clara de servicios, propuesta de valor y testimonios.
3.  **Conversión**: Llamados a la acción (CTAs) prominentes y un botón flotante de WhatsApp siempre visible.
4.  **Atención**: El usuario es redirigido a la API de WhatsApp, donde un agente (o bot en la otra plataforma) inicia el triaje o venta.

## 🚀 Inicio Rápido (Localhost)

Para correr el proyecto en tu máquina local:

### Frontend (Recomendado)

Este es el componente principal de este repositorio.

```bash
# Instalar dependencias
npm install

# Comandar para correr el localhost
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Backend (Opcional/Básico)

El backend en este repositorio se mantiene minimalista por seguridad y optimización, ya que la lógica pesada está en la App principal.

```bash
cd backend
# Si usas uv
uv sync
source .venv/bin/activate
# Correr servidor
uvicorn app.main:app --reload --port 8000
```

## � Tecnología

- **Frontend**: React, Vite, TailwindCSS.
- **Internacionalización**: i18n con soporte para idiomas globales y lenguas indígenas colombianas.
- **Backend**: FastAPI (Mantenido ligero y seguro).

## � Notas de Desarrollo

- **Accesibilidad y SEO**: Prioridad alta. Etiquetas semánticas y multilenguaje configurado.
- **Limpieza**: Se han eliminado dependencias complejas de IA (LangGraph) de este repositorio para mantenerlo ligero y enfocado en ventas.
