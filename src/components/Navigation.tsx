import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { Button } from './ui';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', labelKey: 'navigation.links.home' },
    { path: '/que-hacemos', labelKey: 'navigation.links.whatWeDo' },
    { path: '/usuarios', labelKey: 'navigation.links.users' },
    { path: '/sostenibilidad', labelKey: 'navigation.links.sustainability' },
    { path: '/sobre-nosotros', labelKey: 'navigation.links.about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Logo Positioned Absolutely to the Left (Screen Edge) */}
      <Link
        to="/"
        className="absolute top-0 left-4 lg:left-8 z-50 group h-full flex items-start pt-0"
      >
        <div className="w-[30vw] sm:w-[24vw] lg:w-[15vw] xl:w-[18vw] min-w-[140px] max-w-[260px] h-24 lg:h-28 flex items-center justify-center bg-white shadow-xl shadow-green-900/10 rounded-b-2xl lg:rounded-b-[2.5rem] rounded-t-lg transition-all duration-300 group-hover:h-28 lg:group-hover:h-32 group-hover:shadow-2xl">
          <img
            src={`${import.meta.env.BASE_URL}img/Logo_Avocado.svg`}
            alt="AVOCADO Logo"
            className="w-[85%] h-auto object-contain mt-1 lg:mt-2 transition-all duration-300"
          />
        </div>
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-20">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center lg:space-x-8 xl:space-x-12 h-full">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="relative group py-2">
                <span
                  className={cn(
                    'relative z-10 lg:text-sm xl:text-[15px] font-medium transition-all duration-500 ease-in-out',
                    isActive(link.path) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
                  )}
                >
                  {t(link.labelKey)}
                </span>
                {/* Minimalist Apple-style Underline */}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 w-full h-[2px] bg-primary/80 rounded-full transition-transform duration-300 ease-out origin-center',
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            ))}

            <div className="flex items-center gap-6 lg:pl-4 xl:pl-8 h-full">
              <LanguageSwitcher />

              {/* Hanging Bookmark Login Button */}
              <div className="relative z-50 h-full flex items-start">
                <div className="absolute top-0 right-0 w-28 xl:w-32 h-16 xl:h-20 flex items-center justify-center bg-action shadow-lg shadow-orange-500/10 rounded-b-2xl transition-all duration-300 hover:h-20 xl:hover:h-24 hover:shadow-xl group cursor-pointer">
                  <span className="text-white font-semibold tracking-wide lg:text-sm xl:text-base mt-2 group-hover:mt-4 transition-all duration-300">
                    {t('navigation.buttons.login')}
                  </span>
                </div>
                {/* Placeholder width */}
                <div className="w-28 xl:w-32"></div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher mobile />
            <button
              className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('navigation.aria.toggle')}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white backdrop-blur-md border-b border-gray-100 py-4 px-4 flex flex-col space-y-2 sm:space-y-4 animate-in slide-in-from-top-5 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'py-1.5 sm:py-2 text-base sm:text-lg font-medium border-b border-gray-50 block',
                isActive(link.path) ? 'text-primary' : 'text-gray-600 hover:text-primary'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <Button
            className="w-full bg-orange-500 text-white hover:bg-orange-600 font-medium py-3 sm:py-5 mt-2 shadow-lg border-none"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('navigation.buttons.login')}
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
