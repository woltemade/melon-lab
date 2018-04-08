FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node:latest as development

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/manager-interface/node_modules /app/packages/manager-interface/node_modules

WORKDIR /app/packages/manager-interface
CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as build

COPY . /app
RUN yarn build
RUN yarn export

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM nginx:1.13-alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/packages/manager-interface/export /usr/share/nginx/html
