import assert from 'node:assert/strict';
import test from 'node:test';
import { createCopyLoader, loadSiteCopy } from './loadSiteCopy.js';
import { getPreferredLanguage, persistLanguage } from './languagePreference.js';
import { languageOptions, LANGUAGE_STORAGE_KEY } from './languages.js';
import { siteCopy } from './siteCopy.js';

test('on-demand dictionaries exactly match the complete catalog', async () => {
  for (const { id } of languageOptions) {
    const { language, copy } = await loadSiteCopy(id);
    assert.equal(language, id);
    assert.deepEqual(copy, siteCopy[id], id);
  }
});

test('only the requested dictionary loads; concurrent requests share the same promise', async () => {
  const calls = [];
  const load = createCopyLoader({
    en: async () => { calls.push('en'); return { title: 'English' }; },
    ru: async () => { calls.push('ru'); return { title: 'Русский' }; },
  });
  const first = load('ru');
  const second = load('ru');
  assert.equal(first, second);
  const result = await first;
  assert.deepEqual(calls, ['ru']);
  assert.deepEqual(result, { language: 'ru', copy: { title: 'Русский' } });
  assert.equal(await load('ru'), result);
  assert.deepEqual(calls, ['ru']);
  assert.equal((await load('unsupported')).language, 'en');
  assert.deepEqual(calls, ['ru', 'en']);
});

test('failed loads can be retried without discarding successful dictionaries', async () => {
  let attempts = 0;
  const load = createCopyLoader({ en: async () => ({}), ru: async () => {
    if (++attempts === 1) throw new Error('Offline');
    return { title: 'Русский' };
  } });
  const english = await load('en');
  await assert.rejects(load('ru'), /Offline/);
  assert.equal((await load('ru')).language, 'ru');
  assert.equal(attempts, 2);
  assert.equal(await load('en'), english);
});

test('language preference uses explicit choice, then primary browser language, then English', () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const saved = new Map();
  try {
    Object.defineProperty(globalThis, 'window', { configurable: true, value: {
      localStorage: { getItem: (key) => saved.get(key), setItem: (key, value) => saved.set(key, value) },
    } });
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { language: 'ru-RU', languages: ['ru-RU', 'en'] } });
    assert.equal(getPreferredLanguage(), 'ru');
    assert.equal(saved.size, 0, 'automatic detection must not persist a preference');
    persistLanguage('de');
    assert.equal(getPreferredLanguage(), 'de');
    saved.set(LANGUAGE_STORAGE_KEY, 'invalid');
    assert.equal(getPreferredLanguage(), 'ru');
    navigator.language = 'unsupported'; navigator.languages = ['unsupported', 'ru'];
    assert.equal(getPreferredLanguage(), 'en', 'do not scan secondary browser languages');
    window.localStorage.getItem = () => { throw new Error('Denied'); };
    assert.equal(getPreferredLanguage(), 'en');
    window.localStorage.setItem = () => { throw new Error('Denied'); };
    assert.doesNotThrow(() => persistLanguage('ru'));
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else delete globalThis.window;
    if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator); else delete globalThis.navigator;
  }
});
