install:
	@npm install

build:
	@npm run build

lint:
	@npm run lint

tests:
	@npm test

watch:
	@XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_HOST=localhost \
	 XUNTOS_AUTH_LOGGER_HTTP_TRANSPORT_PORT=8080 \
	 XUNTOS_AUTH_DATABASE_URI=mongodb://xuntos:xuntos@localhost:27017/xuntos-auth \
	 XUNTOS_AUTH_QUEUE_REDIS_URL=redis://localhost:6379/0 \
	 XUNTOS_AUTH_CHANNELS_EMAIL_SMTP_URI=smtp://xuntos:xuntos@localhost:5025 \
	 npm run watch

docker-run-%:
	@docker-compose up --build $*

docker-run:
	@docker-compose up --build
