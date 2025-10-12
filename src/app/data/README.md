# Data Layer - Constantes da Aplicação

Esta camada contém todas as constantes imutáveis da aplicação, seguindo princípios de Clean Code.

## Estrutura

```
data/
├── constants/
│   ├── week-days.constants.ts           # Dias da semana e temas
│   ├── daily-tasks.constants.ts         # Tarefas diárias por dia da semana
│   ├── quantum-messages.constants.ts    # Mensagens quânticas e zen
│   ├── quantum-activities.constants.ts  # Atividades quânticas (rituais)
│   ├── storage-keys.constants.ts        # Chaves de localStorage
│   ├── STORAGE_KEYS_README.md           # Documentação das chaves
│   └── index.ts                         # Barrel export
└── models/                              # Modelos de domínio (interfaces)
```

## Princípios

### 1. Imutabilidade
- Todas as constantes são `readonly` e usam `as const`
- Garante que os dados não sejam modificados acidentalmente

### 2. Single Source of Truth
- Cada dado tem apenas um lugar de definição
- Componentes importam e usam, nunca duplicam

### 3. Separação de Responsabilidades
- `/constants`: Dados estáticos da aplicação
- `/models`: Interfaces e tipos de domínio
- Componentes: Lógica de apresentação e interação

### 4. Type Safety
- Todas as constantes são fortemente tipadas
- TypeScript garante consistência em toda a aplicação

## Uso

```typescript
// Import específico
import { WEEK_DAYS, QUANTUM_MESSAGES } from '@app/data/constants';

// Import via barrel
import { WEEK_DAYS, DAILY_TASKS_BY_WEEKDAY } from '@app/data/constants';

// Uso
const currentDay = WEEK_DAYS[new Date().getDay()];
const tasks = DAILY_TASKS_BY_WEEKDAY[dayIndex];
```

## Benefícios

1. **Manutenção**: Alterar dados em um único lugar
2. **Testabilidade**: Fácil mockar constantes em testes
3. **Escalabilidade**: Adicionar novos dados sem modificar componentes
4. **Consistência**: Mesmos dados em toda aplicação
5. **Performance**: Dados carregados uma vez, reutilizados sempre
