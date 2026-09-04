import { Header } from '../../modules/header/Header.jsx';
import { lazy, Suspense } from 'react';
import { LoadingIndicator, LoadErrorBoundary } from '../../shared/ui/DeferredContent.jsx';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './GamePage.css';

const gameComponents = {
  dino: lazy(() => import('../../games/dino/DinoGame.jsx').then((m) => ({ default: m.DinoGame }))),
  snake: lazy(() => import('../../games/snake/SnakeGame.jsx').then((m) => ({ default: m.SnakeGame }))),
  'flappy-bird': lazy(() => import('../../games/flappy-bird/FlappyBirdGame.jsx').then((m) => ({ default: m.FlappyBirdGame }))),
  'game-of-life': lazy(() => import('../../games/game-of-life/GameOfLife.jsx').then((m) => ({ default: m.GameOfLife }))),
  'snake-unlimited': lazy(() => import('../../games/snake-unlimited/SnakeUnlimitedGame.jsx').then((m) => ({ default: m.SnakeUnlimitedGame }))),
};

export function GamePage({ game }) {
  const GameComponent = gameComponents[game.key];
  const copy = useSiteCopy();

  return (
    <>
      <Header centerLinkKey="games" variant="simple" />
      <main className="game-page" dir="ltr">
        <h1>{copy.games.titles[game.key] ?? game.title}</h1>
        <LoadErrorBoundary key={game.key}>
          <Suspense fallback={<LoadingIndicator />}>
            <GameComponent />
          </Suspense>
        </LoadErrorBoundary>
      </main>
    </>
  );
}
