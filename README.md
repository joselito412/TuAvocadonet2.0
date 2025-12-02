# TuAVocadoNet - Plataforma Legal Tech

Plataforma web de orientación legal profesional que combina inteligencia artificial con servicios legales especializados. TuAVocadoNet ofrece documentación legal automatizada, consultoría jurídica con IA, y conexión con abogados verificados en múltiples jurisdicciones.

## 🚀 Inicio Rápido

### Frontend (React + Vite)

Para iniciar el servidor de desarrollo del frontend:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

### Backend (FastAPI + Python)

Para iniciar el servidor de desarrollo del backend:

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

El backend estará disponible en `http://localhost:8000`.

**Nota:** Asegúrate de tener configuradas las variables de entorno y las bases de datos antes de iniciar el backend.

## 📋 Requisitos Previos

### Frontend
- Node.js 18+ y npm
- (Opcional) TypeScript para desarrollo

### Backend
- Python 3.12+
- PostgreSQL 15+ con extensión pgvector
- MongoDB 7.0+ (opcional)
- Redis 7.0+ (opcional, para caching)
- [uv](https://github.com/astral-sh/uv) - Gestor de paquetes Python

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd TuAVocadoNet
```

### 2. Instalar dependencias del Frontend

```bash
npm install
```

### 3. Instalar dependencias del Backend

```bash
cd backend

# Instalar uv (si no lo tienes)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Inicializar proyecto e instalar dependencias
uv sync

# Activar entorno virtual
source .venv/bin/activate
```

### 4. Configurar Base de Datos

#### Opción A: Usando Docker Compose (Recomendado)

```bash
cd backend
docker-compose up -d
```

Esto iniciará PostgreSQL con pgvector en el puerto `5434`.

#### Opción B: Instalación Manual

1. Instalar PostgreSQL 15+
2. Instalar la extensión pgvector:

```sql
CREATE EXTENSION vector;
```

3. Crear la base de datos:

```sql
CREATE DATABASE tuavocadonet;
```

### 5. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto o en `backend/`:

```env
# Backend
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/tuavocadonet
OPENAI_API_KEY=tu_api_key_aqui
MONGODB_URL=mongodb://localhost:27017/consultorio_juridico

# Frontend (opcional)
VITE_API_BASE_URL=http://localhost:8000
VITE_RAG_API_KEY=tu_api_key_aqui
```

## 🏃 Ejecución en Desarrollo

### Iniciar Frontend y Backend Simultáneamente

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### Verificar que todo funciona

- Frontend: Abre `http://localhost:5173` en tu navegador
- Backend API: Visita `http://localhost:8000/docs` para ver la documentación interactiva de FastAPI

## 📁 Estructura del Proyecto

```
TuAVocadoNet/
├── backend/                 # Backend FastAPI
│   ├── app/
│   │   ├── api/            # Endpoints de la API
│   │   ├── models/         # Modelos Pydantic
│   │   ├── services/       # Lógica de negocio
│   │   │   ├── langgraph/  # Workflow LangGraph
│   │   │   ├── nodes/      # Nodos del grafo
│   │   │   └── rag/        # Sistema RAG
│   │   ├── config.py        # Configuración
│   │   └── main.py         # Aplicación FastAPI
│   ├── data/               # Datos legales
│   ├── scripts/            # Scripts de utilidad
│   ├── tests/              # Tests
│   ├── docker-compose.yml  # Configuración Docker
│   └── pyproject.toml      # Dependencias Python
│
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas de la aplicación
│   ├── services/           # Servicios (API, RAG)
│   ├── hooks/              # Custom hooks
│   ├── store/              # Estado global (Jotai)
│   ├── config/             # Configuración
│   └── utils/              # Utilidades
│
├── public/                 # Archivos estáticos
├── dist/                   # Build de producción
├── package.json            # Dependencias Node.js
├── vite.config.js         # Configuración Vite
└── README.md              # Este archivo
```

## 🧪 Scripts Disponibles

### Frontend

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
npm run deploy       # Despliega a GitHub Pages
```

### Backend

```bash
# Desarrollo
uvicorn app.main:app --reload --port 8000

# Producción
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker

# Tests
pytest

# Scripts de utilidad
python scripts/setup_db.py          # Configurar base de datos
python scripts/index_legal_docs.py  # Indexar documentos legales
python scripts/ingest_docs.py        # Ingestionar documentos
python scripts/query_rag.py          # Probar sistema RAG
```

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **Jotai** - Gestión de estado
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP

### Backend
- **FastAPI** - Framework web
- **Python 3.12+** - Lenguaje de programación
- **LangGraph** - Workflows con IA
- **LangChain** - Framework para LLMs
- **OpenAI** - Modelos de IA
- **PostgreSQL + pgvector** - Base de datos vectorial
- **Pydantic** - Validación de datos
- **uv** - Gestor de paquetes

## 📚 API Endpoints

### Triaje Jurídico
- `POST /api/v1/triaje` - Iniciar proceso de triaje jurídico
- `GET /api/v1/case/{case_id}` - Obtener información de un caso
- `POST /api/v1/feedback` - Enviar feedback sobre respuestas

### Documentación
La documentación interactiva de la API está disponible en:
- `http://localhost:8000/docs` (Swagger UI)
- `http://localhost:8000/redoc` (ReDoc)

## 🌐 Páginas de la Aplicación

- **Home** (`/`) - Página principal con características principales
- **About** (`/about`) - Sobre nosotros
- **Blog** (`/blog`) - Artículos Legal-Tech
- **Legal** (`/legal`) - Información legal
- **Sustainability** (`/sustainability`) - Impacto social y ambiental
- **Users** (`/users`) - Página de usuarios
- **WhatsApp** (`/whatsapp`) - Integración WhatsApp
- **What We Do** (`/what-we-do`) - Qué hacemos

## 🔐 Seguridad

- Validación de entrada con Pydantic
- Sanitización de contenido con DOMPurify
- Rate limiting configurado
- Variables de entorno para secretos
- CORS configurado apropiadamente

## 🐛 Solución de Problemas

### Frontend no inicia
- Verifica que Node.js 18+ esté instalado
- Ejecuta `npm install` para reinstalar dependencias
- Verifica que el puerto 5173 no esté en uso

### Backend no inicia
- Verifica que Python 3.12+ esté instalado
- Asegúrate de tener `uv` instalado
- Verifica que PostgreSQL esté corriendo
- Revisa las variables de entorno en `.env`
- Activa el entorno virtual: `source .venv/bin/activate`

### Problemas con la base de datos
- Verifica que PostgreSQL esté corriendo: `docker-compose ps`
- Revisa los logs: `docker-compose logs db`
- Asegúrate de que la extensión pgvector esté instalada

## 📝 Desarrollo

### Convenciones de Código
- Frontend: ESLint + Prettier configurados
- Backend: Seguir PEP 8 para Python
- Commits: Usar mensajes descriptivos

### Testing
```bash
# Backend
cd backend
pytest

# Frontend (si hay tests configurados)
npm test
```

## 🚢 Despliegue

### Frontend (GitHub Pages)
```bash
npm run build
npm run deploy
```

### Backend (Producción)
```bash
cd backend
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 📄 Licencia

Privado - Avocado Legal Tech

## 👥 Contribuidores

Equipo Avocado Legal Tech

## 📞 Soporte

Para soporte, contacta al equipo de desarrollo.

---

**Nota:** Este proyecto está en desarrollo activo. Algunas características pueden estar en fase de implementación.

