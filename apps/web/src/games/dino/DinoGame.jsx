import { useEffect, useRef, useState } from 'react';
import cactusImage from '../../assets/games/dino/cactus1.png';
import cloudImage from '../../assets/games/dino/cloud.PNG';
import dinoRunOne from '../../assets/games/dino/main-character1.png';
import dinoRunTwo from '../../assets/games/dino/main-character2.png';
import dinoJump from '../../assets/games/dino/main-character3.png';
import landOne from '../../assets/games/dino/land1.png';
import landTwo from '../../assets/games/dino/land2.png';
import landThree from '../../assets/games/dino/land3.png';
import './DinoGame.css';

const groundImages = [landOne, landTwo, landThree];

export function DinoGame() {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  const groundRef = useRef(null);
  const hasScoredRef = useRef(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleStageKeyDown = (event) => {
    if (event.key !== ' ' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();

    if (!isJumping && !isGameOver) {
      setIsJumping(true);
    }
  };

  useEffect(() => {
    if (isGameOver) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      const dino = dinoRef.current;
      const cactus = cactusRef.current;
      const ground = groundRef.current;

      if (!dino || !cactus || !ground) {
        return;
      }

      const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'), 10);
      const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'), 10);
      const groundLeft = parseInt(window.getComputedStyle(ground).getPropertyValue('left'), 10);

      if (groundLeft < -50) {
        ground.style.left = '800px';
        ground.style.backgroundImage = `url(${groundImages[Math.floor(Math.random() * groundImages.length)]})`;
      } else {
        ground.style.left = `${groundLeft - 3}px`;
      }

      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 95) {
        setIsGameOver(true);
        return;
      }

      if (cactusLeft > 680 && !hasScoredRef.current) {
        setScore((current) => current + 1);
        hasScoredRef.current = true;
      } else if (cactusLeft < 680) {
        hasScoredRef.current = false;
      }
    }, 10);

    return () => window.clearInterval(intervalId);
  }, [isGameOver]);

  const restartGame = () => {
    setScore(0);
    setIsJumping(false);
    setIsGameOver(false);
    hasScoredRef.current = false;
  };

  return (
    <section className="dino-game" aria-label="Dino game">
      <div className="dino-game__score">Score: {score}</div>
      {isGameOver && (
        <div className="dino-game__status">
          <p>Game over. Your score is {score}.</p>
          <button type="button" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
      <div
        className={`dino-game__stage ${isGameOver ? 'dino-game__stage--paused' : ''}`}
        tabIndex={0}
        onKeyDown={handleStageKeyDown}
      >
        <div
          ref={groundRef}
          className="dino-game__ground"
          style={{ backgroundImage: `url(${landOne})` }}
        />
        <div className="dino-game__cloud" style={{ backgroundImage: `url(${cloudImage})` }} />
        <div
          ref={dinoRef}
          className={`dino-game__dino ${isJumping ? 'dino-game__dino--jump' : ''}`}
          style={{
            '--dino-run-one': `url(${dinoRunOne})`,
            '--dino-run-two': `url(${dinoRunTwo})`,
            '--dino-jump': `url(${dinoJump})`,
          }}
          onAnimationEnd={() => setIsJumping(false)}
        />
        <div ref={cactusRef} className="dino-game__cactus" style={{ backgroundImage: `url(${cactusImage})` }} />
      </div>
    </section>
  );
}
