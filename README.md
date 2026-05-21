# Anton Dorovskikh Site

Персональный сайт Anton Dorovskikh с главной страницей, социальными ссылками и набором браузерных игр.

## Стек

Сейчас проект собран как статический сайт на HTML, CSS и JavaScript. Сборщика, package manager и backend-части пока нет.

В будущем возможен переход на React для фронтенда и Node.js с базой данных для серверной части, но только после стабилизации текущей версии сайта.

## Быстрый старт

- Проверить состояние репозитория: `git status --short --branch`
- Посмотреть файлы проекта: `rg --files`
- Найти текст по проекту: `rg "pattern"`
- Запустить локально: открыть `index.html` в браузере или поднять любой статический сервер из корня проекта.
- Проверить вручную: главную страницу, ссылки на игры, мобильное меню, адаптив и консоль браузера.

Команды сборки сейчас нет. GitLab CI выполняет smoke checks, HTML validation, dev deploy, ручной prod deploy и Telegram-уведомление. Полноценных app/e2e тестов пока нет.

## Документация проекта


## CI/CD

Проект пушится в GitHub и GitLab. Старый деплой через GitHub Actions отключен и сохранен в `.github/workflows_disabled/` как архив настроек.

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
git ls-remote --heads origin main dev
git ls-remote --heads gitlab main dev
```

Идеальное состояние для начала новой задачи: `origin/dev`, `origin/main`, `gitlab/dev` и `gitlab/main` указывают на один и тот же commit SHA либо `dev` содержит только осознанные новые рабочие коммиты поверх `main`.

Не используй `git push --force` для синхронизации GitHub и GitLab без отдельного решения. Если GitLab или GitHub отклоняет push с сообщением `fetch first`, сначала сделай `git fetch` и посмотри различия через `git log --oneline --decorate --graph --left-right local_branch...remote/branch`.
