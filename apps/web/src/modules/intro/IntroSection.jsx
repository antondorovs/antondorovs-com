import profilePhoto from '../../../../../img/AntonDorovs.png';
import { SocialLinks } from './SocialLinks.jsx';
import './IntroSection.css';

export function IntroSection() {
  return (
    <section className="intro-section" aria-label="Profile introduction">
      <div className="intro-section__identity">
        <img className="intro-section__photo" src={profilePhoto} alt="Anton Dorovskikh" />
        <div className="intro-section__name">
          <h1>Anton Dorovskikh</h1>
          <p>
            follow me <strong>@antondorovs</strong>
          </p>
        </div>
      </div>
      <SocialLinks />
    </section>
  );
}
