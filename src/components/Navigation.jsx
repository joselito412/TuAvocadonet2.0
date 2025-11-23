import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="main-nav">
      <div className="nav-content-wrapper">
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu}>
            <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="AVO Logo" className="avocado-logo-img" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
              Asesoría Legal
            </Link>
          </li>
          <li>
            <Link to="/que-hacemos" className={location.pathname === '/que-hacemos' ? 'active' : ''} onClick={closeMenu}>
              ¿Qué hacemos?
            </Link>
          </li>
          <li>
            <Link to="/usuarios" className={location.pathname === '/usuarios' ? 'active' : ''} onClick={closeMenu}>
              Usuarios
            </Link>
          </li>
          <li>
            <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} onClick={closeMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/sobre-nosotros" className={location.pathname === '/sobre-nosotros' ? 'active' : ''} onClick={closeMenu}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/sostenibilidad" className={location.pathname === '/sostenibilidad' ? 'active' : ''} onClick={closeMenu}>
              Sostenibilidad
            </Link>
          </li>
          <li className="mobile-only-btn">
             <button className="btn-login" onClick={closeMenu}>Log In</button>
          </li>
        </ul>
        <button className="btn-login desktop-only-btn">Log In</button>
      </div>
    </nav>
  );
}

export default Navigation;
