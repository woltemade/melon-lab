# -----------------------------------------------------------------------------
# SETUP
# -----------------------------------------------------------------------------
.PHONY: setup
setup:
	@docker build -f Dockerfile.node -t melonproject/node:latest .
	@docker build -f Dockerfile.installer -t melonproject/installer:latest .

.PHONY: network
network:
	@docker network create melonproject > /dev/null 2> /dev/null || true

.PHONY: bootstrap
bootstrap: setup network

# -----------------------------------------------------------------------------
# BUILD
# -----------------------------------------------------------------------------
.PHONY: all
all: setup build lint test

.PHONY: build
build:
	@docker-compose build

.PHONY: lint
lint:
	@docker-compose run --rm graphql-server-development yarn lint
	# @docker-compose run --rm graphql-schema-development yarn lint
	# @docker-compose run --rm manager-interface-development yarn lint
	# @docker-compose run --rm manager-components-development yarn lint

.PHONY: test
test:
	@docker-compose run --rm graphql-server-development yarn test
	# @docker-compose run --rm graphql-schema-development yarn test
	# @docker-compose run --rm manager-interface-development yarn test
	# @docker-compose run --rm manager-components-development yarn test

# -----------------------------------------------------------------------------
# DEVELOPMENT
# -----------------------------------------------------------------------------
.PHONY: start
start:
	@docker-compose up

.PHONY: stop
stop:
	@docker-compose kill

.PHONY: restart
restart: stop start
