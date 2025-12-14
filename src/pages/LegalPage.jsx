import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

function LegalPage() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Scroll to section if hash is present
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <SEO titleKey="legal.hero.title" descriptionKey="legal.hero.description" />
      <div>
        {/* Hero Section */}
        <section className="section-block min-h-[50vh] text-center bg-gradient-to-r from-green-50 to-blue-50">
          <div className="content-wrapper">
            <span className="eyebrow">{t('legal.hero.eyebrow')}</span>
            <h1 className="mb-8">{t('legal.hero.title')}</h1>
            <p className="lead-text max-w-3xl mx-auto">{t('legal.hero.description')}</p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-gray-200 sticky top-20 z-[100]">
          <div className="content-wrapper">
            <div className="flex gap-8 py-5 justify-center flex-wrap">
              <a
                href="#datos-personales"
                className="text-dark no-underline font-semibold px-5 py-2 rounded-lg transition-all hover:bg-green-50 hover:text-primary"
              >
                {t('legal.tabs.personalData')}
              </a>
              <a
                href="#terminos"
                className="text-dark no-underline font-semibold px-5 py-2 rounded-lg transition-all hover:bg-green-50 hover:text-primary"
              >
                {t('legal.tabs.terms')}
              </a>
              <a
                href="#privacidad"
                className="text-dark no-underline font-semibold px-5 py-2 rounded-lg transition-all hover:bg-green-50 hover:text-primary"
              >
                {t('legal.tabs.privacy')}
              </a>
            </div>
          </div>
        </section>

        {/* Datos Personales Section */}
        <section id="datos-personales" className="section-block py-20">
          <div className="content-wrapper max-w-4xl">
            <h2 className="mb-8">
              <i className="fas fa-user-shield text-primary mr-4"></i>
              {t('legal.sections.personalData.title')}
            </h2>

            <div className="bg-green-50 p-5 rounded-xl mb-8 border-l-4 border-primary">
              <p style={{ margin: 0, fontWeight: '600' }}>
                {t('legal.sections.personalData.intro')}
              </p>
            </div>

            <h3>{t('legal.sections.personalData.collectedTitle')}</h3>
            <ul className="leading-relaxed text-gray-600 list-disc pl-6">
              <Trans i18nKey="legal.sections.personalData.collectedList">
                <li>Información de identificación (nombre, cédula, correo electrónico)</li>
                <li>Datos de contacto (teléfono, dirección)</li>
                <li>Información profesional (empresa, cargo) para clientes B2B</li>
                <li>Historial de consultas legales y documentos generados</li>
              </Trans>
            </ul>

            <h3 className="mt-10">{t('legal.sections.personalData.usageTitle')}</h3>
            <ul className="leading-relaxed text-gray-600 list-disc pl-6">
              <Trans i18nKey="legal.sections.personalData.usageList">
                <li>Proveer servicios de asesoría legal personalizada</li>
                <li>Mejorar nuestros algoritmos de IA mediante aprendizaje automático</li>
                <li>Comunicaciones relacionadas con tu caso o servicio</li>
                <li>Cumplimiento de obligaciones legales y regulatorias</li>
              </Trans>
            </ul>

            <h3 className="mt-10">{t('legal.sections.personalData.rightsTitle')}</h3>
            <p className="leading-relaxed text-gray-600">
              <Trans i18nKey="legal.sections.personalData.rightsDesc">
                Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos personales.
                Para ejercer estos derechos, contáctanos en{' '}
                <strong>datospersonales@avocado.legal</strong>
              </Trans>
            </p>
          </div>
        </section>

        {/* Términos y Condiciones Section */}
        <section id="terminos" className="section-block bg-white py-20">
          <div className="content-wrapper max-w-4xl">
            <h2 className="mb-8">
              <i className="fas fa-file-contract text-secondary mr-4"></i>
              {t('legal.sections.terms.title')}
            </h2>

            <p className="text-sm text-gray-500 mb-8">{t('legal.sections.terms.lastUpdated')}</p>

            <h3>{t('legal.sections.terms.sections.1.title')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.terms.sections.1.content')}
            </p>

            <h3 className="mt-10">{t('legal.sections.terms.sections.2.title')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.terms.sections.2.content')}
            </p>
            <ul className="leading-relaxed text-gray-600 list-disc pl-6">
              <Trans i18nKey="legal.sections.terms.sections.2.list" />
            </ul>

            <h3 className="mt-10">{t('legal.sections.terms.sections.3.title')}</h3>
            <div className="bg-orange-50 p-5 rounded-xl border-l-4 border-accent">
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                <Trans i18nKey="legal.sections.terms.sections.3.warning" />
              </p>
            </div>

            <h3 className="mt-10">{t('legal.sections.terms.sections.4.title')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.terms.sections.4.content')}
            </p>

            <h3 className="mt-10">{t('legal.sections.terms.sections.5.title')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.terms.sections.5.content')}
            </p>
          </div>
        </section>

        {/* Política de Privacidad Section */}
        <section id="privacidad" className="section-block py-20">
          <div className="content-wrapper max-w-4xl">
            <h2 className="mb-8">
              <i className="fas fa-lock text-primary mr-4"></i>
              {t('legal.sections.privacy.title')}
            </h2>

            <h3>{t('legal.sections.privacy.cookiesTitle')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.privacy.cookiesDesc')}
            </p>

            <h3 className="mt-10">{t('legal.sections.privacy.securityTitle')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.privacy.securityIntro')}
            </p>
            <ul className="leading-relaxed text-gray-600 list-disc pl-6">
              <Trans i18nKey="legal.sections.privacy.securityList" />
            </ul>

            <h3 className="mt-10">{t('legal.sections.privacy.sharingTitle')}</h3>
            <p className="leading-relaxed text-gray-600">
              <Trans i18nKey="legal.sections.privacy.sharingIntro" />
            </p>
            <ul className="leading-relaxed text-gray-600 list-disc pl-6">
              <Trans i18nKey="legal.sections.privacy.sharingList" />
            </ul>

            <h3 className="mt-10">{t('legal.sections.privacy.retentionTitle')}</h3>
            <p className="leading-relaxed text-gray-600">
              {t('legal.sections.privacy.retentionDesc')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-block bg-light py-16 text-center">
          <div className="content-wrapper">
            <h3 className="mb-5">{t('legal.contact.title')}</h3>
            <p className="mb-8 text-gray-600">{t('legal.contact.desc')}</p>
            <button className="btn-primary">
              <i className="fas fa-envelope mr-2"></i>
              {t('legal.contact.btn')}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default LegalPage;
