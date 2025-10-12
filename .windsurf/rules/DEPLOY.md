---
trigger: model_decision
---

# 🚀 Deploy para GitHub Pages

Este guia explica como fazer deploy da aplicação Mana Vitae para o GitHub Pages.

## 📋 Pré-requisitos

1. Repositório Git inicializado
2. Repositório remoto no GitHub configurado
3. Node.js e npm instalados

## 🔧 Configuração (Já Feita)

✅ Script de deploy adicionado ao `package.json`
✅ angular-cli-ghpages instalado globalmente

## 📦 Passos para Deploy

### 1. Certifique-se de que o código está commitado

```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### 2. Execute o comando de deploy

```bash
npm run deploy
```

Este comando irá:
- Fazer build de produção da aplicação
- Configurar o base-href para `/mana-vitae/`
- Fazer deploy automático para o branch `gh-pages`

### 3. Configure o GitHub Pages (Primeira vez)

1. Vá para o repositório no GitHub
2. Clique em **Settings** > **Pages**
3. Em **Source**, selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Clique em **Save**

### 4. Acesse sua aplicação

Após alguns minutos, sua aplicação estará disponível em:

```
https://<seu-usuario>.github.io/mana-vitae/
```

## 🔄 Atualizações Futuras

Para atualizar a aplicação após mudanças:

```bash
git add .
git commit -m "Suas alterações"
git push origin main
npm run deploy
```

## ⚙️ Configuração Personalizada

Se o nome do seu repositório for diferente de `mana-vitae`, atualize o script no `package.json`:

```json
"deploy": "ng build --configuration production --base-href /<nome-do-repo>/ && npx angular-cli-ghpages --dir=dist/mana-vitae/browser"
```

## 🐛 Troubleshooting

### Erro: "Failed to publish"
- Verifique se você tem permissões de escrita no repositório
- Certifique-se de que o remote origin está configurado corretamente

### Página em branco após deploy
- Verifique se o `base-href` está correto
- Confirme que o branch `gh-pages` foi criado
- Aguarde alguns minutos para propagação

### Erro 404 ao navegar
- Adicione um arquivo `404.html` que redireciona para `index.html`
- Configure rotas do Angular para usar `HashLocationStrategy` (opcional)

## 📝 Notas

- O deploy usa o branch `gh-pages` automaticamente
- Arquivos são servidos da pasta `dist/mana-vitae/browser`
- O build é otimizado para produção
- LocalStorage funciona normalmente no GitHub Pages
