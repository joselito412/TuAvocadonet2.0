import React, { useState, useEffect, useRef } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import PhoneWrapper from '../components/PhoneWrapper';
import { PhoneHome, PhoneDocs, PhoneDashboard, PhoneLawyers, PhonePricing } from '../components/PhoneScreens';
import DocExplorer from '../components/DocExplorer';
import useScrollSpy from '../hooks/useScrollSpy';
import { useWhatsAppMenu } from '../contexts/WhatsAppMenuContext';

function HomePage() {
  // IDs de las secciones que queremos trackear
  const sectionIds = ['hero', 'features-intro', 'features', 'automation', 'specialized', 'subscriptions'];
  const activeSection = useScrollSpy(sectionIds, 300);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [selectedDocCategory, setSelectedDocCategory] = useState('Civil');
  const [selectedCountry, setSelectedCountry] = useState('co');
  const [phoneAnimation, setPhoneAnimation] = useState(''); // 'enter', 'exit', 'visible', ''
  const [isNearTop, setIsNearTop] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0); // Estado separado para el porcentaje de progreso (más fluido)
  const [userInteracted, setUserInteracted] = useState(false); // Para controlar si el usuario interactuó
  const [showControls, setShowControls] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0); // 0 = background-hero.svg, 1 = background-hero2.svg
  const { openMenu } = useWhatsAppMenu();
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const previousSectionRef = useRef('hero');
  const heroImages = ['background-hero.svg', 'background-hero2.svg'];

  // Función para formatear tiempo (segundos a MM:SS)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // DEBUG: Sistema de logging para desarrollo
  const DEBUG = process.env.NODE_ENV === 'development';
  const debugLog = (category, message, data = null) => {
    if (DEBUG) {
      console.log(`[${category}] ${message}`, data || '');
    }
  };

  // OPCIÓN 1: Alternar imágenes cada 5 segundos (SIMPLE)
  // Descomenta esto y comenta la OPCIÓN 2 si prefieres esta opción más simple
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, []);
  */

  // OPCIÓN 2: Alternar imagen cuando el usuario pierde de vista la sección 1 y vuelve (AVANZADA)
  // Usando Intersection Observer y Visibility API
  const currentHeroImageRef = useRef(0);
  const wasVisibleRef = useRef(true);
  const lastImageChangeRef = useRef(Date.now());
  const heroSectionRef = useRef(null);

  useEffect(() => {
    // Sincronizar el ref con el estado
    currentHeroImageRef.current = currentHeroImage;
  }, [currentHeroImage]);

  useEffect(() => {
    // Obtener la sección hero
    heroSectionRef.current = document.getElementById('hero');
    const heroSection = heroSectionRef.current;
    
    if (!heroSection) {
      debugLog('HERO_IMAGE', '⚠️ Sección hero no encontrada');
      return;
    }

    // Inicializar el estado de visibilidad
    const rect = heroSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const isCurrentlyVisible = rect.top < viewportHeight && rect.bottom > 0;
    wasVisibleRef.current = isCurrentlyVisible;

    // Intersection Observer para detectar cuando la sección sale/entra del viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          
          // Si la sección vuelve a ser visible después de haber estado oculta
          if (isVisible && !wasVisibleRef.current) {
            // Cambiar imagen solo si pasó al menos 1 segundo desde el último cambio
            const timeSinceLastChange = Date.now() - lastImageChangeRef.current;
            if (timeSinceLastChange > 1000) {
              const newImage = currentHeroImageRef.current === 0 ? 1 : 0;
              setCurrentHeroImage(newImage);
              lastImageChangeRef.current = Date.now();
              debugLog('HERO_IMAGE', '🖼️ Imagen cambiada (vuelta a vista)', {
                previous: currentHeroImageRef.current,
                new: newImage,
                image: heroImages[newImage]
              });
            }
          }
          
          wasVisibleRef.current = isVisible;
        });
      },
      { 
        threshold: [0, 0.1, 0.3, 0.5], // Múltiples thresholds para mejor detección
        rootMargin: '0px'
      }
    );

    observer.observe(heroSection);
    debugLog('HERO_IMAGE', '✅ Observer configurado para alternar imágenes');

    // Detectar cambios de pestaña (cuando el usuario vuelve a la pestaña)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Verificar si la sección está visible cuando vuelve la pestaña
        const rect = heroSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isSectionVisible = rect.top < viewportHeight && rect.bottom > 0;
        
        if (isSectionVisible) {
          const timeSinceLastChange = Date.now() - lastImageChangeRef.current;
          if (timeSinceLastChange > 1000) {
            const newImage = currentHeroImageRef.current === 0 ? 1 : 0;
            setCurrentHeroImage(newImage);
            lastImageChangeRef.current = Date.now();
            wasVisibleRef.current = true;
            debugLog('HERO_IMAGE', '🖼️ Imagen cambiada (cambio de pestaña)', {
              previous: currentHeroImageRef.current,
              new: newImage,
              image: heroImages[newImage]
            });
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      debugLog('HERO_IMAGE', '🧹 Observer limpiado');
    };
  }, []); // Sin dependencias para evitar recrear el observer

  // Detectar cuando el scroll está cerca del top para ocultar el celular
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Si el scroll está muy cerca del top (menos de 100px), ocultar el celular
      setIsNearTop(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar posición inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicializar el video cuando se monta el componente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setVideoMuted(true);
      setVideoLoading(true);
      setVideoError(false);
    }
  }, []);

  // Lazy loading del video: solo cargar cuando la sección está visible
  useEffect(() => {
    const videoSection = document.getElementById('features-intro');
    if (!videoSection || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded) {
            // Cargar el video cuando la sección es visible
            if (videoRef.current) {
              videoRef.current.load();
              setVideoLoaded(true);
            }
          }
        });
      },
      { threshold: 0.1 } // Cargar cuando 10% de la sección es visible
    );

    observer.observe(videoSection);

    return () => {
      observer.disconnect();
    };
  }, [videoLoaded]);

  // Verificar y actualizar duración del video periódicamente hasta que se cargue
  useEffect(() => {
    if (!videoLoaded || videoDuration > 0) return;

    const checkDuration = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const duration = videoRef.current.duration;
        if (duration && !isNaN(duration) && isFinite(duration) && duration > 0) {
          setVideoDuration(duration);
          console.log('Video duration captured:', duration);
        }
      }
    };

    // Verificar inmediatamente
    checkDuration();

    // Verificar cada 100ms hasta que se cargue la duración
    const interval = setInterval(() => {
      if (videoDuration > 0) {
        clearInterval(interval);
      } else {
        checkDuration();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [videoLoaded, videoDuration]);

  // Detectar dirección del scroll y aplicar animaciones
  useEffect(() => {
    const previousSection = previousSectionRef.current;
    
    // Si salimos de hero (bajando), el celular aparece desde arriba
    if (previousSection === 'hero' && activeSection !== 'hero') {
      setPhoneAnimation('enter');
      // Después de la animación de entrada, mantener visible
      setTimeout(() => {
        setPhoneAnimation('visible');
      }, 1000);
    } 
    // Si volvemos a hero (subiendo), el celular desaparece hacia abajo
    else if (activeSection === 'hero' && previousSection !== 'hero') {
      setPhoneAnimation('exit');
      // Limpiar la animación después de que termine
      setTimeout(() => {
        setPhoneAnimation('');
      }, 800);
    }
    // Si estamos en una sección que no es hero y no hay animación activa, mantener visible
    else if (activeSection !== 'hero' && phoneAnimation === '') {
      setPhoneAnimation('visible');
    }
    
    previousSectionRef.current = activeSection;
  }, [activeSection]);

  return (
    <>
      {/* PRIMERA SECCIÓN HERO - FULL WIDTH, SIN CELULAR */}
      <header 
        className="section-block hero-section" 
        id="hero" 
        style={{ 
          background: 'rgba(46, 125, 50, 0.3)', /* Verde con transparencia */
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          paddingTop: '6rem',
          paddingBottom: '3rem'
        }}
      >
        {/* Contenido de la sección */}
        <div 
          className="hero-content-wrapper"
          style={{ 
            width: '100%', 
            maxWidth: '1400px', 
            padding: '0 2rem',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* H1 - Título principal (en la parte superior de la imagen) */}
          <h1 
            className="hero-title"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', // Responsive font size
              fontWeight: 'bold', 
              color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: '1.2',
              marginBottom: '2rem',
              marginTop: '2rem',
              textAlign: 'left',
              alignSelf: 'flex-start',
              width: '100%',
              position: 'relative',
              zIndex: 2
            }}
          >
            Orientación legal al alcance de tu mano
          </h1>

          {/* Bloque de imagen grande con contraste de color en los bordes */}
          <div 
            className="hero-image-container"
            style={{
              width: '100%',
              maxWidth: '1200px',
              marginBottom: '3rem',
              alignSelf: 'center',
              backgroundColor: 'transparent',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0'
            }}
          >
            {/* Gradiente de contraste lateral izquierdo (Azul) - Solo desktop */}
            <div 
              className="hero-gradient-left"
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '120px',
                background: 'linear-gradient(to right, rgba(64, 101, 185, 0.2), transparent)',
                borderRadius: '30px 0 0 30px',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            
            {/* Gradiente de contraste lateral derecho (Amarillo) - Solo desktop */}
            <div 
              className="hero-gradient-right"
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                bottom: '0',
                width: '120px',
                background: 'linear-gradient(to left, rgba(234, 212, 118, 0.25), transparent)',
                borderRadius: '0 30px 30px 0',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            
            {/* Imagen principal */}
            <img 
              src={`${import.meta.env.BASE_URL}img/${heroImages[currentHeroImage]}`}
              alt="Avocado Legal"
              className="hero-image"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '1200px',
                objectFit: 'contain',
                opacity: 1,
                borderRadius: '30px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                transition: 'opacity 0.5s ease-in-out',
                position: 'relative',
                zIndex: 1
              }}
              onError={(e) => {
                console.error('Error loading image:', e.target.src);
              }}
            />
          </div>
          
          {/* Estilos CSS para responsive y diseño mejorado */}
          <style>{`
            .hero-content-wrapper {
              padding: 0 2rem;
            }
            
            .hero-image-container {
              min-height: 400px;
            }
            
            /* Desktop: Mostrar gradientes y mantener imagen centrada */
            @media (min-width: 768px) {
              .hero-section {
                padding-top: 7rem !important;
                padding-bottom: 4rem !important;
              }
              
              .hero-content-wrapper {
                padding: 0 4rem;
              }
              
              .hero-title {
                margin-top: 0 !important;
                margin-bottom: -1.5rem !important; /* Superposición más sutil */
                font-size: clamp(3rem, 6vw, 4.5rem) !important;
              }
              
              .hero-image-container {
                min-height: 500px;
                padding: 0 4rem;
                margin-top: -1rem; /* Subir la imagen menos */
              }
              
              .hero-gradient-left,
              .hero-gradient-right {
                display: block;
              }
              
              .hero-image {
                max-height: 500px;
                object-fit: contain;
              }
            }
            
            /* Mobile: Ancho completo, sin gradientes, imagen más grande */
            @media (max-width: 767px) {
              .hero-section {
                padding-left: 0 !important;
                padding-right: 0 !important;
                padding-top: 5.5rem !important;
                padding-bottom: 2rem !important;
              }
              
              .hero-content-wrapper {
                padding: 0 1rem !important;
                max-width: 100% !important;
                width: 100% !important;
              }
              
              .hero-title {
                font-size: clamp(2rem, 8vw, 3rem) !important;
                margin-top: 0 !important;
                margin-bottom: 1.5rem !important;
                text-align: center !important;
                align-self: center !important;
              }
              
              .hero-image-container {
                padding: 0 !important;
                min-height: 300px;
                width: 100vw !important;
                max-width: 100vw !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                margin-bottom: 2rem !important;
              }
              
              .hero-gradient-left,
              .hero-gradient-right {
                display: none !important;
              }
              
              .hero-image {
                width: 100vw !important;
                max-width: 100vw !important;
                border-radius: 0 !important;
                object-fit: cover;
                min-height: 300px;
                margin: 0 !important;
              }
            }
            
            /* Tablet: Ajustes intermedios */
            @media (min-width: 768px) and (max-width: 1024px) {
              .hero-content-wrapper {
                padding: 0 2rem;
              }
              
              .hero-image-container {
                padding: 0 2rem;
                min-height: 450px;
              }
              
              .hero-gradient-left,
              .hero-gradient-right {
                width: 80px;
              }
              
              .hero-image {
                max-height: 450px;
              }
            }
          `}</style>
          
          {/* Estilos para el video optimizado */}
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            .video-container-optimized {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .video-container-optimized:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
            }
            
            /* Responsive video - Mobile */
            @media (max-width: 767px) {
              .video-container-optimized {
                max-width: 100% !important;
                width: 100% !important;
                border-radius: 12px;
                margin-top: 1rem;
                min-height: 250px;
              }
              
              .video-controls {
                padding: 0.75rem !important;
                font-size: 0.85rem !important;
              }
              
              .video-controls button {
                padding: 0.4rem !important;
                font-size: 1.2rem !important;
              }
            }
            
            /* Responsive video - Tablet */
            @media (min-width: 768px) and (max-width: 1024px) {
              .video-container-optimized {
                max-width: 100%;
                margin-top: 1.5rem;
              }
            }
          `}</style>
        </div>
      </header>

      {/* SPLIT LAYOUT COMIENZA DESDE LA SEGUNDA SECCIÓN */}
      <div className="split-layout">
        {/* COLUMNA IZQUIERDA: CONTENIDO SCROLLABLE */}
        <div className="scroll-content">
          
          {/* SECCIÓN ORIGINAL HERO - AHORA SEGUNDA SECCIÓN */}
          <section className="section-block" id="features-intro">
            <div className="text-content">
              <h2 style={{ marginBottom: '2rem' }}>El futuro legal, facil y accesible en tu celular.</h2>
              
              {/* Bloque de Video Optimizado */}
              <div 
                ref={videoContainerRef}
                className="video-container-optimized"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '800px',
                  marginTop: '2rem',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#000',
                  minHeight: '300px',
                  aspectRatio: '16/9' // Mantener proporción 16:9
                }}
              >
                {/* Indicador de carga */}
                {videoLoading && !videoError && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      color: 'white'
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '4px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Cargando video...</p>
                  </div>
                )}

                {/* Mensaje de error */}
                {videoError && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5,
                      textAlign: 'center',
                      color: 'white',
                      padding: '2rem'
                    }}
                  >
                    <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                    <p style={{ margin: 0 }}>Error al cargar el video</p>
                    <button
                      onClick={() => {
                        setVideoError(false);
                        setVideoLoading(true);
                        if (videoRef.current) {
                          videoRef.current.load();
                        }
                      }}
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#2E7D32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Reintentar
                    </button>
                  </div>
                )}

                <video
                  ref={videoRef}
                  autoPlay
                  muted={videoMuted}
                  loop={!userInteracted} // Solo loop si el usuario no ha interactuado
                  playsInline
                  preload="none"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    opacity: videoLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  onLoadStart={() => {
                    setVideoLoading(true);
                    setVideoError(false);
                  }}
                  onLoadedData={() => {
                    setVideoLoading(false);
                    setVideoLoaded(true);
                  }}
                  onLoadedMetadata={(e) => {
                    setVideoLoading(false);
                    const video = e.target || videoRef.current;
                    if (video && video.duration && !isNaN(video.duration) && isFinite(video.duration) && video.duration > 0) {
                      setVideoDuration(video.duration);
                      console.log('Video duration loaded from metadata:', video.duration);
                    }
                  }}
                  onDurationChange={(e) => {
                    const video = e.target || videoRef.current;
                    if (video && video.duration && !isNaN(video.duration) && isFinite(video.duration) && video.duration > 0) {
                      setVideoDuration(video.duration);
                      console.log('Video duration changed:', video.duration);
                    }
                  }}
                  onTimeUpdate={(e) => {
                    // Actualización directa sin requestAnimationFrame para máxima fluidez
                    const video = e.target || videoRef.current;
                    if (video) {
                      const currentTime = video.currentTime || 0;
                      const duration = video.duration || 0;
                      
                      // Actualizar tiempo actual
                      if (!isNaN(currentTime) && isFinite(currentTime)) {
                        setVideoCurrentTime(currentTime);
                        
                        // Calcular y actualizar porcentaje de progreso directamente (sin transición CSS)
                        if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
                          const percent = (currentTime / duration) * 100;
                          const clampedPercent = Math.max(0, Math.min(100, percent));
                          setProgressPercent(clampedPercent);
                          
                          // Debug cada segundo para no saturar la consola
                          if (Math.floor(currentTime) !== Math.floor(videoCurrentTime)) {
                            debugLog('VIDEO_PROGRESS', 'Progreso actualizado', {
                              currentTime: currentTime.toFixed(2),
                              duration: duration.toFixed(2),
                              percent: clampedPercent.toFixed(2) + '%',
                              formatted: `${formatTime(currentTime)} / ${formatTime(duration)}`
                            });
                          }
                        }
                      }
                      
                      // Actualizar duración si está disponible y es válida
                      if (duration > 0 && !isNaN(duration) && isFinite(duration) && duration !== videoDuration) {
                        setVideoDuration(duration);
                        debugLog('VIDEO', 'Duración actualizada desde timeUpdate', {
                          duration: duration,
                          formatted: formatTime(duration)
                        });
                      }
                    }
                  }}
                  onCanPlay={() => {
                    setVideoLoading(false);
                    if (videoRef.current && !userInteracted) {
                      videoRef.current.play().catch(() => {
                        // Ignorar errores de autoplay
                      });
                    }
                  }}
                  onPlay={() => {
                    setVideoPlaying(true);
                    setVideoLoading(false);
                    debugLog('VIDEO', '▶️ Video reproducido', {
                      muted: videoMuted,
                      userInteracted: userInteracted,
                      currentTime: videoRef.current?.currentTime
                    });
                  }}
                  onPause={() => {
                    setVideoPlaying(false);
                    debugLog('VIDEO', '⏸️ Video pausado', {
                      currentTime: videoRef.current?.currentTime
                    });
                  }}
                  onEnded={() => {
                    // Cuando el video termina, volver al estado inicial
                    if (userInteracted && videoRef.current) {
                      debugLog('VIDEO', '⏹️ Video terminado - Volviendo al estado inicial', {
                        userInteracted: userInteracted
                      });
                      videoRef.current.currentTime = 0;
                      setVideoMuted(true);
                      videoRef.current.muted = true;
                      setVideoPlaying(false);
                      setUserInteracted(false);
                      setProgressPercent(0);
                      videoRef.current.loop = true; // Volver a activar loop para autoplay
                    }
                  }}
                  onError={(e) => {
                    console.error('Error loading video:', e);
                    setVideoError(true);
                    setVideoLoading(false);
                  }}
                  onWaiting={() => setVideoLoading(true)}
                  onPlaying={() => setVideoLoading(false)}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => {
                    // Ocultar controles después de 3 segundos si no hay interacción
                    setTimeout(() => {
                      if (!videoPlaying || videoMuted) {
                        setShowControls(false);
                      }
                    }, 3000);
                  }}
                >
                  {/* Video local optimizado */}
                  <source src={`${import.meta.env.BASE_URL}videos/hero-video.mp4`} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>

                {/* Controles de video personalizados */}
                {videoLoaded && !videoError && (showControls || userInteracted) && (
                  <div
                    className="video-controls"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                      padding: '1rem',
                      zIndex: 15,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        if (!videoPlaying || videoMuted) {
                          setShowControls(false);
                        }
                      }, 3000);
                    }}
                  >
                    {/* Barra de progreso */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        position: 'relative',
                        marginBottom: '0.5rem'
                      }}
                      onClick={(e) => {
                        if (videoRef.current && videoRef.current.duration) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const percent = Math.max(0, Math.min(1, clickX / rect.width));
                          const newTime = percent * videoRef.current.duration;
                          videoRef.current.currentTime = newTime;
                          setVideoCurrentTime(newTime);
                          setProgressPercent(percent * 100); // Actualizar porcentaje inmediatamente
                        }
                      }}
                    >
                      <div
                        style={{
                          width: `${progressPercent}%`,
                          height: '100%',
                          background: '#2E7D32',
                          borderRadius: '3px',
                          // SIN transición CSS para máxima fluidez - actualización directa
                          position: 'relative',
                          willChange: 'width',
                          transform: 'translateZ(0)', // Aceleración por hardware
                          backfaceVisibility: 'hidden', // Optimización adicional
                          WebkitBackfaceVisibility: 'hidden'
                        }}
                      >
                        {/* Indicador de posición */}
                        <div
                          style={{
                            position: 'absolute',
                            right: '-6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '12px',
                            height: '12px',
                            background: '#2E7D32',
                            borderRadius: '50%',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Controles inferiores */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      {/* Botones izquierda */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Botón Play/Pause */}
                        <button
                          onClick={() => {
                            if (videoRef.current) {
                              if (videoPlaying) {
                                videoRef.current.pause();
                                debugLog('VIDEO_CONTROLS', '⏸️ Pausado desde controles');
                              } else {
                                if (!userInteracted) {
                                  setUserInteracted(true);
                                  videoRef.current.loop = false;
                                  setVideoMuted(false);
                                  videoRef.current.muted = false;
                                  debugLog('VIDEO_CONTROLS', '▶️ Primera interacción del usuario', {
                                    loop: false,
                                    muted: false
                                  });
                                }
                                videoRef.current.play();
                                debugLog('VIDEO_CONTROLS', '▶️ Reproducido desde controles');
                              }
                            }
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            fontSize: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className={`fas ${videoPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                        </button>

                        {/* Botón Mute/Unmute */}
                        <button
                          onClick={() => {
                            if (videoRef.current) {
                              const newMuted = !videoMuted;
                              setVideoMuted(newMuted);
                              videoRef.current.muted = newMuted;
                              debugLog('VIDEO_CONTROLS', newMuted ? '🔇 Silenciado' : '🔊 Sonido activado', {
                                muted: newMuted
                              });
                            }
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className={`fas ${videoMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                        </button>

                        {/* Tiempo */}
                        <span style={{ color: 'white', fontSize: '0.9rem', minWidth: '120px', fontFamily: 'monospace' }}>
                          {formatTime(videoCurrentTime)} / {videoDuration > 0 && !isNaN(videoDuration) ? formatTime(videoDuration) : '--:--'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Botón Overlay "Ver Video" - Solo visible cuando el video está en mudo y cargado */}
                {videoMuted && videoLoaded && !videoLoading && !videoError && !userInteracted && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      zIndex: 10
                    }}
                    onClick={async () => {
                      if (videoRef.current && videoContainerRef.current) {
                        // Marcar que el usuario interactuó
                        setUserInteracted(true);
                        // Desactivar loop para que solo se reproduzca una vez
                        videoRef.current.loop = false;
                        // Reiniciar el video
                        videoRef.current.currentTime = 0;
                        // Quitar el muted y reproducir con sonido
                        setVideoMuted(false);
                        videoRef.current.muted = false;
                        
                        // Pequeño delay para asegurar que el video se reinicie
                        await new Promise(resolve => setTimeout(resolve, 100));
                        await videoRef.current.play();
                        
                        // Hacer scroll suave al video después de un pequeño delay
                        setTimeout(() => {
                          videoContainerRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                          });
                        }, 200);
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(46, 125, 50, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.3s ease',
                        pointerEvents: 'auto'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(46, 125, 50, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(46, 125, 50, 0.4)';
                      }}
                    >
                      <i className="fas fa-play" style={{ fontSize: '1.2rem' }}></i>
                      Ver Video
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                <PhoneHome />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="features">
            <div className="text-content">
              {/* <span className="eyebrow">DOCUMENTACIÓN INTELIGENTE</span> */}
              <h2>Crea documentos para ti y tu empresa</h2>
              <p>TuAvocado se encarga del trabajo repetitivo. Genera contratos y documentos legales en minutos.</p>
              
              <DocExplorer onCategoryChange={setSelectedDocCategory} />

            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                        <PhoneDocs selectedCategory={selectedDocCategory} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="automation">
            <div className="text-content">
              {/* <span className="eyebrow">GESTIÓN EFICIENTE</span> */}
              <h2>Gestiona tus servicios en el Tablero privado</h2>
              <p>Un espacio organizado tipo Notion para llevar el control total de tus procesos.</p>
              <div className="dashboard-cards-container">
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <span>Seguimiento de casos en tiempo real</span>
                </div>
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-bell"></i>
                  </div>
                  <span>Notificaciones de estado</span>
                </div>
                <div className="dashboard-card">
                  <div className="card-icon-wrapper">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <span>Archivo digital seguro</span>
                </div>
              </div>
            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                <PhoneDashboard />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="specialized">
            <div className="text-content">
              {/* <span className="eyebrow">MARKETPLACE LEGAL</span> */}
              <h2>¿Necesitas un abogado especializado?</h2>
              <p>Te conectamos con <strong>profesionales verificados</strong> en múltiples jurisdicciones.</p>
              
              {/* H2 con botón - Subtítulo y botón lado a lado */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '2rem',
                flexWrap: 'wrap',
                marginTop: '2rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '600', 
                  color: '#2E7D32',
                  lineHeight: '1.3',
                  margin: 0
                }}>
                  Abogados contigo en cada paso
                </h2>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openMenu(2); // Abrir menú y resaltar opción 2 (Hablar con mi avocado)
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(46, 125, 50, 0.4)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(46, 125, 50, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 20px rgba(46, 125, 50, 0.4)';
                  }}
                >
                  Hablar con mi avocado
                </button>
              </div>
              
              {/* Improved Country Cards */}
              <div className="country-cards-container" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                gap: '15px', 
                marginTop: '30px',
                maxWidth: '700px'
              }}>
                {[
                  { code: 'co', name: 'Colombia', desc: 'Expertos en derecho colombiano', lawyers: 120 },
                  { code: 'us', name: 'Estados Unidos', desc: 'Especialistas en ley americana', lawyers: 80 },
                  { code: 'mx', name: 'México', desc: 'Expertos en derecho mexicano', lawyers: 45 },
                  { code: 'es', name: 'España', desc: 'Especialistas en ley española', lawyers: 35 },
                  { code: 'ar', name: 'Argentina', desc: 'Expertos en derecho argentino', lawyers: 30 }
                ].map((country) => {
                  const isSelected = selectedCountry === country.code;
                  return (
                    <div 
                      key={country.code}
                      className="country-card" 
                      onClick={() => setSelectedCountry(country.code)}
                      style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '20px',
                        boxShadow: isSelected ? '0 8px 20px rgba(46, 125, 50, 0.3)' : '0 4px 10px rgba(0,0,0,0.1)',
                        border: isSelected ? '3px solid #2E7D32' : '2px solid #E8F5E9',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        opacity: isSelected ? 1 : 0.7
                      }}
                    >
                      <div className="country-flag" style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: '#F5F5F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: isSelected ? '3px solid #2E7D32' : '2px solid #E8F5E9',
                        filter: isSelected ? 'none' : 'grayscale(100%)'
                      }}>
                        <img src={`https://flagcdn.com/w160/${country.code}.png`} alt={country.name} style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }} />
                  </div>
                      <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 'bold', color: isSelected ? '#2E7D32' : '#333' }}>{country.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#666', margin: '0 0 8px' }}>{country.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#888' }}>
                        <i className="fas fa-users" style={{ color: isSelected ? '#2E7D32' : '#999' }}></i>
                        <span>{country.lawyers}+ abogados</span>
                  </div>
                </div>
                  );
                })}
              </div>
            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                        <PhoneLawyers selectedCountry={selectedCountry} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block" id="subscriptions">
            <div className="text-content">
              {/* <span className="eyebrow">PLANES FLEXIBLES</span> */}
              <h2>Suscripciones</h2>
              <p style={{ marginBottom: '40px' }}>Elige el nivel de acompañamiento que necesitas.</p>
              
              <div className="pricing-cards-container" style={{ marginBottom: '30px' }}>
                {/* Plan Free */}
                <div 
                  className={`pricing-card ${selectedPlan === 'free' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('free')}
                  style={{ 
                    cursor: 'pointer',
                    background: selectedPlan === 'free' ? '#6c757d' : 'white',
                    borderColor: selectedPlan === 'free' ? '#6c757d' : undefined
                  }}
                >
                  {selectedPlan === 'free' && <div className="popular-badge" style={{ background: '#6c757d' }}>Seleccionado</div>}
                  <div className="plan-header">
                    <h3 style={{ color: selectedPlan === 'free' ? 'white' : undefined }}>Free</h3>
                    <div className="price" style={{ color: selectedPlan === 'free' ? 'white' : undefined }}>$0</div>
                  </div>
                  <ul className="plan-features" style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.9)' : undefined }}>
                    <li style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-robot"></i> Consultas Limitadas</li>
                    <li className="disabled" style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.5)' : undefined }}><i className="fas fa-file-contract"></i> Sin Documentos</li>
                    <li className="disabled" style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.5)' : undefined }}><i className="fas fa-user-tie"></i> Sin Abogado</li>
                  </ul>
                </div>

                {/* Plan Junior */}
                <div 
                  className={`pricing-card ${selectedPlan === 'junior' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('junior')}
                  style={{ cursor: 'pointer' }}
                >
                  {selectedPlan === 'junior' && <div className="popular-badge">Recomendado</div>}
                  <div className="plan-header">
                    <h3>Junior</h3>
                    <div className="price">$15</div>
                  </div>
                  <ul className="plan-features">
                    <li><i className="fas fa-robot"></i> <strong>IA Ilimitada</strong></li>
                    <li><i className="fas fa-file-contract"></i> Generación Docs</li>
                    <li className="disabled"><i className="fas fa-user-tie"></i> Sin Abogado</li>
                  </ul>
                </div>

                {/* Plan Senior */}
                <div 
                  className={`pricing-card premium ${selectedPlan === 'senior' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('senior')}
                  style={{ 
                    cursor: 'pointer',
                    background: selectedPlan === 'senior' ? '#4065B9' : 'white',
                    borderColor: selectedPlan === 'senior' ? '#4065B9' : undefined
                  }}
                >
                  {selectedPlan === 'senior' && <div className="popular-badge" style={{ background: '#4065B9' }}>Seleccionado</div>}
                  <div className="plan-header">
                    <h3 style={{ color: selectedPlan === 'senior' ? 'white' : undefined }}>Senior</h3>
                    <div className="price" style={{ color: selectedPlan === 'senior' ? 'white' : undefined }}>$100</div>
                  </div>
                  <ul className="plan-features" style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}>
                    <li style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-robot"></i> IA Ilimitada</li>
                    <li style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-file-contract"></i> Docs Premium</li>
                    <li style={{ color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined }}><i className="fas fa-user-tie"></i> <strong>Abogado Humano</strong></li>
                  </ul>
                </div>
              </div>

              {/* Botón Sign Up */}
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button 
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                    color: 'white',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(46, 125, 50, 0.3)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(46, 125, 50, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 20px rgba(46, 125, 50, 0.3)';
                  }}
                >
                  <i className="fas fa-user-plus" style={{ marginRight: '10px' }}></i>
                  Sign Up
                </button>
              </div>

            </div>
            <div className="mobile-phone-display">
              <div className="phone-mockup-mobile">
                <div className="phone-frame-container">
                  <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <div className="screen-content fade-in">
                        <PhonePricing selectedPlan={selectedPlan} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* COLUMNA DERECHA: CELULAR STICKY - CON ANIMACIONES SEGÚN DIRECCIÓN */}
        {(activeSection !== 'hero' || phoneAnimation === 'exit') && !isNearTop && (
          <div className={`sticky-column ${
            phoneAnimation === 'enter' ? 'phone-slide-down' : 
            phoneAnimation === 'exit' ? 'phone-slide-out' : 
            activeSection !== 'hero' ? 'phone-visible' : ''
          }`}>
            <div className="sticky-wrapper">
              <PhoneWrapper 
                activeSection={activeSection !== 'hero' ? activeSection : previousSectionRef.current} 
                selectedPlan={selectedPlan}
                selectedDocCategory={selectedDocCategory}
                selectedCountry={selectedCountry}
              />
            </div>
          </div>
        )}
      </div>


    </>
  );
}

export default HomePage;
