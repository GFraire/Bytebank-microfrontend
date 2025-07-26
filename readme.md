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

## 🚀 Como rodar o projeto

#### ✅ Rodar todos os apps de uma vez

Para iniciar todos os remotes e o host simultaneamente:

```bash
pnpm dev:all
```

Este comando inicia:

- add-transaction
- dashboard
- design-system
- profile
- sidebar
- transactions
- main-app

#### ⚙️ Rodar apps individualmente

Se preferir trabalhar em apenas um dos apps por vez, use os comandos abaixo:

```bash
pnpm dev:add-transaction   # Roda o app de adicionar transações
pnpm dev:dashboard         # Roda o dashboard
pnpm dev:design-system     # Roda o design system
pnpm dev:profile           # Roda o perfil do usuário
pnpm dev:sidebar           # Roda a sidebar
pnpm dev:transactions      # Roda o app de transações
pnpm dev:main-app          # Roda o app principal (host)
```

🐳 Docker
Para containerizar e executar o projeto usando Docker, siga os passos abaixo:

1. Construa a imagem Docker
   Certifique-se de ter o Docker instalado, então execute:
   docker build -t bytebank-microfrontend .

2. Execute o contêiner
   Inicie o contêiner mapeando a porta 3000:
   docker run -p 3000:3000 bytebank-microfrontend

3. Usando Docker Compose (Opcional)
   Com o arquivo docker-compose.yml configurado, inicie todos os serviços:
   docker-compose up --build
   Acesse a aplicação em: http://localhost:3000
