# Guía de Preparación para Testing del Agente

## Estado Actual

✅ Estructura modular por nodos
✅ Sistema de logging robusto
✅ Configuración centralizada
✅ Prompts versionados
✅ Monitoreo de métricas

## Pasos Faltantes para Probar el Agente

### 1. Base de Datos PostgreSQL con pgvector

**Instalar PostgreSQL con pgvector:**

```bash
# macOS
brew install postgresql@15
brew install pgvector

# Iniciar PostgreSQL
brew services start postgresql@15
```

**Configurar Base de Datos:**

```sql
-- Conectar
psql postgres

-- Crear database
CREATE DATABASE consultorio_juridico;

-- Conectar a la DB
\c consultorio_juridico

-- Habilitar pgvector
CREATE EXTENSION vector;

-- Crear tabla (ver app/services/rag/rag_service.py para SQL completo)
```

### 2. Preparar Documentos Legales

**Crear estructura de directorios:**

```bash
mkdir -p backend/data/legal_docs/{codigos,leyes,jurisprudencia,plantillas}
```

**Agregar documentos (mínimo para testing):**

- `data/legal_docs/codigos/codigo_laboral.txt`
- `data/legal_docs/leyes/ley_1581_2012.txt`
- `data/legal_docs/leyes/ley_789_2002.txt`

**Fuentes sugeridas:**

- https://www.funcionpublica.gov.co/eva/gestornormativo
- https://www.secretariasenado.gov.co/leyes
- https://www.corteconstitucional.gov.co/

### 3. Indexar Documentos

```bash
cd backend

# Activar entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Descargar modelo spaCy español
python -m spacy download es_core_news_sm

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar:
# - OPENAI_API_KEY=sk-...
# - POSTGRES_PASSWORD=tu_password

# Indexar documentos
python scripts/index_legal_docs.py --docs-dir data/legal_docs
```

### 4. Implementar Nodos Faltantes

**Nodos implementados:**

- ✅ Preprocesador
- ✅ Extractor
- ⚠️ Router (parcial)
- ❌ Agents (Laboral, Civil, Penal, Familia, Otros)
- ❌ Unifier
- ❌ Evaluator
- ❌ Quality Loop
- ❌ Formatter
- ❌ Persistence

**Próximos a implementar:**

1. Router completo
2. Subagentes especializados
3. Sistema de evaluación

### 5. Configurar MongoDB (opcional para MVP)

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Iniciar
brew services start mongodb-community
```

### 6. Ejecutar API

```bash
cd backend

# Desarrollo
uvicorn app.main:app --reload --port 8000

# Verificar
curl http://localhost:8000/health
```

### 7. Testing del Agente

```bash
# Test simple
curl -X POST http://localhost:8000/api/v1/triaje \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Me despidieron sin justa causa después de 5 años trabajando. ¿Qué puedo hacer?",
    "session_id": "test-001"
  }'
```

### 8. Integración con Frontend

Actualizar `src/services/ragService.js`:

```javascript
const API_URL = "http://localhost:8000/api/v1";

export async function queryLegalConsultorio(query, sessionId) {
  const response = await fetch(`${API_URL}/triaje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, session_id: sessionId }),
  });
  return await response.json();
}
```

## Checklist de Testing

- [ ] PostgreSQL instalado y corriendo
- [ ] pgvector extension habilitada
- [ ] Tabla legal_embeddings creada
- [ ] Al menos 3 documentos legales agregados
- [ ] Documentos indexados exitosamente
- [ ] OpenAI API key configurada
- [ ] spaCy modelo español descargado
- [ ] API corriendo en localhost:8000
- [ ] Health check responde OK
- [ ] Endpoint /triaje responde (aunque sea mock)
- [ ] Logs estructurados funcionando
- [ ] Métricas siendo colectadas

## Estimación de Tiempo

- **Setup infraestructura:** 2-3 horas
- **Preparar documentos:** 2-4 horas (depende de fuentes)
- **Indexación:** 30min - 2 horas (depende de volumen)
- **Testing básico:** 1 hora
- **Total:** ~8-12 horas para MVP funcional

## Próximos Pasos Después del MVP

1. Implementar nodos restantes del workflow
2. Configurar MongoDB para persistencia
3. Optimizar prompts basado en resultados
4. Agregar más documentos legales
5. Implementar caching con Redis
6. Deploy a staging
