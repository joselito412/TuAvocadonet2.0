import React from 'react';
import SocialImpact from '../components/SocialImpact';

const SustainabilityPage = () => {
  return (
    <div className="section-block" style={{ background: 'var(--color-light)', paddingBottom: '0' }}>
      
      {/* Section 1: Hero & Counter */}
      <div className="content-wrapper text-center mb-60">
        <h1 style={{ marginBottom: '20px' }}>Impacto Social & Ambiental</h1>
        <p className="lead-text" style={{ margin: '0 auto 40px' }}>
          Cómo Avocado es un proyecto positivo para el ambiente y la sociedad.
        </p>
        
        {/* Integrated Counter Component */}
        <div style={{ transform: 'scale(0.9)', marginBottom: '-40px' }}>
          <SocialImpact />
        </div>
      </div>

      {/* Section 2: The 3 Pillars */}
      <div style={{ background: 'white', padding: '80px 0' }}>
        <div className="content-wrapper">
          <h2 className="text-center mb-60">Nuestros Pilares de Impacto</h2>
          
          <div className="grid-container grid-3">
            {/* Pillar 1 */}
            <div className="dashboard-card" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#f8f9fa' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>⚖️</div>
              <h3>Redefinición Legal</h3>
              <p>
                <strong>Innovación:</strong> Lideramos el cambio de paradigma en el ejercicio legal.
              </p>
              <p>
                <strong>Talento:</strong> Automatizamos lo repetitivo para que los abogados se enfoquen en valor estratégico, mejorando la retención y calidad de vida.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="dashboard-card" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#e8f5e9' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🌍</div>
              <h3>Impacto Social</h3>
              <p>
                <strong>Democratización:</strong> Eliminamos barreras de entrada para pymes y ciudadanos.
              </p>
              <p>
                <strong>Derecho Habilitador:</strong> Facilitamos el acceso a la justicia como llave para ejercer otros derechos fundamentales.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="dashboard-card" style={{ flexDirection: 'column', alignItems: 'flex-start', background: '#e3f2fd' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🎓</div>
              <h3>Educación Ciudadana</h3>
              <p>
                <strong>Participación:</strong> El acceso a información legal clara promueve una ciudadanía activa.
              </p>
              <p>
                <strong>Paz Social:</strong> La resolución eficiente de disputas disminuye la conflictividad en la sociedad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Manifesto */}
      <div className="section-block" style={{ background: 'var(--color-dark)', color: 'white' }}>
        <div className="content-wrapper text-center">
          <h2 style={{ color: 'var(--color-accent)', marginBottom: '30px' }}>Manifiesto LegalTech</h2>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
            "La eficiencia técnica se traduce directamente en valor social. No solo hacemos el derecho más rápido, lo hacemos más humano, accesible y justo para todos."
          </p>
        </div>
      </div>

    </div>
  );
};

export default SustainabilityPage;
