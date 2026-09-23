export const CONSENT_STORAGE_KEY = 'antondorovs-privacy-choice';
export const CONSENT_COOKIE_KEY = 'advs_privacy_choice';
export const CONSENT_VERSION = 2;
export const CONSENT_COOKIE_DAYS = 395;
export const consentOptions = ['uniqueCounter', 'googleAnalytics', 'yandexMetrica', 'yandexWebvisor', 'microsoftClarity'];

export const deniedConsent = Object.freeze(Object.fromEntries(consentOptions.map((option) => [option, false])));
export const firstPartyCounterOnly = Object.freeze({ ...deniedConsent, uniqueCounter: true });
export const acceptedConsent = Object.freeze(Object.fromEntries(consentOptions.map((option) => [option, true])));

export function readConsent() {
  const localChoice = readLocalStorageChoice();
  const cookieChoice = readPreferenceCookie();
  const saved = [localChoice, cookieChoice]
    .filter(Boolean)
    .sort((left, right) => savedAt(right) - savedAt(left))[0];

  if (!saved) return null;
  return normalizeChoices(saved.choices);
}

export function getEffectiveConsent() {
  return readConsent() ?? acceptedConsent;
}

export function persistConsent(choices) {
  const payload = {
    version: CONSENT_VERSION,
    choices: normalizeChoices(choices),
    decidedAt: new Date().toISOString(),
  };
  const serialized = JSON.stringify(payload);
  const localStorageSaved = writeLocalStorage(serialized);
  const cookieSaved = writePreferenceCookie(serialized);

  return {
    saved: localStorageSaved || cookieSaved,
    localStorageSaved,
    cookieSaved,
  };
}

function readLocalStorageChoice() {
  try {
    return parseSavedChoice(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

function readPreferenceCookie() {
  try {
    if (typeof document === 'undefined') return null;
    const prefix = `${CONSENT_COOKIE_KEY}=`;
    const value = document.cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(prefix));
    return value ? parseSavedChoice(decodeURIComponent(value.slice(prefix.length))) : null;
  } catch {
    return null;
  }
}

function parseSavedChoice(serialized) {
  if (!serialized) return null;
  const saved = JSON.parse(serialized);
  if (saved?.version !== CONSENT_VERSION || !saved?.choices) return null;
  if (!consentOptions.every((option) => typeof saved.choices[option] === 'boolean')) return null;
  return saved;
}

function normalizeChoices(choices) {
  return {
    ...Object.fromEntries(consentOptions.map((option) => [option, Boolean(choices?.[option])])),
    yandexWebvisor: Boolean(choices?.yandexMetrica && choices?.yandexWebvisor),
  };
}

function savedAt(saved) {
  const timestamp = Date.parse(saved?.decidedAt ?? '');
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function writeLocalStorage(serialized) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === serialized;
  } catch {
    return false;
  }
}

function writePreferenceCookie(serialized) {
  try {
    if (typeof document === 'undefined') return false;
    const secure = window.location?.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE_KEY}=${encodeURIComponent(serialized)}; Max-Age=${CONSENT_COOKIE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
    return Boolean(readPreferenceCookie());
  } catch {
    return false;
  }
}

export function clearAnalyticsCookies(previous, next) {
  const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0]);
  const revoked = [
    previous.googleAnalytics && !next.googleAnalytics && /^(?:_ga(?:_|$)|_gid$|_gat(?:_|$))/,
    previous.yandexMetrica && !next.yandexMetrica && /^_ym_/,
    previous.microsoftClarity && !next.microsoftClarity && /^_cl(?:ck|sk)$/,
  ].filter(Boolean);
  for (const name of names.filter((value) => revoked.some((pattern) => pattern.test(value)))) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
}
