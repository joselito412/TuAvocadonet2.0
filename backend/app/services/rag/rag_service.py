"""
Configuración de RAG - Vector Store y Retrieval.

PASOS PARA CONFIGURAR:

1. **Crear Base de Datos PostgreSQL con pg vector:**
```sql
-- Conectar a PostgreSQL
psql -U postgres

-- Crear database
CREATE DATABASE consultorio_juridico;

-- Conectar a la DB
\c consultorio_juridico

-- Habilitar pgvector
CREATE EXTENSION vector;

-- Crear tabla de embeddings
CREATE TABLE legal_embeddings (
    id SERIAL PRIMARY KEY,
    document_id VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),  -- OpenAI ada-002 dimensión
    metadata JSONB,
    area VARCHAR(50),
    source VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda vectorial
CREATE INDEX ON legal_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Índice para filtros
CREATE INDEX idx_area ON legal_embeddings(area);
CREATE INDEX idx_metadata ON legal_embeddings USING gin(metadata);
```

2. **Preparar Documentos Legales:**
```
data/legal_docs/
├── codigos/
│   ├── codigo_civil.txt
│   ├── codigo_laboral.txt
│   ├── codigo_penal.txt
│   └── codigo_comercio.txt
├── leyes/
│   ├── ley_1581_2012.txt  (Protección de datos)
│   ├── ley_789_2002.txt   (Laboral)
│   └── ...
├── jurisprudencia/
│   └── sentencias_relevantes.txt
└── plantillas/
    └── documentos_legales.txt
```

3. **Script de Indexación:**
Ejecutar: `python scripts/index_legal_docs.py`

4. **Verificar Indexación:**
```sql
SELECT COUNT(*) FROM legal_embeddings;
SELECT area, COUNT(*) FROM legal_embeddings GROUP BY area;
```
"""
from typing import List, Dict, Optional
from langchain_openai import OpenAIEmbeddings
from langchain_postgres import PGVector
from langchain.text_splitter import RecursiveCharacterTextSplitter

from app.config import settings
from app.monitoring.logger import ContextLogger

logger = ContextLogger(__name__)


class LegalRAGService:
    """
    Servicio RAG para documentos legales colombianos.
    """
    
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            model=settings.openai_embedding_model,
            openai_api_key=settings.openai_api_key
        )
        
        self.vectorstore: Optional[PGVector] = None
        self._initialize_vectorstore()
    
    def _initialize_vectorstore(self):
        """Inicializa conexión a PGVector."""
        try:
            self.vectorstore = PGVector(
                connection_string=settings.postgres_url,
                embedding_function=self.embeddings,
                collection_name="legal_embeddings"
            )
            logger.info("Vector store initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize vector store: {e}")
            # Continuar sin RAG (modo degradado)
    
    async def retrieve_context(
        self,
        query: str,
        area: Optional[str] = None,
        k: int = 5
    ) -> List[Dict[str, str]]:
        """
        Recupera contexto legal relevante.
        
        Args:
            query: Consulta del usuario
            area: Filtro por área legal (opcional)
            k: Número de documentos a retornar
            
        Returns:
            Lista de documentos con content, source, metadata
        """
        if not self.vectorstore:
            logger.warning("Vector store not available, returning empty context")
            return []
        
        try:
            # Filtro por área si se especifica
            filter_dict = {"area": area} if area else None
            
            # Búsqueda vectorial
            docs = await self.vectorstore.asimilarity_search(
                query,
                k=k,
                filter=filter_dict
            )
            
            # Formatear resultados
            results = []
            for doc in docs:
                results.append({
                    "content": doc.page_content,
                    "source": doc.metadata.get("source", "unknown"),
                    "area": doc.metadata.get("area", "general"),
                    "relevance_score": doc.metadata.get("relevance_score", 0.0)
                })
            
            logger.info(f"Retrieved {len(results)} documents for query")
            return results
            
        except Exception as e:
            logger.error(f"RAG retrieval failed: {e}")
            return []
    
    async def hybrid_search(
        self,
        query: str,
        area: Optional[str] = None,
        keywords: Optional[List[str]] = None,
        k: int = 5
    ) -> List[Dict[str, str]]:
        """
        Búsqueda híbrida: vectorial + keyword.
        
        Combina similaridad semántica con coincidencia de keywords.
        """
        # TODO: Implementar búsqueda híbrida
        # Por ahora usa solo vectorial
        return await self.retrieve_context(query, area, k)


# Singleton global
rag_service = LegalRAGService()
