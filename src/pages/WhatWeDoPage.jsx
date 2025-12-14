import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

function WhatWeDoPage() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState('free');

  // State for controlling the user journey animation
  const [currentStep, setCurrentStep] = useState(0);
  const [isJourneyVisible, setIsJourneyVisible] = useState(false);
  const journeyRef = useRef(null);

  // 1. Monitor Visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsJourneyVisible(entry.isIntersecting);
        // Reset to Step 1 (0) whenever it enters the viewport
        if (entry.isIntersecting) {
          setCurrentStep(0);
        }
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    if (journeyRef.current) {
      observer.observe(journeyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Control Animation Loop based on Visibility
  useEffect(() => {
    let interval;
    if (isJourneyVisible) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 3);
      }, 4000); // 4 seconds per step
    }

    // Cleanup: Stop timer when not visible or unmounting
    return () => clearInterval(interval);
  }, [isJourneyVisible]);

  const steps = [
    {
      step: '01',
      title: t('whatWeDo.steps.01.title'),
      desc: t('whatWeDo.steps.01.desc'),
      icon: 'fab fa-whatsapp',
      color: '#22c55e', // Green-500
      bg: '#dcfce7', // Green-100
    },
    {
      step: '02',
      title: t('whatWeDo.steps.02.title'),
      desc: t('whatWeDo.steps.02.desc'),
      icon: 'fas fa-file-contract',
      color: '#3b82f6', // Blue-500
      bg: '#dbeafe', // Blue-100
    },
    {
      step: '03',
      title: t('whatWeDo.steps.03.title'),
      desc: t('whatWeDo.steps.03.desc'),
      icon: 'fas fa-robot',
      color: '#a855f7', // Purple-500
      bg: '#f3e8ff', // Purple-100
    },
    {
      step: '04',
      title: t('whatWeDo.steps.04.title'),
      desc: t('whatWeDo.steps.04.desc'),
      icon: 'fas fa-user-tie',
      color: '#f97316', // Orange-500
      bg: '#ffedd5', // Orange-100
    },
  ];

  const services = [
    {
      title: t('whatWeDo.plans.free.title'),
      price: '$0',
      features: t('whatWeDo.plans.free.features', { returnObjects: true }),
      className: 'pricing-card',
      image: `${import.meta.env.BASE_URL}img/avatar-free-1.png`,
      color: '#6c757d',
      bgColor: '#E8F5E9',
    },
    {
      title: t('whatWeDo.plans.junior.title'),
      price: '$15',
      features: t('whatWeDo.plans.junior.features', { returnObjects: true }),
      className: 'pricing-card',
      image: `${import.meta.env.BASE_URL}img/avatar-junior-1.png`,
      color: '#2E7D32',
      bgColor: '#E8F5E9',
    },
    {
      title: t('whatWeDo.plans.senior.title'),
      price: '$100',
      features: t('whatWeDo.plans.senior.features', { returnObjects: true }),
      className: 'pricing-card premium',
      image: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      color: '#4065B9',
      bgColor: '#E3F2FD',
    },
  ];

  const catalog = [
    { icon: 'fa-file-contract', title: t('whatWeDo.catalog.docs') },
    { icon: 'fa-pen-fancy', title: t('whatWeDo.catalog.autocomplete') },
    { icon: 'fa-brain', title: t('whatWeDo.catalog.concepts') },
    { icon: 'fa-calendar-check', title: t('whatWeDo.catalog.schedule') },
    { icon: 'fa-building', title: t('whatWeDo.catalog.sas') },
    { icon: 'fa-registered', title: t('whatWeDo.catalog.brand') },
    { icon: 'fa-shield-alt', title: t('whatWeDo.catalog.compliance') },
    { icon: 'fa-gavel', title: t('whatWeDo.catalog.tutelas') },
    { icon: 'fa-file-signature', title: t('whatWeDo.catalog.nda') },
    { icon: 'fa-money-check-alt', title: t('whatWeDo.catalog.payroll') },
  ];

  const areas = [
    { name: t('whatWeDo.areas.civil'), icon: 'fa-home' },
    { name: t('whatWeDo.areas.family'), icon: 'fa-users' },
    { name: t('whatWeDo.areas.commercial'), icon: 'fa-briefcase' },
    { name: t('whatWeDo.areas.smes'), icon: 'fa-store' },
    { name: t('whatWeDo.areas.entrepreneurs'), icon: 'fa-rocket' },
    { name: t('whatWeDo.areas.brands'), icon: 'fa-registered' },
    { name: t('whatWeDo.areas.creatives'), icon: 'fa-palette' },
    { name: t('whatWeDo.areas.developers'), icon: 'fa-laptop-code' },
    { name: t('whatWeDo.areas.data'), icon: 'fa-database' },
    { name: t('whatWeDo.areas.govtech'), icon: 'fa-robot' },
    { name: t('whatWeDo.areas.public'), icon: 'fa-landmark' },
    { name: t('whatWeDo.areas.pqrs'), icon: 'fa-file-alt' },
    { name: t('whatWeDo.areas.tutelas'), icon: 'fa-balance-scale' },
    { name: t('whatWeDo.areas.realestate'), icon: 'fa-building' },
    { name: t('whatWeDo.areas.criminal'), icon: 'fa-user-shield' },
    { name: t('whatWeDo.areas.tax'), icon: 'fa-coins' },
    { name: t('whatWeDo.areas.labor'), icon: 'fa-hard-hat' },
    { name: t('whatWeDo.areas.financial'), icon: 'fa-university' },
    { name: t('whatWeDo.areas.fintech'), icon: 'fa-credit-card' },
  ];

  return (
    <div>
      <SEO titleKey="whatWeDo.title" descriptionKey="whatWeDo.description" />
      {/* Section 1: What is Avocado & How it Works */}
      <section className="section-block bg-white pt-10 pb-20">
        <div className="content-wrapper">
          <div className="text-center mb-10">
            <h1 className="mb-6">{t('whatWeDo.title')}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('whatWeDo.description')}
            </p>
          </div>

          {/* Hero Image - Protagonist */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Soft glow instead of dark shadow */}
              <div className="absolute w-full h-full bg-emerald-100/30 rounded-full blur-2xl -z-10"></div>
              <img
                src={`${import.meta.env.BASE_URL}img/avatar-free-1.png`}
                alt="Avocado Hero"
                className="w-[90%] h-[90%] object-contain relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* New User Journey Section */}
          <div className="mb-24" ref={journeyRef}>
            <h2 className="text-center mb-12 font-heading text-3xl md:text-4xl text-gray-900">
              {t('whatWeDo.userJourney.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Arrow connectors for desktop */}
              <div className="hidden md:block absolute top-12 left-1/3 w-1/3 border-t-2 border-dashed border-gray-200 -z-10"></div>
              <div className="hidden md:block absolute top-12 right-0 w-1/3 border-t-2 border-dashed border-gray-200 -z-10"></div>

              {/* Step 01: Turn-based Highlight */}
              <div
                className={`relative bg-white p-6 rounded-xl border shadow-sm text-center transition-all duration-700 ease-in-out ${currentStep === 0 ? 'scale-105 shadow-xl' : 'border-gray-100 scale-100'}`}
                style={{
                  borderColor: currentStep === 0 ? '#22c55e' : '#f3f4f6',
                  boxShadow: currentStep === 0 ? '0 10px 15px -3px rgba(34, 197, 94, 0.2)' : '',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10 ring-4 ring-white transition-colors duration-700"
                  style={{
                    backgroundColor: currentStep === 0 ? '#22c55e' : '#111827',
                    color: '#fff',
                    transform: currentStep === 0 ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  1
                </div>
                <h3
                  className="step-title text-lg font-bold mb-3 transition-colors duration-700"
                  style={{ color: currentStep === 0 ? '#22c55e' : '#111827' }}
                >
                  {t('whatWeDo.userJourney.steps.01.title')}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                  {t('whatWeDo.userJourney.steps.01.desc')}
                </p>
              </div>

              {/* Step 02 */}
              <div
                className={`relative bg-white p-6 rounded-xl border shadow-sm text-center transition-all duration-700 ease-in-out ${currentStep === 1 ? 'scale-105 shadow-xl' : 'border-gray-100 scale-100'}`}
                style={{
                  borderColor: currentStep === 1 ? '#3b82f6' : '#f3f4f6',
                  boxShadow: currentStep === 1 ? '0 10px 15px -3px rgba(59, 130, 246, 0.2)' : '',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10 ring-4 ring-white transition-colors duration-700"
                  style={{
                    backgroundColor: currentStep === 1 ? '#3b82f6' : '#111827',
                    color: '#fff',
                    transform: currentStep === 1 ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  2
                </div>
                <h3
                  className="text-lg font-bold mb-3 transition-colors duration-700"
                  style={{ color: currentStep === 1 ? '#3b82f6' : '#111827' }}
                >
                  {t('whatWeDo.userJourney.steps.02.title')}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t('whatWeDo.userJourney.steps.02.desc')}
                </p>
              </div>

              {/* Step 03 */}
              <div
                className={`relative bg-white p-6 rounded-xl border shadow-sm text-center transition-all duration-700 ease-in-out ${currentStep === 2 ? 'scale-105 shadow-xl' : 'border-gray-100 scale-100'}`}
                style={{
                  borderColor: currentStep === 2 ? '#f97316' : '#f3f4f6',
                  boxShadow: currentStep === 2 ? '0 10px 15px -3px rgba(249, 115, 22, 0.2)' : '',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10 ring-4 ring-white transition-colors duration-700"
                  style={{
                    backgroundColor: currentStep === 2 ? '#f97316' : '#111827',
                    color: '#fff',
                    transform: currentStep === 2 ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  3
                </div>
                <h3
                  className="text-lg font-bold mb-3 transition-colors duration-700"
                  style={{ color: currentStep === 2 ? '#f97316' : '#111827' }}
                >
                  {t('whatWeDo.userJourney.steps.03.title')}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t('whatWeDo.userJourney.steps.03.desc')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-center mb-12 font-heading text-3xl md:text-4xl">
              {t('whatWeDo.howItWorks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group border border-gray-100 flex flex-col pt-0"
                >
                  {/* Agenda/Notebook Color Header */}
                  <div className="h-24 w-full relative" style={{ backgroundColor: item.bg }}>
                    {/* Decorative "Binding" holes or pattern could go here, but keeping it clean for now */}
                    <div
                      className="absolute -bottom-10 left-8 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md border-4 border-white"
                      style={{ backgroundColor: item.bg, color: item.color }}
                    >
                      <i className={item.icon}></i>
                    </div>
                  </div>

                  <div className="p-8 pt-12 flex-1">
                    <div
                      className="text-6xl font-black absolute top-4 right-4 opacity-[0.2] pointer-events-none select-none"
                      style={{ color: item.color }}
                    >
                      {item.step}
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight mt-2 min-h-[3rem]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Automated Services & Catalog */}
      <section className="section-block bg-light">
        <div className="content-wrapper">
          <h2 className="text-center mb-40">{t('whatWeDo.plansTitle')}</h2>
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
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSelected && (
                    <div className="popular-badge" style={{ background: service.color }}>
                      SELECCIONADO
                    </div>
                  )}
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
                        border: `3px solid ${isSelected ? 'white' : service.bgColor}`,
                      }}
                    />
                  </div>
                  <div className="plan-header">
                    <h3 style={{ color: isSelected ? 'white' : service.color }}>{service.title}</h3>
                    <div className="price" style={{ color: isSelected ? 'white' : service.color }}>
                      {service.price}
                    </div>
                  </div>
                  <ul
                    className="plan-features mt-5"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : undefined }}
                  >
                    {Array.isArray(service.features) &&
                      service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : undefined }}
                        >
                          <i
                            className="fas fa-check"
                            style={{ color: isSelected ? 'white' : service.color }}
                          ></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <h2 className="text-center mb-40">{t('whatWeDo.catalogTitle')}</h2>
          <div className="grid-container grid-5">
            {catalog.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl text-center shadow-soft border border-gray-50"
              >
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
          <h2 className="text-center mb-40">{t('whatWeDo.areasTitle')}</h2>

          <div className="swipe-cards-container pb-5">
            {areas.map((area, index) => (
              <div
                key={index}
                className="min-w-[160px] py-8 px-5 text-center bg-white rounded-2xl shadow-soft border border-gray-50 snap-start mr-5"
              >
                <span className="text-5xl block mb-3" role="img" aria-label={area.name}>
                  <i className={`fas ${area.icon}`} style={{ color: '#2E7D32' }}></i>
                </span>
                <span className="font-semibold text-dark text-sm">{area.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-20 text-gray-500 text-sm">{t('whatWeDo.swipeHint')}</p>
        </div>
      </section>
    </div>
  );
}

export default WhatWeDoPage;
