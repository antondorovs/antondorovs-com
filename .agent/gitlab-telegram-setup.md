# GitLab и Telegram Setup

Эта инструкция описывает ручные действия, которые нужно выполнить перед включением GitLab pipeline с Telegram-уведомлениями. Не коммить реальные токены, chat id, пароли или другие секреты в репозиторий.

## Цель

На первом этапе GitLab pipeline будет работать в режиме `notify-only + checks`: запускать проверки и отправлять уведомления в Telegram. Реальный deploy подключается отдельным следующим шагом.

## Telegram

1. Открой Telegram и найди `@BotFather`.
2. Отправь команду `/newbot`.
3. Задай имя и username бота.
4. BotFather выдаст token. Сохрани его как будущую GitLab variable `TELEGRAM_BOT_TOKEN`.
5. Создай отдельный чат/группу для уведомлений или выбери личный чат.
6. Добавь бота в этот чат. Если это группа, дай боту право читать сообщения, если Telegram попросит права.
7. Отправь любое тестовое сообщение в чат, где находится бот.
8. Получи `TELEGRAM_CHAT_ID` через Telegram API:

   Открой в браузере URL вида:

       https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates

   В ответе найди объект `chat` и поле `id`. Это значение понадобится как GitLab variable `TELEGRAM_CHAT_ID`.

9. Если `getUpdates` возвращает пустой список, отправь в чат новое сообщение и обнови URL.

## GitLab

1. Открой GitLab project `antondorovs/antondorovs-site`.
2. Перейди в `Settings -> CI/CD -> Variables`.
3. Добавь variable `TELEGRAM_BOT_TOKEN`.
   Значение: token от BotFather.
   Рекомендуемые настройки: masked, protected по ситуации.
4. Добавь variable `TELEGRAM_CHAT_ID`.
   Значение: id чата из `getUpdates`.
   Рекомендуемые настройки: masked, protected по ситуации.
5. Не добавляй Telegram token или chat id в `.gitlab-ci.yml`, README или любые tracked-файлы.

## Будущие переменные для deploy

Когда pipeline перейдет от `notify-only + checks` к реальному deploy, переменные FTP/SFTP нужно добавить отдельно в GitLab CI/CD variables. Названия будут зафиксированы вместе с `.gitlab-ci.yml`.

Ожидаемые типы секретов:

- host сервера;
- username;
- password или SSH key;
- target path для `dev`;
- target path для `main`.

## Проверка

После добавления `.gitlab-ci.yml` pipeline должен:

- запускаться на push в GitLab;
- выполнять проверки;
- отправлять Telegram-сообщение при успешном pipeline;
- отправлять Telegram-сообщение при ошибке pipeline;
- показывать количество пройденных проверок.

Если уведомление не пришло, проверь:

- что bot token скопирован без пробелов;
- что chat id правильный;
- что бот добавлен в нужный чат;
- что GitLab variables доступны pipeline;
- что pipeline действительно запустился.
