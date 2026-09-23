import { useCallback, useEffect, useRef, useState } from 'react';
import cactusOne from '../../assets/games/dino/cactus1.png';
import cactusTwo from '../../assets/games/dino/cactus2.png';
import cloudImage from '../../assets/games/dino/cloud.PNG';
import dinoRunOne from '../../assets/games/dino/main-character1.png';
import dinoRunTwo from '../../assets/games/dino/main-character2.png';
import dinoJump from '../../assets/games/dino/main-character3.png';
import landOne from '../../assets/games/dino/land1.png';
import landTwo from '../../assets/games/dino/land2.png';
import landThree from '../../assets/games/dino/land3.png';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import { useGameKeys, useGamePlay, useGameSession } from '../shared/GameSession.jsx';
import './DinoGame.css';

const KEYS = [' ', 'arrowup', 'w'];
const groundImages = [landOne, landTwo, landThree];
const cactusImages = [cactusOne, cactusTwo];
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
let nextObstacleId = 0;

const createObstacle = () => ({ id: nextObstacleId += 1, image: randomItem(cactusImages) });
const createGroundPattern = () => {
  const pattern = [];
  while (pattern.length < 12) {
    const choices = groundImages.filter((image) => image !== pattern.at(-1));
    pattern.push(randomItem(choices));
  }
  if (pattern.at(-1) === pattern[0]) {
    pattern[pattern.length - 1] = randomItem(groundImages.filter((image) => image !== pattern[0] && image !== pattern.at(-2)));
  }
  return pattern;
};

export function DinoGame() {
  const dinoRef = useRef(null);
  const stageRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState(0);
  const [groundPattern, setGroundPattern] = useState(createGroundPattern);
  const [obstacles, setObstacles] = useState(() => [createObstacle()]);
  const copy = useSiteCopy();
  const { running } = useGameSession();
  const jump = useCallback(() => {
    if (running && !isGameOver) setIsJumping(true);
  }, [running, isGameOver]);
  useGameKeys(jump, KEYS);

  useEffect(() => {
    if (!running || isGameOver) return undefined;
    const intervalId = window.setInterval(() => {
      const dino = dinoRef.current.getBoundingClientRect();
      const cacti = stageRef.current.querySelectorAll('.dino-game__cactus');
      const collision = [...cacti].some((cactusElement) => {
        const cactus = cactusElement.getBoundingClientRect();
        return dino.right + 4 > cactus.left && dino.left + 6 < cactus.right - 3
          && dino.bottom - 3 > cactus.top + 3 && dino.top + 3 < cactus.bottom;
      });
      if (collision) {
        setIsGameOver(true);
      }
    }, 16);
    return () => window.clearInterval(intervalId);
  }, [running, isGameOver]);

  useEffect(() => {
    if (!running || isGameOver) return undefined;
    let timeoutId;
    const scheduleObstacle = () => {
      const delay = 1400 + Math.random() * 1200;
      timeoutId = window.setTimeout(() => {
        setObstacles((current) => current.length < 3 ? [...current, createObstacle()] : current);
        scheduleObstacle();
      }, delay);
    };
    scheduleObstacle();
    return () => window.clearTimeout(timeoutId);
  }, [running, isGameOver]);

  const restartGame = useCallback(() => {
    setScore(0);
    setIsJumping(false);
    setIsGameOver(false);
    setRound((value) => value + 1);
    setGroundPattern(createGroundPattern());
    setObstacles([createObstacle()]);
  }, []);
  const startGame = useCallback((initialKey) => {
    if (isGameOver) restartGame();
    if (KEYS.includes(initialKey)) setIsJumping(true);
  }, [isGameOver, restartGame]);
  useGamePlay(startGame, isGameOver, score, restartGame);

  return (
    <section className="dino-game" aria-label={copy.games.dino.ariaLabel}>
      <div key={round} ref={stageRef} className={`dino-game__stage ${!running || isGameOver ? 'dino-game__stage--paused' : ''}`}
        tabIndex={0} aria-label={copy.games.dino.ariaLabel}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          event.currentTarget.focus({ preventScroll: true });
          jump();
        }}>
        <div className="dino-game__ground">
          {[...groundPattern, ...groundPattern].map((image, index) => (
            <span className="dino-game__ground-segment" style={{ backgroundImage: `url(${image})` }}
              key={`${index}-${image}`} />
          ))}
        </div>
        <div className="dino-game__cloud" style={{ backgroundImage: `url(${cloudImage})` }} />
        <div ref={dinoRef} className={`dino-game__dino ${isJumping ? 'dino-game__dino--jump' : ''}`}
          style={{ '--dino-run-one': `url(${dinoRunOne})`, '--dino-run-two': `url(${dinoRunTwo})`, '--dino-jump': `url(${dinoJump})` }}
          onAnimationEnd={() => setIsJumping(false)} />
        {obstacles.map((obstacle) => <div key={obstacle.id}
          className={`dino-game__cactus ${obstacle.image === cactusTwo ? 'dino-game__cactus--cluster' : ''}`}
          style={{ backgroundImage: `url(${obstacle.image})` }}
          onAnimationEnd={() => {
            if (!running || isGameOver) return;
            setScore((current) => current + 1);
            setObstacles((current) => current.filter(({ id }) => id !== obstacle.id));
          }} />)}
      </div>
    </section>
  );
}
