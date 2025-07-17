#!/usr/bin/env node

// Railway-specific startup script
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('=== Railway Startup Script ===');

// Set environment variables
process.env.NODE_ENV = 'production';
const port = process.env.PORT || 5000;
console.log(`PORT: ${port}`);

// Initialize data
console.log('Initializing data...');
try {
  execSync('node init-data.js', { stdio: 'inherit' });
  console.log('Data initialization complete');
} catch (error) {
  console.error('Data initialization failed:', error.message);
  process.exit(1);
}

// Check if build exists
if (!existsSync('dist/index.js')) {
  console.error('Build not found. Please run build process.');
  process.exit(1);
}

// Start the server
console.log('Starting server...');
try {
  const { spawn } = await import('child_process');
  const server = spawn('node', ['dist/index.js'], {
    env: { ...process.env, PORT: port.toString() },
    stdio: 'inherit'
  });

  // Handle process signals
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    server.kill('SIGTERM');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    server.kill('SIGINT');
    process.exit(0);
  });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    process.exit(code);
  });

  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('Failed to start server:', error.message);
  process.exit(1);
}