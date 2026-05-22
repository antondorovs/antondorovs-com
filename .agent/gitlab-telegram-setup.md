# GitLab and Telegram Setup

This guide describes the manual steps needed for the GitLab pipeline with Telegram notifications and deploy. Do not commit real tokens, chat IDs, passwords, or other secrets to the repository.

## Goal

The current GitLab pipeline runs checks, deploys the `dev` branch automatically, allows manual production deploy from the `main` branch, and sends Telegram notifications.

## Telegram

1. Open Telegram and find `@BotFather`.
2. Send the `/newbot` command.
3. Choose a bot name and username.
4. BotFather will provide a token. Save it as the future GitLab variable `TELEGRAM_BOT_TOKEN`.
5. Create a separate chat or group for notifications, or choose a personal chat.
6. Add the bot to that chat. If it is a group, grant message-reading permissions if Telegram asks.
7. Send any test message in the chat where the bot is present.
8. Get `TELEGRAM_CHAT_ID` through the Telegram API:

   Open a URL like this in the browser:

       https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates

   In the response, find the `chat` object and its `id` field. This value is needed as the GitLab variable `TELEGRAM_CHAT_ID`.

9. If `getUpdates` returns an empty list, send a new message to the chat and refresh the URL.

## GitLab

1. Open the GitLab project `antondorovs/antondorovs-site`.
2. Go to `Settings -> CI/CD -> Variables`.
3. Add the `TELEGRAM_BOT_TOKEN` variable.
   Value: the token from BotFather.
   Recommended settings: masked, protected when appropriate.
4. Add the `TELEGRAM_CHAT_ID` variable.
   Value: the chat ID from `getUpdates`.
   Recommended settings: masked, protected when appropriate.
5. Do not add the Telegram token or chat ID to `.gitlab-ci.yml`, README, or any tracked files.

## Deploy Variables

The GitLab pipeline includes `deploy_dev` for the `dev` branch and manual `deploy_prod` for the `main` branch. FTP variables must be added in GitLab CI/CD variables.

Required variables:

- `FTP_HOST` — FTP server host.
- `FTP_USER` — FTP username.
- `FTP_PASSWORD` — FTP password.

Optional variables:

- `DEV_DEPLOY_PATH` — path for dev deploy. If not set, `/dev-antondorovs/public_html/` is used.
- `PROD_DEPLOY_PATH` — path for production deploy. If not set, `/public_html/` is used.

Use GitLab CI/CD variables for all secrets. Do not add FTP values to tracked files.

## Verification

After `.gitlab-ci.yml` is added, the pipeline should:

- start on push to GitLab;
- run checks;
- deploy the `dev` branch to the dev environment after successful checks;
- show a manual `deploy_prod` job for the `main` branch after successful checks;
- send a Telegram message for successful pipelines;
- send a Telegram message for failed pipelines;
- show the number of passed checks.

If the notification does not arrive, check:

- that the bot token was copied without spaces;
- that the chat ID is correct;
- that the bot is added to the target chat;
- that GitLab variables are available to the pipeline;
- that `FTP_HOST`, `FTP_USER`, and `FTP_PASSWORD` are available to the protected `dev` branch;
- that `FTP_HOST`, `FTP_USER`, and `FTP_PASSWORD` are available to the protected `main` branch;
- that the pipeline actually started.
