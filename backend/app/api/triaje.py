"""
API Router para triaje jurídico.
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks
from uuid import uuid4
import time
import logging

from app.models.schemas import TriajeRequest, TriajeResponse, FinalRecommendation
from app.config import settings

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=TriajeResponse)
async def create_triaje(
    request: TriajeRequest,
    background_tasks: BackgroundTasks
):
    """
    Iniciar triaje jurídico completo.
    
    Ejecuta el workflow LangGraph completo:
    1. Preprocesador
    2. Extractor Estructurado
    3. Router Jurídico
    4. Subagentes Especializados (paralelo)
    5. Unificador
    6. Evaluador (Judge)
    7. Quality Loop (si es necesario)
    8. Recomendación Final
    9. Formatter
    10. Persistencia
    """
    start_time = time.time()
    
    try:
        # Generar IDs
        case_id = request.session_id or str(uuid4())
        
        logger.info(f"Starting triaje for case {case_id}")
        
        # TODO: Implementar workflow LangGraph
        # Por ahora, respuesta mock
        
        mock_recommendation = FinalRecommendation(
            area="laboral",
            diagnosis="""
            ## Análisis Preliminar
            
            Basado en tu consulta, parece tratarse de un caso laboral relacionado con derechos del trabajador.
            
            **Aspectos principales:**
            - Posible terminación unilateral del contrato
            - Derechos de indemnización aplicables
            - Procedimiento de reclamación ante el Ministerio de Trabajo
            
            **Base legal:**
            - Código Sustantivo del Trabajo (Art. 64)
            - Ley 789 de 2002
            """,
            risks=[
                "Prescripción de la acción (3 años desde el hecho)",
                "Falta de documentación puede debilitar el caso",
                "Posible necesidad de conciliación previa"
            ],
            documents_needed=[
                "Contrato de trabajo",
                "Desprendibles de nómina",
                "Comunicación de terminación (si existe)",
                "Historia laboral"
            ],
            recommended_action="Consultar con abogado laboralista para evaluación completa del caso",
            estimated_cost="$500,000 - $2,000,000 COP (consulta + trámite inicial)",
            next_steps=[
                "Reunir toda la documentación laboral",
                "Agendar consulta con abogado laboralista",
                "Preparar cronología detallada de eventos",
                "Verificar plazos de prescripción"
            ],
            references=[
                "Código Sustantivo del Trabajo - Colombia",
                "Ley 789 de 2002",
                "Ley 1496 de 2011 (igualdad salarial)"
            ],
            disclaimer=settings.disclaimer_text,
            confidence_score=0.85,
            quality_metrics={
                "claridad": 8,
                "fundamentacion": 9,
                "riesgos": 8,
                "disclaimer": 10,
                "acciones": 9
            }
        )
        
        formatted_output = f"""
📋 **Diagnóstico Legal - Caso #{case_id[:8]}**

**Área:** {mock_recommendation.area.upper()}

{mock_recommendation.diagnosis}

⚠️ **Riesgos Identificados:**
{chr(10).join(f"• {r}" for r in mock_recommendation.risks)}

📄 **Documentos Necesarios:**
{chr(10).join(f"• {d}" for d in mock_recommendation.documents_needed)}

✅ **Próximos Pasos:**
{chr(10).join(f"{i+1}. {s}" for i, s in enumerate(mock_recommendation.next_steps))}

💰 **Costo Estimado:** {mock_recommendation.estimated_cost}

---
{mock_recommendation.disclaimer}
        """
        
        processing_time = time.time() - start_time
        
        response = TriajeResponse(
            case_id=case_id,
            formatted_output=formatted_output.strip(),
            recommendation=mock_recommendation,
            iteration_count=0,
            processing_time=processing_time
        )
        
        # TODO: Persistir en background
        # background_tasks.add_task(save_case, case_id, request, response)
        
        logger.info(f"Triaje completed for case {case_id} in {processing_time:.2f}s")
        
        return response
        
    except Exception as e:
        logger.error(f"Error in triaje: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error procesando triaje: {str(e)}")


@router.get("/{case_id}")
async def get_case(case_id: str):
    """Obtener caso por ID."""
    # TODO: Implementar recuperación desde MongoDB
    raise HTTPException(status_code=501, detail="Not implemented yet")
