import React from 'react';
import { PhoneHome, PhoneDocs, PhoneDashboard, PhoneLawyers, PhonePricing } from './PhoneScreens';
import useDeviceDetection from '../hooks/useDeviceDetection';

const PhoneWrapper = ({ activeSection, selectedPlan = 'junior' }) => {
  const { isDesktop } = useDeviceDetection();

  // Don't render anything on non-desktop devices
  if (!isDesktop) {
    return null;
  }
  
  // Determinar qué pantalla mostrar según la sección activa
  const renderScreen = () => {
    switch (activeSection) {
      case 'features-intro':
      case 'about':
        return <PhoneHome />;
      case 'steps':
        return <PhoneDashboard />;
      case 'offerings':
        return <PhoneLawyers />;
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
