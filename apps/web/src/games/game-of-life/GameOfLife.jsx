import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage, useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './GameOfLife.css';
import { useGamePlay, useGameSession } from '../shared/GameSession.jsx';

const fieldSizes = [10, 15, 20, 42];
const patterns = {
  glider: {
    width: 3, height: 3,
    cells: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
  },
  spaceship: {
    width: 5, height: 4,
    cells: [[0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]],
  },
  pulsar: {
    width: 13, height: 13,
    cells: [
      [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
      [2, 0], [2, 5], [2, 7], [2, 12], [3, 0], [3, 5], [3, 7], [3, 12], [4, 0], [4, 5], [4, 7], [4, 12],
      [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
      [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
      [8, 0], [8, 5], [8, 7], [8, 12], [9, 0], [9, 5], [9, 7], [9, 12], [10, 0], [10, 5], [10, 7], [10, 12],
      [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10],
    ],
  },
  gliderGun: {
    width: 36, height: 9,
    cells: [
      [4, 0], [4, 1], [5, 0], [5, 1],
      [4, 10], [5, 10], [6, 10], [3, 11], [7, 11], [2, 12], [8, 12], [2, 13], [8, 13], [5, 14],
      [3, 15], [7, 15], [4, 16], [5, 16], [6, 16], [5, 17],
      [2, 20], [3, 20], [4, 20], [2, 21], [3, 21], [4, 21], [1, 22], [5, 22],
      [0, 24], [1, 24], [5, 24], [6, 24],
      [2, 34], [3, 34], [2, 35], [3, 35],
    ],
  },
};

export function GameOfLife() {
  const [fieldSize, setFieldSize] = useState(20);
  const [cycleTime, setCycleTime] = useState(0.5);
  const [grid, setGrid] = useState(() => createEmptyGrid(20, 20));
  const [cycleCounter, setCycleCounter] = useState(0);
  const [status, setStatus] = useState('');
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('');
  const { running, fullscreen } = useGameSession();
  const { contentLanguage } = useLanguage();
  const copy = useSiteCopy();
  const patternCopy = contentLanguage === 'ru' ? {
    summary: 'Описание и правила', intro: 'Попробуйте готовые комбинации, которые движутся или повторяются бесконечно:',
    select: 'Выбрать комбинацию', placeholder: 'Выберите комбинацию',
    names: { glider: 'Глайдер', spaceship: 'Лёгкий космический корабль', pulsar: 'Пульсар', gliderGun: 'Планерное ружьё Госпера' },
  } : {
    summary: 'Description and rules', intro: 'Try a ready-made pattern that moves or repeats indefinitely:',
    select: 'Choose a pattern', placeholder: 'Select a pattern',
    names: { glider: 'Glider', spaceship: 'Lightweight spaceship', pulsar: 'Pulsar', gliderGun: 'Gosper glider gun' },
  };
  const intervalRef = useRef(null);
  const gridRef = useRef(grid);
  const initialGridRef = useRef(grid);

  const gridTemplateColumns = useMemo(() => `repeat(${fieldSize}, 20px)`, [fieldSize]);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const changeFieldSize = (nextSize) => {
    stopGame();
    setSelectedPattern('');
    setCycleCounter(0);
    setStatus('');
    setFieldSize(nextSize);
    const emptyGrid = createEmptyGrid(nextSize, nextSize);
    gridRef.current = emptyGrid;
    initialGridRef.current = emptyGrid;
    setGrid(emptyGrid);
  };

  const toggleCell = (row, col) => {
    setGrid((currentGrid) => {
      const updatedGrid = currentGrid.map((line, rowIndex) =>
        line.map((cell, colIndex) => (rowIndex === row && colIndex === col ? Number(!cell) : cell)),
      );
      gridRef.current = updatedGrid;
      return updatedGrid;
    });
  };

  const clearGrid = () => {
    stopGame();
    setSelectedPattern('');
    setCycleCounter(0);
    setStatus('');
    const emptyGrid = createEmptyGrid(fieldSize, fieldSize);
    gridRef.current = emptyGrid;
    initialGridRef.current = emptyGrid;
    setGrid(emptyGrid);
  };

  const randomizeGrid = () => {
    stopGame();
    setSelectedPattern('');
    setCycleCounter(0);
    setStatus('');
    const randomGrid = Array.from({ length: fieldSize }, () => Array.from({ length: fieldSize }, () => Math.round(Math.random())));
    gridRef.current = randomGrid;
    setGrid(randomGrid);
  };

  const applyPattern = (patternKey) => {
    const pattern = patterns[patternKey];
    if (!pattern) return;
    stopGame();
    setCycleCounter(0);
    setStatus('');
    const requiredSize = Math.max(pattern.width, pattern.height) + 2;
    const nextSize = fieldSizes.find((size) => size >= requiredSize) ?? 42;
    const nextGrid = createEmptyGrid(nextSize, nextSize);
    const rowOffset = Math.floor((nextSize - pattern.height) / 2);
    const colOffset = Math.floor((nextSize - pattern.width) / 2);
    pattern.cells.forEach(([row, col]) => { nextGrid[row + rowOffset][col + colOffset] = 1; });
    setFieldSize(nextSize);
    setSelectedPattern(patternKey);
    gridRef.current = nextGrid;
    initialGridRef.current = nextGrid;
    setGrid(nextGrid);
  };

  const startGame = () => {
    initialGridRef.current = gridRef.current.map((row) => [...row]);
    setCycleCounter(0);
    setStatus('');
    setSimulationStarted(true);
  };
  useGamePlay(() => {
    if (status) {
      const initialGrid = initialGridRef.current.map((row) => [...row]);
      gridRef.current = initialGrid;
      setGrid(initialGrid);
      startGame();
    } else if (fullscreen && !simulationStarted) {
      startGame();
    }
  }, Boolean(status), cycleCounter, clearGrid);

  useEffect(() => {
    if (!running || !simulationStarted) return undefined;
    intervalRef.current = window.setInterval(() => {
      const currentGrid = gridRef.current;
      if (!currentGrid.flat().some(Boolean)) {
        setStatus('allCellsDead');
        stopGame();
        return;
      }

      const updatedGrid = nextGeneration(currentGrid);
      gridRef.current = updatedGrid;
      setCycleCounter((current) => current + 1);
      setGrid(updatedGrid);
    }, cycleTime * 1000);
    return () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running, simulationStarted, cycleTime]);

  const stopGame = () => {
    setSimulationStarted(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section className="life-game" aria-label={copy.games.life.ariaLabel}>
      <details className="life-game__help">
        <summary>
          <span>{patternCopy.summary}</span>
          <span aria-hidden="true">ⓘ</span>
          <span className="life-game__chevron" aria-hidden="true">▶</span>
        </summary>
        <div className="life-game__description">
        {copy.games.life.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul>
          {copy.games.life.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p>{copy.games.life.interaction}</p>
        <div className="life-game__patterns">
          <p>{patternCopy.intro}</p>
          <label>
            {patternCopy.select}
            <select value={selectedPattern} disabled={simulationStarted} onChange={(event) => applyPattern(event.target.value)}>
              <option value="" disabled>{patternCopy.placeholder}</option>
              {Object.entries(patternCopy.names).map(([key, name]) => <option value={key} key={key}>{name}</option>)}
            </select>
          </label>
        </div>
        </div>
      </details>

      <div className="life-game__controls">
        <label>
          {copy.games.life.controls.rows} × {copy.games.life.controls.columns}
          <select value={fieldSize} disabled={simulationStarted}
            onChange={(event) => changeFieldSize(Number(event.target.value))}>
            {fieldSizes.map((size) => <option value={size} key={size}>{size} × {size}</option>)}
          </select>
        </label>
        <label>
          {copy.games.life.controls.cycleTime}
          <select value={cycleTime} onChange={(event) => setCycleTime(Number(event.target.value))}>
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((seconds) => (
              <option value={seconds} key={seconds}>{seconds}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="life-game__actions">
        <button type="button" onClick={randomizeGrid} disabled={simulationStarted}>
          {copy.games.life.actions.random}
        </button>
        <button type="button" onClick={startGame} disabled={simulationStarted}>
          {copy.games.life.actions.start}
        </button>
        <button type="button" onClick={clearGrid} disabled={simulationStarted}>
          {copy.games.life.actions.clear}
        </button>
      </div>

      <span className="life-game__counter">{copy.games.life.counter(cycleCounter)}</span>
      {status && <p className="life-game__status">{copy.games.life[status]}</p>}

      <div className="life-game__grid" style={{ gridTemplateColumns }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              className={`life-game__cell ${cell ? 'life-game__cell--alive' : 'life-game__cell--dead'}`}
              key={`${rowIndex}-${colIndex}`}
              type="button"
              disabled={simulationStarted}
              aria-label={copy.games.life.toggleCell({ row: rowIndex + 1, col: colIndex + 1 })}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          )),
        )}
      </div>
    </section>
  );
}

function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function nextGeneration(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = createEmptyGrid(rows, cols);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const neighbors = countAliveNeighbors(grid, row, col);
      if (grid[row][col] === 1 && (neighbors === 2 || neighbors === 3)) {
        newGrid[row][col] = 1;
      } else if (grid[row][col] === 0 && neighbors === 3) {
        newGrid[row][col] = 1;
      }
    }
  }

  return newGrid;
}

function countAliveNeighbors(grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset === 0 && colOffset === 0) {
        continue;
      }

      const wrappedRow = (row + rowOffset + rows) % rows;
      const wrappedCol = (col + colOffset + cols) % cols;
      count += grid[wrappedRow][wrappedCol];
    }
  }

  return count;
}
