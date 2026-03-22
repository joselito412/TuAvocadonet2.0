import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import PhoneWrapper from '../components/PhoneWrapper';
import {
  PhoneHome,
  PhoneDocs,
  PhoneDashboard,
  PhoneLawyers,
  PhonePricing,
} from '../components/PhoneScreens';
import useScrollSpy from '../hooks/useScrollSpy';

const heroImages = ['background-hero.webp', 'background-hero2.webp'];

function HomePage() {
  const { t } = useTranslation();
  // IDs de las secciones que queremos trackear
  const sectionIds = [
    'hero',
    'features-intro',
    'about',
    'steps',
    'offerings',
    'subscriptions',
  ];
  const activeSection = useScrollSpy(sectionIds, 300);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [phoneAnimation, setPhoneAnimation] = useState(''); // 'enter', 'exit', 'visible', ''

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
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const previousSectionRef = useRef('hero');

  // Estado para el botón de ir arriba
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Efecto para mostrar/ocultar botón de ir arriba
  useEffect(() => {
    const handleScrollTopInfo = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScrollTopInfo);
    return () => window.removeEventListener('scroll', handleScrollTopInfo);
  }, []);

  // Función para formatear tiempo (segundos a MM:SS)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // DEBUG: Sistema de logging para desarrollo
  const DEBUG = import.meta.env.MODE === 'development';
  const debugLog = React.useCallback(
    (category, message, data = null) => {
      if (DEBUG) {
        console.log(`[${category}] ${message}`, data || '');
      }
    },
    [DEBUG]
  );

  // OPCIÓN 2: Alternar imagen cuando el usuario pierde de vista la sección 1 y vuelve (AVANZADA)
  // Usando Intersection Observer y Visibility API
  const currentHeroImageRef = useRef(0);
  const wasVisibleRef = useRef(true);
  const lastImageChangeRef = useRef(null); // Init with null
  const heroSectionRef = useRef(null);

  useEffect(() => {
    // Initialize ref safely
    if (lastImageChangeRef.current === null) {
      lastImageChangeRef.current = Date.now();
    }
  }, []);

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
            const timeSinceLastChange = Date.now() - (lastImageChangeRef.current || 0);
            if (timeSinceLastChange > 1000) {
              const newImage = currentHeroImageRef.current === 0 ? 1 : 0;
              setCurrentHeroImage(newImage);
              lastImageChangeRef.current = Date.now();
              debugLog('HERO_IMAGE', '🖼️ Imagen cambiada (vuelta a vista)', {
                previous: currentHeroImageRef.current,
                new: newImage,
                image: heroImages[newImage],
              });
            }
          }

          wasVisibleRef.current = isVisible;
        });
      },
      {
        threshold: [0, 0.1, 0.3, 0.5], // Múltiples thresholds para mejor detección
        rootMargin: '0px',
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
          const timeSinceLastChange = Date.now() - (lastImageChangeRef.current || 0);
          if (timeSinceLastChange > 1000) {
            const newImage = currentHeroImageRef.current === 0 ? 1 : 0;
            setCurrentHeroImage(newImage);
            lastImageChangeRef.current = Date.now();
            wasVisibleRef.current = true;
            debugLog('HERO_IMAGE', '🖼️ Imagen cambiada (cambio de pestaña)', {
              previous: currentHeroImageRef.current,
              new: newImage,
              image: heroImages[newImage],
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
  }, [debugLog]); // Included debugLog

  // Inicializar el video cuando se monta el componente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      // setVideoMuted(true); // Redundant: state initialized to true
      // setVideoLoading(true); // Redundant: state initialized to true
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

    // Si salimos de hero (bajando), el celular aparece
    if (previousSection === 'hero' && activeSection !== 'hero') {
      setTimeout(() => setPhoneAnimation('enter'), 0);
    }
    // Si volvemos a hero (subiendo), el celular desaparece
    else if (activeSection === 'hero' && activeSection !== previousSection) {
      setTimeout(() => {
        setPhoneAnimation('exit');
        setTimeout(() => setPhoneAnimation(''), 500);
      }, 0);
    }

    previousSectionRef.current = activeSection;
  }, [activeSection]);


  return (
    <>
      <SEO titleKey="home.hero.title" descriptionKey="home.seo.description" />
      {/* PRIMERA SECCIÓN HERO - FULL WIDTH, SIN CELULAR */}
      <header
        className="section-block hero-section"
        id="hero"
        style={{
          background: 'rgba(46, 125, 50, 0.3)' /* Verde con transparencia */,
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
          paddingBottom: '3rem',
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
            alignItems: 'center',
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
              zIndex: 2,
            }}
          >
            {t('home.hero.title')}
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
              padding: '0',
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
                pointerEvents: 'none',
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
                pointerEvents: 'none',
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
                zIndex: 1,
              }}
              onError={(e) => {
                console.error('Error loading image:', e.currentTarget.src);
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
              <h2 style={{ marginBottom: '2rem' }}>{t('home.features.introTitle')}</h2>

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
                  aspectRatio: '16/9', // Mantener proporción 16:9
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
                      color: 'white',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '4px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                      {t('home.features.loadingVideo')}
                    </p>
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
                      padding: '2rem',
                    }}
                  >
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ fontSize: '2rem', marginBottom: '1rem' }}
                    ></i>
                    <p style={{ margin: 0 }}>{t('home.features.errorVideo')}</p>
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
                        cursor: 'pointer',
                      }}
                    >
                      {t('home.features.retry')}
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
                  poster={`${import.meta.env.BASE_URL}img/hombre3d.png`} // Optimization: Show image while loading
                  title={t('home.features.videoTitle')} // A11y
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    opacity: videoLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
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
                    if (
                      video &&
                      video.duration &&
                      !isNaN(video.duration) &&
                      isFinite(video.duration) &&
                      video.duration > 0
                    ) {
                      setVideoDuration(video.duration);
                    }
                  }}
                  onDurationChange={(e) => {
                    const video = e.target || videoRef.current;
                    if (
                      video &&
                      video.duration &&
                      !isNaN(video.duration) &&
                      isFinite(video.duration) &&
                      video.duration > 0
                    ) {
                      setVideoDuration(video.duration);
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
                        }
                      }

                      // Actualizar duración si está disponible y es válida
                      if (
                        duration > 0 &&
                        !isNaN(duration) &&
                        isFinite(duration) &&
                        duration !== videoDuration
                      ) {
                        setVideoDuration(duration);
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
                  }}
                  onPause={() => {
                    setVideoPlaying(false);
                  }}
                  onEnded={() => {
                    // Cuando el video termina, volver al estado inicial
                    if (userInteracted && videoRef.current) {
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
                  <source
                    src={`${import.meta.env.BASE_URL}videos/VideoAvocadoExplaines.mp4`}
                    type="video/mp4"
                  />
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
                      gap: '0.5rem',
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
                        marginBottom: '0.5rem',
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
                          WebkitBackfaceVisibility: 'hidden',
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
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
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
                        gap: '1rem',
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
                              } else {
                                if (!userInteracted) {
                                  setUserInteracted(true);
                                  videoRef.current.loop = false;
                                  setVideoMuted(false);
                                  videoRef.current.muted = false;
                                }
                                videoRef.current.play();
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
                            justifyContent: 'center',
                          }}
                          aria-label={videoPlaying ? 'Pause' : 'Play'}
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
                            justifyContent: 'center',
                          }}
                          aria-label={videoMuted ? 'Unmute' : 'Mute'}
                        >
                          <i
                            className={`fas ${videoMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}
                          ></i>
                        </button>

                        {/* Tiempo */}
                        <span
                          style={{
                            color: 'white',
                            fontSize: '0.9rem',
                            minWidth: '120px',
                            fontFamily: 'monospace',
                          }}
                        >
                          {formatTime(videoCurrentTime)} /{' '}
                          {videoDuration > 0 && !isNaN(videoDuration)
                            ? formatTime(videoDuration)
                            : '--:--'}
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
                      zIndex: 10,
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
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        await videoRef.current.play();

                        // Hacer scroll suave al video después de un pequeño delay
                        setTimeout(() => {
                          videoContainerRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
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
                        pointerEvents: 'auto',
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

          <section className="section-block" id="about">
            <div className="text-content">
              <h2>{t('whatWeDo.title')}</h2>
              <p>{t('whatWeDo.description')}</p>
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

          <section className="section-block" id="steps">
            <div className="text-content">
              <h2>{t('whatWeDo.userJourney.title')}</h2>
              <div className="dashboard-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="dashboard-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}>
                  <div className="card-icon-wrapper" style={{ flexShrink: 0, marginTop: '5px' }}>
                    <i className="fas fa-comment-dots"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>1. {t('whatWeDo.userJourney.steps.01.title')}</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{t('whatWeDo.userJourney.steps.01.desc')}</p>
                  </div>
                </div>
                <div className="dashboard-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}>
                  <div className="card-icon-wrapper" style={{ flexShrink: 0, marginTop: '5px' }}>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>2. {t('whatWeDo.userJourney.steps.02.title')}</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{t('whatWeDo.userJourney.steps.02.desc')}</p>
                  </div>
                </div>
                <div className="dashboard-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}>
                  <div className="card-icon-wrapper" style={{ flexShrink: 0, marginTop: '5px' }}>
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>3. {t('whatWeDo.userJourney.steps.03.title')}</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{t('whatWeDo.userJourney.steps.03.desc')}</p>
                  </div>
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

          <section className="section-block" id="offerings">
            <div className="text-content">
              <h2>{t('whatWeDo.howItWorks')}</h2>
              <div className="dashboard-cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="dashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('whatWeDo.steps.01.title')}</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>{t('whatWeDo.steps.01.desc')}</p>
                </div>
                <div className="dashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('whatWeDo.steps.02.title')}</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>{t('whatWeDo.steps.02.desc')}</p>
                </div>
                <div className="dashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('whatWeDo.steps.03.title')}</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>{t('whatWeDo.steps.03.desc')}</p>
                </div>
                <div className="dashboard-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('whatWeDo.steps.04.title')}</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>{t('whatWeDo.steps.04.desc')}</p>
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
                        <PhoneLawyers />
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
              <h2>{t('home.pricing.title')}</h2>
              <p style={{ marginBottom: '40px' }}>{t('home.pricing.subtitle')}</p>

              <div className="pricing-cards-container" style={{ marginBottom: '30px' }}>
                {/* Plan Free */}
                <div
                  className={`pricing-card ${selectedPlan === 'free' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('free')}
                  style={{
                    cursor: 'pointer',
                    background: selectedPlan === 'free' ? '#6c757d' : 'white',
                    borderColor: selectedPlan === 'free' ? '#6c757d' : undefined,
                  }}
                >
                  {selectedPlan === 'free' && (
                    <div className="popular-badge" style={{ background: '#6c757d' }}>
                      Seleccionado
                    </div>
                  )}
                  <div className="plan-header">
                    <h3 style={{ color: selectedPlan === 'free' ? 'white' : undefined }}>
                      {t('whatWeDo.plans.free.title')}
                    </h3>
                    <div
                      className="price"
                      style={{ color: selectedPlan === 'free' ? 'white' : undefined }}
                    >
                      $0
                    </div>
                  </div>
                  <ul
                    className="plan-features"
                    style={{ color: selectedPlan === 'free' ? 'rgba(255,255,255,0.9)' : undefined }}
                  >
                    <li
                      style={{
                        color: selectedPlan === 'free' ? 'rgba(255,255,255,0.9)' : undefined,
                      }}
                    >
                      <i className="fas fa-robot"></i> {t('whatWeDo.plans.free.features.0')}
                    </li>
                    <li
                      className="disabled"
                      style={{
                        color: selectedPlan === 'free' ? 'rgba(255,255,255,0.5)' : undefined,
                      }}
                    >
                      <i className="fas fa-file-contract"></i> {t('whatWeDo.plans.free.features.1')}
                    </li>
                    <li
                      className="disabled"
                      style={{
                        color: selectedPlan === 'free' ? 'rgba(255,255,255,0.5)' : undefined,
                      }}
                    >
                      <i className="fas fa-user-tie"></i> {t('whatWeDo.plans.free.features.2')}
                    </li>
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
                    <h3>{t('whatWeDo.plans.junior.title')}</h3>
                    <div className="price">$15</div>
                  </div>
                  <ul className="plan-features">
                    <li>
                      <i className="fas fa-robot"></i>{' '}
                      <strong>{t('whatWeDo.plans.junior.features.0')}</strong>
                    </li>
                    <li>
                      <i className="fas fa-file-contract"></i>{' '}
                      {t('whatWeDo.plans.junior.features.1')}
                    </li>
                    <li className="disabled">
                      <i className="fas fa-user-tie"></i> {t('whatWeDo.plans.junior.features.2')}
                    </li>
                  </ul>
                </div>
                {/* Plan Senior */}
                <div
                  className={`pricing-card premium ${selectedPlan === 'senior' ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan('senior')}
                  style={{
                    cursor: 'pointer',
                    background: selectedPlan === 'senior' ? '#4065B9' : 'white',
                    borderColor: selectedPlan === 'senior' ? '#4065B9' : undefined,
                  }}
                >
                  {selectedPlan === 'senior' && (
                    <div className="popular-badge" style={{ background: '#4065B9' }}>
                      Seleccionado
                    </div>
                  )}
                  <div className="plan-header">
                    <h3 style={{ color: selectedPlan === 'senior' ? 'white' : undefined }}>
                      {t('whatWeDo.plans.senior.title')}
                    </h3>
                    <div
                      className="price"
                      style={{ color: selectedPlan === 'senior' ? 'white' : undefined }}
                    >
                      $100
                    </div>
                  </div>
                  <ul
                    className="plan-features"
                    style={{
                      color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined,
                    }}
                  >
                    <li
                      style={{
                        color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined,
                      }}
                    >
                      <i className="fas fa-robot"></i> {t('whatWeDo.plans.senior.features.0')}
                    </li>
                    <li
                      style={{
                        color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined,
                      }}
                    >
                      <i className="fas fa-file-contract"></i>{' '}
                      {t('whatWeDo.plans.senior.features.1')}
                    </li>
                    <li
                      style={{
                        color: selectedPlan === 'senior' ? 'rgba(255,255,255,0.9)' : undefined,
                      }}
                    >
                      <i className="fas fa-user-tie"></i>{' '}
                      <strong>{t('whatWeDo.plans.senior.features.2')}</strong>
                    </li>
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
                    letterSpacing: '1px',
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
                  {t('home.pricing.cta')}
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

        {/* COLUMNA DERECHA: CELULAR STICKY - SIEMPRE RENDERIZADO PARA EVITAR FLICKER, VISIBILIDAD CONTROLADA POR CSS */}
        {/* COLUMNA DERECHA: CELULAR STICKY - RENDERIZADO CONDICIONAL (REVERTIDO) */}
        {activeSection !== 'hero' && (
          <div
            className={`sticky-column ${
              phoneAnimation === 'enter'
                ? 'phone-slide-down'
                : phoneAnimation === 'exit'
                  ? 'phone-slide-out'
                  : 'phone-visible'
            }`}
          >
            <div className="sticky-wrapper">
              <PhoneWrapper
                activeSection={activeSection}
                selectedPlan={selectedPlan}
              />
            </div>
          </div>
        )}

        {/* SCROLL TO TOP BUTTON - Correctly Placed */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-28 sm:right-32 z-40 bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-black hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50 flex flex-col items-center justify-center gap-1 group ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          aria-label={t('common.scrollToTop')}
          title={t('common.scrollToTop')}
        >
          <i
            className="fas fa-arrow-up text-lg group-hover:-translate-y-1 transition-transform duration-300"
            aria-hidden="true"
          ></i>
          <span className="text-[10px] font-bold uppercase tracking-wider sr-only sm:not-sr-only sm:visible">
            {t('common.scrollToTop')}
          </span>
        </button>
      </div>
    </>
  );
}

export default HomePage;
