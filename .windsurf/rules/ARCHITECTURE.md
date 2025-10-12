---
trigger: model_decision
---

# ManaVitae - Clean Architecture Summary

## 🎯 Arquitetura Final

### Domain-Driven Services Architecture

```
src/app/
├── core/                               # Infraestrutura e Serviços de Domínio
│   └── services/
│       ├── storage.service.ts              # Infraestrutura: localStorage
│       ├── daily-tasks.service.ts          # Domínio: Tarefas Diárias
│       ├── daily-progress.service.ts       # Domínio: Progresso Diário
│       ├── quantum-activities.service.ts   # Domínio: Atividades Quânticas
│       └── README.md                       # Documentação completa
│
├── data/                               # Camada de Dados (Imutável)
│   ├── constants/
│   │   ├── week-days.constants.ts          # 7 dias + temas
│   │   ├── daily-tasks.constants.ts        # 105 tarefas (15×7)
│   │   ├── quantum-messages.constants.ts   # 49 mensagens + 5 zen
│   │   ├── quantum-activities.constants.ts # 3 atividades quânticas
│   │   ├── storage-keys.constants.ts       # 4 chaves de storage
│   │   ├── STORAGE_KEYS_README.md          # Documentação das chaves
│   │   ├── README.md                       # Guia da camada
│   │   └── index.ts                        # Barrel export
│   └── models/                             # Interfaces de domínio
│
└── shared/                             # Compartilhado
    ├── ui/                                 # Componentes de apresentação
    │   ├── daily-tasks/                    # 65 linhas (-59%)
    │   ├── daily-progress-chart/           # 175 linhas (-40%)
    │   ├── quantum-activities/             # 85 linhas (-65%)
    │   └── welcome-card/                   # 66 linhas (-62%)
    └── utils/
        └── date.utils.ts                   # Utilitários de data
```

---

## 📊 Métricas de Limpeza

### Código Removido
- **~400 linhas** de código duplicado
- **~50 linhas** de console.logs
- **~150 linhas** de métodos utilitários duplicados
- **~100 linhas** de lógica de storage nos componentes

### Código Criado (Organizado)
- **4 serviços** de domínio (~300 linhas)
- **5 arquivos** de constantes (~500 linhas)
- **1 utilitário** de data (~60 linhas)
- **3 READMEs** de documentação

### Componentes Simplificados

| Componente | Antes | Depois | Redução |
|------------|-------|--------|---------|
| DailyTasks | 158 linhas | 65 linhas | **59%** |
| WelcomeCard | 172 linhas | 66 linhas | **62%** |
| QuantumActivities | 244 linhas | 85 linhas | **65%** |
| DailyProgressChart | 290 linhas | 175 linhas | **40%** |

**Total**: ~400 linhas removidas dos componentes

---

## 🏛️ Princípios Arquiteturais

### 1. Domain-Driven Design (DDD)
Cada domínio possui seu próprio serviço:
- **DailyTasksService**: Gerencia tarefas diárias
- **DailyProgressService**: Gerencia histórico de progresso
- **QuantumActivitiesService**: Gerencia rituais quânticos

### 2. Single Responsibility Principle (SRP)
- **Serviços**: Lógica de negócio + acesso a dados
- **Componentes**: Apresentação + interação do usuário
- **Constantes**: Dados estáticos imutáveis
- **Utils**: Funções utilitárias puras

### 3. Dependency Inversion Principle (DIP)
```
Component → Domain Service → Infrastructure Service → Storage
```

### 4. Separation of Concerns
- `/core/services`: Lógica de negócio
- `/data/constants`: Dados estáticos
- `/shared/ui`: Apresentação
- `/shared/utils`: Utilitários

### 5. Immutability
- `readonly` em todas as constantes
- `as const` para type safety
- Dados não podem ser modificados

---

## 🔄 Fluxo de Dados

```
┌─────────────────┐
│   Component     │  ← Apresentação
└────────┬────────┘
         │ inject
         ↓
┌─────────────────┐
│ Domain Service  │  ← Lógica de Negócio
└────────┬────────┘
         │ inject
         ↓
┌─────────────────┐
│ Storage Service │  ← Infraestrutura
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  localStorage   │  ← Persistência
└─────────────────┘
```

---

## 📦 Serviços por Domínio

### StorageService (Infraestrutura)
**Responsabilidade**: Abstração type-safe do localStorage

**Métodos**:
- `getItem<T>(key): T | null`
- `setItem<T>(key, value): void`
- `removeItem(key): void`
- `clear(): void`

---

### DailyTasksService
**Domínio**: Tarefas Diárias

**Responsabilidades**:
- Carregar/salvar tarefas
- Versionamento de schema
- Randomização de 8 tarefas/dia
- Validação de data

**Storage**: `STORAGE_KEY_DAILY_TASKS`

---

### DailyProgressService
**Domínio**: Progresso Diário

**Responsabilidades**:
- Gerenciar histórico (30 dias)
- Calcular percentuais
- Garantir entrada para hoje
- Remover dias antigos

**Storage**: `STORAGE_KEY_DAILY_PROGRESS`

---

### QuantumActivitiesService
**Domínio**: Atividades Quânticas

**Responsabilidades**:
- Validar atividades por período
- Resetar atividades expiradas
- Calcular dias pendentes
- Gerenciar dados mensais

**Storage**: `STORAGE_KEY_QUANTUM_ACTIVITIES`, `STORAGE_KEY_QUANTUM_PENDING`

---

## 🗄️ Storage Keys

Todas centralizadas em `storage-keys.constants.ts`:

| Constante | Valor | Domínio |
|-----------|-------|---------|
| `STORAGE_KEY_DAILY_TASKS` | `'daily-tasks'` | Tarefas |
| `STORAGE_KEY_DAILY_PROGRESS` | `'daily-progress-history'` | Progresso |
| `STORAGE_KEY_QUANTUM_ACTIVITIES` | `'quantum-activities'` | Rituais |
| `STORAGE_KEY_QUANTUM_PENDING` | `'quantum-activities-pending'` | Pendências |

---

## ✨ Benefícios Alcançados

### 1. Manutenibilidade
- Lógica centralizada por domínio
- Fácil localizar e modificar código
- Documentação inline

### 2. Testabilidade
- Serviços isolados e mockáveis
- Componentes focados em apresentação
- Lógica de negócio separada

### 3. Escalabilidade
- Fácil adicionar novos domínios
- Padrão consistente
- Baixo acoplamento

### 4. Type Safety
- TypeScript em toda cadeia
- Interfaces bem definidas
- Validação em compile-time

### 5. Reutilização
- Serviços compartilháveis
- Constantes centralizadas
- Utilitários puros

### 6. Performance
- Dados carregados uma vez
- Signals para reatividade
- Lazy loading de features

---

## 🎨 Padrões de Código

### Componente
```typescript
@Component({...})
export class MyComponent {
  private readonly myService = inject(MyDomainService);
  readonly data = signal<Data[]>([]);

  constructor() {
    this.data.set(this.myService.load());
  }
}
```

### Serviço de Domínio
```typescript
@Injectable({ providedIn: 'root' })
export class MyDomainService {
  private readonly storage = inject(StorageService);
  private readonly STORAGE_KEY = STORAGE_KEY_MY_DOMAIN;

  load(): Data[] {
    return this.storage.getItem<Data[]>(this.STORAGE_KEY) || [];
  }

  save(data: Data[]): void {
    this.storage.setItem(this.STORAGE_KEY, data);
  }
}
```

### Constantes
```typescript
export const MY_DATA: readonly MyType[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
] as const;
```

---

## 📚 Documentação

- ✅ `/core/services/README.md` - Arquitetura de serviços
- ✅ `/data/constants/README.md` - Camada de dados
- ✅ `/data/constants/STORAGE_KEYS_README.md` - Chaves de storage
- ✅ `ARCHITECTURE.md` - Este documento

---

## 🚀 Próximos Passos (Opcional)

- [ ] Adicionar testes unitários para serviços
- [ ] Implementar interceptors para logging
- [ ] Adicionar validação de schemas
- [ ] Criar facade para operações complexas
- [ ] Implementar cache strategy
- [ ] Adicionar error boundaries

---

## 📈 Comparação Antes/Depois

### Antes
```typescript
// Componente com 290 linhas
export class MyComponent {
  // localStorage direto
  private loadData() {
    const stored = localStorage.getItem('my-key');
    // 50 linhas de lógica...
  }
  
  // Lógica de negócio misturada
  private processData() {
    // 100 linhas...
  }
}
```

### Depois
```typescript
// Componente com 65 linhas
export class MyComponent {
  private readonly service = inject(MyDomainService);
  readonly data = signal<Data[]>([]);

  constructor() {
    this.data.set(this.service.load());
  }
}

// Serviço com 90 linhas
@Injectable({ providedIn: 'root' })
export class MyDomainService {
  // Toda lógica encapsulada
}
```

---

## ✅ Checklist de Qualidade

- [x] SOLID principles aplicados
- [x] DRY (Don't Repeat Yourself)
- [x] KISS (Keep It Simple, Stupid)
- [x] YAGNI (You Aren't Gonna Need It)
- [x] Separation of Concerns
- [x] Single Source of Truth
- [x] Type Safety completo
- [x] Documentação inline
- [x] Código limpo e legível
- [x] Baixo acoplamento
- [x] Alta coesão
- [x] Testável

---

**Estado**: ✅ Clean Architecture Completa  
**Data**: 2025-10-12  
**Versão**: 2.0  
**Arquitetura**: Domain-Driven Services
