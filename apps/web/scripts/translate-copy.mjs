// One-off draft importer. Prints a patch; never writes files or runs in the site.
// Sends only the public English site copy to Google Translate.
import { siteCopy } from '../src/shared/i18n/siteCopy.js';

const language = process.argv[2];
if (!/^[a-z]{2,3}$/.test(language ?? '')) throw new Error('Expected a language code');
const en = siteCopy.en;
const dynamic = {
  'header.theme.buttonLabel': ['({ selectedMode, effectiveTheme })', { selectedMode: 'ZXQ9001ZXQ', effectiveTheme: 'ZXQ9002ZXQ' }],
  'header.language.buttonLabel': ['({ selectedLanguage })', { selectedLanguage: 'ZXQ9003ZXQ' }],
  'games.dino.score': ['(score)', { score: 'ZXQ9004ZXQ' }],
  'games.dino.gameOver': ['(score)', { score: 'ZXQ9004ZXQ' }],
  'games.life.counter': ['(cycleCounter)', { cycleCounter: 'ZXQ9005ZXQ' }],
  'games.life.toggleCell': ['({ row, col })', { row: 'ZXQ9006ZXQ', col: 'ZXQ9007ZXQ' }],
};
const source = {
  nav: en.nav, header: en.header, homeBanner: en.homeBanner,
  intro: { ariaLabel: en.intro.ariaLabel, socialAriaLabel: en.intro.socialAriaLabel, socialLabels: en.intro.socialLabels },
  summary: en.summary, about: en.about,
  experience: {
    title: en.experience.title, groups: en.experience.groups, cvLinks: en.experience.cvLinks,
    techStack: en.experience.techStack,
    work: en.experience.work.map((job, index) => ({ period: job.period, sentence: job.description[0] + `ZXQ910${index}ZXQ` + job.description[2] })),
    education: en.experience.education, skillTitles: en.experience.skillGroups.map(({ title }) => title),
  },
  games: Object.fromEntries(Object.entries(en.games).filter(([key]) => key !== 'titles')),
  footer: Object.fromEntries(Object.entries(en.footer).filter(([key]) => key !== 'environments')),
  privacy: en.privacy,
};
const protectedTerms = ['Full Stack QA Engineer', 'Full Stack JavaScript Developer', 'Automation QA Engineer', 'Manual QA Engineer', 'QA engineer', 'QA specialists', 'Google Analytics', 'Yandex Metrica', 'Microsoft Clarity', 'Quality Academy', 'Elbrus Bootcamp', 'SkyEng', 'Duolingo', 'LinguaTrip', 'Telegram', 'LinkedIn', 'GitHub', 'GitLab', 'Game of Life', 'Snake unlimited', 'Snake', 'Dino', 'localStorage', 'antondorovs@gmail.com'];
// Leave ordinary prose such as "QA engineer" translatable; preserve product names.
protectedTerms.splice(protectedTerms.indexOf('QA engineer'), 2);
const entries = [];
function flatten(value, path = '') {
  if (typeof value === 'function') {
    const [, values] = dynamic[path];
    const argument = path === 'games.dino.score' || path === 'games.dino.gameOver' || path === 'games.life.counter' ? Object.values(values)[0] : values;
    value = value(argument);
  }
  if (typeof value === 'string') {
    let text = value;
    protectedTerms.forEach((term, index) => { text = text.replaceAll(term, `ZXQ${8000 + index}ZXQ`); });
    entries.push({ path, source: value, text });
  } else {
    Object.entries(value).forEach(([key, child]) => flatten(child, path ? `${path}.${key}` : key));
  }
}
flatten(source);
const translated = new Map();
async function translateText(text) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.search = new URLSearchParams({ client: 'gtx', sl: 'en', tl: language === 'nb' ? 'no' : language, dt: 't', q: text });
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Translation HTTP ${response.status}; stopped without retrying`);
  const data = await response.json();
  return data[0].map((segment) => segment[0] ?? '').join('');
}
const batches = [];
let batch = [];
let size = 0;
entries.forEach((entry, index) => {
  const line = `[${String(index).padStart(4, '0')}] ${entry.text}`;
  if (size + line.length > 3400 && batch.length) { batches.push(batch); batch = []; size = 0; }
  batch.push({ index, line }); size += line.length + 1;
});
if (batch.length) batches.push(batch);
async function translateGroup(group) {
  let result = await translateText(group.map(({ line }) => line).join('\n'));
  // Normalize only control markers, never translated text.
  result = result.replace(/ZXQ\s*(\d{4})\s*ZXQ/gi, (_, digits) => `ZXQ${digits}ZXQ`);
  if (group.length === 1 && !/\[\s*\d{4}\s*\]/.test(result)) {
    result = `[${String(group[0].index).padStart(4, '0')}] ${result}`;
  }
  const matches = [...result.matchAll(/\[\s*(\d{4})\s*\]/g)];
  const missingTokens = group.some(({ index }) => (entries[index].text.match(/ZXQ\d{4}ZXQ/g) ?? []).some((token) => !result.includes(token)));
  if (matches.length !== group.length || missingTokens) {
    if (group.length === 1 && missingTokens) {
      // Keep protected names verbatim if a translator drops an opaque token.
      const entry = entries[group[0].index];
      const pieces = entry.text.split(/(ZXQ\d{4}ZXQ)/g);
      const parts = [];
      for (const piece of pieces) {
        if (/^ZXQ\d{4}ZXQ$/.test(piece) || !/[a-zA-Z]/.test(piece)) parts.push(piece);
        else parts.push((/^\s/.test(piece) ? ' ' : '') + (await translateText(piece.trim())).trim() + (/\s$/.test(piece) ? ' ' : ''));
      }
      let text = parts.join('');
      protectedTerms.forEach((term, index) => { text = text.replaceAll(`ZXQ${8000 + index}ZXQ`, term); });
      translated.set(entry.path, text);
      return;
    }
    if (group.length === 1) throw new Error(`Lost translation markers for ${language}: ${result}`);
    const middle = Math.ceil(group.length / 2);
    await translateGroup(group.slice(0, middle));
    await translateGroup(group.slice(middle));
    return;
  }
  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    const entryIndex = Number(match[1]);
    if (entryIndex !== group[index].index) throw new Error('Reordered translation records');
    let text = result.slice(match.index + match[0].length, matches[index + 1]?.index ?? result.length).trim();
    for (const token of entries[entryIndex].text.match(/ZXQ\d{4}ZXQ/g) ?? []) {
      if (!text.includes(token)) throw new Error(`Lost ${token} in ${entries[entryIndex].path}: ${text}`);
    }
    protectedTerms.forEach((term, termIndex) => { text = text.replaceAll(`ZXQ${8000 + termIndex}ZXQ`, term); });
    translated.set(entries[entryIndex].path, text);
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
}
for (const group of batches) await translateGroup(group);
const output = {};
function set(path, value) {
  const keys = path.split('.'); let parent = output;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) parent[key] = value;
    else parent = parent[key] ??= /^\d+$/.test(keys[index + 1]) ? [] : {};
  });
}
for (const [path, value] of translated) set(path, value);
output.experience.work.forEach((job, index) => {
  const [before, after, extra] = job.sentence.split(`ZXQ910${index}ZXQ`);
  if (after === undefined || extra !== undefined) throw new Error('Invalid work link placeholder');
  delete job.sentence; job.before = before; job.after = after;
});
output.header.signIn.message = output.header.signIn.message.replace(/[.。।۔]+\s*$/u, '');
output.footer.notice.privacyPrefix = output.footer.notice.privacyPrefix.replace(/[\s:：.。।۔]+$/u, '') + ':';
output.footer.notice.privacySuffix = '.';
const exportName = `${language}Translation`;
let moduleText = `// Draft translation; review with a native speaker before publication.\nexport const ${exportName} = ${JSON.stringify(output, null, 2)};\n`;
for (const [path, [args, values]] of Object.entries(dynamic)) {
  let expression = JSON.stringify(translated.get(path));
  for (const [name, token] of Object.entries(values)) expression += `.replaceAll(${JSON.stringify(token)}, String(${name}))`;
  moduleText += `${exportName}.${path} = ${args} => ${expression};\n`;
}
const file = `apps/web/src/shared/i18n/siteCopy${language[0].toUpperCase()}${language.slice(1)}.js`;
process.stdout.write(JSON.stringify({ language, file, entries: entries.length, patch: `*** Begin Patch\n*** Add File: ${file}\n${moduleText.trimEnd().split('\n').map((line) => '+' + line).join('\n')}\n*** End Patch` }));
