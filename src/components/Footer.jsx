import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ 
      background: 'var(--color-dark)', 
      color: 'white', 
      padding: '50px 0 25px',
      marginTop: '60px'
    }}>
      <div className="content-wrapper">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Column 1: Brand */}
          <div>
            <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Avocado Logo" style={{ height: '60px', marginBottom: '20px' }} />
            <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: '1.6' }}>
              Tu abogado de bolsillo. Orientación legal profesional impulsada por IA, accesible 24/7.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem', transition: 'color 0.3s' }}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem', transition: 'color 0.3s' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem', transition: 'color 0.3s' }}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Navegación</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Asesoría Legal
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/que-hacemos" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  ¿Qué hacemos?
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/usuarios" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Usuarios
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/blog" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Blog
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/sobre-nosotros" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Nosotros
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/sostenibilidad" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Sostenibilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Información Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/legal#datos-personales" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Datos Personales
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/legal#terminos" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Términos y Condiciones
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/legal#privacidad" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Contacto</h4>
            <p style={{ color: '#ccc', marginBottom: '10px' }}>
              <i className="fas fa-envelope" style={{ marginRight: '10px', color: 'var(--color-primary)' }}></i>
              hola@avocado.legal
            </p>
            <p style={{ color: '#ccc', marginBottom: '10px' }}>
              <i className="fas fa-phone" style={{ marginRight: '10px', color: 'var(--color-primary)' }}></i>
              +57 300 123 4567
            </p>
            <p style={{ color: '#ccc' }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', color: 'var(--color-primary)' }}></i>
              Bogotá, Colombia
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '30px',
          textAlign: 'center'
        }}>
          <p className="copyright" style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>
            &copy; 2024 - 2025 <strong style={{ color: 'white' }}>AVOCADO</strong>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
