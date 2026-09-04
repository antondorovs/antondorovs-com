# Additional language drafts

All 34 locales listed in `additionalLanguages.js` are now registered locally,
bringing the language menu to 55 entries. They are machine-assisted or AI-authored
translation drafts based on the site's English copy, not native-speaker approved.
Review prose, accessibility labels, game instructions, and the privacy notice
before treating these translations as publication-ready. Structural tests do not
prove linguistic or legal equivalence.

`additionalLanguageLabels.js` supplies context-specific button terms (especially
home, apply, clear, dark, and light) instead of ambiguous literal translations.
Names, technical stacks, existing English job titles, `follow me`, environment
names, game names, links, and the two existing CV PDFs follow the site's existing
localization convention.

The one-off `scripts/translate-copy.mjs` importer sends the public English copy to
Google Translate and prints a patch. It is not part of the application or build,
requires no runtime dependency, does not translate visitor data, and must not be
run automatically in CI. It validates record boundaries and dynamic placeholders;
HTTP errors stop the request rather than bypassing limits. Its output is a draft,
not a substitute for review.

Browser selection uses the primary preferred language, with English for an
unsupported language. A user's explicit site selection takes priority. Display
codes may differ from language tags: CN/zh, KZ/kk, PH/fil, ME/cnr. Persian and Urdu use RTL
text; the home-page and game-board layout remains LTR.

No separate Moldavian or Welsh locale was requested. Norwegian is Bokmål, not
Nynorsk (`no` resolves to `nb`, while unsupported `nn` falls back to English).
Javanese is distinct from Indonesian. Filipino uses the browser/HTML language code
`fil` and the user-requested display code `PH`. Oromo uses `om`.

This stage does not deploy or push changes. Before publication, review linguistic
quality (especially low-resource languages) and the equivalence of privacy text.
