export const LANGUAGE_STORAGE_KEY = 'anton-language';
export const DEFAULT_LANGUAGE = 'en';

export const languageOptions = [
  { id: 'ar', code: 'AR', nativeName: 'العربية', htmlLang: 'ar', direction: 'rtl' },
  { id: 'bn', code: 'BN', nativeName: 'বাংলা', htmlLang: 'bn', direction: 'ltr' },
  { id: 'zh', code: 'CN', nativeName: '中文', htmlLang: 'zh-Hans', direction: 'ltr' },
  { id: 'de', code: 'DE', nativeName: 'Deutsch', htmlLang: 'de', direction: 'ltr' },
  { id: 'en', code: 'EN', nativeName: 'English', htmlLang: 'en', direction: 'ltr' },
  { id: 'es', code: 'ES', nativeName: 'Español', htmlLang: 'es', direction: 'ltr' },
  { id: 'fr', code: 'FR', nativeName: 'Français', htmlLang: 'fr', direction: 'ltr' },
  { id: 'he', code: 'HE', nativeName: 'עברית', htmlLang: 'he', direction: 'rtl' },
  { id: 'hi', code: 'HI', nativeName: 'हिन्दी', htmlLang: 'hi', direction: 'ltr' },
  { id: 'it', code: 'IT', nativeName: 'Italiano', htmlLang: 'it', direction: 'ltr' },
  { id: 'ja', code: 'JA', nativeName: '日本語', htmlLang: 'ja', direction: 'ltr' },
  { id: 'ko', code: 'KO', nativeName: '한국어', htmlLang: 'ko', direction: 'ltr' },
  { id: 'kk', code: 'KZ', nativeName: 'Қазақша', htmlLang: 'kk', direction: 'ltr' },
  { id: 'me', code: 'ME', nativeName: 'Crnogorski', htmlLang: 'cnr-Latn', direction: 'ltr' },
  { id: 'pl', code: 'PL', nativeName: 'Polski', htmlLang: 'pl', direction: 'ltr' },
  { id: 'pt', code: 'PT', nativeName: 'Português', htmlLang: 'pt', direction: 'ltr' },
  { id: 'ru', code: 'RU', nativeName: 'Русский', htmlLang: 'ru', direction: 'ltr' },
  { id: 'sr', code: 'SR', nativeName: 'Српски', htmlLang: 'sr-Cyrl', direction: 'ltr' },
  { id: 'tr', code: 'TR', nativeName: 'Türkçe', htmlLang: 'tr', direction: 'ltr' },
  { id: 'uk', code: 'UK', nativeName: 'Українська', htmlLang: 'uk', direction: 'ltr' },
  { id: 'vi', code: 'VI', nativeName: 'Tiếng Việt', htmlLang: 'vi', direction: 'ltr' },
];

export const languageIds = languageOptions.map((language) => language.id);

export function isLanguageId(languageId) {
  return languageIds.includes(languageId);
}

export function getLanguageOption(languageId) {
  return languageOptions.find((language) => language.id === languageId)
    ?? languageOptions.find((language) => language.id === DEFAULT_LANGUAGE);
}

export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const browserLanguage = navigator.language || navigator.languages?.[0];

  return resolveBrowserLanguage(browserLanguage);
}

export function resolveBrowserLanguage(browserLanguage) {
  if (!browserLanguage) {
    return DEFAULT_LANGUAGE;
  }

  const subtags = browserLanguage.toLowerCase().replaceAll('_', '-').split('-');
  const primaryLanguage = subtags[0];

  if (primaryLanguage === 'sr') {
    return subtags.includes('latn') ? 'me' : 'sr';
  }

  if (primaryLanguage === 'cnr' || primaryLanguage === 'me') {
    return 'me';
  }

  if (primaryLanguage === 'iw') {
    return 'he';
  }

  return isLanguageId(primaryLanguage) ? primaryLanguage : DEFAULT_LANGUAGE;
}
