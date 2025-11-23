import { useState, useEffect } from 'react';

/**
 * Hook para detectar el tipo de dispositivo y características del navegador
 * @returns {Object} Objeto con información del dispositivo
 */
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Detección de dispositivo
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      const isDesktop = width > 1024;
      
      // Detección de sistema operativo
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      
      // Detección de navegador
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);
      const isFirefox = /firefox/.test(userAgent);

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        width,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        isIOS,
        isAndroid,
        isSafari,
        isChrome,
        isFirefox,
      });
    };

    // Initial check
    updateDeviceInfo();

    // Event listener for resize
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceDetection;

