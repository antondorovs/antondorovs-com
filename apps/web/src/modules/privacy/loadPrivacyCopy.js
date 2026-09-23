import { consentCopy } from './consentCopy.js';
import { privacyNotice } from './privacyNotice.js';

const bundledCopy = {
  en: {
    banner: consentCopy.en,
    counters: { pageViews: 'Page loads', uniqueBrowsers: 'Unique browser' },
    notice: { lastUpdated: 'Last updated: 23 September 2026', ...privacyNotice.en },
  },
  ru: {
    banner: consentCopy.ru,
    counters: { pageViews: 'Загрузки страниц', uniqueBrowsers: 'Уникальные браузеры' },
    notice: { lastUpdated: 'Последнее обновление: 23 сентября 2026 года', ...privacyNotice.ru },
  },
};

const translations = import.meta.glob('./translations/*.json');

export async function loadPrivacyCopy(language) {
  if (bundledCopy[language]) return bundledCopy[language];

  const load = translations[`./translations/${language}.json`];
  if (!load) throw new Error(`Privacy translation is unavailable: ${language}`);

  const module = await load();
  return module.default;
}
