import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWhatsAppMenu } from '../contexts/WhatsAppMenuContext';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [buttonScale, setButtonScale] = useState(2); // Tamaño "original" grande (2x)
  const { isMenuOpen, highlightedOption, toggleMenu, closeMenu } = useWhatsAppMenu();
  const menuRef = useRef(null);
  const option2Ref = useRef(null);
  const navigate = useNavigate();

  // DEBUG: Sistema de logging para desarrollo
  const DEBUG = process.env.NODE_ENV === 'development';
  const debugLog = (category, message, data = null) => {
    if (DEBUG) {
      console.log(`[WHATSAPP_BUTTON:${category}] ${message}`, data || '');
    }
  };

  useEffect(() => {
    // Auto-show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide after 5 seconds
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Ajustar tamaño del botón basado en scroll
  // Tamaño original máximo: 2x (primera vista)
  // Tamaño mínimo: 1x (50% más pequeño que el original)
  useEffect(() => {
    // Tamaños base en píxeles
    const BASE_SIZE = 64; // Tamaño base del botón en CSS (w-16 h-16 = 64px)
    const MAX_SCALE = 2; // Tamaño máximo (original) = 128px
    const MIN_SCALE = 1; // Tamaño mínimo = 64px (50% del original)
    
    let rafId = null;
    let lastScale = MAX_SCALE;
    let ticking = false;

    const calculateScale = () => {
      const heroSection = document.getElementById('hero');
      const featuresIntroSection = document.getElementById('features-intro');
      
      if (!heroSection || !featuresIntroSection) {
        return MAX_SCALE;
      }
      
      const scrollY = window.scrollY;
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight;
      const heroBottom = heroTop + heroHeight;
      const featuresIntroTop = featuresIntroSection.offsetTop;
      
      // Si estamos en la parte superior de la sección hero (primeros 20% de la sección)
      // Mantener tamaño máximo (2x)
      if (scrollY <= heroTop + (heroHeight * 0.2)) {
        return MAX_SCALE;
      }
      
      // Si estamos en la sección hero (después del 20%)
      if (scrollY < heroBottom) {
        // Calcular progreso desde el 20% hasta el final de la sección
        const startPoint = heroTop + (heroHeight * 0.2);
        const progress = Math.max(0, Math.min(1, (scrollY - startPoint) / (heroBottom - startPoint)));
        // Reducir de 2x a 1x progresivamente
        return MAX_SCALE - (progress * (MAX_SCALE - MIN_SCALE));
      }
      
      // Si estamos en la sección 2 o más abajo
      if (scrollY >= featuresIntroTop) {
        return MIN_SCALE;
      }
      
      // Transición entre sección 1 y 2
      const transitionStart = heroBottom;
      const transitionEnd = featuresIntroTop;
      if (transitionEnd > transitionStart) {
        const transitionProgress = Math.max(0, Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart)));
        return MAX_SCALE - (transitionProgress * (MAX_SCALE - MIN_SCALE));
      }
      
      return MIN_SCALE;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const newScale = calculateScale();
          
        // Solo actualizar si hay un cambio significativo (más de 0.02 para evitar micro-ajustes)
        if (Math.abs(newScale - lastScale) > 0.02) {
          setButtonScale(newScale);
          debugLog('SIZE', 'Tamaño del botón actualizado', {
            previous: lastScale.toFixed(2),
            new: newScale.toFixed(2),
            scrollY: scrollY.toFixed(0),
            heroProgress: heroScrollProgress?.toFixed(2)
          });
          lastScale = newScale;
        }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Verificar posición inicial
    const initialTimer = setTimeout(() => {
      const initialScale = calculateScale();
      setButtonScale(initialScale);
      lastScale = initialScale;
    }, 300);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(initialTimer);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle menu - cuando se abre desde WhatsApp, resalta opción 1
    toggleMenu('whatsapp');
  };

  const handleOptionClick = (option) => {
    closeMenu();
    
    // Handle navigation based on option
    switch(option) {
      case 1:
        // Iniciar consulta con IA gratis
        navigate('/');
        // Scroll to chat or open chat interface
        break;
      case 2:
        // Contactar con mi avocado
      navigate('/whatsapp');
        break;
      case 3:
        // Emergencia legal
        navigate('/whatsapp?emergency=true');
        break;
      default:
        break;
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.whatsapp-float')) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  // Calcular posición del spotlight cuando se resalta opción 2
  const [spotlightPosition, setSpotlightPosition] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isMenuOpen && highlightedOption === 2) {
      setIsClosing(false);
      // Delay para asegurar que el DOM se haya actualizado y el menú esté visible
      const timer = setTimeout(() => {
        if (option2Ref.current) {
          const rect = option2Ref.current.getBoundingClientRect();
          setSpotlightPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          });
        }
      }, 150);
      
      // Cerrar automáticamente después de 5 segundos con animación progresiva
      const autoCloseTimer = setTimeout(() => {
        setIsClosing(true);
        // Esperar a que termine la animación antes de cerrar
        setTimeout(() => {
          closeMenu();
          setIsClosing(false);
        }, 500); // Duración de la animación de fade out
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(autoCloseTimer);
      };
    } else {
      setSpotlightPosition(null);
      setIsClosing(false);
    }
  }, [isMenuOpen, highlightedOption, closeMenu]);

  return (
    <>
      {/* Overlay con spotlight cuando se abre desde "Hablar con mi avocado" */}
      {isMenuOpen && highlightedOption === 2 && spotlightPosition && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 999,
            pointerEvents: 'auto',
            animation: isClosing ? 'fadeOut 0.5s ease-out forwards' : 'fadeIn 0.3s ease-out',
            opacity: isClosing ? 0 : 1,
            transition: 'opacity 0.5s ease-out'
          }}
          onClick={(e) => {
            // Solo cerrar si se hace click fuera del menú y del botón de WhatsApp
            if (!e.target.closest('.wa-menu') && !e.target.closest('.whatsapp-float') && !e.target.closest('.overlay-info-text')) {
              setIsClosing(true);
              setTimeout(() => {
                closeMenu();
                setIsClosing(false);
              }, 500);
            }
          }}
        >
          {/* Texto informativo en el overlay */}
          <div 
            className="overlay-info-text"
            style={{
              position: 'fixed',
              top: spotlightPosition ? `${Math.max(80, spotlightPosition.top - 250)}px` : '15%',
              left: '10%',
              textAlign: 'left',
              color: 'white',
              zIndex: 1000,
              maxWidth: '500px',
              padding: '1.5rem',
              pointerEvents: 'none'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              lineHeight: '1.3'
            }}>
              Solo suscriptores activos
            </h3>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '1.5rem',
              opacity: 0.95,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              lineHeight: '1.5'
            }}>
              Si no eres suscriptor, hablarás con nuestra IA legal
            </p>
            <p style={{
              fontSize: '0.95rem',
              opacity: 0.9,
              fontStyle: 'italic',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
              lineHeight: '1.4',
              color: '#E8F5E9',
              position: 'relative',
              paddingRight: '40px'
            }}>
              No te preocupes, nuestra IA AVOCADO es como una profesional del más del equipo
            </p>
          </div>

          {/* Flecha vertical que apunta directamente arriba de la opción */}
          {spotlightPosition && (
            <div
              style={{
                position: 'fixed',
                top: `${spotlightPosition.top - 60}px`,
                left: `${spotlightPosition.left + spotlightPosition.width / 2}px`,
                transform: 'translateX(-50%)',
                zIndex: 1000,
                pointerEvents: 'none',
                animation: isClosing ? 'fadeOut 0.5s ease-out forwards' : 'bounceArrow 1.5s ease-in-out infinite',
                opacity: isClosing ? 0 : 1
              }}
            >
              <div style={{
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '25px solid rgba(76, 175, 80, 0.9)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '3px',
                height: '40px',
                background: 'linear-gradient(to bottom, rgba(76, 175, 80, 0.9), rgba(76, 175, 80, 0.3))',
                borderRadius: '2px'
              }}></div>
            </div>
          )}

          {/* Área iluminada (spotlight) alrededor de la opción 2 */}
          <div
            style={{
              position: 'fixed',
              top: `${spotlightPosition.top - 15}px`,
              left: `${spotlightPosition.left - 15}px`,
              width: `${spotlightPosition.width + 30}px`,
              height: `${spotlightPosition.height + 30}px`,
              borderRadius: '16px',
              boxShadow: `
                0 0 0 99999px rgba(0, 0, 0, 0.8),
                0 0 40px rgba(46, 125, 50, 0.6),
                0 0 80px rgba(76, 175, 80, 0.4),
                inset 0 0 30px rgba(76, 175, 80, 0.3)
              `,
              border: '3px solid rgba(76, 175, 80, 0.7)',
              pointerEvents: 'none',
              animation: 'pulse 2s ease-in-out infinite',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      )}

      <div 
        className="whatsapp-float" 
        ref={menuRef} 
        style={{ 
          zIndex: 1000,
          position: 'fixed',
          // Posición fija: 24px desde bottom y right
          // El botón cambiará de tamaño pero la posición del contenedor se mantiene estable
          bottom: '24px',
          right: '24px',
          transition: 'none' // Sin transición en el contenedor, solo en el botón
        }}
      >
        {/* Menu Expandible */}
        {isMenuOpen && (
          <div className="wa-menu" style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          zIndex: 1000,
          animation: 'slideUp 0.3s ease-out',
          pointerEvents: 'auto'
        }}>
          {/* Opción 1: Orientación legal gratis - DESTACADA */}
          <button
            onClick={() => handleOptionClick(1)}
            className="menu-option-1"
            style={{
              width: '100%',
              padding: '20px',
              marginBottom: '12px',
              borderRadius: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              background: highlightedOption === 1 
                ? 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)'
                : 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              boxShadow: highlightedOption === 1 
                ? '0 12px 30px rgba(46, 125, 50, 0.5), 0 0 20px rgba(76, 175, 80, 0.3)'
                : '0 8px 24px rgba(46, 125, 50, 0.4), 0 0 15px rgba(76, 175, 80, 0.2)',
              transform: highlightedOption === 1 ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-3px)';
              e.target.style.boxShadow = '0 16px 40px rgba(46, 125, 50, 0.6), 0 0 25px rgba(76, 175, 80, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = highlightedOption === 1 ? 'scale(1.03) translateY(-2px)' : 'scale(1)';
              e.target.style.boxShadow = highlightedOption === 1 
                ? '0 12px 30px rgba(46, 125, 50, 0.5), 0 0 20px rgba(76, 175, 80, 0.3)'
                : '0 8px 24px rgba(46, 125, 50, 0.4), 0 0 15px rgba(76, 175, 80, 0.2)';
            }}
          >
            {/* Efecto de brillo animado */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
              animation: 'shine 3s infinite',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <i className="fas fa-brain" style={{ 
                  fontSize: '1.8rem', 
                  color: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginBottom: '6px',
                  fontSize: '1.1rem',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  letterSpacing: '0.3px'
                }}>
                  Orientación legal gratis
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  opacity: 0.95,
                  fontWeight: '500',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}>
                  Consulta con nuestra IA ahora
                </div>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <i className="fas fa-arrow-right" style={{ 
                  fontSize: '0.9rem',
                  color: 'white'
                }}></i>
              </div>
            </div>
          </button>

          {/* Opción 2: Hablar con mi avocado */}
          <button
            ref={option2Ref}
            onClick={() => handleOptionClick(2)}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '12px',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease',
              background: highlightedOption === 2 
                ? 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)'
                : 'white',
              color: highlightedOption === 2 ? 'white' : '#333',
              fontWeight: highlightedOption === 2 ? 'bold' : '600',
              fontSize: '0.95rem',
              boxShadow: highlightedOption === 2 
                ? '0 8px 20px rgba(46, 125, 50, 0.4), 0 0 15px rgba(76, 175, 80, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: highlightedOption === 2 ? '2px solid #1B5E20' : '2px solid #E0E0E0',
              position: 'relative',
              zIndex: 1001
            }}
            onMouseEnter={(e) => {
              if (highlightedOption !== 2) {
                e.target.style.background = '#F5F5F5';
                e.target.style.borderColor = '#2E7D32';
              }
            }}
            onMouseLeave={(e) => {
              if (highlightedOption !== 2) {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#E0E0E0';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className="fab fa-whatsapp" style={{ fontSize: '1.3rem', color: highlightedOption === 2 ? 'white' : '#25D366' }}></i>
              <span>Hablar con mi avocado</span>
            </div>
          </button>

          {/* Opción 3: Emergencia legal */}
          <button
            onClick={() => handleOptionClick(3)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease',
              background: highlightedOption === 3 
                ? 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)'
                : 'white',
              color: highlightedOption === 3 ? 'white' : '#D32F2F',
              fontWeight: highlightedOption === 3 ? 'bold' : '600',
              fontSize: '0.95rem',
              boxShadow: highlightedOption === 3 
                ? '0 8px 20px rgba(211, 47, 47, 0.4)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: highlightedOption === 3 ? '2px solid #B71C1C' : '2px solid #FFCDD2'
            }}
            onMouseEnter={(e) => {
              if (highlightedOption !== 3) {
                e.target.style.background = '#FFEBEE';
                e.target.style.borderColor = '#D32F2F';
              }
            }}
            onMouseLeave={(e) => {
              if (highlightedOption !== 3) {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#FFCDD2';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className="fas fa-exclamation-triangle" style={{ fontSize: '1.3rem' }}></i>
              <span>Emergencia legal</span>
            </div>
          </button>
        </div>
      )}

      <div 
        className={`wa-tooltip ${showTooltip && !isMenuOpen ? 'show' : ''}`}
        style={{
          // Ajustar posición del tooltip basado en el tamaño del botón
          bottom: `${80 * buttonScale}px`, // Ajustar según el tamaño del botón
          right: '0'
        }}
      >
        {isConnecting ? (
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>
            <i className="fas fa-circle-notch fa-spin" style={{ marginRight: '5px' }}></i>
            <strong>Llevándote con un agente...</strong>
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>
            <strong>¿Necesitas una solución legal ya?</strong><br />
            Habla con un experto en tiempo real.
          </p>
        )}
      </div>
      
      <a 
        href="#" 
        className="wa-button" 
        onClick={handleClick}
        onMouseEnter={() => !isConnecting && !isMenuOpen && setShowTooltip(true)}
        onMouseLeave={() => !isConnecting && setShowTooltip(false)}
        style={{ 
          position: 'relative', 
          zIndex: 1001,
          // Usar width y height directamente en lugar de scale para evitar borrosidad
          width: `${64 * buttonScale}px`,
          height: `${64 * buttonScale}px`,
          // Mantener el icono centrado y con tamaño proporcional
          fontSize: `${24 * buttonScale}px`, // Ajustar tamaño del icono proporcionalmente
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'width, height',
          // Mejorar calidad de renderizado
          imageRendering: 'crisp-edges',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        <i className="fab fa-whatsapp"></i>
        {!isConnecting && !isMenuOpen && (
          <div 
            className="notification-badge"
            style={{
              // Ajustar tamaño del badge proporcionalmente
              width: `${24 * buttonScale}px`,
              height: `${24 * buttonScale}px`,
              fontSize: `${12 * buttonScale}px`,
              lineHeight: `${24 * buttonScale}px`
            }}
          >
            1
          </div>
        )}
      </a>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
          100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 
              0 0 0 9999px rgba(0, 0, 0, 0.75),
              0 0 30px rgba(46, 125, 50, 0.5),
              inset 0 0 20px rgba(76, 175, 80, 0.3);
          }
          50% {
            box-shadow: 
              0 0 0 9999px rgba(0, 0, 0, 0.75),
              0 0 40px rgba(46, 125, 50, 0.7),
              inset 0 0 25px rgba(76, 175, 80, 0.5);
          }
        }
        
        @keyframes bounceArrow {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        .menu-option-1:hover .fa-arrow-right {
          transform: translateX(4px);
        }
      `}</style>
    </div>
    </>
  );
};

export default WhatsAppButton;
