import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white py-12 mt-16">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Brand */}
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}img/logo.png`} 
              alt="Avocado Logo" 
              className="h-16 mb-5" 
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu abogado de bolsillo. Orientación legal profesional impulsada por IA, accesible 24/7.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="#" className="text-white text-2xl transition-colors hover:text-primary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-white text-2xl transition-colors hover:text-primary">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white text-2xl transition-colors hover:text-primary">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white mb-5 text-lg font-semibold">Navegación</h4>
            <ul className="list-none p-0 space-y-3">
              <li>
                <Link to="/" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Asesoría Legal
                </Link>
              </li>
              <li>
                <Link to="/que-hacemos" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  ¿Qué hacemos?
                </Link>
              </li>
              <li>
                <Link to="/usuarios" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Usuarios
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/sostenibilidad" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Sostenibilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-white mb-5 text-lg font-semibold">Información Legal</h4>
            <ul className="list-none p-0 space-y-3">
              <li>
                <Link to="/legal#datos-personales" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Datos Personales
                </Link>
              </li>
              <li>
                <Link to="/legal#terminos" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/legal#privacidad" className="text-gray-400 no-underline transition-colors hover:text-primary">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white mb-5 text-lg font-semibold">Contacto</h4>
            <p className="text-gray-400 mb-3 flex items-center">
              <i className="fas fa-envelope mr-3 text-primary"></i>
              hola@avocado.legal
            </p>
            <p className="text-gray-400 mb-3 flex items-center">
              <i className="fas fa-phone mr-3 text-primary"></i>
              +57 300 123 4567
            </p>
            <p className="text-gray-400 flex items-center">
              <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
              Bogotá, Colombia
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-10 pt-8 text-center">
          <p className="copyright m-0 text-gray-500 text-sm">
            &copy; 2024 - 2025 <strong className="text-white">AVOCADO</strong>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
