"""
Configuración de la aplicación.
Carga variables de entorno y define configuraciones globales.
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Configuración de la aplicación."""
    
    # Environment
    environment: str = "development"
    
    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_prefix: str = "/api/v1"
    
    # OpenAI
    openai_api_key: str
    openai_model: str = "gpt-4"
    openai_embedding_model: str = "text-embedding-ada-002"
    
    # PostgreSQL
    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "consultorio_juridico"
    postgres_user: str = "postgres"
    postgres_password: str
    
    # MongoDB
    mongodb_url: str = "mongodb://localhost:27017"
    mongodb_db: str = "consultorio_juridico"
    
    # Redis
    redis_url: str = "redis://localhost:6379/0"
    
    # Security
    secret_key: str
    allowed_origins: list[str] = ["http://localhost:5173"]
    
    # Rate Limiting
    max_requests_per_minute: int = 10
    max_iterations: int = 3
    
    # Quality
    min_quality_score: int = 35
    evaluation_temperature: float = 0.0
    
    # Logging
    log_level: str = "INFO"
    log_format: str = "json"
    
    # Legal
    disclaimer_text: str = "La información es orientativa y no constituye asesoría legal profesional."
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
    
    @property
    def postgres_url(self) -> str:
        """Construye URL de conexión PostgreSQL."""
        return f"postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
    
    @property
    def is_development(self) -> bool:
        """Verifica si está en modo desarrollo."""
        return self.environment == "development"


@lru_cache()
def get_settings() -> Settings:
    """Obtiene configuración singleton."""
    return Settings()


# Instancia global
settings = get_settings()
