FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bunfig.toml bun.lock ./

RUN bun install --frozen-lockfile

COPY src ./src

CMD ["bun", "run", "dev"]
