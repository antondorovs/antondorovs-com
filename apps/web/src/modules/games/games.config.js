import { gameRoutes } from '../../app/routes.js';

export const games = gameRoutes.map((game) => ({
  key: game.key,
  title: game.title,
  href: game.route,
}));
