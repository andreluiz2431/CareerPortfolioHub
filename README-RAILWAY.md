# Deploy no Railway - Guia Completo

## ✅ Opção Mais Simples (Recomendada)

1. **Renomeie**: `railway-final-fixed.json` → `railway.json`
2. **Deploy no Railway**
3. **Pronto!** O site ficará online

### Como funciona:
- **Build**: `npm install` (instala dependências)
- **Start**: `node init-data.js && npm run build && npm start`
  - Cria dados CSV
  - Builda frontend + backend
  - Inicia servidor em produção

## 🔧 Outras Opções Disponíveis

### railway-production.json
- Build: `npm install && node init-data.js && npm run build`
- Start: `npm start`
- ✅ Funciona, mas build mais lento

### railway-no-tsx.json
- Build: `npm install`
- Start: `node railway-deploy.js`
- ✅ Script personalizado, mais controle

### railway-static.json
- Build: `npm install && node build-static.js`
- Start: `npx serve dist -s -p $PORT`
- ⚠️ Apenas frontend estático (sem APIs)

## 📋 Resolução de Problemas

### "sh: tsx: not found"
- **Causa**: Railway tentando executar script de desenvolvimento
- **Solução**: Use `railway-final-fixed.json` que executa build + start

### "Container Starting" infinito
- **Causa**: Healthcheck travando
- **Solução**: Nossas configurações não usam healthcheck

### "Error: listen EADDRINUSE"
- **Causa**: Porta já em uso
- **Solução**: Railway define PORT automaticamente

## 🚀 Como Testar Localmente

```bash
# Teste completo como no Railway
node init-data.js
npm run build
PORT=3000 npm start

# Teste apenas o health check
curl http://localhost:3000/health
```

## 📁 Estrutura Final

```
dist/
├── public/          # Frontend (React)
│   ├── index.html
│   └── assets/
└── index.js         # Backend (Express)

data/                # Dados CSV
├── portfolio.csv
├── projects.csv
├── experiences.csv
├── skills.csv
└── contacts.csv
```

## 🎯 Recomendação

**Use sempre**: `railway-final-fixed.json` → `railway.json`

É a opção mais confiável e testada!