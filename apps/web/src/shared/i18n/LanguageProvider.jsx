import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  getLanguageOption,
  isLanguageId,
  languageOptions,
} from './languages.js';
import { loadSiteCopy } from './loadSiteCopy.js';
import { persistLanguage } from './languagePreference.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLanguage, initialCopy }) {
  const [{ language, copy }, setLoadedLanguage] = useState({ language: initialLanguage, copy: initialCopy });
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const [failedLanguage, setFailedLanguage] = useState(null);
  const requestId = useRef(0);
  const contentLanguage = language;
  const contentLanguageOption = getLanguageOption(contentLanguage);

  const selectLanguage = async (nextLanguage) => {
    if (!isLanguageId(nextLanguage)) {
      return;
    }

    const currentRequest = ++requestId.current;
    setFailedLanguage(null);
    setPendingLanguage(nextLanguage);
    try {
      const loaded = await loadSiteCopy(nextLanguage);
      if (currentRequest !== requestId.current) return;
      setLoadedLanguage(loaded);
      persistLanguage(loaded.language);
    } catch {
      if (currentRequest === requestId.current) setFailedLanguage(nextLanguage);
    } finally {
      if (currentRequest === requestId.current) setPendingLanguage(null);
    }
  };

  useEffect(() => {
    document.documentElement.lang = contentLanguageOption.htmlLang;
    document.documentElement.dir = contentLanguageOption.direction;
    document.title = copy.meta.title;
  }, [contentLanguageOption.direction, contentLanguageOption.htmlLang, copy.meta.title]);

  useEffect(() => () => { requestId.current += 1; }, []);

  const value = useMemo(
    () => ({
      language,
      contentLanguage,
      contentLanguageTag: contentLanguageOption.htmlLang,
      copy,
      languageOptions,
      selectLanguage,
      pendingLanguage,
    }),
    [contentLanguage, contentLanguageOption.htmlLang, copy, language, pendingLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      {failedLanguage && (
        <div className="load-feedback" role="alert" dir="ltr">
          <span>⚠ Could not load: {getLanguageOption(failedLanguage).nativeName}</span>
          <button type="button" onClick={() => selectLanguage(failedLanguage)} aria-label="Retry language download">↻</button>
          <button type="button" onClick={() => setFailedLanguage(null)} aria-label="Dismiss">×</button>
        </div>
      )}
    </LanguageContext.Provider>
  );
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
