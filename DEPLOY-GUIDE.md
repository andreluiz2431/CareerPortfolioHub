# Portfolio Deploy - Guia Completo

## 🎯 Deploy Estático (Recomendado - Sem Backend)

Sua aplicação agora está configurada como frontend puro com dados mockados.

### Como fazer o deploy:

1. **Renomeie**: `railway-vite-only.json` → `railway.json`
2. **Deploy no Railway**
3. **Pronto!** Portfolio online em segundos

### Como funciona:
- **Build**: `npm install && npm run build` (Vite build)
- **Start**: `npx serve dist -s -p $PORT` (Serve estático)
- **Dados**: Mockados no código (sem necessidade de APIs)

## 📊 Dados Inclusos

### Portfolio Pessoal
- Nome: André Luiz Montanha
- Título: Desenvolvedor Full Stack  
- Bio, contatos, estatísticas

### Experiências (4)
- Analista de Suporte N1 (2019-2021)
- Desenvolvedor Frontend Júnior (2021-2022)
- Desenvolvedor Full Stack Pleno (2022-2024)
- Desenvolvedor Full Stack Sênior (2024-Presente)

### Projetos (5)
- Sistema de Automação CAAL
- Dashboard Analytics
- E-commerce Platform
- Task Management App
- API Gateway Service

### Skills (32)
- Frontend: React, Angular, TypeScript, etc.
- Backend: Node.js, Firebase, MongoDB, etc.
- DevOps: Docker, AWS, Kubernetes, etc.
- Mobile: React Native, Android, iOS
- Outros: Agile, Figma, Testing, etc.

## 🔄 Alternativas de Deploy

### Se quiser manter as APIs:

1. **railway-final-fixed.json** (Fullstack)
   - Build: npm install 
   - Start: node init-data.js && npm run build && npm start
   - Inclui backend Express + dados CSV

2. **railway-no-tsx.json** (Personalizado)
   - Build: npm install
   - Start: node railway-deploy.js
   - Script customizado de deploy

## 🎨 Características

- ✅ Design SpaceX moderno
- ✅ Tema escuro responsivo
- ✅ Animações suaves
- ✅ Admin login (admin/admin123) - funcional em modo dev
- ✅ CRUD completo - funcional em modo dev
- ✅ GitHub integração mockada
- ✅ Componentes profissionais (Radix UI + shadcn)

## 🚀 Vantagens do Deploy Estático

- **Mais rápido**: Sem servidor, apenas CDN
- **Mais barato**: Hosting gratuito
- **Mais confiável**: Sem problemas de servidor
- **Mais simples**: Zero configuração

## 🛠️ Para Desenvolvimento

Se quiser trabalhar no código localmente:

```bash
npm run dev  # Vite dev server
# Abre em http://localhost:5173
```

## ✅ Resultado Final

Portfolio profissional completo com:
- Dados reais do André Luiz Montanha
- Design moderno SpaceX
- Performance otimizada
- Deploy simples e confiável