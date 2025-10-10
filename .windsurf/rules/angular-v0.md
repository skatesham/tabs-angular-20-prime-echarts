---
trigger: manual
---

# Angular 20 — Regras de Código, Estrutura e Padrões

## 1) Objetivo

Consistência, performance e baixo acoplamento com **standalone**, **signals** e **APIs funcionais**.

---

## 2) Convenções de Código

### 2.1 Injeção, estado e ciclo de vida

* **Sempre** `inject()` (componentes, serviços, guards, interceptors).
* Estado local com **`signal()`**, derivado com **`computed()`**, efeitos com **`effect()`**.
* Streams ↔ signals: `toSignal()`/`toObservable()`; **evitar** `async` pipe em caminhos quentes: consuma streams no `.ts` e exponha **signals** ao template.
* Descarte de subscrições: `takeUntilDestroyed(inject(DestroyRef))`.

### 2.2 Templates

* **Controle de fluxo**: usar **`@for`** e **`@if`**.

  * `@for (item of items; track item.id)` — **sempre** definir `track`.
* Nada de lógica pesada no template; mover p/ `computed()`.

### 2.3 Componentes (standalone)

* `changeDetection: OnPush` (em apps com zone ou zoneless).
* Inputs/Outputs com **APIs funcionais**:

  * `readonly value = input.required<string>();`
  * `readonly changed = output<number>();`
* **Selectors**:

  * UI compartilhada (design system): **`p-<kebab>`** (ex.: `<p-text-input>`).
  * Feature interna: **`f-<feature>-<kebab>`** (ex.: `<f-auth-login-form>`).
* **CSS**: Tailwind utilitário + tokens do tema; evitar `::ng-deep`.

### 2.4 Serviços

* `providedIn: 'root'` para cross-feature; senão declare no `providers` do **feature**.
* Serviços **são stateless**; estado global só em **stores de signal** dedicados.

### 2.5 Erros, logs e contratos

* Erros tipados (`AppError` | union) e **mapeados** no interceptor.
* Logs estruturados (context + correlation id).

---

## 3) Estrutura de Pastas (feature-first)

```
src/
 └─ app/
    ├─ core/                 # “singletons” e infraestrutura
    │   ├─ http/             # interceptors, client base, tokens
    │   ├─ auth/             # auth guard global, services centrais
    │   ├─ config/           # app.config.ts, tokens de env
    │   └─ layout/           # shell, navbar, footer (standalone)
    ├─ shared/               # design system e utilidades
    │   ├─ ui/               # <p-*> componentes puros (dumb)
    │   ├─ directives/
    │   ├─ pipes/
    │   └─ utils/            # helpers puros (ts)
    ├─ data/                 # tipagem e transformação de dados
    │   ├─ models/           # domínio (ex.: Attraction, User)
    │   ├─ dto/              # contratos de rede (ex.: UserDto)
    │   └─ mappers/          # dto <-> model
    ├─ api/                  # clientes HTTP gerados ou manuais
    │   └─ clients/          # ex.: user.client.ts (typed)
    ├─ state/                # stores de signal globais (opcional)
    ├─ features/
    │   └─ <feature>/
    │       ├─ pages/        # contêineres (rotas)
    │       ├─ components/   # componentes de feature (f-*)
    │       ├─ services/     # serviços da feature
    │       ├─ guards/       # guards da feature
    │       ├─ resolvers/
    │       ├─ <feature>.routes.ts
    │       └─ index.ts
    └─ app.routes.ts         # roteamento raiz (lazy p/ features)
```

**Responsabilidades-chave**

* **core/**: infraestrutura que existe **uma vez** (interceptors, auth global, config).
* **shared/**: peças reutilizáveis **sem** dependência de feature (atoms/molecules UI, pipes, directives).
* **data/**: **modelos de domínio** e **DTOs** separados + **mapeadores** (clareza e versão).
* **api/**: camada de **acesso remoto** (fetch/HttpClient tipado).
* **features/**: tudo que muda junto (páginas, componentes, serviços, guards **daquela feature**).
* **state/**: stores globais (são exceção, use com parcimônia).

---

## 4) Naming & Arquivos

| Tipo            | Nome de arquivo          | Classe/const           | Onde criar                             |                                        |
| --------------- | ------------------------ | ---------------------- | -------------------------------------- | -------------------------------------- |
| Componente UI   | `text-input.component.ts | html`                  | `TextInputComponent`                   | `shared/ui/` (selector `p-text-input`) |
| Componente feat | `login-form.component.*` | `LoginFormComponent`   | `features/auth/components/`            |                                        |
| Página (rota)   | `login.page.*`           | `LoginPage`            | `features/auth/pages/`                 |                                        |
| Serviço         | `user.service.ts`        | `UserService`          | `features/<x>/services/` ou `core/`    |                                        |
| Guard           | `auth.guard.ts`          | `authGuard` (fn)       | `features/<x>/guards/` ou `core/auth/` |                                        |
| Resolver        | `user.resolver.ts`       | `userResolver` (fn)    | `features/<x>/resolvers/`              |                                        |
| Interceptor     | `auth.interceptor.ts`    | `authInterceptor` (fn) | `core/http/`                           |                                        |
| Modelo          | `user.model.ts`          | `User` (readonly)      | `data/models/`                         |                                        |
| DTO             | `user.dto.ts`            | `UserDto`              | `data/dto/`                            |                                        |
| Mapper          | `user.mapper.ts`         | `toUser(dto)`          | `data/mappers/`                        |                                        |
| Client API      | `user.client.ts`         | `UserClient`           | `api/clients/`                         |                                        |
| Rotas           | `auth.routes.ts`         | `authRoutes`           | `features/auth/`                       |                                        |

**Regras de selector**

* UI compartilhada: **`p-<kebab>`** (ex.: `<p-text-input>`).
* Diretivas: **`[pDebounce]`**, pipes: **`pCurrency`** (arquivo `debounce.directive.ts`, `currency.pipe.ts`).
* Feature: **`f-<feature>-<kebab>`** apenas dentro da feature.

---

## 5) Quando criar o quê

* **Novo componente UI (`shared/ui`)**: quando for **apresentacional**, reutilizável e sem dependência de domínio (ex.: `<p-text-input>`).
* **Componente de feature**: quando for específico do caso de uso (ex.: `<f-auth-login-form>`).
* **Serviço de feature**: quando encapsula regra/IO **somente daquela feature**.
* **Serviço global (`core/`)**: autenticação, config, http base, telemetry.
* **Guard**: regra de navegação/autorização (feature → em `features/<x>/guards/`; global → `core/auth`).
* **Resolver**: precisa **pré-carregar** dados **antes** da página renderizar.
* **Modelo (`data/models`)**: toda entidade de domínio **persistente** ou **central** ao negócio.
* **DTO (`data/dto`)**: **espelha a API** (nunca usar DTO direto no template).
* **Mapper**: criou DTO **e** Model → registre um mapper claro.
* **Store global (`state/`)**: apenas para **estado transversal** (auth, user prefs). Dê preferência a **stores da feature** locais.

---

## 6) Performance & Escalabilidade (produção)

* **Lazy routes** em todas as features; componentes gigantes → **defer**/split interno se necessário.
* **Signals** no template (evitar `async` em listas grandes); sempre `track` no `@for`.
* **CDK Virtual Scroll** para listas longas; **PrimeNG** apenas onde simplifica (evitar wrappers redundantes).
* HTTP: **cache** (ETag/If-None-Match), **retry** com backoff apenas em idempotentes.
* Evitar `shareReplay({refCount:false, bufferSize:1})` sem `finalize()` (vazamentos).
* A11y e responsividade **obrigatórios**; **dark mode** por tema (Tailwind `data-theme`/classes).

---

## 7) Exemplos mínimos

**Componente UI (shared)**

```ts
// shared/ui/text-input/text-input.component.ts
import { Component, input, output, signal, computed } from '@angular/core';

@Component({
  selector: 'p-text-input',
  standalone: true,
  template: `
    <label [attr.for]="id()">{{ label() }}</label>
    <input [id]="id()" [value]="value()" (input)="onInput($any($event.target).value)" />
    @if (error()) { <small class="text-error">{{ error() }}</small> }
  `,
  changeDetection: 0, // OnPush
})
export class TextInputComponent {
  readonly id = input<string>('txt-' + Math.random().toString(36).slice(2));
  readonly label = input.required<string>();
  readonly value = input<string>('');
  readonly error = input<string>('');
  readonly changed = output<string>();

  onInput(v: string) { this.changed.emit(v); }
}
```

**Página de feature (signals + @for/@if)**

```ts
// features/users/pages/list/users.page.ts
import { Component, inject, signal, computed, effect } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { takeUntilDestroyed, DestroyRef } from '@angular/core/rxjs-interop';

@Component({
  selector: 'f-users-page',
  standalone: true,
  template: `
    <h1>Users</h1>
    @if (loading()) { <p>Loading…</p> }
    @for (u of users(); track u.id) { <div>{{ u.name }}</div> }
  `,
  changeDetection: 0,
})
export default class UsersPage {
  private readonly svc = inject(UsersService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly users = signal<{id:number;name:string}[]>([]);

  constructor() {
    this.svc.list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: xs => { this.users.set(xs); this.loading.set(false); },
        error: _ => { this.loading.set(false); }
      });
  }
}
```

---

## 8) PR Checklist (Angular 20)

* [ ] `inject()` em vez de construtor, `signal()/computed()/effect()` onde couber.
* [ ] `@for` com `track`, `@if` sem lógica pesada.
* [ ] Selector correto (`p-` UI, `f-<feature>-` para feature).
* [ ] DTO≠Model (+ mapper).
* [ ] Rotas lazy e arquivos no **lugar certo** (ver tabela).
* [ ] A11y + responsivo + dark mode.
* [ ] Tests: component dumb (render), service (regra), guard/resolver (feliz+erro).
* [ ] Tamanho OK (≤ 60 linhas) ou extraído em subcomponentes.
* [ ] PrimeNG usado sem “overrides” desnecessários; Tailwind só para layout/spacing.
* [ ] A11y: labels, foco, leitura por teclado.
* [ ] Comentário 1-linha em métodos principais (se necessário).

