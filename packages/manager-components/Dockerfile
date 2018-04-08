FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node:latest as development

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/manager-components/node_modules /app/packages/manager-components/node_modules

WORKDIR /app/packages/manager-components
CMD ["yarn", "dev"]
