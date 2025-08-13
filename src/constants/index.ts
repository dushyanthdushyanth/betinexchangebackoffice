// Application-wide constants
export const APP_CONFIG = {
  name: 'BetinExchange Backoffice',
  version: '1.0.0',
  description: 'Professional backoffice management system',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  auth: {
    tokenKey: 'betinexchange_token',
    refreshTokenKey: 'betinexchange_refresh_token',
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  users: '/users',
  bets: '/bets',
  transactions: '/transactions',
  reports: '/reports',
} as const;

// Route paths
export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  users: '/users',
  bets: '/bets',
  transactions: '/transactions',
  reports: '/reports',
  settings: '/settings',
} as const;
