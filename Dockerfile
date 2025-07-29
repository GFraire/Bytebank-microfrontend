FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

COPY main-app ./main-app
COPY design-system ./design-system

RUN npm install -g pnpm
RUN pnpm install


RUN pnpm --filter main-app build

EXPOSE 3000

CMD ["pnpm", "--filter", "main-app", "start"]