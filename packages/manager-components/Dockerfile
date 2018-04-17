FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine as development
WORKDIR /app/packages/manager-components

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/manager-components/node_modules /app/packages/manager-components/node_modules

WORKDIR /app/packages/manager-components
CMD ["yarn", "dev"]
