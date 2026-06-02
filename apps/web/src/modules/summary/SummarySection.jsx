import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './SummarySection.css';

export function SummarySection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section summary-section" aria-label={copy.summary.ariaLabel}>
      <p>
        {copy.summary.lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < copy.summary.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </section>
  );
}
