# Railway will use nixpacks by default
# This Dockerfile is optional - Railway can detect Node.js automatically
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Initialize data and build
RUN node init-data.js && node build.js

# Clean up dev dependencies after build
RUN npm prune --production

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]