import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

// Logo or Icon for the notebook branding
const AvocadoLogo = () => <span className="text-2xl mr-2">🥑</span>;

const MOCK_LAWYERS = [
  {
    id: 1,
    name: 'Jose Guillermo Vasquez',
    // We will use translation keys directly in the component or pre-translate if needed.
    // Since this is outside the component, we can't use 't' here easily for dynamic values unless we wrap it or use keys.
    // For simplicity in this refactor, I will keep using keys or move the array inside useMemo if I want 't'.
    // Actually, the previous implementation used t() inside the definitions.
    // To properly support t() for static data, we usually move it inside.
    // BUT the lint complained about dependencies.
    // BEST PRACTICE: Define the structure with keys, translate in render.
    roleKey: 'about.lawyers.roles.leadConsultant',
    location: 'Bogotá',
    specialtyKey: 'about.lawyers.specialties.techLaw',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 2,
    name: 'Andrea Martínez',
    roleKey: 'about.lawyers.roles.civilSpecialist',
    location: 'Bogotá',
    specialtyKey: 'about.lawyers.specialties.civil',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 3,
    name: 'Carlos Ruiz',
    roleKey: 'about.lawyers.roles.regionalAssociate',
    location: 'Medellín',
    specialtyKey: 'about.lawyers.specialties.commercial',
    color: 'bg-orange-100 text-orange-800',
  },
  {
    id: 4,
    name: 'Diana López',
    roleKey: 'about.lawyers.roles.regionalAssociate',
    location: 'Cali',
    specialtyKey: 'about.lawyers.specialties.labor',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: 5,
    name: 'Fernando Torres',
    roleKey: 'about.lawyers.roles.regionalAssociate',
    location: 'Barranquilla',
    specialtyKey: 'about.lawyers.specialties.criminal',
    color: 'bg-red-100 text-red-800',
  },
  {
    id: 6,
    name: 'Laura García',
    roleKey: 'about.lawyers.roles.ipSpecialist',
    location: 'Bogotá',
    specialtyKey: 'about.lawyers.specialties.ip',
    color: 'bg-teal-100 text-teal-800',
  },
  {
    id: 7,
    name: 'Miguel Ángel',
    roleKey: 'about.lawyers.roles.litigator',
    location: 'Medellín',
    specialtyKey: 'about.lawyers.specialties.civil',
    color: 'bg-indigo-100 text-indigo-800',
  },
];

const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mobile check
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredLawyers = useMemo(() => {
    return MOCK_LAWYERS.filter((lawyer) => {
      // Translate for filtering content
      const role = t(lawyer.roleKey);
      const specialty = t(lawyer.specialtyKey);

      return (
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, t]);

  // Notebook content renderer
  const renderNotebook = () => (
    <div
      className={`
      relative w-full flex flex-col transition-all duration-500
      ${isMobile ? 'min-h-[600px] h-auto' : 'h-full'}
      bg-[#fdfbf7] border-4 lg:border-8 border-[#2E7D32] rounded-tr-3xl rounded-br-3xl rounded-bl-xl shadow-2xl
    `}
    >
      {/* Visual Spine (Left Border) */}
      <div className="absolute left-0 top-0 bottom-0 w-4 lg:w-6 bg-[#1B5E20] opacity-20 border-r border-black/5"></div>

      {/* Header / Tabs Area inside Notebook */}
      <div className="pt-6 px-6 lg:px-10 pb-4 border-b border-[#2E7D32]/20 flex flex-wrap items-center justify-between gap-4 ml-4 lg:ml-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-heading text-[#2E7D32] flex items-center gap-2">
            <span className="text-3xl">📒</span>
            {t('about.lawyers.title')}
          </h2>
          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mt-1">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Search Bar - Sticker Style */}
        <div className="relative transform -rotate-1 shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder={t('about.lawyers.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all w-full md:w-64 font-handwriting placeholder-gray-400 text-gray-700"
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </div>

      {/* Ledger Lines Background */}
      <div
        className="flex-1 overflow-y-auto relative ml-4 lg:ml-6 custom-scrollbar"
        style={{
          backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '100% 2.5rem',
          backgroundAttachment: 'local',
        }}
      >
        {/* Table/List Content */}
        <div className="p-4 lg:p-8">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b-2 border-[#2E7D32] mb-4 text-xs font-bold text-[#2E7D32] uppercase tracking-wider sticky top-0 bg-[#fdfbf7] z-10">
            <div className="col-span-4 pl-2">{t('about.lawyers.filters.specialty')}</div>{' '}
            {/* Name column effectively */}
            <div className="col-span-3">Rol</div>
            <div className="col-span-3">Ubicación</div>
            <div className="col-span-2 text-center">Acción</div>
          </div>

          <div className="space-y-6 md:space-y-0">
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center py-3 border-b border-gray-200 hover:bg-green-50/50 transition-colors relative"
                >
                  {/* Avatar & Name */}
                  <div className="col-span-12 md:col-span-4 flex items-center gap-3 pl-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm ${lawyer.color} font-bold border border-current opacity-80`}
                    >
                      {lawyer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-base leading-tight md:mb-0">
                        {lawyer.name}
                      </h4>
                      {/* Mobile Only Metadata */}
                      <p className="md:hidden text-xs text-gray-500 font-medium mt-1">
                        {t(lawyer.roleKey)}
                      </p>
                    </div>
                  </div>

                  {/* Role / Specialty */}
                  <div className="col-span-12 md:col-span-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-md border ${lawyer.color.replace('text-', 'border-').replace('bg-', 'bg-opacity-20 ')}`}
                    >
                      {t(lawyer.specialtyKey)}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="col-span-6 md:col-span-3 flex items-center text-gray-600 text-sm">
                    <span className="mr-1">📍</span> {lawyer.location}
                  </div>

                  {/* Action */}
                  <div className="col-span-6 md:col-span-2 flex justify-end md:justify-center">
                    <button
                      onClick={() => navigate('/whatsapp')}
                      className="text-xs font-bold text-white bg-[#2E7D32] hover:bg-[#1B5E20] py-1.5 px-4 rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg italic">No se encontraron abogados...</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-[#2E7D32] font-bold hover:underline text-sm"
                >
                  Ver todos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer of Notebook */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-bl-xl rounded-br-3xl flex justify-between items-center text-xs text-gray-400 ml-4 lg:ml-6">
        <span>Avocado Legal © 2024</span>
        <span className="font-mono">Pág. 1 de 1</span>
      </div>
    </div>
  );

  return (
    <>
      <SEO titleKey="about.title" descriptionKey="about.subtitle" />
      <div
        className={`section-block ${isMobile ? 'min-h-screen h-auto' : 'lg:h-screen lg:overflow-hidden'} bg-gray-50 transition-colors duration-700 lg:flex`}
      >
        {/* Left Panel: Header / Introduction */}
        <div
          className={`w-full px-4 ${isMobile ? 'pt-20 pb-8' : 'lg:w-[35%] h-full flex flex-col justify-center p-12 lg:pl-16 relative z-10'}`}
        >
          <div className="relative">
            {/* Decorative Circle */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-60"></div>

            {/* Eyebrow */}
            <span className="block text-xs font-bold tracking-widest text-[#2E7D32] uppercase mb-4 relative z-10">
              Sobre Nosotros
            </span>

            {/* Main Headline (Slogan) */}
            <h1 className="text-3xl lg:text-4xl font-heading text-gray-900 mb-6 leading-tight relative z-10">
              {t('about.subtitle')}
            </h1>

            {/* Subheading (Description) */}
            <p className="text-lg text-gray-500 mb-8 leading-relaxed relative z-10 border-l-4 border-green-200 pl-4">
              {t('about.title')}
            </p>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed relative z-10">
              {t('about.teamTech.desc')}
            </p>

            <div className="flex gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500"
                  >
                    User
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="font-bold text-gray-800 mr-1">+50</span> Expertos
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: The Notebook */}
        <div
          className={`w-full px-4 ${isMobile ? 'pb-20' : 'lg:w-[65%] h-full py-8 pr-8 flex flex-col items-center justify-center'}`}
        >
          {renderNotebook()}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
