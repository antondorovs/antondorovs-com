import { Header } from '../../modules/header/Header.jsx';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { useConsent } from '../../modules/privacy/ConsentProvider.jsx';
import './PrivacyPolicyPage.css';

function PolicySection({ section }) {
  return (
    <section className="privacy-policy-page__section">
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  );
}

export function PrivacyPolicyPage() {
  const copy = useSiteCopy();
  const { contentLanguageTag, contentLanguageDirection, privacyCopy } = useLanguage();
  const currentNotice = privacyCopy.notice;
  const { openSettings } = useConsent();

  return (
    <>
      <Header variant="simple" />
      <main className="privacy-policy-page">
        <article className="privacy-policy-page__content">
          <header className="privacy-policy-page__header">
            <h1>{copy.privacy.title}</h1>
            <p>{currentNotice.lastUpdated}</p>
          </header>

          {copy.privacy.sections.slice(0, 4).map((section) => <PolicySection key={section.title} section={section} />)}

          <section className="privacy-policy-page__section" lang={contentLanguageTag} dir={contentLanguageDirection}>
            <h2>{currentNotice.heading}</h2>
            {currentNotice.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <button type="button" className="privacy-policy-page__settings" onClick={openSettings}>
              {privacyCopy.banner.settings}
            </button>
          </section>

          {copy.privacy.sections.slice(6).map((section) => <PolicySection key={section.title} section={section} />)}
        </article>
      </main>
    </>
  );
}
