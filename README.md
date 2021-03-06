# xuntos auth

![Continuous Integration](https://github.com/xuntos/xuntos-auth/workflows/Continuous%20Integration/badge.svg) ![Release](https://github.com/xuntos/xuntos-auth/workflows/Release/badge.svg)

xuntos authentication and authorization.

## Environment Variables

| Variable | Default | Description |
|--|--|--|
| `XUNTOS_AUTH_API_PORT` | `3000` | API port. |
| `XUNTOS_AUTH_LOGGER_PROFILE` | `"consoleDev"` | Logger profile. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_ENABLED` | `false` | Enabled logger HTTP transport. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_HOST` | `"input.logging.xuntos.dgls.me"` | Logger HTTP transport host. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_PORT` | `8080` | Logger HTTP transport port. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_PATH` | `"/auth"` | Logger HTTP transport path. |
| `XUNTOS_AUTH_DATABASE_URI` | `"mongodb://xuntos:xuntos@db.xuntos.dgls.me/xuntos-auth"` | Mongo database URI. |
| `XUNTOS_AUTH_AUTHENTICATION_REQUEST_TTL` | `30m` (30 minutes) | Authentication request time to live. Expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms). |
| `XUNTOS_AUTH_QUEUE_REDIS_URL` | `"redis://redis.xuntos.dgls.me/0"` | Queue Redis URL. |
| `XUNTOS_AUTH_QUEUE_IS_WORKER` | `true` | Run with queue worker process. |
| `XUNTOS_AUTH_CHANNELS_EMAIL_ENABLED` | `true` | Channel email enabled. |
| `XUNTOS_AUTH_CHANNELS_EMAIL_SMTP_URI` | `"smtps://xuntos:xuntos@mail.xuntos.dgls.me:25"` | Channel email SMTP URI. |
| `XUNTOS_AUTH_CHANNELS_EMAIL_FROM` | `"no-reply@auth.xuntos.dgls.me"` | Email Channel email from address. |
| `XUNTOS_AUTH_I18N_LOCALES_DIRECTORY` | `"./locales"` | Locales Directory. |
| `XUNTOS_AUTH_TEMPLATES_DIRECTORY` | `"./templates"` | Templates Directory. |
| `XUNTOS_AUTH_JWT_PRIVATE_KEY_FILE_PATH` | `"./jwt-private.key"` | JWT private key RSA 4096 file path. |
| `XUNTOS_AUTH_JWT_TOKEN_EXPIRES_IN` | `"2h"` | JWT expires in. Expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms). |

## Development

### Commands

| Command | Description |
|--|--|
| `make install` | Install npm packages dependencies. |
| `make build` | Build production application. |
| `make lint` | Lint webpack.config.js and src files. |
| `make tests` | Run mocha tests. |
| `make watch` | Run development server. |
| `make docker-run` | Run docker stack. |
| `make docker-run-database` | Run docker database service. |
| `make docker-run-queue-redis` | Run docker queue Redis service. |
| `make docker-run-logstash` | Run docker logstash service. |
