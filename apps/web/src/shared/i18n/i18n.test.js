import assert from 'node:assert/strict';
import test from 'node:test';
import { createLocalizedCopy } from './createLocalizedCopy.js';
import {
  DEFAULT_LANGUAGE,
  getLanguageOption,
  isLanguageId,
  languageOptions,
  resolveBrowserLanguage,
} from './languages.js';
import { siteCopy } from './siteCopy.js';

const newLanguages = ['bn', 'he', 'hi', 'it', 'ja', 'kk', 'ko', 'pl', 'pt', 'tr', 'uk', 'vi'];

function copyShape(value) {
  if (Array.isArray(value)) return value.map(copyShape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, copyShape(value[key])]));
  }
  return typeof value;
}

test('all 21 language options have complete dictionaries and sorted, unique display codes', () => {
  const codes = languageOptions.map(({ code }) => code);
  const ids = languageOptions.map(({ id }) => id);
  assert.equal(ids.length, 21);
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
  };
  for (const [browserLanguage, expected] of Object.entries(cases)) {
    assert.equal(resolveBrowserLanguage(browserLanguage), expected, browserLanguage);
  }
  for (const unsupported of [undefined, null, '', 'nl-NL', 'sv-SE', 'rubbish', 'kz', 'cn']) {
    assert.equal(resolveBrowserLanguage(unsupported), DEFAULT_LANGUAGE);
  }
  assert.equal(getLanguageOption('unknown').id, DEFAULT_LANGUAGE);
  assert.equal(isLanguageId('kz'), false);
  assert.equal(isLanguageId('kk'), true);
});

test('Kazakh shows KZ but retains kk, and Hebrew/Arabic carry RTL language metadata', () => {
  assert.equal(getLanguageOption('kk').code, 'KZ');
  assert.equal(getLanguageOption('kk').htmlLang, 'kk');
  assert.equal(getLanguageOption('zh').code, 'CN');
  assert.equal(getLanguageOption('he').htmlLang, 'he');
  assert.equal(getLanguageOption('he').direction, 'rtl');
  assert.equal(getLanguageOption('ar').direction, 'rtl');
  assert.equal(getLanguageOption('en').direction, 'ltr');
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
    const translation = module[`${id}Translation`];
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
