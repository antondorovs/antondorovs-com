import { gameRoutes } from '../../app/routes.js';

import dinoImage from '../../assets/games/previews/dino.webp';
import flappyBirdImage from '../../assets/games/previews/flappy-bird.webp';
import gameOfLifeImage from '../../assets/games/previews/game-of-life.webp';
import snakeUnlimitedImage from '../../assets/games/previews/snake-unlimited.webp';

const gameImages = {
  dino: dinoImage,
  snake: snakeUnlimitedImage,
  'flappy-bird': flappyBirdImage,
  'game-of-life': gameOfLifeImage,
};

export const games = gameRoutes.map((game) => ({
  key: game.key,
  title: game.title,
  href: game.route,
  image: gameImages[game.key],
}));
