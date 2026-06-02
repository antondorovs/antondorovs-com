import { privacyPolicyRoute } from '../../app/routes.js';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { SocialLinks } from '../intro/SocialLinks.jsx';
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
    <footer className="site-footer" id="contacts">
      <section className="site-footer__contacts" aria-labelledby="site-footer-contacts-title">
        <h2 id="site-footer-contacts-title">{copy.footer.title}</h2>
        <p className="site-footer__contact-message">
          {copy.footer.message}
        </p>
        <a className="site-footer__email" href="mailto:antondorovs@gmail.com">
          antondorovs@gmail.com
        </a>
        <SocialLinks ariaLabel={copy.footer.socialAriaLabel} className="site-footer__social-links" />
      </section>

      <p className="site-footer__notice">
        <span>{copy.footer.notice.site}</span>
        <span>
          {copy.footer.notice.privacyPrefix}
          <a href={privacyPolicyRoute.route}>{copy.footer.notice.privacyLink}</a>
          {copy.footer.notice.privacySuffix}
        </span>
      </p>

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
