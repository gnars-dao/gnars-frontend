FROM node:18-slim AS base

ENV PNPM_HOME="/app/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

WORKDIR /app
COPY package.json .
RUN pnpm i
COPY . .

EXPOSE 3000
CMD ["pnpm", "dev"]