FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine
WORKDIR /app/packages/ipfs-frontend

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/ipfs-frontend/node_modules /app/packages/ipfs-frontend/node_modules

CMD ["yarn", "start"]
