import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './AboutSection.css';

export function AboutSection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section about-section" id="about">
      <h2>{copy.about.title}</h2>
      <div className="about-section__copy">
        {copy.about.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
