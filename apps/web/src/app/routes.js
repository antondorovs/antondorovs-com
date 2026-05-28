export const navItems = [
  { label: 'HOME', href: '#up', scrollToTop: true },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'GAMES', href: '#games' },
  { label: 'CONTACTS', href: '#contacts' },
  { label: 'SIGN IN', href: '#up', scrollToTop: true },
];

export const privacyPolicyRoute = {
  key: 'privacy-policy',
  title: 'Privacy Policy & Legal Notice',
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
