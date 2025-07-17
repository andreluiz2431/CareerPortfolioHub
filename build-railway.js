import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

try {
  console.log('Starting Railway build process...');
  
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  // Build frontend with vite
  console.log('Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Build backend with esbuild - more external packages
  console.log('Building backend...');
  const externalPackages = [
    'vite',
    '@vitejs/plugin-react',
    'tailwindcss',
    'autoprefixer',
    'postcss',
    'typescript',
    'tsx',
    'drizzle-kit',
    '@types/node',
    '@types/express',
    '@types/react',
    '@types/react-dom'
  ].map(pkg => `--external:${pkg}`).join(' ');
  
  execSync(`npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist ${externalPackages}`, { stdio: 'inherit' });
  
  // Create a production package.json for Railway
  const prodPackageJson = {
    "name": "portfolio-production",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "start": "node index.js"
    },
    "dependencies": {
      "express": "^4.21.2",
      "zod": "^3.24.2",
      "nanoid": "^5.1.5"
    }
  };
  
  writeFileSync('dist/package.json', JSON.stringify(prodPackageJson, null, 2));
  
  console.log('Railway build completed successfully!');
} catch (error) {
  console.error('Railway build failed:', error.message);
  process.exit(1);
}