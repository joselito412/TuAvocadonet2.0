"""
Nodo Preprocesador - Limpieza y normalización de texto.
"""
from typing import Dict, Any
import spacy
from app.services.langgraph.state import AgentState
from app.monitoring.logger import log_node_execution, ContextLogger

logger = ContextLogger(__name__)

# TODO: Cargar modelo spaCy en startup
# nlp = spacy.load("es_core_news_sm")


@log_node_execution("preprocessor")
async def preprocessor_node(state: AgentState) -> AgentState:
    """
    Preprocesa la consulta del usuario.
    
    1. Limpia texto (whitespace, caracteres especiales)
    2. Normaliza ortografía básica
    3. Detec ta idioma
    4. Tokeniza (opcional)
    
    Args:
        state: Estado actual con user_query
        
    Returns:
        Estado actualizado con cleaned_text y language
    """
    logger.set_context(case_id=state["session_id"])
    logger.info("Preprocessing user query")
    
    text = state["user_query"]
    
    # 1. Limpieza básica
    cleaned = text.strip()
    # TODO: Normalización más agresiva si es necesario
    
    # 2. Detección de idioma (por ahora asumimos español)
    language = "es"
    # TODO: Implementar detección real con langdetect
    
    logger.info(f"Preprocessed query: {len(cleaned)} chars, language: {language}")
    
    return {
        **state,
        "cleaned_text": cleaned,
        "language": language
    }
