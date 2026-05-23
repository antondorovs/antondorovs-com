# Tasks

A living task list for the project. Update it after meaningful changes so the next work session does not start with rediscovery.

## Done

- Retire the archived Java Dino version from the active repository tree.
- Add project memory in `AGENTS.md` and `.agent/`.
- Document manual Telegram/GitLab steps for future CI/CD work.
- Add a GitLab CI pipeline with checks and Telegram notification before real deploy.
- Fix HTML validation errors in `index.html` and `gameofLife.html`.
- Add the `deploy_dev` stage in GitLab CI for the dev environment.
- Add the manual `deploy_prod` stage in GitLab CI for production.
- Document the GitHub/GitLab branch synchronization workflow in `README.md` and `AGENTS.md`.
- Translate `AGENTS.md` and `.agent/*.md` from Russian to English to reduce token usage and improve agent readability.
- Draft the future React/PHP/MySQL application architecture plan in `.agent/react-php-mysql-app-architecture-plan.md`.
- Confirm v1 stack decisions: React JavaScript with Vite, PHP JSON API with PDO, MySQL 5.7 on Timeweb, separate dev/prod databases, SQL migrations through phpMyAdmin, and Timeweb SMTP mail.
- Create the React/Vite frontend scaffold in `apps/web`.
- Port the current home page content into initial React modules.
- Add React `npm ci` and production build checks to GitLab CI without switching deploy to React.
- Add React routes/modules for Dino, Snake, Game of Life, Flappy Bird, and Snake Unlimited.
- Add a separate React analytics module for Google tag, Yandex.Metrika, and Microsoft Clarity.
- Switch GitLab `deploy_dev` to upload the React build from `apps/web/dist/`.
- Move React-used images and game sprites into `apps/web/src/assets`.
- Remove unused archived Dino Java and Snake sample files.
- Tune the React intro alignment and section divider spacing/color against the current production screenshots.
- Remove legacy root HTML entry points.
- Remove legacy static support files (`script.js`, `styles`, and old `Game*` folders).
- Remove unused legacy image variants and old game asset folders.
- Remove disabled GitHub Actions workflows after switching deploy ownership to GitLab.
- Move Apache `.htaccess` into `apps/web/public` so the React build deploy includes it.
- Switch the manual production deploy job to publish the React build from `apps/web/dist`.
- Remove the legacy archive folders after confirming the React app no longer references them.
- Remove `.gitattributes` after deleting the archive rules it existed for.
- Remove obsolete Java ignore rules from `.gitignore`.
- Move surviving SVG icon files into `apps/web/src/assets/icons`.

## Planned

- Keep `README.md` maintained as the public project map.
- Verify the React app on the GitLab dev stand after push.
- Verify the React production switch after the manual `deploy_prod` job is intentionally run from `main`.
- Add the PHP API skeleton and MySQL migration files.
- Apply SQL migrations to `cg75134_antondorovsdev` before production.
- Fill the `WORK` and `CONTACT` sections on the home page.
- Improve the mobile menu.
- Add SEO and social preview metadata.
- Optimize images.
- Present the games section as cards.
- Add basic quality checks.
- Verify production deploy stability after the first manual run.
- Keep `dev` and `main` synchronized between GitHub and GitLab after each merge or release.

## Later

- Add authentication, profile editing, hard account deletion, Timeweb SMTP password reset, and game score persistence.
- Update GitLab CI/CD for React build and PHP/static deploy after local behavior is stable.
- Consider Node.js/PostgreSQL only as a future migration if the project outgrows the current Timeweb hosting.
