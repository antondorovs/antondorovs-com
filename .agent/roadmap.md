# Roadmap

This file records the strategic direction of the project so the site does not grow as a set of random changes.

## Current Direction

The project is currently a static personal website for Anton Dorovskikh with a home page, social links, and a set of browser games. The main near-term goal is to make the site a clean portfolio: clear, fast, responsive, and useful for showing experience.

## Near-Term Improvements

- Fill the `WORK` and `CONTACT` sections with real content.
- Clean up `styles/main.css`: remove duplication, fix questionable CSS values, and make responsive rules easier to follow.
- Improve the mobile menu: toggle through CSS classes, close after clicking a menu item, and keep buttons accessible.
- Add SEO and social preview metadata: description, Open Graph, Twitter meta, and a preview image.
- Optimize images: dimensions, formats, and lazy loading where appropriate.
- Present games as cards with a title, short description, and launch link.
- Add basic quality checks: HTML/CSS validation, link checks, and future smoke tests.

## Future Path

After the current static site is stable, consider migrating the frontend to React. A Node.js backend and database should appear only for a concrete need, such as an admin panel, dynamic projects, statistics, authentication, or data storage.

CI/CD has moved to GitLab: the pipeline runs checks, deploys `dev` automatically, supports manual production deploy from `main`, and sends Telegram notifications. Future CI/CD work should focus on stability, clearer deploy reporting, and broader quality checks.
