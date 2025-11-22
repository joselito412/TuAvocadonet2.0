# UV - Modern Python Package Manager

## ¿Qué es UV?

UV es un instalador de paquetes y gestor de entornos Python ultra-rápido escrito en Rust, creado por Astral (creadores de Ruff).

**Ventajas:**

- 10-100x más rápido que pip
- Gestión de entornos integrada
- Lock files automáticos
- Compatible con pyproject.toml
- Debugging visual integrado

## Instalación

### macOS/Linux

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Verificar instalación

```bash
uv --version
```

## Setup del Proyecto con UV

### 1. Crear entorno virtual

```bash
cd backend

# UV crea y activa el entorno automáticamente
uv venv

# Activar entorno (si necesitas manualmente)
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows
```

### 2. Instalar dependencias

```bash
# Desde requirements.txt
uv pip install -r requirements.txt

# O instalar paquetes individuales (mucho más rápido)
uv pip install fastapi uvicorn langchain langgraph
```

### 3. Convertir a pyproject.toml (recomendado)

```bash
# UV puede generar pyproject.toml desde requirements.txt
uv pip compile requirements.txt -o requirements.lock
```

## Debugging con UV

### Opción 1: Debugging Visual con VS Code

**Crear `.vscode/launch.json`:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "UV: FastAPI Debug",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--port", "8000"],
      "python": "${workspaceFolder}/backend/.venv/bin/python",
      "cwd": "${workspaceFolder}/backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/backend"
      },
      "console": "integratedTerminal",
      "justMyCode": false
    },
    {
      "name": "UV: Test Single Node",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/backend/tests/test_single_node.py",
      "python": "${workspaceFolder}/backend/.venv/bin/python",
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal"
    }
  ]
}
```

**Uso:**

1. Abre VS Code en la carpeta del proyecto
2. Ve a "Run and Debug" (Ctrl+Shift+D)
3. Selecciona "UV: FastAPI Debug"
4. Pon breakpoints en tu código
5. Presiona F5 para iniciar debugging

### Opción 2: Debugging con `debugpy` (Visual interactivo)

```bash
# Instalar debugpy
uv pip install debugpy
```

**Agregar a `app/main.py`:**

```python
import debugpy

# Solo en desarrollo
if settings.is_development:
    debugpy.listen(("0.0.0.0", 5678))
    print("⏳ Debugger waiting for attach on port 5678...")
    # debugpy.wait_for_client()  # Descomentar para esperar conexión
```

**Conectar desde VS Code:**

- F5 → "Python: Remote Attach" → puerto 5678

### Opción 3: UV Run con Debugging

```bash
# Ejecutar con debugging habilitado
uv run --with debugpy python -m debugpy --listen 5678 -m uvicorn app.main:app --reload
```

## Comandos UV Útiles

### Gestión de Paquetes

```bash
# Instalar paquete
uv pip install <package>

# Actualizar paquete
uv pip install --upgrade <package>

# Listar instalados
uv pip list

# Congelar dependencias
uv pip freeze > requirements.txt
```

### Ejecutar Scripts

```bash
# Ejecutar con UV (usa el venv automáticamente)
uv run python script.py

# Ejecutar tests
uv run pytest

# Ejecutar servidor
uv run uvicorn app.main:app --reload
```

### Lock Files

```bash
# Crear lock file
uv pip compile requirements.txt -o requirements.lock

# Instalar desde lock
uv pip sync requirements.lock
```

## Debugging Visual - Paso a Paso

### Setup Inicial

1. **Instalar UV:**

   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Crear entorno:**

   ```bash
   cd backend
   uv venv
   ```

3. **Instalar dependencias:**

   ```bash
   uv pip install -r requirements.txt
   uv pip install debugpy
   ```

4. **Instalar VS Code Python extension**

### Debugging en VS Code

1. **Configurar launch.json** (ya creado arriba)

2. **Poner breakpoints:**

   - Click izquierdo en el margen de línea
   - O presiona F9 en la línea

3. **Iniciar debugging:**

   - Presiona F5
   - O click en "▶ Start Debugging"

4. **Controles:**

   - F5: Continue
   - F10: Step Over
   - F11: Step Into
   - Shift+F11: Step Out
   - F9: Toggle Breakpoint

5. **Inspeccionar:**
   - Ver variables en panel izquierdo
   - Hover sobre variables para ver valores
   - Usar "Debug Console" para ejecutar código

### Debugging de Nodos LangGraph

```python
# En cualquier nodo, agregar:
from app.monitoring.logger import ContextLogger
logger = ContextLogger(__name__)

@log_node_execution("my_node")
async def my_node(state):
    # Pon breakpoint aquí
    logger.info(f"State: {state}")  # Ver en logs

    # Tu lógica
    result = process_data(state)

    # Otro breakpoint
    return updated_state
```

### Debugging de API Requests

1. **Iniciar con debugging:**

   ```bash
   # Terminal 1: Servidor con debugging
   uv run uvicorn app.main:app --reload --port 8000
   ```

2. **Hacer request:**

   ```bash
   # Terminal 2: Test request
   curl -X POST http://localhost:8000/api/v1/triaje \
     -H "Content-Type: application/json" \
     -d '{"query": "Test query", "session_id": "debug-001"}'
   ```

3. **Ver ejecución:**
   - Breakpoints se activarán
   - Inspecciona `state`, `request`, etc.

## Tips de Debugging

### 1. Conditional Breakpoints

- Right-click en breakpoint
- "Edit Breakpoint"
- Agregar condición: `case_id == "debug-001"`

### 2. Logpoints

- No para ejecución
- Solo imprime mensaje
- Right-click → "Add Logpoint"

### 3. Watch Expressions

- Panel "Watch"
- Agregar expresiones para monitorear
- Ejemplo: `state["legal_areas"]`

### 4. Call Stack

- Ver toda la cadena de llamadas
- Navegar entre frames
- Útil para entender flujo

## Integración con LangGraph Studio (Opcional)

LangGraph tiene su propio visualizador:

```bash
# Instalar LangGraph Studio
uv pip install "langgraph[studio]"

# Lanzar visualizador
langgraph studio
```

## Performance Comparison

```bash
# Benchmark: pip vs UV
time pip install langchain        # ~45s
time uv pip install langchain     # ~3s

# 15x más rápido! 🚀
```

## Troubleshooting

### UV no encuentra python

```bash
# Especificar versión Python
uv venv --python 3.11
```

### Conflictos de dependencias

```bash
# Ver resolución
uv pip install --dry-run -r requirements.txt
```

### Debugging no se conecta

```bash
# Verificar puerto
lsof -i :5678

# Verificar que debugpy está instalado en el venv correcto
uv pip list | grep debugpy
```

## Próximos Pasos

1. Instalar UV
2. Crear venv con UV
3. Instalar dependencias
4. Configurar VS Code debugging
5. Poner breakpoint y probar

¿Alguna duda sobre UV o debugging?
