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
export const PhoneHome = () => (
  <div style={screenStyle}>
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <h3 style={headerStyle}>Hola, Usuario</h3>
      
      {/* Imagen del hombre 3D */}
      <div style={{ margin: '15px 0' }}>
        <img 
          src={`${import.meta.env.BASE_URL}img/hombre3d.png`} 
          alt="Asistente Legal" 
          style={{ 
            width: '120px', 
            height: 'auto',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))'
          }} 
        />
      </div>
    </div>
    
    <div style={{ 
      backgroundColor: '#FFEBEE', 
      padding: '15px', 
      borderRadius: '12px', 
      marginTop: '10px',
      textAlign: 'center',
      border: '1px solid #FFCDD2'
    }}>
      <i className="fas fa-exclamation-circle" style={{ color: '#D32F2F', fontSize: '24px', marginBottom: '10px' }}></i>
      <h4 style={{ margin: '0 0 5px', color: '#C62828' }}>Línea de Emergencia</h4>
      <p style={{ fontSize: '0.8rem', margin: 0 }}>Asistencia legal inmediata 24/7</p>
    </div>

    <div style={{ marginTop: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button style={{ 
        background: '#FF6D00', 
        color: 'white', 
        border: 'none', 
        padding: '12px', 
        borderRadius: '25px', 
        fontWeight: 'bold', 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 4px 10px rgba(255, 109, 0, 0.3)'
      }}>
        <i className="fas fa-comment-dots"></i> Habla con tu Avocado
      </button>

      <div style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '8px' }}>
        <i className="fas fa-search"></i> Buscar servicio...
      </div>
    </div>
  </div>
);

// --- PANTALLA 2: DOCUMENTOS ---
export const PhoneDocs = () => (
  <div style={screenStyle}>
    <h3 style={headerStyle}>Mis Documentos</h3>
    
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <div style={{ flex: 1, background: '#E8F5E9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
        <i className="fas fa-plus" style={{ color: '#2E7D32' }}></i><br/>
        <span style={{ fontSize: '0.7rem' }}>Nuevo</span>
      </div>
      <div style={{ flex: 1, background: '#F5F5F5', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
        <i className="fas fa-folder" style={{ color: '#757575' }}></i><br/>
        <span style={{ fontSize: '0.7rem' }}>Archivos</span>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {['Contrato Arrendamiento', 'Derecho de Petición Salud', 'Tutela'].map((doc, i) => (
        <div key={i} style={{ padding: '10px', border: '1px solid #eee', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fas fa-file-alt" style={{ color: '#1565C0' }}></i>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{doc}</div>
            <div style={{ fontSize: '0.6rem', color: '#888' }}>Editado hace 2h</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
export const PhoneLawyers = () => (
  <div style={screenStyle}>
    <h3 style={headerStyle}>Especialistas</h3>
    
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', overflowX: 'auto' }}>
       <img src={`${import.meta.env.BASE_URL}img/lawyers-flags.png`} alt="Flags" style={{ height: '20px', objectFit: 'contain' }} />
       {/* Fallback si la imagen combinada no es ideal, usaríamos banderas individuales */}
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {[
        { name: 'Dr. Juan Pérez', spec: 'Laboral', stars: 4.8, img: '/img/avatar-senior-1.png', country: '🇨🇴' },
        { name: 'Dra. Ana Gómez', spec: 'Familia', stars: 4.9, img: '/img/avatar-senior-2.png', country: '🇺🇸' },
        { name: 'Dr. Carlos Ruiz', spec: 'Penal', stars: 4.7, img: '/img/avatar-junior-2.png', country: '🇨🇴' }
      ].map((lawyer, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ position: 'relative' }}>
             <img src={lawyer.img} alt={lawyer.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
             <span style={{ position: 'absolute', bottom: 0, right: -2, fontSize: '0.8rem' }}>{lawyer.country}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{lawyer.name}</div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>{lawyer.spec}</div>
          </div>
          <div style={{ color: '#FFC107', fontSize: '0.8rem' }}>
            <i className="fas fa-star"></i> {lawyer.stars}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- PANTALLA 5: PRICING ---
export function PhonePricing() {
  return (
    <div className="phone-screen">
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
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
              src={`${import.meta.env.BASE_URL}img/Gob. Corporativo (2).png`} 
              alt="Abogado de Bolsillo" 
              style={{ 
                width: '100%', 
                height: 'auto',
                borderRadius: '12px',
                marginBottom: '15px'
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
            background: '#E8F5E9', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              Free
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '5px' }}>
              $0
            </div>
          </div>
          
          <div style={{ 
            background: 'var(--color-primary)', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(46, 125, 50, 0.3)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
              Junior
            </div>
            <div style={{ fontSize: '0.7rem', color: 'white', marginTop: '5px' }}>
              $15
            </div>
          </div>
          
          <div style={{ 
            background: '#E3F2FD', 
            padding: '15px 10px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
              Senior
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '5px' }}>
              $100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
