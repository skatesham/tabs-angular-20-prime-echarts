# Guidelines - Sistema de Temas PrimeNG 20 + Angular

## 🎯 Objetivo

Criar um sistema de temas moderno, manutenível e escalável usando **PrimeNG 20** com **Angular**, seguindo as melhores práticas de separação de responsabilidades.

---

## 📋 Princípios Fundamentais

### 1. **Separação de Responsabilidades**
- **Preset TypeScript** → Cores, tokens semânticos, configurações de componentes PrimeNG
- **SCSS Global** → Efeitos visuais customizados (glassmorphism, animações, tipografia)
- **Nunca misturar** → Cores hardcoded no SCSS devem ser centralizadas em CSS variables

### 2. **Hierarquia de Estilos**
```
1. PrimeNG Preset (TypeScript) - Base do sistema de design
   ↓
2. CSS Variables (SCSS) - Cores centralizadas e reutilizáveis
   ↓
3. Estilos Customizados (SCSS) - Efeitos visuais específicos
```

### 3. **DRY (Don't Repeat Yourself)**
- Uma cor = um lugar de definição
- Use CSS variables para valores reutilizáveis
- Evite duplicação entre light/dark mode

---

## 🚀 Passo a Passo para Implementação

### **PASSO 1: Estrutura de Arquivos**

```
src/
├── app/
│   ├── theme/
│   │   ├── mana-vitae.preset.ts    # Preset do PrimeNG 20
│   │   └── README.md               # Documentação do tema
│   └── app.config.ts               # Configuração do Angular
└── styles.scss                     # Estilos globais
```

---

### **PASSO 2: Criar o Preset do PrimeNG 20**

**Arquivo:** `src/app/theme/mana-vitae.preset.ts`

```typescript
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const ManaVitaePreset = definePreset(Aura, {
  semantic: {
    // 1. Defina sua paleta primária
    primary: {
      50: '#f0fdf7',
      100: '#ecfdf5',
      200: '#d1fae5',
      300: '#a7f3d0',
      400: '#6ee7b7',
      500: '#34d399',
      600: '#10b981',
      700: '#059669',
      800: '#047857',
      900: '#065f46',
      950: '#064e3b'
    },
    
    // 2. Configure color schemes (light/dark)
    colorScheme: {
      light: {
        // Superfícies
        surface: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          // ... até 950
        },
        
        // Cores primárias no contexto
        primary: {
          color: '{primary.600}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}'
        },
        
        // Highlights
        highlight: {
          background: '{primary.100}',
          focusBackground: '{primary.200}',
          color: '{primary.900}',
          focusColor: '{primary.800}'
        },
        
        // Form fields
        formField: {
          background: '#ffffff',
          borderColor: '{primary.300}',
          hoverBorderColor: '{primary.400}',
          focusBorderColor: '{primary.600}',
          color: '{surface.700}',
          placeholderColor: '{surface.500}'
        },
        
        // Text
        text: {
          color: '{surface.700}',
          hoverColor: '{surface.800}',
          mutedColor: '{surface.500}',
          hoverMutedColor: '{surface.600}'
        }
      },
      
      dark: {
        // Repita a estrutura para dark mode
        // com cores apropriadas
      }
    }
  },
  
  // 3. Configure componentes específicos (OPCIONAL)
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            background: 'rgba(255, 255, 255, 0.85)',
            color: '{surface.700}'
          }
        },
        dark: {
          root: {
            background: 'rgba(30, 41, 59, 0.75)',
            color: '{surface.0}'
          }
        }
      }
    }
  }
});
```

**⚠️ IMPORTANTE:**
- Use apenas propriedades suportadas pela API do PrimeNG
- Se uma propriedade causar erro TypeScript, mova para o SCSS
- Prefira tokens (`{primary.600}`) a valores hardcoded

---

### **PASSO 3: Configurar no Angular**

**Arquivo:** `src/app/app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { ManaVitaePreset } from './theme/mana-vitae.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: ManaVitaePreset,
        options: {
          darkModeSelector: 'system' // ou '.dark' ou 'class'
        }
      }
    })
  ]
};
```

---

### **PASSO 4: Centralizar Cores no SCSS**

**Arquivo:** `src/styles.scss`

```scss
/* ===================================
   VARIÁVEIS CENTRALIZADAS
   =================================== */
:root {
  /* === LIGHT MODE === */
  
  /* Cores Primárias */
  --color-primary-300: #a7f3d0;
  --color-primary-400: #6ee7b7;
  --color-primary-500: #34d399;
  --color-primary-600: #10b981;
  --color-primary-700: #059669;
  
  /* Cores de Texto */
  --color-text-primary: #065f46;
  --color-text-secondary: #047857;
  --color-text-body: #374151;
  --color-text-muted: #6b7280;
  
  /* Bordas */
  --color-border: #a7f3d0;
  --color-border-hover: #6ee7b7;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(16, 185, 129, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(16, 185, 129, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
  
  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
  --gradient-accent: linear-gradient(90deg, #10b981 0%, #059669 100%);
  
  /* Backgrounds */
  --bg-card: rgba(255, 255, 255, 0.85);
}

/* === DARK MODE === */
@media (prefers-color-scheme: dark) {
  :root {
    /* Redefina as variáveis para dark mode */
    --color-text-primary: #6ee7b7;
    --color-text-secondary: #34d399;
    --color-text-body: #d1d5db;
    --bg-card: rgba(30, 41, 59, 0.75);
    /* ... */
  }
}

.dark {
  /* Mesmas redefinições para classe .dark */
}
```

**✅ REGRAS:**
1. **NUNCA** use cores hardcoded (`#10b981`) diretamente nos estilos
2. **SEMPRE** defina a cor como variável primeiro
3. **AGRUPE** variáveis por categoria (cores, sombras, gradientes)
4. **DOCUMENTE** o propósito de cada variável

---

### **PASSO 5: Estilos Customizados**

```scss
/* ===================================
   CARDS - GLASSMORPHISM
   =================================== */
.p-card {
  backdrop-filter: blur(12px) !important;
  border: 2px solid var(--color-border) !important;
  box-shadow: var(--shadow-md) !important;
  transition: all 0.3s ease !important;
}

.p-card:hover {
  border-color: var(--color-border-hover) !important;
  box-shadow: var(--shadow-lg) !important;
  transform: translateY(-4px) scale(1.01);
}

/* Títulos */
.p-card h1,
.p-card h2,
.p-card h3 {
  color: var(--color-text-primary) !important;
}

/* Textos */
.p-card p,
.p-card span {
  color: var(--color-text-body) !important;
}
```

**✅ BOAS PRÁTICAS:**
- Use `var(--nome-variavel)` para todas as cores
- Adicione `!important` apenas quando necessário sobrescrever PrimeNG
- Organize por seções com comentários claros
- Mantenha especificidade baixa quando possível

---

## 🎨 Workflow de Desenvolvimento

### **Adicionando uma Nova Cor**

1. **Defina no `:root`**
```scss
:root {
  --color-success: #10b981;
  --color-error: #ef4444;
}
```

2. **Use nos estilos**
```scss
.success-message {
  color: var(--color-success);
}
```

3. **Não esqueça do dark mode**
```scss
@media (prefers-color-scheme: dark) {
  :root {
    --color-success: #34d399;
  }
}
```

---

### **Customizando um Componente PrimeNG**

**Opção 1: Via Preset (Preferível)**
```typescript
// mana-vitae.preset.ts
components: {
  button: {
    colorScheme: {
      light: {
        root: {
          background: '{primary.600}',
          color: '#ffffff'
        }
      }
    }
  }
}
```

**Opção 2: Via SCSS (Se preset não suportar)**
```scss
.p-button {
  background: var(--color-primary-600) !important;
  color: white !important;
}
```

---

## 🔍 Troubleshooting

### **Erro: "Property does not exist in type"**

**Causa:** Propriedade não suportada pela API do PrimeNG

**Solução:** Mova para o SCSS
```typescript
// ❌ Não funciona no preset
components: {
  card: {
    borderColor: '{primary.300}' // Erro!
  }
}

// ✅ Funciona no SCSS
.p-card {
  border-color: var(--color-border) !important;
}
```

---

### **Dark Mode não funciona**

**Checklist:**
1. ✅ Variáveis redefinidas em `@media (prefers-color-scheme: dark)`?
2. ✅ Variáveis redefinidas em `.dark`?
3. ✅ `darkModeSelector` configurado no `app.config.ts`?
4. ✅ Usando `var()` nos estilos (não valores hardcoded)?

---

### **Cores não aplicam**

**Possíveis causas:**
1. Especificidade CSS baixa → Adicione `!important`
2. PrimeNG sobrescrevendo → Use seletores mais específicos
3. Variável não definida → Verifique `:root`

---

## 📚 Checklist Final

Antes de considerar o sistema completo:

- [ ] Todas as cores definidas em CSS variables
- [ ] Zero valores hardcoded no SCSS
- [ ] Preset do PrimeNG configurado
- [ ] Dark mode funcionando
- [ ] Documentação criada
- [ ] Componentes testados em light/dark
- [ ] Hot reload funcionando
- [ ] Build sem erros TypeScript

---

## 🎯 Resultado Esperado

### **Estrutura Limpa**
```
✅ Preset TypeScript → Cores e tokens
✅ CSS Variables → Valores centralizados
✅ SCSS → Efeitos visuais
```

### **Manutenibilidade**
```
✅ Alterar uma cor = um único lugar
✅ Adicionar tema = duplicar preset
✅ Dark mode = redefinir variáveis
```

### **Performance**
```
✅ CSS variables nativas
✅ Menos CSS customizado
✅ Mais uso do sistema PrimeNG
```

---

## 💡 Dicas Avançadas

### **Criar Variantes de Tema**

```typescript
// theme/variants/ocean.preset.ts
export const OceanPreset = definePreset(Aura, {
  semantic: {
    primary: {
      500: '#0ea5e9', // Azul oceano
      600: '#0284c7',
      // ...
    }
  }
});
```

### **Temas por Rota**

```typescript
// Trocar tema dinamicamente
import { inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';

const primeng = inject(PrimeNG);
primeng.changeTheme('aura-light', 'aura-dark', 'theme-link');
```

### **Variáveis Computadas**

```scss
:root {
  --spacing-unit: 0.25rem;
  --spacing-sm: calc(var(--spacing-unit) * 2); // 0.5rem
  --spacing-md: calc(var(--spacing-unit) * 4); // 1rem
  --spacing-lg: calc(var(--spacing-unit) * 6); // 1.5rem
}
```

---

## 📖 Recursos

- [PrimeNG Theming Guide](https://primeng.org/theming)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Angular Styling Guide](https://angular.dev/guide/components/styling)

---

## ✨ Conclusão

Seguindo estas guidelines, você terá:

1. **Sistema escalável** - Fácil adicionar novos temas
2. **Código limpo** - Separação clara de responsabilidades
3. **Manutenível** - Uma cor, um lugar
4. **Performático** - CSS variables nativas
5. **Type-safe** - TypeScript no preset

**Lembre-se:** O segredo é **separar cores (preset/variables) de efeitos visuais (SCSS)**! 🎨
