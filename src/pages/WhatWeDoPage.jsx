import React from 'react';

function WhatWeDoPage() {
  const steps = [
    { step: '01', title: 'Haz tu Consulta', desc: 'Describe tu situación legal en lenguaje cotidiano.' },
    { step: '02', title: 'IA Analiza', desc: 'Nuestro sistema procesa y consulta bases de datos legales.' },
    { step: '03', title: 'Recibe Respuesta', desc: 'Orientación clara y accionable en minutos.' },
    { step: '04', title: 'Supervisión (Solo suscripción Senior)', desc: 'Abogado revisa casos complejos y documentos antes de ser enviados a tu correo.' }
  ];

  const services = [
    { 
      title: 'Free', 
      price: '$0',
      features: ['Consultas Limitadas', 'Sin Documentos', 'Sin Abogado'],
      className: 'pricing-card'
    },
    { 
      title: 'Junior', 
      price: '$15',
      features: ['IA Ilimitada', 'Generación Docs', 'Sin Abogado'],
      className: 'pricing-card popular'
    },
    { 
      title: 'Senior', 
      price: '$100',
      features: ['IA Ilimitada', 'Docs Premium', 'Abogado Humano'],
      className: 'pricing-card premium'
    }
  ];

  const catalog = [
    { icon: '📄', title: 'Creación de documentos' },
    { icon: '✍️', title: 'Auto-completado inteligente' },
    { icon: '🧠', title: 'Conceptos legales IA' },
    { icon: '📅', title: 'Agendar consulta' },
    { icon: '🏢', title: 'Constitución SAS' },
    { icon: '®️', title: 'Registro de marca' },
    { icon: '🛡️', title: 'Compliance datos' },
    { icon: '⚖️', title: 'Revisión de Tutelas' },
    { icon: '🔒', title: 'Generación de NDAs' },
    { icon: '💰', title: 'Liquidación de Nómina' }
  ];

  const areas = [
    { name: 'Civil', emoji: '🏠' },
    { name: 'Familia', emoji: '👨‍👩‍👧‍👦' },
    { name: 'Comercial', emoji: '🏢' },
    { name: 'Pymes', emoji: '🏪' },
    { name: 'Emprendedores', emoji: '🚀' },
    { name: 'Marcas', emoji: '®️' },
    { name: 'Creativos', emoji: '🎨' },
    { name: 'Desarrolladores', emoji: '💻' },
    { name: 'Datos', emoji: '🔒' },
    { name: 'Gobierno Tech', emoji: '🤖' },
    { name: 'Público', emoji: '🏛️' },
    { name: 'PQRs', emoji: '📝' },
    { name: 'Tutelas', emoji: '⚖️' },
    { name: 'Inmobiliario', emoji: '🏗️' },
    { name: 'Penal', emoji: '👮' },
    { name: 'Tributario', emoji: '💰' },
    { name: 'Laboral', emoji: '👷' },
    { name: 'Financiero', emoji: '🏦' },
    { name: 'Fintech', emoji: '💳' }
  ];

  return (
    <div>
      {/* Section 1: What is Avocado & How it Works */}
      <section className="section-block" style={{ background: 'white' }}>
        <div className="content-wrapper">
          <div className="text-center mb-60">
            <h1>¿Qué es Avocado?</h1>
            <p className="lead-text" style={{ margin: '0 auto' }}>
              Somos la primera plataforma legal impulsada por Inteligencia Artificial que democratiza el acceso a la justicia. 
              Combinamos tecnología de vanguardia con supervisión de abogados certificados para ofrecer asesoría legal accesible, rápida y confiable.
            </p>
          </div>

          <div className="mt-60">
            <h2 className="text-center mb-40">Cómo funciona nuestra IA</h2>
            <div className="grid-container grid-4">
              {steps.map((item, index) => (
                <div key={index} className="dashboard-card" style={{ flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '800', color: 'rgba(46, 125, 50, 0.1)', position: 'absolute', top: '10px', right: '20px' }}>{item.step}</div>
                  <h3 style={{ position: 'relative', zIndex: 1 }}>{item.title}</h3>
                  <p style={{ position: 'relative', zIndex: 1 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Automated Services & Catalog */}
      <section className="section-block" style={{ background: 'var(--color-light)' }}>
        <div className="content-wrapper">
          <h2 className="text-center mb-40">Nuestros Planes</h2>
          <div className="pricing-cards-container mb-60">
            {services.map((service, index) => (
              <div key={index} className={service.className}>
                {service.className.includes('popular') && <div className="popular-badge">RECOMENDADO</div>}
                <div className="plan-header">
                  <h3>{service.title}</h3>
                  <div className="price">{service.price}</div>
                </div>
                <ul className="plan-features" style={{ marginTop: '20px' }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-center mb-40">Catálogo de Servicios Automatizados</h2>
          <div className="grid-container grid-5">
             {catalog.map((item, index) => (
               <div key={index} style={{ 
                 background: 'white', 
                 padding: '15px', 
                 borderRadius: '12px', 
                 textAlign: 'center',
                 boxShadow: 'var(--shadow-soft)',
                 border: '1px solid rgba(0,0,0,0.05)'
               }}>
                 <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
                 <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.title}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Section 3: Practice Areas (Carousel) */}
      <section className="section-block" style={{ background: 'white' }}>
        <div className="content-wrapper">
          <h2 className="text-center mb-40">Áreas de Derecho</h2>
          
          {/* Using the swipe-cards-container for horizontal scroll behavior on all devices for this specific section as requested */}
          <div className="swipe-cards-container" style={{ paddingBottom: '20px' }}>
            {areas.map((area, index) => (
              <div key={index} style={{ 
                minWidth: '160px',
                padding: '30px 20px', 
                textAlign: 'center', 
                background: 'white', 
                borderRadius: '16px', 
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid rgba(0,0,0,0.05)',
                scrollSnapAlign: 'start',
                marginRight: '20px'
              }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }} role="img" aria-label={area.name}>{area.emoji}</span>
                <span style={{ fontWeight: '600', color: 'var(--color-dark)', fontSize: '0.9rem' }}>{area.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-20" style={{ color: '#999', fontSize: '0.9rem' }}>Desliza para ver más áreas →</p>
        </div>
      </section>
    </div>
  );
}

export default WhatWeDoPage;
