import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { emptyVisitCounts, getSiteVisitCounts } from '../analytics/visitCounter.js';

const visitPeriods = ['day', 'week', 'month', 'year', 'allTime'];

export function VisitCounter() {
  const { contentLanguageTag, copy, privacyCopy } = useLanguage();
  const [counts, setCounts] = useState(emptyVisitCounts);
  const formatter = useMemo(() => new Intl.NumberFormat(contentLanguageTag), [contentLanguageTag]);

  useEffect(() => {
    let isMounted = true;
    const onCounts = (event) => setCounts(event.detail);
    window.addEventListener('site-visit-counts', onCounts);

    getSiteVisitCounts().then((nextCounts) => {
      if (isMounted) {
        setCounts(nextCounts);
      }
    });

    return () => {
      isMounted = false;
      window.removeEventListener('site-visit-counts', onCounts);
    };
  }, []);

  return (
    <section className="site-footer__counter-block" aria-labelledby="visit-counter-title">
      {['uniqueBrowsers', 'pageViews'].map((kind) => (
        <div className="site-footer__counter-group" key={kind}>
          <p className="site-footer__counter-title" id={kind === 'uniqueBrowsers' ? 'visit-counter-title' : undefined}>
            {privacyCopy.counters[kind]}
          </p>
          <div className="site-footer__visit-counter" aria-label={copy.footer.visitCounter.ariaLabel}>
            {visitPeriods.map((period) => (
              <div className="site-footer__visit-period" key={period}>
                <span className="site-footer__visit-value">{formatter.format(counts[kind][period])}</span>
                <span className="site-footer__visit-label">{copy.footer.visitCounter.labels[period]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
