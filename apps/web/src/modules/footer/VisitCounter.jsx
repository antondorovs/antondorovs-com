import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { emptyVisitCounts, getSiteVisitCounts } from '../analytics/visitCounter.js';

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
    <div className="site-footer__visit-counter" aria-label={copy.footer.visitCounterAriaLabel}>
      <span>{formatter.format(counts.month)}</span>
      <span aria-hidden="true">/</span>
      <span>{formatter.format(counts.halfYear)}</span>
      <span aria-hidden="true">/</span>
      <span>{formatter.format(counts.allTime)}</span>
    </div>
  );
}
