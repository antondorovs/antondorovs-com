// Complete catalog for tests and offline tools only. The browser uses loadSiteCopy.js.
import { enCopy } from './siteCopyEn.js';
import { ruCopy } from './siteCopyRu.js';
import { createLocalizedCopy } from './createLocalizedCopy.js';
import { arCopy } from './siteCopyAr.js';
import { bnTranslation } from './siteCopyBn.js';
import { deCopy } from './siteCopyDe.js';
import { esCopy } from './siteCopyEs.js';
import { frCopy } from './siteCopyFr.js';
import { heTranslation } from './siteCopyHe.js';
import { hiTranslation } from './siteCopyHi.js';
import { itTranslation } from './siteCopyIt.js';
import { jaTranslation } from './siteCopyJa.js';
import { kkTranslation } from './siteCopyKk.js';
import { koTranslation } from './siteCopyKo.js';
import { meCopy } from './siteCopyMe.js';
import { plTranslation } from './siteCopyPl.js';
import { ptTranslation } from './siteCopyPt.js';
import { srCopy } from './siteCopySr.js';
import { trTranslation } from './siteCopyTr.js';
import { ukTranslation } from './siteCopyUk.js';
import { viTranslation } from './siteCopyVi.js';
import { zhCopy } from './siteCopyZh.js';
import { additionalTranslations } from './additionalTranslations.js';

export const siteCopy = {
  en: enCopy,
  ru: ruCopy,
  ar: arCopy,
  de: deCopy,
  es: esCopy,
  fr: frCopy,
  me: meCopy,
  sr: srCopy,
  zh: zhCopy,
};

Object.assign(siteCopy, {
  bn: createLocalizedCopy(siteCopy.en, bnTranslation),
  he: createLocalizedCopy(siteCopy.en, heTranslation),
  hi: createLocalizedCopy(siteCopy.en, hiTranslation),
  it: createLocalizedCopy(siteCopy.en, itTranslation),
  ja: createLocalizedCopy(siteCopy.en, jaTranslation),
  kk: createLocalizedCopy(siteCopy.en, kkTranslation),
  ko: createLocalizedCopy(siteCopy.en, koTranslation),
  pl: createLocalizedCopy(siteCopy.en, plTranslation),
  pt: createLocalizedCopy(siteCopy.en, ptTranslation),
  tr: createLocalizedCopy(siteCopy.en, trTranslation),
  uk: createLocalizedCopy(siteCopy.en, ukTranslation),
  vi: createLocalizedCopy(siteCopy.en, viTranslation),
  ...Object.fromEntries(Object.entries(additionalTranslations).map(([id, translation]) => [id, createLocalizedCopy(siteCopy.en, translation)])),
});
