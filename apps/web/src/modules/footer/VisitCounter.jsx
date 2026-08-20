import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { emptyVisitCounts, getSiteVisitCounts } from '../analytics/visitCounter.js';

const visitPeriods = ['day', 'week', 'month', 'threeMonths', 'halfYear', 'year', 'allTime'];

export function VisitCounter() {
  const { contentLanguageTag, copy } = useLanguage();
  const [counts, setCounts] = useState(emptyVisitCounts);
  const formatter = useMemo(() => new Intl.NumberFormat(contentLanguageTag), [contentLanguageTag]);

  useEffect(() => {
    let isMounted = true;

    getSiteVisitCounts().then((nextCounts) => {
      if (isMounted) {
        setCounts(nextCounts);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="site-footer__visit-counter" aria-label={copy.footer.visitCounter.ariaLabel}>
      {visitPeriods.map((period) => (
        <div className="site-footer__visit-period" key={period}>
          <span className="site-footer__visit-value">{formatter.format(counts[period])}</span>
          <span className="site-footer__visit-label">{copy.footer.visitCounter.labels[period]}</span>
        </div>
      ))}
    </div>
  );
}
