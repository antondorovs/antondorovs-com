import { gameRoutes } from '../../app/routes.js';

export const games = gameRoutes.map((game) => ({
  title: game.title,
  href: game.route,
}));
