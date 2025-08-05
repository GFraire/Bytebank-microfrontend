const isProd = process.env.NODE_ENV === 'production';

const domains = {
  dashboard: isProd ? 'https://dashboard-bytebank-freire.vercel.app' : 'http://localhost:3001',
  sidebar: isProd ? 'https://sidebar-bytebank-freire.vercel.app' : 'http://localhost:3002',
  transactions: isProd ? 'https://transactions-bytebank-freire.vercel.app/' : 'http://localhost:3003',
  addTransaction: isProd ? 'https://add-transaction-bytebank-freire.vercel.app/' : 'http://localhost:3004',
  profile: isProd ? 'https://profile-bytebank-freire.vercel.app/' : 'http://localhost:3005',
};

module.exports = {
  dashboard: `dashboard@${domains.dashboard}/remoteEntry.js`,
  sidebar: `sidebar@${domains.sidebar}/remoteEntry.js`,
  transactions: `transactions@${domains.transactions}/remoteEntry.js`,
  addTransaction: `addTransaction@${domains.addTransaction}/remoteEntry.js`,
  profile: `profile@${domains.profile}/remoteEntry.js`,
};