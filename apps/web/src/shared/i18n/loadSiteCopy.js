import { DEFAULT_LANGUAGE } from './languages.js';

// Explicit imports ensure each language remains an independent, on-demand chunk.
const fullCopyLoaders = {
  en: () => import('./siteCopyEn.js').then((m) => m.enCopy),
  ru: () => import('./siteCopyRu.js').then((m) => m.ruCopy),
  ar: () => import('./siteCopyAr.js').then((m) => m.arCopy),
  de: () => import('./siteCopyDe.js').then((m) => m.deCopy),
  es: () => import('./siteCopyEs.js').then((m) => m.esCopy),
  fr: () => import('./siteCopyFr.js').then((m) => m.frCopy),
  me: () => import('./siteCopyMe.js').then((m) => m.meCopy),
  sr: () => import('./siteCopySr.js').then((m) => m.srCopy),
  zh: () => import('./siteCopyZh.js').then((m) => m.zhCopy),
};
const additionalTranslationLoaders = {
  az: () => import('./siteCopyAz.js').then((m) => m.azTranslation),
  be: () => import('./siteCopyBe.js').then((m) => m.beTranslation),
  bg: () => import('./siteCopyBg.js').then((m) => m.bgTranslation),
  bs: () => import('./siteCopyBs.js').then((m) => m.bsTranslation),
  cs: () => import('./siteCopyCs.js').then((m) => m.csTranslation),
  da: () => import('./siteCopyDa.js').then((m) => m.daTranslation),
  el: () => import('./siteCopyEl.js').then((m) => m.elTranslation),
  et: () => import('./siteCopyEt.js').then((m) => m.etTranslation),
  fa: () => import('./siteCopyFa.js').then((m) => m.faTranslation),
  fi: () => import('./siteCopyFi.js').then((m) => m.fiTranslation),
  fil: () => import('./siteCopyFil.js').then((m) => m.filTranslation),
  ha: () => import('./siteCopyHa.js').then((m) => m.haTranslation),
  hr: () => import('./siteCopyHr.js').then((m) => m.hrTranslation),
  hu: () => import('./siteCopyHu.js').then((m) => m.huTranslation),
  hy: () => import('./siteCopyHy.js').then((m) => m.hyTranslation),
  is: () => import('./siteCopyIs.js').then((m) => m.isTranslation),
  jv: () => import('./siteCopyJv.js').then((m) => m.jvTranslation),
  ka: () => import('./siteCopyKa.js').then((m) => m.kaTranslation),
  lt: () => import('./siteCopyLt.js').then((m) => m.ltTranslation),
  lv: () => import('./siteCopyLv.js').then((m) => m.lvTranslation),
  mk: () => import('./siteCopyMk.js').then((m) => m.mkTranslation),
  my: () => import('./siteCopyMy.js').then((m) => m.myTranslation),
  nb: () => import('./siteCopyNb.js').then((m) => m.nbTranslation),
  nl: () => import('./siteCopyNl.js').then((m) => m.nlTranslation),
  om: () => import('./siteCopyOm.js').then((m) => m.omTranslation),
  ro: () => import('./siteCopyRo.js').then((m) => m.roTranslation),
  sk: () => import('./siteCopySk.js').then((m) => m.skTranslation),
  sl: () => import('./siteCopySl.js').then((m) => m.slTranslation),
  sq: () => import('./siteCopySq.js').then((m) => m.sqTranslation),
  sv: () => import('./siteCopySv.js').then((m) => m.svTranslation),
  sw: () => import('./siteCopySw.js').then((m) => m.swTranslation),
  th: () => import('./siteCopyTh.js').then((m) => m.thTranslation),
  ur: () => import('./siteCopyUr.js').then((m) => m.urTranslation),
  uz: () => import('./siteCopyUz.js').then((m) => m.uzTranslation),
};
const translationLoaders = {
  ...Object.fromEntries(Object.entries(additionalTranslationLoaders).map(([id, load]) => [id, async () => {
    const [translation, { applyAdditionalLanguageLabels }] = await Promise.all([
      load(), import('./additionalLanguageLabels.js'),
    ]);
    return applyAdditionalLanguageLabels(id, translation);
  }])),
  bn: () => import('./siteCopyBn.js').then((m) => m.bnTranslation),
  he: () => import('./siteCopyHe.js').then((m) => m.heTranslation),
  hi: () => import('./siteCopyHi.js').then((m) => m.hiTranslation),
  it: () => import('./siteCopyIt.js').then((m) => m.itTranslation),
  ja: () => import('./siteCopyJa.js').then((m) => m.jaTranslation),
  kk: () => import('./siteCopyKk.js').then((m) => m.kkTranslation),
  ko: () => import('./siteCopyKo.js').then((m) => m.koTranslation),
  pl: () => import('./siteCopyPl.js').then((m) => m.plTranslation),
  pt: () => import('./siteCopyPt.js').then((m) => m.ptTranslation),
  tr: () => import('./siteCopyTr.js').then((m) => m.trTranslation),
  uk: () => import('./siteCopyUk.js').then((m) => m.ukTranslation),
  vi: () => import('./siteCopyVi.js').then((m) => m.viTranslation),
};

const loaders = {
  ...fullCopyLoaders,
  ...Object.fromEntries(Object.entries(translationLoaders).map(([id, load]) => [id, async () => {
    const [translation, { commonCopy }, { createLocalizedCopy }] = await Promise.all([
      load(), import('./commonCopy.js'), import('./createLocalizedCopy.js'),
    ]);
    return createLocalizedCopy(commonCopy, translation);
  }])),
};

export function createCopyLoader(dictionaryLoaders) {
  const cache = new Map();
  return function loadCopy(requestedLanguage) {
    const language = Object.hasOwn(dictionaryLoaders, requestedLanguage) ? requestedLanguage : DEFAULT_LANGUAGE;
    if (!cache.has(language)) {
      const pending = Promise.resolve().then(() => dictionaryLoaders[language]())
        .then((copy) => ({ language, copy }))
        .catch((error) => { cache.delete(language); throw error; });
      cache.set(language, pending);
    }
    return cache.get(language);
  };
}

export const loadSiteCopy = createCopyLoader(loaders);
