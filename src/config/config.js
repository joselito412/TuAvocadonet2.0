// Environment configuration
export const config = {
  // API endpoints
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ragApiKey: import.meta.env.VITE_RAG_API_KEY || '',
  
  // Feature flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableErrorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  
  // App config
  appName: 'Avocado Legal',
  appVersion: '2.0.0',
  environment: import.meta.env.MODE || 'development',
  
  // Security
  maxMessageLength: 1000,
  rateLimitWindow: 60000, // 1 minute
  maxRequestsPerWindow: 10,
};

export const isDevelopment = () => config.environment === 'development';
export const isProduction = () => config.environment === 'production';
