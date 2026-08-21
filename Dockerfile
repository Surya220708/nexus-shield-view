# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build

# Stage 2: Production Server
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/.output /app/.output

# The Nitro/TanStack server runs using Node
ENV PORT=80
ENV NODE_ENV=production

EXPOSE 80

CMD ["node", ".output/server/index.mjs"]
