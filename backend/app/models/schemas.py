"""
Modelos Pydantic para el sistema.
"""
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


class TriajeRequest(BaseModel):
    """Request para iniciar triaje jurídico."""
    query: str = Field(..., min_length=10, max_length=5000, description="Consulta del usuario")
    session_id: Optional[str] = Field(None, description="ID de sesión para continuidad")
    user_id: Optional[str] = Field(None, description="ID del usuario")


class StructuredCase(BaseModel):
    """Caso estructurado extraído."""
    summary: str = Field(..., description="Resumen del caso")
    actors: List[str] = Field(default_factory=list, description="Actores involucrados")
    dates: List[str] = Field(default_factory=list, description="Fechas relevantes")
    jurisdiction: str = Field("nacional", description="Jurisdicción")
    tentative_area: str = Field("otros", description="Área legal tentativa")
    urgency: str = Field("medio", description="Nivel de urgencia")
    relevant_documents: List[str] = Field(default_factory=list, description="Documentos necesarios")


class FinalRecommendation(BaseModel):
    """Recomendación final del triaje."""
    area: str = Field(..., description="Área legal principal")
    diagnosis: str = Field(..., description="Diagnóstico detallado")
    risks: List[str] = Field(default_factory=list, description="Riesgos identificados")
    documents_needed: List[str] = Field(default_factory=list, description="Documentos necesarios")
    recommended_action: str = Field(..., description="Acción recomendada")
    estimated_cost: str = Field(..., description="Costo estimado")
    next_steps: List[str] = Field(default_factory=list, description="Próximos pasos")
    references: List[str] = Field(default_factory=list, description="Referencias legales")
    disclaimer: str = Field(..., description="Disclaimer legal")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Confianza del diagnóstico")
    quality_metrics: Dict[str, int] = Field(default_factory=dict, description="Métricas de calidad")


class TriajeResponse(BaseModel):
    """Response del triaje jurídico."""
    case_id: str = Field(..., description="ID único del caso")
    formatted_output: str = Field(..., description="Salida formateada para usuario")
    recommendation: FinalRecommendation = Field(..., description="Recomendación completa")
    iteration_count: int = Field(..., description="Número de iteraciones de calidad")
    processing_time: float = Field(..., description="Tiempo de procesamiento en segundos")


class QualityCheck(BaseModel):
    """Evaluación de calidad."""
    scores: Dict[str, int] = Field(..., description="Puntajes por criterio")
    total: int = Field(..., description="Puntaje total")
    passed: bool = Field(..., description="Si pasó la evaluación")
    feedback: List[str] = Field(default_factory=list, description="Comentarios")


class CaseMetadata(BaseModel):
    """Metadatos del caso para analytics."""
    case_id: str
    user_id: Optional[str]
    area: str
    confidence: float
    quality_score: int
    iterations: int
    created_at: datetime
    status: str = "completed"
