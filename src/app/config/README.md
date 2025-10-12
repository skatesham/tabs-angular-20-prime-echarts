# Application Configuration

Configurações da aplicação organizadas por domínio de responsabilidade.

## 📁 Estrutura

```
config/
├── rituals/              # Rituais e Atividades
│   ├── activities.config.ts       # Atividades quânticas (rituais)
│   ├── daily-tasks.config.ts      # Tarefas diárias por dia
│   ├── week-days.config.ts        # Dias da semana e temas
│   └── index.ts
│
├── content/              # Conteúdo e Mensagens
│   ├── inspiration-messages.config.ts  # Mensagens de inspiração
│   ├── quantum-messages.config.ts      # Mensagens quânticas
│   ├── mission-vision-values.config.ts # Missão, visão e valores
│   └── index.ts
│
├── storage/              # Armazenamento
│   ├── keys.config.ts             # Chaves do localStorage
│   ├── README.md                  # Documentação das chaves
│   └── index.ts
│
└── index.ts              # Barrel export principal
```

## 🎯 Princípios de Organização

### 1. Separação por Domínio
Cada pasta representa um domínio específico da aplicação:

- **rituals**: Tudo relacionado a rituais, atividades e tarefas
- **content**: Mensagens, inspirações e conteúdo textual
- **storage**: Configurações de persistência de dados

### 2. Nomenclatura Clara
- Arquivos terminam em `.config.ts` (não `.constants.ts`)
- Nomes descritivos do conteúdo
- Evita ambiguidade

### 3. Single Responsibility
Cada arquivo tem uma única responsabilidade clara:
- `activities.config.ts` → apenas atividades
- `inspiration-messages.config.ts` → apenas mensagens de inspiração

## 📖 Como Usar

### Import Específico por Domínio
```typescript
// Import de rituais
import { QUANTUM_ACTIVITIES, WEEK_DAYS } from '@app/config/rituals';

// Import de conteúdo
import { INSPIRATION_MESSAGES, QUANTUM_MESSAGES } from '@app/config/content';

// Import de storage
import { STORAGE_KEY_DAILY_TASKS } from '@app/config/storage';
```

### Import Geral (não recomendado)
```typescript
// Import tudo (use apenas se necessário)
import { QUANTUM_ACTIVITIES, INSPIRATION_MESSAGES } from '@app/config';
```

## ✅ Benefícios

1. **Clareza**: Fácil encontrar configurações por domínio
2. **Manutenção**: Mudanças isoladas por responsabilidade
3. **Escalabilidade**: Adicionar novos domínios sem conflito
4. **Imports Limpos**: Imports mais semânticos e organizados
5. **Menos Acoplamento**: Domínios independentes

## 🔄 Migração

### Antes (data/constants)
```typescript
import { WEEK_DAYS, QUANTUM_MESSAGES } from '@app/data/constants';
```

### Depois (config/[domain])
```typescript
import { WEEK_DAYS } from '@app/config/rituals';
import { QUANTUM_MESSAGES } from '@app/config/content';
```

## 📝 Convenções

- **Imutabilidade**: Todos os exports são `readonly` e `as const`
- **Type Safety**: Interfaces e tipos bem definidos
- **Documentação**: JSDoc em todas as constantes principais
- **Barrel Exports**: Cada pasta tem seu `index.ts`
