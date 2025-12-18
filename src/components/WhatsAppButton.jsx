import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWhatsAppMenu } from '../contexts/WhatsAppMenuCtx';

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const { isMenuOpen, highlightedOption, toggleMenu, closeMenu } = useWhatsAppMenu();
  const menuRef = useRef(null);
  const option2Ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide after 5 seconds
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu('whatsapp');
  };

  const handleOptionClick = (option) => {
    closeMenu();
    switch (option) {
      case 1:
        navigate('/');
        break;
      case 2:
        navigate('/whatsapp');
        break;
      case 3:
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

  // Spotlight effect
  const [spotlightPosition, setSpotlightPosition] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isMenuOpen && highlightedOption === 2) {
      // setIsClosing(false); // Handled by initialization or state reset

      const timer = setTimeout(() => {
        if (option2Ref.current) {
          const rect = option2Ref.current.getBoundingClientRect();
          setSpotlightPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          });
        }
      }, 150);

      const autoCloseTimer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          closeMenu();
          setIsClosing(false);
        }, 500);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoCloseTimer);
      };
    } else {
      // Reset state asynchronously to avoid render loop warnings
      // if this effect was triggered by render
      const timer = setTimeout(() => {
        setSpotlightPosition(null);
        setIsClosing(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen, highlightedOption, closeMenu]);

  return (
    <>
      {/* Overlay con spotlight */}
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
            transition: 'opacity 0.5s ease-out',
          }}
          onClick={(e) => {
            if (
              !e.target.closest('.wa-menu') &&
              !e.target.closest('.whatsapp-float') &&
              !e.target.closest('.overlay-info-text')
            ) {
              setIsClosing(true);
              setTimeout(() => {
                closeMenu();
                setIsClosing(false);
              }, 500);
            }
          }}
        >
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
              pointerEvents: 'none',
            }}
          >
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                lineHeight: '1.3',
              }}
            >
              {t('whatsapp.overlay.title')}
            </h3>
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                opacity: 0.95,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                lineHeight: '1.5',
              }}
            >
              {t('whatsapp.overlay.desc')}
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                opacity: 0.9,
                fontStyle: 'italic',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                lineHeight: '1.4',
                color: '#E8F5E9',
                position: 'relative',
                paddingRight: '40px',
              }}
            >
              {t('whatsapp.overlay.note')}
            </p>
          </div>

          {spotlightPosition && (
            <div
              style={{
                position: 'fixed',
                top: `${spotlightPosition.top - 60}px`,
                left: `${spotlightPosition.left + spotlightPosition.width / 2}px`,
                transform: 'translateX(-50%)',
                zIndex: 1000,
                pointerEvents: 'none',
                animation: isClosing
                  ? 'fadeOut 0.5s ease-out forwards'
                  : 'bounceArrow 1.5s ease-in-out infinite',
                opacity: isClosing ? 0 : 1,
              }}
            >
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderTop: '25px solid rgba(76, 175, 80, 0.9)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '40px',
                  background:
                    'linear-gradient(to bottom, rgba(76, 175, 80, 0.9), rgba(76, 175, 80, 0.3))',
                  borderRadius: '2px',
                }}
              ></div>
            </div>
          )}

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
              transition: 'all 0.3s ease',
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
          bottom: '24px',
          right: '24px',
          transition: 'none',
        }}
      >
        {isMenuOpen && (
          <div
            className="wa-menu"
            style={{
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
              pointerEvents: 'auto',
            }}
          >
            {/* Opción 1: Orientación legal gratis */}
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
                background:
                  highlightedOption === 1
                    ? 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)'
                    : 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.05rem',
                boxShadow:
                  highlightedOption === 1
                    ? '0 12px 30px rgba(46, 125, 50, 0.5), 0 0 20px rgba(76, 175, 80, 0.3)'
                    : '0 8px 24px rgba(46, 125, 50, 0.4), 0 0 15px rgba(76, 175, 80, 0.2)',
                transform: highlightedOption === 1 ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) translateY(-3px)';
                e.target.style.boxShadow =
                  '0 16px 40px rgba(46, 125, 50, 0.6), 0 0 25px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform =
                  highlightedOption === 1 ? 'scale(1.03) translateY(-2px)' : 'scale(1)';
                e.target.style.boxShadow =
                  highlightedOption === 1
                    ? '0 12px 30px rgba(46, 125, 50, 0.5), 0 0 20px rgba(76, 175, 80, 0.3)'
                    : '0 8px 24px rgba(46, 125, 50, 0.4), 0 0 15px rgba(76, 175, 80, 0.2)';
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background:
                    'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  animation: 'shine 3s infinite',
                  pointerEvents: 'none',
                }}
              ></div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <i
                    className="fas fa-brain"
                    style={{
                      fontSize: '1.8rem',
                      color: 'white',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    }}
                  ></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '6px',
                      fontSize: '1.1rem',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {t('whatsapp.menu.option1.title')}
                  </div>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      opacity: 0.95,
                      fontWeight: '500',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {t('whatsapp.menu.option1.subtitle')}
                  </div>
                </div>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <i
                    className="fas fa-arrow-right"
                    style={{
                      fontSize: '0.9rem',
                      color: 'white',
                    }}
                  ></i>
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
                background:
                  highlightedOption === 2
                    ? 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)'
                    : 'white',
                color: highlightedOption === 2 ? 'white' : '#333',
                fontWeight: highlightedOption === 2 ? 'bold' : '600',
                fontSize: '0.95rem',
                boxShadow:
                  highlightedOption === 2
                    ? '0 8px 20px rgba(46, 125, 50, 0.4), 0 0 15px rgba(76, 175, 80, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: highlightedOption === 2 ? '2px solid #1B5E20' : '2px solid #E0E0E0',
                position: 'relative',
                zIndex: 1001,
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
                <i
                  className="fab fa-whatsapp"
                  style={{
                    fontSize: '1.3rem',
                    color: highlightedOption === 2 ? 'white' : '#25D366',
                  }}
                ></i>
                <span>{t('whatsapp.menu.option2')}</span>
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
                background:
                  highlightedOption === 3
                    ? 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)'
                    : 'white',
                color: highlightedOption === 3 ? 'white' : '#D32F2F',
                fontWeight: highlightedOption === 3 ? 'bold' : '600',
                fontSize: '0.95rem',
                boxShadow:
                  highlightedOption === 3
                    ? '0 8px 20px rgba(211, 47, 47, 0.4)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: highlightedOption === 3 ? '2px solid #B71C1C' : '2px solid #FFCDD2',
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
                <span>{t('whatsapp.menu.option3')}</span>
              </div>
            </button>
          </div>
        )}

        <div
          className={`wa-tooltip ${showTooltip && !isMenuOpen ? 'show' : ''}`}
          style={{
            bottom: '85px',
            right: '0',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>
            <strong>{t('whatsapp.tooltip.default.title')}</strong>
            <br />
            {t('whatsapp.tooltip.default.subtitle')}
          </p>
        </div>

        <a
          href="#"
          className="wa-button"
          onClick={handleClick}
          onMouseEnter={() => !isMenuOpen && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{
            position: 'relative',
            zIndex: 1001,
            width: '60px',
            height: '60px',
            fontSize: '30px',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            color: 'white',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          <i className="fab fa-whatsapp"></i>
          {!isMenuOpen && (
            <div
              className="notification-badge"
              style={{
                width: '20px',
                height: '20px',
                fontSize: '11px',
                lineHeight: '20px',
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
          
          .menu-option-1:hover .fa-arrow-right {
            transform: translateX(4px);
          }
        `}</style>
      </div>
    </>
  );
};

export default WhatsAppButton;
