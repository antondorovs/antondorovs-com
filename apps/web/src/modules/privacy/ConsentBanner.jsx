import { useEffect, useState } from 'react';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useConsent } from './ConsentProvider.jsx';
import './ConsentBanner.css';

export function ConsentBanner() {
  const { contentLanguageTag, contentLanguageDirection, privacyCopy } = useLanguage();
  const { choice, isOpen, saveStatus, dismissSaveStatus, closeSettings, saveChoice, reject, acceptAll } = useConsent();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [draft, setDraft] = useState(choice);
  const copy = privacyCopy.banner;

  useEffect(() => {
    if (isOpen) {
      setDraft(choice);
      setIsCustomizing(false);
    }
  }, [isOpen, choice]);

  useEffect(() => {
    if (saveStatus !== 'saved') return undefined;
    const timeoutId = window.setTimeout(dismissSaveStatus, 3000);
    return () => window.clearTimeout(timeoutId);
  }, [dismissSaveStatus, saveStatus]);

  const statusText = saveStatus === 'saved' ? copy.saved : saveStatus === 'saveError' ? copy.saveError : '';

  if (!isOpen) {
    return statusText ? (
      <div className="consent-banner" lang={contentLanguageTag} dir={contentLanguageDirection}>
        <p className="consent-banner__feedback-card" role="status">{statusText}</p>
      </div>
    ) : null;
  }

  const toggle = (key) => setDraft((current) => ({ ...current, [key]: !current[key] }));

  return (
    <section className="consent-banner" lang={contentLanguageTag} dir={contentLanguageDirection} aria-labelledby="consent-title">
      <div className={`consent-banner__content${isCustomizing ? ' consent-banner__content--expanded' : ''}`}>
        <button type="button" className="consent-banner__close" aria-label={copy.close} title={copy.close} onClick={closeSettings}>
          <span className="consent-banner__close-glyph" aria-hidden="true" />
        </button>
        <h2 id="consent-title">{copy.title}</h2>
        <p>{copy.description}</p>
        {statusText && <p className="consent-banner__status" role="alert">{statusText}</p>}
        {isCustomizing && (
          <div className="consent-banner__options">
            <p className="consent-banner__options-title">{copy.optionsTitle}</p>
            {['uniqueCounter', 'googleAnalytics', 'yandexMetrica', 'yandexWebvisor', 'microsoftClarity'].map((key) => (
              <label className="consent-banner__option" key={key}>
                <input type="checkbox" checked={Boolean(draft[key] && (key !== 'yandexWebvisor' || draft.yandexMetrica))} disabled={key === 'yandexWebvisor' && !draft.yandexMetrica} onChange={() => toggle(key)} />
                <span>{copy.options[key]}</span>
              </label>
            ))}
            <button type="button" className="consent-banner__save" onClick={() => saveChoice(draft)}>{copy.save}</button>
          </div>
        )}
        <div className="consent-banner__actions">
          <button type="button" onClick={() => setIsCustomizing((current) => !current)}>{copy.customize}</button>
          <div className="consent-banner__reject-group">
            <button type="button" aria-describedby="consent-decline-tooltip" onClick={reject}>{copy.reject}</button>
            <span className="consent-banner__tooltip" id="consent-decline-tooltip" role="tooltip">{copy.rejectHelp}</span>
          </div>
          <button type="button" className="consent-banner__accept" onClick={acceptAll}>{copy.accept}</button>
        </div>
      </div>
    </section>
  );
}
