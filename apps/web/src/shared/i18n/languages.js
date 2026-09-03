export const LANGUAGE_STORAGE_KEY = 'anton-language';
export const DEFAULT_LANGUAGE = 'en';

export const languageOptions = [
  { id: 'en', code: 'EN', nativeName: 'English', htmlLang: 'en' },
  { id: 'ru', code: 'RU', nativeName: 'Русский', htmlLang: 'ru' },
  { id: 'sr', code: 'SR', nativeName: 'Српски', htmlLang: 'sr-Cyrl' },
  { id: 'me', code: 'ME', nativeName: 'Crnogorski', htmlLang: 'cnr-Latn' },
];

export const languageIds = languageOptions.map((language) => language.id);

export function isLanguageId(languageId) {
  return languageIds.includes(languageId);
}

export function getLanguageOption(languageId) {
  return languageOptions.find((language) => language.id === languageId) ?? languageOptions[0];
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

  const normalizedLanguage = browserLanguage.toLowerCase();

  if (normalizedLanguage.startsWith('ru')) {
    return 'ru';
  }

  if (normalizedLanguage.startsWith('sr')) {
    return normalizedLanguage.includes('latn') ? 'me' : 'sr';
  }

  if (normalizedLanguage.startsWith('cnr') || normalizedLanguage.startsWith('me')) {
    return 'me';
  }

  return DEFAULT_LANGUAGE;
}
