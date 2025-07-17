# Railway Deploy - Resolução do Problema de Healthcheck

## Problema Identificado
O Railway está falhando no healthcheck mesmo com a aplicação funcionando corretamente.

## Configurações Implementadas

### 1. Endpoints de Saúde
- `/health` - Endpoint principal (HTTP 200)
- `/api/health` - Endpoint alternativo (HTTP 200)  
- `/healthz` - Endpoint padrão Railway (HTTP 200)

### 2. Configuração Railway (railway.json)
```json
{
  "build": {
    "builder": "nixpacks",
    "buildCommand": "npm install && node init-data.js && node build.js"
  },
  "deploy": {
    "startCommand": "node railway-start.js",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "healthcheckInterval": 30,
    "healthcheckGracePeriod": 60
  }
}
```

### 3. Arquivos de Suporte
- `railway-start.js` - Script específico para Railway
- `build.js` - Script de build com npx
- `init-data.js` - Inicialização de dados CSV
- `diagnose.js` - Diagnóstico de problemas

## Critérios para Healthcheck Passar

### Railway espera:
1. **Status HTTP 200** no endpoint configurado
2. **Resposta JSON válida** 
3. **Tempo de resposta < 30s**
4. **Servidor escutando na porta $PORT**
5. **Endpoint acessível em 0.0.0.0**

### Testado localmente:
```bash
# Teste 1: Endpoint principal
curl -v http://localhost:5000/health
# Resultado: HTTP 200 ✅

# Teste 2: Endpoint API
curl -v http://localhost:5000/api/health
# Resultado: HTTP 200 ✅

# Teste 3: Servidor produção
NODE_ENV=production node dist/index.js
# Resultado: Servidor iniciado ✅
```

## Possíveis Causas do Problema

### 1. Timing de Inicialização
- Servidor demora para inicializar
- Dados CSV demoram para carregar
- **Solução**: Grace period de 60s

### 2. Configuração de Porta
- Railway usa porta dinâmica ($PORT)
- **Solução**: Servidor configurado para usar process.env.PORT

### 3. Binding de Interface
- Servidor deve escutar em 0.0.0.0
- **Solução**: server.listen(port, "0.0.0.0")

### 4. Dependências de Build
- Dependências dev não instaladas
- **Solução**: npm install completo no build

## Próximos Passos

### Alternativa 1: Remover Dockerfile
Railway prefere usar nixpacks automaticamente:
```bash
# Remover Dockerfile e deixar Railway detectar Node.js
rm Dockerfile
```

### Alternativa 2: Usar PORT dinâmico
```bash
# Testar com porta dinâmica
PORT=8080 node dist/index.js
```

### Alternativa 3: Simplificar healthcheck
```json
{
  "healthcheckPath": "/health",
  "healthcheckTimeout": 120,
  "healthcheckGracePeriod": 30
}
```

## Logs Importantes

Durante deploy no Railway, verificar:
1. Servidor iniciou na porta correta
2. Endpoint /health responde HTTP 200
3. Dados CSV foram inicializados
4. Sem erros de dependências

## Contato para Suporte

Se o problema persistir, Railway oferece suporte via:
- Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/railwayapp/railway/issues
- Documentação: https://docs.railway.app/