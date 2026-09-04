import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { languageOptions } from '../src/shared/i18n/languages.js';

const dist = new URL('../dist/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', dist), 'utf8'));
const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
assert.ok(entry, 'Missing build entry');
function staticGraph(key, found = new Set()) {
  if (found.has(key)) return found;
  found.add(key);
  for (const imported of manifest[key].imports ?? []) staticGraph(imported, found);
  return found;
}
const initial = staticGraph(entry);
for (const key of initial) {
  assert.doesNotMatch(key, /siteCopy|commonCopy|\/games\/|pages\/GamePage|pages\/PrivacyPolicyPage/, `Eager feature: ${key}`);
}
for (const { id } of languageOptions) {
  const key = `src/shared/i18n/siteCopy${id[0].toUpperCase()}${id.slice(1)}.js`;
  assert.ok(manifest[key]?.isDynamicEntry, `Dictionary is not independently loadable: ${id}`);
  for (const imported of staticGraph(key)) {
    if (imported.includes('/siteCopy')) assert.equal(imported, key, 'A language eagerly imports another language');
  }
}
for (const component of ['dino/DinoGame', 'snake/SnakeGame', 'flappy-bird/FlappyBirdGame', 'game-of-life/GameOfLife', 'snake-unlimited/SnakeUnlimitedGame']) {
  const key = `src/games/${component}.jsx`;
  assert.ok(manifest[key]?.isDynamicEntry, `Game is not independently loadable: ${component}`);
  for (const imported of staticGraph(key)) {
    if (imported.includes('src/games/')) assert.equal(imported, key, 'A game eagerly imports another game');
  }
}
let bytes = 0; let gzip = 0;
for (const key of initial) {
  const content = await readFile(new URL(manifest[key].file, dist));
  bytes += content.length; gzip += gzipSync(content).length;
}
assert.ok(bytes < 300_000, `Initial JavaScript too large: ${bytes}`);
let imageBytes = 0;
for (const image of ['wall_quality.webp', 'AntonDorovs.webp']) {
  const key = `src/assets/site/${image}`;
  const size = (await stat(new URL(manifest[key].file, dist))).size;
  imageBytes += size;
}
assert.ok(imageBytes < 650_000, `Home images too large: ${imageBytes}`);
assert.ok(!Object.keys(manifest).some((key) => /assets\/site\/.*\.(png|PNG)$/.test(key)), 'Unoptimized site PNG included');
console.log(JSON.stringify({ initialJavaScriptBytes: bytes, initialJavaScriptGzipBytes: gzip, homeImageBytes: imageBytes, independentlyLoadedLanguages: languageOptions.length, independentlyLoadedGames: 5 }, null, 2));
