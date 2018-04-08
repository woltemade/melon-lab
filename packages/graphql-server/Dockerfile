# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/installer:latest AS installer
FROM melonproject/node:latest AS development

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/graphql-server/node_modules /app/packages/graphql-server/node_modules

WORKDIR /app/packages/graphql-server
CMD ["yarn", "dev"]
