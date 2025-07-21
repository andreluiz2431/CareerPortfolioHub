
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies para o build)
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Remover devDependencies após o build para otimizar
RUN npm prune --production

# Expor porta
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "start"]
