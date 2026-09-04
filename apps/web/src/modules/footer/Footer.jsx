import { privacyPolicyRoute } from '../../app/routes.js';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { VisitCounter } from './VisitCounter.jsx';
import './Footer.css';

const environmentLinks = [
  {
    key: 'production',
    label: 'Production',
    href: 'https://antondorovs.com/',
  },
  {
    key: 'development',
    label: 'Development',
    href: 'https://dev.antondorovs.com',
  },
];

export function Footer() {
  const copy = useSiteCopy();

  return (
    <footer className="site-footer">
      <p className="site-footer__notice">
        <span dir="auto">{copy.footer.notice.site}</span>
        <span dir="auto">{copy.footer.notice.privacyPrefix.trim()}</span>
        <span dir="auto">
          <a href={privacyPolicyRoute.route}>{copy.footer.notice.privacyLink}</a>
          {copy.footer.notice.privacySuffix}
        </span>
      </p>

      <VisitCounter />

      <div className="site-footer__environments">
        <p className="site-footer__env-title">{copy.footer.environmentsTitle}</p>
        <nav className="site-footer__env-links" aria-label={copy.footer.environmentsAriaLabel}>
          {environmentLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {copy.footer.environments[link.key] ?? link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
