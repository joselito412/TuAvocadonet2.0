import os
import asyncio
import asyncpg
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_NAME = os.getenv("POSTGRES_DB", "tuavocadonet")
DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")

async def setup_database():
    # Connect to default 'postgres' db to create the target db if it doesn't exist
    sys_conn = await asyncpg.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        database="postgres",
        host=DB_HOST,
        port=DB_PORT
    )

    # Check if db exists
    exists = await sys_conn.fetchval(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
    if not exists:
        print(f"Creating database {DB_NAME}...")
        await sys_conn.execute(f"CREATE DATABASE {DB_NAME}")
    else:
        print(f"Database {DB_NAME} already exists.")
    
    await sys_conn.close()

    # Connect to the target database
    conn = await asyncpg.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        host=DB_HOST,
        port=DB_PORT
    )

    print("Enabling pgvector extension...")
    await conn.execute("CREATE EXTENSION IF NOT EXISTS vector;")

    print("Creating legal_embeddings table...")
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS legal_embeddings (
            id SERIAL PRIMARY KEY,
            document_id VARCHAR(255),
            content TEXT,
            embedding vector(1536),
            metadata JSONB,
            area VARCHAR(50),
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    """)
    
    # Create HNSW index for faster similarity search
    print("Creating vector index...")
    await conn.execute("""
        CREATE INDEX IF NOT EXISTS legal_embeddings_embedding_idx 
        ON legal_embeddings 
        USING hnsw (embedding vector_cosine_ops);
    """)

    print("Database setup completed successfully.")
    await conn.close()

if __name__ == "__main__":
    asyncio.run(setup_database())
