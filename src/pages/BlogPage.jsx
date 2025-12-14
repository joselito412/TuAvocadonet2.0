import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Blog seems to have hardcoded text, adding hook anyway for consistency if needed later
import SEO from '../components/SEO';

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Inteligencia Artificial',
    'Regulación',
    'Casos de Éxito',
    'Tendencias',
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'IA en el Derecho: Cómo la tecnología está transformando la práctica legal',
      excerpt:
        'La inteligencia artificial está revolucionando la forma en que los abogados trabajan, desde la investigación jurídica hasta la redacción de contratos.',
      category: 'Inteligencia Artificial',
      date: '15 Nov 2024',
      author: 'Dra. María Rodríguez',
      image: `${import.meta.env.BASE_URL}img/hombre-3d-ia.png`,
      readTime: '5 min',
    },
    {
      id: 2,
      title: 'Nuevas regulaciones de protección de datos en Colombia',
      excerpt:
        'Análisis de las últimas actualizaciones a la Ley 1581 de 2012 y su impacto en las empresas tecnológicas.',
      category: 'Regulación',
      date: '10 Nov 2024',
      author: 'Dr. Carlos Méndez',
      image: `${import.meta.env.BASE_URL}img/tablero-seguimiento.png`,
      readTime: '7 min',
    },
    {
      id: 3,
      title: 'Caso de éxito: Startup logra constitución en 24 horas con LegalTech',
      excerpt:
        'Conoce cómo una startup fintech utilizó nuestra plataforma para formalizar su empresa en tiempo récord.',
      category: 'Casos de Éxito',
      date: '5 Nov 2024',
      author: 'Equipo Avocado',
      image: `${import.meta.env.BASE_URL}img/celular-mujer-3d.png`,
      readTime: '4 min',
    },
    {
      id: 4,
      title: 'El futuro del derecho laboral en la era del trabajo remoto',
      excerpt:
        'Las nuevas dinámicas laborales requieren actualización en la legislación. Exploramos las tendencias emergentes.',
      category: 'Tendencias',
      date: '1 Nov 2024',
      author: 'Dr. Juan Pérez',
      image: `${import.meta.env.BASE_URL}img/mapa-cobertura.png`,
      readTime: '6 min',
    },
    {
      id: 5,
      title: 'RAG y LLMs: La tecnología detrás de nuestro asistente legal',
      excerpt:
        'Descubre cómo funciona la tecnología de Retrieval-Augmented Generation que impulsa Avocado AI.',
      category: 'Inteligencia Artificial',
      date: '28 Oct 2024',
      author: 'Equipo Técnico',
      image: `${import.meta.env.BASE_URL}img/celular-chat.png`,
      readTime: '8 min',
    },
    {
      id: 6,
      title: 'Propiedad Intelectual para Startups: Guía completa 2024',
      excerpt:
        'Todo lo que necesitas saber sobre patentes, marcas y derechos de autor para proteger tu startup.',
      category: 'Regulación',
      date: '20 Oct 2024',
      author: 'Dr. Juan Pérez',
      image: `${import.meta.env.BASE_URL}img/Gob. Corporativo (2).png`,
      readTime: '10 min',
    },
  ];

  const filteredPosts =
    selectedCategory === 'Todos'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <SEO
        titleKey="blog.title"
        descriptionKey="blog.subtitle"
        defaultTitle="Blog Legal-Tech"
        defaultDescription="Mantente actualizado con las últimas tendencias en derecho, tecnología e innovación legal."
      />
      <div>
        {/* Hero Section */}
        <section className="section-block min-h-[50vh] text-center bg-gradient-to-r from-green-50 to-blue-50">
          <div className="content-wrapper">
            <span className="eyebrow">CONOCIMIENTO LEGAL</span>
            <h1 className="mb-8">Blog Legal-Tech</h1>
            <p className="lead-text max-w-3xl mx-auto">
              Mantente actualizado con las últimas tendencias en derecho, tecnología e innovación
              legal.
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="bg-white py-8 border-b border-gray-200 sticky top-[120px] z-[100]">
          <div className="content-wrapper">
            <div className="flex gap-4 justify-center flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full border-2 font-semibold cursor-pointer transition-all text-sm ${
                    selectedCategory === cat
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 bg-white text-dark hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-block py-20">
          <div className="content-wrapper">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card bg-white rounded-2xl overflow-hidden shadow-soft cursor-pointer border border-gray-100"
                >
                  <div
                    className="w-full h-56 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${post.image})` }}
                  >
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <span>
                        <i className="fas fa-calendar-alt mr-2 text-primary"></i>
                        {post.date}
                      </span>
                      <span>
                        <i className="fas fa-clock mr-2 text-primary"></i>
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl mb-4 leading-snug text-dark">{post.title}</h3>

                    <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        <i className="fas fa-user mr-2"></i>
                        {post.author}
                      </span>
                      <button className="bg-transparent border-0 text-primary font-semibold cursor-pointer text-sm hover:underline">
                        Leer más →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 px-5">
                <i className="fas fa-inbox text-6xl text-gray-300 mb-5"></i>
                <p className="text-gray-600 text-lg">No hay artículos en esta categoría</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-block bg-dark text-white py-16 text-center">
          <div className="content-wrapper">
            <h2 className="text-white mb-4">Suscríbete a nuestro Newsletter</h2>
            <p className="text-lg mb-8 text-gray-300">
              Recibe los últimos artículos y novedades Legal-Tech directamente en tu correo
            </p>
            <div className="flex gap-3 max-w-lg mx-auto flex-wrap justify-center">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 min-w-[250px] px-5 py-3 rounded-lg border-0 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="btn-primary whitespace-nowrap">Suscribirme</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BlogPage;
