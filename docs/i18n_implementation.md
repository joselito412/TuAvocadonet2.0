# Internationalization (i18n) Implementation Guide

This document details the robust translation system implemented for **TuAvocadonet**, supporting standard global languages and key Indigenous languages from Colombia.

## 1. Architecture

- **Library**: `react-i18next` with `i18next`.
- **Structure**:
  - `src/lib/i18n.ts`: Main configuration file.
  - `src/locales/{lang_code}.json`: Translation files.
  - `src/components/LanguageSwitcher.tsx`: UI component for language selection.

## 2. Configuration (`src/lib/i18n.ts`)

The system initializes with Spanish (`es`) as the default language. It includes a specific fallback mechanism for Indigenous languages where they default to Spanish translation keys (`['es']`) rather than showing the raw translation key if a translation is missing.

### Supported Languages & Codes

#### Standard

- **es**: Español (Colombia) 🇨🇴 (Default)
- **en**: English (USA) 🇺🇸
- **pt**: Português (Brasil) 🇧🇷
- **fr**: Français 🇫🇷
- **de**: Deutsch 🇩🇪
- **ja**: 日本語 🇯🇵
- **zh**: 中文 🇨🇳
- **ko**: 한국어 🇰🇷
- **ar**: العربية 🇸🇦
- **hi**: हिन्दी 🇮🇳
- **th**: ไทย 🇹🇭

#### Indigenous (Colombia)

_Generic fallback to Spanish is applied when strings are missing._

- **guc**: Wayuunaiki 🇨🇴
- **pbb**: Nasa Yuwe 🇨🇴
- **gum**: Namtrik 🇨🇴
- **inb**: Inga 🇨🇴
- **cmi**: Embera Chamí 🇨🇴

## 3. Usage

### Adding Translations

Create or edit JSON files in `src/locales/`. For example, `src/locales/en.json`.
Structure your JSON keys hierarchically:

```json
{
  "landing": {
    "hero": {
      "title": "Welcome"
    }
  }
}
```

### Using Translations in Components

Use the `useTranslation` hook:

```tsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('landing.hero.title')}</h1>;
}
```

### Language Switcher

The `LanguageSwitcher` component is automatically integrated into the `Navigation` bar. It handles:

- Changing the active language.
- Updating `<html lang="...">` for SEO and Accessibility.
- Setting `dir="rtl"` for Arabic automatically.

## 4. Next Steps

1. **Create JSON Files**: Create `src/locales/en.json`, `src/locales/pt.json`, etc., mirroring the structure of `es.json`.
2. **Translate Content**: Populate the keys with correct translations.
3. **Dynamic Loading (Optional)**: For production with many large language files, consider using `i18next-http-backend` to load JSONs lazily. Currently, you need to import them in `src/lib/i18n.ts` or add a dynamic import logic.
