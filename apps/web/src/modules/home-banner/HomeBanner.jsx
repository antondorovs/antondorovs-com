import wallImage from '../../assets/site/wall_quality.webp';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './HomeBanner.css';

export function HomeBanner() {
  const copy = useSiteCopy();

  return (
    <section className="home-banner" style={{ backgroundImage: `url(${wallImage})` }}>
      <p className="home-banner__text" dir="auto">
        {copy.homeBanner.greeting}
      </p>
    </section>
  );
}
