import React from 'react';

// Estilos inline básicos para prototipado rápido de las pantallas
const screenStyle = {
  width: '100%',
  height: '100%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  overflow: 'hidden',
  position: 'relative'
};

const headerStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#2E7D32',
  fontFamily: 'Comfortaa, cursive'
};

// --- PANTALLA 1: HOME ---
export const PhoneHome = () => {
  const handleChatClick = () => {
    // Scroll to consultancy section
    const consultancySection = document.getElementById('consultancy');
    if (consultancySection) {
      consultancySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{...screenStyle, backgroundColor: '#E8F5E9'}}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        gap: '20px',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '30px' }}>
          {/* Imagen avatar-junior-1 - centrada y con mejor tamaño */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            marginBottom: '15px'
          }}>
        <img 
              src={`${import.meta.env.BASE_URL}img/avatar-junior-1.png`} 
          alt="Asistente Legal" 
          style={{ 
                width: '100%', 
                maxWidth: '200px',
            height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.15))'
          }} 
        />
      </div>
          
          <h3 style={{...headerStyle, color: '#1B5E20', marginBottom: '0', marginTop: '10px', fontSize: '1rem'}}>¿En qué te puedo ayudar hoy?</h3>
    </div>
    
    <div style={{ 
          marginTop: 'auto', 
          marginBottom: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          width: '100%'
        }}>
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
              width: '100%'
            }}
          >
        <i className="fas fa-comment-dots"></i> Habla con tu Avocado
      </button>

          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            padding: '12px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666'
          }}>
            <i className="fas fa-search"></i> 
            <span style={{ fontSize: '0.85rem' }}>Buscar servicio...</span>
          </div>
      </div>
    </div>
  </div>
);
};

// --- PANTALLA 2: DOCUMENTOS ---
export const PhoneDocs = ({ selectedCategory = 'Civil' }) => {
  const categories = {
    'Civil': ['Contrato de Arrendamiento', 'Compraventa Vehículo', 'Poder General', 'Promesa Compraventa'],
    'Laboral': ['Contrato Laboral', 'Liquidación Prestaciones', 'Reglamento Interno', 'Descargos Disciplinarios'],
    'Comercial': ['Constitución SAS', 'Acuerdo de Confidencialidad', 'Registro de Marca', 'Acta de Asamblea'],
    'Penal': ['Denuncia Penal', 'Poder Defensor', 'Solicitud Audiencia', 'Habeas Corpus'],
    'Tutelas': ['Tutela Salud', 'Tutela Educación', 'Derecho de Petición', 'Impugnación Fallo']
  };

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

  const documents = categories[selectedCategory] || categories['Civil'];

  return (
  <div style={screenStyle}>
    <h3 style={headerStyle}>Mis Documentos</h3>
    
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <div style={{ flex: 1, background: '#E8F5E9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
        <i className="fas fa-plus" style={{ color: '#2E7D32' }}></i><br/>
        <span style={{ fontSize: '0.7rem' }}>Nuevo</span>
      </div>
      <div style={{ flex: 1, background: '#F5F5F5', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
        <i className="fas fa-folder" style={{ color: '#757575' }}></i><br/>
        <span style={{ fontSize: '0.7rem' }}>Archivos</span>
      </div>
    </div>

      <div style={{ 
        fontSize: '0.7rem', 
        color: '#666', 
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {selectedCategory}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '300px' }}>
        {documents.map((doc, i) => (
          <div key={i} style={{ 
            padding: '10px', 
            border: '1px solid #eee', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: 'white'
          }}>
            <i className={`fas ${getDocumentIcon(doc)}`} style={{ color: '#2E7D32', fontSize: '1rem' }}></i>
          <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{doc}</div>
              <div style={{ fontSize: '0.6rem', color: '#888' }}>Disponible</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

// --- PANTALLA 3: DASHBOARD (NOTION STYLE) ---
export const PhoneDashboard = () => (
  <div style={screenStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
       <img src={`${import.meta.env.BASE_URL}img/tablero-seguimiento.png`} alt="Icon" style={{ width: '24px', height: '24px' }} />
       <h3 style={{ ...headerStyle, marginBottom: 0, fontSize: '1rem' }}>Tablero de Casos</h3>
    </div>
    
    <div style={{ marginBottom: '15px', padding: '10px', background: '#F7F6F3', borderRadius: '6px', borderLeft: '3px solid #2E7D32' }}>
      <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>PROYECTO ACTIVO</div>
      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Demanda Laboral SAS</div>
      <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
         <span style={{ fontSize: '0.6rem', background: '#E3F2FD', padding: '2px 6px', borderRadius: '4px', color: '#1565C0' }}>En Proceso</span>
         <span style={{ fontSize: '0.6rem', background: '#FFEBEE', padding: '2px 6px', borderRadius: '4px', color: '#C62828' }}>Urgente</span>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
       <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Pendientes</div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
          <input type="checkbox" checked readOnly /> <span>Revisar cláusulas contrato</span>
       </div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
          <input type="checkbox" /> <span>Subir evidencia fotográfica</span>
       </div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
          <input type="checkbox" /> <span>Firmar poder autenticado</span>
       </div>
    </div>

    <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '10px' }}>
       <div style={{ fontSize: '0.7rem', color: '#666' }}>Progreso General</div>
       <div style={{ height: '6px', background: '#eee', borderRadius: '3px', marginTop: '5px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: '#2E7D32' }}></div>
       </div>
    </div>
  </div>
);

// --- PANTALLA 4: ABOGADOS (MARKETPLACE + BANDERAS) ---
export const PhoneLawyers = ({ selectedCountry = 'co' }) => {
  const lawyersByCountry = {
    'co': [
      { name: 'Dr. Juan Pérez', spec: 'Laboral', stars: 4.8, img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png` },
      { name: 'Dra. María Rodríguez', spec: 'Civil', stars: 4.9, img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png` },
      { name: 'Dr. Carlos Ruiz', spec: 'Penal', stars: 4.7, img: `${import.meta.env.BASE_URL}img/avatar-junior-2.png` },
      { name: 'Dra. Laura Gómez', spec: 'Comercial', stars: 4.8, img: `${import.meta.env.BASE_URL}img/avatar-junior-1.png` }
    ],
    'us': [
      { name: 'Atty. John Smith', spec: 'Corporate Law', stars: 4.9, img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png` },
      { name: 'Atty. Sarah Johnson', spec: 'Immigration', stars: 4.8, img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png` },
      { name: 'Atty. Michael Brown', spec: 'Criminal Defense', stars: 4.7, img: `${import.meta.env.BASE_URL}img/avatar-junior-2.png` }
    ],
    'mx': [
      { name: 'Lic. Roberto Martínez', spec: 'Laboral', stars: 4.8, img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png` },
      { name: 'Lic. Carmen López', spec: 'Fiscal', stars: 4.9, img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png` }
    ],
    'es': [
      { name: 'Dr. Javier García', spec: 'Mercantil', stars: 4.8, img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png` },
      { name: 'Dra. Ana Fernández', spec: 'Laboral', stars: 4.7, img: `${import.meta.env.BASE_URL}img/avatar-junior-1.png` }
    ],
    'ar': [
      { name: 'Dr. Diego Fernández', spec: 'Comercial', stars: 4.8, img: `${import.meta.env.BASE_URL}img/avatar-senior-1.png` },
      { name: 'Dra. Sofía Martínez', spec: 'Laboral', stars: 4.9, img: `${import.meta.env.BASE_URL}img/avatar-senior-2.png` }
    ]
  };

  const countryNames = {
    'co': 'Colombia',
    'us': 'Estados Unidos',
    'mx': 'México',
    'es': 'España',
    'ar': 'Argentina'
  };

  const lawyers = lawyersByCountry[selectedCountry] || lawyersByCountry['co'];

  return (
  <div style={screenStyle}>
    <h3 style={headerStyle}>Especialistas</h3>
    
      <div style={{ 
        fontSize: '0.75rem', 
        color: '#666', 
        marginBottom: '15px',
        padding: '8px',
        background: '#E8F5E9',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        {countryNames[selectedCountry]}
    </div>
    
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '400px' }}>
        {lawyers.map((lawyer, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '10px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #eee'
          }}>
          <div style={{ position: 'relative' }}>
               <img 
                 src={lawyer.img} 
                 alt={lawyer.name} 
                 style={{ 
                   width: '45px', 
                   height: '45px', 
                   borderRadius: '50%', 
                   objectFit: 'cover',
                   border: '2px solid #E8F5E9'
                 }} 
               />
          </div>
          <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#2E7D32' }}>{lawyer.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '2px' }}>{lawyer.spec}</div>
          </div>
            <div style={{ color: '#FFC107', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
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
  // Determinar qué imagen mostrar según el plan seleccionado (invertido entre FREE y Junior)
  const getAvatarImage = () => {
    switch(selectedPlan.toLowerCase()) {
      case 'senior':
        return `${import.meta.env.BASE_URL}img/avatar-senior-1.png`;
      case 'free':
        return `${import.meta.env.BASE_URL}img/Gob. Corporativo (2).png`;
      case 'junior':
      default:
        return `${import.meta.env.BASE_URL}img/avatar-free-2.png`;
    }
  };

  return (
    <div className="phone-screen">
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#E8F5E9'
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1B5E20' }}>
            Tu Abogado de Bolsillo
          </h3>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <img 
              src={getAvatarImage()} 
              alt="Abogado de Bolsillo" 
              style={{ 
                width: '100%', 
                height: 'auto',
                borderRadius: '12px',
                marginBottom: '15px',
                objectFit: 'cover',
                transition: 'opacity 0.3s ease'
              }} 
            />
            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
              Asesoría legal profesional siempre contigo
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '10px',
          marginTop: '20px'
        }}>
          <div style={{ 
            background: selectedPlan === 'free' ? '#6c757d' : '#E8F5E9', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            transform: selectedPlan === 'free' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selectedPlan === 'free' ? '0 4px 8px rgba(108, 117, 125, 0.3)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: selectedPlan === 'free' ? 'white' : 'var(--color-primary)' }}>
              Free
            </div>
            <div style={{ fontSize: '0.7rem', color: selectedPlan === 'free' ? 'white' : '#666', marginTop: '5px' }}>
              $0
            </div>
          </div>
          
          <div style={{ 
            background: selectedPlan === 'junior' ? '#2E7D32' : 'var(--color-primary)', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            transform: selectedPlan === 'junior' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selectedPlan === 'junior' ? '0 4px 8px rgba(46, 125, 50, 0.3)' : '0 4px 8px rgba(46, 125, 50, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
              Junior
            </div>
            <div style={{ fontSize: '0.7rem', color: 'white', marginTop: '5px' }}>
              $15
            </div>
          </div>
          
          <div style={{ 
            background: selectedPlan === 'senior' ? '#4065B9' : '#E3F2FD', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            transform: selectedPlan === 'senior' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selectedPlan === 'senior' ? '0 4px 8px rgba(64, 101, 185, 0.3)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: selectedPlan === 'senior' ? 'white' : 'var(--color-secondary)' }}>
              Senior
            </div>
            <div style={{ fontSize: '0.7rem', color: selectedPlan === 'senior' ? 'white' : '#666', marginTop: '5px' }}>
              $100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
