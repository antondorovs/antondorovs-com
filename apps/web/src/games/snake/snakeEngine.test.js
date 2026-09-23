import test from 'node:test';
import assert from 'node:assert/strict';
import { createSnake, stepSnake, turnSnake, swipeDirection } from './snakeEngine.js';

test('the snake waits for input and moves in the requested direction', () => {
  const initial = createSnake();
  assert.equal(stepSnake(initial), initial);
  assert.deepEqual(stepSnake(turnSnake(initial, 'up')).snake[0], { x: 9, y: 9 });
});

test('rapid inputs cannot reverse into the snake within one tick', () => {
  const moving = { ...createSnake(), direction: 'right' };
  assert.equal(turnSnake(moving, 'left'), moving);
  const queued = turnSnake(moving, 'up');
  assert.equal(turnSnake(queued, 'left'), queued);
  assert.equal(stepSnake(queued).direction, 'up');
});

test('food grows the snake and respawns outside its body', () => {
  const initial = { ...createSnake(), food: { x: 10, y: 10 }, direction: 'right' };
  const next = stepSnake(initial);
  assert.equal(next.snake.length, 2);
  assert.equal(next.score, 1);
  assert.ok(!next.snake.some((part) => part.x === next.food.x && part.y === next.food.y));
});

test('the snake wraps through field edges and only its body ends the game', () => {
  assert.deepEqual(stepSnake({ ...createSnake(), snake: [{ x: 17, y: 10 }], direction: 'right' }).snake[0], { x: 1, y: 10 });
  assert.deepEqual(stepSnake({ ...createSnake(), snake: [{ x: 9, y: 3 }], direction: 'up' }).snake[0], { x: 9, y: 17 });
  assert.equal(stepSnake({ ...createSnake(), snake: [{ x: 9, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 11 }], direction: 'right' }).over, true);
});

test('moving into the departing tail is allowed', () => {
  const game = { ...createSnake(), food: { x: 1, y: 3 }, snake: [{ x: 9, y: 10 }, { x: 9, y: 11 }, { x: 10, y: 11 }, { x: 10, y: 10 }], direction: 'right' };
  assert.equal(stepSnake(game).over, false);
});

test('swipes ignore jitter and use the dominant axis', () => {
  assert.equal(swipeDirection(3, -9), null);
  assert.equal(swipeDirection(40, 5), 'right');
  assert.equal(swipeDirection(-40, 5), 'left');
  assert.equal(swipeDirection(5, -40), 'up');
  assert.equal(swipeDirection(5, 40), 'down');
});
