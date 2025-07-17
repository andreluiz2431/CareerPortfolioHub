# Como Ignorar Healthcheck no Railway

## Opção 1: Renomear Arquivo (Mais Simples)

1. Renomeie `railway-simple.json` para `railway.json` 
2. Faça o deploy no Railway
3. Pronto! Sem healthcheck, sem problemas

## Opção 2: Configurar no Dashboard

1. Vá no Railway Dashboard
2. Entre no seu projeto
3. Vá em **Settings** → **Deploy**
4. **Desative** o "Health Check" 
5. Salve as configurações

## Opção 3: Usar nixpacks.toml

1. Renomeie `nixpacks-simple.toml` para `nixpacks.toml`
2. Faça o deploy
3. Sem healthcheck automático

## Por que Sem Healthcheck?

- O Railway às vezes fica preso no healthcheck
- Aplicações Node.js simples não precisam
- Evita o problema "Starting Container" infinito
- Seu portfolio vai ficar online mais rápido

## O que Usar

**Use sempre**: `railway-simple.json` → `railway.json`

É a opção mais confiável e simples!