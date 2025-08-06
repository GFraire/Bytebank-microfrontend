FROM node:lts-alpine

WORKDIR /app

COPY ../api-files .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3334

CMD ["pnpm", "dev"]
