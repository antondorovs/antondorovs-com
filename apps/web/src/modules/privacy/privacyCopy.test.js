import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { languageIds } from '../../shared/i18n/languages.js';
import { siteCopy } from '../../shared/i18n/siteCopy.js';
import { withoutFinalStop } from '../footer/formatNotice.js';
import { consentCopy } from './consentCopy.js';
import { privacyNotice } from './privacyNotice.js';

const bannerKeys = Object.keys(consentCopy.en).sort();
const optionKeys = Object.keys(consentCopy.en.options).sort();

test('privacy and counter UI is translated for every supported language', async () => {
  for (const language of languageIds) {
    const copy = ['en', 'ru'].includes(language)
      ? {
        banner: consentCopy[language],
        counters: language === 'ru'
          ? { pageViews: 'Загрузки страниц', uniqueBrowsers: 'Уникальные браузеры' }
          : { pageViews: 'Page loads', uniqueBrowsers: 'Unique browser' },
        notice: privacyNotice[language],
      }
      : JSON.parse(await readFile(new URL(`./translations/${language}.json`, import.meta.url), 'utf8'));

    assert.deepEqual(Object.keys(copy.banner).sort(), bannerKeys, language);
    assert.deepEqual(Object.keys(copy.banner.options).sort(), optionKeys, language);
    assert.deepEqual(Object.keys(copy.counters).sort(), ['pageViews', 'uniqueBrowsers'], language);
    assert.equal(copy.notice.paragraphs.length, 5, language);
    if (language !== 'en') assert.notEqual(copy.banner.title, consentCopy.en.title, language);
    const { options, ...bannerText } = copy.banner;
    for (const [key, value] of Object.entries({
      ...bannerText, ...options, ...copy.counters,
      heading: copy.notice.heading,
      lastUpdated: copy.notice.lastUpdated ?? 'Last updated',
    })) {
      assert.ok(typeof value === 'string' && value.trim().length > 0, `${language}.${key}`);
    }
    for (const paragraph of copy.notice.paragraphs) {
      assert.ok(typeof paragraph === 'string' && paragraph.trim().length > 0, language);
    }
    const noticeText = copy.notice.paragraphs.join(' ');
    assert.doesNotMatch(noticeText, /antondorovs@gmail\.com/iu, language);
    for (const identifier of ['advs_visitor', 'advs_privacy_choice', 'SHA-256', '395']) {
      assert.ok(noticeText.includes(identifier), `${language}: ${identifier}`);
    }
  }
});

test('the two footer lines omit terminal full stops in every language', () => {
  for (const language of languageIds) {
    const { site, privacyLink } = siteCopy[language].footer.notice;
    for (const text of [site, privacyLink]) {
      assert.doesNotMatch(withoutFinalStop(text), /[.。।۔։]\s*$/u, language);
    }
  }
});
