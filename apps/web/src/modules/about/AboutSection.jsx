import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';

export function AboutSection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section" id="about">
      <h2>{copy.about.title}</h2>
      <p>
        {copy.about.lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < copy.about.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </section>
  );
}
