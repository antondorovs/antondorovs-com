import { Header } from '../../modules/header/Header.jsx';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './PrivacyPolicyPage.css';

export function PrivacyPolicyPage() {
  const copy = useSiteCopy();

  return (
    <>
      <Header variant="simple" />
      <main className="privacy-policy-page">
        <article className="privacy-policy-page__content">
          <header className="privacy-policy-page__header">
            <h1>{copy.privacy.title}</h1>
            <p>{copy.privacy.lastUpdated}</p>
          </header>

          {copy.privacy.sections.map((section) => (
            <section className="privacy-policy-page__section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
