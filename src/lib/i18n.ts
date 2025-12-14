import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '../locales/es.json';
import en from '../locales/en.json';
import pt from '../locales/pt.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import zh from '../locales/zh.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import ar from '../locales/ar.json';
import hi from '../locales/hi.json';
import th from '../locales/th.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
  pt: { translation: pt },
  fr: { translation: fr },
  de: { translation: de },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ar: { translation: ar },
  hi: { translation: hi },
  th: { translation: th },
};

// Indigenous languages codes mapping to Spanish fallback
const indigenousFallbacks = {
  guc: ['es'], // Wayuunaiki -> Spanish
  pbb: ['es'], // Nasa Yuwe -> Spanish
  gum: ['es'], // Namtrik -> Spanish
  inb: ['es'], // Inga -> Spanish
  cmi: ['es'], // Embera Chamí -> Spanish
  default: ['es'],
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // default language
  fallbackLng: indigenousFallbacks, // robust fallback for indigenous codes

  // Also add standard fallback for known languages if regions are used (e.g. en-US -> en)
  // For now, indigenousFallbacks handles logical fallbacks.

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

// Enforce LTR direction for all languages as requested by user ("no debe pasar" que se invierta)
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
