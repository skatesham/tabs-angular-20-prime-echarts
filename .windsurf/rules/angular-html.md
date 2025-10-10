---
trigger: manual
---

# HTML & UI Rules — Angular 20 + PrimeNG + Tailwind

## 1) Princípios

* **Simplicidade primeiro**: menos linhas, menos níveis de aninhamento, menos bindings.
* **Componente pequeno**: *um papel claro*. Quando crescer, **quebre**.
* **Preferir** componentes PrimeNG prontos; Tailwind só para **layout/spacing/responsivo**.
* **Design consistente**: dark mode, acessibilidade, foco/teclado e estados de loading.

---

## 2) Template (HTML)

* **Controle de fluxo**: use `@for` e `@if`; **sempre** `track` no `@for`.
* **Regra de tamanho**:

  * **Template ≤ 60 linhas**; acima disso, **extrair** subcomponente em `shared/ui` ou `features/<x>/components`.
  * **Aninhamento ≤ 4 níveis**. Quebrou? Separe.
* **Bindings**:

  * Evite expressão pesada no HTML; mova para `computed()` no `.ts`.
  * Prefira `class="..."` com Tailwind a `[ngClass]` dinâmico, exceto quando condicional.
* **Acessibilidade**: rotule tudo (aria-label/aria-labelledby), foco visível, `role` quando preciso.

Exemplo curto:

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

## 3) PrimeNG (usar com parcimônia)

* **Regra de uso**:

  1. Se há componente PrimeNG que cobre 80%+ do caso, **use-o**.
  2. Se precisar de wrapper, ele deve ser **“dumb”** e fino (prop → prop, evento → evento).
* **Padrões**:

  * Inputs/Forms: `p-inputText`, `p-dropdown`, `p-calendar`, `p-inputNumber`; valide no TS e mostre erro curto.
  * Listas/tabelas: para listas longas, usar **`p-virtualScroller`** ou CDK Virtual Scroll.
  * Feedback: `p-skeleton`, `p-toast`, `p-message` (curto e objetivo).
* **Evite**: sobreposição pesada de estilos em PrimeNG; prefira **tokens/vars** e utilitários Tailwind.

---

## 4) Tailwind (layout, responsivo e dark mode)

* **Layout**: grid/flex, espaçamentos `gap-*` e `p-*/m-*`.
* **Dark mode**: usar classe/atributo global (`class="dark"`) e variantes `dark:*`.
* **Responsivo**: `sm/md/lg` para colunas, `container mx-auto` para largura.

Exemplo:

```html
<section class="grid gap-3 md:grid-cols-2">
  <p-card class="dark:bg-surface-800">
    <header class="mb-2 font-medium">{{ cardTitle() }}</header>
    <ng-content/>
  </p-card>
</section>
```

---

## 5) Nomes e onde colocar (UI)

* **Design system (reutilizável, “dumb”)** → `shared/ui/<nome>/`

  * **Selector** `p-<kebab>` (ex.: `<p-text-input>`).
  * Props simples, sem dependência de domínio.
* **Componente de feature** → `features/<feature>/components/<nome>/`

  * **Selector** `f-<feature>-<kebab>`.
  * Pode conhecer serviços/estado da **feature**.
* **Página (rota)** → `features/<feature>/pages/<nome>.page.*`

  * **Contêiner**: orquestra serviços/estado; delega UI para componentes menores.

---

## 6) Quando criar *novos* arquivos

* **Novo componente UI** (`shared/ui`): quando o HTML começar a repetir ou o template passar de **60 linhas**.
* **Novo componente de feature** (`features/.../components`): para blocos específicos (filtro, item, banner).
* **Novo serviço** (`features/.../services`): agregação de regra/IO **daquela feature**.
* **Novo model/DTO/mapper** (`data/models|dto|mappers`): sempre que introduzir entidade/endpoints novos.
* **Guard/Resolver** (`features/.../guards|resolvers`): navegação/autorização pré-render e pré-carregamento.

---

## 7) Comentários em métodos (uma linha, quando “principal”)

* **Só quando agrega contexto** (por quê existe, não o que faz).
* **Formato**: comentário de **1 linha** imediatamente acima do método público principal.

Exemplo:

```ts
// Recalcula a paginação local após filtros remotos
refreshPage() { /* ... */ }
```

> Código bem escrito **se explica**; comentários extensos são proibidos.

---

## 8) Critérios de extração (quebrar em subcomponentes)

Extraia quando **qualquer** condição ocorrer:

* Template > 60 linhas **ou** > 4 níveis de aninhamento.
* 3+ `@if` no mesmo contêiner.
* Mesma estrutura repetida 2+ vezes.
* Necessidade de reuso entre páginas/features.

---

## 9) Checklist de PR (UI)

* [ ] `@for` com `track`, `@if` sem lógica pesada.
* [ ] Tamanho OK (≤ 60 linhas) ou extraído em subcomponentes.
* [ ] PrimeNG usado sem “overrides” desnecessários; Tailwind só para layout/spacing.
* [ ] A11y: labels, foco, leitura por teclado.
* [ ] Dark mode verificado.
* [ ] Comentário 1-linha em métodos principais (se necessário).
