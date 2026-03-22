# Git Quick Reference

## 🔐 SEGURIDAD PRE-COMMIT (CRITICAL)

Antes de originar cualquier commit en git, sigue estrictamente este flujo:

1. **STOP** - Detener cualquier pensamiento de auto-commit. Ningún auto-commit sin revisión del usuario.
2. **CHEQUEO DE FUGAS (LEAK CHECK)** - Ejecuta obligatoriamente el siguiente comando:
   ```bash
   git diff --staged | grep -E "api_key|password|secret|token|sk-|eyJh"
   ```
3. **EVALUACIÓN** - Si el comando anterior arroja CUALQUIER resultado, o si tienes *cualquier* duda sobre lo que vas a subir:
   - **PREGUNTA** al usuario inmediatamente.
   - **NO COMMIT**.

**ESTRICTAMENTE PROHIBIDO:**
- Hacer commit de archivos `.env`.
- Hacer commit de claves API (Ej. OpenAI, Supabase, Resend, etc.).
- Hacer commit de contraseñas de bases de datos o servicios en la nube.
- Hacer commit de cualquier token JWT (`eyJh...`).
