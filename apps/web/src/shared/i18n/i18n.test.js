import assert from 'node:assert/strict';
import test from 'node:test';
import { createLocalizedCopy } from './createLocalizedCopy.js';
import { additionalLanguages } from './additionalLanguages.js';
import { additionalTranslations } from './additionalTranslations.js';
import {
  DEFAULT_LANGUAGE,
  getLanguageOption,
  isLanguageId,
  languageOptions,
  resolveBrowserLanguage,
} from './languages.js';
import { siteCopy } from './siteCopy.js';

const newLanguages = ['bn', 'he', 'hi', 'it', 'ja', 'kk', 'ko', 'pl', 'pt', 'tr', 'uk', 'vi', ...additionalLanguages.map(({ id }) => id)];

function copyShape(value) {
  if (Array.isArray(value)) return value.map(copyShape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, copyShape(value[key])]));
  }
  return typeof value;
}

test('all 55 language options have complete dictionaries and sorted, unique display codes', () => {
  const codes = languageOptions.map(({ code }) => code);
  const ids = languageOptions.map(({ id }) => id);
  assert.equal(ids.length, 55);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(codes).size, codes.length);
  assert.deepEqual(codes, [...codes].sort());
  assert.deepEqual([...ids].sort(), Object.keys(siteCopy).sort());
  const expectedShape = copyShape(siteCopy.en);
  for (const id of ids) {
    assert.deepEqual(copyShape(siteCopy[id]), expectedShape, `Incomplete copy for ${id}`);
  }
});

test('each supported language and its HTML language tag are detected', () => {
  for (const { id, htmlLang } of languageOptions) {
    assert.equal(resolveBrowserLanguage(id), id);
    assert.equal(resolveBrowserLanguage(htmlLang), id);
    assert.equal(resolveBrowserLanguage(htmlLang.toUpperCase()), id);
  }
});

test('regional and script variants resolve without confusing language codes and display codes', () => {
  const cases = {
    'ar-SA': 'ar', 'bn-BD': 'bn', 'bn-IN': 'bn', 'zh-CN': 'zh', 'zh-Hans-CN': 'zh',
    'de-DE': 'de', 'en-US': 'en', 'es-MX': 'es', 'fr-CA': 'fr', 'he-IL': 'he',
    'iw-IL': 'he', 'hi-IN': 'hi', 'it-IT': 'it', 'ja-JP': 'ja', 'kk-KZ': 'kk',
    'kk-Cyrl-KZ': 'kk', 'ko-KR': 'ko', 'pl-PL': 'pl', 'pt-PT': 'pt', 'pt-BR': 'pt',
    'ru-KZ': 'ru', 'ru-RU': 'ru', 'sr-RS': 'sr', 'sr-Cyrl-RS': 'sr',
    'sr-Latn-RS': 'me', 'sr_Latn_ME': 'me', 'cnr-ME': 'me', 'cnr-Latn-ME': 'me',
    'tr-TR': 'tr', 'uk-UA': 'uk', 'vi-VN': 'vi',
    'az-AZ': 'az', 'be-BY': 'be', 'bg-BG': 'bg', 'bs-BA': 'bs', 'cs-CZ': 'cs',
    'da-DK': 'da', 'el-GR': 'el', 'et-EE': 'et', 'fa-IR': 'fa', 'fi-FI': 'fi',
    'fil-PH': 'fil', 'ha-NG': 'ha', 'hr-HR': 'hr', 'hu-HU': 'hu', 'hy-AM': 'hy',
    'is-IS': 'is', 'jv-ID': 'jv', 'ka-GE': 'ka', 'lt-LT': 'lt', 'lv-LV': 'lv',
    'mk-MK': 'mk', 'my-MM': 'my', 'nb-NO': 'nb', 'no-NO': 'nb', 'nl-NL': 'nl',
    'om-ET': 'om', 'ro-RO': 'ro', 'ro-MD': 'ro', 'sk-SK': 'sk', 'sl-SI': 'sl',
    'sq-AL': 'sq', 'sv-SE': 'sv', 'sw-KE': 'sw', 'th-TH': 'th', 'ur-PK': 'ur', 'uz-UZ': 'uz',
  };
  for (const [browserLanguage, expected] of Object.entries(cases)) {
    assert.equal(resolveBrowserLanguage(browserLanguage), expected, browserLanguage);
  }
  for (const unsupported of [undefined, null, '', 'eo', 'zu-ZA', 'nn-NO', 'cy-GB', 'rubbish', 'kz', 'cn', 'ph']) {
    assert.equal(resolveBrowserLanguage(unsupported), DEFAULT_LANGUAGE);
  }
  assert.equal(getLanguageOption('unknown').id, DEFAULT_LANGUAGE);
  assert.equal(isLanguageId('kz'), false);
  assert.equal(isLanguageId('kk'), true);
});

test('display codes are independent of browser tags, and RTL languages retain their metadata', () => {
  assert.equal(getLanguageOption('kk').code, 'KZ');
  assert.equal(getLanguageOption('kk').htmlLang, 'kk');
  assert.equal(getLanguageOption('zh').code, 'CN');
  assert.equal(getLanguageOption('fil').code, 'PH');
  assert.equal(getLanguageOption('fil').htmlLang, 'fil');
  assert.equal(isLanguageId('ph'), false);
  assert.equal(getLanguageOption('he').htmlLang, 'he');
  assert.equal(getLanguageOption('he').direction, 'rtl');
  assert.equal(getLanguageOption('ar').direction, 'rtl');
  assert.equal(getLanguageOption('fa').direction, 'rtl');
  assert.equal(getLanguageOption('ur').direction, 'rtl');
  assert.equal(getLanguageOption('en').direction, 'ltr');
});

test('requested country-style menu codes preserve language IDs and Georgian copy', () => {
  const displayCodes = {
    el: 'GR', et: 'EE', sv: 'SE', nb: 'NO', hy: 'AM', ka: 'GE', my: 'MM',
    uk: 'UA', be: 'BY', ja: 'JP', ko: 'KR', cs: 'CZ', da: 'DK', sr: 'RS',
    sl: 'SI', sq: 'AL', bs: 'BA', vi: 'VN', fa: 'IR', he: 'IL',
    bn: 'BN', hi: 'HI', ur: 'UR', en: 'EN', ar: 'AR', sw: 'SW', ha: 'HA', jv: 'JV', om: 'OM',
  };
  for (const [id, code] of Object.entries(displayCodes)) {
    const option = getLanguageOption(id);
    assert.equal(option.code, code);
    assert.equal(option.id, id);
    assert.equal(resolveBrowserLanguage(option.htmlLang), id);
    assert.ok(siteCopy[id]);
  }
  assert.equal(getLanguageOption('ka').nativeName, 'ქართული');
  assert.match(siteCopy.ka.homeBanner.greeting, /[\u10A0-\u10FF]/u);
});

test('new translations cover all localizable fields instead of falling back to English', async () => {
  const required = {
    nav: siteCopy.en.nav,
    header: siteCopy.en.header,
    homeBanner: siteCopy.en.homeBanner,
    intro: { ariaLabel: '', socialAriaLabel: '', socialLabels: siteCopy.en.intro.socialLabels },
    summary: siteCopy.en.summary,
    about: siteCopy.en.about,
    experience: {
      title: '', groups: siteCopy.en.experience.groups, cvLinks: siteCopy.en.experience.cvLinks,
      techStack: '', work: [{ period: '', before: '', after: '' }, { period: '', before: '', after: '' }],
      education: siteCopy.en.experience.education, skillTitles: Array(6).fill(''),
    },
    games: Object.fromEntries(Object.entries(siteCopy.en.games).filter(([key]) => key !== 'titles')),
    footer: Object.fromEntries(Object.entries(siteCopy.en.footer).filter(([key]) => key !== 'environments')),
    privacy: siteCopy.en.privacy,
  };
  for (const id of newLanguages) {
    const module = await import(`./siteCopy${id[0].toUpperCase()}${id.slice(1)}.js`);
    const translation = additionalTranslations[id] ?? module[`${id}Translation`];
    assert.deepEqual(copyShape(translation), copyShape(required), `Missing translation fields: ${id}`);
    assert.notEqual(siteCopy[id].summary.lines[0], siteCopy.en.summary.lines[0], id);
    assert.deepEqual(siteCopy[id].intro.follow, siteCopy.en.intro.follow, id);
    assert.deepEqual(siteCopy[id].games.titles, siteCopy.en.games.titles, id);
    assert.deepEqual(siteCopy[id].footer.environments, siteCopy.en.footer.environments, id);
    const englishBefore = copyShape(siteCopy.en);
    assert.deepEqual(createLocalizedCopy(siteCopy.en, translation), siteCopy[id]);
    assert.deepEqual(copyShape(siteCopy.en), englishBefore);
    siteCopy[id].experience.work.forEach((job, index) => {
      assert.deepEqual(job.description[1], siteCopy.en.experience.work[index].description[1]);
      assert.equal(job.company, siteCopy.en.experience.work[index].company);
      assert.equal(job.stack, siteCopy.en.experience.work[index].stack);
    });
  }
});

test('sign-in messages omit trailing full stops in every language', () => {
  for (const { id } of languageOptions) {
    const message = siteCopy[id].header.signIn.message;
    assert.ok(message.trim().length > 0, id);
    assert.doesNotMatch(message, /[.。।]\s*$/u, id);
  }
});

test('footer privacy links follow a standalone introduction in every language', () => {
  for (const { id } of languageOptions) {
    const notice = siteCopy[id].footer.notice;
    assert.match(notice.privacyPrefix.trim(), /[:：]$/u, id);
    assert.match(notice.privacySuffix, /^[.。।]?$/u, id);
    assert.ok(notice.privacyLink.trim().length > 0, id);
  }
});

test('new dictionaries have no untranslated import placeholders or empty text fields', () => {
  function inspect(value, path) {
    if (typeof value === 'string') {
      assert.doesNotMatch(value, /ZXQ|PLACEHOLDER|TODO_TRANSLATE/u, path);
      assert.ok(value.trim().length > 0 || /\.work\.\d+\.(before|after)$/.test(path), `Empty translation: ${path}`);
    } else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) inspect(child, `${path}.${key}`);
    }
  }
  for (const [id, translation] of Object.entries(additionalTranslations)) {
    inspect(translation, id);
    for (const rendered of [
      translation.header.theme.buttonLabel({ selectedMode: 'MODE', effectiveTheme: 'THEME' }),
      translation.header.language.buttonLabel({ selectedLanguage: 'LANGUAGE' }),
      translation.games.dino.score(123), translation.games.dino.gameOver(123),
      translation.games.life.counter(123), translation.games.life.toggleCell({ row: 12, col: 34 }),
    ]) assert.doesNotMatch(rendered, /ZXQ|undefined/u, id);
  }
});

test('dynamic translated labels include their values', () => {
  for (const { id } of languageOptions) {
    const copy = siteCopy[id];
    assert.ok(copy.header.theme.buttonLabel({ selectedMode: 'MODE', effectiveTheme: 'THEME' }).includes('MODE'));
    assert.ok(copy.header.theme.buttonLabel({ selectedMode: 'MODE', effectiveTheme: 'THEME' }).includes('THEME'));
    assert.ok(copy.header.language.buttonLabel({ selectedLanguage: 'LANGUAGE' }).includes('LANGUAGE'));
    assert.ok(copy.games.dino.score(123).includes('123'));
    assert.ok(copy.games.dino.gameOver(123).includes('123'));
    assert.ok(copy.games.life.counter(123).includes('123'));
    assert.ok(copy.games.life.toggleCell({ row: 12, col: 34 }).includes('12'));
    assert.ok(copy.games.life.toggleCell({ row: 12, col: 34 }).includes('34'));
  }
});
