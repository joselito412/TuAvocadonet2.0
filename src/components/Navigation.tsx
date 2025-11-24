import { useAtomValue, useSetAtom } from 'jotai';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from './ui';
import { isMobileMenuOpenAtom } from '../store/atoms';

function Navigation() {
  const location = useLocation();
  const isMenuOpen = useAtomValue(isMobileMenuOpenAtom);
  const setIsMenuOpen = useSetAtom(isMobileMenuOpenAtom);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
        <div className="flex-shrink-0">
          <Link to="/" onClick={closeMenu}>
            <img 
              src={`${import.meta.env.BASE_URL}img/logo.png`} 
              alt="AVO Logo" 
              className="h-20 w-auto transition-transform hover:scale-105" 
            />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden bg-transparent border-0 text-2xl text-dark cursor-pointer relative z-[1100]" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <ul className={cn(
          "flex list-none gap-8 items-center",
          // Mobile styles
          "max-lg:fixed max-lg:inset-0 max-lg:bg-white max-lg:flex-col max-lg:justify-center max-lg:transition-transform max-lg:duration-300 max-lg:z-[1000]",
          isMenuOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full",
          "lg:flex-row"
        )}>
          {[
            { path: '/', label: 'Asesoría Legal' },
            { path: '/que-hacemos', label: '¿Qué hacemos?' },
            { path: '/usuarios', label: 'Usuarios' },
            { path: '/blog', label: 'Blog' },
            { path: '/sobre-nosotros', label: 'Nosotros' },
            { path: '/sostenibilidad', label: 'Sostenibilidad' },
          ].map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={cn(
                  "no-underline text-dark font-medium text-sm transition-colors hover:text-primary",
                  isActive(link.path) && "text-primary border-b-2 border-primary pb-1"
                )} 
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
          
          <li className="lg:hidden mt-4">
             <Button variant="primary" onClick={closeMenu}>Log In</Button>
          </li>
        </ul>
        
        <div className="hidden lg:block">
          <Button variant="primary" className="bg-action hover:bg-action/90">Log In</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
