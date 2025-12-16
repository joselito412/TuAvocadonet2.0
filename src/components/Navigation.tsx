import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { Button } from './ui';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavLink {
  path: string;
  labelKey: string;
  children?: { path: string; labelKey: string }[];
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // For Mobile Accordion

  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks: NavLink[] = [
    { path: '/', labelKey: 'navigation.links.home' },
    { path: '/que-hacemos', labelKey: 'navigation.links.whatWeDo' },
    { path: '/usuarios', labelKey: 'navigation.links.users' },
    { path: '/aprende-ia', labelKey: 'navigation.links.learnAI' },
    {
      path: '/sobre-nosotros', // Parent path (can be ignored if purely a trigger)
      labelKey: 'navigation.links.about',
      children: [
        { path: '/sobre-nosotros', labelKey: 'navigation.links.about' },
        { path: '/sostenibilidad', labelKey: 'navigation.links.sustainability' },
        { path: '/trabaja-con-nosotros', labelKey: 'navigation.links.workWithUs' },
      ],
    },
  ];

  const handleMobileSubmenuToggle = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path);
  };

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
          <div className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8 h-full">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group/menu py-2">
                {!link.children ? (
                  <Link to={link.path} className="relative group px-2 py-2">
                    <span
                      className={cn(
                        'relative z-10 lg:text-sm xl:text-[15px] font-medium transition-all duration-500 ease-in-out',
                        isActive(link.path)
                          ? 'text-primary'
                          : 'text-gray-500 group-hover:text-primary'
                      )}
                    >
                      {t(link.labelKey)}
                    </span>
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 w-full h-[2px] bg-primary/80 rounded-full transition-transform duration-300 ease-out origin-center',
                        isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      )}
                    />
                  </Link>
                ) : (
                  // Desktop Dropdown
                  <div className="relative">
                    <button className="flex items-center gap-1 lg:text-sm xl:text-[15px] font-medium text-gray-500 hover:text-primary transition-colors focus:outline-none px-2 py-2">
                      {t(link.labelKey)}
                      <ChevronDown size={14} />
                    </button>

                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform origin-top-right">
                      <div className="py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              'block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition-colors',
                              isActive(child.path) ? 'text-primary font-medium' : 'text-gray-600'
                            )}
                          >
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-6 lg:pl-2 xl:pl-4 h-full relative">
              {/* Login + Language Bookmark */}
              <div className="relative z-50 h-full flex items-start group">
                <div className="absolute top-0 right-0 w-28 xl:w-32 h-20 xl:h-24 flex flex-col items-center bg-action shadow-lg shadow-orange-500/10 rounded-b-2xl transition-all duration-300 hover:h-24 xl:hover:h-28 hover:shadow-xl cursor-pointer pt-2">
                  {/* Embedded Language Switcher */}
                  <div className="w-full px-2 mb-1">
                    <LanguageSwitcher variant="bookmark" />
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-[1px] bg-white/20 mb-1"></div>

                  <span className="text-white font-semibold tracking-wide lg:text-sm xl:text-base transition-all duration-300 flex-1 flex items-center mb-2">
                    {t('navigation.buttons.login')}
                  </span>
                </div>
                {/* Spacer to occupy width */}
                <div className="w-28 xl:w-32"></div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
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
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white backdrop-blur-md border-b border-gray-100 py-4 px-4 flex flex-col space-y-2 sm:space-y-4 animate-in slide-in-from-top-5 shadow-xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.path}>
              {!link.children ? (
                <Link
                  to={link.path}
                  className={cn(
                    'py-2 text-base sm:text-lg font-medium border-b border-gray-50 block',
                    isActive(link.path) ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ) : (
                // Mobile Accordion
                <div>
                  <button
                    onClick={() => handleMobileSubmenuToggle(link.path)}
                    className="w-full flex items-center justify-between py-2 text-base sm:text-lg font-medium border-b border-gray-50 text-gray-600 hover:text-primary"
                  >
                    {t(link.labelKey)}
                    <ChevronDown
                      size={20}
                      className={cn(
                        'transition-transform',
                        openSubmenu === link.path ? 'rotate-180' : ''
                      )}
                    />
                  </button>

                  {openSubmenu === link.path && (
                    <div className="pl-4 py-2 space-y-2 bg-gray-50/50 rounded-lg mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            'block py-2 text-sm font-medium',
                            isActive(child.path)
                              ? 'text-primary'
                              : 'text-gray-500 hover:text-primary'
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t(child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
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
