const isProd = process.env.NODE_ENV === 'production';

const domains = {
  designSystem: isProd ? 'https://design-system-g9.vercel.app' : 'http://localhost:4000',
  dashboard: isProd ? 'https://dashboard-g9.vercel.app' : 'http://localhost:3001',
  sidebar: isProd ? 'https://sidebar-g9.vercel.app' : 'http://localhost:3002',
  transactions: isProd ? 'https://transactions-g9.vercel.app' : 'http://localhost:3003',
  addTransaction: isProd ? 'https://add-transaction-g9.vercel.app' : 'http://localhost:3004',
  profile: isProd ? 'https://profile-g9.vercel.app' : 'http://localhost:3005',
};

module.exports = {
  designSystem: `designSystem@${domains.designSystem}/remoteEntry.js`,
  dashboard: `dashboard@${domains.dashboard}/remoteEntry.js`,
  sidebar: `sidebar@${domains.sidebar}/remoteEntry.js`,
  transactions: `transactions@${domains.transactions}/remoteEntry.js`,
  addTransaction: `addTransaction@${domains.addTransaction}/remoteEntry.js`,
  profile: `profile@${domains.profile}/remoteEntry.js`,
};