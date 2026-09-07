/**
 * Health Check Utility
 * Provides endpoints for monitoring application and database health
 */

const mongoose = require('mongoose');

/**
 * Check database connection status
 */
const checkDatabaseHealth = async () => {
  try {
    const admin = mongoose.connection.db.admin();
    await admin.ping();
    return {
      status: 'connected',
      database: mongoose.connection.name,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Get system information
 */
const getSystemHealth = () => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  return {
    uptime: Math.floor(uptime),
    uptimeFormatted: formatUptime(uptime),
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
    },
    nodeVersion: process.version,
    platform: process.platform,
    cpus: require('os').cpus().length,
    timestamp: new Date().toISOString()
  };
};

/**
 * Format uptime in human-readable format
 */
const formatUptime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(' ') || '0s';
};

/**
 * Complete health check
 */
const getFullHealthCheck = async () => {
  const dbHealth = await checkDatabaseHealth();
  const systemHealth = getSystemHealth();

  const overallStatus = dbHealth.status === 'connected' ? 'healthy' : 'degraded';

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    api: {
      status: 'running',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    },
    database: dbHealth,
    system: systemHealth
  };
};

module.exports = {
  checkDatabaseHealth,
  getSystemHealth,
  getFullHealthCheck,
  formatUptime
};
