# 🌊 Mana Vitae

> **Fluxo sagrado da vida. Doe energia, receba prosperidade.**

Aplicação web para gerenciamento de rituais criativos, metas e atividades quânticas. Desenvolvida com Angular 20, PrimeNG e Tailwind CSS.

[![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?logo=angular)](https://angular.dev)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-20.2-007ACC?logo=primeng)](https://primeng.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)

## 🎯 Sobre o Projeto

**Mana Vitae** é uma aplicação de produtividade espiritual que combina gestão de tarefas com rituais criativos. Inspirada em conceitos de energia criativa (mana) e ciclos naturais, a aplicação ajuda artistas e criadores a manterem foco, celebrarem conquistas e cultivarem práticas conscientes.

### 🌟 Conceito

- **Mana**: Energia criativa vital que flui através das ações
- **Rituais Quânticos**: Práticas diárias, semanais e mensais de reflexão
- **Prosperidade Consciente**: Transformar energia em resultados tangíveis

## ✨ Funcionalidades

### 🏠 Home (Dashboard)
- **Atividades Quânticas**: Visualização de rituais pendentes (diário, semanal, mensal)
- **Cartão de Boas-vindas**: Mensagem personalizada com data e hora
- **Foco do Dia**: Definição e acompanhamento do objetivo principal
- **Tarefas Diárias**: Lista de tarefas com progresso visual
- **Gráfico de Progresso**: Visualização de atividades completadas
- **Motivação Diária**: Mensagens inspiradoras
- **Missão, Visão e Valores**: Exibição dos pilares do ateliê

### 🧘 Rituais
- **Ressonância Interna (Diário)**: Reflexão e alinhamento diário
- **Portal da Prosperidade (Semanal)**: Revisão semanal de conquistas
- **Celebração Lunar (Mensal)**: Ritual mensal de fechamento e abertura de ciclos

### 💡 Ideas
- **Visualização de Todas as Atividades**: Acesso rápido a todos os rituais
- **Histórico**: Consulta de rituais anteriores

### ⚙️ Config
- **Edição de Missão**: Defina o propósito do seu ateliê
- **Edição de Visão**: Estabeleça onde quer chegar
- **Gerenciamento de Valores**: Adicione, remova e organize seus valores
- **Validações**: Mínimo de 3 valores obrigatórios para salvar
- **Persistência**: Dados salvos no localStorage

## 🛠 Tecnologias

### Core
- **Angular 20.3** - Framework principal (standalone components, signals)
- **TypeScript 5.9** - Linguagem de programação
- **RxJS 7.8** - Programação reativa

### UI/UX
- **PrimeNG 20.2** - Biblioteca de componentes UI
- **Tailwind CSS 4.1** - Framework CSS utilitário
- **ECharts 6.0** - Biblioteca de gráficos interativos
- **ngx-echarts 20.0** - Integração ECharts com Angular

### Arquitetura
- **Zoneless Change Detection** - Performance otimizada
- **Standalone Components** - Arquitetura moderna
- **Signals** - Gerenciamento de estado reativo
- **Lazy Loading** - Carregamento sob demanda de rotas

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm 9+

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/skatesham/tabs-angular-20-prime-echarts.git
cd tabs-angular-20-prime-echarts
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

4. **Acesse a aplicação**
```
http://localhost:4200
```

## 🚀 Uso

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm start

# Build de desenvolvimento com watch
npm run watch

# Executar testes
npm test
```

### Produção

```bash
# Build de produção
npm run build

# Deploy para GitHub Pages
npm run deploy
```

## 🌐 Deploy

### GitHub Pages

A aplicação está configurada para deploy automático no GitHub Pages.

#### Deploy Automático

```bash
npm run deploy
```

Este comando irá:
1. Fazer build de produção
2. Configurar base-href correto
3. Fazer push para branch `gh-pages`
4. Publicar automaticamente

#### Configuração Manual

1. Vá para **Settings** > **Pages** no GitHub
2. Configure:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Salve e aguarde 2-5 minutos

#### URL de Produção
```
https://skatesham.github.io/tabs-angular-20-prime-echarts/
```

### Outras Plataformas

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Faça upload da pasta dist/mana-vitae/browser
```

## 📁 Estrutura do Projeto

```
src/app/
├── features/           # Módulos de funcionalidades
│   └── tabs/
│       ├── components/ # Componentes específicos (layout, tabs)
│       └── pages/      # Páginas da aplicação
│           ├── home/           # Dashboard principal
│           ├── ideas/          # Visualização de todas atividades
│           ├── config/         # Configurações
│           ├── ritual-daily/   # Ritual diário
│           ├── ritual-weekly/  # Ritual semanal
│           └── ritual-monthly/ # Ritual mensal
├── shared/             # Componentes compartilhados
│   └── ui/
│       ├── app-loader/              # Tela de carregamento
│       ├── daily-motivation/        # Mensagens motivacionais
│       ├── daily-progress-chart/    # Gráfico de progresso
│       ├── daily-tasks/             # Lista de tarefas
│       ├── goal-focus/              # Foco do dia
│       ├── mission-vision-values/   # Missão, visão e valores
│       ├── page-header/             # Cabeçalho de páginas
│       ├── quantum-activities/      # Cards de atividades
│       └── welcome-card/            # Cartão de boas-vindas
├── data/               # Modelos de dados
│   └── models/
├── app.ts              # Componente raiz
├── app.config.ts       # Configuração da aplicação
└── app.routes.ts       # Rotas da aplicação
```

## 🎨 Padrões de Código

### Componentes
- **Standalone**: Todos os componentes são standalone
- **Signals**: Estado reativo com signals
- **OnPush**: Change detection otimizada
- **Getters**: Valores derivados simples

### Nomenclatura
- **UI Compartilhada**: `p-<nome>` (ex: `p-text-input`)
- **Feature**: `f-<feature>-<nome>` (ex: `f-tabs-layout`)
- **Páginas**: `<nome>.page.ts` (ex: `home.page.ts`)

### Template
- **Control Flow**: `@if`, `@for` (sintaxe moderna)
- **Track**: Sempre usar `track` em `@for`
- **Limite**: Máximo 60 linhas por template

## 🔧 Configuração

### Dados Persistidos (localStorage)

- **Missão, Visão e Valores**: `missionVisionValues`
- **Rituais Completados**: `rituals`
- **Tarefas Diárias**: `dailyTasks`
- **Foco do Dia**: `dailyGoal`

### Temas

A aplicação suporta **dark mode** automático baseado nas preferências do sistema.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas diretrizes:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração sem mudança de comportamento
test: adiciona ou atualiza testes
chore: tarefas de manutenção
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Skatesham**
- GitHub: [@skatesham](https://github.com/skatesham)

## 🙏 Agradecimentos

- [Angular Team](https://angular.dev) - Framework incrível
- [PrimeNG](https://primeng.org) - Componentes UI de qualidade
- [Tailwind CSS](https://tailwindcss.com) - Utilitários CSS poderosos
- [ECharts](https://echarts.apache.org) - Gráficos interativos

---

**Feito com 💜 e ☕ por Skatesham**
