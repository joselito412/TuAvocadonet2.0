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
    <>
      {/* Fixed Navigation Bar */}
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
            className="lg:hidden bg-transparent border-0 text-2xl text-dark cursor-pointer relative z-[10001]"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Desktop Navigation Menu */}
          <ul className="hidden lg:flex list-none gap-8 items-center">
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
                    'no-underline text-dark font-medium text-sm transition-colors hover:text-primary',
                    isActive(link.path) && 'text-primary border-b-2 border-primary pb-1'
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Login Button */}
          <div className="hidden lg:block">
            <Button variant="primary" className="bg-action hover:bg-action/90">
              Log In
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - OUTSIDE NAV */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Sidebar - OUTSIDE NAV */}
      <div
        className={cn(
          'lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out overflow-y-auto',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="pt-24 px-8 flex flex-col gap-6">
          {[
            { path: '/', label: 'Asesoría Legal' },
            { path: '/que-hacemos', label: '¿Qué hacemos?' },
            { path: '/usuarios', label: 'Usuarios' },
            { path: '/blog', label: 'Blog' },
            { path: '/sobre-nosotros', label: 'Nosotros' },
            { path: '/sostenibilidad', label: 'Sostenibilidad' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'no-underline text-dark font-semibold text-xl py-2 block transition-colors hover:text-primary',
                isActive(link.path) && 'text-primary'
              )}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" onClick={closeMenu} className="mt-4">
            Log In
          </Button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
