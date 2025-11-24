import React from 'react';
import { PhoneHome, PhoneDocs, PhoneDashboard, PhoneLawyers, PhonePricing } from './PhoneScreens';
import useDeviceDetection from '../hooks/useDeviceDetection';

const PhoneWrapper = ({ activeSection, selectedPlan = 'junior', selectedDocCategory = 'Civil', selectedCountry = 'co' }) => {
  const { isDesktop } = useDeviceDetection();

  // Don't render anything on non-desktop devices
  if (!isDesktop) {
    return null;
  }
  
  // Determinar qué pantalla mostrar según la sección activa
  const renderScreen = () => {
    switch (activeSection) {
      case 'hero':
        return <PhoneHome />;
      case 'features': // Documentos
        return <PhoneDocs selectedCategory={selectedDocCategory} />;
      case 'automation': // Dashboard
        return <PhoneDashboard />;
      case 'specialized': // Abogados
        return <PhoneLawyers selectedCountry={selectedCountry} />;
      case 'subscriptions': // Pricing
        return <PhonePricing selectedPlan={selectedPlan} />;
      default:
        return <PhoneHome />;
    }
  };

  return (
    <div className="phone-frame-container">
      {/* Marco del Celular (CSS puro o imagen de fondo) */}
      <div className="phone-mockup">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          {/* Contenido Dinámico con Transición */}
          <div className="screen-content fade-in">
            {renderScreen()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneWrapper;
