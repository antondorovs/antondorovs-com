import wallImage from '../../../../../img/wall_quality.PNG';
import './HomeBanner.css';

export function HomeBanner() {
  return (
    <section className="home-banner" style={{ backgroundImage: `url(${wallImage})` }}>
      <p className="home-banner__text">
        Hi, I&apos;m Anton
        <br />
        Full Stack QA Engineer
      </p>
    </section>
  );
}
