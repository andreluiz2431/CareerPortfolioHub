import { execSync } from 'child_process';

console.log('Initializing data...');
execSync('node init-data.js', { stdio: 'inherit' });

console.log('Starting production server...');
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
execSync('node dist/index.js', { stdio: 'inherit' });