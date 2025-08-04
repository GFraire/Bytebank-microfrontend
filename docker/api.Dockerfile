FROM node:lts-alpine

WORKDIR /app

COPY ../api .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3333

CMD ["pnpm", "dev-local"]
