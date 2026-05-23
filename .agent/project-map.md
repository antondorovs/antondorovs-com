# Project Map

A quick map of the current project structure. Use it as orientation before changes and refactors.

## Root

- `README.md` — public project map: description, quick start, and documentation navigation.
- `.gitignore` — ignores local and generated files.
- `.gitlab-ci.yml` — GitLab pipeline for checks, dev deploy, manual production deploy, and Telegram notifications.

## Styles and Assets

- `apps/web/src/assets/` - React-owned images and game sprites used by the Vite app.
- `apps/web/src/assets/icons/` - SVG icon source files for the active site.
- `apps/web/public/` - static files copied directly into the React build, currently the favicon and Apache `.htaccess`.

## Games

- `apps/web/src/games/` - active React game routes/modules for Dino, Snake, Flappy Bird, Game of Life, and Snake Unlimited.

## React App

- `apps/web/` - Vite React frontend scaffold.
- `apps/web/src/modules/` - first modular home page sections: header, banner, intro, summary, games, about, work, contact, and footer.
- `apps/web/src/modules/analytics/` - analytics loader for Google tag, Yandex.Metrika, and Microsoft Clarity.
- `apps/web/src/games/` - React game routes/modules for Dino, Snake, Flappy Bird, Game of Life, and Snake Unlimited.
- `apps/web/src/shared/styles/` - reset, design tokens, and global styles for the React app.

## Future App Architecture

- `.agent/react-php-mysql-app-architecture-plan.md` - living ExecPlan for the future React frontend, PHP JSON API, MySQL database, authentication, settings, i18n, profile, and game score architecture.

## CI/CD

- `.agent/gitlab-telegram-setup.md` — manual setup guide for the Telegram bot and GitLab CI/CD variables.

The current CI/CD path is the GitLab pipeline with React build checks, automatic dev deploy from `apps/web/dist/`, manual production deploy from `apps/web/dist/`, and Telegram notifications.
