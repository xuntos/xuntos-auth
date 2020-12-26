# xuntos auth

xuntos authentication and authorization.

## Environment Variables

| Variable | Default | Description |
|--|--|--|
| `XUNTOS_AUTH_API_PORT` | `3000` | API port. |
| `XUNTOS_AUTH_LOGGER_PROFILE` | `"consoleDev"` | Logger profile. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_ENABLED` | `false` | Enabled logger HTTP transport. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_HOST` | `"localhost"` | Logger HTTP transport host. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_PORT` | `8080` | Logger HTTP transport port. |
| `XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_PATH` | `"/auth"` | Logger HTTP transport path. |
| `XUNTOS_AUTH_DATABASE_URI` | `"mongodb://xuntos:xuntos@localhost:27017/xuntos-auth"` | Mongo database URI. |
| `XUNTOS_AUTH_AUTHENTICATION_REQUEST_TTL` | `30` | Authentication request time to live. (minutes) |
| `XUNTOS_AUTH_QUEUE_REDIS_URL` | `"redis://localhost:6379/0"` | Queue Redis URL. |
| `XUNTOS_AUTH_QUEUE_IS_WORKER` | `true` | Run with queue worker process. |
| `XUNTOS_AUTH_CHANNELS_EMAIL_ENABLED` | `true` | Channel email enabled. |
| `XUNTOS_AUTH_CHANNELS_EMAIL_SMTP_URI` | `smtps://xuntos:xuntos@smtp.xuntos.dgls.me:25` | Channel email SMTP URI. |

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
