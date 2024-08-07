FROM node:18-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app

RUN pnpm i

EXPOSE 3000
CMD ["pnpm", "dev"]