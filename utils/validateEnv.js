#!/usr/bin/env node

/**
 * Environment Validation Script
 * Checks that all required environment variables are properly configured
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const examplePath = path.join(__dirname, '.env.example');

// Required variables for development
const REQUIRED_VARS = [
  'PORT',
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'CLIENT_URL'
];

// Optional but recommended variables
const RECOMMENDED_VARS = [
  'LOG_LEVEL',
  'API_TIMEOUT',
  'JWT_EXPIRATION'
];

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEnv() {
  log('\n╔════════════════════════════════════════╗', 'blue');
  log('║    JDRAID Environment Validation      ║', 'blue');
  log('╚════════════════════════════════════════╝\n', 'blue');

  // Check if .env file exists
  if (!fs.existsSync(envPath)) {
    log('✗ .env file not found!', 'red');
    log('\nCreating .env from .env.example...', 'yellow');
    
    try {
      if (fs.existsSync(examplePath)) {
        const exampleContent = fs.readFileSync(examplePath, 'utf8');
        fs.writeFileSync(envPath, exampleContent);
        log('✓ .env file created successfully', 'green');
        log('  Please update the values in .env file', 'yellow');
      } else {
        log('✗ .env.example not found either!', 'red');
        return false;
      }
    } catch (error) {
      log(`✗ Failed to create .env: ${error.message}`, 'red');
      return false;
    }
  } else {
    log('✓ .env file found', 'green');
  }

  // Load environment variables
  require('dotenv').config();

  // Validate required variables
  log('\nChecking required variables:', 'blue');
  let requiredValid = true;

  REQUIRED_VARS.forEach(variable => {
    const value = process.env[variable];
    if (value) {
      log(`  ✓ ${variable}`, 'green');
    } else {
      log(`  ✗ ${variable} - Missing or empty`, 'red');
      requiredValid = false;
    }
  });

  // Check recommended variables
  log('\nChecking recommended variables:', 'blue');
  let recommendedValid = true;

  RECOMMENDED_VARS.forEach(variable => {
    const value = process.env[variable];
    if (value) {
      log(`  ✓ ${variable}`, 'green');
    } else {
      log(`  ⚠ ${variable} - Not set (using default)`, 'yellow');
      recommendedValid = false;
    }
  });

  // Validate specific values
  log('\nValidating configuration values:', 'blue');

  const nodeEnv = process.env.NODE_ENV;
  if (['development', 'production', 'test'].includes(nodeEnv)) {
    log(`  ✓ NODE_ENV is valid: ${nodeEnv}`, 'green');
  } else {
    log(`  ✗ NODE_ENV invalid: ${nodeEnv} (use: development, production, test)`, 'red');
    requiredValid = false;
  }

  const port = process.env.PORT;
  if (port && !isNaN(port) && port > 0 && port < 65536) {
    log(`  ✓ PORT is valid: ${port}`, 'green');
  } else {
    log(`  ✗ PORT invalid: ${port} (must be between 1-65535)`, 'red');
    requiredValid = false;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri && mongoUri.includes('mongodb')) {
    log(`  ✓ MONGODB_URI is valid format`, 'green');
  } else {
    log(`  ✗ MONGODB_URI invalid format`, 'red');
    requiredValid = false;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret && jwtSecret.length >= 10 && jwtSecret !== 'your_secret_jwt_key_here_change_in_production') {
    log(`  ✓ JWT_SECRET is set and appears secure`, 'green');
  } else if (nodeEnv === 'production') {
    log(`  ✗ JWT_SECRET is not secure in production!`, 'red');
    requiredValid = false;
  } else {
    log(`  ⚠ JWT_SECRET is using default value (OK for development)`, 'yellow');
  }

  // Summary
  log('\n╔════════════════════════════════════════╗', 'blue');
  if (requiredValid) {
    log('║    ✓ All required checks passed!      ║', 'green');
    log('╚════════════════════════════════════════╝', 'blue');
    log('\nYou can now start the server with: npm start', 'green');
    return true;
  } else {
    log('║    ✗ Some checks failed                ║', 'red');
    log('╚════════════════════════════════════════╝', 'blue');
    log('\nPlease fix the issues above and try again.', 'red');
    return false;
  }
}

// Run validation
const isValid = validateEnv();
process.exit(isValid ? 0 : 1);
