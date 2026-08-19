export const navItems = [
  { key: 'home', href: '#up', scrollToTop: true },
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'contacts', href: '#contacts' },
  { key: 'games', href: '#games' },
  { key: 'signIn', href: '#up', scrollToTop: true },
];

export const privacyPolicyRoute = {
  key: 'privacy-policy',
  route: '#/privacy-policy',
};

export const gameRoutes = [
  {
    key: 'dino',
    title: 'Dino',
    route: '#/games/dino',
  },
  {
    key: 'snake',
    title: 'Snake',
    route: '#/games/snake',
  },
  {
    key: 'flappy-bird',
    title: 'Flappy Bird',
    route: '#/games/flappy-bird',
  },
  {
    key: 'game-of-life',
    title: 'Game of Life',
    route: '#/games/game-of-life',
  },
  {
    key: 'snake-unlimited',
    title: 'Snake unlimited',
    route: '#/games/snake-unlimited',
  },
];

export function getGameByRoute(hash) {
  return gameRoutes.find((game) => game.route === hash);
}

export function isPrivacyPolicyRoute(hash) {
  return hash === privacyPolicyRoute.route;
}
