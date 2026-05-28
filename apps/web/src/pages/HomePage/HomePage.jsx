import { Header } from '../../modules/header/Header.jsx';
import { HomeBanner } from '../../modules/home-banner/HomeBanner.jsx';
import { IntroSection } from '../../modules/intro/IntroSection.jsx';
import { SummarySection } from '../../modules/summary/SummarySection.jsx';
import { AboutSection } from '../../modules/about/AboutSection.jsx';
import { ExperienceSection } from '../../modules/experience/ExperienceSection.jsx';
import { GamesSection } from '../../modules/games/GamesSection.jsx';
import { Footer } from '../../modules/footer/Footer.jsx';

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeBanner />
        <IntroSection />
        <SummarySection />
        <AboutSection />
        <ExperienceSection />
        <GamesSection />
      </main>
      <Footer />
    </>
  );
}
