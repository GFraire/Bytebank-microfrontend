FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY main-app ./main-app
COPY add-transaction ./add-transaction
COPY dashboard ./dashboard
COPY design-system ./design-system
COPY profile ./profile
COPY sidebar ./sidebar
COPY transactions ./transactions

RUN cd main-app && pnpm install

RUN pnpm --filter main-app build

EXPOSE 3000

CMD ["pnpm", "--filter", "main-app", "start"]