import React from 'react';
import { analytics } from '../utils/analytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to analytics
    analytics.trackError(error, {
      componentStack: errorInfo.componentStack,
      component: this.props.name || 'Unknown'
    });

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // Optionally reload the page or navigate
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#FFF3E0',
          borderRadius: '12px',
          margin: '20px',
          border: '2px solid #FF6D00'
        }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: '#FF6D00', marginBottom: '20px' }}></i>
          <h2 style={{ color: '#E65100', marginBottom: '15px' }}>
            {this.props.fallbackTitle || 'Algo salió mal'}
          </h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            {this.props.fallbackMessage || 'Lo sentimos, ocurrió un error inesperado. Nuestro equipo ha sido notificado.'}
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginBottom: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
                Ver detalles técnicos
              </summary>
              <pre style={{
                background: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '0.85rem',
                textAlign: 'left'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <button
            onClick={this.handleReset}
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
