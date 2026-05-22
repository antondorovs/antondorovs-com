import { Header } from '../../modules/header/Header.jsx';
import { HomeBanner } from '../../modules/home-banner/HomeBanner.jsx';
import { IntroSection } from '../../modules/intro/IntroSection.jsx';
import { SummarySection } from '../../modules/summary/SummarySection.jsx';
import { GamesSection } from '../../modules/games/GamesSection.jsx';
import { AboutSection } from '../../modules/about/AboutSection.jsx';
import { WorkSection } from '../../modules/work/WorkSection.jsx';
import { ContactSection } from '../../modules/contact/ContactSection.jsx';
import { Footer } from '../../modules/footer/Footer.jsx';

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeBanner />
        <IntroSection />
        <SummarySection />
        <GamesSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
