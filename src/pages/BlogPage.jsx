import React, { useState } from 'react';

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', 'Inteligencia Artificial', 'Regulación', 'Casos de Éxito', 'Tendencias'];
  
  const blogPosts = [
    {
      id: 1,
      title: 'IA en el Derecho: Cómo la tecnología está transformando la práctica legal',
      excerpt: 'La inteligencia artificial está revolucionando la forma en que los abogados trabajan, desde la investigación jurídica hasta la redacción de contratos.',
      category: 'Inteligencia Artificial',
      date: '15 Nov 2024',
      author: 'Dra. María Rodríguez',
      image: `${import.meta.env.BASE_URL}img/hombre-3d-ia.png`,
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Nuevas regulaciones de protección de datos en Colombia',
      excerpt: 'Análisis de las últimas actualizaciones a la Ley 1581 de 2012 y su impacto en las empresas tecnológicas.',
      category: 'Regulación',
      date: '10 Nov 2024',
      author: 'Dr. Carlos Méndez',
      image: `${import.meta.env.BASE_URL}img/tablero-seguimiento.png`,
      readTime: '7 min'
    },
    {
      id: 3,
      title: 'Caso de éxito: Startup logra constitución en 24 horas con LegalTech',
      excerpt: 'Conoce cómo una startup fintech utilizó nuestra plataforma para formalizar su empresa en tiempo récord.',
      category: 'Casos de Éxito',
      date: '5 Nov 2024',
      author: 'Equipo Avocado',
      image: `${import.meta.env.BASE_URL}img/celular-mujer-3d.png`,
      readTime: '4 min'
    },
    {
      id: 4,
      title: 'El futuro del derecho laboral en la era del trabajo remoto',
      excerpt: 'Las nuevas dinámicas laborales requieren actualización en la legislación. Exploramos las tendencias emergentes.',
      category: 'Tendencias',
      date: '1 Nov 2024',
      author: 'Dr. Juan Pérez',
      image: `${import.meta.env.BASE_URL}img/mapa-cobertura.png`,
      readTime: '6 min'
    },
    {
      id: 5,
      title: 'RAG y LLMs: La tecnología detrás de nuestro asistente legal',
      excerpt: 'Descubre cómo funciona la tecnología de Retrieval-Augmented Generation que impulsa Avocado AI.',
      category: 'Inteligencia Artificial',
      date: '28 Oct 2024',
      author: 'Equipo Técnico',
      image: `${import.meta.env.BASE_URL}img/celular-chat.png`,
      readTime: '8 min'
    },
    {
      id: 6,
      title: 'Propiedad Intelectual para Startups: Guía completa 2024',
      excerpt: 'Todo lo que necesitas saber sobre patentes, marcas y derechos de autor para proteger tu startup.',
      category: 'Regulación',
      date: '20 Oct 2024',
      author: 'Dr. Juan Pérez',
      image: `${import.meta.env.BASE_URL}img/Gob. Corporativo (2).png`,
      readTime: '10 min'
    }
  ];

  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-block" style={{ minHeight: '50vh', textAlign: 'center', background: 'var(--gradient-hero)' }}>
        <div className="content-wrapper">
          <span className="eyebrow">CONOCIMIENTO LEGAL</span>
          <h1 style={{ marginBottom: '30px' }}>Blog Legal-Tech</h1>
          <p className="lead-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Mantente actualizado con las últimas tendencias en derecho, tecnología e innovación legal.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section style={{ background: 'white', padding: '30px 0', borderBottom: '1px solid #eee', position: 'sticky', top: '120px', zIndex: 100 }}>
        <div className="content-wrapper">
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: selectedCategory === cat ? '2px solid var(--color-primary)' : '2px solid #eee',
                  background: selectedCategory === cat ? 'var(--color-primary)' : 'white',
                  color: selectedCategory === cat ? 'white' : 'var(--color-dark)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '0.9rem'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-block" style={{ padding: '80px 0' }}>
        <div className="content-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {filteredPosts.map(post => (
              <article 
                key={post.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0'
                }}
                className="blog-card"
              >
                <div style={{
                  width: '100%',
                  height: '220px',
                  background: `url(${post.image}) center/cover`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'var(--color-primary)',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {post.category}
                  </div>
                </div>
                
                <div style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '0.85rem', color: '#666' }}>
                    <span>
                      <i className="fas fa-calendar-alt" style={{ marginRight: '5px', color: 'var(--color-primary)' }}></i>
                      {post.date}
                    </span>
                    <span>
                      <i className="fas fa-clock" style={{ marginRight: '5px', color: 'var(--color-primary)' }}></i>
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', lineHeight: '1.4', color: 'var(--color-dark)' }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: '0.9rem', color: '#888' }}>
                      <i className="fas fa-user" style={{ marginRight: '8px' }}></i>
                      {post.author}
                    </span>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--color-primary)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}>
                      Leer más →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <i className="fas fa-inbox" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }}></i>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>No hay artículos en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-block" style={{ background: 'var(--color-dark)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="content-wrapper">
          <h2 style={{ color: 'white', marginBottom: '15px' }}>Suscríbete a nuestro Newsletter</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#ccc' }}>
            Recibe los últimos artículos y novedades Legal-Tech directamente en tu correo
          </p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem'
              }}
            />
            <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
