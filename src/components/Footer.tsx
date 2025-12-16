import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, ArrowUp } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a
    href={href}
    aria-label={label}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#90ee90] hover:text-[#0a0a0a] text-white transition-all duration-300 group"
  >
    <div className="transform group-hover:scale-110 transition-transform">{icon}</div>
  </a>
);

interface FooterLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const FooterLink = ({ to, label, onClick }: FooterLinkProps) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-400 hover:text-[#90ee90] transition-colors text-sm flex items-center gap-2 group"
    >
      <span className="w-1 h-1 rounded-full bg-[#90ee90]/50 group-hover:bg-[#90ee90] transition-colors"></span>
      {label}
    </Link>
  </li>
);

export function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="md:col-span-4">
            <Link
              to="/"
              className="flex flex-col items-center gap-4 mb-6 group"
              onClick={scrollToTop}
            >
              <div className="relative w-64 h-32 md:w-80 md:h-40 flex items-center justify-center bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-[#90ee90]/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-1">
                <img
                  src={`${import.meta.env.BASE_URL}img/Logo_Avocado.svg`}
                  alt="AVOCADO Logo"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6">{t('footer.titles.navigation')}</h4>
            <ul className="space-y-3">
              <FooterLink to="/" label={t('navigation.links.home')} onClick={scrollToTop} />
              <FooterLink
                to="/que-hacemos"
                label={t('navigation.links.whatWeDo')}
                onClick={scrollToTop}
              />
              <FooterLink
                to="/usuarios"
                label={t('navigation.links.users')}
                onClick={scrollToTop}
              />
              <FooterLink
                to="/aprende-ia"
                label={t('navigation.links.learnAI')}
                onClick={scrollToTop}
              />
              <FooterLink
                to="/sostenibilidad"
                label={t('navigation.links.sustainability')}
                onClick={scrollToTop}
              />
              <FooterLink
                to="/sobre-nosotros"
                label={t('navigation.links.about')}
                onClick={scrollToTop}
              />
              <FooterLink
                to="/trabaja-con-nosotros"
                label={t('navigation.links.workWithUs')}
                onClick={scrollToTop}
              />
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6">{t('footer.titles.legal')}</h4>
            <ul className="space-y-3">
              <FooterLink
                to="/legal"
                label={t('footer.links.personalData')}
                onClick={scrollToTop}
              />
              <FooterLink to="/legal" label={t('footer.links.terms')} onClick={scrollToTop} />
              <FooterLink to="/legal" label={t('footer.links.privacy')} onClick={scrollToTop} />
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-6">{t('footer.titles.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MessageCircle size={18} className="text-[#90ee90] mt-0.5 shrink-0" />
                <span>hola@avocado.legal</span>
              </li>
              <li className="text-gray-400 text-sm pl-8">Bogotá, Colombia</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} TuAvocado S.A.S. {t('footer.rights')}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#90ee90] transition-colors"
          >
            Subir <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
