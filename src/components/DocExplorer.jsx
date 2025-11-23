import React, { useState } from 'react';

// Category-specific icons for better visual distinction
const categoryIcons = {
  'Civil': 'fa-balance-scale',
  'Laboral': 'fa-briefcase',
  'Comercial': 'fa-building',
  'Penal': 'fa-gavel',
  'Tutelas': 'fa-shield-alt'
};

// Document type icons based on keywords
const getDocumentIcon = (docName) => {
  if (docName.includes('Contrato')) return 'fa-file-signature';
  if (docName.includes('Compraventa')) return 'fa-handshake';
  if (docName.includes('Poder')) return 'fa-stamp';
  if (docName.includes('Tutela')) return 'fa-hand-paper';
  if (docName.includes('Denuncia')) return 'fa-exclamation-triangle';
  if (docName.includes('Constitución')) return 'fa-landmark';
  if (docName.includes('Liquidación')) return 'fa-calculator';
  if (docName.includes('Registro')) return 'fa-registered';
  if (docName.includes('Derecho de Petición')) return 'fa-envelope-open-text';
  return 'fa-file-alt';
};

const categories = {
  'Civil': ['Contrato de Arrendamiento', 'Compraventa Vehículo', 'Poder General', 'Promesa Compraventa'],
  'Laboral': ['Contrato Laboral', 'Liquidación Prestaciones', 'Reglamento Interno', 'Descargos Disciplinarios'],
  'Comercial': ['Constitución SAS', 'Acuerdo de Confidencialidad', 'Registro de Marca', 'Acta de Asamblea'],
  'Penal': ['Denuncia Penal', 'Poder Defensor', 'Solicitud Audiencia', 'Habeas Corpus'],
  'Tutelas': ['Tutela Salud', 'Tutela Educación', 'Derecho de Petición', 'Impugnación Fallo']
};

const DocExplorer = ({ onCategoryChange }) => {
  const [activeTab, setActiveTab] = useState('Civil');

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
  };

  return (
    <div className="doc-explorer-container">
      {/* Tab Navigation */}
      <div className="doc-tabs" role="tablist" aria-label="Categorías de documentos legales">
        {Object.keys(categories).map(cat => (
          <button 
            key={cat} 
            role="tab"
            aria-selected={activeTab === cat}
            aria-controls={`panel-${cat}`}
            className={`doc-tab-btn ${activeTab === cat ? 'active' : ''}`}
            onClick={() => handleTabChange(cat)}
          >
            <i className={`fas ${categoryIcons[cat]} mr-2`} aria-hidden="true"></i>
            <span>{cat}</span>
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
          <i className={`fas ${categoryIcons[activeTab]} text-primary text-2xl`} aria-hidden="true"></i>
          <h4 className="doc-list-title">
            Documentos {activeTab}
          </h4>
          <span className="doc-count">{categories[activeTab].length} documentos</span>
        </div>

        <div className="doc-grid">
          {categories[activeTab].map((doc, index) => (
            <div 
              key={index} 
              className="doc-card"
              role="button"
              tabIndex={0}
              aria-label={`Generar ${doc}`}
            >
              <div className="doc-card-icon">
                <i className={`fas ${getDocumentIcon(doc)}`} aria-hidden="true"></i>
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
