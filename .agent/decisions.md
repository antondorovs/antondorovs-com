# Decisions

Журнал решений проекта. Записывай сюда не только "что решили", но и "почему", чтобы через месяц не восстанавливать контекст по коммитам.

## 2026-05-21

- Decision: Использовать `.agent/` как проектную память.
  Rationale: В проекте не было корневой документации для Codex и будущих разработчиков. Нужен компактный набор файлов для плана, задач, решений и карты проекта.

- Decision: Держать `AGENTS.md` компактным.
  Rationale: Это входной файл для агента, а не полная энциклопедия проекта. Подробные правила больших задач вынесены в `.agent/PLANS.md`.

- Decision: Не удалять `GameDino/Downasaur-download` сразу.
  Rationale: Папка не используется сайтом, но пока безопаснее скрыть Java из статистики через `.gitattributes`, а удаление выполнить отдельным решением после проверки.

- Decision: Не рефакторить структуру сайта вместе с документацией.
  Rationale: Сейчас цель — сделать проект понятнее и безопаснее для будущих изменений. Перенос файлов может затронуть ссылки, игры и деплой.

- Decision: Считать GitHub Actions временным и нестабильным CI/CD.
  Rationale: Текущий деплой на окружения работает плохо. Планируется пересборка pipeline в GitLab с Telegram-уведомлениями.

- Decision: Перед внедрением `.gitlab-ci.yml` сначала документировать ручные настройки Telegram и GitLab variables.
  Rationale: Pipeline с уведомлениями зависит от секретов, которые нельзя хранить в репозитории. Отдельная инструкция снижает риск потерять контекст и упрощает синхронизацию ручных действий.

- Decision: Начать GitLab CI/CD с режима `notify-only + checks`, без реального deploy.
  Rationale: Сначала нужно стабилизировать связку GitLab pipeline и Telegram-уведомлений. Deploy stage будет безопаснее добавить отдельным шагом после проверки уведомлений и базовых проверок.

- Decision: Временно отключить GitHub Actions deploy переносом workflow в `.github/workflows_disabled/`.
  Rationale: Старый GitHub Actions deploy работает нестабильно, но его полезно сохранить как историю настроек и источник параметров для будущего GitLab deploy.

- Decision: Заменить top-level `workflow` в `.gitlab-ci.yml` на job-level `rules`.
  Rationale: GitLab отклонил первый pipeline с ошибкой `jobs project config should implement the script:, run:, or trigger: keyword`, фактически распознав `workflow` как job. Job-level `rules` сохраняют ограничение запуска на `dev`, `main` и manual web pipeline без спорного top-level блока.

- Decision: Упростить YAML для Telegram job и переименовать `checks` в `ci_checks`.
  Rationale: GitLab продолжил отклонять pipeline с ошибкой про `jobs project config`, хотя top-level `workflow` уже удален. Вероятный источник — неоднозначное чтение многострочного shell-блока с строками вида `Project:`. Формирование сообщения через `printf` и явное имя job уменьшают риск конфликтов с GitLab CI linter.

- Decision: Использовать `node:22-alpine` и зафиксировать `html-validate@11.2.0` для HTML validation.
  Rationale: `html-validate@11.2.0` требует Node `^22.17.0 || >= 24.0.0`; на `node:20-alpine` CI падал с `EBADENGINE` и `fs.globSync is not a function`. Фиксация версии валидатора делает pipeline предсказуемее, чем `latest`.

- Decision: Исправлять реальные HTML validation ошибки вместо ослабления правил валидатора.
  Rationale: После обновления Node CI начал показывать настоящие ошибки разметки в `index.html` и `gameofLife.html`. Исправление HTML повышает качество сайта и позволяет использовать validation как честный quality gate.

- Decision: Добавить GitLab deploy только для ветки `dev`.
  Rationale: Dev deploy позволяет проверить FTP-доставку и окружение без риска для production. Main deploy будет отдельным этапом после стабильной проверки dev.

- Decision: Добавить production deploy как ручной job на ветке `main`.
  Rationale: Production должен выкатываться только после зеленых проверок и явного действия пользователя. Это снижает риск случайного автоматического деплоя в `/public_html/`.

- Decision: Считать GitHub и GitLab равноправными remotes, но синхронизировать их в одном фиксированном порядке.
  Rationale: Расхождение появилось из-за действий на обеих площадках: часть merge/push происходила через GitHub, часть через GitLab. Чтобы не получать разные merge-коммиты и отклонения `fetch first`, изменения сначала ведутся в `dev`, затем пушатся в `origin` и `gitlab`, после merge `dev -> main` ветка `dev` выравнивается с `main` и снова отправляется в обе площадки. `git push --force` для такой синхронизации не используется без отдельного решения.
