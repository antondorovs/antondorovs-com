const keyFor = (gameKey) => `anton-game-best:${gameKey}`;
const validScore = (score) => Number.isSafeInteger(score) && score >= 0;

export function readGameRecord(gameKey, storage) {
  try {
    const value = (storage ?? window.localStorage).getItem(keyFor(gameKey));
    const score = Number(value);
    return value !== null && validScore(score) ? score : 0;
  } catch {
    return 0;
  }
}

export function saveGameRecord(gameKey, score, storage) {
  const best = Math.max(readGameRecord(gameKey, storage), validScore(score) ? score : 0);
  try {
    (storage ?? window.localStorage).setItem(keyFor(gameKey), String(best));
  } catch {
    // The result is still available for this session when browser storage is blocked.
  }
  return best;
}
