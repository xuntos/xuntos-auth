install:
	@npm install

build:
	@npm run build

lint:
	@npm run lint

tests:
	@npm test

watch:
	@npm run watch

docker-run-%:
	@docker-compose up --build $*

docker-run:
	@docker-compose up --build
