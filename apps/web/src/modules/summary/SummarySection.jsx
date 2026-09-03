import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './SummarySection.css';

export function SummarySection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section summary-section" aria-label={copy.summary.ariaLabel}>
      <div className="summary-section__copy">
        {copy.summary.lines.map((line) => (
          <p key={line} dir="auto">{line}</p>
        ))}
      </div>
    </section>
  );
}
