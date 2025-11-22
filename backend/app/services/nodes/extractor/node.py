"""
Nodo Extractor - Extrae información estructurada del caso.
"""
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import PydanticOutputParser

from app.services.langgraph.state import AgentState
from app.services.langgraph.prompts import EXTRACTOR_PROMPT
from app.models.schemas import StructuredCase
from app.monitoring.logger import log_node_execution, ContextLogger
from app.config import settings

logger = ContextLogger(__name__)


@log_node_execution("extractor")
async def extractor_node(state: AgentState) -> AgentState:
    """
    Extrae información estructurada del caso.
    
    Usa GPT-4 para identificar:
    - Resumen
    - Actores
    - Fechas
    - Jurisdicción
    - Área tentativa
    - Urgencia
    - Documentos necesarios
    
    Args:
        state: Con cleaned_text
        
    Returns:
        Estado con structured_case
    """
    logger.set_context(case_id=state["session_id"])
    logger.info("Extracting structured information")
    
    # Parser Pydantic
    parser = PydanticOutputParser(pydantic_object=StructuredCase)
    
    # LLM
    llm = ChatOpenAI(
        model=settings.openai_model,
        temperature=0,
        api_key=settings.openai_api_key
    )
    
    # Construir prompt
    messages = EXTRACTOR_PROMPT.format_messages(
        query=state["cleaned_text"]
    )
    messages.append({
        "role": "system",
        "content": parser.get_format_instructions()
    })
    
    try:
        # Invocar LLM
        result = await llm.ainvoke(messages)
        
        # Parse resultado
        structured = parser.parse(result.content)
        
        logger.info(f"Extracted case - Area: {structured.tentative_area}, Urgency: {structured.urgency}")
        
        return {
            **state,
            "structured_case": structured.dict()
        }
        
    except Exception as e:
        logger.error(f"Extraction failed: {str(e)}")
        
        # Fallback: estructura mínima
        return {
            **state,
            "structured_case": {
                "summary": state["cleaned_text"][:200],
                "actors": [],
                "dates": [],
                "jurisdiction": "nacional",
                "tentative_area": "otros",
                "urgency": "medio",
                "relevant_documents": []
            },
            "warnings": state.get("warnings", []) + ["Extracción parcial - usando fallback"]
        }
