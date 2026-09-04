import { LANGUAGE_STORAGE_KEY, detectBrowserLanguage, isLanguageId } from './languages.js';

export function getPreferredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageId(stored)) return stored;
  } catch {
    // Storage restrictions must not prevent browser-language detection.
  }
  return detectBrowserLanguage();
}

export function persistLanguage(language) {
  try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch {
    // An explicit choice still works for the current session without storage.
  }
}
