import wallImage from '../../assets/site/wall_quality.PNG';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './HomeBanner.css';

export function HomeBanner() {
  const copy = useSiteCopy();

  return (
    <section className="home-banner" style={{ backgroundImage: `url(${wallImage})` }}>
      <p className="home-banner__text">
        {copy.homeBanner.greeting}
        <br />
        {copy.homeBanner.role}
      </p>
    </section>
  );
}
