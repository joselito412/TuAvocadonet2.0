import React, { useState } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import AIChat from '../components/AIChat';
import PhoneWrapper from '../components/PhoneWrapper';
import { PhoneHome, PhoneDocs, PhoneDashboard, PhoneLawyers, PhonePricing } from '../components/PhoneScreens';
import DocExplorer from '../components/DocExplorer';
import SocialImpact from '../components/SocialImpact';
import useScrollSpy from '../hooks/useScrollSpy';

function HomePage() {
  // IDs de las secciones que queremos trackear
  const sectionIds = ['hero', 'features', 'automation', 'specialized', 'subscriptions', 'social-impact', 'consultancy', 'blog'];
  const activeSection = useScrollSpy(sectionIds, 300);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [selectedDocCategory, setSelectedDocCategory] = useState('Civil');
  const [selectedCountry, setSelectedCountry] = useState('co');

  return (
    <>
      <div className="split-layout">
        {/* COLUMNA IZQUIERDA: CONTENIDO SCROLLABLE */}
        <div className="scroll-content">
          
          <header className="section-block" id="hero">
            <div className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* <span className="eyebrow">TU ABOGADO DE BOLSILLO</span> */}
              <div>
              <h1>Orientación legal profesional al alcance de tu mano</h1>
              <p className="lead-text">El futuro legal, simplificado y accesible desde tu celular.</p>
              </div>
              
              {/* Tarjeta de Emergencia fuera del celular */}
              <div style={{ 
                backgroundColor: '#FFEBEE', 
                padding: '20px', 
                borderRadius: '16px', 
                textAlign: 'center',
                border: '2px solid #FFCDD2',
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.15)',
                maxWidth: '400px'
              }}>
                <i className="fas fa-exclamation-circle" style={{ color: '#D32F2F', fontSize: '32px', marginBottom: '12px' }}></i>
                <h4 style={{ margin: '0 0 8px', color: '#C62828', fontSize: '1.2rem', fontWeight: 'bold' }}>Línea de Emergencia</h4>
                <p style={{ fontSize: '0.95rem', margin: 0, color: '#B71C1C' }}>Asistencia legal inmediata 24/7</p>
              </div>
            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                <PhoneHome />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="section-block" id="features">
            <div className="text-content">
              {/* <span className="eyebrow">DOCUMENTACIÓN INTELIGENTE</span> */}
              <h2>Crea documentos para ti y tu empresa</h2>
              <p>TuAvocado se encarga del trabajo repetitivo. Genera contratos y documentos legales en minutos.</p>
              
              <DocExplorer onCategoryChange={setSelectedDocCategory} />

            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                        <PhoneDocs selectedCategory={selectedDocCategory} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="automation">
            <div className="text-content">
              {/* <span className="eyebrow">GESTIÓN EFICIENTE</span> */}
              <h2>Gestiona tus servicios en el Tablero privado</h2>
              <p>Un espacio organizado tipo Notion para llevar el control total de tus procesos.</p>
              <div className="dashboard-cards-container">
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <span>Seguimiento de casos en tiempo real</span>
                </div>
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-bell"></i>
                  </div>
                  <span>Notificaciones de estado</span>
                </div>
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <span>Archivo digital seguro</span>
                </div>
              </div>
            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                <PhoneDashboard />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="specialized">
            <div className="text-content">
              {/* <span className="eyebrow">MARKETPLACE LEGAL</span> */}
              <h2>¿Necesitas un abogado especializado?</h2>
              <p>Te conectamos con <strong>profesionales verificados</strong> en múltiples jurisdicciones.</p>
              
              {/* Improved Country Cards */}
              <div className="country-cards-container" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                gap: '15px', 
                marginTop: '30px',
                maxWidth: '700px'
              }}>
                {[
                  { code: 'co', name: 'Colombia', desc: 'Expertos en derecho colombiano', lawyers: 120 },
                  { code: 'us', name: 'Estados Unidos', desc: 'Especialistas en ley americana', lawyers: 80 },
                  { code: 'mx', name: 'México', desc: 'Expertos en derecho mexicano', lawyers: 45 },
                  { code: 'es', name: 'España', desc: 'Especialistas en ley española', lawyers: 35 },
                  { code: 'ar', name: 'Argentina', desc: 'Expertos en derecho argentino', lawyers: 30 }
                ].map((country) => {
                  const isSelected = selectedCountry === country.code;
                  return (
                    <div 
                      key={country.code}
                      className="country-card" 
                      onClick={() => setSelectedCountry(country.code)}
                      style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '20px',
                        boxShadow: isSelected ? '0 8px 20px rgba(46, 125, 50, 0.3)' : '0 4px 10px rgba(0,0,0,0.1)',
                        border: isSelected ? '3px solid #2E7D32' : '2px solid #E8F5E9',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        opacity: isSelected ? 1 : 0.7
                      }}
                    >
                      <div className="country-flag" style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: '#F5F5F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: isSelected ? '3px solid #2E7D32' : '2px solid #E8F5E9',
                        filter: isSelected ? 'none' : 'grayscale(100%)'
                      }}>
                        <img src={`https://flagcdn.com/w160/${country.code}.png`} alt={country.name} style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }} />
                  </div>
                      <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 'bold', color: isSelected ? '#2E7D32' : '#333' }}>{country.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#666', margin: '0 0 8px' }}>{country.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#888' }}>
                        <i className="fas fa-users" style={{ color: isSelected ? '#2E7D32' : '#999' }}></i>
                        <span>{country.lawyers}+ abogados</span>
                  </div>
                </div>
                  );
                })}
              </div>
            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                        <PhoneLawyers selectedCountry={selectedCountry} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="subscriptions">
            <div className="text-content">
              {/* <span className="eyebrow">PLANES FLEXIBLES</span> */}
              <h2>Suscripciones</h2>
              <p style={{ marginBottom: '40px' }}>Elige el nivel de acompañamiento que necesitas.</p>
              
              <div className="pricing-cards-container" style={{ marginBottom: '30px' }}>
                {/* Plan Free */}
                <div 
                  className={`pricing-card ${selectedPlan === 'free' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('free')}
                  style={{ 
                    cursor: 'pointer',
                    background: selectedPlan === 'free' ? '#6c757d' : 'white',
                    borderColor: selectedPlan === 'free' ? '#6c757d' : undefined
                  }}
                >
                  {selectedPlan === 'free' && <div className="popular-badge" style={{ background: '#6c757d' }}>Seleccionado</div>}
                  <div className="plan-header">
                    <h3 style={{ color: selectedPlan === 'free' ? 'white' : undefined }}>Free</h3>
                    <div className="price" style={{ color: selectedPlan === 'free' ? 'white' : undefined }}>$0</div>
                  </div>
                  <ul className="plan-features" style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.9)' : undefined }}>
                    <li style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-robot"></i> Consultas Limitadas</li>
                    <li className="disabled" style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.5)' : undefined }}><i className="fas fa-file-contract"></i> Sin Documentos</li>
                    <li className="disabled" style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.5)' : undefined }}><i className="fas fa-user-tie"></i> Sin Abogado</li>
                  </ul>
                </div>

                {/* Plan Junior */}
                <div 
                  className={`pricing-card ${selectedPlan === 'junior' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('junior')}
                  style={{ cursor: 'pointer' }}
                >
                  {selectedPlan === 'junior' && <div className="popular-badge">Recomendado</div>}
                  <div className="plan-header">
                    <h3>Junior</h3>
                    <div className="price">$15</div>
                  </div>
                  <ul className="plan-features">
                    <li><i className="fas fa-robot"></i> <strong>IA Ilimitada</strong></li>
                    <li><i className="fas fa-file-contract"></i> Generación Docs</li>
                    <li className="disabled"><i className="fas fa-user-tie"></i> Sin Abogado</li>
                  </ul>
                </div>

                {/* Plan Senior */}
                <div 
                  className={`pricing-card premium ${selectedPlan === 'senior' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('senior')}
                  style={{ 
                    cursor: 'pointer',
                    background: selectedPlan === 'senior' ? '#4065B9' : 'white',
                    borderColor: selectedPlan === 'senior' ? '#4065B9' : undefined
                  }}
                >
                  {selectedPlan === 'senior' && <div className="popular-badge" style={{ background: '#4065B9' }}>Seleccionado</div>}
                  <div className="plan-header">
                    <h3 style={{ color: selectedPlan === 'senior' ? 'white' : undefined }}>Senior</h3>
                    <div className="price" style={{ color: selectedPlan === 'senior' ? 'white' : undefined }}>$100</div>
                  </div>
                  <ul className="plan-features" style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}>
                    <li style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-robot"></i> IA Ilimitada</li>
                    <li style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-file-contract"></i> Docs Premium</li>
                    <li style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-user-tie"></i> <strong>Abogado Humano</strong></li>
                  </ul>
                </div>
              </div>

              {/* Botón Sign Up */}
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button 
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                    color: 'white',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(46, 125, 50, 0.3)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(46, 125, 50, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 20px rgba(46, 125, 50, 0.3)';
                  }}
                >
                  <i className="fas fa-user-plus" style={{ marginRight: '10px' }}></i>
                  Sign Up
                </button>
              </div>

            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                        <PhonePricing selectedPlan={selectedPlan} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* COLUMNA DERECHA: CELULAR STICKY */}
        <div className="sticky-column">
          <div className="sticky-wrapper">
            <PhoneWrapper 
              activeSection={activeSection} 
              selectedPlan={selectedPlan}
              selectedDocCategory={selectedDocCategory}
              selectedCountry={selectedCountry}
            />
          </div>
        </div>
      </div>

      {/* SECCIONES FULL WIDTH (SIN CELULAR) */}
      
      <section className="section-block section-consultancy-full" id="consultancy">
         <div className="content-wrapper section-consultancy-content">
            {/* <span className="eyebrow">ASISTENCIA INTELIGENTE</span> */}
            <h2 className="section-consultancy-title">Consultorio Jurídico IA</h2>
            <p className="section-consultancy-description">
              Obtén orientación legal instantánea con nuestro asistente de IA. Haz preguntas sobre contratos, derechos laborales, tutelas y más. Disponible 24/7 para resolver tus dudas legales.
            </p>
            
            <div className="section-consultancy-chat">
            <AIChat />
            </div>
         </div>
      </section>

      <div className="content-wrapper">
        <SocialImpact showLearnMore={true} />
      </div>

      <section className="section-block section-blog" id="blog">
         <div className="content-wrapper">
            <div className="section-blog-header">
              {/* <span className="eyebrow">CONOCIMIENTO LEGAL</span> */}
              <h2>Blog Legal-Tech</h2>
              <p className="section-blog-subtitle">
                Mantente actualizado con las últimas tendencias en derecho y tecnología
              </p>
            </div>
            
            {/* Two Column Layout */}
            <div className="section-blog-grid">
              
              {/* BLOQUE 1: Último Artículo Destacado */}
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }} className="featured-article">
                <div style={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, #1B5E20 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-brain" style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.2)' }}></i>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'var(--color-accent)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    Inteligencia Artificial
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    <i className="fas fa-fire" style={{ marginRight: '5px', color: '#FF6D00' }}></i>
                    Nuevo
                  </div>
                </div>
                
                <div style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '0.85rem', color: '#888' }}>
                    <span>
                      <i className="fas fa-calendar-alt" style={{ marginRight: '5px', color: 'var(--color-primary)' }}></i>
                      15 Nov 2024
                    </span>
                    <span>
                      <i className="fas fa-clock" style={{ marginRight: '5px', color: 'var(--color-primary)' }}></i>
                      5 min lectura
                    </span>
                    <span>
                      <i className="fas fa-eye" style={{ marginRight: '5px', color: 'var(--color-primary)' }}></i>
                      1.2k vistas
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '15px', lineHeight: '1.3', color: 'var(--color-dark)' }}>
                    IA en el Derecho: Cómo la tecnología está transformando la práctica legal
                  </h3>
                  
                  <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '25px', fontSize: '1rem' }}>
                    La inteligencia artificial está revolucionando la forma en que los abogados trabajan, desde la investigación jurídica hasta la redacción de contratos. Descubre cómo la IA está democratizando el acceso a la justicia y mejorando la eficiencia en el sector legal.
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        MR
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Dra. María Rodríguez</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>Directora Legal</div>
                      </div>
                    </div>
                    <button style={{
                      background: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}>
                      Leer más →
                    </button>
                  </div>
                </div>
              </div>
              
              {/* BLOQUE 2: Top 3 Más Leídos */}
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', color: 'var(--color-dark)' }}>
                  <i className="fas fa-fire" style={{ color: '#FF6D00', marginRight: '10px' }}></i>
                  Más Leídos
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    {
                      title: 'Nuevas regulaciones de protección de datos en Colombia',
                      category: 'Regulación',
                      date: '10 Nov 2024',
                      views: '2.5k',
                      readTime: '7 min'
                    },
                    {
                      title: 'Caso de éxito: Startup logra constitución en 24 horas',
                      category: 'Casos de Éxito',
                      date: '5 Nov 2024',
                      views: '1.8k',
                      readTime: '4 min'
                    },
                    {
                      title: 'El futuro del derecho laboral en la era del trabajo remoto',
                      category: 'Tendencias',
                      date: '1 Nov 2024',
                      views: '1.5k',
                      readTime: '6 min'
                    }
                  ].map((post, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #e0e0e0',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      position: 'relative'
                    }} className="top-article-card">
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '-10px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '0.9rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}>
                        {idx + 1}
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: 'var(--color-secondary)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          {post.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#999' }}>
                          <i className="fas fa-eye" style={{ marginRight: '3px' }}></i>
                          {post.views}
                        </span>
                      </div>
                      
                      <h4 style={{ fontSize: '1rem', marginBottom: '10px', lineHeight: '1.4', color: 'var(--color-dark)' }}>
                        {post.title}
                      </h4>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#888' }}>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <a href="/#/blog" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.05rem' }}>
                  <i className="fas fa-newspaper" style={{ marginRight: '10px' }}></i>
                  Ver todos los artículos
                </button>
              </a>
            </div>
         </div>
      </section>

    </>
  );
}

export default HomePage;
