import { useEffect, useRef } from 'react';
import groundImage from '../../assets/games/snake/ground.png';
import foodImage from '../../assets/games/snake/food.png';
import './SnakeGame.css';

const BOX = 32;
const BOARD_SIZE = 608;

export function SnakeGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const ground = new Image();
    const food = new Image();
    ground.src = groundImage;
    food.src = foodImage;

    let score = 0;
    let direction;
    let foodPosition = createFood();
    let snake = [{ x: 9 * BOX, y: 10 * BOX }];

    const onKeyDown = (event) => {
      if ((event.key === 'ArrowLeft' || event.key === 'a') && direction !== 'right') {
        direction = 'left';
      } else if ((event.key === 'ArrowUp' || event.key === 'w') && direction !== 'down') {
        direction = 'up';
      } else if ((event.key === 'ArrowRight' || event.key === 'd') && direction !== 'left') {
        direction = 'right';
      } else if ((event.key === 'ArrowDown' || event.key === 's') && direction !== 'up') {
        direction = 'down';
      }
    };

    const drawGame = () => {
      context.drawImage(ground, 0, 0);
      context.drawImage(food, foodPosition.x, foodPosition.y);

      snake.forEach((part, index) => {
        context.fillStyle = index === 0 ? 'green' : 'red';
        context.fillRect(part.x, part.y, BOX, BOX);
      });

      context.fillStyle = 'white';
      context.font = '50px Arial';
      context.fillText(score, BOX * 2.5, BOX * 1.7);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (snakeX === foodPosition.x && snakeY === foodPosition.y) {
        score += 1;
        foodPosition = createFood();
      } else {
        snake.pop();
      }

      if (snakeX < BOX || snakeX > BOX * 17 || snakeY < 3 * BOX || snakeY > BOX * 17) {
        window.clearInterval(gameLoop);
      }

      if (direction === 'left') snakeX -= BOX;
      if (direction === 'right') snakeX += BOX;
      if (direction === 'up') snakeY -= BOX;
      if (direction === 'down') snakeY += BOX;

      const newHead = { x: snakeX, y: snakeY };

      if (snake.some((part) => part.x === newHead.x && part.y === newHead.y)) {
        window.clearInterval(gameLoop);
      }

      snake.unshift(newHead);
    };

    document.addEventListener('keydown', onKeyDown);
    const gameLoop = window.setInterval(drawGame, 100);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearInterval(gameLoop);
    };
  }, []);

  return <canvas className="snake-game" ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} aria-label="Snake game board" />;
}

function createFood() {
  return {
    x: Math.floor(Math.random() * 17 + 1) * BOX,
    y: Math.floor(Math.random() * 15 + 3) * BOX,
  };
}
