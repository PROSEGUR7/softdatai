// Database configuration
// IMPORTANT: This file contains sensitive information and should be added to .gitignore in production

// Determine if we're in development or production mode
const isDev = process.env.NODE_ENV !== 'production';

// Database configuration
const dbConfig = {
  // For production, use the remote database
  // For development, we'll simulate database operations
  host: isDev ? 'localhost' : 'srv1779.hstgr.io', // Alternative host: 82.197.82.132
  user: 'u203548836_gerencia',
  password: '1023@Ndres',
  database: 'u203548836_bdsoftdatai',
  port: 3306
};

// Export the configuration along with the development mode flag
const config = {
  dbConfig,
  isDev
};

module.exports = { dbConfig, isDev };
