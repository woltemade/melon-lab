FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine
WORKDIR /app/packages/exchange-aggregator

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/exchange-aggregator/node_modules /app/packages/exchange-aggregator/node_modules

# Put the container into a 1-year long slumber.
CMD exec /bin/sh -c "trap : TERM INT; sleep 365d & wait"
