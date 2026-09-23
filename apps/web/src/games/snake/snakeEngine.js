const vectors = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const opposite = { left: 'right', right: 'left', up: 'down', down: 'up' };
const foodEmoji = ['🥕', '🍎', '🍓', '🍒', '🍇', '🍉', '🍌', '🍍', '🥝', '🍑'];
const same = (a, b) => a.x === b.x && a.y === b.y;

function createFood(snake) {
  const empty = [];
  for (let x = 1; x <= 17; x += 1) {
    for (let y = 3; y <= 17; y += 1) {
      if (!snake.some((part) => same(part, { x, y }))) empty.push({ x, y });
    }
  }
  const position = empty[Math.floor(Math.random() * empty.length)];
  return position ? { ...position, emoji: foodEmoji[Math.floor(Math.random() * foodEmoji.length)] } : null;
}

export function createSnake() {
  const snake = [{ x: 9, y: 10 }];
  return { snake, food: createFood(snake), score: 0, direction: null, nextDirection: null, over: false };
}

export function turnSnake(game, direction) {
  if (game.over || !vectors[direction] || direction === game.direction || game.nextDirection || opposite[game.direction] === direction) return game;
  return { ...game, nextDirection: direction };
}

export function stepSnake(game) {
  const direction = game.nextDirection ?? game.direction;
  if (game.over || !direction) return game;
  const [dx, dy] = vectors[direction];
  const nextX = game.snake[0].x + dx;
  const nextY = game.snake[0].y + dy;
  const head = {
    x: nextX < 1 ? 17 : nextX > 17 ? 1 : nextX,
    y: nextY < 3 ? 17 : nextY > 17 ? 3 : nextY,
  };
  const eating = game.food && same(head, game.food);
  const body = eating ? game.snake : game.snake.slice(0, -1);
  if (body.some((part) => same(part, head))) {
    return { ...game, over: true };
  }
  const snake = [head, ...body];
  const food = eating ? createFood(snake) : game.food;
  return { snake, food, direction, nextDirection: null, score: game.score + Number(Boolean(eating)), over: !food };
}

export function swipeDirection(dx, dy) {
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return null;
  return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
}
