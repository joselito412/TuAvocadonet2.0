"""
Estado compartido del workflow LangGraph.
Define la estructura de datos que fluye entre nodos.
"""
from typing import TypedDict, List, Dict, Annotated, Optional
import operator
from datetime import datetime


class AgentState(TypedDict):
    """
    Estado compartido entre todos los nodos del workflow.
    
    Flujo:
    1. Preprocesador: user_query -> cleaned_text, language
    2. Extractor: cleaned_text -> structured_case
    3. Router: structured_case -> legal_areas, confidence
    4. Agents (paralelo): structured_case -> diagnoses (acumulativo)
    5. RAG: se ejecuta dentro de agents -> retrieved_docs (acumulativo)
    6. Unifier: diagnoses -> unified_diagnosis
    7. Evaluator: unified_diagnosis -> quality_check, evaluation_passed
    8. Quality Loop: puede reiniciar desde agents
    9. Formatter: unified_diagnosis -> formatted_output
    10. Persistence: guarda todo en DBs
    """
    
    # ===== INPUT (del usuario) =====
    user_query: str
    session_id: str
    user_id: Optional[str]
    
    # ===== PREPROCESADOR =====
    cleaned_text: str
    language: str
    
    # ===== EXTRACTOR =====
    structured_case: Dict[str, any]  # Schema: StructuredCase.dict()
    
    # ===== ROUTER =====
    legal_areas: List[str]  # Puede ser múltiple para casos complejos
    router_confidence: float
    
    # ===== AGENTS (acumulativo con operator.add) =====
    diagnoses: Annotated[List[Dict], operator.add]
    
    # ===== RAG (acumulativo) =====
    retrieved_docs: Annotated[List[Dict], operator.add]
    
    # ===== UNIFIER =====
    unified_diagnosis: Dict
    
    # ===== EVALUATOR =====
    quality_check: Dict
    evaluation_passed: bool
    iteration_count: int
    
    # ===== FORMATTER =====
    final_recommendation: Dict  # Schema: FinalRecommendation.dict()
    formatted_output: str
    
    # ===== METADATOS & TRACKING =====
    errors: Annotated[List[str], operator.add]
    warnings: Annotated[List[str], operator.add]
    node_durations: Dict[str, float]  # Tracking de performance
    created_at: datetime
    
    # ===== FLAGS DE CONTROL =====
    should_iterate: bool
    max_iterations_reached: bool


# Estado inicial por defecto
def create_initial_state(
    user_query: str,
    session_id: str,
    user_id: Optional[str] = None
) -> AgentState:
    """Crea estado inicial con valores por defecto."""
    return AgentState(
        # Input
        user_query=user_query,
        session_id=session_id,
        user_id=user_id,
        
        # Defaults vacíos
        cleaned_text="",
        language="es",
        structured_case={},
        legal_areas=[],
        router_confidence=0.0,
        diagnoses=[],
        retrieved_docs=[],
        unified_diagnosis={},
        quality_check={},
        evaluation_passed=False,
        iteration_count=0,
        final_recommendation={},
        formatted_output="",
        
        # Metadatos
        errors=[],
        warnings=[],
        node_durations={},
        created_at=datetime.utcnow(),
        
        # Flags
        should_iterate=False,
        max_iterations_reached=False
    )
