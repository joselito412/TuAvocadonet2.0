import { z } from 'zod';

export const ragQuerySchema = z.object({
  query: z.string().min(5, "La consulta debe tener al menos 5 caracteres").max(500, "La consulta no puede exceder los 500 caracteres"),
  context: z.string().optional(),
});

export type RagQuery = z.infer<typeof ragQuerySchema>;

export const ragResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(z.string()).optional(),
});

export type RagResponse = z.infer<typeof ragResponseSchema>;
