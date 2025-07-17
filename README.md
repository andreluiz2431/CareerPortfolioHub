# Portfolio André Luiz Montanha

Um portfólio moderno e responsivo desenvolvido em React com tema escuro inspirado na SpaceX. Inclui funcionalidades CRUD completas para gerenciamento de conteúdo e integração com GitHub.

## Funcionalidades

- ✅ Design moderno com tema escuro SpaceX
- ✅ Seções: Hero, About, Experience, Projects, Skills, Contact
- ✅ Sistema de autenticação admin (login/logout)
- ✅ CRUD completo para projetos, experiências e habilidades
- ✅ Integração com GitHub para buscar dados de repositórios
- ✅ Armazenamento em arquivos CSV (preparado para migração Firebase)
- ✅ Responsivo e otimizado para mobile

## Tecnologias

- **Frontend:** React 18, TypeScript, TailwindCSS, Wouter, TanStack Query
- **Backend:** Node.js, Express, TypeScript
- **UI:** Radix UI, shadcn/ui, Lucide Icons
- **Armazenamento:** CSV (migrável para Firebase)
- **Build:** Vite, esbuild

## Desenvolvimento Local

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Acesse em `http://localhost:5000`

## Acesso Admin

- **Usuário:** admin
- **Senha:** admin123

## Deploy no Railway

### Opção 1: Deploy Direto
1. Conecte seu repositório GitHub ao Railway
2. Railway detectará automaticamente o projeto Node.js
3. As configurações estão em `railway.json`

### Opção 2: Deploy Manual
1. Inicialize os dados: `node init-data.js`
2. Faça build do projeto: `node build.js`
3. Inicie o servidor: `npm start`
4. Configure as variáveis de ambiente se necessário

### Configurações Railway

O projeto inclui:
- `railway.json` - Configurações de build e deploy
- `Dockerfile` - Container para deploy
- `init-data.js` - Inicialização dos dados CSV
- `build.js` - Script de build customizado

## Estrutura do Projeto

```
/
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Schemas TypeScript compartilhados
├── data/            # Arquivos CSV de dados
├── dist/            # Build de produção
└── components.json  # Configuração shadcn/ui
```

## Variáveis de Ambiente

```bash
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=5000
```

## Migração para Firebase

O projeto está preparado para migração futura para Firebase:
- Schemas TypeScript já definidos
- Interface de storage abstrata
- Configuração Drizzle ORM pronta
- Estrutura de dados compatível

## Contato

- **Email:** alm28062001@gmail.com
- **GitHub:** https://github.com/andreluiz2431
- **Telefone:** 55-996596043