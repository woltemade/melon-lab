# -----------------------------------------------------------------------------
# bootstrap
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine AS bootstrap
WORKDIR /app
RUN chown -R node:node .

# install system dependencies.
RUN apk add --update git && rm -rf /var/cache/apk/*

# -----------------------------------------------------------------------------
# base
# -----------------------------------------------------------------------------
FROM bootstrap AS base

# copy the package.json and yarn.lock file of the workspace root.
COPY package.json yarn.lock /

# copy all of the packages.
COPY packages /packages

# -----------------------------------------------------------------------------
# installer
# -----------------------------------------------------------------------------
FROM base AS installer

# install production dependencies first and and set them aside for later.
RUN yarn install --ignore-engines --frozen-lockfile --production --modules-folder node_modules_production
RUN yarn install --ignore-engines --modules-folder node_modules
