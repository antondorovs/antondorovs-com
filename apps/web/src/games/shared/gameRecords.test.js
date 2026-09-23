import test from 'node:test';
import assert from 'node:assert/strict';
import { readGameRecord, saveGameRecord } from './gameRecords.js';

function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('records survive a new read, never decrease and belong to each game separately', () => {
  const saved = storage();
  assert.equal(readGameRecord('snake', saved), 0);
  assert.equal(saveGameRecord('snake', 12, saved), 12);
  assert.equal(saveGameRecord('snake', 4, saved), 12);
  assert.equal(readGameRecord('snake', saved), 12);
  assert.equal(readGameRecord('dino', saved), 0);
  assert.equal(saveGameRecord('dino', 3, saved), 3);
  assert.equal(readGameRecord('snake', saved), 12);
});

test('malformed saved records and invalid scores cannot poison the best score', () => {
  const saved = storage();
  for (const value of ['bad', '-1', 'Infinity', '2.5']) {
    saved.setItem('anton-game-best:snake', value);
    assert.equal(readGameRecord('snake', saved), 0);
  }
  saveGameRecord('snake', 7, saved);
  for (const score of [NaN, Infinity, -1, 2.5, '12']) assert.equal(saveGameRecord('snake', score, saved), 7);
});

test('blocked storage does not prevent displaying the result or replaying', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(readGameRecord('snake', blocked), 0);
  assert.equal(saveGameRecord('snake', 9, blocked), 9);
});
