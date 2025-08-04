FROM node:lts-alpine

WORKDIR /app

COPY ../main-app ./

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
