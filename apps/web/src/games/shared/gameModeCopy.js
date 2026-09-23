const en = {
  play: 'Play', resume: 'Continue', pause: 'Pause', paused: 'Paused',
  fullscreen: 'Full screen', exitFullscreen: 'Exit full screen', fullscreenError: 'Full screen is unavailable. You can keep playing here.',
  snakeControls: ['Arrow keys / WASD', 'Swipe or use the direction buttons', 'Space — pause'],
  dinoControls: ['Space / ↑ / W', 'Tap the field to jump'], lifeControls: ['Set up the grid', 'Press Start to run the simulation'],
  start: 'Start', restart: 'Play again', gameOver: 'Game over', score: 'Score',
  record: 'Your best', generations: 'Generations', bestGenerations: 'Most generations', howToPlay: 'Controls',
  finish: 'Finish', startHint: 'Press Start or any other key to begin',
  descriptions: {
    snake: 'Collect food to grow your snake and earn points. Pass through the edges, but avoid your own tail.',
    dino: ['Jump over cacti and keep running.', 'Each obstacle you pass earns a point.'],
    'game-of-life': 'Create a pattern of living cells and watch it evolve. Open the Game of Life rules below for a detailed explanation.',
  },
  up: 'Up', down: 'Down', left: 'Left', right: 'Right', controls: 'Direction controls',
};
const ru = {
  play: 'Играть', resume: 'Продолжить', pause: 'Пауза', paused: 'На паузе',
  fullscreen: 'На весь экран', exitFullscreen: 'Свернуть экран', fullscreenError: 'Полноэкранный режим недоступен. Можно продолжить игру здесь.',
  snakeControls: ['Стрелки / WASD', 'Свайпы или кнопки направлений', 'Пробел — пауза'],
  dinoControls: ['Пробел / ↑ / W', 'Тап по полю для прыжка'], lifeControls: ['Настройте поле', 'Нажмите «Старт» для запуска симуляции'],
  start: 'Старт', restart: 'Начать заново', gameOver: 'Игра окончена', score: 'Счёт',
  record: 'Ваш рекорд', generations: 'Поколений', bestGenerations: 'Рекорд по числу поколений', howToPlay: 'Управление',
  finish: 'Закончить', startHint: 'Чтобы начать игру, нажмите «Старт» или любую другую клавишу',
  descriptions: {
    snake: 'Собирайте еду, чтобы змейка росла, и набирайте очки. Проходите сквозь края поля, но не врезайтесь в собственный хвост.',
    dino: ['Перепрыгивайте кактусы и продолжайте бежать.', 'Каждое пройденное препятствие приносит очко.'],
    'game-of-life': 'Создайте узор из живых клеток и наблюдайте за его развитием. Подробные правила доступны в раскрывающемся блоке Game of Life ниже.',
  },
  up: 'Вверх', down: 'Вниз', left: 'Влево', right: 'Вправо', controls: 'Управление направлением',
};

export function getGameModeCopy(language) {
  return language === 'ru' ? ru : en;
}
