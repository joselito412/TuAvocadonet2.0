import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ titleKey, descriptionKey, defaultTitle, defaultDescription }) => {
  const { t } = useTranslation();

  const siteTitle = 'Avocado Legal';
  const pageTitle = titleKey ? t(titleKey) : defaultTitle;
  const description = descriptionKey ? t(descriptionKey) : defaultDescription;

  const fullTitle = `${pageTitle} | ${siteTitle}`;

  // Fallback for description if translation is missing or returns key
  const finalDescription =
    description && description !== descriptionKey
      ? description
      : 'Asistente legal inteligente y servicios jurídicos automatizados.';

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
};

export default SEO;
