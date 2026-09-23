import { createContext, useContext, useEffect, useState } from 'react';
import { acceptedConsent, clearAnalyticsCookies, deniedConsent, getEffectiveConsent, persistConsent } from './consent.js';
import { forgetUniqueBrowser } from '../analytics/visitCounter.js';

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  const [choice, setChoice] = useState(getEffectiveConsent);
  const [isOpen, setIsOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    if (!choice.uniqueCounter) {
      void forgetUniqueBrowser().catch(() => {
        // The saved opt-out remains active. A later page load retries deletion.
      });
    }
  }, [choice.uniqueCounter]);

  const saveChoice = async (choices) => {
    const normalized = { ...deniedConsent, ...choices, yandexWebvisor: Boolean(choices.yandexMetrica && choices.yandexWebvisor) };
    const needsReload = Boolean(choice && (
      Object.keys(normalized).some((key) => choice[key] && !normalized[key]) ||
      (choice.yandexMetrica && !choice.yandexWebvisor && normalized.yandexWebvisor)
    ));

    const persistence = persistConsent(normalized);
    if (!persistence.saved) {
      setSaveStatus('saveError');
      return false;
    }

    if (needsReload) clearAnalyticsCookies(choice, normalized);
    setChoice(normalized);
    setIsOpen(false);
    setSaveStatus('saved');
    if (needsReload) window.setTimeout(() => window.location.reload(), 900);
    return true;
  };

  const openSettings = () => {
    setSaveStatus(null);
    setIsOpen(true);
  };

  const closeSettings = () => {
    setSaveStatus(null);
    setIsOpen(false);
  };

  return (
    <ConsentContext.Provider value={{ choice, isOpen, saveStatus, openSettings, closeSettings, saveChoice,
      dismissSaveStatus: () => setSaveStatus(null), reject: () => saveChoice(deniedConsent), acceptAll: () => saveChoice(acceptedConsent) }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error('useConsent must be used within ConsentProvider.');
  return context;
}
