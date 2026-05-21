# Project Map

Карта текущей структуры проекта. Используй её как быстрый ориентир перед изменениями и рефакторингом.

## Корень

- `README.md` — публичная карта проекта: описание, быстрый старт и навигация по документации.
- `index.html` — главная страница персонального сайта.
- `script.js` — JavaScript для главной страницы, сейчас в основном мобильное меню.
- `gameDino.html`, `gameSnake.html`, `gameFB.html`, `gameofLife.html`, `gameSnakeUnlim.html` — HTML-точки входа для игр.
- `.htaccess` — настройки сервера Apache.
- `.gitignore` — игнор локальных и сгенерированных файлов.
- `.gitattributes` — настройки GitHub Linguist; скрывает архивную Java-версию Dino из статистики языков.
- `.gitlab-ci.yml` — GitLab pipeline для проверок, dev deploy и Telegram-уведомлений.

## Стили и ассеты

- `styles/` — CSS сайта и отдельных игр.
- `img/` — изображения сайта, favicon и фото.
- `icons/` — SVG-иконки.

## Игры

- `GameDino/` — активная браузерная Dino-игра и ее ассеты. Активный скрипт: `GameDino/gameDino.js`.
- `GameDino/Downasaur-download/` — архивная Java-версия Dino. Сайт её не использует.
- `GameSnake/` — файлы Snake.
- `GameFlappyBird/` — файлы Flappy Bird.
- `GameOfLife/` — файлы Game of Life.
- `GameSnakeUnlimited/` — файлы Snake unlimited.

## CI/CD

- `.github/workflows/` — папка GitHub Actions. Deploy workflow временно отключены и перенесены из этой папки.
- `.github/workflows_disabled/` — отключенные экспериментальные workflow и архив старого GitHub Actions deploy.
- `.agent/gitlab-telegram-setup.md` — ручная инструкция по подготовке Telegram bot и GitLab CI/CD variables.

Текущий рабочий путь CI/CD — GitLab pipeline с проверками, dev deploy и Telegram-уведомлениями. Main deploy будет добавлен отдельным этапом после проверки dev.
