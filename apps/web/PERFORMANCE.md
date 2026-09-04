# Loading and image budgets

The browser imports `loadSiteCopy.js`, not the complete `siteCopy.js` catalog.
That complete catalog is retained for tests and offline translation tooling only.
Every enabled language must have an explicit dynamic loader and complete copy.
New drafts are available locally for review; see `src/shared/i18n/TRANSLATION_REVIEW.md`
for the review required before publication. Shared translation data in
`commonCopy.js` contains language-neutral names, links and technology lists, not
an English fallback dictionary.

On startup the primary browser language is used unless an explicit site choice
was saved. Unsupported languages fall back to English. Initial download failure
also attempts English without overwriting the saved preference. On switching,
keep the current copy until the requested dictionary arrives; only the latest
request may update the view and storage. Failed downloads can be retried.

`GamePage` and `PrivacyPolicyPage` are lazy route components. Each game has its own
dynamic import inside `GamePage`; adding a game must not import it statically.
Route/component loading has a waiting state and a reload option on failure.

Site display images are WebP. Original PNGs stay in `src/assets/site` and are not
imported by the app. The avatar is 390 × 390 (3× its largest 130px CSS size);
the banner retains its original dimensions. Both use WebP quality 88. Recreate
them with `node scripts/optimize-site-images.mjs [path-to-sharp]`; conversion is
an offline development step and requires no browser or runtime dependency.

Checks:

- `npm run test:i18n`: copy equivalence, browser preferences, lazy-loader caching
  and failure/retry behaviour.
- `npm run build` then `npm run test:bundle`: inspect the built manifest, prohibit
  eager languages/games, ensure separate dictionary/game chunks, and enforce
  budgets of 300 kB initial JavaScript and 650 kB combined home images.

The budgets measure build artifacts, not measured page-load time, network
compression configuration, analytics overhead, or Core Web Vitals. Test real
devices and throttled networks separately before making timing guarantees.
