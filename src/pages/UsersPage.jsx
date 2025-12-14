import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const UsersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('creator');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Detection Hook
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = {
    creator: {
      key: 'creator',
      headline: t('users.content.creator.headline'),
      pain: t('users.content.creator.pain'),
      solution: t('users.content.creator.solution', { returnObjects: true }), // Expecting array of objects
      tool: t('users.content.creator.tool'),
      cta: t('users.content.creator.cta'),
      microcopy: t('users.content.creator.microcopy'),
      className: 'creator',
      btnClass: 'btn-primary',
      label: t('users.tabs.creator'),
    },
    startup: {
      key: 'startup',
      headline: t('users.content.startup.headline'),
      pain: t('users.content.startup.pain'),
      solution: t('users.content.startup.solution', { returnObjects: true }),
      tool: t('users.content.startup.tool'),
      cta: t('users.content.startup.cta'),
      microcopy: t('users.content.startup.microcopy'),
      className: 'startup',
      btnClass: 'btn-primary',
      label: t('users.tabs.startup'),
    },
    enterprise: {
      key: 'enterprise',
      headline: t('users.content.enterprise.headline'),
      pain: t('users.content.enterprise.pain'),
      solution: t('users.content.enterprise.solution', { returnObjects: true }),
      tool: t('users.content.enterprise.tool'),
      cta: t('users.content.enterprise.cta'),
      microcopy: t('users.content.enterprise.microcopy'),
      className: 'enterprise',
      btnClass: 'btn-primary',
      label: t('users.tabs.enterprise'),
    },
  };

  const renderNotebookContent = (data) => (
    <div
      className={`relative bg-white rounded-b-3xl rounded-tr-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full md:h-full flex flex-col md:overflow-hidden border-4 lg:border-8 transition-colors duration-500`}
      style={{ borderColor: data.color }}
    >
      {/* Notebook Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 md:overflow-hidden min-h-0">
        {/* Left Page: The Pain (58%) */}
        <div className="lg:col-span-7 bg-red-50 p-4 lg:p-6 flex flex-col justify-center relative overflow-hidden text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-100 md:h-full">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-red-100 rounded-br-full opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center lg:items-start h-full justify-center py-8 lg:py-0">
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-red-500 uppercase bg-white rounded-full shadow-sm">
              {t('users.painTitle')}
            </span>

            <div className="mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm animate-pulse-slow mx-auto lg:mx-0">
                {data.emoji || '😓'}
              </div>
            </div>

            <h3 className="text-lg lg:text-xl font-heading text-gray-900 mb-2 leading-tight">
              {data.headline}
            </h3>

            <p className="text-xs lg:text-sm text-gray-500 leading-relaxed max-w-sm">{data.pain}</p>
          </div>
        </div>

        {/* Right Page: The Solution (42%) */}
        <div className="lg:col-span-5 bg-white p-4 lg:p-6 flex flex-col md:h-full md:overflow-hidden relative">
          {/* Header / Quote */}
          <div className="mb-4 text-center lg:text-left flex-shrink-0">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-primary uppercase bg-green-50 rounded-full">
              {t('users.solutionTitle')}
            </span>
          </div>

          {/* Solution List - Main Scrollable Area */}
          <div className="flex-1 md:overflow-y-auto pr-2 custom-scrollbar min-h-0">
            <ul className="space-y-4 pb-4 md:pb-0">
              {Array.isArray(data.solution) &&
                data.solution.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 items-start group p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                      <i className="fas fa-check text-xs"></i>
                    </div>
                    <div>
                      <strong className="block text-base lg:text-lg text-gray-900 mb-0.5 group-hover:text-primary transition-colors">
                        {item.title}
                      </strong>
                      <span className="text-sm text-gray-500 leading-relaxed block">
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer / CTA Area - Full Width Bottom Section */}
      <div className="bg-gray-50 border-t border-gray-100 p-6 lg:px-12 lg:py-4 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 z-10 transition-colors duration-300">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">
              {t('users.toolLabel')}
            </p>
            <p className="font-bold text-gray-900 text-lg">{data.tool}</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-200"></div>
          <p className="italic text-xs text-gray-500 hidden md:block max-w-[200px]">
            {data.microcopy}
          </p>
        </div>

        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <button
            onClick={() => navigate('/whatsapp')}
            className={`${data.btnClass} py-3 px-8 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-bold`}
          >
            {data.cta}
          </button>
          <p className="mt-2 text-[10px] text-gray-400 italic md:hidden">{data.microcopy}</p>
        </div>
      </div>
    </div>
  );

  // Add colors/emojis to content object
  content.creator = { ...content.creator, color: '#22c55e', emoji: '😓' };
  content.startup = { ...content.startup, color: '#3b82f6', emoji: '🤯' };
  content.enterprise = { ...content.enterprise, color: '#a855f7', emoji: '📉' };

  return (
    <>
      <SEO titleKey="users.title" descriptionKey="users.subtitle" />
      <div
        className={`section-block min-h-screen h-auto lg:h-screen lg:overflow-hidden bg-gray-50 transition-colors duration-700 lg:flex`}
      >
        {/* Header Section (Left Panel on Desktop) */}
        <div
          className={`w-full px-4 ${isMobile ? 'pt-20 pb-10' : 'lg:w-[30%] h-full flex flex-col justify-center p-12'}`}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl mb-4 lg:text-5xl lg:mb-8 font-heading leading-tight whitespace-pre-line">
              <Trans
                i18nKey="users.title"
                components={{ 0: <span className="text-secondary" /> }}
              />
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 whitespace-pre-line">
              {t('users.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content Area (Right Panel on Desktop) */}
        <div
          className={`w-full px-4 ${isMobile ? 'pb-20' : 'lg:w-[70%] h-full py-8 pr-8 flex flex-col'}`}
        >
          {/* DESKTOP: Notebook Layout */}
          {!isMobile ? (
            <div className="flex flex-col h-full">
              {/* Tabs as Bookmarks */}
              <div className="flex gap-2 pl-4 md:pl-8 relative z-10 translate-y-1">
                {Object.values(content).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                    px-6 py-3 rounded-t-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 transform origin-bottom
                    ${
                      activeTab === tab.key
                        ? 'bg-white text-gray-900 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] scale-110 z-20 pb-4'
                        : 'bg-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:-translate-y-1 scale-100 z-10 opacity-70'
                    }
                  `}
                    style={{
                      borderTop: activeTab === tab.key ? `4px solid ${tab.color}` : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Notebook Card */}
              <div className="flex-1 relative z-10">
                {renderNotebookContent(content[activeTab])}
              </div>
            </div>
          ) : (
            /* MOBILE: Stacked Cards */
            <div className="space-y-12">
              {Object.values(content).map((tab) => (
                <div
                  key={tab.key}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border-t-8"
                  style={{ borderColor: tab.color }}
                >
                  <div className="bg-gray-50 p-4 border-b border-gray-100">
                    <h3 className="text-center font-bold text-gray-900 uppercase tracking-widest">
                      {tab.label}
                    </h3>
                  </div>
                  {renderNotebookContent(tab)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersPage;
