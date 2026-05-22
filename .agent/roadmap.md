# Roadmap

This file records the strategic direction of the project so the site does not grow as a set of random changes.

## Current Direction

The project is now a React/Vite migration of the Anton Dorovskikh personal site with a home page, social links, and browser games. The main near-term goal is to make the React app a clean portfolio: clear, fast, responsive, and useful for showing experience.

## Near-Term Improvements

- Fill the `WORK` and `CONTACT` sections with real content.
- Improve the React mobile menu: close after clicking a menu item and keep buttons accessible.
- Add SEO and social preview metadata: description, Open Graph, Twitter meta, and a preview image.
- Optimize images: dimensions, formats, and lazy loading where appropriate.
- Present games as cards with a title, short description, and launch link.
- Add basic quality checks: HTML/CSS validation, link checks, and future smoke tests.

## Future Path

The confirmed v1 application path is a migration from the static site to a React frontend with JavaScript and Vite, plus a plain PHP JSON API and MySQL 5.7 on the current Timeweb hosting.

The future application direction is captured in `.agent/react-php-mysql-app-architecture-plan.md`. The target app keeps the portfolio and games, adds a modular React frontend, a PHP API, MySQL persistence, authentication, user profile management, theme selection, interface language selection, and saved game records.

Development and production databases are separate: `cg75134_antondorovsdev` for dev and `cg75134_antondorovs` for production. SQL migrations are applied to dev first, then to production only after dev verification and a production export through phpMyAdmin.

CI/CD has moved to GitLab: the pipeline runs checks, deploys `dev` automatically, supports manual production deploy from `main`, and sends Telegram notifications. Future CI/CD work should focus on stability, clearer deploy reporting, and broader quality checks.
