import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SocialImpact = ({ showLearnMore, compact = false }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const target = 12450; // Número objetivo de consultas

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
    <section className={compact ? 'w-full' : 'section-social-impact'} id="social-impact">
      {!compact && (
        <div className="impact-header">
          <span className="eyebrow">{t('socialImpact.eyebrow')}</span>
          <h2>{t('socialImpact.title')}</h2>
        </div>
      )}

      <div
        className={`grid md:grid-cols-12 gap-8 ${compact ? 'lg:gap-10' : 'lg:gap-20'} max-w-7xl mx-auto items-center ${compact ? 'px-0' : 'px-6'}`}
      >
        <div className="col-span-12 md:col-span-5">
          <div
            className={`impact-card ${compact ? 'bg-white shadow-none border-0' : 'bg-white shadow-none border border-gray-100'} w-full`}
          >
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
              <span className="counter-label">{t('socialImpact.counterLabel')}</span>
            </div>
            <p className="text-center">{t('socialImpact.description')}</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 space-y-4 md:space-y-8">
          {!compact && (
            <h3 className="text-3xl md:text-4xl leading-tight">{t('socialImpact.sectionTitle')}</h3>
          )}
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="block mb-4">
              <strong className="text-primary block text-xl mb-2">
                {t('socialImpact.items.redefinition.title')}
              </strong>
              {t('socialImpact.items.redefinition.desc')}
            </p>
            <p className="block mb-4">
              <strong className="text-primary block text-xl mb-2">
                {t('socialImpact.items.democratization.title')}
              </strong>
              {t('socialImpact.items.democratization.desc')}
            </p>
            {!compact && (
              <p className="block">
                <strong className="text-primary block text-xl mb-2">
                  {t('socialImpact.items.peace.title')}
                </strong>
                {t('socialImpact.items.peace.desc')}
              </p>
            )}
          </div>

          {showLearnMore && (
            <div className="pt-4">
              <a href="/#/sostenibilidad" className="no-underline display-inline-block">
                <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                  {t('socialImpact.cta')} <i className="fas fa-arrow-right"></i>
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
