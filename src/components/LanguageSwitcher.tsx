import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Language configuration interface
interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
}

// 1. Standard Languages Reference
// es (🇨🇴), en (🇺🇸), pt (🇧🇷), fr (🇫🇷), de (🇩🇪), ja (🇯🇵), zh (🇨🇳), ko (🇰🇷), ar (🇸🇦), hi (🇮🇳), th (🇹🇭)
const STANDARD_LANGUAGES: LanguageConfig[] = [
  { code: 'es', name: 'Español', flag: '🇨🇴' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
];

// 2. Indigenous Languages (Colombia) Reference
// Fallback to Spanish is handled in i18n.ts
const INDIGENOUS_LANGUAGES: LanguageConfig[] = [
  { code: 'guc', name: 'Wayuunaiki', flag: '🇨🇴' },
  { code: 'pbb', name: 'Nasa Yuwe', flag: '🇨🇴' },
  { code: 'gum', name: 'Namtrik', flag: '🇨🇴' },
  { code: 'inb', name: 'Inga', flag: '🇨🇴' },
  { code: 'cmi', name: 'Embera Chamí', flag: '🇨🇴' },
];

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile }) => {
  const { i18n } = useTranslation();

  // Logic: update document.documentElement.lang on change for SEO/Accessibility
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = 'ltr'; // Always LTR to prevent layout inversion
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Security: The value comes from our predefined options, reducing XSS risk
    // React's onChange and value binding also prevent direct DOM injection
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative inline-block text-left m-2">
      <label htmlFor="language-switcher" className="sr-only">
        {i18n.t('language.select', 'Selecciona un idioma')}
      </label>
      <select
        id="language-switcher"
        value={i18n.language}
        onChange={handleChange}
        className="block w-full px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
        aria-label="Language Switcher"
      >
        <optgroup label="Standard">
          {STANDARD_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </optgroup>
        {/* Temporarily hidden as per user request (translations pending)
        <optgroup label="Indigenous (Colombia)">
          {INDIGENOUS_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </optgroup>
        */}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
