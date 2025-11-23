import React, { useState, useMemo } from 'react';

const TeamCard = ({ title, icon, children }) => {
  return (
    <div className="big-team-card" style={{ padding: '50px 40px' }}>
      <span className="icon" style={{ marginBottom: '30px' }}>{icon}</span>
      <h2 style={{ marginBottom: '30px' }}>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

const ProfileItem = ({ name, role, location }) => (
  <div className="profile-item" style={{ padding: '15px', marginBottom: '15px' }}>
    <div className="profile-avatar" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
      {name.charAt(0)}
    </div>
    <div>
      <h4 style={{ margin: 0, color: 'var(--color-dark)', fontSize: '1.1rem' }}>{name}</h4>
      <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#666' }}>{role}</p>
      {location && <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>📍 {location}</p>}
    </div>
  </div>
);

// Mock Data for Lawyers
const MOCK_LAWYERS = [
  { id: 1, name: 'Jose Guillermo Vasquez', role: 'Consultor Líder', location: 'Bogotá', specialty: 'Tech Law' },
  { id: 2, name: 'Andrea Martínez', role: 'Especialista Civil', location: 'Bogotá', specialty: 'Civil' },
  { id: 3, name: 'Carlos Ruiz', role: 'Asociado Regional', location: 'Medellín', specialty: 'Comercial' },
  { id: 4, name: 'Diana López', role: 'Asociado Regional', location: 'Cali', specialty: 'Laboral' },
  { id: 5, name: 'Fernando Torres', role: 'Asociado Regional', location: 'Barranquilla', specialty: 'Penal' },
  { id: 6, name: 'Laura García', role: 'Especialista IP', location: 'Bogotá', specialty: 'Propiedad Intelectual' },
  { id: 7, name: 'Miguel Ángel', role: 'Litigante', location: 'Medellín', specialty: 'Civil' },
];

const LawyerSearch = () => {
  const [filterLocation, setFilterLocation] = useState('Todos');
  const [filterSpecialty, setFilterSpecialty] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const locations = ['Todos', ...new Set(MOCK_LAWYERS.map(l => l.location))];
  const specialties = ['Todas', ...new Set(MOCK_LAWYERS.map(l => l.specialty))];

  const filteredLawyers = useMemo(() => {
    return MOCK_LAWYERS.filter(lawyer => {
      const matchLocation = filterLocation === 'Todos' || lawyer.location === filterLocation;
      const matchSpecialty = filterSpecialty === 'Todas' || lawyer.specialty === filterSpecialty;
      const matchSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lawyer.role.toLowerCase().includes(searchTerm.toLowerCase());
      return matchLocation && matchSpecialty && matchSearch;
    });
  }, [filterLocation, filterSpecialty, searchTerm]);

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--color-primary)' }}>Buscador de Talento Legal</h3>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', flex: '1', minWidth: '200px' }}
        />
        
        <select 
          value={filterLocation} 
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <select 
          value={filterSpecialty} 
          onChange={(e) => setFilterSpecialty(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
        </select>
      </div>

      {/* Results */}
      <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map(lawyer => (
            <ProfileItem 
              key={lawyer.id} 
              name={lawyer.name} 
              role={`${lawyer.role} • ${lawyer.specialty}`} 
              location={lawyer.location} 
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No se encontraron abogados con estos filtros.</p>
        )}
      </div>
    </div>
  );
};

function AboutPage() {
  return (
    <div className="section-block" style={{ background: 'var(--color-light)' }}>
      {/* Header Section */}
      <div className="content-wrapper text-center mb-60">
        <h1 style={{ marginBottom: '30px' }}>
          Somos un equipo legaltech que adopta la tecnología en el corazón de sus procesos
        </h1>
        <p className="lead-text" style={{ margin: '0 auto', maxWidth: '800px' }}>
          Fusionamos el derecho con la innovación para crear soluciones que realmente funcionan.
        </p>
      </div>

      {/* Team Cards Section */}
      <div className="content-wrapper">
        <div className="team-cards-grid">
          
          {/* Card 1: Equipo Tech */}
          <TeamCard title="Equipo Tech" icon="💻">
            <p className="text-center mb-40" style={{ fontSize: '1.1rem', color: '#555' }}>
              Mentes brillantes detrás de la arquitectura, desarrollo y dirección tecnológica de Avocado.
            </p>
            
            <div className="profile-list">
              <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '25px', color: 'var(--color-secondary)' }}>Desarrollo & Dirección</h3>
              <ProfileItem name="Desarrollador X" role="Lead Developer" location="Remoto" />
              <ProfileItem name="Desarrollador Y" role="Frontend Specialist" location="Remoto" />
              <ProfileItem name="Desarrollador Z" role="AI Engineer" location="Remoto" />
              <ProfileItem name="Director Tech" role="CTO" location="Bogotá" />
            </div>
          </TeamCard>

          {/* Card 2: Equipo de Abogados */}
          <TeamCard title="Nuestros AVOCADOS" icon="⚖️">
            <p className="text-center mb-40" style={{ fontSize: '1.1rem', color: '#555' }}>
              Expertos legales comprometidos con la excelencia y la accesibilidad.
            </p>

            {/* Replaced static list with LawyerSearch component */}
            <LawyerSearch />
            
          </TeamCard>

        </div>
      </div>
    </div>
  );
}

export default AboutPage;
