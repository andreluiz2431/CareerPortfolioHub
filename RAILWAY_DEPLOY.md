# Railway Deploy - Portfolio

## Deploy Simples (Recomendado)

1. **Renomeie o arquivo**: `railway-simple.json` para `railway.json`
2. **Faça o deploy no Railway**
3. **Configure a variável PORT**: O Railway define automaticamente
4. **Done!** - O site estará online

## Arquivos de Deploy Disponíveis

### Opção 1: railway-simple.json (Recomendado)
- Build automático com nixpacks
- Start command simples: `node start-simple.js`
- Sem healthcheck (evita problemas)

### Opção 2: nixpacks-simple.toml
- Configuração nixpacks personalizada
- Build: npm install → init-data → npm run build
- Start: node start-simple.js

## Como o Deploy Funciona

1. **Build**: 
   - Instala dependências
   - Inicializa dados CSV
   - Builda frontend (vite) e backend (esbuild)

2. **Start**:
   - Inicializa dados se necessário
   - Inicia servidor em produção na porta do Railway

## Estrutura de Produção

```
dist/
├── public/          # Frontend buildado
│   ├── index.html
│   └── assets/
└── index.js         # Backend buildado

data/                # Dados CSV
├── portfolio.csv
├── projects.csv
├── experiences.csv
├── skills.csv
└── contacts.csv
```

## Troubleshooting

- **Container para em "Starting"**: Use railway-simple.json
- **Erro de porta**: Railway define PORT automaticamente
- **Dados não aparecem**: init-data.js cria os CSVs automaticamente

## Scripts Importantes

- `start-simple.js`: Script de inicialização simples para produção
- `init-data.js`: Cria arquivos CSV com dados do portfolio
- `build.js`: Build padrão (vite + esbuild)