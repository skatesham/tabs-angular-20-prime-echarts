---
trigger: model_decision
---

# Angular Clean Architecture — Guia Polimórfico

> **Arquitetura escalável**: Do MVP ao Enterprise mantendo qualidade e simplicidade.

## 📋 Índice Rápido

| Seção | Descrição | Para quem? |
|-------|-----------|------------|
| [🎯 Filosofia](#-filosofia) | Princípios universais | Todos |
| [📁 Arquitetura](#-arquitetura-em-camadas) | Estrutura de pastas | Todos |
| [🏗️ Padrões de Escala](#️-padrões-de-escala) | Quando criar arquivos | Todos |
| [⚡ Componentes](#-componentes--reatividade) | Signals, getters, computed | Desenvolvedores |
| [🎨 Templates](#-templates--ui) | HTML, controle de fluxo | Desenvolvedores |
| [📚 Serviços](#-serviços--lógica-de-negócio) | Lógica de negócio | Desenvolvedores |
| [📊 Dados](#-dados--constantes) | Constantes e modelos | Desenvolvedores |
| [✅ Checklist](#-checklist-de-qualidade) | Code review | Revisores |
| [🎓 Guia Rápido](#-guia-de-decisão-rápida) | Decisões comuns | Todos |

---

## 🎯 Filosofia

**Código que cresce sem apodrecer**: Arquitetura que se adapta ao tamanho do projeto sem reescrita.

### Princípios Universais

1. **Simplicidade Progressiva**: Comece simples, complexifique apenas quando necessário
2. **Separação Clara**: Cada camada tem um propósito único e bem definido
3. **Type Safety First**: TypeScript em toda cadeia, zero `any`
4. **Imutabilidade**: Dados são `readonly`, mutações são explícitas
5. **Testabilidade**: Arquitetura permite mock e teste isolado

### Por que este guia?

✅ **Polimórfico**: Funciona para projetos pequenos, médios e grandes  
✅ **Pragmático**: Baseado em código real, não teoria  
✅ **Evolutivo**: Cresce com seu projeto sem refatoração massiva  
✅ **Comprovado**: Aplicado com sucesso em produção

---

## 📁 Arquitetura em Camadas

### Estrutura Polimórfica

```
src/app/
├── core/                    # 🏛️ Infraestrutura (Singleton)
│   ├── services/            # Storage, HTTP, Auth, Config
│   ├── interceptors/        # HTTP interceptors
│   ├── guards/              # Guards globais
│   └── layout/              # Layout principal
│
├── data/                    # 📊 Camada de Dados (Imutável)
│   ├── constants/           # Dados estáticos (readonly)
│   ├── models/              # Interfaces de domínio
│   └── config/              # Configurações (storage keys, etc)
│
├── shared/                  # 🧩 Compartilhado
│   ├── ui/                  # Componentes apresentacionais (dumb)
│   ├── directives/          # Diretivas reutilizáveis
│   ├── pipes/               # Pipes customizados
│   └── utils/               # Funções utilitárias puras
│
├── features/                # 🎯 Features (Domain-Driven)
│   └── <feature>/
│       ├── pages/           # Rotas (smart components)
│       ├── components/      # Componentes internos
│       ├── services/        # Lógica de negócio do domínio
│       ├── guards/          # Guards específicos
│       ├── resolvers/       # Data resolvers
│       ├── <feature>.routes.ts
│       └── index.ts         # Barrel export
│
└── state/                   # 🔄 Estado Global (Exceção)
    └── stores/              # Apenas para estado transversal
```

### Responsabilidades por Camada

| Camada | Propósito | Regra de Ouro |
|--------|-----------|---------------|
| `core/` | Infraestrutura singleton | Apenas serviços técnicos, sem domínio |
| `data/` | Dados e modelos | Imutável, sem lógica |
| `shared/` | UI e utils | Sem conhecimento de domínio |
| `features/` | Domínio de negócio | Tudo que muda junto fica junto |
| `state/` | Estado global | Use apenas se realmente transversal |

---

## 🏗️ Padrões de Escala

### Quando Criar Cada Tipo de Arquivo

#### 🔹 Pequeno (MVP/Protótipo)
- **Services**: Apenas quando lógica > 30 linhas ou reutilizada
- **Components**: Extrair se template > 60 linhas OU > 4 níveis
- **Constants**: Centralizar se array usado 2+ vezes
- **Utils**: Criar se função usada 3+ vezes

#### 🔸 Médio (Produto)
- **Services**: Um por domínio (DailyTasksService, UserService)
- **Components**: Separar smart (pages) de dumb (components)
- **Constants**: Camada `/data` com barrel exports
- **Utils**: Classe estática por categoria (DateUtils, StringUtils)

#### 🔶 Grande (Enterprise)
- **Services**: Separar em Application/Domain/Infrastructure
- **Components**: Atomic Design (atoms/molecules/organisms)
- **Constants**: Versionamento e schemas de validação
- **Utils**: Biblioteca interna com testes unitários

---

## 🎨 Convenções de Nomenclatura

### Selectors
- **Shared UI**: `p-<nome>` → `<p-text-input>`
- **Feature**: `f-<feature>-<nome>` → `<f-auth-login-form>`
- **Diretivas**: `[p<Nome>]` → `[pDebounce]`
- **Pipes**: `p<Nome>` → `pCurrency`

### Arquivos
```
text-input.component.ts|html|css    # Componente
login.page.ts|html                  # Página (rota)
user.service.ts                     # Serviço
auth.guard.ts                       # Guard
user.model.ts                       # Interface
storage.constants.ts                # Constantes
date.utils.ts                       # Utilitários
```

---

## ⚡ Componentes & Reatividade

### Estado e Signals (Angular 20)

```typescript
// ✅ CORRETO: Injeção funcional
private readonly myService = inject(MyService);

// ✅ Signal para estado mutável
readonly tasks = signal<Task[]>([]);

// ✅ Getter para valor derivado simples
get completedCount() {
  return this.tasks().filter(t => t.done).length;
}

// ✅ Computed apenas para cálculos complexos
readonly stats = computed(() => {
  const tasks = this.tasks();
  return {
    total: tasks.length,
    done: tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    percentage: tasks.length > 0 ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0
  };
});
```

### Regras de Reatividade

| Caso | Use | Template |
|------|-----|----------|
| Estado mutável | `signal()` | `{{ tasks() }}` |
| Derivado simples | `get` | `{{ completedCount }}` |
| Derivado complexo | `computed()` | `{{ stats().percentage }}` |
| Stream RxJS | `toSignal()` | `{{ data() }}` |

### Boas Práticas
- ✅ `inject()` sempre (componentes/serviços/guards)
- ✅ `changeDetection: OnPush` obrigatório
- ✅ `takeUntilDestroyed()` para subscriptions
- ❌ Evitar `async` pipe em loops
- ❌ Nunca `computed()` se `get` resolve

---

## 🎨 Templates & UI

### Regras de Ouro

1. **Tamanho Máximo**: ≤60 linhas E ≤4 níveis de aninhamento
2. **Controle de Fluxo**: `@if` e `@for` (sempre com `track`)
3. **Lógica Zero**: Mover cálculos para getters no TS
4. **A11y Obrigatório**: labels, aria-*, foco visível, navegação por teclado

### Exemplo Completo

```html
<!-- ✅ Cabeçalho semântico -->
<header class="flex items-center justify-between mb-4">
  <h2 class="text-xl font-semibold">{{ title }}</h2>
  <span class="text-sm text-muted">{{ completedCount }}/{{ totalCount }}</span>
</header>

<!-- ✅ Loading state -->
@if (loading()) {
  <p-skeleton width="100%" height="2rem" />
}

<!-- ✅ Lista com track obrigatório -->
@for (item of items(); track item.id) {
  <article class="flex items-center gap-2 p-2 hover:bg-surface-100">
    <p-avatar [label]="item.initials" />
    <span class="truncate">{{ item.name }}</span>
  </article>
}

<!-- ✅ Empty state -->
@if (!loading() && items().length === 0) {
  <p class="text-center text-muted py-8">Nenhum item encontrado</p>
}
```

### Critérios de Extração

Extraia componente se **qualquer**:
- Template > 60 linhas
- Aninhamento > 4 níveis
- 3+ `@if` no mesmo container
- Estrutura repetida 2+ vezes
- Necessidade de reuso

---

## 🎨 PrimeNG + Tailwind

### Estratégia de UI

**PrimeNG**: Componentes complexos (80%+ do caso de uso)  
**Tailwind**: Layout, spacing, dark mode, responsivo

### PrimeNG - Quando Usar

✅ **Use direto**:
- Forms: `p-inputText`, `p-dropdown`, `p-calendar`
- Feedback: `p-skeleton`, `p-toast`, `p-message`
- Dados: `p-table`, `p-virtualScroller`

⚠️ **Wrapper fino** (se necessário):
```typescript
// ✅ Dumb wrapper: apenas prop→prop, event→event
@Component({
  selector: 'p-custom-input',
  template: `<p-inputText [value]="value()" (input)="changed.emit($event)" />`
})
export class CustomInputComponent {
  readonly value = input<string>('');
  readonly changed = output<string>();
}
```

❌ **Evitar**: Overrides CSS pesados, lógica de domínio em wrappers

### Tailwind - Padrões

```html
<!-- Layout responsivo -->
<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <p-card class="dark:bg-surface-800">
    <header class="mb-2 font-medium">{{ title }}</header>
    <ng-content />
  </p-card>
</section>

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <!-- Conteúdo -->
</div>
```

---

## 📚 Serviços & Lógica de Negócio

### Anatomia de um Serviço de Domínio

```typescript
// ✅ Exemplo: DailyProgressService
@Injectable({ providedIn: 'root' })
export class DailyProgressService {
  // 1. Injeção de dependências
  private readonly storage = inject(StorageService);
  
  // 2. Constantes privadas
  private readonly STORAGE_KEY = STORAGE_KEY_DAILY_PROGRESS;
  private readonly MAX_DAYS = 30;
  
  // 3. Métodos públicos (API do serviço)
  getHistory(): DailyProgress[] {
    return this.storage.getItem<DailyProgress[]>(this.STORAGE_KEY) || [];
  }
  
  saveHistory(history: DailyProgress[]): void {
    this.storage.setItem(this.STORAGE_KEY, history);
  }
  
  updateTodayProgress(completed: number, total: number): void {
    const today = DateUtils.formatDate(new Date());
    const history = this.getHistory();
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const todayIndex = history.findIndex(d => d.date === today);
    const progressData: DailyProgress = { date: today, completed, total, percentage };
    
    if (todayIndex >= 0) {
      history[todayIndex] = progressData;
    } else {
      history.push(progressData);
      if (history.length > this.MAX_DAYS) history.shift();
    }
    
    this.saveHistory(history);
  }
}
```

### Camadas de Serviços

#### 🔹 Infraestrutura (`core/services`)
```typescript
// StorageService: Abstração do localStorage
getItem<T>(key: string): T | null
setItem<T>(key: string, value: T): void
```

#### 🔸 Domínio (`features/.../services`)
```typescript
// DailyTasksService: Lógica de negócio
loadTasks(): Task[]
saveTasks(tasks: Task[]): void
randomizeTasks(dayIndex: number): Task[]
```

### Quando Criar Serviço

| Tamanho | Critério |
|---------|----------|
| Pequeno | Lógica > 30 linhas OU reutilizada 2+ vezes |
| Médio | Um serviço por domínio |
| Grande | Separar Application/Domain/Infrastructure |

---

## 📊 Dados & Constantes

### Camada de Dados Imutável

```typescript
// data/constants/week-days.constants.ts
export interface WeekDay {
  readonly id: number;
  readonly name: string;
  readonly theme: string;
}

export const WEEK_DAYS: readonly WeekDay[] = [
  { id: 0, name: 'Domingo', theme: 'Descanso' },
  { id: 1, name: 'Segunda', theme: 'Planejamento' },
  // ...
] as const;

// data/config/storage.constants.ts
export const STORAGE_KEY_DAILY_TASKS = 'daily-tasks' as const;
export const STORAGE_KEY_DAILY_PROGRESS = 'daily-progress-history' as const;

// data/models/task.model.ts
export interface Task {
  readonly id: string;
  readonly title: string;
  done: boolean;  // única propriedade mutável
}
```

### Regras de Imutabilidade

✅ **Sempre**:
- `readonly` em arrays e objetos de constantes
- `as const` para type safety
- Interfaces com `readonly` (exceto flags mutáveis)

❌ **Nunca**:
- Modificar constantes diretamente
- Usar `any` types
- DTOs/Mappers desnecessários

### Barrel Exports

```typescript
// data/constants/index.ts
export * from './week-days.constants';
export * from './daily-tasks.constants';
export * from './quantum-messages.constants';

// Uso:
import { WEEK_DAYS, DAILY_TASKS } from '@app/data/constants';
```

---

## ⚡ Performance & Otimização

### Checklist de Performance

✅ **Rotas**:
```typescript
// app.routes.ts - Lazy loading obrigatório
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard.page')
  }
];
```

✅ **Templates**:
- Sempre `track` no `@for`
- `OnPush` change detection
- Signals ao invés de `async` pipe em loops

✅ **Listas Grandes**:
```html
<!-- > 100 itens: Virtual Scroll -->
<p-virtualScroller [value]="items()" [itemSize]="50">
  <ng-template let-item>
    <div>{{ item.name }}</div>
  </ng-template>
</p-virtualScroller>
```

✅ **HTTP**:
- Cache com ETag/If-None-Match
- Retry com backoff (apenas idempotentes)
- Interceptors para loading/error global

### Obrigatórios
- ✅ A11y (WCAG 2.1 AA)
- ✅ Dark mode
- ✅ Responsivo (mobile-first)
- ✅ Loading states
- ✅ Error boundaries

---

## 📝 Clean Code

### Comentários

✅ **Quando comentar** (o *porquê*, não o *como*):
```typescript
// Recalcula paginação local após filtros remotos aplicados
refreshPage() { /* ... */ }

// Workaround: API retorna null ao invés de array vazio (bug #1234)
const items = response.data ?? [];
```

❌ **Não comentar**:
```typescript
// ❌ Incrementa contador
counter++;

// ❌ Retorna lista de usuários
getUsers() { /* ... */ }
```

### Princípios SOLID

**S** - Single Responsibility: Um arquivo, uma responsabilidade  
**O** - Open/Closed: Extensível via composição, não modificação  
**L** - Liskov Substitution: Interfaces bem definidas  
**I** - Interface Segregation: Interfaces específicas, não genéricas  
**D** - Dependency Inversion: Dependa de abstrações (inject)

### Outros Princípios

- **DRY**: Não repita código (extraia funções/serviços)
- **KISS**: Mantenha simples (evite over-engineering)
- **YAGNI**: Não implemente antes de precisar

---

## 💻 Exemplos Completos

### 1. Componente Dumb (Shared UI)

```typescript
// shared/ui/task-item/task-item.component.ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Task } from '@app/data/models';

@Component({
  selector: 'p-task-item',
  standalone: true,
  template: `
    <article class="flex items-center gap-2 p-2 hover:bg-surface-100">
      <p-checkbox 
        [checked]="task().done" 
        (onChange)="toggled.emit(task())" 
      />
      <span [class.line-through]="task().done">{{ task().title }}</span>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  readonly task = input.required<Task>();
  readonly toggled = output<Task>();
}
```

### 2. Componente Smart (Feature Page)

```typescript
// features/tasks/pages/list/tasks.page.ts
import { Component, inject, signal } from '@angular/core';
import { DailyTasksService } from '@app/core/services';
import { Task } from '@app/data/models';
import { TaskItemComponent } from '@app/shared/ui';

@Component({
  selector: 'f-tasks-page',
  standalone: true,
  imports: [TaskItemComponent],
  template: `
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Tarefas Diárias</h1>
      <p class="text-muted">{{ completedCount }}/{{ tasks().length }} concluídas</p>
    </header>
    
    @if (loading()) {
      <p-skeleton height="3rem" />
    } @else {
      @for (task of tasks(); track task.id) {
        <p-task-item [task]="task" (toggled)="toggleTask($event)" />
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksPage {
  private readonly service = inject(DailyTasksService);
  
  readonly loading = signal(true);
  readonly tasks = signal<Task[]>([]);
  
  get completedCount() {
    return this.tasks().filter(t => t.done).length;
  }
  
  constructor() {
    this.loadTasks();
  }
  
  private loadTasks(): void {
    this.tasks.set(this.service.loadTasks());
    this.loading.set(false);
  }
  
  toggleTask(task: Task): void {
    const updated = this.tasks().map(t => 
      t.id === task.id ? { ...t, done: !t.done } : t
    );
    this.tasks.set(updated);
    this.service.saveTasks(updated);
  }
}
```

### 3. Serviço de Domínio

```typescript
// core/services/daily-tasks.service.ts
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEY_DAILY_TASKS } from '@app/data/config';
import { Task } from '@app/data/models';

@Injectable({ providedIn: 'root' })
export class DailyTasksService {
  private readonly storage = inject(StorageService);
  
  loadTasks(): Task[] {
    return this.storage.getItem<Task[]>(STORAGE_KEY_DAILY_TASKS) || [];
  }
  
  saveTasks(tasks: Task[]): void {
    this.storage.setItem(STORAGE_KEY_DAILY_TASKS, tasks);
  }
}
```

### 4. Utilitário Puro

```typescript
// shared/utils/date.utils.ts
export class DateUtils {
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
```

---

## ✅ Checklist de Qualidade

### 🔍 Code Review

#### Arquitetura
- [ ] Arquivo na camada correta (`core`/`data`/`shared`/`features`)
- [ ] Responsabilidade única e bem definida
- [ ] Dependências injetadas via `inject()`
- [ ] Sem lógica de domínio em `shared/ui`

#### Componentes
- [ ] `changeDetection: OnPush` obrigatório
- [ ] `signal()` apenas para estado mutável
- [ ] Getters para derivados simples, `computed()` raramente
- [ ] Template ≤60 linhas e ≤4 níveis
- [ ] `@for` sempre com `track`
- [ ] Selector correto (`p-` ou `f-<feature>-`)

#### Dados & Tipos
- [ ] Constantes com `readonly` e `as const`
- [ ] Interfaces bem definidas, zero `any`
- [ ] Sem DTO/Mapper desnecessários
- [ ] Storage keys centralizadas

#### UI & UX
- [ ] A11y: labels, aria-*, foco visível, teclado
- [ ] Dark mode funcional
- [ ] Responsivo (mobile-first)
- [ ] Loading states implementados
- [ ] Empty states implementados

#### Performance
- [ ] Rotas lazy loading
- [ ] Virtual scroll em listas > 100 itens
- [ ] Sem lógica pesada em templates
- [ ] HTTP com cache/retry quando apropriado

#### Clean Code
- [ ] Comentários apenas quando agregam contexto
- [ ] Nomes descritivos e consistentes
- [ ] Sem código morto ou console.logs
- [ ] Princípios SOLID respeitados

---

## 🎓 Guia de Decisão Rápida

### Onde colocar meu código?

```
┌─────────────────────────────────────────────────────────┐
│ É infraestrutura técnica (HTTP, Storage, Auth)?         │
│ → core/services/                                        │
├─────────────────────────────────────────────────────────┤
│ É dado estático ou configuração?                        │
│ → data/constants/ ou data/config/                       │
├─────────────────────────────────────────────────────────┤
│ É interface/modelo de domínio?                          │
│ → data/models/                                          │
├─────────────────────────────────────────────────────────┤
│ É componente apresentacional sem domínio?               │
│ → shared/ui/                                            │
├─────────────────────────────────────────────────────────┤
│ É função utilitária pura?                               │
│ → shared/utils/                                         │
├─────────────────────────────────────────────────────────┤
│ É lógica de negócio de uma feature?                     │
│ → features/<feature>/services/                          │
├─────────────────────────────────────────────────────────┤
│ É página (rota) de uma feature?                         │
│ → features/<feature>/pages/                             │
├─────────────────────────────────────────────────────────┤
│ É componente interno de uma feature?                    │
│ → features/<feature>/components/                        │
└─────────────────────────────────────────────────────────┘
```

### Quando extrair?

| Situação | Ação |
|----------|------|
| Lógica > 30 linhas em componente | Extrair para serviço |
| Template > 60 linhas | Extrair componente |
| Aninhamento > 4 níveis | Extrair componente |
| Array usado 2+ vezes | Mover para constantes |
| Função usada 3+ vezes | Criar utilitário |
| 3+ `@if` no mesmo container | Extrair componente |

### Signal, Getter ou Computed?

```typescript
// ✅ Signal: Estado mutável
readonly count = signal(0);

// ✅ Getter: Derivado simples (1 operação)
get doubled() { return this.count() * 2; }

// ✅ Computed: Derivado complexo (múltiplas operações)
readonly stats = computed(() => {
  const items = this.items();
  return {
    total: items.length,
    completed: items.filter(i => i.done).length,
    percentage: /* cálculo complexo */
  };
});
```

---

## 📐 Métricas de Qualidade

### Limites Recomendados

| Métrica | Pequeno | Médio | Grande |
|---------|---------|-------|--------|
| Linhas/Componente | < 100 | < 200 | < 300 |
| Linhas/Serviço | < 150 | < 300 | < 500 |
| Linhas/Template | < 60 | < 60 | < 60 |
| Níveis/Template | ≤ 4 | ≤ 4 | ≤ 4 |
| Métodos/Classe | < 10 | < 15 | < 20 |
| Parâmetros/Método | ≤ 3 | ≤ 4 | ≤ 5 |

### Sinais de Alerta 🚨

- Arquivo > 500 linhas → Quebrar em módulos
- Método > 50 linhas → Extrair funções privadas
- Complexidade ciclomática > 10 → Simplificar lógica
- Imports > 20 → Revisar dependências
- Duplicação > 3 vezes → Extrair e reutilizar

---

## 🚀 Evolução da Arquitetura

### Fase 1: MVP (1-3 meses)
- Estrutura básica de pastas
- Serviços apenas quando necessário
- Componentes inline quando < 60 linhas
- Constantes inline se usadas 1x

### Fase 2: Produto (3-12 meses)
- Camada `/data` completa
- Um serviço por domínio
- Separação smart/dumb components
- Utils organizados por categoria

### Fase 3: Escala (12+ meses)
- Separação Application/Domain/Infrastructure
- Atomic Design (atoms/molecules/organisms)
- Biblioteca interna de componentes
- Testes automatizados completos

---

## 📖 Referências

### Princípios Aplicados
- **Clean Architecture** (Robert C. Martin)
- **Domain-Driven Design** (Eric Evans)
- **SOLID Principles**
- **Functional Programming** (Imutabilidade, Pureza)

### Stack Tecnológica
- **Angular 20**: Standalone, Signals, Control Flow
- **PrimeNG**: Componentes UI enterprise
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety completo

---

**Versão**: 2.0  
**Última Atualização**: 2025-10-12  
**Arquitetura**: Domain-Driven Services + Clean Architecture  
**Filosofia**: Simplicidade Progressiva → Qualidade Escalável