import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      <div className="nav-content-wrapper">
        <div className="nav-brand">
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="AVO Logo" className="avocado-logo-img" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Asesoría Legal
            </Link>
          </li>
          <li>
            <Link to="/que-hacemos" className={location.pathname === '/que-hacemos' ? 'active' : ''}>
              ¿Qué hacemos?
            </Link>
          </li>
          <li>
            <Link to="/personas" className={location.pathname === '/personas' ? 'active' : ''}>
              Personas
            </Link>
          </li>
          <li>
            <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/sobre-nosotros" className={location.pathname === '/sobre-nosotros' ? 'active' : ''}>
              Nosotros
            </Link>
          </li>
        </ul>
        <button className="btn-login">Log In</button>
      </div>
    </nav>
  );
}

export default Navigation;
