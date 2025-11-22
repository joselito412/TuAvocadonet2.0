"""
Sistema de logging y monitoreo centralizado.
"""
import logging
import sys
import json
from datetime import datetime
from typing import Any, Dict, Optional
from functools import wraps
import time

from app.config import settings


class JSONFormatter(logging.Formatter):
    """Formatter para logs estructurados en JSON."""
    
    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }
        
        # Agregar contexto adicional si existe
        if hasattr(record, "case_id"):
            log_data["case_id"] = record.case_id
        if hasattr(record, "user_id"):
            log_data["user_id"] = record.user_id
        if hasattr(record, "node_name"):
            log_data["node_name"] = record.node_name
        if hasattr(record, "duration"):
            log_data["duration_ms"] = record.duration
            
        # Agregar exception info si existe
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
            
        return json.dumps(log_data)


def setup_logging():
    """Configura logging global de la aplicación."""
    
    # Root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(settings.log_level)
    
    # Handler para stdout
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(settings.log_level)
    
    # Formatter
    if settings.log_format == "json":
        formatter = JSONFormatter()
    else:
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
    
    console_handler.setFormatter(formatter)
    
    # Agregar handler si no existe
    if not root_logger.handlers:
        root_logger.addHandler(console_handler)
    
    # Silenciar logs verbose de librerías
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)
    logging.getLogger("openai").setLevel(logging.INFO)
    
    return root_logger


class ContextLogger:
    """Logger con contexto enriquecido para casos jurídicos."""
    
    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
        self.case_id: Optional[str] = None
        self.user_id: Optional[str] = None
        self.node_name: Optional[str] = None
    
    def set_context(
        self,
        case_id: Optional[str] = None,
        user_id: Optional[str] = None,
        node_name: Optional[str] = None
    ):
        """Establece contexto para logs subsecuentes."""
        if case_id:
            self.case_id = case_id
        if user_id:
            self.user_id = user_id
        if node_name:
            self.node_name = node_name
    
    def _log(self, level: str, message: str, **kwargs):
        """Log interno con contexto."""
        extra = {
            "case_id": self.case_id,
            "user_id": self.user_id,
            "node_name": self.node_name,
            **kwargs
        }
        getattr(self.logger, level)(message, extra=extra)
    
    def debug(self, message: str, **kwargs):
        self._log("debug", message, **kwargs)
    
    def info(self, message: str, **kwargs):
        self._log("info", message, **kwargs)
    
    def warning(self, message: str, **kwargs):
        self._log("warning", message, **kwargs)
    
    def error(self, message: str, **kwargs):
        self._log("error", message, **kwargs)
    
    def critical(self, message: str, **kwargs):
        self._log("critical", message, **kwargs)


def log_node_execution(node_name: str):
    """
    Decorator para trackear ejecución de nodos LangGraph.
    Registra duración, errores y estado.
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(state: Dict[str, Any], *args, **kwargs):
            logger = ContextLogger(f"node.{node_name}")
            logger.set_context(
                case_id=state.get("session_id"),
                user_id=state.get("user_id"),
                node_name=node_name
            )
            
            start_time = time.time()
            logger.info(f"Starting node execution")
            
            try:
                result = await func(state, *args, **kwargs)
                
                duration = (time.time() - start_time) * 1000  # ms
                logger.info(
                    f"Node completed successfully",
                    duration=duration
                )
                
                # Agregar duración al estado
                if "node_durations" not in result:
                    result["node_durations"] = {}
                result["node_durations"][node_name] = duration
                
                return result
                
            except Exception as e:
                duration = (time.time() - start_time) * 1000
                logger.error(
                    f"Node failed with error: {str(e)}",
                    duration=duration,
                    exc_info=True
                )
                
                # Agregar error al estado
                if "errors" not in state:
                    state["errors"] = []
                state["errors"].append(f"{node_name}: {str(e)}")
                
                raise
        
        return wrapper
    return decorator


class MetricsCollector:
    """Colector de métricas para observabilidad."""
    
    def __init__(self):
        self.metrics: Dict[str, list] = {
            "node_durations": [],
            "quality_scores": [],
            "iteration_counts": [],
            "errors": []
        }
    
    def record_node_duration(self, node_name: str, duration_ms: float):
        """Registra duración de un nodo."""
        self.metrics["node_durations"].append({
            "node": node_name,
            "duration_ms": duration_ms,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    def record_quality_score(self, case_id: str, score: int):
        """Registra puntaje de calidad."""
        self.metrics["quality_scores"].append({
            "case_id": case_id,
            "score": score,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    def record_error(self, case_id: str, node: str, error: str):
        """Registra error ocurrido."""
        self.metrics["errors"].append({
            "case_id": case_id,
            "node": node,
            "error": error,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    def get_summary(self) -> Dict[str, Any]:
        """Obtiene resumen de métricas."""
        return {
            "total_cases": len(set(m["case_id"] for m in self.metrics["quality_scores"])),
            "total_errors": len(self.metrics["errors"]),
            "avg_quality_score": sum(m["score"] for m in self.metrics["quality_scores"]) / len(self.metrics["quality_scores"]) if self.metrics["quality_scores"] else 0,
            "node_performance": self._get_node_performance()
        }
    
    def _get_node_performance(self) -> Dict[str, Dict[str, float]]:
        """Calcula performance por nodo."""
        perf = {}
        for metric in self.metrics["node_durations"]:
            node = metric["node"]
            if node not in perf:
                perf[node] = {"count": 0, "total_ms": 0, "avg_ms": 0}
            perf[node]["count"] += 1
            perf[node]["total_ms"] += metric["duration_ms"]
        
        for node in perf:
            perf[node]["avg_ms"] = perf[node]["total_ms"] / perf[node]["count"]
        
        return perf


# Singleton global
metrics_collector = MetricsCollector()

# Setup inicial
setup_logging()
