import { Header } from '../../modules/header/Header.jsx';
import { Footer } from '../../modules/footer/Footer.jsx';
import { DinoGame } from '../../games/dino/DinoGame.jsx';
import { SnakeGame } from '../../games/snake/SnakeGame.jsx';
import { FlappyBirdGame } from '../../games/flappy-bird/FlappyBirdGame.jsx';
import { GameOfLife } from '../../games/game-of-life/GameOfLife.jsx';
import { SnakeUnlimitedGame } from '../../games/snake-unlimited/SnakeUnlimitedGame.jsx';
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

  return (
    <>
      <Header />
      <main className="game-page">
        <a className="game-page__home-link" href="/">
          Home
        </a>
        <h1>{game.title}</h1>
        <GameComponent />
      </main>
      <Footer />
    </>
  );
}
