import React, { useState, useEffect } from 'react';

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('creator');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Detection Hook
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = {
    creator: {
      key: 'creator',
      headline: "Protege tu genialidad sin quemar tu presupuesto.",
      pain: "Eres como Andrés: vives de tu código o diseño. Sabes que deberías proteger tu Propiedad Intelectual, pero la sola idea de contratar un abogado tradicional te suena a pesadilla burocracia y facturas impagables. La lentitud te expone al plagio.",
      solution: [
        { title: "WhatsApp First", desc: "Valida la viabilidad de tu marca con nuestra IA en minutos." },
        { title: "Documentos al Instante", desc: "Genera NDAs y Licencias de uso mientras te tomas un café." },
        { title: "Accesible", desc: "Protección legal profesional por una fracción del costo de un error." }
      ],
      tool: "Plan Junior ($15/mes)",
      cta: "Empezar con Plan Junior",
      microcopy: "Te toma 2 minutos. Sin tarjeta de crédito.",
      className: "creator",
      btnClass: "btn-primary",
      label: "Soy Creador / Freelancer"
    },
    startup: {
      key: 'startup',
      headline: "Cierra la ronda de inversión. Elimina la deuda legal.",
      pain: "Como Catalina, sientes que cada día esperando la revisión de un contrato es capital que no entra. Los VCs exigen un compliance impecable, pero tu abogado tarda semanas. Tienes miedo de que una cláusula mal redactada hoy sea tu ruina mañana.",
      solution: [
        { title: "Revisión Híbrida", desc: "Nuestra IA redacta en 5 min; si detectamos alto riesgo, interviene un Abogado Senior." },
        { title: "Dashboard Transparente", desc: "Todo tu compliance organizado para la Due Diligence." },
        { title: "Bolsa de Ahorro Legal", desc: "Parte de tu fee te protege contra futuros litigios." }
      ],
      tool: "Plan Senior ($100/mes)",
      cta: "Blindar mi Startup (Plan Senior)",
      microcopy: "Agenda una demo de 15 min con un Legal Ops.",
      className: "startup",
      btnClass: "btn-primary",
      label: "Soy Startup Founder"
    },
    enterprise: {
      key: 'enterprise',
      headline: "Automatiza el riesgo. Haz que el Compliance sea invisible.",
      pain: "El caso de Roberto: Cientos de transacciones diarias significan cientos de riesgos de PQR o multas de datos. No necesitas un bufete que te cobre por hora; necesitas un sistema que trabaje mientras duermes.",
      solution: [
        { title: "Integración API", desc: "Conecta nuestro motor legal directamente a tu flujo de ventas." },
        { title: "Respuesta Automática", desc: "Resolvemos reclamos y generamos documentos de compliance en tiempo real." },
        { title: "Marca Blanca", desc: "Tu cliente se siente protegido por ti, respaldado por nosotros." }
      ],
      tool: "API & Enterprise (Custom Integration)",
      cta: "Contactar Ventas / API Docs",
      microcopy: "Hablemos de tu integración a medida.",
      className: "enterprise",
      btnClass: "btn-primary",
      label: "Soy Plataforma / Enterprise"
    }
  };

  const renderContentCard = (data) => (
    <div className={`user-content-card ${data.className}`}>
      <div className="max-w-4xl mx-auto">
        {isMobile && <h3 className="text-center text-primary mb-4">{data.label}</h3>}
        <h2 className="text-center mb-40 text-2xl md:text-4xl">
          {data.headline}
        </h2>

        <div className="pain-solution-grid">
          <div>
            <h3 className="mb-5 flex items-center gap-3">
              <span>😓</span> El Dolor
            </h3>
            <p className="leading-relaxed text-gray-600">
              {data.pain}
            </p>
          </div>
          
          <div>
            <h3 className="mb-5 flex items-center gap-3">
              <span>🥑</span> La Solución AVOCADO
            </h3>
            <ul className="list-none p-0">
              {data.solution.map((item, idx) => (
                <li key={idx} className="mb-4 flex gap-3">
                  <i className="fas fa-check-circle text-primary mt-1"></i>
                  <div>
                    <strong className="block text-dark">{item.title}</strong>
                    <span className="text-sm text-gray-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center border-t border-gray-200 pt-8">
          <p className="mb-5 text-lg">
            Tu Herramienta Ideal: <strong className="text-dark">{data.tool}</strong>
          </p>
          
          <button className={data.btnClass}>
            {data.cta}
          </button>
          
          <p className="mt-4 text-sm italic text-gray-500">
            {data.microcopy}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="section-block" style={{ background: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="content-wrapper text-center mb-60">
        <h1 className="mb-5">
          La legalidad no es talla única. <span className="text-secondary">Elige tu batalla.</span>
        </h1>
        <p className="lead-text mx-auto">
          Desde proteger tu primera línea de código hasta automatizar el compliance de un e-commerce masivo. 
          Nuestra arquitectura se adapta a tu velocidad, no al revés.
        </p>
      </div>

      <div className="content-wrapper">
        
        {/* DESKTOP: Tabs View */}
        {!isMobile ? (
          <>
            <div className="users-tabs-container">
              {Object.values(content).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`user-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {renderContentCard(content[activeTab])}
          </>
        ) : (
          /* MOBILE: Swipe Cards View */
          <div className="swipe-cards-container">
            {Object.values(content).map((tab) => (
              <div key={tab.key} className="swipe-card">
                {renderContentCard(tab)}
              </div>
            ))}
          </div>
        )}

        {/* Mobile Swipe Indicator (Optional visual cue) */}
        {isMobile && (
          <div className="swipe-indicator">
            <div className="swipe-dot active"></div>
            <div className="swipe-dot"></div>
            <div className="swipe-dot"></div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default UsersPage;
