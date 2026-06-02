import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  detectBrowserLanguage,
  getLanguageOption,
  isLanguageId,
  languageOptions,
} from './languages.js';
import { siteCopy } from './siteCopy.js';

const LanguageContext = createContext(null);

function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguageId(storedLanguage) ? storedLanguage : null;
  } catch {
    return null;
  }
}

function getInitialLanguage() {
  return getStoredLanguage() ?? detectBrowserLanguage();
}

function getContentLanguage(language) {
  return siteCopy[language] ? language : DEFAULT_LANGUAGE;
}

function persistLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // A blocked storage write should not prevent language switching in the current session.
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const hasStoredLanguage = useRef(getStoredLanguage() !== null);
  const contentLanguage = getContentLanguage(language);
  const contentLanguageOption = getLanguageOption(contentLanguage);
  const copy = siteCopy[contentLanguage] ?? siteCopy[DEFAULT_LANGUAGE];

  const selectLanguage = (nextLanguage) => {
    if (!isLanguageId(nextLanguage)) {
      return;
    }

    hasStoredLanguage.current = true;
    setLanguage(nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = contentLanguageOption.htmlLang;
    document.title = copy.meta.title;
  }, [contentLanguageOption.htmlLang, copy.meta.title]);

  useEffect(() => {
    if (!hasStoredLanguage.current) {
      return;
    }

    persistLanguage(language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      contentLanguage,
      contentLanguageTag: contentLanguageOption.htmlLang,
      copy,
      languageOptions,
      selectLanguage,
    }),
    [contentLanguage, contentLanguageOption.htmlLang, copy, language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider.');
  }

  return context;
}

export function useSiteCopy() {
  return useLanguage().copy;
}
