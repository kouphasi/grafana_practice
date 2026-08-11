FROM ghcr.io/pnpm/pnpm:11

RUN pnpm runtime set node 26 -g

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY src ./src

CMD ["pnpm", "run", "dev"]
