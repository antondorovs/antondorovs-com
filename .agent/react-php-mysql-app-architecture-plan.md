# Convert the static site into a React and PHP/MySQL application

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `.agent/PLANS.md`. It is self-contained so a future contributor can continue without reading the conversation that created it.

## Purpose / Big Picture

The current project is a static personal website with separate HTML game entry points. The future application should keep the portfolio and games, but add a React frontend, a PHP JSON API, MySQL persistence, user accounts, theme selection, interface language selection, a personal account page, and saved game records.

The full v1 result will be: a visitor can open the site, choose light/dark/system theme, use the interface in English or Russian, register or sign in from the header, view and edit their profile, play React-based games, and have their best score saved in MySQL.

The v1 architecture intentionally uses the current Timeweb virtual hosting instead of a separate Node.js server or Timeweb Cloud service. Timeweb virtual hosting supports PHP and MySQL well, and the project is small, personal, and non-commercial.

## Progress

- [x] (2026-05-22 17:38Z) Reviewed the current repository shape, existing `.agent` documentation, and README.
- [x] (2026-05-22 17:38Z) Confirmed local `dev`, `main`, `origin/*`, and `gitlab/*` refs pointed to the same commit before architecture work.
- [x] (2026-05-22 17:38Z) Drafted the first architecture plan around React, Node.js, and PostgreSQL before hosting constraints were known.
- [x] (2026-05-22 18:30Z) Replaced the v1 target with React, JavaScript, PHP, and MySQL after confirming the current Timeweb hosting model.
- [x] (2026-05-22 18:30Z) Confirmed two MySQL databases exist for separate environments: `cg75134_antondorovsdev` for development and `cg75134_antondorovs` for production.
- [x] (2026-05-22 19:05Z) Created the React/Vite scaffold in `apps/web` with JavaScript, modular home page sections, and production build verification.
- [x] (2026-05-22 19:05Z) Ported the current home page content into initial React modules while keeping legacy root HTML and game entry points untouched.
- [x] (2026-05-22 19:50Z) Added React dependency install and production build to GitLab `ci_checks`, while excluding `apps/` from the current FTP deploy until the React app becomes the active site.
- [x] (2026-05-22 20:25Z) Ported game entry points into React hash routes under `apps/web/src/games`: Dino, Snake, Game of Life, Flappy Bird, and Snake Unlimited.
- [x] (2026-05-22 20:25Z) Added a separate React analytics module for Google tag, Yandex.Metrika, and Microsoft Clarity.
- [x] (2026-05-22 20:25Z) Switched GitLab `deploy_dev` to upload `apps/web/dist/` while keeping production deploy on the legacy static root.
- [ ] Add PHP API, SQL migrations, authentication, profile, password reset, and score persistence.

## Surprises & Discoveries

- Observation: The current Timeweb panel provides MySQL 5.7, phpMyAdmin, and multiple databases.
  Evidence: User screenshots showed `MySQL 5.7`, phpMyAdmin access, and the created `cg75134_antondorovs` database.

- Observation: A Node.js API is not a good v1 fit for the existing Timeweb virtual hosting.
  Evidence: Timeweb documentation describes Node.js on virtual hosting as a console utility use case, while long-running services belong on VDS or cloud infrastructure.

- Observation: The project can safely use separate dev and production databases without extra database hosting.
  Evidence: The Timeweb panel showed database usage as 4 databases out of an unlimited quota, and the user created `cg75134_antondorovsdev` and `cg75134_antondorovs`.

## Decision Log

- Decision: Use React with JavaScript and Vite for the frontend.
  Rationale: The user explicitly chose JavaScript rather than TypeScript. Vite is the simplest modern React setup for this project.
  Date/Author: 2026-05-22 / User and Codex

- Decision: Use PHP JSON API with PDO for backend v1.
  Rationale: The current Timeweb virtual hosting supports PHP/MySQL and avoids extra cost. A plain PHP API is enough for this small personal app.
  Date/Author: 2026-05-22 / User and Codex

- Decision: Use MySQL 5.7 on Timeweb for v1.
  Rationale: The database already exists on the current hosting. Migrations must stay MySQL 5.7-compatible.
  Date/Author: 2026-05-22 / User and Codex

- Decision: Keep separate databases for development and production.
  Rationale: Dev tests, migration checks, account deletion, and score updates must not risk production data.
  Date/Author: 2026-05-22 / User and Codex

- Decision: Use one generic `game_scores` table instead of one score table per game.
  Rationale: A single table preserves the requested one-score-per-user-per-game behavior and avoids repeated schema/API work for every game.
  Date/Author: 2026-05-22 / User and Codex

- Decision: Port games into React for v1.
  Rationale: The user wants the site to become an application, not keep games as separate legacy HTML pages.
  Date/Author: 2026-05-22 / User

- Decision: Use hard delete for account deletion.
  Rationale: The user requested irreversible deletion of the account and all records.
  Date/Author: 2026-05-22 / User

## Outcomes & Retrospective

The architecture is now aligned with the real hosting environment and the user's cost constraints. The old Node.js/PostgreSQL plan is no longer the v1 target. The next outcome is a working React/Vite shell that reproduces the current home page and can be deployed as static assets before the PHP API is added.

Milestone 2 has started: `apps/web` now contains a Vite React app with a modular home page. It builds successfully with `npm.cmd run build`. The next outcome is to improve the scaffold toward deploy readiness and then migrate games into React routes/modules.

CI now verifies the React app with `npm ci --prefix apps/web` and `npm run build --prefix apps/web`. The current FTP deploy still serves the legacy static site and explicitly excludes `apps/`, so adding the React scaffold does not publish source files or switch production behavior early.

Milestone 4 is complete for current game parity. Dino, Snake, and Game of Life are implemented as React game components. Flappy Bird and Snake Unlimited are React routes that preserve the current legacy state because their original JavaScript files contain no game logic yet.

## Context and Orientation

Current repository shape:

- `index.html` is the static home page.
- `script.js` contains simple JavaScript for the mobile menu.
- `styles/main.css` contains the main site styles.
- `gameDino.html`, `gameSnake.html`, `gameFB.html`, `gameofLife.html`, and `gameSnakeUnlim.html` are current game entry points.
- `GameDino/`, `GameSnake/`, `GameFlappyBird/`, `GameOfLife/`, and `GameSnakeUnlimited/` contain game scripts and assets.
- `.gitlab-ci.yml` currently validates root HTML files and deploys the static site by FTP.
- `.agent/` contains project memory and this architecture plan.

The future app should remain easy to navigate. A module means a focused folder that owns one visible feature area, such as header, footer, auth modal, profile, or games.

## Proposed Repository Structure

The first React milestone should be additive. Keep the current root HTML and game files until the React app and deploy path are proven.

Recommended v1 structure:

    apps/
      web/
        public/
        src/
          app/
            App.jsx
            routes.jsx
            providers/
              AppProviders.jsx
          pages/
            HomePage/
              HomePage.jsx
              HomePage.css
            ProfilePage/
              ProfilePage.jsx
              ProfilePage.css
            GamePage/
              GamePage.jsx
              GamePage.css
          modules/
            header/
              Header.jsx
              Header.css
              index.js
            footer/
              Footer.jsx
              Footer.css
              index.js
            home-banner/
              HomeBanner.jsx
              HomeBanner.css
              index.js
            about/
              AboutSection.jsx
              AboutSection.css
              index.js
            work/
              WorkSection.jsx
              WorkSection.css
              index.js
            games/
              GamesSection.jsx
              GameCard.jsx
              games.config.js
              index.js
            auth/
              AuthModal.jsx
              SignInForm.jsx
              SignUpForm.jsx
              ForgotPasswordForm.jsx
              PasswordStrengthMeter.jsx
              auth.validation.js
              index.js
            profile/
              ProfileDetails.jsx
              ProfileEditForm.jsx
              DeleteAccountModal.jsx
              index.js
            settings/
              ThemeSelect.jsx
              LanguageSelect.jsx
              index.js
          shared/
            ui/
              Button/
              Modal/
              TextInput/
              PasswordInput/
              InlineFieldError/
            hooks/
              useAuth.js
              useClickOutside.js
            lib/
              api/
                httpClient.js
                apiErrors.js
              storage/
                localStorageKeys.js
              validation/
                userRules.js
            styles/
              reset.css
              tokens.css
              globals.css
          theme/
            ThemeProvider.jsx
            theme.constants.js
            applyTheme.js
          i18n/
            i18n.js
            detectLocale.js
            locales/
              en.json
              ru.json
              sr.json
              es.json
              fr.json
              de.json
    api/
      v1/
        index.php
        auth.php
        users.php
        scores.php
      src/
        config/
          env.php
        db/
          connection.php
        http/
          response.php
          request.php
          require_auth.php
        auth/
          auth_service.php
          password_rules.php
          session_service.php
        users/
          user_service.php
          user_validation.php
        scores/
          score_service.php
        mail/
          mail_service.php
        security/
          csrf.php
          password_hash.php
          reset_tokens.php
    database/
      migrations/
        001_initial_schema.sql
      seeds/
        001_games.sql
    legacy-static/
      index.html
      styles/
      script.js
      gameDino.html
      gameSnake.html
      gameFB.html
      gameofLife.html
      gameSnakeUnlim.html

Move files into `legacy-static/` only after React routes and deployment are ready. Until then, keep legacy files in place.

## Frontend Architecture

Use React as a single-page app. The browser loads one app shell, and React switches between home, profile, and game routes.

Use `apps/web/src/modules/` for domain sections: header, footer, banner, about, work, games, auth, profile, and settings. Use `apps/web/src/shared/ui/` only for generic controls.

The header owns:

- Desktop and mobile navigation.
- Theme selector: light, dark, or system.
- Language selector.
- `Sign in` button when logged out.
- User nickname link when logged in.

The auth module owns sign in, sign up, forgot password, password visibility, password strength, and field-level errors.

The profile module owns profile display, edit mode, save/cancel, logout, and account deletion.

## Theme Architecture

Supported preferences are `light`, `dark`, and `system`.

Anonymous visitors store theme preference in local storage. Logged-in users also save it in their profile. `system` follows `prefers-color-scheme`.

Use CSS custom properties in `apps/web/src/shared/styles/tokens.css`, and apply a document attribute such as `data-theme="light"` or `data-theme="dark"`.

## Internationalization Architecture

Default language is English (`en`). v1 ships English and Russian (`ru`). Future planned locales are Serbian (`sr`), Spanish (`es`), French (`fr`), and German (`de`).

On first visit, detect `navigator.languages`. If the browser locale matches a supported locale, use it. Otherwise fall back to English.

Store selected language in local storage for anonymous visitors and in the user profile after sign-in. Missing translations should fall back to English.

## Backend Architecture

Use PHP as a JSON API. Keep route files thin: parse input, call a service, and return JSON. Services apply business rules and use PDO for MySQL.

Use `password_hash()` and `password_verify()` for passwords. Store only password hashes.

Use HTTP-only cookies for sessions. Store session hashes in `user_sessions`.

Use Timeweb mail over SMTP with PHPMailer for password reset emails.

API endpoints live under `/api/v1`.

## Database Environments

Use two separate Timeweb MySQL databases:

- Development: `cg75134_antondorovsdev`
- Production: `cg75134_antondorovs`

The schemas must be identical. Dev and production differ only by connection configuration.

Rules:

- Apply every migration to `cg75134_antondorovsdev` first.
- Test the app against dev.
- Export a production backup from phpMyAdmin before production migrations.
- Apply the same migration to `cg75134_antondorovs` only after dev is verified.
- Never run experiments directly on production.

Use `localhost` database access from PHP. Do not enable external DB access for v1.

## Database Model

Use MySQL 5.7-compatible SQL. Use `utf8mb4` and a case-insensitive collation such as `utf8mb4_unicode_ci` for user-facing text.

Recommended tables:

    users
      id                 bigint unsigned auto_increment primary key
      user_name          varchar(50) not null
      nickname           varchar(20) not null
      email              varchar(50) not null
      password_hash      varchar(255) not null
      date_registration  datetime not null
      theme_preference   enum('light','dark','system') not null default 'system'
      locale_preference  varchar(10) null
      updated_at         datetime not null
      unique key users_nickname_unique (nickname)
      unique key users_email_unique (email)

    user_sessions
      id                 bigint unsigned auto_increment primary key
      user_id            bigint unsigned not null
      session_hash       varchar(255) not null
      created_at         datetime not null
      expires_at         datetime not null
      unique key user_sessions_hash_unique (session_hash)
      foreign key (user_id) references users(id) on delete cascade

    password_reset_tokens
      id                 bigint unsigned auto_increment primary key
      user_id            bigint unsigned not null
      token_hash         varchar(255) not null
      created_at         datetime not null
      expires_at         datetime not null
      used_at            datetime null
      unique key password_reset_tokens_hash_unique (token_hash)
      foreign key (user_id) references users(id) on delete cascade

    games
      game_key           varchar(40) primary key
      title              varchar(80) not null
      is_active          tinyint(1) not null default 1

    game_scores
      id                 bigint unsigned auto_increment primary key
      user_id            bigint unsigned not null
      game_key           varchar(40) not null
      score              int not null
      achieved_at        datetime not null
      unique key game_scores_user_game_unique (user_id, game_key)
      foreign key (user_id) references users(id) on delete cascade
      foreign key (game_key) references games(game_key)

`game_scores` implements one best score per user per game. When a new score is greater than or equal to the existing score, update the row. If the new score is lower, keep the old row.

## Validation Rules

Validate on both frontend and backend.

- Name: required, 1-50 characters. Allow Unicode letters, numbers, spaces, hyphen, and apostrophe. Reject obvious special symbols such as `!`, `@`, and `#`.
- Nickname: required, 1-20 characters. English letters and digits only. Unique case-insensitively.
- Email: required, 1-50 characters. Valid email shape. Unique case-insensitively. Store normalized lowercase email.
- Password: required, 8-50 characters. English letters, digits, and visible ASCII special characters. No spaces.
- Password confirmation: must match password.

Password strength:

- Weak: less than 8 characters or only one character category.
- Normal: at least 8 characters and two categories.
- Strong: at least 8 characters and three categories, including upper and lower case.
- Very strong: at least 12 characters and all four categories: uppercase, lowercase, digit, special character.

Require current password for changing email, changing password, and deleting account. Do not require current password for changing name or nickname.

## Authentication and Account Flows

Sign up:

1. User enters name, nickname, email, password, and password confirmation.
2. Frontend validates shape and password match.
3. PHP API validates again, checks unique nickname and email, hashes password, stores UTC registration date, creates the user, creates a session, and sets an HTTP-only cookie.
4. Header immediately shows the user's nickname.

Sign in:

1. User enters email or nickname plus password.
2. API verifies identifier and password.
3. API creates a session and sets an HTTP-only cookie.
4. Frontend fetches `/api/v1/auth/me`.

Forgot password:

1. User enters email or nickname.
2. API returns a neutral success response.
3. If account exists, API stores a hashed reset token and sends reset instructions by Timeweb SMTP.

Profile:

1. User clicks nickname in the header.
2. Profile shows name, nickname, email, registration date, theme, and language.
3. Edit enables fields and shows Save/Cancel.
4. Logout ends the session.
5. Delete opens confirmation and then hard-deletes the user and dependent records.

## API Contract Draft

Use JSON requests and responses under `/api/v1`.

    POST /api/v1/auth/sign-up
      body: { userName, nickname, email, password, passwordConfirmation, localePreference?, themePreference? }
      response: { user }

    POST /api/v1/auth/sign-in
      body: { identifier, password }
      response: { user }

    POST /api/v1/auth/sign-out
      response: { ok: true }

    POST /api/v1/auth/forgot-password
      body: { identifier }
      response: { ok: true }

    POST /api/v1/auth/reset-password
      body: { token, password, passwordConfirmation }
      response: { ok: true }

    GET /api/v1/auth/me
      response: { user: object | null }

    GET /api/v1/users/me
      response: { user }

    PATCH /api/v1/users/me
      body: { userName?, nickname?, email?, password?, passwordConfirmation?, currentPassword?, themePreference?, localePreference? }
      response: { user }

    DELETE /api/v1/users/me
      body: { currentPassword }
      response: { ok: true }

    POST /api/v1/scores/:gameKey
      body: { score }
      response: { score, wasUpdated }

    GET /api/v1/scores/:gameKey/me
      response: { score: object | null }

Never return `password_hash`, reset tokens, or session hashes.

## Game Integration

Stable game keys:

- `dino`
- `snake`
- `flappy-bird`
- `game-of-life`
- `snake-unlimited`

Games should become React routes/modules. When a game ends or a record is reached, submit the score only if the user is signed in. Anonymous users can keep local scores, but do not write them to MySQL.

## Plan of Work

Milestone 1 is documentation and architecture alignment. Replace the old React/Node/PostgreSQL plan with this React/PHP/MySQL plan, update README and `.agent` memory, and verify only documentation changed.

Milestone 2 is React scaffolding. Create the Vite React app in `apps/web`, preserve the current home page content, split it into modules, and verify it locally.

Milestone 3 is frontend settings. Add theme provider, CSS variables, language detection, English/Russian locale files, and header controls.

Milestone 4 is game migration. Port existing browser games into React routes/modules while preserving current behavior. Flappy Bird and Snake Unlimited remain under-development placeholders until their game logic is designed.

Milestone 5 is PHP API and MySQL schema. Add SQL migrations, PHP API structure, environment config, health endpoint, and database connection.

Milestone 6 is authentication and profile. Add sign-up, sign-in, sign-out, session persistence, forgot password, profile editing, logout, and hard delete.

Milestone 7 is game scores. Add score endpoints and connect games to score submission.

Milestone 8 is CI/deploy alignment. React build checks may run early. `deploy_dev` now uploads `apps/web/dist/` to the dev stand. Production deploy must keep serving the legacy static site until the dev React stand is verified and a separate production switch decision is made.

## Concrete Steps

For Milestone 1:

    git status --short --branch
    git rev-parse dev origin/dev gitlab/dev main origin/main gitlab/main

Update:

- `README.md`
- `AGENTS.md`
- `.agent/roadmap.md`
- `.agent/tasks.md`
- `.agent/project-map.md`
- `.agent/decisions.md`
- this plan file

For future SQL migrations through phpMyAdmin:

1. Open Timeweb hosting panel.
2. Open `Базы данных`.
3. Open phpMyAdmin for the target database.
4. Select the database on the left.
5. For backup, use `Экспорт` and download the SQL dump.
6. For migration, open `SQL`, paste the migration content, and run it.
7. Always run on `cg75134_antondorovsdev` first.
8. Run on `cg75134_antondorovs` only after dev verification and production export.

## Validation and Acceptance

Milestone 1 acceptance:

- README and `.agent` no longer describe Node.js/PostgreSQL as the v1 stack.
- The architecture clearly names `cg75134_antondorovsdev` for dev and `cg75134_antondorovs` for production.
- The plan mentions phpMyAdmin backup/migration workflow.
- `git diff --check` has no whitespace errors.
- `git status --short --branch` shows only intended documentation files.

Future acceptance:

- React app starts locally and shows the current site content.
- Mobile layout has no horizontal scroll.
- Browser console has no unexpected errors.
- PHP health endpoint returns JSON.
- MySQL migrations create expected tables on dev first.
- Auth, profile, password reset, hard delete, and scores work end to end.
- Production migration is never run before dev validation and backup.

Current React scaffold verification:

    npm.cmd install
    npm.cmd ci
    npm.cmd run build

Expected result: Vite production build completes successfully. Browser check at `http://127.0.0.1:5173/` shows the home page sections, no console errors or warnings, and no horizontal scroll at the checked desktop viewport.

Current game route verification:

    /
    /#/games/dino
    /#/games/snake
    /#/games/flappy-bird
    /#/games/game-of-life
    /#/games/snake-unlimited

Expected result: each route renders a React page, browser console has no errors or warnings, and desktop/mobile checked viewports have no horizontal scroll.

## Idempotence and Recovery

Documentation changes are safe to repeat. SQL migrations must be tracked as files and applied once per database. Before production migrations, export a production backup through phpMyAdmin.

Do not delete legacy static files until React routes and Timeweb deploy are proven.

## Artifacts and Notes

Initial synchronized refs before architecture execution:

    dev:        22fc09f9a618786abdd891c77707435b45bf2e5a
    origin/dev: 22fc09f9a618786abdd891c77707435b45bf2e5a
    gitlab/dev: 22fc09f9a618786abdd891c77707435b45bf2e5a
    main:       22fc09f9a618786abdd891c77707435b45bf2e5a

Timeweb phpMyAdmin guide:

    https://timeweb.com/ru/docs/virtualnyj-hosting/bazy-dannyh/osnovy-raboty-v-phpmyadmin/

Revision note, 2026-05-22 / Codex: Replaced the initial React/Node/PostgreSQL direction with the confirmed v1 architecture: React JavaScript, PHP JSON API, MySQL 5.7 on Timeweb, separate dev/prod databases, SQL migrations via phpMyAdmin, and Timeweb SMTP mail.
