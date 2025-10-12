# Core Services - Domain Services Architecture

## 📐 Arquitetura

Cada domínio possui seu próprio serviço responsável por gerenciar suas operações de storage e lógica de negócio.

## 🗂️ Estrutura

```
core/services/
├── storage.service.ts              # Abstração do localStorage (infraestrutura)
├── daily-tasks.service.ts          # Domínio: Tarefas Diárias
├── daily-progress.service.ts       # Domínio: Progresso Diário
└── quantum-activities.service.ts   # Domínio: Atividades Quânticas
```

---

## 📦 Serviços por Domínio

### 1. StorageService (Infraestrutura)
**Responsabilidade**: Abstração do localStorage com type safety

**Métodos**:
- `getItem<T>(key: string): T | null`
- `setItem<T>(key: string, value: T): void`
- `removeItem(key: string): void`
- `clear(): void`

**Uso**: Injetado por outros serviços de domínio

---

### 2. DailyTasksService
**Responsabilidade**: Gerenciar tarefas diárias

**Storage Key**: `STORAGE_KEY_DAILY_TASKS`

**Métodos**:
```typescript
loadTasks(): Task[]
saveTasks(tasks: Task[]): void
```

**Lógica de Negócio**:
- Versionamento de tarefas
- Validação de data
- Randomização de 8 tarefas por dia
- Seeded random (mesma data = mesmas tarefas)

**Usado por**: `DailyTasksComponent`

---

### 3. DailyProgressService
**Responsabilidade**: Gerenciar histórico de progresso

**Storage Key**: `STORAGE_KEY_DAILY_PROGRESS`

**Métodos**:
```typescript
getHistory(): DailyProgress[]
saveHistory(history: DailyProgress[]): void
initializeHistory(): void
ensureTodayExists(): void
updateTodayProgress(completed: number, total: number): void
getLastSevenDays(): DailyProgress[]
```

**Lógica de Negócio**:
- Mantém histórico de 30 dias
- Remove dias antigos automaticamente
- Garante entrada para hoje
- Calcula percentuais

**Usado por**: `DailyProgressChartComponent`

---

### 4. QuantumActivitiesService
**Responsabilidade**: Gerenciar atividades quânticas (rituais)

**Storage Keys**: 
- `STORAGE_KEY_QUANTUM_ACTIVITIES`
- `STORAGE_KEY_QUANTUM_PENDING`

**Métodos**:
```typescript
loadCompletedActivities(now: Date): Set<string>
loadMonthlyData(): { focus: string | null; goal: string | null }
checkAndResetActivities(now: Date): Set<string>
getPendingDays(activityId: string, now: Date): number
initializePendingDate(activityId: string): void
```

**Lógica de Negócio**:
- Valida atividades por período (diário/semanal/mensal)
- Reseta atividades expiradas
- Calcula dias pendentes
- Gerencia dados mensais (foco/meta)

**Usado por**: `QuantumActivitiesComponent`

---

## 🎯 Princípios Aplicados

### 1. Single Responsibility Principle (SRP)
Cada serviço tem uma única responsabilidade bem definida:
- `StorageService`: Acesso ao storage
- `DailyTasksService`: Lógica de tarefas
- `DailyProgressService`: Lógica de progresso
- `QuantumActivitiesService`: Lógica de rituais

### 2. Dependency Inversion Principle (DIP)
Componentes dependem de abstrações (serviços), não de implementações (localStorage direto)

### 3. Separation of Concerns
- **Serviços**: Lógica de negócio + acesso a dados
- **Componentes**: Apresentação + interação
- **Constantes**: Dados estáticos

### 4. Encapsulation
Toda lógica de storage está encapsulada nos serviços de domínio

---

## 🔄 Fluxo de Dados

```
Component
    ↓ inject
Domain Service (DailyTasksService)
    ↓ inject
Infrastructure Service (StorageService)
    ↓
localStorage
```

---

## 💡 Exemplo de Uso

### Componente usando serviço de domínio

```typescript
@Component({...})
export class DailyTasksComponent {
  private readonly tasksService = inject(DailyTasksService);
  readonly tasks = signal<Task[]>([]);

  constructor() {
    // Serviço gerencia toda lógica de storage
    this.tasks.set(this.tasksService.loadTasks());
    
    effect(() => {
      // Serviço gerencia salvamento
      this.tasksService.saveTasks(this.tasks());
    });
  }
}
```

### Serviço de domínio usando infraestrutura

```typescript
@Injectable({ providedIn: 'root' })
export class DailyTasksService {
  private readonly storage = inject(StorageService);
  private readonly STORAGE_KEY = STORAGE_KEY_DAILY_TASKS;

  loadTasks(): Task[] {
    // Lógica de negócio + acesso via storage service
    const data = this.storage.getItem<TasksData>(this.STORAGE_KEY);
    return data ? this.processData(data) : this.getDefaultTasks();
  }

  saveTasks(tasks: Task[]): void {
    // Lógica de negócio + salvamento via storage service
    const data = this.prepareData(tasks);
    this.storage.setItem(this.STORAGE_KEY, data);
  }
}
```

---

## ✅ Benefícios

1. **Testabilidade**: Fácil mockar serviços em testes
2. **Manutenibilidade**: Lógica centralizada por domínio
3. **Reutilização**: Serviços podem ser usados por múltiplos componentes
4. **Isolamento**: Mudanças em storage não afetam componentes
5. **Type Safety**: TypeScript valida tipos em toda cadeia
6. **Single Source of Truth**: Uma única implementação por domínio

---

## 🧪 Testabilidade

```typescript
describe('DailyTasksService', () => {
  let service: DailyTasksService;
  let storageMock: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageMock = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
    TestBed.configureTestingModule({
      providers: [
        DailyTasksService,
        { provide: StorageService, useValue: storageMock }
      ]
    });
    service = TestBed.inject(DailyTasksService);
  });

  it('should load tasks from storage', () => {
    storageMock.getItem.and.returnValue(mockData);
    const tasks = service.loadTasks();
    expect(tasks.length).toBe(8);
  });
});
```

---

## 📊 Métricas

| Serviço | LOC | Responsabilidades | Storage Keys |
|---------|-----|-------------------|--------------|
| StorageService | 30 | 1 | 0 |
| DailyTasksService | 90 | 1 | 1 |
| DailyProgressService | 80 | 1 | 1 |
| QuantumActivitiesService | 100 | 1 | 2 |

**Total**: ~300 linhas de código bem organizadas e testáveis

---

## 🔮 Extensibilidade

Para adicionar novo domínio:

1. Criar novo serviço em `/core/services`
2. Definir storage key em `/data/constants`
3. Implementar lógica de negócio
4. Injetar `StorageService` para acesso a dados
5. Usar serviço nos componentes

```typescript
@Injectable({ providedIn: 'root' })
export class NewDomainService {
  private readonly storage = inject(StorageService);
  private readonly STORAGE_KEY = STORAGE_KEY_NEW_DOMAIN;

  // Implementar métodos do domínio
}
```

---

**Última Atualização**: 2025-10-12  
**Versão**: 2.0  
**Arquitetura**: Domain-Driven Services
