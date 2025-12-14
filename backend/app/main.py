"""
Aplicación principal FastAPI.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings

# Configurar logging
logging.basicConfig(
    level=settings.log_level,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events."""
    logger.info("🚀 Starting Backend...")
    logger.info(f"Environment: {settings.environment}")
    
    yield
    
    # Cleanup
    logger.info("👋 Shutting down...")


# Crear aplicación
app = FastAPI(
    title="TuAvocadonet Backend",
    description="Backend API for TuAvocadonet",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "service": "Consultorio Jurídico IA",
        "version": "1.0.0",
        "environment": settings.environment
    }


@app.get("/health")
async def health():
    """Detailed health check."""
    return {
        "status": "healthy",
        "checks": {
            "api": "ok",
            # TODO: Add database checks
            # "postgres": "ok",
            # "mongodb": "ok",
            # "openai": "ok"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.is_development
    )
