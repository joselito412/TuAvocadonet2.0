import React from 'react';
import { useTranslation } from 'react-i18next';

// Estilos inline básicos
const screenStyle = {
  width: '100%',
  height: '100%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  overflow: 'hidden',
  position: 'relative',
};

const headerStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#2E7D32',
  fontFamily: 'Comfortaa, cursive',
};

// --- PANTALLA 1: HOME ---
export const PhoneHome = () => {
  const { t } = useTranslation();

  const handleChatClick = () => {
    const consultancySection = document.getElementById('consultancy');
    if (consultancySection) {
      consultancySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ ...screenStyle, backgroundColor: '#E8F5E9' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '20px',
          padding: '20px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: '15px',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/avatar-junior-1.png`}
              alt="Asistente Legal"
              style={{
                width: '100%',
                maxWidth: '200px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.15))',
              }}
            />
          </div>

          <h3
            style={{
              ...headerStyle,
              color: '#1B5E20',
              marginBottom: '0',
              marginTop: '10px',
              fontSize: '1rem',
            }}
          >
            {t('phoneScreens.home.greeting')}
          </h3>
        </div>

        <div
          style={{
            marginTop: 'auto',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
          }}
        >
          <button
            onClick={handleChatClick}
            style={{
              background: '#FF6D00',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 10px rgba(255, 109, 0, 0.3)',
              width: '100%',
            }}
          >
            <i className="fas fa-comment-dots"></i> {t('phoneScreens.home.cta')}
          </button>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#666',
            }}
          >
            <i className="fas fa-search"></i>
            <span style={{ fontSize: '0.85rem' }}>{t('phoneScreens.home.search')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PANTALLA 2: DOCUMENTOS ---
export const PhoneDocs = ({ selectedCategory = 'Civil' }) => {
  const { t } = useTranslation();

  // Use keys to access translations
  // The prop 'selectedCategory' comes from parent as 'Civil', 'Laboral' etc (Strings)
  // We need to map these to our keys: 'civil', 'labor', 'commercial', etc.
  const mapCategoryToKey = (catName) => {
    switch (catName) {
      case 'Civil':
        return 'civil';
      case 'Laboral':
        return 'labor';
      case 'Comercial':
        return 'commercial';
      case 'Penal':
        return 'criminal';
      case 'Tutelas':
        return 'tutelas';
      default:
        return 'civil';
    }
  };

  const currentKey = mapCategoryToKey(selectedCategory);
  const documents = t(`documents.${currentKey}.items`, { returnObjects: true }) || [];

  const getDocumentIcon = (docName) => {
    const lower = docName.toLowerCase();
    if (lower.includes('contrato')) return 'fa-file-signature';
    if (lower.includes('compraventa')) return 'fa-handshake';
    if (lower.includes('poder')) return 'fa-stamp';
    if (lower.includes('tutela')) return 'fa-hand-paper';
    if (lower.includes('denuncia')) return 'fa-exclamation-triangle';
    if (lower.includes('constitución')) return 'fa-landmark';
    if (lower.includes('liquidación')) return 'fa-calculator';
    if (lower.includes('registro')) return 'fa-registered';
    if (lower.includes('petición')) return 'fa-envelope-open-text';
    return 'fa-file-alt';
  };

  return (
    <div style={screenStyle}>
      <h3 style={headerStyle}>{t('phoneScreens.docs.title')}</h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <div
          style={{
            flex: 1,
            background: '#E8F5E9',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <i className="fas fa-plus" style={{ color: '#2E7D32' }}></i>
          <br />
          <span style={{ fontSize: '0.7rem' }}>{t('phoneScreens.docs.new')}</span>
        </div>
        <div
          style={{
            flex: 1,
            background: '#F5F5F5',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <i className="fas fa-folder" style={{ color: '#757575' }}></i>
          <br />
          <span style={{ fontSize: '0.7rem' }}>{t('phoneScreens.docs.files')}</span>
        </div>
      </div>

      <div
        style={{
          fontSize: '0.7rem',
          color: '#666',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {selectedCategory}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
          maxHeight: '300px',
        }}
      >
        {documents.map((doc, i) => (
          <div
            key={i}
            style={{
              padding: '10px',
              border: '1px solid #eee',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'white',
            }}
          >
            <i
              className={`fas ${getDocumentIcon(doc)}`}
              style={{ color: '#2E7D32', fontSize: '1rem' }}
            ></i>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{doc}</div>
              <div style={{ fontSize: '0.6rem', color: '#888' }}>
                {t('phoneScreens.docs.available')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PANTALLA 3: DASHBOARD (NOTION STYLE) ---
export const PhoneDashboard = () => {
  const { t } = useTranslation();
  const rawTasks = t('phoneScreens.dashboard.tasks', { returnObjects: true });
  const tasks = Array.isArray(rawTasks) ? rawTasks : [];

  return (
    <div style={screenStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img
          src={`${import.meta.env.BASE_URL}img/tablero-seguimiento.png`}
          alt="Icon"
          style={{ width: '24px', height: '24px' }}
        />
        <h3 style={{ ...headerStyle, marginBottom: 0, fontSize: '1rem' }}>
          {t('phoneScreens.dashboard.title')}
        </h3>
      </div>

      <div
        style={{
          marginBottom: '15px',
          padding: '10px',
          background: '#F7F6F3',
          borderRadius: '6px',
          borderLeft: '3px solid #2E7D32',
        }}
      >
        <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>
          {t('phoneScreens.dashboard.activeProject')}
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
          {t('phoneScreens.dashboard.sampleCase')}
        </div>
        <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
          <span
            style={{
              fontSize: '0.6rem',
              background: '#E3F2FD',
              padding: '2px 6px',
              borderRadius: '4px',
              color: '#1565C0',
            }}
          >
            {t('phoneScreens.dashboard.status.inProgress')}
          </span>
          <span
            style={{
              fontSize: '0.6rem',
              background: '#FFEBEE',
              padding: '2px 6px',
              borderRadius: '4px',
              color: '#C62828',
            }}
          >
            {t('phoneScreens.dashboard.status.urgent')}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            fontSize: '0.7rem',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {t('phoneScreens.dashboard.pending')}
        </div>
        {tasks.map((task, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}
          >
            <input type="checkbox" checked={idx === 0} readOnly />
            <span>
              {/* Robust rendering for string or object tasks */}
              {typeof task === 'object' && task !== null
                ? task.desc || task.name || task.title || JSON.stringify(task)
                : task}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        <div style={{ fontSize: '0.7rem', color: '#666' }}>
          {t('phoneScreens.dashboard.progress')}
        </div>
        <div
          style={{
            height: '6px',
            background: '#eee',
            borderRadius: '3px',
            marginTop: '5px',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: '65%', height: '100%', background: '#2E7D32' }}></div>
        </div>
      </div>
    </div>
  );
};

// --- PANTALLA 4: ABOGADOS (MARKETPLACE + BANDERAS) ---
export const PhoneLawyers = ({ selectedCountry = 'co' }) => {
  const { t } = useTranslation();

  // Mapping simple static data. Ideally this comes from a backend or is also fully translated.
  // For 'co', 'es', 'mx', 'ar' we use Spanish terms. For 'us' we might want to keep native terms or translate.
  // We will keep names as is, but translate titles/country names?
  // Since this is a demo, I will hardcode the names but ensure the wrapper text is translated.
  // The country list is already present in home.

  const lawyersByCountry = {
    co: [
      {
        name: 'Dr. Juan Pérez',
        spec: 'Laboral',
        stars: 4.8,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      },
      {
        name: 'Dra. María Rodríguez',
        spec: 'Civil',
        stars: 4.9,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png`,
      },
      {
        name: 'Dr. Carlos Ruiz',
        spec: 'Penal',
        stars: 4.7,
        img: `${import.meta.env.BASE_URL}img/avatar-junior-2.png`,
      },
      {
        name: 'Dra. Laura Gómez',
        spec: 'Comercial',
        stars: 4.8,
        img: `${import.meta.env.BASE_URL}img/avatar-junior-1.png`,
      },
    ],
    us: [
      {
        name: 'Atty. John Smith',
        spec: 'Corporate Law',
        stars: 4.9,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      },
      {
        name: 'Atty. Sarah Johnson',
        spec: 'Immigration',
        stars: 4.8,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png`,
      },
      {
        name: 'Atty. Michael Brown',
        spec: 'Criminal Defense',
        stars: 4.7,
        img: `${import.meta.env.BASE_URL}img/avatar-junior-2.png`,
      },
    ],
    mx: [
      {
        name: 'Lic. Roberto Martínez',
        spec: 'Laboral',
        stars: 4.8,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      },
      {
        name: 'Lic. Carmen López',
        spec: 'Fiscal',
        stars: 4.9,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png`,
      },
    ],
    es: [
      {
        name: 'Dr. Javier García',
        spec: 'Mercantil',
        stars: 4.8,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      },
      {
        name: 'Dra. Ana Fernández',
        spec: 'Laboral',
        stars: 4.7,
        img: `${import.meta.env.BASE_URL}img/avatar-junior-1.png`,
      },
    ],
    ar: [
      {
        name: 'Dr. Diego Fernández',
        spec: 'Comercial',
        stars: 4.8,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png`,
      },
      {
        name: 'Dra. Sofía Martínez',
        spec: 'Laboral',
        stars: 4.9,
        img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png`,
      },
    ],
  };

  const countries = t('home.specialized.countries', { returnObjects: true });
  // Fallback if not loaded
  const countryData =
    countries && countries[selectedCountry]
      ? countries[selectedCountry]
      : selectedCountry.toUpperCase();
  const countryName = typeof countryData === 'object' ? countryData.name : countryData;

  const lawyers = lawyersByCountry[selectedCountry] || lawyersByCountry['co'];

  return (
    <div style={screenStyle}>
      <h3 style={headerStyle}>{t('phoneScreens.lawyers.title')}</h3>

      <div
        style={{
          fontSize: '0.75rem',
          color: '#666',
          marginBottom: '15px',
          padding: '8px',
          background: '#E8F5E9',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        {countryName}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
          maxHeight: '400px',
        }}
      >
        {lawyers.map((lawyer, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={lawyer.img}
                alt={lawyer.name}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #E8F5E9',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#2E7D32' }}>
                {lawyer.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '2px' }}>
                {lawyer.spec}
              </div>
            </div>
            <div
              style={{
                color: '#FFC107',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <i className="fas fa-star"></i>
              <span>{lawyer.stars}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PANTALLA 5: PRICING ---
export function PhonePricing({ selectedPlan = 'free' }) {
  const { t } = useTranslation();

  const getAvatarImage = () => {
    switch (selectedPlan.toLowerCase()) {
      case 'senior':
        return `${import.meta.env.BASE_URL}img/avatar-senior-1.png`;
      case 'free':
        return `${import.meta.env.BASE_URL}img/Gob. Corporativo (2).png`;
      case 'junior':
      default:
        return `${import.meta.env.BASE_URL}img/avatar-junior-1.png`;
    }
  };

  return (
    <div className="phone-screen">
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          backgroundColor: '#E8F5E9',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1B5E20' }}>
            {t('phoneScreens.pricing.title')}
          </h3>

          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={getAvatarImage()}
              alt="Abogado de Bolsillo"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                marginBottom: '15px',
                objectFit: 'cover',
                transition: 'opacity 0.3s ease',
              }}
            />
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
              {t('phoneScreens.pricing.subtitle')}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              background: selectedPlan === 'free' ? '#6c757d' : '#E8F5E9',
              padding: '15px 10px',
              borderRadius: '12px',
              textAlign: 'center',
              transform: selectedPlan === 'free' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedPlan === 'free' ? '0 4px 8px rgba(108, 117, 125, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: selectedPlan === 'free' ? 'white' : 'var(--color-primary)',
              }}
            >
              {t('whatWeDo.plans.free.title')}
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: selectedPlan === 'free' ? 'white' : '#666',
                marginTop: '5px',
              }}
            >
              $0
            </div>
          </div>

          <div
            style={{
              background: selectedPlan === 'junior' ? '#2E7D32' : '#E8F5E9',
              padding: '15px 10px',
              borderRadius: '12px',
              textAlign: 'center',
              transform: selectedPlan === 'junior' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedPlan === 'junior' ? '0 4px 8px rgba(46, 125, 50, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: selectedPlan === 'junior' ? 'white' : '#2E7D32',
              }}
            >
              {t('whatWeDo.plans.junior.title')}
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: selectedPlan === 'junior' ? 'white' : '#2E7D32',
                marginTop: '5px',
              }}
            >
              $15
            </div>
          </div>

          <div
            style={{
              background: selectedPlan === 'senior' ? '#4065B9' : '#E3F2FD',
              padding: '15px 10px',
              borderRadius: '12px',
              textAlign: 'center',
              transform: selectedPlan === 'senior' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedPlan === 'senior' ? '0 4px 8px rgba(64, 101, 185, 0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: selectedPlan === 'senior' ? 'white' : 'var(--color-secondary)',
              }}
            >
              {t('whatWeDo.plans.senior.title')}
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: selectedPlan === 'senior' ? 'white' : '#666',
                marginTop: '5px',
              }}
            >
              $100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
