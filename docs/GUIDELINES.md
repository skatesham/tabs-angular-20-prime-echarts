# ManaVitae — Angular Clean Architecture Guide

> **Guia prático** baseado na arquitetura real implementada no projeto.

## 📋 Índice

| Seção | Descrição |
|-------|-----------|
| [🎯 Objetivo](#-objetivo) | Visão geral |
| [🏛️ Princípios](#️-princípios) | Fundamentos |
| [📁 Estrutura](#-estrutura-de-pastas) | Organização |
| [⚡ Componentes](#-componentes--estado) | Signals & Reatividade |
| [🎨 Templates](#-regras-de-template-html) | HTML & UI |
| [📚 Serviços](#-serviços--lógica-de-negócio) | Domain Services |
| [📊 Dados](#-dados--constantes) | Camada de dados |
| [✅ Checklist](#-checklist-de-pr) | Code Review |

---

## 🎯 Objetivo

Arquitetura **Domain-Driven** com **Clean Code**, usando:
- ✅ **Angular 20**: Standalone, Signals, Control Flow
- ✅ **PrimeNG**: Componentes UI enterprise
- ✅ **Tailwind**: Layout, spacing, dark mode
- ✅ **TypeScript**: Type safety completo

### Resultados Alcançados
- **~400 linhas** de código duplicado eliminadas
- **59-65%** de redução nos componentes
- **4 serviços** de domínio bem definidos
- **Type safety** em toda cadeia

---

## 🏛️ Princípios

### 1. Domain-Driven Design
Cada domínio possui seu próprio serviço:
- `DailyTasksService` → Tarefas diárias
- `DailyProgressService` → Histórico de progresso
- `QuantumActivitiesService` → Rituais quânticos
- `MissionVisionValuesService` → Missão/Visão/Valores

### 2. Clean Architecture
```
Component → Domain Service → Infrastructure Service → Storage
```

### 3. Imutabilidade
- `readonly` em constantes
- `as const` para type safety
- Dados estáticos não modificáveis

### 4. Simplicidade
- Componentes pequenos (≤ 100 linhas)
- Templates curtos (≤ 60 linhas)
- Um arquivo, uma responsabilidade

---

## 📁 Estrutura de Pastas

### Arquitetura Real do Projeto

```
src/app/
├── core/                    # 🏛️ Infraestrutura & Domain Services
│   └── services/
│       ├── storage.service.ts              # Infraestrutura: localStorage
│       ├── daily-tasks.service.ts          # Domínio: Tarefas
│       ├── daily-progress.service.ts       # Domínio: Progresso
│       ├── quantum-activities.service.ts   # Domínio: Rituais
│       └── mission-vision-values.service.ts # Domínio: MVV
│
├── config/                  # ⚙️ Configurações
│   ├── rituals.ts           # Constantes de rituais
│   └── storage.ts           # Storage keys
│
├── shared/                  # 🧩 Compartilhado
│   ├── ui/                  # Componentes apresentacionais (dumb)
│   │   ├── daily-tasks/
│   │   ├── daily-progress-chart/
│   │   ├── quantum-activities/
│   │   ├── welcome-card/
│   │   └── mission-vision-values/
│   └── utils/
│       └── date.utils.ts    # Utilitários puros
│
└── features/                # 🎯 Features (se necessário)
    └── <feature>/
        ├── pages/
        ├── components/
        └── services/
```

### Responsabilidades por Camada

| Camada | Propósito | Exemplo |
|--------|-----------|----------|
| `core/services` | Infraestrutura + Domain Services | `StorageService`, `DailyTasksService` |
| `config/` | Constantes e configurações | `DAILY_TASKS_BY_WEEKDAY`, `STORAGE_KEY_*` |
| `shared/ui` | Componentes dumb (sem domínio) | `<p-daily-tasks>`, `<p-welcome-card>` |
| `shared/utils` | Funções utilitárias puras | `DateUtils.formatDate()` |
| `features/` | Features complexas (quando necessário) | Páginas, componentes específicos |

---

## 🏷️ Naming & Selectors

### Componentes
- **Shared UI**: `p-<nome>` → `<p-daily-tasks>`, `<p-welcome-card>`
- **Feature**: `f-<feature>-<nome>` → `<f-auth-login-form>`

### Arquivos
```
daily-tasks.component.ts|html|css    # Componente
daily-tasks.service.ts               # Serviço
storage.service.ts                   # Infraestrutura
date.utils.ts                        # Utilitários
rituals.ts                           # Constantes
storage.ts                           # Config
```

### Exemplos Reais do Projeto
- ✅ `DailyTasksService` → Serviço de domínio
- ✅ `StorageService` → Infraestrutura
- ✅ `DateUtils` → Utilitários estáticos
- ✅ `DAILY_TASKS_BY_WEEKDAY` → Constante readonly

---

## ⚡ Componentes & Estado

* **Sempre `inject()`** (componentes/serviços/guards/interceptors).
* **Signals**: Use `signal()` **apenas** para estado mutável/reativo.
* **Getters**: Prefira `get` para valores derivados simples ao invés de `computed()`.
* **Regra prática**:
  - Estado que muda → `signal()`
  - Valor derivado simples → `get`
  - Múltiplas dependências complexas ou memoização pesada → `computed()` (raramente)
* **No template**: Getters sem parênteses `{{ value }}`, signals com parênteses `{{ signal() }}`.
* Streams ↔ signals: `toSignal()/toObservable()`; evitar `async` pipe em caminhos quentes.
* `takeUntilDestroyed(inject(DestroyRef))` para descartar subscrições.
* `changeDetection: OnPush` (com zone ou zoneless).

---

## 🎨 Regras de Template (HTML)

* Controle de fluxo: **`@for`** e **`@if`**; **sempre `track`** no `@for`.
* **Tamanho**: Template **≤ 60 linhas** e **≤ 4 níveis** de aninhamento. Passou → **extraia**.
* **Bindings**: nada pesado no HTML — mover para getter no TS.
* **Classes**: prefira `class="..."` (Tailwind). Use `[ngClass]` apenas quando condicional.
* **A11y**: `aria-*`, `role` quando precisar, foco visível, labels.

**Exemplo curto**

```html
<h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
@for (item of items(); track item.id) {
  <p-listItem class="mb-2">
    <div class="flex items-center gap-2">
      <p-avatar [label]="item.initials"></p-avatar>
      <span class="truncate">{{ item.name }}</span>
    </div>
  </p-listItem>
}
@if (loading()) { <p-skeleton width="100%" height="2rem"></p-skeleton> }
```

---

## 7) PrimeNG (usar com parcimônia, mas com propósito)

* **Critério**:

  1. Cobriu 80%+? **Use**.
  2. Precisa wrapper? **Dumb e fino** (prop→prop, event→event), sem lógica de domínio.
* **Padrões**:

  * Forms: `p-inputText`, `p-dropdown`, `p-calendar`, `p-inputNumber`; validar no TS, erro curto.
  * Listas grandes: **`p-virtualScroller`** ou CDK Virtual Scroll.
  * Feedback: `p-skeleton`, `p-toast`, `p-message`.
* **Evitar**: overrides pesados. Prefira **tokens/vars** + utilitários Tailwind.

---

## 8) Tailwind (layout/dark/responsivo)

* **Layout**: `flex/grid`, `gap-*`, `p-*/m-*`.
* **Dark**: classe/atributo global (`class="dark"`) e `dark:*`.
* **Responsivo**: `sm/md/lg`, `container mx-auto`.

```html
<section class="grid gap-3 md:grid-cols-2">
  <p-card class="dark:bg-surface-800">
    <header class="mb-2 font-medium">{{ cardTitle }}</header>
    <ng-content/>
  </p-card>
</section>
```

---

## 📚 Serviços & Lógica de Negócio

### Anatomia de um Domain Service

```typescript
// ✅ Exemplo Real: DailyTasksService
@Injectable({ providedIn: 'root' })
export class DailyTasksService {
  // 1. Injeção de dependências
  private readonly storage = inject(StorageService);
  
  // 2. Constantes privadas
  private readonly STORAGE_KEY = STORAGE_KEY_DAILY_TASKS;
  private readonly TASKS_VERSION = 5;
  
  // 3. Métodos públicos (API do serviço)
  loadTasks(): Task[] {
    const today = this.formatDate(new Date());
    const data = this.storage.getItem<TasksData>(this.STORAGE_KEY);
    
    if (!data || data.version < this.TASKS_VERSION || data.date !== today) {
      return this.getDefaultTasks();
    }
    
    return data.tasks;
  }
  
  saveTasks(tasks: Task[]): void {
    const today = this.formatDate(new Date());
    const data: TasksData = { version: this.TASKS_VERSION, date: today, tasks };
    this.storage.setItem(this.STORAGE_KEY, data);
  }
  
  // 4. Métodos privados (lógica interna)
  private getDefaultTasks(): Task[] {
    const dayOfWeek = new Date().getDay();
    const taskTemplates = DAILY_TASKS_BY_WEEKDAY[dayOfWeek];
    return this.randomizeTasks(taskTemplates);
  }
}
```

### Camadas de Serviços

#### 🔹 Infraestrutura (`core/services`)
```typescript
// StorageService: Abstração do localStorage
@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  }
  
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* Silently fail */ }
  }
}
```

#### 🔸 Domínio (`core/services`)
```typescript
// Domain Services implementados:
- DailyTasksService        → Gerencia tarefas diárias
- DailyProgressService     → Histórico de progresso (30 dias)
- QuantumActivitiesService → Rituais quânticos mensais
- MissionVisionValuesService → Missão/Visão/Valores
```

### Quando Criar Serviço

| Situação | Ação |
|----------|------|
| Lógica > 30 linhas em componente | Extrair para serviço |
| Acesso a localStorage | Usar `StorageService` |
| Lógica de negócio de domínio | Criar Domain Service |
| Reutilização entre componentes | Centralizar em serviço |

---

## 📊 Dados & Constantes

### Camada de Configuração

```typescript
// config/storage.ts - Storage Keys
export const STORAGE_KEY_DAILY_TASKS = 'daily-tasks' as const;
export const STORAGE_KEY_DAILY_PROGRESS = 'daily-progress-history' as const;
export const STORAGE_KEY_QUANTUM_ACTIVITIES = 'quantum-activities' as const;

// config/rituals.ts - Dados Estáticos
export const DAILY_TASKS_BY_WEEKDAY: readonly string[][] = [
  // Domingo
  ['Meditar 10min', 'Revisar semana', 'Planejar próxima'],
  // Segunda
  ['Definir prioridades', 'Revisar metas', 'Exercício físico'],
  // ...
] as const;
```

### Regras de Imutabilidade

✅ **Sempre**:
- `readonly` em arrays e objetos
- `as const` para type safety
- Interfaces com `readonly` (exceto flags mutáveis)

❌ **Nunca**:
- Modificar constantes diretamente
- Usar `any` types
- DTOs/Mappers desnecessários

### Utilitários Puros

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

## 📝 Quando Criar Novos Arquivos

### Componentes
- **`shared/ui`**: Repetição de HTML OU template > 60 linhas
- **Exemplo**: `daily-tasks`, `welcome-card`, `quantum-activities`

### Serviços
- **`core/services`**: Lógica de negócio de domínio
- **Exemplo**: `DailyTasksService`, `DailyProgressService`

### Configurações
- **`config/`**: Constantes e storage keys
- **Exemplo**: `rituals.ts`, `storage.ts`

### Utilitários
- **`shared/utils`**: Funções puras reutilizáveis
- **Exemplo**: `date.utils.ts`

---

## 🔧 Critérios de Extração

Extraia componente/serviço se **qualquer**:

| Situação | Ação |
|----------|------|
| Template > 60 linhas | Extrair componente |
| Aninhamento > 4 níveis | Extrair componente |
| 3+ `@if` no mesmo container | Extrair componente |
| Estrutura repetida 2+ vezes | Extrair componente |
| Lógica > 30 linhas | Extrair serviço |
| Função usada 3+ vezes | Criar utilitário |

### Exemplos Reais do Projeto

**Antes da refatoração**:
- `DailyTasksComponent`: 158 linhas
- `WelcomeCardComponent`: 172 linhas
- `QuantumActivitiesComponent`: 244 linhas

**Depois da refatoração**:
- `DailyTasksComponent`: 65 linhas (↓ 59%)
- `WelcomeCardComponent`: 66 linhas (↓ 62%)
- `QuantumActivitiesComponent`: 85 linhas (↓ 65%)

**Como?**
- ✅ Lógica movida para Domain Services
- ✅ Constantes centralizadas em `config/`
- ✅ Utilitários extraídos para `DateUtils`

---

## ⚡ Performance & Escala

### Obrigatórios
- ✅ **Rotas lazy**: Todas as features
- ✅ **Signals**: Preferência sobre `async` pipe
- ✅ **Track**: Sempre em `@for`
- ✅ **OnPush**: Change detection
- ✅ **A11y**: WCAG 2.1 AA
- ✅ **Dark mode**: Implementado
- ✅ **Responsivo**: Mobile-first

### Otimizações
```typescript
// ✅ Virtual scroll para listas > 100 itens
<p-virtualScroller [value]="items()" [itemSize]="50">
  <ng-template let-item>
    <div>{{ item.name }}</div>
  </ng-template>
</p-virtualScroller>

// ✅ Lazy loading de rotas
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.page')
  }
];
```

---

## 📝 Clean Code

### Comentários

✅ **Quando comentar** (o *porquê*, não o *como*):
```typescript
// Verifica versão para forçar atualização quando schema muda
if (data.version < this.TASKS_VERSION) {
  return this.getDefaultTasks();
}

// Workaround: API retorna null ao invés de array vazio
const items = response.data ?? [];
```

❌ **Não comentar**:
```typescript
// ❌ Incrementa contador
counter++;

// ❌ Retorna lista de tarefas
loadTasks() { /* ... */ }
```

### Princípios SOLID

**S** - Single Responsibility: `DailyTasksService` apenas gerencia tarefas  
**O** - Open/Closed: Extensível via composição  
**L** - Liskov Substitution: Interfaces bem definidas  
**I** - Interface Segregation: Interfaces específicas  
**D** - Dependency Inversion: `inject(StorageService)`

---

## 💻 Exemplos Reais do Projeto

### 1. Componente Dumb (Shared UI)

```typescript
// shared/ui/daily-tasks/daily-tasks.component.ts
import { Component, inject, signal } from '@angular/core';
import { DailyTasksService, Task } from '@app/core/services';

@Component({
  selector: 'p-daily-tasks',
  standalone: true,
  templateUrl: './daily-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyTasksComponent {
  private readonly service = inject(DailyTasksService);
  
  readonly tasks = signal<Task[]>([]);
  
  get completedCount() {
    return this.tasks().filter(t => t.completed).length;
  }
  
  constructor() {
    this.tasks.set(this.service.loadTasks());
  }
  
  toggleTask(task: Task): void {
    const updated = this.tasks().map(t => 
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    this.tasks.set(updated);
    this.service.saveTasks(updated);
  }
}
```

### 2. Domain Service

```typescript
// core/services/daily-tasks.service.ts
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { DAILY_TASKS_BY_WEEKDAY } from '@app/config/rituals';
import { STORAGE_KEY_DAILY_TASKS } from '@app/config/storage';

@Injectable({ providedIn: 'root' })
export class DailyTasksService {
  private readonly storage = inject(StorageService);
  private readonly STORAGE_KEY = STORAGE_KEY_DAILY_TASKS;
  private readonly TASKS_VERSION = 5;
  
  loadTasks(): Task[] {
    const today = this.formatDate(new Date());
    const data = this.storage.getItem<TasksData>(this.STORAGE_KEY);
    
    // Valida versão e data
    if (!data || data.version < this.TASKS_VERSION || data.date !== today) {
      return this.getDefaultTasks();
    }
    
    return data.tasks;
  }
  
  saveTasks(tasks: Task[]): void {
    const today = this.formatDate(new Date());
    const data: TasksData = { 
      version: this.TASKS_VERSION, 
      date: today, 
      tasks 
    };
    this.storage.setItem(this.STORAGE_KEY, data);
  }
  
  private getDefaultTasks(): Task[] {
    const dayOfWeek = new Date().getDay();
    const taskTemplates = DAILY_TASKS_BY_WEEKDAY[dayOfWeek];
    return this.randomizeTasks(taskTemplates);
  }
}
```

### 3. Utilitário Puro

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
  
  static getGreeting(hour: number): string {
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }
}
```

---

## ✅ Checklist de PR

### 🏛️ Arquitetura
- [ ] Arquivo na camada correta (`core`/`config`/`shared`/`features`)
- [ ] Responsabilidade única e bem definida
- [ ] Dependências injetadas via `inject()`
- [ ] Sem lógica de domínio em `shared/ui`

### ⚡ Componentes
- [ ] `changeDetection: OnPush` obrigatório
- [ ] `signal()` apenas para estado mutável
- [ ] Getters para derivados simples, `computed()` raramente
- [ ] Template ≤60 linhas e ≤4 níveis
- [ ] `@for` sempre com `track`
- [ ] Selector correto (`p-` ou `f-<feature>-`)

### 📊 Dados & Tipos
- [ ] Constantes com `readonly` e `as const`
- [ ] Interfaces bem definidas, zero `any`
- [ ] Sem DTO/Mapper desnecessários
- [ ] Storage keys centralizadas em `config/storage.ts`

### 📚 Serviços
- [ ] Domain Services em `core/services`
- [ ] Infraestrutura separada (ex: `StorageService`)
- [ ] Versionamento de schemas quando necessário
- [ ] Métodos públicos documentados (se complexos)

### 🎨 UI & UX
- [ ] A11y: labels, aria-*, foco visível, teclado
- [ ] Dark mode funcional
- [ ] Responsivo (mobile-first)
- [ ] Loading states implementados
- [ ] Empty states implementados

### ⚡ Performance
- [ ] Rotas lazy loading
- [ ] Virtual scroll em listas > 100 itens
- [ ] Sem lógica pesada em templates
- [ ] Signals ao invés de `async` pipe em loops

### 📝 Clean Code
- [ ] Comentários apenas quando agregam contexto
- [ ] Nomes descritivos e consistentes
- [ ] Sem código morto ou console.logs
- [ ] Princípios SOLID respeitados

---

## 📚 Referências

### Documentação do Projeto
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura detalhada
- [CLEAN_CODE_SUMMARY.md](./CLEAN_CODE_SUMMARY.md) - Resumo de refatoração
- [DEPLOY.md](./DEPLOY.md) - Guia de deploy

### Princípios Aplicados
- **Clean Architecture** (Robert C. Martin)
- **Domain-Driven Design** (Eric Evans)
- **SOLID Principles**
- **Functional Programming** (Imutabilidade)

### Stack Tecnológica
- **Angular 20**: Standalone, Signals, Control Flow
- **PrimeNG**: Componentes UI enterprise
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety completo

---

**Versão**: 2.0  
**Última Atualização**: 2025-10-12  
**Arquitetura**: Domain-Driven Services + Clean Architecture  
**Projeto**: ManaVitae - Gestão de Rituais Diários