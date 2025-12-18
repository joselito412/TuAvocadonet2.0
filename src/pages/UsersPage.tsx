import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen, User, Zap, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '../components/ui';
import { useWhatsAppMenu } from '../contexts/WhatsAppMenuCtx';

type BookType = 'none' | 'clients' | 'lawyers';
type ProfileType = 'creator' | 'startup' | 'enterprise';

export default function UsersPage() {
  const { t } = useTranslation();
  const { toggleMenu } = useWhatsAppMenu();
  const [selectedBook, setSelectedBook] = useState<BookType>('none');
  const [activeProfile, setActiveProfile] = useState<ProfileType>('creator');

  // Dynamic Theme Logic based on Active Profile
  const getTheme = (profile: ProfileType) => {
    switch (profile) {
      case 'creator': // B2C - Green (Brand)
        return {
          bg: 'bg-[#f0fdf4]', // green-50
          accent: 'bg-green-600', // green-600
          accentHover: 'hover:bg-green-700',
          text: 'text-green-700',
          border: 'border-green-200',
          ring: 'ring-green-500',
          lightBg: 'bg-green-100',
          iconColor: 'text-green-600',
          shadow: 'shadow-green-200',
          buttonText: 'text-white',
          tabColor: 'bg-green-500', // Visual Tab Color
        };
      case 'startup': // B2B - Blue
        return {
          bg: 'bg-blue-50',
          accent: 'bg-blue-600',
          accentHover: 'hover:bg-blue-700',
          text: 'text-blue-700',
          border: 'border-blue-200',
          ring: 'ring-blue-500',
          lightBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          shadow: 'shadow-blue-200',
          buttonText: 'text-white',
          tabColor: 'bg-blue-500',
        };
      case 'enterprise': // B2B2C - Orange
        return {
          bg: 'bg-orange-50',
          accent: 'bg-orange-600',
          accentHover: 'hover:bg-orange-700',
          text: 'text-orange-700',
          border: 'border-orange-200',
          ring: 'ring-orange-500',
          lightBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          shadow: 'shadow-orange-200',
          buttonText: 'text-white',
          tabColor: 'bg-orange-500',
        };
      default:
        return {
          bg: 'bg-gray-50',
          accent: 'bg-gray-900',
          accentHover: 'hover:bg-black',
          text: 'text-gray-900',
          border: 'border-gray-200',
          ring: 'ring-gray-500',
          lightBg: 'bg-gray-200',
          iconColor: 'text-gray-700',
          shadow: 'shadow-gray-200',
          buttonText: 'text-white',
          tabColor: 'bg-gray-500',
        };
    }
  };

  const currentTheme = getTheme(activeProfile);

  // Preview Logic for Closed Book Interaction
  const [previewProfile, setPreviewProfile] = useState<ProfileType | null>(null);
  const previewTheme = previewProfile ? getTheme(previewProfile) : getTheme(activeProfile);

  const handleBookClick = (book: BookType, profile?: ProfileType) => {
    if (profile) {
      setActiveProfile(profile);
    }
    setSelectedBook(book);
  };

  const resetView = () => {
    setSelectedBook('none');
  };

  const renderProfileContent = () => {
    const solutionItems = t(`users.clients.profiles.${activeProfile}.solution`, {
      returnObjects: true,
    });
    // Handle array check safely as translation return type can be string or object
    const solutions = Array.isArray(solutionItems) ? solutionItems : [];

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h3
            className={`text-sm font-bold font-heading uppercase tracking-widest mb-2 ${currentTheme.text}`}
          >
            {t('users.labels.pain', 'El Dolor')}
          </h3>
          <p
            className={`text-xl font-body font-medium leading-relaxed italic border-l-4 pl-4 ${currentTheme.border} text-gray-700`}
          >
            "{t(`users.clients.profiles.${activeProfile}.pain`)}"
          </p>
        </div>

        <div>
          <h3
            className={`text-sm font-bold font-heading uppercase tracking-widest mb-4 ${currentTheme.text}`}
          >
            {t('users.labels.solution', 'La Solución AVOCADO')}
          </h3>
          <ul className="grid gap-4">
            {solutions.map((item: any, idx: number) => (
              <li
                key={idx}
                className={`bg-white p-4 rounded-xl shadow-sm border flex items-start gap-3 ${currentTheme.border}`}
              >
                <div
                  className={`${currentTheme.lightBg} ${currentTheme.iconColor} rounded-full p-1 mt-0.5 shrink-0`}
                >
                  <Zap className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="font-bold font-heading text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-gray-600 text-sm font-body">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3
              className={`text-xs font-bold font-heading uppercase tracking-widest mb-1 opacity-80`}
            >
              {t('users.labels.tool', 'Tu Herramienta Ideal')}
            </h3>
            <p className="text-lg font-bold font-heading">
              {t(`users.clients.profiles.${activeProfile}.tool`)}
            </p>
          </div>
          {/* Decorative overlay based on theme color */}
          <div
            className={`absolute right-0 top-0 h-full w-1/3 opacity-20 skew-x-12 transform translate-x-4 ${currentTheme.accent}`}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO
        titleKey="users.seo.title"
        descriptionKey="users.seo.description"
        defaultTitle="Usuarios | Avocado"
        defaultDescription="Soluciones legales para personas y herramientas para abogados."
      />

      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#f0f0f0] font-body relative overflow-hidden">
        {/* Desk Texture Background (Subtle) */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col items-center justify-center min-h-[80vh]">
          {/* Shared Layout Animations */}
          <AnimatePresence mode="popLayout">
            {selectedBook === 'none' ? (
              /* INITIAL VIEW: Two Books on the Desk */
              <motion.div
                key="desk-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-20 md:gap-32 lg:gap-40 w-full max-w-6xl items-center px-4 md:px-12"
              >
                {/* Book 1: Clients - Standard Layout (Tabs Right) */}
                <div
                  className="relative group perspective-1000 z-20"
                  onMouseLeave={() => setPreviewProfile(null)}
                >
                  {/* Sticky Tabs - RIGHT SIDE */}
                  <div className="absolute top-12 -right-4 flex flex-col gap-3 z-0 items-start pl-2">
                    {/* Creator Tab */}
                    <motion.button
                      layoutId="tab-creator"
                      className={`w-40 md:w-48 text-left text-white text-xs md:text-sm font-bold py-4 px-6 rounded-r-2xl shadow-md hover:scale-110 transition-all origin-left font-heading flex justify-start items-center gap-2 ${activeProfile === 'creator' || previewProfile === 'creator' ? 'bg-green-600 ring-2 ring-white/50 z-20 translate-x-2' : 'bg-green-500/90 hover:bg-green-500 z-10'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick('clients', 'creator');
                      }}
                      onMouseEnter={() => setPreviewProfile('creator')}
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                    >
                      <span>Creativos</span>
                    </motion.button>
                    {/* Startup Tab */}
                    <motion.button
                      layoutId="tab-startup"
                      className={`w-40 md:w-48 text-left text-white text-xs md:text-sm font-bold py-4 px-6 rounded-r-2xl shadow-md hover:scale-110 transition-all origin-left font-heading flex justify-start items-center gap-2 ${activeProfile === 'startup' || previewProfile === 'startup' ? 'bg-blue-600 ring-2 ring-white/50 z-20 translate-x-2' : 'bg-blue-500/90 hover:bg-blue-500 z-10'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick('clients', 'startup');
                      }}
                      onMouseEnter={() => setPreviewProfile('startup')}
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                    >
                      <span>Startups</span>
                    </motion.button>
                    {/* Enterprise Tab */}
                    <motion.button
                      layoutId="tab-enterprise"
                      className={`w-40 md:w-48 text-left text-white text-xs md:text-sm font-bold py-4 px-6 rounded-r-2xl shadow-md hover:scale-110 transition-all origin-left font-heading flex justify-start items-center gap-2 ${activeProfile === 'enterprise' || previewProfile === 'enterprise' ? 'bg-orange-600 ring-2 ring-white/50 z-20 translate-x-2' : 'bg-orange-500/90 hover:bg-orange-500 z-10'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick('clients', 'enterprise');
                      }}
                      onMouseEnter={() => setPreviewProfile('enterprise')}
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                    >
                      <span>Empresas</span>
                    </motion.button>
                  </div>

                  {/* Main Book Cover - Spine on LEFT (Standard) */}
                  <motion.div
                    layoutId="book-clients-container"
                    onClick={() => handleBookClick('clients', previewProfile || 'creator')}
                    className="cursor-pointer relative z-10"
                    whileHover={{ scale: 1.02, rotate: -1 }}
                  >
                    <motion.div
                      className={`rounded-r-3xl rounded-l-md shadow-2xl h-[450px] md:h-[500px] relative overflow-hidden flex flex-col justify-between p-8 border-l-[12px] transition-colors duration-500 ease-in-out ${previewTheme.bg === 'bg-[#f0fdf4]' ? 'bg-green-600 border-green-800/80' : previewTheme.bg === 'bg-blue-50' ? 'bg-blue-600 border-blue-800/80' : 'bg-orange-600 border-orange-800/80'}`}
                      layoutId="book-clients-bg"
                      style={{
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      {/* Cover Content */}
                      <div className="mt-10 text-center">
                        <motion.div
                          layoutId="book-clients-icon"
                          className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-5 flex items-center justify-center backdrop-blur-sm shadow-inner"
                        >
                          <User className="text-white w-8 h-8" />
                        </motion.div>
                        <motion.h2
                          layoutId="book-clients-title"
                          className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 tracking-wide block leading-tight"
                        >
                          {t('users.books.clients.title', 'Clientes')}
                        </motion.h2>
                        <p className="text-white/70 font-medium font-body tracking-[0.2em] uppercase text-[10px]">
                          {t('users.books.clients.subtitle', 'Soluciones Legales')}
                        </p>
                      </div>

                      <div className="mb-8">
                        <span className="block w-16 mx-auto border-t border-white/30 mb-4"></span>

                        {/* Static Quote - CONSTANT - FIXED */}
                        <div className="mb-4 px-4 overflow-hidden relative">
                          <p className="text-white text-center font-heading italic text-sm md:text-base leading-relaxed">
                            "Tengo un problema legal y necesito ayuda rápida."
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                {/* Book 2: Lawyers - Tabs on RIGHT */}
                <div className="relative group perspective-1000 z-20">
                  {/* Sticky Tabs - RIGHT SIDE */}
                  <div className="absolute top-12 -right-4 flex flex-col gap-3 z-0 items-start pl-2">
                    {/* No Exp Tab */}
                    <motion.button
                      layoutId="tab-beginner"
                      className="w-40 md:w-48 text-left text-white text-xs md:text-sm font-bold py-4 px-6 rounded-r-2xl shadow-md hover:scale-110 transition-all origin-left font-heading bg-slate-600 hover:bg-slate-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick('lawyers');
                      }}
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                    >
                      <span>Sin Experiencia</span>
                    </motion.button>
                    {/* Expert Tab */}
                    <motion.button
                      layoutId="tab-expert"
                      className="w-40 md:w-48 text-left text-white text-xs md:text-sm font-bold py-4 px-6 rounded-r-2xl shadow-md hover:scale-110 transition-all origin-left font-heading bg-blue-600 hover:bg-blue-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick('lawyers');
                      }}
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                    >
                      <span>Con Experiencia</span>
                    </motion.button>
                  </div>

                  <motion.div
                    layoutId="book-lawyers-container"
                    onClick={() => handleBookClick('lawyers')}
                    className="cursor-pointer relative z-10"
                    whileHover={{ scale: 1.02, rotate: 1 }}
                  >
                    <motion.div
                      className="bg-slate-800 shadow-2xl h-[450px] md:h-[500px] relative overflow-hidden flex flex-col justify-between p-8 border-l-[12px] border-slate-900 shadow-slate-900/40 rounded-r-3xl rounded-l-md"
                      layoutId="book-lawyers-bg"
                      style={{
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      {/* Cover Content */}
                      <div className="mt-10 text-center">
                        <motion.div
                          layoutId="book-lawyers-icon"
                          className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-5 flex items-center justify-center backdrop-blur-sm border border-white/10"
                        >
                          <BookOpen className="text-blue-200 w-8 h-8" />
                        </motion.div>
                        <motion.h2
                          layoutId="book-lawyers-title"
                          className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 tracking-wide block leading-tight"
                        >
                          {t('users.books.lawyers.title', 'Abogados')}
                        </motion.h2>
                        <p className="text-slate-400 font-medium font-body tracking-[0.2em] uppercase text-[10px]">
                          {t('users.books.lawyers.subtitle', 'Herramientas IA')}
                        </p>
                      </div>

                      <div className="mb-8">
                        <span className="block w-16 mx-auto border-t border-white/10 mb-4"></span>
                        <p className="text-slate-300 text-center font-heading italic text-sm md:text-base px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          "{t('users.books.lawyers.quote')}"
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>{' '}
              </motion.div>
            ) : selectedBook === 'clients' ? (
              /* OPEN BOOK: Clients (Expanded with Dynamic Theme & Sticky Notes) */
              <motion.div
                layoutId="book-clients-container"
                key="clients-open"
                className="w-full max-w-6xl relative z-30"
              >
                <motion.div
                  className={`shadow-2xl overflow-hidden relative min-h-[80vh] flex flex-col md:flex-row border transition-colors duration-500 ${currentTheme.bg} ${currentTheme.border}`}
                  layoutId="book-clients-bg"
                  style={{ borderRadius: 24 }}
                  animate={{
                    backgroundColor:
                      currentTheme.bg === 'bg-[#f0fdf4]'
                        ? '#f0fdf4'
                        : currentTheme.bg === 'bg-blue-50'
                          ? '#eff6ff'
                          : '#fff7ed',
                  }}
                >
                  <Button
                    onClick={resetView}
                    variant="ghost"
                    className={`absolute top-4 left-4 z-50 hover:bg-white/50 ${currentTheme.text}`}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back', 'Volver')}
                  </Button>

                  {/* Left Page: Intro & Menu - Sticky Notes Look */}
                  <div
                    className={`w-full md:w-4/12 p-6 md:p-8 flex flex-col border-r transition-colors duration-500 ${currentTheme.border}`}
                  >
                    <div className="mt-8 mb-6">
                      <motion.div
                        layoutId="book-clients-icon"
                        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${currentTheme.lightBg} ${currentTheme.text}`}
                      >
                        <User className="w-7 h-7" />
                      </motion.div>
                      <motion.h2
                        layoutId="book-clients-title"
                        className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2 leading-tight"
                      >
                        {t('users.books.clients.title', 'Para Empresas y Personas')}
                      </motion.h2>
                    </div>

                    {/* Navigation - Stack of Sticky Notes (Moved to Top) */}
                    <div className="flex flex-col gap-4 mb-8 relative z-10 w-full">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider mb-2 ${currentTheme.text}`}
                      >
                        Selecciona tu perfil:
                      </p>

                      {[
                        {
                          id: 'creator',
                          label: 'Creador / Freelance',
                          color: 'bg-green-500',
                          hover: 'hover:bg-green-600',
                          layoutId: 'tab-creator',
                        },
                        {
                          id: 'startup',
                          label: 'Startup / PyME',
                          color: 'bg-blue-500',
                          hover: 'hover:bg-blue-600',
                          layoutId: 'tab-startup',
                        },
                        {
                          id: 'enterprise',
                          label: 'Empresa',
                          color: 'bg-orange-500',
                          hover: 'hover:bg-orange-600',
                          layoutId: 'tab-enterprise',
                        },
                      ].map((profile) => {
                        const isActive = activeProfile === profile.id;
                        return (
                          <motion.button
                            key={profile.id}
                            layoutId={profile.layoutId}
                            onClick={() => setActiveProfile(profile.id as ProfileType)}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`
                                relative p-4 w-full text-left rounded-lg shadow-md transition-all duration-300 transform font-heading
                                ${isActive ? `${profile.color} text-white scale-105 -rotate-1 z-10 shadow-lg` : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 rotate-0 hover:rotate-1'}
                              `}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{profile.label}</span>
                              {isActive && <CheckCircle className="w-5 h-5 text-white" />}
                            </div>
                            {/* Sticky note tape effect (visual only) */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/20 rotate-1 backdrop-blur-sm rounded-sm opacity-50"></div>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="mt-auto">
                      <p className={`text-sm italic font-body ${currentTheme.iconColor}`}>
                        "{t('users.clients.intro')}"
                      </p>
                    </div>
                  </div>

                  {/* Right Page: Dynamic Content */}
                  <div className="w-full md:w-8/12 p-8 md:p-12 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] overflow-y-auto">
                    <div className="max-w-xl mx-auto pt-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeProfile}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 leading-tight">
                            {t(`users.clients.profiles.${activeProfile}.headline`)}
                          </h2>
                          {renderProfileContent()}

                          <div className="mt-12 pt-8 border-t border-gray-200">
                            <Button
                              onClick={() => toggleMenu('users-page')}
                              className={`w-full text-lg py-6 rounded-xl shadow-lg font-heading transform transition hover:-translate-y-1 ${currentTheme.accent} ${currentTheme.accentHover} ${currentTheme.buttonText} ${currentTheme.shadow}`}
                            >
                              {t('users.clients.cta', 'Iniciar Consulta Gratis')}
                            </Button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* OPEN BOOK: Lawyers */
              <motion.div
                layoutId="book-lawyers-container"
                key="lawyers-open"
                className="w-full max-w-6xl relative z-30"
              >
                <motion.div
                  className="bg-white shadow-2xl overflow-hidden relative min-h-[80vh] flex flex-col md:flex-row border border-gray-200"
                  layoutId="book-lawyers-bg"
                  style={{ borderRadius: 24 }}
                >
                  <Button
                    onClick={resetView}
                    variant="ghost"
                    className="absolute top-4 right-4 z-50 text-gray-500 hover:text-blue-600"
                  >
                    {t('common.back', 'Volver')} <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Button>

                  {/* Left Page (Intro/Value) */}
                  <div className="w-full md:w-5/12 bg-slate-900 p-12 flex flex-col justify-center text-white md:order-2">
                    <div className="max-w-md mx-auto">
                      <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-6 tracking-widest uppercase font-heading">
                        {t('users.lawyers.tag', 'Avocado for Pros')}
                      </div>

                      <motion.h2
                        layoutId="book-lawyers-title"
                        className="text-4xl font-heading font-bold mb-6 leading-tight block"
                      >
                        {t('users.lawyers.headline')}
                      </motion.h2>

                      <p className="text-slate-400 mb-8 leading-relaxed font-body">
                        {t('users.lawyers.intro')}
                      </p>
                      <Button
                        onClick={() => toggleMenu('users-page-lawyer')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white border-none py-6 text-lg font-heading"
                      >
                        {t('users.lawyers.cta', 'Unirme como Abogado')}
                      </Button>
                    </div>
                  </div>

                  {/* Right Page (Content/Tools) */}
                  <div className="w-full md:w-7/12 p-12 bg-slate-50 md:order-1">
                    <div className="max-w-lg mx-auto grid gap-8 pt-8">
                      <motion.div
                        layoutId="book-lawyers-icon"
                        className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-0 opacity-0 md:opacity-100"
                      >
                        <BookOpen className="w-8 h-8 text-slate-500" />
                      </motion.div>

                      <h3 className="text-2xl font-bold font-heading text-slate-900">
                        {t('users.lawyers.toolsTitle')}
                      </h3>

                      {/* Tool 1 */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold font-heading text-slate-900 mb-2">
                          {t('users.lawyers.tool1.title')}
                        </h4>
                        <p className="text-sm text-slate-500 font-body">
                          {t('users.lawyers.tool1.desc')}
                        </p>
                      </div>

                      {/* Tool 2 */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold font-heading text-slate-900 mb-2">
                          {t('users.lawyers.tool2.title')}
                        </h4>
                        <p className="text-sm text-slate-500 font-body">
                          {t('users.lawyers.tool2.desc')}
                        </p>
                      </div>

                      {/* Learn AI Link */}
                      <div className="mt-4 p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold font-heading text-blue-900 mb-2">
                          {t('users.lawyers.learn.title')}
                        </h4>
                        <p className="text-sm text-blue-700 mb-4 font-body">
                          {t('users.lawyers.learn.desc')}
                        </p>
                        <a
                          href="/aprende-ia"
                          className="text-sm font-bold font-heading text-blue-600 hover:text-blue-800 underline"
                        >
                          {t('users.lawyers.learn.link')}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
