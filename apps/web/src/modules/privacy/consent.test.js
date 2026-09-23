import assert from 'node:assert/strict';
import test from 'node:test';
import {
  acceptedConsent,
  CONSENT_COOKIE_KEY,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  deniedConsent,
  getEffectiveConsent,
  persistConsent,
} from './consent.js';

test('new visitors start with all optional services enabled', () => {
  const previousWindow = globalThis.window;
  try {
    globalThis.window = { localStorage: { getItem: () => null } };
    assert.deepEqual(getEffectiveConsent(), acceptedConsent);
  } finally {
    globalThis.window = previousWindow;
  }
});

test('saved opt-out remains in force on later visits', () => {
  const previousWindow = globalThis.window;
  try {
    globalThis.window = { localStorage: { getItem: (key) => key === CONSENT_STORAGE_KEY
      ? JSON.stringify({ version: CONSENT_VERSION, choices: deniedConsent }) : null } };
    assert.deepEqual(getEffectiveConsent(), deniedConsent);
  } finally {
    globalThis.window = previousWindow;
  }
});

test('the preference cookie preserves a choice when localStorage is unavailable', () => {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  let cookie = '';
  try {
    globalThis.window = {
      location: { protocol: 'https:' },
      localStorage: {
        getItem: () => { throw new Error('blocked'); },
        setItem: () => { throw new Error('blocked'); },
      },
    };
    globalThis.document = {
      get cookie() { return cookie; },
      set cookie(value) { cookie = value.split(';')[0]; },
    };

    const result = persistConsent(deniedConsent);

    assert.equal(result.saved, true);
    assert.equal(result.localStorageSaved, false);
    assert.equal(result.cookieSaved, true);
    assert.match(cookie, new RegExp(`^${CONSENT_COOKIE_KEY}=`));
    assert.deepEqual(getEffectiveConsent(), deniedConsent);
  } finally {
    globalThis.window = previousWindow;
    globalThis.document = previousDocument;
  }
});

test('failed persistence keeps the default services enabled', () => {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  try {
    globalThis.window = {
      location: { protocol: 'https:' },
      localStorage: {
        getItem: () => null,
        setItem: () => { throw new Error('blocked'); },
      },
    };
    globalThis.document = {
      get cookie() { return ''; },
      set cookie(_value) {},
    };

    const result = persistConsent(deniedConsent);

    assert.equal(result.saved, false);
    assert.deepEqual(getEffectiveConsent(), acceptedConsent);
  } finally {
    globalThis.window = previousWindow;
    globalThis.document = previousDocument;
  }
});
