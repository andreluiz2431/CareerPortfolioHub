import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

try {
  console.log('Starting build process...');
  
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  // Build frontend with vite
  console.log('Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Build backend with esbuild
  console.log('Building backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}