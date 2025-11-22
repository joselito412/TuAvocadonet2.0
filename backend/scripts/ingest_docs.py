import os
import glob
import asyncio
from typing import List
from dotenv import load_dotenv

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_postgres import PGVector
from langchain_core.documents import Document

load_dotenv()

# Configuration
DB_CONNECTION = f"postgresql+psycopg2://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
COLLECTION_NAME = "legal_embeddings"

def load_documents(directory: str) -> List[Document]:
    """Loads text files from the specified directory."""
    documents = []
    files = glob.glob(os.path.join(directory, "*.txt"))
    
    print(f"Found {len(files)} files in {directory}")
    
    for file_path in files:
        try:
            loader = TextLoader(file_path, encoding="utf-8")
            docs = loader.load()
            # Add metadata
            for doc in docs:
                doc.metadata["source"] = os.path.basename(file_path)
                doc.metadata["area"] = "constitucional" # Default for sample
            documents.extend(docs)
            print(f"Loaded {file_path}")
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
            
    return documents

def split_documents(documents: List[Document]) -> List[Document]:
    """Splits documents into chunks."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    return text_splitter.split_documents(documents)

def ingest_data():
    print("Starting ingestion process...")
    
    # 1. Load Documents
    raw_docs = load_documents("data/raw")
    if not raw_docs:
        print("No documents found to ingest.")
        return

    # 2. Split Documents
    chunks = split_documents(raw_docs)
    print(f"Split into {len(chunks)} chunks.")

    # 3. Initialize Embeddings & Vector Store
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    
    vector_store = PGVector(
        embeddings=embeddings,
        collection_name=COLLECTION_NAME,
        connection=DB_CONNECTION,
        use_jsonb=True,
    )

    # 4. Index Data (sync)
    print("Indexing chunks into PGVector...")
    vector_store.add_documents(chunks)
    
    print("Ingestion completed successfully!")

if __name__ == "__main__":
    ingest_data()
