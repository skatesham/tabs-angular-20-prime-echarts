---
trigger: always_on
---

showtime — juntei tudo num guia único, direto ao ponto e sem repetições desnecessárias. Aqui vai a versão consolidada:

# Angular 20 + PrimeNG + Tailwind — Guia Único

## 1) Objetivo

Consistência, performance e baixo acoplamento usando **standalone**, **signals**, **APIs funcionais** e **PrimeNG** com **Tailwind** só para layout/spacing/responsivo.

---

## 2) Princípios

* **Simplicidade primeiro**: menos linhas, menos níveis, menos bindings.
* **Componentes pequenos**: um papel claro; cresceu → extraia.
* **Preferir PrimeNG** (≥80% do caso de uso). Tailwind para **layout/spacing/dark/responsivo**.
* **Design consistente**: dark mode, A11y (teclado/foco/leitura), estados de loading.

---

## 3) Estrutura de pastas (feature-first)

```
src/app/
  core/            # singletons/infra: http, auth, config, layout
    http/ auth/ config/ layout/
  shared/          # design system e utilidades
    ui/ directives/ pipes/ utils/
  data/            # tipos e transformação
    models/ dto/ mappers/
  api/             # clientes http tipados
    clients/
  state/           # stores globais (exceção)
  features/
    <feature>/
      pages/ components/ services/ guards/ resolvers/
      <feature>.routes.ts  index.ts
  app.routes.ts
```

**Responsabilidades**:
`core` (infra única) · `shared` (UI/atom/molecule sem domínio) · `data` (Model/DTO/Mapper) · `api` (acesso remoto) · `features` (tudo que muda junto) · `state` (apenas transversal necessário).

---

## 4) Naming & Selectors

* UI compartilhada (`shared/ui`): **`p-<kebab>`** — ex.: `<p-text-input>`.
* Feature interna: **`f-<feature>-<kebab>`** — ex.: `<f-auth-login-form>`.
* Diretivas: `[pDebounce]` · Pipes: `pCurrency`.
* Arquivos: `text-input.component.ts|html`, `login.page.ts|html`, `user.service.ts`, `auth.guard.ts`, `user.dto.ts`, `user.model.ts`, `user.mapper.ts`, `user.client.ts`.

---

## 5) Componentes & Estado

* **Sempre `inject()`** (componentes/serviços/guards/interceptors).
* **Signals**: `signal()` (estado), `computed()` (derivado), `effect()` (efeitos).
* Streams ↔ signals: `toSignal()/toObservable()`; evitar `async` pipe em caminhos quentes.
* `takeUntilDestroyed(inject(DestroyRef))` para descartar subscrições.
* `changeDetection: OnPush` (com zone ou zoneless).

---

## 6) Regras de Template (HTML)

* Controle de fluxo: **`@for`** e **`@if`**; **sempre `track`** no `@for`.
* **Tamanho**: Template **≤ 60 linhas** e **≤ 4 níveis** de aninhamento. Passou → **extraia**.
* **Bindings**: nada pesado no HTML — mover para `computed()` no TS.
* **Classes**: prefira `class="..."` (Tailwind). Use `[ngClass]` apenas quando condicional.
* **A11y**: `aria-*`, `role` quando precisar, foco visível, labels.

**Exemplo curto**

```html
<h2 class="text-xl font-semibold mb-2">{{ title() }}</h2>
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
    <header class="mb-2 font-medium">{{ cardTitle() }}</header>
    <ng-content/>
  </p-card>
</section>
```

---

## 9) Quando criar novos arquivos

* **`shared/ui`** (UI apresentacional, dumb): repetição de HTML **ou** template > 60 linhas.
* **`features/.../components`**: blocos específicos (filtro, item, banner).
* **`features/.../services`**: regra/IO daquela feature.
* **`data/models|dto|mappers`**: nova entidade/endpoint.
* **Guards/Resolvers**: navegação/autorização e pré-carregamento de dados.

---

## 10) Critérios de extração (quebrar)

Extraia se **qualquer**:

* Template > 60 linhas **ou** > 4 níveis.
* 3+ `@if` no mesmo contêiner.
* Estrutura repetida 2+ vezes.
* Necessidade de reuso entre features/páginas.

---

## 11) Erros, Logs e Contratos

* Erros tipados (`AppError` | unions) e mapeados em **interceptor**.
* Logs **estruturados** (contexto + correlation id).
* **DTO ≠ Model** (sempre mapear). Nunca usar DTO direto no template.

---

## 12) Performance & Escala

* **Rotas lazy** em todas as features; dividir componentes grandes (defer/split).
* **Signals** no template; sempre `track` no `@for`.
* **Virtual scroll** para listas longas.
* HTTP: **cache** (ETag/If-None-Match), **retry** com backoff só em idempotentes.
* A11y + responsivo + dark mode: **obrigatórios**.

---

## 13) Comentários

* Só quando **agregam contexto** (o *porquê*, não o *como*).
* **1 linha** acima de métodos públicos principais.

```ts
// Recalcula a paginação local após filtros remotos
refreshPage() { /* ... */ }
```

---

## 14) Exemplos mínimos

**UI (shared)**

```ts
// shared/ui/text-input/text-input.component.ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'p-text-input',
  standalone: true,
  template: `
    <label [attr.for]="id()">{{ label() }}</label>
    <input [id]="id()" [value]="value()" (input)="changed.emit($any($event.target).value)" />
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
}
```

**Página (feature)**

```ts
// features/users/pages/list/users.page.ts
import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'f-users-page',
  standalone: true,
  template: `
    <h1 class="text-xl font-semibold">Users</h1>
    @if (loading()) { <p-skeleton height="2rem"></p-skeleton> }
    @for (u of users(); track u.id) { <div>{{ u.name }}</div> }
  `,
  changeDetection: 0,
})
export default class UsersPage {
  private svc = inject(UsersService);
  readonly loading = signal(true);
  readonly users = signal<{id:number;name:string}[]>([]);
  constructor() {
    this.svc.list().subscribe({
      next: xs => { this.users.set(xs); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
```

---

## 15) Checklist de PR (único)

* [ ] `inject()` + `signal()/computed()/effect()` onde couber.
* [ ] `@for` **com `track`** e `@if` sem lógica pesada.
* [ ] Tamanho OK (≤60 linhas e ≤4 níveis) **ou** extraído.
* [ ] Selector correto (`p-` para UI, `f-<feature>-` para feature).
* [ ] **DTO ≠ Model** (+ mapper registrado).
* [ ] Rotas **lazy** e arquivos no lugar certo.
* [ ] **PrimeNG** sem overrides pesados; **Tailwind** só layout/spacing/dark/responsivo.
* [ ] **A11y**: labels, foco visível, navegação por teclado.
* [ ] Dark mode verificado.
* [ ] Comentário 1-linha em métodos principais (se necessário).
* [ ] Testes mínimos: render de dumb component; service (regra); guard/resolver (feliz/erro).

---

Quer que eu converta isso para um **README.md** padrão do repo e (se quiser) um **schematic `ng g`** com a estrutura `features/<feat>/{pages,components,services}`?
