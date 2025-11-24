import { config, isDevelopment } from '../config/config';
import { RateLimiter, sanitizeInput } from '../utils/security';
import { analytics } from '../utils/analytics';
import { ragQuerySchema, type RagResponse } from '../schemas/rag';
import { api } from '../lib/axios';

const rateLimiter = new RateLimiter(config.maxRequestsPerWindow, config.rateLimitWindow);

export async function queryLegalAssistant(query: string): Promise<string> {
  // Rate limiting check
  if (!rateLimiter.canMakeRequest()) {
    analytics.trackAction('rate_limit_exceeded', { query: query.substring(0, 50) });
    throw new Error('Demasiadas solicitudes. Por favor, espera un momento y vuelve a intentar.');
  }

  // Validate and sanitize input using Zod
  const validationResult = ragQuerySchema.safeParse({ query });
  
  if (!validationResult.success) {
    throw new Error(validationResult.error.issues[0].message);
  }

  const sanitizedQuery = sanitizeInput(validationResult.data.query, config.maxMessageLength);

  if (isDevelopment()) {
    console.log("Querying RAG with:", sanitizedQuery.substring(0, 100));
  }

  analytics.trackAction('ai_query', { 
    queryLength: sanitizedQuery.length,
    remainingRequests: rateLimiter.getRemainingRequests()
  });

  try {
    // Connect to real Vector DB via Axios
    // We use the defined RagResponse type for strict typing of the response data
    const response = await api.post<RagResponse>('/rag/query', { query: sanitizedQuery });
    return response.data.answer;
    
    /* 
    // Simulated RAG response (kept for reference/fallback if needed)
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = sanitizedQuery.toLowerCase();
        if (lowerQuery.includes('contrato')) {
          resolve("## Revisión de Contrato\n\nPara revisar tu contrato de manera efectiva, necesito más información:\n\n1. **Tipo de contrato**: ¿Es de arrendamiento, laboral, prestación de servicios?\n2. **Cláusulas específicas**: ¿Qué cláusulas te generan dudas?\n\n¿Podrías proporcionarme estos detalles para ayudarte mejor?");
        } else if (lowerQuery.includes('petición') || lowerQuery.includes('peticion')) {
          resolve("## Derecho de Petición\n\nEl derecho de petición es fundamental en Colombia (Art. 23 Constitución). Puedo ayudarte a redactarlo.\n\n**Información necesaria:**\n- Entidad destinataria\n- Tu solicitud principal\n- Fundamento de tu petición\n\n¿Me podrías dar estos detalles?");
        } else if (lowerQuery.includes('multa') || lowerQuery.includes('tránsito')) {
          resolve("## Impugnación de Multa de Tránsito\n\nPara impugnar una multa es clave revisar:\n\n1. **Fecha de notificación** (tienes 3 días hábiles)\n2. **Debido proceso**\n3. **Evidencia fotográfica**\n\n¿Cuándo recibiste el comparendo?");
        } else {
          resolve("## Asesoría Legal\n\nEntiendo tu consulta. Como asistente legal IA, puedo guiarte con información general basada en la normativa vigente.\n\n**Para casos específicos**, te recomiendo conectar con uno de nuestros abogados especialistas.\n\n¿Te gustaría que te conecte?");
        }
      }, 1500);
    });
    */
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    analytics.trackError(new Error(errorMessage), { context: 'RAG query', query: sanitizedQuery.substring(0, 50) });
    throw new Error('Error al conectar con el servicio de asesoría legal. Intenta nuevamente.');
  }
}
