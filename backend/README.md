# Consultorio Jurídico IA - Backend

Sistema de triaje jurídico inteligente con LangGraph para orientación legal en Colombia.

## Requisitos

- Python 3.11+
- PostgreSQL 15+ con pgvector
- MongoDB 7.0+
- Redis 7.0+ (opcional, para caching)

## Instalación

```bash
# Instalar uv (si no lo tienes)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Inicializar proyecto e instalar dependencias
uv sync

# Activar entorno virtual
source .venv/bin/activate
```

## Configuración

1. **PostgreSQL con pgvector:**

```sql
CREATE EXTENSION vector;
```

2. **OpenAI API Key:**
   Obtener de https://platform.openai.com/api-keys

3. **MongoDB:**
   Crear base de datos `consultorio_juridico`

## Ejecución

```bash
# Desarrollo
uvicorn app.main:app --reload --port 8000

# Producción
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuración
│   ├── models/              # Pydantic models
│   ├── services/            # Lógica de negocio
│   │   ├── langgraph/       # Workflow LangGraph
│   │   ├── agents/          # Subagentes especializados
│   │   └── rag/             # Sistema RAG
│   ├── api/                 # Endpoints
│   └── db/                  # Database connections
├── tests/                   # Tests
├── data/                    # Datos legales
└── scripts/                 # Utilidades
```

## API Endpoints

- `POST /api/v1/triaje` - Iniciar triaje jurídico
- `GET /api/v1/case/{case_id}` - Obtener caso
- `POST /api/v1/feedback` - Enviar feedback

## Licencia

Privado - Avocado Legal Tech
