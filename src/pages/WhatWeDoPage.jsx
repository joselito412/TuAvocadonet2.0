import React, { useState } from 'react';

function WhatWeDoPage() {
  const [selectedPlan, setSelectedPlan] = useState('free');

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
      className: 'pricing-card',
      image: `${import.meta.env.BASE_URL}img/avatar-free-2.png`,
      color: '#6c757d',
      bgColor: '#E8F5E9'
    },
    { 
      title: 'Junior', 
      price: '$15',
      features: ['IA Ilimitada', 'Generación Docs', 'Sin Abogado'],
      className: 'pricing-card',
      image: `${import.meta.env.BASE_URL}img/avatar-junior-1.png`,
      color: '#2E7D32',
      bgColor: '#E8F5E9'
    },
    { 
      title: 'Senior', 
      price: '$100',
      features: ['IA Ilimitada', 'Docs Premium', 'Abogado Humano'],
      className: 'pricing-card premium',
      image: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      color: '#4065B9',
      bgColor: '#E3F2FD'
    }
  ];

  const catalog = [
    { icon: 'fa-file-contract', title: 'Creación de documentos' },
    { icon: 'fa-pen-fancy', title: 'Auto-completado inteligente' },
    { icon: 'fa-brain', title: 'Conceptos legales IA' },
    { icon: 'fa-calendar-check', title: 'Agendar consulta' },
    { icon: 'fa-building', title: 'Constitución SAS' },
    { icon: 'fa-registered', title: 'Registro de marca' },
    { icon: 'fa-shield-alt', title: 'Compliance datos' },
    { icon: 'fa-gavel', title: 'Revisión de Tutelas' },
    { icon: 'fa-file-signature', title: 'Generación de NDAs' },
    { icon: 'fa-money-check-alt', title: 'Liquidación de Nómina' }
  ];

  const areas = [
    { name: 'Civil', icon: 'fa-home' },
    { name: 'Familia', icon: 'fa-users' },
    { name: 'Comercial', icon: 'fa-briefcase' },
    { name: 'Pymes', icon: 'fa-store' },
    { name: 'Emprendedores', icon: 'fa-rocket' },
    { name: 'Marcas', icon: 'fa-registered' },
    { name: 'Creativos', icon: 'fa-palette' },
    { name: 'Desarrolladores', icon: 'fa-laptop-code' },
    { name: 'Datos', icon: 'fa-database' },
    { name: 'Gobierno Tech', icon: 'fa-robot' },
    { name: 'Público', icon: 'fa-landmark' },
    { name: 'PQRs', icon: 'fa-file-alt' },
    { name: 'Tutelas', icon: 'fa-balance-scale' },
    { name: 'Inmobiliario', icon: 'fa-building' },
    { name: 'Penal', icon: 'fa-user-shield' },
    { name: 'Tributario', icon: 'fa-coins' },
    { name: 'Laboral', icon: 'fa-hard-hat' },
    { name: 'Financiero', icon: 'fa-university' },
    { name: 'Fintech', icon: 'fa-credit-card' }
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
            {services.map((service, index) => {
              const isSelected = selectedPlan === service.title.toLowerCase();
              return (
                <div 
                  key={index} 
                  className={service.className}
                  onClick={() => setSelectedPlan(service.title.toLowerCase())}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isSelected ? service.color : 'white',
                    borderColor: isSelected ? service.color : undefined,
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSelected && <div className="popular-badge" style={{ background: service.color }}>SELECCIONADO</div>}
                  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        margin: '0 auto',
                        objectFit: 'cover',
                        border: `3px solid ${isSelected ? 'white' : service.bgColor}`
                      }} 
                    />
                  </div>
                  <div className="plan-header">
                    <h3 style={{ color: isSelected ? 'white' : service.color }}>{service.title}</h3>
                    <div className="price" style={{ color: isSelected ? 'white' : service.color }}>{service.price}</div>
                  </div>
                  <ul className="plan-features mt-5" style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : undefined }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : undefined }}>
                        <i className="fas fa-check" style={{ color: isSelected ? 'white' : service.color }}></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <h2 className="text-center mb-40">Catálogo de Servicios Automatizados</h2>
          <div className="grid-container grid-5">
             {catalog.map((item, index) => (
               <div key={index} className="bg-white p-4 rounded-xl text-center shadow-soft border border-gray-50">
                 <div className="text-3xl mb-3">
                   <i className={`fas ${item.icon}`} style={{ color: '#2E7D32' }}></i>
                 </div>
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
          
          <div className="swipe-cards-container pb-5">
            {areas.map((area, index) => (
              <div key={index} className="min-w-[160px] py-8 px-5 text-center bg-white rounded-2xl shadow-soft border border-gray-50 snap-start mr-5">
                <span className="text-5xl block mb-3" role="img" aria-label={area.name}>
                  <i className={`fas ${area.icon}`} style={{ color: '#2E7D32' }}></i>
                </span>
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
