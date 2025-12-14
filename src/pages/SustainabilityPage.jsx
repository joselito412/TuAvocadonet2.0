import React, { useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';
import SocialImpact from '../components/SocialImpact';

const PILLAR_IMAGES = {
  redefinition:
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
  social:
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  education:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
};

const SustainabilityPage = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);

  const handleNextSlide = () => {
    if (scrollContainerRef.current) {
      const slideWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: slideWidth, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        titleKey="sustainability.title"
        descriptionKey="sustainability.cta"
        defaultTitle="Sostenibilidad"
      />
      <div
        ref={scrollContainerRef}
        className="h-[calc(100vh-5rem)] w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-stretch bg-white"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

        {/* Slide 1: Pillars Intro (Moved from Slide 2) */}
        <section className="min-w-full h-full snap-center flex items-center justify-center px-6 md:px-20 flex-shrink-0 bg-white relative border-r-2 border-dashed border-gray-200">
          {/* Corrected path with base URL */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <img
              src={`${import.meta.env.BASE_URL}img/SustainabilityPage.webp`}
              alt=""
              className="w-full h-full object-cover object-[25%_center] md:object-center"
            />
          </div>

          {/* Gradient Overlay for Legibility - Softened */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent md:via-white/20 pointer-events-none" />

          <div className="max-w-5xl w-full relative z-10">
            <span className="text-secondary font-bold tracking-widest uppercase text-xl mb-6 block">
              Nuestros Pilares
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-dark mb-12 font-heading leading-tight drop-shadow-sm">
              {t('sustainability.pillarsTitle')}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-xl">
              <span>Descubre el impacto</span>
              <i className="fas fa-arrow-right text-2xl"></i>
            </div>
          </div>

          {/* New "Desliza" Button - Notebook Tab Style */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
            <div
              onClick={handleNextSlide}
              className="bg-[#FD6433] text-white py-4 pl-6 pr-4 rounded-l-2xl shadow-lg flex items-center gap-3 cursor-pointer transition-transform hover:-translate-x-2"
            >
              <span className="font-bold text-lg tracking-wide uppercase">Desliza</span>
              <i className="fas fa-chevron-right text-xl"></i>
            </div>
          </div>
        </section>

        {/* Slide 2: Hero & Impact (Moved from Slide 1) */}
        <section className="min-w-full h-full snap-center flex items-center justify-center px-4 md:px-20 flex-shrink-0 bg-white relative border-r-2 border-dashed border-gray-200">
          <div className="max-w-7xl w-full text-center flex flex-col items-center justify-center h-full py-12">
            <h1 className="text-4xl md:text-6xl mb-6 font-heading leading-tight text-dark">
              {t('sustainability.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mb-10 leading-relaxed px-4">
              {t('sustainability.description')}
            </p>

            {/* Social Impact Component - Clean Container */}
            <div className="w-full">
              <div className="bg-white rounded-3xl p-2 md:p-8">
                <SocialImpact showLearnMore={false} compact={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: Pillar 1 (Redefinition) */}
        <section className="min-w-full h-full snap-center flex items-center justify-center px-6 md:px-20 flex-shrink-0 bg-white border-r-2 border-dashed border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full max-w-7xl">
            <div className="w-full md:w-3/5 text-left order-2 md:order-1">
              <span className="text-secondary font-bold tracking-widest uppercase text-lg mb-6 block">
                01
              </span>
              <h3 className="text-3xl md:text-7xl mb-8 text-dark leading-tight font-heading">
                {t('sustainability.pillars.redefinition.title')}
              </h3>
              <div className="prose prose-lg md:prose-2xl text-gray-600 max-w-none leading-relaxed">
                <p className="mb-8">
                  <Trans
                    i18nKey="sustainability.pillars.redefinition.innovation"
                    components={{ 0: <strong className="text-primary font-bold" /> }}
                  />
                </p>
                <p>
                  <Trans
                    i18nKey="sustainability.pillars.redefinition.talent"
                    components={{ 0: <strong className="text-primary font-bold" /> }}
                  />
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/5 flex justify-center order-1 md:order-2 h-full items-center">
              <div className="w-64 h-64 md:w-[30rem] md:h-[30rem] rounded-full overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-700">
                <img
                  src={PILLAR_IMAGES.redefinition}
                  alt="Redefinición Legal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4: Pillar 2 (Social) */}
        <section className="min-w-full h-full snap-center flex items-center justify-center px-6 md:px-20 flex-shrink-0 bg-white border-r-2 border-dashed border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full max-w-7xl">
            <div className="w-full md:w-2/5 flex justify-center order-1 h-full items-center">
              <div className="w-64 h-64 md:w-[30rem] md:h-[30rem] rounded-full overflow-hidden shadow-2xl transform transition-transform hover:rotate-3 duration-700">
                <img
                  src={PILLAR_IMAGES.social}
                  alt="Impacto Social"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-3/5 text-left order-2">
              <span className="text-secondary font-bold tracking-widest uppercase text-lg mb-6 block">
                02
              </span>
              <h3 className="text-3xl md:text-7xl mb-8 text-dark leading-tight font-heading">
                {t('sustainability.pillars.social.title')}
              </h3>
              <div className="prose prose-lg md:prose-2xl text-gray-600 max-w-none leading-relaxed">
                <p className="mb-8">
                  <Trans
                    i18nKey="sustainability.pillars.social.democratization"
                    components={{ 0: <strong className="text-primary font-bold" /> }}
                  />
                </p>
                <p>
                  <Trans
                    i18nKey="sustainability.pillars.social.enabling"
                    components={{ 0: <strong className="text-primary font-bold" /> }}
                  />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5: Pillar 3 (Education) */}
        <section className="min-w-full h-full snap-center flex items-center justify-center px-6 md:px-20 flex-shrink-0 bg-white border-r-2 border-dashed border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full max-w-7xl">
            <div className="w-full md:w-3/5 text-left order-2 md:order-1">
              <span className="text-secondary font-bold tracking-widest uppercase text-lg mb-6 block">
                03
              </span>
              <h3 className="text-3xl md:text-7xl mb-8 text-dark leading-tight font-heading">
                {t('sustainability.pillars.education.title')}
              </h3>
              <div className="prose prose-lg md:prose-2xl text-gray-600 max-w-none leading-relaxed">
                <p className="mb-8">
                  <Trans
                    i18nKey="sustainability.pillars.education.participation"
                    components={{ 0: <strong className="text-primary font-bold" /> }}
                  />
                </p>
                <p>
                  <Trans
                    i18nKey="sustainability.pillars.education.peace"
                    components={{ 0: <strong className="text-primary font-bold" /> }}
                  />
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/5 flex justify-center order-1 md:order-2 h-full items-center">
              <div className="w-64 h-64 md:w-[30rem] md:h-[30rem] rounded-full overflow-hidden shadow-2xl transform transition-transform hover:-rotate-3 duration-700">
                <img
                  src={PILLAR_IMAGES.education}
                  alt="Educación Legal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: Manifesto */}
        <section className="min-w-full h-full snap-center flex items-center justify-center px-6 md:px-20 flex-shrink-0 bg-white relative overflow-hidden">
          {/* Background Image Removed to ensure white background */}

          <div className="max-w-6xl text-center z-10 relative">
            <h2 className="text-primary mb-16 text-3xl md:text-5xl font-bold tracking-wide">
              {t('sustainability.manifesto.title')}
            </h2>
            <p className="text-xl md:text-3xl leading-relaxed font-serif italic text-gray-600 max-w-4xl mx-auto delay-100">
              "{t('sustainability.manifesto.text')}"
            </p>
            <div className="mt-20 opacity-80 delay-200">
              <div className="text-7xl animate-bounce">🥑</div>
              <span>{t('sustainability.cta', 'Descubre el impacto')}</span>
            </div>
          </div>
        </section>

        <div className="w-1 flex-shrink-0"></div>
      </div>
    </>
  );
};

export default SustainabilityPage;
