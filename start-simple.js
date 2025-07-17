#!/usr/bin/env node

// Super simple start script for Railway
import { existsSync } from 'fs';

// Set production environment
process.env.NODE_ENV = 'production';

// Check if build exists
if (!existsSync('dist/index.js')) {
  console.log('Build not found, please run build first');
  process.exit(1);
}

// Start the server directly
console.log('Starting server...');
await import('./dist/index.js');