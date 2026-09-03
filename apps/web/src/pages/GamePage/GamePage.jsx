import { Header } from '../../modules/header/Header.jsx';
import { DinoGame } from '../../games/dino/DinoGame.jsx';
import { SnakeGame } from '../../games/snake/SnakeGame.jsx';
import { FlappyBirdGame } from '../../games/flappy-bird/FlappyBirdGame.jsx';
import { GameOfLife } from '../../games/game-of-life/GameOfLife.jsx';
import { SnakeUnlimitedGame } from '../../games/snake-unlimited/SnakeUnlimitedGame.jsx';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './GamePage.css';

const gameComponents = {
  dino: DinoGame,
  snake: SnakeGame,
  'flappy-bird': FlappyBirdGame,
  'game-of-life': GameOfLife,
  'snake-unlimited': SnakeUnlimitedGame,
};

export function GamePage({ game }) {
  const GameComponent = gameComponents[game.key];
  const copy = useSiteCopy();

  return (
    <>
      <Header centerLinkKey="games" variant="simple" />
      <main className="game-page" dir="ltr">
        <h1>{copy.games.titles[game.key] ?? game.title}</h1>
        <GameComponent />
      </main>
    </>
  );
}
