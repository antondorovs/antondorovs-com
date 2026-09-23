# Anton Dorovskikh

Персональный сайт и портфолио QA-инженера Антона Доровских.

[Открыть сайт](https://antondorovs.com/)

## Возможности

- интерфейс на русском и английском языках;
- светлая, темная и системная темы;
- адаптивная верстка для мобильных и настольных экранов;
- информация об опыте работы, навыках и образовании;
- ссылки на профессиональные и социальные профили;
- отдельные игровые страницы.

## Игры

- Dino - доступна;
- Snake Unlimited - доступна;
- Game of Life - доступна;
- Flappy Bird - в разработке.

Перед началом игры появляется карточка с названием, описанием, управлением и кнопкой «Старт». При паузе эта же карточка показывает «На паузе» и кнопку «Продолжить», после окончания — счёт, личный рекорд и «Начать заново». Рекорды хранятся отдельно для каждой игры в этом браузере; в Game of Life рекорд измеряется числом поколений.

При запуске страница фиксируется без изменения расположения поля и хедера. Над полем остаются счёт, рекорд и иконки паузы/продолжения и полноэкранного режима. Завершить текущую партию можно из карточки паузы.

В полноэкранном режиме остаются поле, статистика и две иконки: пауза/Play слева и выход из полноэкранного режима справа. Служебные действия, переключение вкладки и переходы между режимами ставят игру на паузу; продолжение — только явным нажатием Play. Полноэкранный режим доступен, если его поддерживает браузер.

Snake Unlimited поддерживает стрелки, WASD при любой раскладке, свайпы и кнопки направлений на сенсорных устройствах. Змейка проходит через края поля и проигрывает при столкновении с собой. В Dino можно прыгать пробелом, стрелкой вверх, клавишей W или тапом по полю. В Game of Life доступны фиксированные размеры поля и интервалы цикла; изменение размера очищает клетки, а изменение времени сохраняет их. Новые подписи игрового режима доступны на русском и английском; для других языков используются английские подписи.

Проверка игровой логики: `cd apps/web` и `npm run test:games`.

## Технологии

- React;
- JavaScript;
- Vite;
- HTML и CSS.

## Локальный запуск

```bash
cd apps/web
npm install
npm run dev
```

Локальный адрес: `http://127.0.0.1:5173/`.

## Production-сборка

```bash
cd apps/web
npm run build
```

Готовая сборка создается в `apps/web/dist`.

---

Personal website and portfolio of QA engineer Anton Dorovskikh.

[Visit the website](https://antondorovs.com/)

## Features

- Russian and English interface;
- light, dark, and system themes;
- responsive layout for mobile and desktop screens;
- professional experience, skills, and education;
- links to professional and social profiles;
- dedicated browser game pages.

## Games

- Dino - available;
- Snake Unlimited - available;
- Game of Life - available;
- Flappy Bird - in development.

A shared card shows the title, description, controls, and Start button before play. Pausing shows the same card with a Paused message and Continue button. At game over it shows the score, personal best, and Play again button. Records are saved separately per game in this browser; Game of Life records count generations.

Game mode locks the page without moving the field or header. The score, personal best, pause/play icon, and fullscreen icon sit above the field. The current round can be finished from the pause card.

Fullscreen shows the game, its statistics, and two icons: pause/play on the left and exit fullscreen on the right. Mode changes, utility controls, and switching tabs pause the game; only an explicit Play action resumes it. Fullscreen is available when supported by the browser.

Snake Unlimited supports arrow keys, WASD with any keyboard layout, swipes, and direction buttons on touch devices. The snake wraps through field edges and loses when it hits itself. Dino supports Space, Up, W, and tapping the field to jump. Game of Life provides fixed field-size and cycle-time selectors; changing the field size clears its cells while changing the cycle time preserves them. New game-mode labels are available in Russian and English, with English used for other languages.

Run game logic checks with `cd apps/web` followed by `npm run test:games`.

## Tech Stack

- React;
- JavaScript;
- Vite;
- HTML and CSS.

## Local Development

```bash
cd apps/web
npm install
npm run dev
```

The local server is available at `http://127.0.0.1:5173/`.

## Production Build

```bash
cd apps/web
npm run build
```

The production build is generated in `apps/web/dist`.
