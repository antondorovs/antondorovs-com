import { useEffect, useMemo, useRef, useState } from 'react';
import './GameOfLife.css';

export function GameOfLife() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [cycleTime, setCycleTime] = useState(1);
  const [grid, setGrid] = useState(() => createEmptyGrid(10, 10));
  const [cycleCounter, setCycleCounter] = useState(0);
  const [status, setStatus] = useState('');
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
        setStatus('Game over. The game has entered a repeating state.');
        stopGame();
        return;
      }

      if (!currentGrid.flat().some(Boolean)) {
        setStatus('Game over. All cells are dead.');
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
    <section className="life-game" aria-label="Game of Life">
      <div className="life-game__description">
        <p>
          The Game of Life is a cellular automaton devised by mathematician John Conway in 1970.
          It is a zero-player game, meaning that its evolution is determined by its initial state, with no further input.
          The game consists of a grid of cells, each of which can be in one of two states: alive or dead.
        </p>
        <p>
          The evolution of the game is governed by simple rules:
        </p>
        <ul>
          <li>Any live cell with fewer than two live neighbors dies (underpopulation).</li>
          <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbors dies (overpopulation).</li>
          <li>Any dead cell with exactly three live neighbors becomes a live cell (reproduction).</li>
        </ul>
        <p>To interact with the game, click on cells to toggle their state.
        Experiment with different initial configurations and observe how the patterns evolve over time.
        </p>
      </div>

      <div className="life-game__controls">
        <label>
          Rows
          <input type="number" min="1" value={rows} onChange={(event) => setRows(Number(event.target.value))} />
        </label>
        <label>
          Columns
          <input type="number" min="1" value={cols} onChange={(event) => setCols(Number(event.target.value))} />
        </label>
        <label>
          Cycle Time (s)
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
          Apply
        </button>
        <button type="button" onClick={randomizeGrid}>
          Random
        </button>
        <button type="button" onClick={startGame}>
          Start
        </button>
        <button type="button" onClick={clearGrid}>
          Clear
        </button>
      </div>

      <span className="life-game__counter">Cycle: {cycleCounter}</span>
      {status && <p className="life-game__status">{status}</p>}

      <div className="life-game__grid" style={{ gridTemplateColumns }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              className={`life-game__cell ${cell ? 'life-game__cell--alive' : 'life-game__cell--dead'}`}
              key={`${rowIndex}-${colIndex}`}
              type="button"
              aria-label={`Toggle cell ${rowIndex + 1}, ${colIndex + 1}`}
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
