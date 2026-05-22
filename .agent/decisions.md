# Decisions

Project decision log. Record not only what was decided, but why, so future work does not have to reconstruct context from commits.

## 2026-05-21

- Decision: Use `.agent/` as project memory.
  Rationale: The project did not have root documentation for Codex and future contributors. It needs a compact set of files for the roadmap, tasks, decisions, and project map.

- Decision: Keep `AGENTS.md` compact.
  Rationale: It is the entry file for agents, not a full project encyclopedia. Detailed rules for large tasks live in `.agent/PLANS.md`.

- Decision: Do not delete `GameDino/Downasaur-download` immediately.
  Rationale: Superseded on 2026-05-22. The folder was later moved into `archive/unused` when the React app became the active project structure.

- Decision: Do not refactor the site structure together with documentation.
  Rationale: The current goal is to make the project easier to understand and safer to change. Moving files could affect links, games, and deploy.

- Decision: Treat GitHub Actions as temporary and unstable CI/CD.
  Rationale: The current environment deploy is unreliable. The plan is to rebuild the pipeline in GitLab with Telegram notifications.

- Decision: Before adding `.gitlab-ci.yml`, document the manual Telegram and GitLab variable setup.
  Rationale: The notification pipeline depends on secrets that must not be stored in the repository. A separate guide reduces the risk of losing context and makes manual setup easier to coordinate.

- Decision: Start GitLab CI/CD with `notify-only + checks`, without real deploy.
  Rationale: The GitLab pipeline and Telegram notification link should be stabilized first. Deploy stages are safer to add after notification and basic checks are confirmed.

- Decision: Temporarily disable GitHub Actions deploy by moving workflows to `.github/workflows_disabled/`.
  Rationale: Superseded on 2026-05-22. The old GitHub Actions deploy is unstable, but it is useful as setup history; disabled workflows now live in `archive/unused/github-actions-disabled/`.

- Decision: Replace top-level `workflow` in `.gitlab-ci.yml` with job-level `rules`.
  Rationale: GitLab rejected the first pipeline with `jobs project config should implement the script:, run:, or trigger: keyword`, effectively reading `workflow` as a job. Job-level `rules` preserve the branch restrictions for `dev`, `main`, and manual web pipelines without the disputed top-level block.

- Decision: Simplify the Telegram job YAML and rename `checks` to `ci_checks`.
  Rationale: GitLab continued rejecting the pipeline with the `jobs project config` error after removing top-level `workflow`. The likely cause was ambiguous parsing of a multiline shell block containing lines like `Project:`. Building the message with `printf` and using an explicit job name reduces CI linter ambiguity.

- Decision: Use `node:22-alpine` and pin `html-validate@11.2.0` for HTML validation.
  Rationale: `html-validate@11.2.0` requires Node `^22.17.0 || >= 24.0.0`; on `node:20-alpine`, CI failed with `EBADENGINE` and `fs.globSync is not a function`. Pinning the validator version is more predictable than using `latest`.

- Decision: Fix real HTML validation errors instead of weakening validator rules.
  Rationale: After updating Node, CI started showing real markup errors in `index.html` and `gameofLife.html`. Fixing HTML improves site quality and makes validation an honest quality gate.

- Decision: Add GitLab deploy only for the `dev` branch first.
  Rationale: Dev deploy validates FTP delivery and the environment without production risk. Main deploy should be added separately after dev is stable.

- Decision: Add production deploy as a manual job on the `main` branch.
  Rationale: Production should be deployed only after green checks and an explicit user action. This lowers the risk of accidental automatic deploy to `/public_html/`.

- Decision: Treat GitHub and GitLab as equal remotes, but synchronize them in one fixed order.
  Rationale: Divergence appeared because work happened on both platforms: some merge/push actions happened through GitHub, others through GitLab. To avoid different merge commits and `fetch first` rejections, changes start on `dev`, then get pushed to both `origin` and `gitlab`; after merging `dev -> main`, `dev` is aligned back to `main` and pushed to both remotes. `git push --force` is not used for this synchronization without a separate decision.

## 2026-05-22

- Decision: Keep agent-facing project documentation in English.
  Rationale: English usually tokenizes more compactly than Russian Cyrillic for the model and is easier for coding agents to consume. User-facing docs may remain Russian unless a separate task asks to translate them.

- Decision: Document the future React/PHP/MySQL application architecture before adding app tooling.
  Rationale: The migration introduces authentication, relational data, profile editing, themes, interface languages, and game score persistence. Planning the module layout, data model, and deployment assumptions first reduces the risk of starting with a painful structure.

- Decision: Use `.agent/react-php-mysql-app-architecture-plan.md` as the living architecture and migration ExecPlan.
  Rationale: The requested change is architectural and complex. A self-contained ExecPlan gives future contributors a single source of truth and keeps implementation milestones, validation, and deployment rules visible.

- Decision: Target React JavaScript, PHP JSON API, and MySQL 5.7 for v1 instead of Node.js and PostgreSQL.
  Rationale: The current Timeweb virtual hosting supports PHP/MySQL and already has MySQL databases. A Node.js API would require VDS or cloud hosting, which is unnecessary cost for a small personal project.

- Decision: Use separate Timeweb databases for development and production.
  Rationale: `cg75134_antondorovsdev` can be used for migration tests and development without risking production data in `cg75134_antondorovs`.

- Decision: Deploy the React build from `apps/web/dist` for both dev and manual production deploys.
  Rationale: The legacy root HTML entry points were moved into `archive/legacy-static`, so both deploy jobs must publish the Vite production build.
