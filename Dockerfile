# Use Node.js official image
#FROM node:18-alpine

# Set working directory
#WORKDIR /app

# Copy package files
#COPY package*.json ./

# Install dependencies
#RUN npm ci --only=production

# Copy source code
#COPY . .

# Build the application
#RUN npm run build

# Expose the port
#EXPOSE 5000

# Create data directory
#RUN mkdir -p /app/data

# Copy data files to production directory
#COPY data/ /app/data/

# Start the application
#CMD ["npm", "start"]