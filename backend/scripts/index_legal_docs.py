"""
Script para indexar documentos legales en PGVector.

USO:
    python scripts/index_legal_docs.py --docs-dir data/legal_docs

REQUIERE:
1. PostgreSQL corriendo con pgvector extension
2. Tabla legal_embeddings creada
3. OpenAI API key configurada
4. Documentos legales en data/legal_docs/

ESTRUCTURA DE DIRECTORIOS:
data/legal_docs/
├── codigos/          # Códigos legales
├── leyes/            # Leyes específicas
├── jurisprudencia/   # Sentencias relevantes
└── plantillas/       # Plantillas de documentos
"""
import asyncio
import argparse
from pathlib import Path
from typing import List
import sys

# Agregar parent directory al path
sys.path.insert(0, str(Path(__file__).parent.parent))

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_postgres import PGVector
from langchain.schema import Document

from app.config import settings


# Mapeo de directorio -> área legal
AREA_MAPPING = {
    "codigo_civil": "civil",
    "codigo_laboral": "laboral",
    "codigo_penal": "penal",
    "codigo_comercio": "contractual",
    "ley_1581": "administrativo",  # Protección de datos
    "ley_789": "laboral",
    "familia": "familia",
    "consumo": "consumo",
    "propiedad_intelectual": "propiedad_intelectual"
}


def load_documents(docs_dir: Path) -> List[Document]:
    """Carga documentos del directorio."""
    documents = []
    
    for file_path in docs_dir.rglob("*.txt"):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Determinar área basado en filename
        area = "otros"
        for key, value in AREA_MAPPING.items():
            if key.lower() in file_path.stem.lower():
                area = value
                break
        
        # Crear documento
        doc = Document(
            page_content=content,
            metadata={
                "source": file_path.name,
                "area": area,
                "path": str(file_path)
            }
        )
        documents.append(doc)
    
    print(f"✓ Loaded {len(documents)} documents")
    return documents


def chunk_documents(documents: List[Document]) -> List[Document]:
    """Divide documentos en chunks manejables."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    
    chunks = text_splitter.split_documents(documents)
    print(f"✓ Created {len(chunks)} chunks from {len(documents)} documents")
    return chunks


async def index_documents(chunks: List[Document]):
    """Indexa documentos en PGVector."""
    
    print("Initializing embeddings...")
    embeddings = OpenAIEmbeddings(
        model=settings.openai_embedding_model,
        openai_api_key=settings.openai_api_key
    )
    
    print("Connecting to PostgreSQL...")
    vectorstore = PGVector(
        connection_string=settings.postgres_url,
        embedding_function=embeddings,
        collection_name="legal_embeddings",
        pre_delete_collection=False  # No borrar datos existentes
    )
    
    print(f"Indexing {len(chunks)} chunks...")
    print("⚠️  This may take several minutes...")
    
   # Batch processing para evitar rate limits
    batch_size = 50
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i:i+batch_size]
        await vectorstore.aadd_documents(batch)
        print(f"  ✓ Indexed batch {i//batch_size + 1}/{(len(chunks)-1)//batch_size + 1}")
    
    print(f"✅ Successfully indexed {len(chunks)} chunks!")


async def main():
    parser = argparse.ArgumentParser(description="Index legal documents into PGVector")
    parser.add_argument(
        "--docs-dir",
        type=str,
        default="data/legal_docs",
        help="Directory containing legal documents"
    )
    parser.add_argument(
        "--test",
        action="store_true",
        help="Test mode: only index first 10 documents"
    )
    
    args = parser.parse_args()
    
    docs_dir = Path(args.docs_dir)
    if not docs_dir.exists():
        print(f"❌ Error: Directory {docs_dir} does not exist")
        print("\n📁 Please create the directory and add legal documents:")
        print(f"   mkdir -p {docs_dir}/{{codigos,leyes,jurisprudencia,plantillas}}")
        return
    
    print(f"📁 Loading documents from: {docs_dir}")
    documents = load_documents(docs_dir)
    
    if len(documents) == 0:
        print("❌ No documents found! Add .txt files to the docs directory.")
        return
    
    if args.test:
        documents = documents[:10]
        print(f"🧪 Test mode: Using only {len(documents)} documents")
    
    chunks = chunk_documents(documents)
    
    await index_documents(chunks)
    
    print("\n✅ Done! You can now use the RAG service.")


if __name__ == "__main__":
    asyncio.run(main())
