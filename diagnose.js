import { execSync } from 'child_process';
import { existsSync } from 'fs';
import http from 'http';

console.log('=== Railway Deployment Diagnostics ===');

// Check environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT || 'not set'}`);
console.log(`PWD: ${process.cwd()}`);

// Check if build exists
const buildExists = existsSync('dist/index.js');
console.log(`Build exists: ${buildExists}`);

if (buildExists) {
  console.log('Build file found - checking dependencies...');
  
  // Check data directory
  const dataExists = existsSync('data');
  console.log(`Data directory exists: ${dataExists}`);
  
  if (dataExists) {
    console.log('Data directory found - checking files...');
    try {
      const files = ['portfolio.csv', 'projects.csv', 'experiences.csv', 'skills.csv'];
      files.forEach(file => {
        const exists = existsSync(`data/${file}`);
        console.log(`  ${file}: ${exists ? 'OK' : 'MISSING'}`);
      });
    } catch (e) {
      console.log('Error checking data files:', e.message);
    }
  }
  
  // Try to start server and test health
  console.log('\nTesting server startup...');
  try {
    const port = parseInt(process.env.PORT || '5000', 10);
    
    // Import and start the server
    const { spawn } = await import('child_process');
    const server = spawn('node', ['dist/index.js'], {
      env: { ...process.env, NODE_ENV: 'production', PORT: port.toString() }
    });
    
    let output = '';
    server.stdout.on('data', (data) => {
      output += data.toString();
      console.log('SERVER:', data.toString().trim());
    });
    
    server.stderr.on('data', (data) => {
      console.log('SERVER ERROR:', data.toString().trim());
    });
    
    // Test health endpoint after 3 seconds
    setTimeout(() => {
      const req = http.get(`http://localhost:${port}/health`, (res) => {
        console.log(`Health check status: ${res.statusCode}`);
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log(`Health check response: ${body}`);
          server.kill();
          process.exit(0);
        });
      });
      
      req.on('error', (err) => {
        console.log(`Health check failed: ${err.message}`);
        server.kill();
        process.exit(1);
      });
      
      req.setTimeout(5000, () => {
        console.log('Health check timeout');
        server.kill();
        process.exit(1);
      });
    }, 3000);
    
    // Kill server after 10 seconds
    setTimeout(() => {
      console.log('Killing server after timeout');
      server.kill();
      process.exit(1);
    }, 10000);
    
  } catch (error) {
    console.log('Error starting server:', error.message);
    process.exit(1);
  }
} else {
  console.log('Build not found - please run: node build.js');
  process.exit(1);
}