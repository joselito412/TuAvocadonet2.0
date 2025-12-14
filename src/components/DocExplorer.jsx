import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Category-specific icons for better visual distinction
const categoryIcons = {
  civil: 'fa-balance-scale',
  labor: 'fa-briefcase',
  commercial: 'fa-building',
  criminal: 'fa-gavel',
  tutelas: 'fa-shield-alt',
};

// Document type icons based on keywords (simple heuristic)
// Document icons based on category and index (language agnostic)
const docIcons = {
  civil: ['fa-file-signature', 'fa-handshake', 'fa-stamp', 'fa-file-contract'],
  labor: ['fa-file-signature', 'fa-calculator', 'fa-book', 'fa-exclamation-circle'],
  commercial: ['fa-building', 'fa-user-secret', 'fa-registered', 'fa-users'],
  criminal: ['fa-exclamation-triangle', 'fa-user-tie', 'fa-gavel', 'fa-balance-scale'],
  tutelas: ['fa-heartbeat', 'fa-graduation-cap', 'fa-envelope-open-text', 'fa-gavel'],
};

const getDocumentIcon = (category, index) => {
  if (docIcons[category] && docIcons[category][index]) {
    return docIcons[category][index];
  }
  return 'fa-file-alt';
};

const DocExplorer = ({ onCategoryChange }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('civil');

  // Load categories and items from i18n
  const categories = {
    civil: {
      label: t('documents.civil.label'),
      items: t('documents.civil.items', { returnObjects: true }) || [],
    },
    labor: {
      label: t('documents.labor.label'),
      items: t('documents.labor.items', { returnObjects: true }) || [],
    },
    commercial: {
      label: t('documents.commercial.label'),
      items: t('documents.commercial.items', { returnObjects: true }) || [],
    },
    criminal: {
      label: t('documents.criminal.label'),
      items: t('documents.criminal.items', { returnObjects: true }) || [],
    },
    tutelas: {
      label: t('documents.tutelas.label'),
      items: t('documents.tutelas.items', { returnObjects: true }) || [],
    },
  };

  const handleTabChange = (catKey) => {
    setActiveTab(catKey);
    // Transform back to Title Case if parent expects it, or just pass the key
    // For now passing the translated label or key, depending on what the parent component needs.
    // The previous implementation passed 'Civil', 'Laboral' etc. (Labels)
    // We will pass the Label to maintain compatibility if possible, or key.
    // Assuming parent just logs or uses it for display.
    if (onCategoryChange) {
      onCategoryChange(categories[catKey].label);
    }
  };

  return (
    <div className="doc-explorer-container">
      {/* Tab Navigation */}
      <div
        className="doc-tabs"
        role="tablist"
        aria-label={t('home.docsTitle') || 'Categorías de documentos legales'}
      >
        {Object.keys(categories).map((catKey) => (
          <button
            key={catKey}
            role="tab"
            aria-selected={activeTab === catKey}
            aria-controls={`panel-${catKey}`}
            className={`doc-tab-btn ${activeTab === catKey ? 'active' : ''}`}
            onClick={() => handleTabChange(catKey)}
          >
            <i className={`fas ${categoryIcons[catKey]} mr-2`} aria-hidden="true"></i>
            <span>{categories[catKey].label}</span>
          </button>
        ))}
      </div>

      {/* Document List */}
      <div
        className="doc-list-container"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        <div className="doc-list-header">
          <i
            className={`fas ${categoryIcons[activeTab]} text-primary text-2xl`}
            aria-hidden="true"
          ></i>
          <h4 className="doc-list-title">
            {t('documents.title', { category: categories[activeTab].label })}
          </h4>
          <span className="doc-count">
            {t('documents.count', { count: categories[activeTab].items.length })}
          </span>
        </div>

        <div className="doc-grid">
          {categories[activeTab].items.map((doc, index) => (
            <div
              key={index}
              className="doc-card"
              role="button"
              tabIndex={0}
              aria-label={`Generar ${doc}`}
            >
              <div className="doc-card-icon">
                <i className={`fas ${getDocumentIcon(activeTab, index)}`} aria-hidden="true"></i>
              </div>
              <div className="doc-card-content">
                <span className="doc-card-title">{doc}</span>
                <span className="doc-card-action">
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocExplorer;
