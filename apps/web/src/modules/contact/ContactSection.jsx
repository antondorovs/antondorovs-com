import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { SocialLinks } from '../intro/SocialLinks.jsx';
import './ContactSection.css';

export function ContactSection() {
  const copy = useSiteCopy();

  return (
    <section className="content-section contact-section" id="contacts" aria-labelledby="contacts-title">
      <h2 id="contacts-title">{copy.footer.title}</h2>
      <p className="contact-section__message">{copy.footer.message}</p>
      <a className="contact-section__email" href="mailto:antondorovs@gmail.com">
        antondorovs@gmail.com
      </a>
      <SocialLinks ariaLabel={copy.footer.socialAriaLabel} className="contact-section__social-links" />
    </section>
  );
}
