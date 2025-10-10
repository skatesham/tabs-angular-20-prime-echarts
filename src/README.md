# 📚 README — Pacotes da App (Arquitetura & Responsabilidades)

> Padrão para projetos Angular 19/20 (standalone + signals), com Tailwind e PrimeNG.
> Objetivo: **clareza de fronteiras**, **baixo acoplamento**, **alta coesão** e **previsibilidade** em produção.

---

## Mapa dos Pacotes

```
src/
├─ app/
│  ├─ core/           # Núcleo da aplicação (único, singleton)
│  ├─ shared/         # Reutilizáveis puros (UI, pipes, directives, utils)
│  ├─ features/       # Funcionalidades de negócio (módulos por domínio)
│  ├─ pages/          # Páginas roteáveis (shells) que compõem features
│  ├─ layout/         # Layouts, shells visuais (header/aside/footer)
│  ├─ state/          # Estado global (NgRx/Signals Store/Efeitos)
│  ├─ domain/         # Modelos, regras e invariantes de domínio
│  ├─ data-access/    # Acesso a dados (HTTP, repos, cache, mappers)
│  └─ ui/             # Componentes de UI “design-system” internos
│
├─ assets/            # Estáticos (i18n, imagens, ícones, mocks)
├─ environments/      # Variáveis por ambiente (build-time)
└─ styles/            # Estilos globais (Tailwind, tokens, temas)
```

---

## Regras de Dependência (quem pode importar quem)

* `core` → **ninguém importa core** (exceto bootstrap). Core **pode** importar `domain` e `data-access`.
* `shared` → pode importar apenas **coisas puras** (`domain` tipos, **não** serviços).
* `features/*` → podem importar `domain`, `data-access`, `shared`, `ui`.
* `pages/*` → podem orquestrar `features` e `layout`; não contêm regra de negócio.
* `layout` → importa `ui` e `shared` (nunca regra de negócio).
* `state` → pode usar `domain` e `data-access`, expõe selectors/efeitos para `features`.
* `ui` → pode usar `shared` e tipos de `domain`. Sem HTTP.
* `data-access` → **não** conhece componentes. Só serviços/ports/adapters.
* **Proibido:** `features` entre si sem mediação; `ui` chamar HTTP; `shared` ter estado global.

Dica: crie um **eslint rule graph** (ex.: `import/no-restricted-paths`) para reforçar.

---

## Responsabilidades por Pacote

### `app/core/`

* **O que é:** Infraestrutura cross-cutting: interceptors, guards globais, providers singlettons, inicializadores.
* **Coloque aqui:**

  * `http.interceptor.ts`, `auth.guard.ts`, `error-handler.ts`
  * `app.config.ts` (providers, `withHttpClient`, i18n, etc.)
* **Evite:** componentes visuais; chamadas a endpoints específicos do negócio.

### `app/shared/`

* **O que é:** Biblioteca de **reuso**: componentes puros, directives, pipes, helpers.
* **Coloque aqui:** `truncate.pipe.ts`, `debounce.directive.ts`, `CardComponent` genérico.
* **Evite:** depender de HTTP/estado global; conhecimento de casos de uso.

### `app/features/<feature>/`

* **O que é:** **Unidade de negócio** com UI própria (lazy-loaded quando possível).
* **Coloque aqui:** casos de uso, components específicos, facades locais, roteamento próprio.
* **Estrutura sugerida:**

  ```
  features/events/
  ├─ data/      # serviços locais da feature (chamam data-access por portas)
  ├─ ui/        # componentes da feature (não globais)
  ├─ pages/     # telas roteáveis da feature
  ├─ state/     # store local (signals/ngrx) e efeitos da feature
  └─ index.ts
  ```
* **Evite:** acessar outra feature diretamente; vazamento de tipos internos.

### `app/pages/`

* **O que é:** **Páginas de alto nível** (shells roteáveis) que **combinam** features.
* **Coloque aqui:** `dashboard.page.ts`, `login.page.ts`.
* **Evite:** regra de negócio; HTTP direto.

### `app/layout/`

* **O que é:** Composição macro: header/aside/footer, grid responsivo, slots.
* **Coloque aqui:** `main-layout.component.ts`, `layout.service.ts` (preferências UI).
* **Evite:** lógica de domínio.

### `app/state/`

* **O que é:** **Estado global** (apenas quando necessário: auth, theme, user prefs).
* **Coloque aqui:** stores com signals ou NgRx, selectors, efeitos (ex.: hydration).
* **Evite:** inflar com estados que poderiam ser **locais** à feature.

### `app/domain/`

* **O que é:** **Coração do negócio**: entidades, value objects, services puros.
* **Coloque aqui:** `event.model.ts`, `price.vo.ts`, `rules.service.ts` (sem Angular).
* **Evite:** dependências de Angular/HTTP; I/O.

### `app/data-access/`

* **O que é:** **Porta de entrada de dados**: HTTP, repos, cache, mapeadores DTO↔Modelo.
* **Coloque aqui:** `events.api.ts`, `events.repository.ts`, `events.mapper.ts`.
* **Evite:** componentes; regras de UI; conhecer páginas/rotas.

### `app/ui/`

* **O que é:** **Design System interno**: botões, inputs, tabelas, temas, wrappers PrimeNG.
* **Coloque aqui:** `ButtonXComponent`, `TableXComponent` (acessibilidade e padrão).
* **Evite:** casos de uso de negócio; HTTP.

### `assets/`, `environments/`, `styles/`

* **assets:** `i18n/*.json`, `images/`, `icons/`, `mock-data/`.
* **environments:** chaves build-time (nunca segredos de runtime).
* **styles:** `tailwind.css`, tokens, temas (`:root` + `dark`), util classes.

---

## Convenções de Nome & Arquivos

* **Componentes:** `kebab` + `.component.ts` (standalone), `*Component` classe.
* **Diretivas/Pipes:** `.directive.ts` / `.pipe.ts`.
* **Serviços:** `.service.ts`; **pure service** no `domain` quando sem Angular.
* **Stores (signals):** `*.store.ts` + `selectors.ts` (ou métodos computeds).
* **NgRx (se usar):** `actions.ts`, `reducer.ts`, `effects.ts`, `selectors.ts`.
* **Rotas:** `*.routes.ts` por feature.
* **Barrels:** `index.ts` apenas para **APIs públicas** do pacote.

---

## Fluxos Recomendados

1. **UI solicita dados** → `feature facade` → `state` → `data-access` (HTTP)
2. **DTO** → `mapper` → **`domain model`** → UI
3. **Ação de usuário** → `feature state/effects` → `data-access` → `domain` valida → atualiza UI

---

## Performance & Escalabilidade

* **Lazy-load** features e **defer views** quando possível.
* Prefira **signals** para estado local e **NgRx** para orquestração complexa.
* **CDK Virtual Scroll** para listas grandes; **OnPush** mentalidade (mesmo com signals).
* **Cache** em `data-access` (ETags, stale-while-revalidate).
* **Split**: `ui` e `shared` sem dependências pesadas; evite importar PrimeNG inteiro.
* **A11y**: `ui` define padrões (roles, aria, foco, contraste dark mode).

---

## Anti-padrões (evite)

* `shared` com serviços HTTP.
* `ui` conhecendo endpoints ou regras de negócio.
* `features` falando diretamente com outra `feature`.
* `state` global gigantesco (comece local → promova quando necessário).
* DTOs vazando para a UI (mapeie para `domain`).

---

## Tabela Rápida de “Onde vai o quê?”

| Item                     | Vai em                  | Por quê                   |
| ------------------------ | ----------------------- | ------------------------- |
| Interceptor de Auth      | `core/interceptors`     | Cross-cutting, singleton  |
| Pipe `currencyBRL`       | `shared/pipes`          | Reuso puro                |
| Página “Eventos”         | `features/events/pages` | Rota da feature           |
| Card de Evento           | `features/events/ui`    | UI específica da feature  |
| Botão padrão app         | `ui/buttons`            | Design system interno     |
| `EventModel`             | `domain`                | Regras/entidade           |
| `EventsApi`/`Repository` | `data-access`           | Acesso a dados            |
| Store global de tema     | `state`                 | Preferências transversais |

---

## Checklist de PR

* [ ] Fronteiras respeitadas (imports permitidos).
* [ ] DTO mapeado para `domain` antes de tocar UI.
* [ ] Componentes `standalone`; inputs/outputs claros; sem lógica pesada.
* [ ] Efeitos assíncronos nos lugares certos (`effects` ou services dedicados).
* [ ] Lazy-load e code-split quando aplicável.
* [ ] A11y e dark mode verificados.

---

## Três Perspectivas (como você pediu)

1. **Visão neutra:**
   Essa arquitetura separa **domínio**, **acesso a dados** e **UI**, impondo regras de dependência que evitam acoplamento acidental. Escala bem, facilita testes e manutenção.

2. **Advogado do diabo (contrapontos):**

* Pode parecer “verboosa” para apps pequenos.
* NgRx + domain + repos + mappers pode aumentar boilerplate se o time não estiver alinhado.
* Requer disciplina e lint rules para não virar “nomes bonitos com acoplamento escondido”.

3. **Visão positiva/encorajadora:**

* Garante **evolução segura** (adição de features sem regressões laterais).
* **Onboarding** mais rápido: cada pacote tem responsabilidade clara.
* Facilita **observabilidade** (onde debugar), **testes** e **performance** previsível.
