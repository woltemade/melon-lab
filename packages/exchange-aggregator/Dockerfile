FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node:latest as development

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/exchange-aggregator/node_modules /app/packages/exchange-aggregator/node_modules

WORKDIR /app/packages/exchange-aggregator
