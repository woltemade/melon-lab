VERSION := LOCAL
SSH_KEY := ${HOME}/.ssh/id_rsa

# -----------------------------------------------------------------------------
# BUILD
# -----------------------------------------------------------------------------
.PHONY: all
all: build lint test

.PHONY: build
build:
	docker-compose build

.PHONY: lint
lint:
	@docker-compose run --rm graphql-server-development yarn lint
	# @docker-compose run --rm graphql-schema-development yarn lint

.PHONY: test
test:
	@docker-compose run --rm graphql-server-development yarn test
	# @docker-compose run --rm graphql-schema-development yarn test

# -----------------------------------------------------------------------------
# BUILD - CI
# -----------------------------------------------------------------------------
.PHONY: package
package:
	@docker tag melonproject/graphql-server:latest melonproject/graphql-server:${VERSION}

.PHONY: publish
publish:
	@docker push melonproject/graphql-server:${VERSION}

.PHONY: teardown
teardown:
	@docker-compose down --remove-orphans --timeout 0

# -----------------------------------------------------------------------------
# DEVELOPMENT
# -----------------------------------------------------------------------------
.PHONY: bootstrap
bootstrap:
	@docker network create melonproject > /dev/null 2> /dev/null || true

.PHONY: start
start:
	@docker-compose up -d graphql-server-development

.PHONY: stop
stop:
	@docker-compose kill

.PHONY: restart
restart: stop start
