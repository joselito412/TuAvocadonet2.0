import React, { useState, useMemo } from 'react';

const TeamCard = ({ title, icon, children }) => {
  return (
    <div className="big-team-card p-12">
      <span className="icon mb-8">{icon}</span>
      <h2 className="mb-8">{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

const ProfileItem = ({ name, role, location }) => (
  <div className="profile-item p-4 mb-4">
    <div className="profile-avatar w-12 h-12 text-lg">
      {name.charAt(0)}
    </div>
    <div>
      <h4 className="m-0 text-dark text-lg">{name}</h4>
      <p className="mt-1 text-sm text-gray-600">{role}</p>
      {location && <p className="mt-1 text-xs text-gray-500 italic">📍 {location}</p>}
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
    <div className="mt-10">
      <h3 className="mb-5 text-primary">Buscador de Talento Legal</h3>
      
      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
        <select 
          value={filterLocation} 
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <select 
          value={filterSpecialty} 
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
        </select>
      </div>

      {/* Results */}
      <div className="max-h-96 overflow-y-auto pr-3">
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
          <p className="text-center text-gray-500 py-5">No se encontraron abogados con estos filtros.</p>
        )}
      </div>
    </div>
  );
};

function AboutPage() {
  return (
    <div className="section-block bg-light">
      {/* Header Section */}
      <div className="content-wrapper text-center mb-60">
        <h1 className="mb-8">
          Somos un equipo legaltech que adopta la tecnología en el corazón de sus procesos
        </h1>
        <p className="lead-text mx-auto max-w-3xl">
          Fusionamos el derecho con la innovación para crear soluciones que realmente funcionan.
        </p>
      </div>

      {/* Team Cards Section */}
      <div className="content-wrapper">
        <div className="team-cards-grid">
          
          {/* Card 1: Equipo Tech */}
          <TeamCard title="Equipo Tech" icon="💻">
            <p className="text-center mb-10 text-lg text-gray-600">
              Mentes brillantes detrás de la arquitectura, desarrollo y dirección tecnológica de Avocado.
            </p>
            
            <div className="profile-list">
              <h3 className="text-xl border-b border-gray-200 pb-4 mb-6 text-secondary">Desarrollo & Dirección</h3>
              <ProfileItem name="Desarrollador X" role="Lead Developer" location="Remoto" />
              <ProfileItem name="Desarrollador Y" role="Frontend Specialist" location="Remoto" />
              <ProfileItem name="Desarrollador Z" role="AI Engineer" location="Remoto" />
              <ProfileItem name="Director Tech" role="CTO" location="Bogotá" />
            </div>
          </TeamCard>

          {/* Card 2: Equipo de Abogados */}
          <TeamCard title="Nuestros AVOCADOS" icon="⚖️">
            <p className="text-center mb-10 text-lg text-gray-600">
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
