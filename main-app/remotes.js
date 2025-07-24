const DESIGN_SYSTEM_DOMAIN = 'https://design-system-g9.vercel.app';
const DASHBOARD_DOMAIN = 'https://bytebank-dashboard.vercel.app'; // Substitua pela URL real após o deploy
const DEV_DOMAIN = 'http://localhost:4000';
const DEV_DASHBOARD = 'http://localhost:3001';

const isProd = process.env.NODE_ENV === 'production';

const domains = {
  designSystem: isProd ? DESIGN_SYSTEM_DOMAIN : DEV_DOMAIN,
  dashboard: isProd ? DASHBOARD_DOMAIN : DEV_DASHBOARD,
  sidebar: 'http://localhost:3002',
  transactions: 'http://localhost:3003',
  addTransaction: 'http://localhost:3004',
  profile: 'http://localhost:3005',
};

module.exports = {
  designSystem: `designSystem@${domains.designSystem}/remoteEntry.js`,
  dashboard: `dashboard@${domains.dashboard}/remoteEntry.js`,
  sidebar: `sidebar@${domains.sidebar}/remoteEntry.js`,
  transactions: `transactions@${domains.transactions}/remoteEntry.js`,
  addTransaction: `addTransaction@${domains.addTransaction}/remoteEntry.js`,
  profile: `profile@${domains.profile}/remoteEntry.js`,
};