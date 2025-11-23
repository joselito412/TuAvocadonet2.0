import React, { useEffect, useState } from 'react';

const SocialImpact = ({ showLearnMore }) => {
  const [count, setCount] = useState(0);
  const target = 0; // Número objetivo de consultas (actualmente en 0)

  useEffect(() => {
    const duration = 2000; // 2 segundos
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Convertir el número a string y rellenar con ceros a la izquierda (6 dígitos)
  const countString = count.toString().padStart(6, '0');
  const digits = countString.split('');

  return (
    <section className="section-social-impact" id="social-impact">
      <div className="impact-header">
        <span className="eyebrow">NUESTRO COMPROMISO</span>
        <h2>Impacto Social & Ambiental</h2>
      </div>

      <div className="impact-grid">
        <div className="impact-card highlight">
          <div className="counter-wrapper">
            <div className="flip-counter">
              {digits.map((digit, index) => (
                <div key={index} className="flip-digit">
                  <div className="flip-digit-inner">
                    <span>{digit}</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="counter-label">Consultas Gratuitas Resueltas</span>
          </div>
          <p>Democratizando el acceso a la justicia a través de tecnología.</p>
        </div>

        <div className="impact-text-content">
          <h3>La Revolución LegalTech</h3>
          <p>
            <strong>Redefinición Estratégica:</strong> Transformamos el ejercicio legal automatizando tareas repetitivas para que los abogados se concentren en lo estratégico.
          </p>
          <p>
            <strong>Democratización:</strong> Facilitamos el acceso a la formalización y a la justicia ("Derecho Habilitador"), reduciendo barreras para pymes y ciudadanos.
          </p>
          <p>
            <strong>Paz Social:</strong> Al mejorar el acceso a la información legal, contribuimos directamente a disminuir la conflictividad y resolver disputas eficientemente.
          </p>
          
          {showLearnMore && (
            <div style={{ marginTop: '30px' }}>
              <a href="/#/sostenibilidad" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '12px 25px', fontSize: '0.9rem' }}>
                  Ver más impacto →
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialImpact;
