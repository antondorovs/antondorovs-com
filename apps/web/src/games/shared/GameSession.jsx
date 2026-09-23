import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../../shared/i18n/LanguageProvider.jsx';
import { GameIconButton } from './GameIconButton.jsx';
import playIcon from '../../assets/icons/game-play.svg?raw';
import pauseIcon from '../../assets/icons/game-pause.svg?raw';
import fullscreenIcon from '../../assets/icons/game-fullscreen.svg?raw';
import exitFullscreenIcon from '../../assets/icons/game-exit-fullscreen.svg?raw';
import { getGameModeCopy } from './gameModeCopy.js';
import { readGameRecord, saveGameRecord } from './gameRecords.js';
import './GameSession.css';

const GameSessionContext = createContext(null);
export const useGameSession = () => useContext(GameSessionContext);

const physicalKey = (event) => {
  if (/^Key[A-Z]$/.test(event.code)) return event.code.slice(3).toLowerCase();
  if (event.code === 'Space') return ' ';
  return event.key.toLowerCase();
};

// The field stays mounted in every mode so exiting never resets a round.
export function useGamePlay(onPlay, over = false, score = 0, onFinish = onPlay) {
  const { playHandlerRef, finishHandlerRef, setRound } = useGameSession();
  useEffect(() => {
    playHandlerRef.current = onPlay;
    return () => { playHandlerRef.current = null; };
  }, [onPlay, playHandlerRef]);
  useEffect(() => {
    finishHandlerRef.current = onFinish;
    return () => { finishHandlerRef.current = null; };
  }, [onFinish, finishHandlerRef]);
  useEffect(() => { setRound({ over, score, ready: true }); }, [over, score, setRound]);
}

export function useGameKeys(onKey, keys) {
  const { running } = useGameSession();
  useEffect(() => {
    if (!running) return undefined;
    const handleKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      const key = physicalKey(event);
      if (!keys.includes(key)) return;
      if (event.key === ' ' && event.target.closest('button')) return;
      event.preventDefault();
      onKey(key);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [running, onKey, keys]);
}

export function GameSession({ title, gameKey, children }) {
  const { contentLanguage } = useLanguage();
  const copy = getGameModeCopy(contentLanguage);
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [{ over: gameOver, score, ready }, setRound] = useState({ over: false, score: 0, ready: false });
  const [finishedRound, setFinishedRound] = useState(false);
  const [bestScore, setBestScore] = useState(() => readGameRecord(gameKey));
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const sessionRef = useRef(null);
  const fieldRef = useRef(null);
  const playButtonRef = useRef(null);
  const playHandlerRef = useRef(null);
  const finishHandlerRef = useRef(null);
  const cardButtonRef = useRef(null);
  const fullscreenPending = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;
  const roundOver = gameOver || finishedRound;
  const running = active && !paused && !roundOver;
  const playLabel = roundOver ? copy.restart : started ? copy.resume : copy.start;
  const controls = gameKey === 'snake' ? copy.snakeControls : gameKey === 'dino' ? copy.dinoControls : copy.lifeControls;
  const uiLanguage = contentLanguage === 'ru' ? 'ru' : 'en';
  const panelState = roundOver ? 'over' : started ? 'paused' : 'start';
  const showPanel = !running;
  const description = copy.descriptions[gameKey];

  useEffect(() => {
    if (roundOver) {
      const saved = saveGameRecord(gameKey, score);
      setBestScore((previous) => Math.max(previous, saved));
    }
  }, [gameKey, roundOver, score]);

  useEffect(() => {
    if (showPanel && ready && !document.activeElement?.closest('.site-header')) {
      cardButtonRef.current?.focus({ preventScroll: true });
    }
  }, [showPanel, panelState, ready]);

  useEffect(() => {
    if (!showPanel || !ready || panelState !== 'start') return undefined;
    const startOnAnyKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      if (['Tab', 'Escape'].includes(event.key) || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.target.closest('button') && event.key === 'Enter') return;
      event.preventDefault();
      play(physicalKey(event));
    };
    window.addEventListener('keydown', startOnAnyKey);
    return () => window.removeEventListener('keydown', startOnAnyKey);
  });

  useLayoutEffect(() => {
    if (!active) return undefined;
    const session = sessionRef.current;
    const root = document.documentElement;
    const body = document.body;
    const x = window.scrollX;
    const y = window.scrollY;
    const bodyStyles = Object.fromEntries(['position', 'top', 'left', 'width', 'overflow'].map((key) => [key, body.style[key]]));
    const rootStyles = { overflow: root.style.overflow, overscrollBehavior: root.style.overscrollBehavior };
    Object.assign(body.style, { position: 'fixed', top: `${-y}px`, left: `${-x}px`, width: '100%', overflow: 'hidden' });
    Object.assign(root.style, { overflow: 'hidden', overscrollBehavior: 'none' });
    return () => {
      Object.assign(body.style, bodyStyles);
      Object.assign(root.style, rootStyles);
      window.scrollTo({ left: x, top: y, behavior: 'instant' });
      if (document.fullscreenElement === session) document.exitFullscreen().catch(() => {});
    };
  }, [active]);

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) setPaused(true); };
    const onFullscreen = () => {
      setFullscreen(document.fullscreenElement === sessionRef.current);
      setPaused(true);
    };
    const onHeaderInteraction = (event) => {
      if (event.target.closest?.('.site-header')) setPaused(true);
    };
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('pointerdown', onHeaderInteraction, true);
    document.addEventListener('focusin', onHeaderInteraction);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('pointerdown', onHeaderInteraction, true);
      document.removeEventListener('focusin', onHeaderInteraction);
    };
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const onEscape = (event) => {
      if (event.key !== 'Escape' || event.target.closest?.('.site-header')) return;
      event.preventDefault();
      setPaused(true);
      if (document.fullscreenElement === sessionRef.current) {
        document.exitFullscreen().catch(() => setFullscreenError(true));
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [active]);

  useEffect(() => {
    if (!running || gameKey !== 'snake') return undefined;
    const pauseOnSpace = (event) => {
      if (physicalKey(event) !== ' ' || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target.closest('input, textarea, select, [contenteditable="true"], button')) return;
      event.preventDefault();
      setPaused(true);
    };
    window.addEventListener('keydown', pauseOnSpace, true);
    return () => window.removeEventListener('keydown', pauseOnSpace, true);
  }, [gameKey, running]);

  const play = (initialKey) => {
    if (!ready) return;
    if (roundOver) {
      finishHandlerRef.current?.();
      setFinishedRound(false);
      setRound((current) => ({ ...current, over: false, score: 0 }));
    } else {
      playHandlerRef.current?.(initialKey);
    }
    setStarted(true);
    setActive(true);
    setPaused(false);
    setFullscreenError(false);
    fieldRef.current?.focus({ preventScroll: true });
  };
  const togglePause = () => {
    if (running) {
      setPaused(true);
    } else {
      play();
    }
  };
  const finish = () => {
    if (panelState === 'paused') {
      setFinishedRound(true);
      return;
    }
    finishHandlerRef.current?.();
    setFinishedRound(false);
    setStarted(false);
    setActive(false);
    setPaused(true);
    setRound((current) => ({ ...current, over: false, score: 0 }));
  };
  const toggleFullscreen = async () => {
    setPaused(true);
    setFullscreenError(false);
    if (fullscreenPending.current) return;
    fullscreenPending.current = true;
    try {
      if (document.fullscreenElement === sessionRef.current) {
        await document.exitFullscreen();
      } else {
        setActive(true);
        await sessionRef.current.requestFullscreen();
        if (!activeRef.current || !sessionRef.current?.isConnected) await document.exitFullscreen();
      }
    } catch {
      setFullscreenError(true);
    } finally {
      fullscreenPending.current = false;
    }
  };

  return (
    <section className={`game-session game-session--${gameKey}${fullscreen ? ' game-session--fullscreen' : ''}`}
      ref={sessionRef} aria-label={title} data-active={active} data-paused={!running}>
      <div className="game-session__toolbar">
        <h1 className="game-session__title">{title}</h1>
        {ready && <div className="game-session__hud" aria-live="polite" lang={uiLanguage}>
          <span>{gameKey === 'game-of-life' ? copy.bestGenerations : copy.record}: <strong>{Math.max(bestScore, score)}</strong></span>
          <span>{gameKey === 'game-of-life' ? copy.generations : copy.score}: <strong>{score}</strong></span>
        </div>}
        <div className="game-session__actions" lang={uiLanguage}>
          <GameIconButton buttonRef={playButtonRef} onActivate={togglePause} onPause={() => setPaused(true)}
            disabled={!ready} label={running ? copy.pause : playLabel} icon={running ? pauseIcon : playIcon} />
          {document.fullscreenEnabled && <GameIconButton
            onActivate={toggleFullscreen} onPause={() => setPaused(true)}
            label={fullscreen ? copy.exitFullscreen : copy.fullscreen} aria-pressed={fullscreen}
            icon={fullscreen ? exitFullscreenIcon : fullscreenIcon} />}
        </div>
      </div>
      {fullscreenError && <p className="game-session__error" role="status" lang={uiLanguage}>{copy.fullscreenError}</p>}
      <div className="game-session__content" ref={fieldRef} tabIndex={-1} aria-label={title}>
        <GameSessionContext.Provider value={{ running, fullscreen, copy, fieldRef, playHandlerRef, finishHandlerRef, setRound }}>
          <div className="game-session__game" inert={!running ? true : undefined}>{children}</div>
        </GameSessionContext.Provider>
        {showPanel && <div className="game-session__overlay">
          <section className="game-session__card" role="dialog"
            aria-labelledby={panelState === 'over' ? undefined : 'game-panel-title'}
            aria-label={panelState === 'over' ? copy.gameOver : undefined}
            aria-describedby={panelState === 'over' ? undefined : 'game-panel-description game-panel-controls'}
            data-state={panelState} lang={uiLanguage}>
            {panelState !== 'over' && <>
              <h2 id="game-panel-title">{title}</h2>
              <p id="game-panel-description">
                {Array.isArray(description)
                  ? description.map((line) => <span className="game-session__description-line" key={line}>{line}</span>)
                  : description}
              </p>
              <div className="game-session__instructions" id="game-panel-controls">
                <h3>{copy.howToPlay}</h3>
                {controls.map((line) => <p key={line}>{line}</p>)}
              </div>
            </>}
            {panelState === 'start' && <div className="game-session__result">
              <p>{gameKey === 'game-of-life' ? copy.bestGenerations : copy.record}: <strong>{bestScore}</strong></p>
              <p className="game-session__start-hint">{copy.startHint}</p>
            </div>}
            {panelState === 'paused' && <div className="game-session__result" role="status">
              <p className="game-session__message">{copy.paused}</p>
              <p>{gameKey === 'game-of-life' ? copy.generations : copy.score}: <strong>{score}</strong></p>
              <p className="game-session__record">{gameKey === 'game-of-life' ? copy.bestGenerations : copy.record}: <strong>{Math.max(bestScore, score)}</strong></p>
            </div>}
            {panelState === 'over' && <div className="game-session__result" role="status">
              <p className="game-session__message">{copy.gameOver}</p>
              <p>{gameKey === 'game-of-life' ? copy.generations : copy.score}: <strong>{score}</strong></p>
              <p className="game-session__record">{gameKey === 'game-of-life' ? copy.bestGenerations : copy.record}: <strong>{Math.max(bestScore, score)}</strong></p>
            </div>}
            <div className="game-session__card-actions">
              <button className="game-session__primary" type="button" ref={cardButtonRef} disabled={!ready} onClick={() => play()}>{playLabel}</button>
              {panelState !== 'start' && <button type="button" onClick={finish}>{copy.finish}</button>}
            </div>
          </section>
        </div>}
      </div>
    </section>
  );
}
