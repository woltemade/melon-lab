FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node:latest AS development

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/graphql-server/node_modules /app/packages/graphql-server/node_modules

WORKDIR /app/packages/graphql-server
CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as build

COPY . /app
RUN yarn build

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM melonproject/node:latest

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/graphql-server/node_modules /app/packages/graphql-server/node_modules
COPY --from=build /app/packages/graphql-server/dist /app/packages/graphql-server/dist
COPY packages/graphql-server/package.json packages/graphql-server/.env.defaults /app/packages/graphql-server/

WORKDIR /app/packages/graphql-server
CMD ["yarn", "start"]
