# xuntos auth

xuntos authentication and authorization.

## Environment Variables

| Variable | Default | Description |
|--|--|--|
| `XUNTOS_AUTH_API_PORT` | `3000` | API port. |
| `XUNTOS_AUTH_LOGGER` | `"consoleDev"` | Logger type. |
| `XUNTOS_AUTH_DATABASE_URI` | `"mongodb://xuntos:xuntos@localhost:27017/xuntos-auth"` | Mongo database URI. |
| `XUNTOS_AUTHENTICATION_REQUEST_TTL` | `30` | Authentication request time to live. (minutes) |

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
