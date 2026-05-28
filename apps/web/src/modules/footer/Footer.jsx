import { privacyPolicyRoute } from '../../app/routes.js';
import { SocialLinks } from '../intro/SocialLinks.jsx';
import './Footer.css';

const environmentLinks = [
  {
    label: 'Production',
    href: 'https://antondorovs.com/',
  },
  {
    label: 'Development',
    href: 'https://dev.antondorovs.com',
  },
];

export function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <section className="site-footer__contacts" aria-labelledby="site-footer-contacts-title">
        <h2 id="site-footer-contacts-title">CONTACTS</h2>
        <p className="site-footer__contact-message">
          For any questions, you can contact me by email or through the social links below.
        </p>
        <a className="site-footer__email" href="mailto:antondorovs@gmail.com">
          antondorovs@gmail.com
        </a>
        <SocialLinks ariaLabel="Footer contact social links" className="site-footer__social-links" />
      </section>

      <p className="site-footer__notice">
        <span>Personal non-commercial site.</span>
        <span>
          Read the <a href={privacyPolicyRoute.route}>Privacy & Legal</a> notice for details.
        </span>
      </p>

      <div className="site-footer__environments">
        <p className="site-footer__env-title">ENVIRONMENTS</p>
        <nav className="site-footer__env-links" aria-label="Environment links">
          {environmentLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
