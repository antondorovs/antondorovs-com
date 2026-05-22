import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage/HomePage.jsx';
import { GamePage } from '../pages/GamePage/GamePage.jsx';
import { AnalyticsScripts } from '../modules/analytics/AnalyticsScripts.jsx';
import { getGameByRoute } from './routes.js';

export function App() {
  const hash = useHashRoute();
  const game = getGameByRoute(hash);

  return (
    <>
      <AnalyticsScripts />
      {game ? <GamePage game={game} /> : <HomePage />}
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
