// Configuração dos remotes para diferentes ambientes
const PROD_DOMAIN = 'https://bytebank-design-system.vercel.app'; // Substitua pelo seu domínio real após o deploy
const DEV_DOMAIN = 'http://localhost:4000';

// Determine se estamos em produção ou desenvolvimento
const isProd = process.env.NODE_ENV === 'production';

// Configure os domínios para cada microfrontend
const domains = {
  designSystem: isProd ? PROD_DOMAIN : DEV_DOMAIN,
  dashboard: 'http://localhost:3001',
  sidebar: 'http://localhost:3002',
  transactions: 'http://localhost:3003',
  addTransaction: 'http://localhost:3004',
  profile: 'http://localhost:3005',
};

// Exporte as URLs dos remotes
module.exports = {
  designSystem: `designSystem@${domains.designSystem}/remoteEntry.js`,
  dashboard: `dashboard@${domains.dashboard}/remoteEntry.js`,
  sidebar: `sidebar@${domains.sidebar}/remoteEntry.js`,
  transactions: `transactions@${domains.transactions}/remoteEntry.js`,
  addTransaction: `addTransaction@${domains.addTransaction}/remoteEntry.js`,
  profile: `profile@${domains.profile}/remoteEntry.js`,
};