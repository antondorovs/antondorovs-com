# AGENTS.md

## Stack

This project is currently a static personal website built with HTML, CSS, and JavaScript. Main pages live in the repository root, styles live in `styles/`, images in `img/`, icons in `icons/`, and browser game experiments in separate `Game*` folders.

The confirmed v1 application direction is React with JavaScript and Vite for the frontend, a plain PHP JSON API with PDO for the backend, and MySQL 5.7 on the current Timeweb hosting. Do not add a build tool, framework, backend, or database migration without a separate decision.

## Key Commands

- Check repository state: `git status --short --branch`
- List files: `rg --files`
- Search text: `rg "pattern"`
- Run locally without a build step: open `index.html` in a browser or start any static server from the repository root.
- Run the new React app locally: `cd apps/web; npm.cmd install; npm.cmd run dev`.
- Build the new React app: `cd apps/web; npm.cmd run build`.
- Restart locally: stop the current static server and start it again.
- Test manually for now: check `index.html`, game links, the mobile menu, responsive layout, and the browser console.
- CI checks: GitLab runs `.gitlab-ci.yml` on the `dev` and `main` branches.

There is no build command yet. There are no full app or e2e tests yet. The current GitLab pipeline runs smoke checks, HTML validation, dev deploy, manual production deploy, and a Telegram notification.

## Code Rules

- Before making changes, run `git status --short --branch` and do not touch someone else's unfinished work.
- Before branch work, compare GitHub `origin` and GitLab `gitlab`; do not leave one remote updated without the other for long.
- Keep changes small and tied to the task.
- Do not break existing games or their HTML entry points.
- For the current site, use plain HTML/CSS/JS without new dependencies unless the task clearly requires otherwise.
- Check the mobile version, menu, text visibility, and absence of horizontal scroll.
- Do not delete archived or disputed files without a separate decision.
- If a change is complex or architectural, write an ExecPlan first.
- The v1 app architecture lives in `.agent/react-php-mysql-app-architecture-plan.md`.

## Nuances

- The project is pushed to both GitHub and GitLab.
- Main workflow: make changes on `dev`, push to `origin` and `gitlab`, wait for a green GitLab pipeline, merge `dev -> main`, run manual `deploy_prod`, then align `dev` with `main`.
- If GitLab or GitHub rejects a push with `fetch first`, compare branches with `git fetch` and `git log --left-right`; do not use `--force` without a separate decision.
- Old GitHub Actions deploy workflows are disabled by moving them to `.github/workflows_disabled/`.
- The current GitLab pipeline runs checks, automatic dev deploy, manual production deploy, and Telegram notification.
- Production deploy is started manually on the `main` branch.
- The archived Java Dino version is hidden from GitHub language stats through `.gitattributes`; the active browser Dino game uses `GameDino/gameDino.js`.
- Project memory lives in `.agent/`: roadmap, tasks, decisions, project map, and ExecPlan rules.
- Future app databases are separate: `cg75134_antondorovsdev` for development and `cg75134_antondorovs` for production. Apply SQL migrations to dev first, export production backup through phpMyAdmin, then apply to production.

# ExecPlans

When writing complex features or significant refactors, use an ExecPlan (as described in .agent/PLANS.md) from design to implementation.
