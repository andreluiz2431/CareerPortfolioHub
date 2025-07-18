import { execSync } from 'child_process';
import { existsSync } from 'fs';

try {
  console.log('Starting Railway deployment...');
  
  // Initialize data
  console.log('Initializing data...');
  execSync('node init-data.js', { stdio: 'inherit' });
  
  // Build the application
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if build was successful
  if (!existsSync('dist/index.js')) {
    throw new Error('Build failed - dist/index.js not found');
  }
  
  console.log('Starting production server...');
  process.env.NODE_ENV = 'production';
  
  // Use Railway's PORT or default to 3000
  const port = process.env.PORT || '3000';
  process.env.PORT = port;
  
  console.log(`Starting server on port ${port}...`);
  execSync('node dist/index.js', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Railway deployment failed:', error.message);
  process.exit(1);
}