import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-5 relative w-full box-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Brand */}
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}img/Logo_Avocado.svg`} 
              alt="Avocado Logo" 
              className="h-20 md:h-24 lg:h-28 w-auto mb-5" 
              style={{ minWidth: '140px' }}
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
              {[
                { path: '/', label: 'Asesoría Legal' },
                { path: '/que-hacemos', label: '¿Qué hacemos?' },
                { path: '/usuarios', label: 'Usuarios' },
                { path: '/blog', label: 'Blog' },
                { path: '/sobre-nosotros', label: 'Nosotros' },
                { path: '/sostenibilidad', label: 'Sostenibilidad' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 no-underline transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-white mb-5 text-lg font-semibold">Información Legal</h4>
            <ul className="list-none p-0 space-y-3">
              {[
                { path: '/legal#datos-personales', label: 'Datos Personales' },
                { path: '/legal#terminos', label: 'Términos y Condiciones' },
                { path: '/legal#privacidad', label: 'Política de Privacidad' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 no-underline transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
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
