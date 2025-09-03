// Centralized app configuration and constants
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || '', // set when moving to real backend
  MOCK_DELAY_MS: 350,
};

export const API_ROUTES = {
  products: '/products',
  product: (id) => `/products/${id}`,
  search: '/search',
};
