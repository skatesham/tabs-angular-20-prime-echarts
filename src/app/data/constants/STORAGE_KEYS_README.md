# Storage Keys - Documentação

## 📦 Chaves de LocalStorage

Todas as chaves de storage estão centralizadas em `storage-keys.constants.ts` para evitar duplicação e typos.

### Chaves Disponíveis

#### 1. `STORAGE_KEY_DAILY_TASKS`
**Valor**: `'daily-tasks'`

**Descrição**: Armazena tarefas diárias com versionamento e data

**Estrutura de Dados**:
```typescript
{
  version: number,      // Versão do schema (para migrations)
  date: string,         // Data no formato YYYY-MM-DD
  tasks: Task[]         // Array de tarefas
}

interface Task {
  id: number;
  label: string;
  completed: boolean;
}
```

**Usado por**: `DailyTasksService`, `DailyTasksComponent`

**Comportamento**:
- Reseta automaticamente quando muda o dia
- Força reload quando versão é diferente
- Seleciona 8 tarefas aleatórias por dia

---

#### 2. `STORAGE_KEY_DAILY_PROGRESS`
**Valor**: `'daily-progress-history'`

**Descrição**: Histórico de progresso dos últimos 30 dias

**Estrutura de Dados**:
```typescript
DailyProgress[]

interface DailyProgress {
  date: string;        // YYYY-MM-DD
  completed: number;   // Tarefas completadas
  total: number;       // Total de tarefas (8)
  percentage: number;  // Percentual de conclusão
}
```

**Usado por**: `DailyProgressChartComponent`

**Comportamento**:
- Mantém histórico de 30 dias
- Remove dias mais antigos automaticamente
- Atualiza em tempo real conforme tarefas são completadas

---

#### 3. `STORAGE_KEY_QUANTUM_ACTIVITIES`
**Valor**: `'quantum-activities'`

**Descrição**: Registro de atividades quânticas completadas (rituais)

**Estrutura de Dados**:
```typescript
{
  [activityId: string]: number | MonthlyData
}

interface MonthlyData {
  timestamp: number;
  focus?: string;      // Foco do mês (apenas monthly)
  goal?: string;       // Meta do mês (apenas monthly)
}
```

**Usado por**: `QuantumActivitiesService`, `QuantumActivitiesComponent`

**Comportamento**:
- `daily`: Reseta todo dia
- `weekly`: Reseta toda semana
- `monthly`: Reseta todo mês
- Armazena dados extras para atividade mensal

---

#### 4. `STORAGE_KEY_QUANTUM_PENDING`
**Valor**: `'quantum-activities-pending'`

**Descrição**: Datas de início de atividades pendentes

**Estrutura de Dados**:
```typescript
{
  [activityId: string]: number  // timestamp
}
```

**Usado por**: `QuantumActivitiesService`

**Comportamento**:
- Registra quando atividade ficou pendente
- Calcula dias de atraso
- Mostra badge com número de dias

---

## 🔧 Como Usar

### Import
```typescript
import { 
  STORAGE_KEY_DAILY_TASKS,
  STORAGE_KEY_DAILY_PROGRESS,
  STORAGE_KEY_QUANTUM_ACTIVITIES,
  STORAGE_KEY_QUANTUM_PENDING,
  ALL_STORAGE_KEYS,
  STORAGE_KEYS_MAP
} from '@app/data/constants';
```

### Uso com StorageService
```typescript
// Salvar
this.storage.setItem(STORAGE_KEY_DAILY_TASKS, data);

// Carregar
const data = this.storage.getItem<TasksData>(STORAGE_KEY_DAILY_TASKS);

// Remover
this.storage.removeItem(STORAGE_KEY_DAILY_TASKS);
```

### Limpar Todos os Dados
```typescript
import { ALL_STORAGE_KEYS } from '@app/data/constants';

ALL_STORAGE_KEYS.forEach(key => {
  localStorage.removeItem(key);
});
```

### Inspecionar Metadados
```typescript
import { STORAGE_KEYS_MAP } from '@app/data/constants';

console.log(STORAGE_KEYS_MAP.DAILY_TASKS);
// {
//   key: 'daily-tasks',
//   description: 'Tarefas diárias com versionamento e data',
//   dataType: '{ version: number, date: string, tasks: Task[] }'
// }
```

---

## 🛡️ Type Safety

Todas as chaves são fortemente tipadas:

```typescript
type StorageKey = typeof ALL_STORAGE_KEYS[number];
// 'daily-tasks' | 'daily-progress-history' | 'quantum-activities' | 'quantum-activities-pending'
```

---

## 🧹 Manutenção

### Adicionar Nova Chave

1. Adicionar constante em `storage-keys.constants.ts`:
```typescript
export const STORAGE_KEY_NEW_FEATURE = 'new-feature';
```

2. Adicionar ao mapa:
```typescript
export const STORAGE_KEYS_MAP = {
  // ...
  NEW_FEATURE: {
    key: STORAGE_KEY_NEW_FEATURE,
    description: 'Descrição da nova feature',
    dataType: 'tipo dos dados'
  }
} as const;
```

3. Adicionar ao array:
```typescript
export const ALL_STORAGE_KEYS = [
  // ...
  STORAGE_KEY_NEW_FEATURE
] as const;
```

### Migração de Dados

Quando mudar estrutura de dados, incrementar versão:

```typescript
// Em DailyTasksService
private readonly TASKS_VERSION = 5; // Era 4

// Sistema detecta versão antiga e força reload
```

---

## 📊 Tamanho dos Dados

| Chave | Tamanho Aprox. | Retenção |
|-------|----------------|----------|
| daily-tasks | ~2KB | 1 dia |
| daily-progress-history | ~5KB | 30 dias |
| quantum-activities | ~1KB | Variável |
| quantum-activities-pending | ~500B | Permanente |

**Total**: ~8.5KB

---

## 🔍 Debug

### Ver Todos os Dados
```typescript
import { ALL_STORAGE_KEYS } from '@app/data/constants';

ALL_STORAGE_KEYS.forEach(key => {
  console.log(key, localStorage.getItem(key));
});
```

### Limpar Dados Específicos
```typescript
// No DevTools Console
localStorage.removeItem('daily-tasks');
localStorage.removeItem('daily-progress-history');
```

---

**Última Atualização**: 2025-10-12
**Versão**: 1.0
