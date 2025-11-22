
import os
import asyncio
from dotenv import load_dotenv

from langchain.chains.retrieval_qa import RetrievalQA
from langchain_openai import OpenAI, OpenAIEmbeddings
from langchain_postgres import PGVector
from langchain_core.documents import Document

load_dotenv()

# Configuration
DB_CONNECTION = f"postgresql+psycopg2://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
COLLECTION_NAME = "legal_embeddings"

# Initialize components
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = PGVector(
    embeddings=embeddings,
    collection_name=COLLECTION_NAME,
    connection=DB_CONNECTION,
    use_jsonb=True,
)
retriever = vector_store.as_retriever(search_kwargs={"k": 4})

# LLM for answering
llm = OpenAI(model="gpt-4o-mini")

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
)

def ask_question(question: str):
    result = qa_chain.invoke({"query": question})
    answer = result.get("result")
    sources = result.get("source_documents", [])
    print("\nAnswer:\n", answer)
    if sources:
        print("\nSources:")
        for i, doc in enumerate(sources, 1):
            source = doc.metadata.get("source", "unknown")
            print(f"  {i}. {source}")

def main():
    print("Legal AI RAG Query Interface (type 'exit' to quit)")
    while True:
        try:
            query = input("\nYour question: ")
        except (EOFError, KeyboardInterrupt):
            break
        if query.strip().lower() in {"exit", "quit"}:
            break
        if not query.strip():
            continue
        ask_question(query)

if __name__ == "__main__":
    main()
