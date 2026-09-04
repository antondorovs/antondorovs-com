// Complete additional catalog for tests/offline tools only; never import from browser entry points.
import { azTranslation } from './siteCopyAz.js';
import { beTranslation } from './siteCopyBe.js';
import { bgTranslation } from './siteCopyBg.js';
import { bsTranslation } from './siteCopyBs.js';
import { csTranslation } from './siteCopyCs.js';
import { daTranslation } from './siteCopyDa.js';
import { elTranslation } from './siteCopyEl.js';
import { etTranslation } from './siteCopyEt.js';
import { faTranslation } from './siteCopyFa.js';
import { fiTranslation } from './siteCopyFi.js';
import { filTranslation } from './siteCopyFil.js';
import { haTranslation } from './siteCopyHa.js';
import { hrTranslation } from './siteCopyHr.js';
import { huTranslation } from './siteCopyHu.js';
import { hyTranslation } from './siteCopyHy.js';
import { isTranslation } from './siteCopyIs.js';
import { jvTranslation } from './siteCopyJv.js';
import { kaTranslation } from './siteCopyKa.js';
import { ltTranslation } from './siteCopyLt.js';
import { lvTranslation } from './siteCopyLv.js';
import { mkTranslation } from './siteCopyMk.js';
import { myTranslation } from './siteCopyMy.js';
import { nbTranslation } from './siteCopyNb.js';
import { nlTranslation } from './siteCopyNl.js';
import { omTranslation } from './siteCopyOm.js';
import { roTranslation } from './siteCopyRo.js';
import { skTranslation } from './siteCopySk.js';
import { slTranslation } from './siteCopySl.js';
import { sqTranslation } from './siteCopySq.js';
import { svTranslation } from './siteCopySv.js';
import { swTranslation } from './siteCopySw.js';
import { thTranslation } from './siteCopyTh.js';
import { urTranslation } from './siteCopyUr.js';
import { uzTranslation } from './siteCopyUz.js';
import { applyAdditionalLanguageLabels } from './additionalLanguageLabels.js';

export const additionalTranslations = Object.fromEntries(Object.entries({
  az: azTranslation,
  be: beTranslation,
  bg: bgTranslation,
  bs: bsTranslation,
  cs: csTranslation,
  da: daTranslation,
  el: elTranslation,
  et: etTranslation,
  fa: faTranslation,
  fi: fiTranslation,
  fil: filTranslation,
  ha: haTranslation,
  hr: hrTranslation,
  hu: huTranslation,
  hy: hyTranslation,
  is: isTranslation,
  jv: jvTranslation,
  ka: kaTranslation,
  lt: ltTranslation,
  lv: lvTranslation,
  mk: mkTranslation,
  my: myTranslation,
  nb: nbTranslation,
  nl: nlTranslation,
  om: omTranslation,
  ro: roTranslation,
  sk: skTranslation,
  sl: slTranslation,
  sq: sqTranslation,
  sv: svTranslation,
  sw: swTranslation,
  th: thTranslation,
  ur: urTranslation,
  uz: uzTranslation,
}).map(([id, translation]) => [id, applyAdditionalLanguageLabels(id, translation)]));
