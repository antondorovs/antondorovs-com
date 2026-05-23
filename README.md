# Anton Dorovskikh Site

Персональный сайт Anton Dorovskikh с главной страницей, интро, опытом работы, социальными ссылками и набором браузерных игр.

## Стек

Сейчас проект собран как статический сайт на HTML, CSS и JavaScript. Сборщика, package manager и backend-части пока нет.

Подтвержденное направление v1-приложения: React на JavaScript и Vite для фронтенда, простой PHP JSON API для backend и MySQL 5.7 на текущем Timeweb-хостинге.

## Быстрый старт

- Проверить состояние репозитория: `git status --short --branch`
- Посмотреть файлы проекта: `rg --files`
- Найти текст по проекту: `rg "pattern"`
- Запустить React-приложение локально: `cd apps/web`, затем `npm.cmd install` и `npm.cmd run dev`.
- Проверить вручную: главную страницу, ссылки на игры, мобильное меню, адаптив и консоль браузера.

## Локальная проверка перед деплоем

Для обычной локальной проверки запусти React/Vite dev server:

```powershell
cd C:\Users\think\Documents\GITcode\antondorovs-site\apps\web
npm.cmd install
npm.cmd run dev
```

Открой приложение в браузере:

```text
http://127.0.0.1:5173/
```

Перед деплоем проверь production-сборку и preview:

```powershell
cd C:\Users\think\Documents\GITcode\antondorovs-site\apps\web
npm.cmd run build
npm.cmd run preview
```

Открой preview в браузере:

```text
http://127.0.0.1:4173/
```

Ручной чек-лист перед деплоем:

- Проверить главную страницу.
- Проверить переходы на игры.
- Проверить Game of Life: клики по клеткам, зеленые живые клетки, более тусклые мертвые клетки.
- Проверить мобильную ширину, меню, видимость текста и отсутствие горизонтального скролла страницы.
- Открыть консоль браузера и убедиться, что нет ошибок.

GitLab CI выполняет React install/build checks, dev deploy, ручной prod deploy и Telegram-уведомление. Полноценных app/e2e тестов пока нет.

## Документация проекта

- `AGENTS.md` — короткий входной файл: стек, команды, правила, нюансы.
- `.agent/PLANS.md` — не план проекта, а правила написания ExecPlan для больших задач.
- `.agent/roadmap.md` — стратегический план развития сайта.
- `.agent/tasks.md` — текущий список задач.
- `.agent/decisions.md` — журнал решений.
- `.agent/project-map.md` — карта файлов и папок.
- `.agent/gitlab-telegram-setup.md` — ручная инструкция настройки Telegram и GitLab CI/CD variables.

## CI/CD

Проект пушится в GitHub и GitLab. Деплой идет через GitLab CI.

Текущий GitLab pipeline выполняет проверки, автоматически деплоит ветку `dev` в dev-окружение, позволяет вручную деплоить ветку `main` в production и отправляет Telegram-уведомление.

## Работа с ветками и двумя remotes

В проекте есть два удаленных репозитория: `origin` на GitHub и `gitlab` на GitLab. Чтобы GitHub и GitLab не расходились по истории, рабочий порядок такой:

1. Перед началом работы обновить обе площадки:

   ```powershell
   git checkout dev
   git fetch origin
   git fetch gitlab
   git pull --ff-only origin dev
   git pull --ff-only gitlab dev
   ```

2. Все обычные изменения делать в ветке `dev`.
3. После коммита пушить `dev` сразу в оба remotes:

   ```powershell
   git add -A
   git commit -m "Update"
   git push origin dev
   git push gitlab dev
   ```

4. Дождаться зеленого GitLab pipeline на `dev`. Он проверяет HTML, делает dev deploy и отправляет Telegram-уведомление.
5. Для production создать merge request / pull request `dev -> main`. После merge ветка `main` должна уйти в GitHub и GitLab.
6. После успешного pipeline на `main` вручную запустить `deploy_prod` в GitLab.
7. После merge `dev -> main` выровнять `dev` обратно с `main` и снова отправить в обе площадки:

   ```powershell
   git checkout dev
   git fetch origin
   git fetch gitlab
   git merge --ff-only origin/main
   git push origin dev
   git push gitlab dev
   ```

Проверка, что все синхронно:

```powershell
Проверить из корня проекта:
git status --short --branch

Сверить GitHub и GitLab напрямую:
git ls-remote --heads origin main dev
git ls-remote --heads gitlab main dev

Проверить локальные ветки:
git rev-parse dev
git rev-parse main

Сравнить, есть ли различия между dev и main
git rev-list --left-right --count dev...main
```

## План будущего React/PHP/MySQL приложения

Подробный живой план архитектуры лежит в `.agent/react-php-mysql-app-architecture-plan.md`. Этот файл описывает будущую модульную структуру React-фронтенда, PHP JSON API, MySQL-базу данных, регистрацию и вход, личный кабинет, темы, языки интерфейса, восстановление пароля и сохранение рекордов игр.

PHP API и таблицы БД пока не добавлены.

React/Vite scaffold уже создан в `apps/web`. Запуск локально:

```powershell
cd apps/web
npm.cmd install
npm.cmd run dev
```

Production build:

```powershell
cd apps/web
npm.cmd run build
```

GitLab CI runs React dependency install and production build checks. The `dev` deploy uploads `apps/web/dist/` to the dev stand. The manual production deploy also uploads `apps/web/dist/`.

React-used images, SVG icons, and game sprites live inside `apps/web/src/assets`, and static deploy files like `favicon.ico` and `.htaccess` live in `apps/web/public`. The old static archive and unused reference files have been removed from the active repository tree.

Подтвержденное направление:

- `apps/web` — будущий React-фронтенд с модулями `header`, `footer`, `home-banner`, `about`, `work`, `games`, `auth`, `profile`, `settings`, `theme`, `i18n`.
- `apps/web/src/games` — React-страницы игр: Dino, Snake, Flappy Bird, Game of Life, Snake Unlimited.
- `apps/web/src/assets` — изображения и игровые спрайты, которые использует React/Vite приложение.
- `apps/web/public` — статические файлы React-сборки, сейчас favicon и Apache `.htaccess`.
- `apps/web/src/modules/analytics` — отдельный модуль метрик Google tag, Yandex.Metrika и Microsoft Clarity.
- `api` — будущий PHP JSON API для авторизации, профиля, настроек, восстановления пароля и рекордов игр.
- `database/migrations` — SQL-миграции для MySQL 5.7.
- Dev-БД: `cg75134_antondorovsdev`.
- Production-БД: `cg75134_antondorovs`.
- Рекорды игр — рекомендуется одна общая таблица `game_scores` с уникальной записью на пользователя и игру; новая запись обновляет старую только если рекорд больше или равен предыдущему.

Миграции сначала применяются к `cg75134_antondorovsdev` через phpMyAdmin. После проверки dev-среды перед production-миграцией нужно экспортировать backup `cg75134_antondorovs` через phpMyAdmin и только затем применять тот же SQL к production-БД.

Идеальное состояние для начала новой задачи: `origin/dev`, `origin/main`, `gitlab/dev` и `gitlab/main` указывают на один и тот же commit SHA либо `dev` содержит только осознанные новые рабочие коммиты поверх `main`.

Не используй `git push --force` для синхронизации GitHub и GitLab без отдельного решения. Если GitLab или GitHub отклоняет push с сообщением `fetch first`, сначала сделай `git fetch` и посмотри различия через `git log --oneline --decorate --graph --left-right local_branch...remote/branch`.
