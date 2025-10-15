# Mana Vitae Theme System

## Estrutura

O sistema de temas foi refatorado para seguir as melhores práticas do **PrimeNG 20**, separando a lógica de cores e estilos em um preset TypeScript dedicado.

### Arquivos

- **`mana-vitae.preset.ts`** - Preset completo do PrimeNG 20 com todas as cores e configurações de componentes
- **`/src/styles.scss`** - Estilos globais simplificados (glassmorphism, animações, tipografia)

## Filosofia do Design

### Paleta de Cores - Frequência 528 Hz
Base: **#8effb8** (Verde Esmeralda) - Frequência de Amor e Motivação

#### Light Mode
- **Primary**: Verde esmeralda (#10b981 - #8effb8)
- **Surface**: Tons de cinza neutro
- **Text**: Cinza escuro com hierarquia clara

#### Dark Mode
- **Primary**: Verde claro vibrante (#34d399 - #8effb8)
- **Surface**: Tons de slate escuro
- **Text**: Cinza claro com boa legibilidade

## Preset do PrimeNG 20

### Estrutura do Preset

```typescript
export const ManaVitaePreset = definePreset(Aura, {
  semantic: {
    primary: { ... },           // Cores primárias
    colorScheme: {
      light: { ... },           // Configurações light mode
      dark: { ... }             // Configurações dark mode
    }
  },
  components: {
    card: { ... },              // Configurações de cards
    progressbar: { ... },       // Configurações de progress bar
    chip: { ... },              // Configurações de chips
    button: { ... }             // Configurações de botões
  }
});
```

### Tokens Disponíveis

#### Cores Primárias
- `{primary.50}` até `{primary.950}` - Escala completa de verde esmeralda

#### Superfícies
- `{surface.0}` até `{surface.950}` - Escala de cinza/slate

#### Tokens Semânticos
- `{primary.color}` - Cor primária do contexto atual
- `{primary.hoverColor}` - Cor de hover
- `{primary.activeColor}` - Cor de estado ativo
- `{text.color}` - Cor de texto padrão
- `{text.mutedColor}` - Cor de texto secundário

## Customizações no styles.scss

O arquivo `styles.scss` foi drasticamente simplificado e agora contém apenas:

### 1. Tipografia
- 3 famílias de fontes:
  - **Poppins** - Fonte padrão
  - **Space Grotesk** - Títulos e branding
  - **Merriweather** - Citações

### 2. Glassmorphism
- Efeito de vidro nos cards com backdrop-filter
- Efeito de brilho no hover

### 3. Animações
- `fadein`, `fadeinup`, `fadeindown`, `fadeinleft`, `fadeinright`
- `shimmer` - Para progress bars
- `animate-shimmer` - Para headers

### 4. Estilos Especiais
- `.header-title` - Títulos do header com text-shadow
- `.header-subtitle` - Subtítulos do header
- `.app-name` - Nome da aplicação com estilo especial
- `blockquote` - Citações com fonte Merriweather

## Como Usar

### Modificar Cores

Edite o arquivo `mana-vitae.preset.ts`:

```typescript
semantic: {
  primary: {
    500: '#34d399',  // Altere aqui
    600: '#10b981',  // E aqui
    // ...
  }
}
```

### Adicionar Novo Componente

```typescript
components: {
  meucomponente: {
    colorScheme: {
      light: {
        root: {
          background: '{surface.0}',
          color: '{text.color}'
        }
      },
      dark: {
        root: {
          background: '{surface.900}',
          color: '{text.color}'
        }
      }
    }
  }
}
```

### Usar Tokens no Template

```html
<div class="bg-primary-500 text-white">
  Usando tokens do PrimeNG
</div>
```

## Benefícios da Refatoração

✅ **Separação de Responsabilidades** - Cores no preset, estilos visuais no SCSS
✅ **Manutenibilidade** - Fácil alterar cores em um único lugar
✅ **Consistência** - Tokens garantem uso consistente das cores
✅ **Performance** - Menos CSS customizado, mais uso do sistema nativo do PrimeNG
✅ **Dark Mode** - Suporte nativo e automático
✅ **Type Safety** - TypeScript no preset garante segurança de tipos

## Migração de Código Antigo

### Antes (CSS Variables)
```scss
color: var(--color-text-primary);
background: var(--color-bg-card);
```

### Depois (Tokens PrimeNG)
```html
<div class="text-primary-900 bg-surface-0">
  Conteúdo
</div>
```

Ou use os tokens diretamente no preset para componentes PrimeNG.
