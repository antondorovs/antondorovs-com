import profilePhoto from '../../assets/site/AntonDorovs.webp';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { renderRichText } from '../../shared/i18n/renderRichText.jsx';
import { SocialLinks } from './SocialLinks.jsx';
import './IntroSection.css';

export function IntroSection() {
  const copy = useSiteCopy();

  return (
    <section className="intro-section" aria-label={copy.intro.ariaLabel}>
      <div className="intro-section__identity">
        <img className="intro-section__photo" src={profilePhoto} alt={copy.intro.photoAlt} width="390" height="390" decoding="async" />
        <div className="intro-section__name">
          <h1>{copy.intro.name}</h1>
          <p>{renderRichText(copy.intro.follow)}</p>
        </div>
      </div>
      <SocialLinks />
    </section>
  );
}
