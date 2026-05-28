import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage/HomePage.jsx';
import { GamePage } from '../pages/GamePage/GamePage.jsx';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx';
import { AnalyticsScripts } from '../modules/analytics/AnalyticsScripts.jsx';
import { getGameByRoute, isPrivacyPolicyRoute } from './routes.js';

export function App() {
  const hash = useHashRoute();
  const game = getGameByRoute(hash);
  const isPrivacyPolicy = isPrivacyPolicyRoute(hash);

  useEffect(() => {
    if (game || isPrivacyPolicy) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [game, isPrivacyPolicy]);

  return (
    <>
      <AnalyticsScripts />
      {isPrivacyPolicy ? <PrivacyPolicyPage /> : game ? <GamePage game={game} /> : <HomePage />}
    </>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}
