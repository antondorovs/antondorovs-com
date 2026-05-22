# Project Map

A quick map of the current project structure. Use it as orientation before changes and refactors.

## Root

- `README.md` — public project map: description, quick start, and documentation navigation.
- `index.html` — home page of the personal website.
- `script.js` — JavaScript for the home page, currently mostly the mobile menu.
- `gameDino.html`, `gameSnake.html`, `gameFB.html`, `gameofLife.html`, `gameSnakeUnlim.html` — HTML entry points for games.
- `.htaccess` — Apache server settings.
- `.gitignore` — ignores local and generated files.
- `.gitattributes` — GitHub Linguist settings; hides the archived Java Dino version from language statistics.
- `.gitlab-ci.yml` — GitLab pipeline for checks, dev deploy, manual production deploy, and Telegram notifications.

## Styles and Assets

- `styles/` — CSS for the site and individual games.
- `img/` — site images, favicon, and photos.
- `icons/` — SVG icons.

## Games

- `GameDino/` — active browser Dino game and its assets. Active script: `GameDino/gameDino.js`.
- `GameDino/Downasaur-download/` — archived Java version of Dino. The site does not use it.
- `GameSnake/` — Snake files.
- `GameFlappyBird/` — Flappy Bird files.
- `GameOfLife/` — Game of Life files.
- `GameSnakeUnlimited/` — Snake Unlimited files.

## React App

- `apps/web/` - Vite React frontend scaffold.
- `apps/web/src/modules/` - first modular home page sections: header, banner, intro, summary, games, about, work, contact, and footer.
- `apps/web/src/modules/analytics/` - analytics loader for Google tag, Yandex.Metrika, and Microsoft Clarity.
- `apps/web/src/games/` - React game routes/modules for Dino, Snake, Flappy Bird, Game of Life, and Snake Unlimited.
- `apps/web/src/shared/styles/` - reset, design tokens, and global styles for the React app.

## Future App Architecture

- `.agent/react-php-mysql-app-architecture-plan.md` - living ExecPlan for the future React frontend, PHP JSON API, MySQL database, authentication, settings, i18n, profile, and game score architecture.

## CI/CD

- `.github/workflows/` — GitHub Actions folder. Deploy workflows are temporarily disabled and moved out of this folder.
- `.github/workflows_disabled/` — disabled experimental workflows and the archived old GitHub Actions deploy setup.
- `.agent/gitlab-telegram-setup.md` — manual setup guide for the Telegram bot and GitLab CI/CD variables.

The current CI/CD path is the GitLab pipeline with checks, automatic dev deploy, manual production deploy, and Telegram notifications.
