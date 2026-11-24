ARG NODE_VERSION=24.21.0

FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app
RUN npm install -g pnpm@12.14.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:${NODE_VERSION}-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3200
RUN npm install -g pnpm@12.14.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/dist ./dist
EXPOSE 3200
CMD ["node", "dist/main.js"]
