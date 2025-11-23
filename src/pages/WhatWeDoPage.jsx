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
      <section className="section-block bg-white">
        <div className="content-wrapper">
          <div className="text-center mb-60">
            <h1>¿Qué es Avocado?</h1>
            <p className="lead-text mx-auto">
              Somos la primera plataforma legal impulsada por Inteligencia Artificial que democratiza el acceso a la justicia. 
              Combinamos tecnología de vanguardia con supervisión de abogados certificados para ofrecer asesoría legal accesible, rápida y confiable.
            </p>
          </div>

          <div className="mt-60">
            <h2 className="text-center mb-40">Cómo funciona nuestra IA</h2>
            <div className="grid-container grid-4">
              {steps.map((item, index) => (
                <div key={index} className="dashboard-card flex-col items-start relative">
                  <div className="text-5xl font-extrabold text-primary opacity-10 absolute top-3 right-5">{item.step}</div>
                  <h3 className="relative z-10">{item.title}</h3>
                  <p className="relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Automated Services & Catalog */}
      <section className="section-block bg-light">
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
                <ul className="plan-features mt-5">
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
               <div key={index} className="bg-white p-4 rounded-xl text-center shadow-soft border border-gray-50">
                 <div className="text-3xl mb-3">{item.icon}</div>
                 <div className="font-semibold text-sm">{item.title}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Section 3: Practice Areas (Carousel) */}
      <section className="section-block bg-white">
        <div className="content-wrapper">
          <h2 className="text-center mb-40">Áreas de Derecho</h2>
          
          {/* Using the swipe-cards-container for horizontal scroll behavior on all devices for this specific section as requested */}
          <div className="swipe-cards-container pb-5">
            {areas.map((area, index) => (
              <div key={index} className="min-w-[160px] py-8 px-5 text-center bg-white rounded-2xl shadow-soft border border-gray-50 snap-start mr-5">
                <span className="text-5xl block mb-3" role="img" aria-label={area.name}>{area.emoji}</span>
                <span className="font-semibold text-dark text-sm">{area.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-20 text-gray-500 text-sm">Desliza para ver más áreas →</p>
        </div>
      </section>
    </div>
  );
}

export default WhatWeDoPage;
