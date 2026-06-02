export const LANGUAGE_STORAGE_KEY = 'anton-language';
export const DEFAULT_LANGUAGE = 'en';

export const languageOptions = [
  { id: 'en', code: 'EN', nativeName: 'English', htmlLang: 'en' },
  { id: 'ru', code: 'RU', nativeName: 'Русский', htmlLang: 'ru' },
  { id: 'de', code: 'DE', nativeName: 'Deutsch', htmlLang: 'de' },
  { id: 'fr', code: 'FR', nativeName: 'Français', htmlLang: 'fr' },
  { id: 'es', code: 'ES', nativeName: 'Español', htmlLang: 'es' },
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

  const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    const language = resolveBrowserLanguage(browserLanguage);

    if (language) {
      return language;
    }
  }

  return DEFAULT_LANGUAGE;
}

function resolveBrowserLanguage(browserLanguage) {
  if (!browserLanguage) {
    return null;
  }

  const normalizedLanguage = browserLanguage.toLowerCase();

  if (normalizedLanguage.startsWith('ru')) {
    return 'ru';
  }

  if (normalizedLanguage.startsWith('de')) {
    return 'de';
  }

  if (normalizedLanguage.startsWith('fr')) {
    return 'fr';
  }

  if (normalizedLanguage.startsWith('es')) {
    return 'es';
  }

  if (
    normalizedLanguage.startsWith('cnr') ||
    normalizedLanguage === 'sr-me' ||
    normalizedLanguage.startsWith('sr-me-') ||
    normalizedLanguage.startsWith('sr-latn-me')
  ) {
    return 'me';
  }

  if (normalizedLanguage.startsWith('sr')) {
    return 'sr';
  }

  return null;
}
