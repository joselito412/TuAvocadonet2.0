"""
Definición del Grafo Principal (Workflow).
Conecta todos los nodos y define el flujo de ejecución.
"""
from langgraph.graph import StateGraph, END
from app.services.langgraph.state import AgentState, create_initial_state
from app.services.nodes.preprocessor.node import preprocessor_node
from app.services.nodes.extractor.node import extractor_node

# Importar otros nodos cuando estén listos
# from app.services.nodes.router.node import router_node
# ...

def define_graph():
    """Define la estructura del grafo."""
    
    # 1. Inicializar grafo con el estado tipado
    workflow = StateGraph(AgentState)
    
    # 2. Agregar nodos
    workflow.add_node("preprocessor", preprocessor_node)
    workflow.add_node("extractor", extractor_node)
    
    # TODO: Agregar nodos restantes
    # workflow.add_node("router", router_node)
    # ...
    
    # 3. Definir edges (flujo)
    workflow.set_entry_point("preprocessor")
    
    workflow.add_edge("preprocessor", "extractor")
    
    # Por ahora terminamos en extractor hasta tener el router
    workflow.add_edge("extractor", END)
    
    # 4. Compilar
    return workflow.compile()

# Instancia del grafo compilado para ser usada por LangGraph CLI/API
graph = define_graph()
