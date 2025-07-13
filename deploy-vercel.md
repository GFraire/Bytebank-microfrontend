# Deploy no Vercel - Bytebank Microfrontends

## 📋 Pré-requisitos
- Conta no Vercel
- Vercel CLI instalado: `npm i -g vercel`

## 🚀 Passos para Deploy

### 1. Deploy dos Micro Frontends (Remotes)
Execute os comandos abaixo na ordem para fazer deploy de cada micro frontend:

```bash
# Dashboard
cd dashboard && vercel --prod --name bytebank-dashboard

# Sidebar  
cd ../sidebar && vercel --prod --name bytebank-sidebar

# Transactions
cd ../transactions && vercel --prod --name bytebank-transactions

# Add Transaction
cd ../add-transaction && vercel --prod --name bytebank-add-transaction

# Profile
cd ../profile && vercel --prod --name bytebank-profile

# Design System
cd ../design-system && vercel --prod --name bytebank-design-system
```

### 2. Atualizar URLs no Main App
Após o deploy dos remotes, atualize as URLs no arquivo `main-app/next.config.prod.js` com as URLs reais geradas pelo Vercel.

### 3. Deploy do Main App
```bash
cd main-app
cp next.config.prod.js next.config.js
vercel --prod --name bytebank-main-app
```

## ⚙️ Configuração Automática
Cada micro frontend está configurado para usar `process.env.VERCEL_URL` automaticamente em produção.

## 🔄 Redeploy
Para atualizações, execute `vercel --prod` em cada diretório que foi modificado.