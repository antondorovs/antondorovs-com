import { useEffect, useMemo, useRef, useState } from 'react';
import { useSiteCopy } from '../../shared/i18n/LanguageProvider.jsx';
import './GameOfLife.css';

export function GameOfLife() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [cycleTime, setCycleTime] = useState(1);
  const [grid, setGrid] = useState(() => createEmptyGrid(10, 10));
  const [cycleCounter, setCycleCounter] = useState(0);
  const [status, setStatus] = useState('');
  const copy = useSiteCopy();
  const intervalRef = useRef(null);
  const gridRef = useRef(grid);
  const previousStatesRef = useRef([]);

  const gridTemplateColumns = useMemo(() => `repeat(${cols}, 20px)`, [cols]);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => () => stopGame(), []);

  const applyChanges = () => {
    stopGame();
    previousStatesRef.current = [];
    setCycleCounter(0);
    setStatus('');
    const emptyGrid = createEmptyGrid(rows, cols);
    gridRef.current = emptyGrid;
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
    previousStatesRef.current = [];
    setCycleCounter(0);
    setStatus('');
    const emptyGrid = createEmptyGrid(rows, cols);
    gridRef.current = emptyGrid;
    setGrid(emptyGrid);
  };

  const randomizeGrid = () => {
    stopGame();
    previousStatesRef.current = [];
    setCycleCounter(0);
    setStatus('');
    const randomGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.round(Math.random())));
    gridRef.current = randomGrid;
    setGrid(randomGrid);
  };

  const startGame = () => {
    stopGame();
    previousStatesRef.current = [];
    setCycleCounter(0);
    setStatus('');
    intervalRef.current = window.setInterval(() => {
      const currentGrid = gridRef.current;
      const state = JSON.stringify(currentGrid);

      if (previousStatesRef.current.includes(state)) {
        setStatus('repeatingState');
        stopGame();
        return;
      }

      if (!currentGrid.flat().some(Boolean)) {
        setStatus('allCellsDead');
        stopGame();
        return;
      }

      previousStatesRef.current.push(state);
      const updatedGrid = nextGeneration(currentGrid);
      gridRef.current = updatedGrid;
      setCycleCounter((current) => current + 1);
      setGrid(updatedGrid);
    }, cycleTime * 1000);
  };

  const stopGame = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section className="life-game" aria-label={copy.games.life.ariaLabel}>
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
      </div>

      <div className="life-game__controls">
        <label>
          {copy.games.life.controls.rows}
          <input type="number" min="1" value={rows} onChange={(event) => setRows(Number(event.target.value))} />
        </label>
        <label>
          {copy.games.life.controls.columns}
          <input type="number" min="1" value={cols} onChange={(event) => setCols(Number(event.target.value))} />
        </label>
        <label>
          {copy.games.life.controls.cycleTime}
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={cycleTime}
            onChange={(event) => setCycleTime(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="life-game__actions">
        <button type="button" onClick={applyChanges}>
          {copy.games.life.actions.apply}
        </button>
        <button type="button" onClick={randomizeGrid}>
          {copy.games.life.actions.random}
        </button>
        <button type="button" onClick={startGame}>
          {copy.games.life.actions.start}
        </button>
        <button type="button" onClick={clearGrid}>
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
