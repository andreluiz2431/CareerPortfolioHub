import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

try {
  console.log('Building static portfolio...');
  
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  // Build only frontend with vite
  console.log('Building frontend with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Static build completed successfully!');
  console.log('Files ready in dist/ directory');
} catch (error) {
  console.error('Static build failed:', error.message);
  process.exit(1);
}