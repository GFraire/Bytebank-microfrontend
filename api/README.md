# Bytebank API

API REST para o Bytebank usando json-server.

## Endpoints

- `GET /transactions` - Lista todas as transações
- `GET /transactions/:id` - Obtém uma transação específica
- `POST /transactions` - Cria uma nova transação
- `PUT /transactions/:id` - Atualiza uma transação
- `DELETE /transactions/:id` - Remove uma transação
- `GET /user` - Obtém dados do usuário
- `GET /categories` - Lista todas as categorias
- `GET /dashboard` - Obtém dados do dashboard (saldo, receitas, despesas)

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## Deploy no Vercel

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel --prod
```