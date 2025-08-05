## 💸 Monorepo - Financial Dashboard

Este projeto é um monorepo que utiliza Module Federation para orquestrar múltiplos micro frontends (remotes) e um Host App principal.

Cada parte do sistema pode ser executada de forma independente durante o desenvolvimento, ou todas ao mesmo tempo para uma experiência integrada.

## 📦 Requisitos

Node.js 22+
PNPM (recomendado)

## ⚙️ Configuração do Projeto

Antes de rodar o projeto, siga os passos abaixo:

#### 1. Instale as dependências

Certifique-se de ter o PNPM instalado, então execute:

```bash
pnpm install
```

#### 2. Configure as variáveis de ambiente

Entre na pasta do app principal (main-app) e crie um arquivo .env.local com base no .env.example:

```bash
cp main-app/.env.example main-app/.env.local
```

## 📁 Estrutura do Projeto

```
Bytebank-microfrontend/
├── add-transaction/          # Microfrontend para adicionar transações
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Toast.tsx
│   │   ├── contexts/
│   │   │   └── ToastContext.tsx
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── types/
│   │   │   └── global.d.ts
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx
│   │   └── index.ts
│   ├── .gitignore
│   ├── babel.config.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vercel.json
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── api/                      # Backend API
│   ├── public/
│   ├── .gitignore
│   ├── db.json
│   ├── index.js
│   ├── package.json
│   ├── README.md
│   └── vercel.json
├── dashboard/                # Microfrontend do dashboard
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BalanceCard.tsx
│   │   │   ├── CategoryPieChart.tsx
│   │   │   ├── RecentTransactions.tsx
│   │   │   └── TransactionChart.tsx
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── types/
│   │   │   ├── global.d.ts
│   │   │   └── types.ts
│   │   ├── api.ts
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx
│   │   └── index.ts
│   ├── .gitignore
│   ├── babel.config.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vercel.json
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── docker/                   # Configurações Docker
│   ├── .dockerignore
│   ├── api.Dockerfile
│   ├── docker-compose.yml
│   └── main-app.Dockerfile
├── main-app/                 # Aplicação principal (Host)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── devices.svg
│   │   │   ├── Ilustracao-cadastro.svg
│   │   │   ├── Ilustracao-login.svg
│   │   │   ├── instagram.svg
│   │   │   ├── present.svg
│   │   │   ├── star.svg
│   │   │   ├── whatsapp.svg
│   │   │   ├── withdraw.svg
│   │   │   └── youtube.svg
│   │   ├── banner.png
│   │   ├── favicon.png
│   │   ├── logo-mini.png
│   │   ├── logo-white.png
│   │   ├── logo.png
│   │   └── logout.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── modal/
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── MobileHeader.tsx
│   │   │   └── ModuleFederationErrorBoundary.tsx
│   │   ├── contexts/
│   │   │   └── authContext.tsx
│   │   ├── pages/
│   │   │   ├── account/
│   │   │   ├── _app.tsx
│   │   │   ├── _document.tsx
│   │   │   └── index.tsx
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── Home.module.css
│   │   └── types/
│   │       ├── css.d.ts
│   │       ├── next-env.d.ts
│   │       └── remote-modules.d.ts
│   ├── .env.example
│   ├── .env.local
│   ├── .gitignore
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── remotes.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vercel.json
├── profile/                  # Microfrontend do perfil
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── types/
│   │   │   └── global.d.ts
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx
│   │   └── index.ts
│   ├── .gitignore
│   ├── babel.config.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vercel.json
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── sidebar/                  # Microfrontend da sidebar
│   ├── public/
│   │   ├── images/
│   │   ├── index.html
│   │   └── logo.png
│   ├── src/
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── types/
│   │   │   └── global.d.ts
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx
│   │   └── index.ts
│   ├── .gitignore
│   ├── babel.config.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vercel.json
│   ├── webpack.common.js
│   ├── webpack.config.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── tailwind-config/          # Configuração compartilhada do Tailwind
│   ├── copy-tailwind-config.ts
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
│   └── tsconfig.json
├── transactions/             # Microfrontend de transações
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── Extrato.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ItemExtrato.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── TransactionFormEdit.tsx
│   │   ├── contexts/
│   │   │   └── ToastContext.tsx
│   │   ├── services/
│   │   │   ├── fileService.ts
│   │   │   └── transactionService.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── types/
│   │   │   └── global.d.ts
│   │   ├── utils/
│   │   │   ├── formatador.ts
│   │   │   ├── transactionConstants.ts
│   │   │   └── transactionHelpers.ts
│   │   ├── App.tsx
│   │   ├── bootstrap.tsx
│   │   └── index.ts
│   ├── temp/
│   │   ├── uploads/
│   │   │   ├── .gitkeep
│   │   │   └── 1754411013014_BG.png
│   │   └── .gitignore
│   ├── .gitignore
│   ├── babel.config.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── upload-server.js
│   ├── vercel.json
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── .gitignore
├── .npmrc
├── package.json              # Configuração do monorepo
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── readme.md
```

## 🚀 Como rodar o projeto

#### ✅ Rodar todos os apps de uma vez

Para iniciar todos os remotes e o host simultaneamente:

```bash
pnpm dev:all
```

Este comando inicia:

- add-transaction
- dashboard
- profile
- sidebar
- transactions
- main-app

#### ⚙️ Rodar apps individualmente

Se preferir trabalhar em apenas um dos apps por vez, use os comandos abaixo:

```bash
pnpm dev:add-transaction   # Roda o app de adicionar transações
pnpm dev:dashboard         # Roda o dashboard
pnpm dev:profile           # Roda o perfil do usuário
pnpm dev:sidebar           # Roda a sidebar
pnpm dev:transactions      # Roda o app de transações
pnpm dev:main-app          # Roda o app principal (host)
```
