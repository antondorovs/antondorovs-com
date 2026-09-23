import { useCallback, useEffect, useRef, useState } from 'react';
import groundImage from '../../assets/games/snake/ground.png';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { useGameKeys, useGamePlay, useGameSession } from '../shared/GameSession.jsx';
import { createSnake, stepSnake, turnSnake, swipeDirection } from './snakeEngine.js';
import './SnakeGame.css';

const KEYS = ['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'a', 'd', 'w', 's'];
const DIRECTIONS = { arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right', arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down' };
const BOX = 32;

export function SnakeGame() {
  const canvasRef = useRef(null);
  const pointerRef = useRef(null);
  const imagesRef = useRef({});
  const [imageVersion, setImageVersion] = useState(0);
  const [game, setGame] = useState(createSnake);
  const { running, copy } = useGameSession();
  const siteCopy = useSiteCopy();
  const turn = useCallback((direction) => setGame((current) => turnSnake(current, direction)), []);
  const onKey = useCallback((key) => turn(DIRECTIONS[key]), [turn]);
  useGameKeys(onKey, KEYS);
  const resetGame = useCallback(() => setGame(createSnake()), []);
  useGamePlay((initialKey) => {
    if (game.over) resetGame();
    if (KEYS.includes(initialKey)) turn(DIRECTIONS[initialKey]);
  }, game.over, game.score, resetGame);

  useEffect(() => {
    const ground = new Image();
    ground.onload = () => setImageVersion((value) => value + 1);
    ground.src = groundImage;
    imagesRef.current = { ground };
    return () => { ground.onload = null; };
  }, []);

  useEffect(() => {
    if (!running || game.over) return undefined;
    const timer = window.setInterval(() => setGame(stepSnake), 130);
    return () => window.clearInterval(timer);
  }, [running, game.over]);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    const { ground } = imagesRef.current;
    context.fillStyle = '#b4d15b';
    context.fillRect(0, 0, 608, 608);
    if (ground?.complete && ground.naturalWidth) context.drawImage(ground, 0, 0);
    if (game.food) {
      context.font = '27px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(game.food.emoji ?? '🥕', game.food.x * BOX + BOX / 2, game.food.y * BOX + BOX / 2);
    }
    game.snake.forEach((part, index) => {
      context.fillStyle = index === 0 ? '#175c20' : '#d33131';
      context.fillRect(part.x * BOX, part.y * BOX, BOX, BOX);
    });
    context.fillStyle = 'white';
    context.font = '50px Arial';
    context.textAlign = 'start';
    context.textBaseline = 'alphabetic';
    context.fillText(game.score, BOX * 2.5, BOX * 1.7);
  }, [game, imageVersion]);

  useEffect(() => { if (!running) pointerRef.current = null; }, [running]);

  return (
    <section className="snake-layout">
      <div className="snake-layout__board">
        <canvas className="snake-game" ref={canvasRef} width={608} height={608} tabIndex={0}
          aria-label={siteCopy.games.snakeUnlimitedBoardLabel ?? siteCopy.games.snakeBoardLabel}
          onPointerDown={(event) => {
            if (!running || !event.isPrimary || event.button !== 0) return;
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            pointerRef.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
          }}
          onPointerMove={(event) => {
            const start = pointerRef.current;
            if (!running || !start || start.id !== event.pointerId) return;
            const direction = swipeDirection(event.clientX - start.x, event.clientY - start.y);
            if (direction) {
              turn(direction);
              pointerRef.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
            }
          }}
          onPointerUp={() => { pointerRef.current = null; }}
          onPointerCancel={() => { pointerRef.current = null; }}
          onLostPointerCapture={() => { pointerRef.current = null; }} />
      </div>
      <div className="snake-directions" role="group" aria-label={copy.controls}>
        {[['up', '↑'], ['left', '←'], ['down', '↓'], ['right', '→']].map(([direction, arrow]) => (
          <button key={direction} className={`snake-directions__${direction}`} type="button" aria-label={copy[direction]}
            onClick={() => { if (running) turn(direction); }}>{arrow}</button>
        ))}
      </div>
    </section>
  );
}
