# 🎬 Guia de Animações - ManaVitae

## 🧠 Fundamentos Psicológicos

As animações no ManaVitae seguem princípios de neurociência e psicologia cognitiva para criar experiências significativas e intuitivas.

## 🧭 Sentidos de Movimento e Efeitos Psicológicos

| Direção | Estímulo Cerebral | Sensação Subjetiva | Interpretação Comum | Animação |
|---------|-------------------|-------------------|---------------------|----------|
| **Direita →** | Hemisfério esquerdo (lógico, racional) | Clareza, foco, decisão, análise | Ir para o futuro, agir, resolver | `slide-right-future` |
| **Esquerda ←** | Hemisfério direito (emocional, criativo) | Nostalgia, imaginação, introspecção | Rever passado, refletir, sentir | `slide-left-reflection` |
| **Cima ↑** | Neocórtex (cognitivo) | Inspiração, idealização, transcendência | Sonhar, buscar propósito | `slide-up-inspiration` |
| **Baixo ↓** | Sistema límbico (emocional) | Aterramento, segurança, concretude | Sentir, ancorar, voltar à realidade | `slide-down-grounding` |
| **Circular ⟳** | Integração hemisférica | Harmonia, fluxo, presença | Transição, equilíbrio emocional | `rotate-harmony` |
| **Zoom ⊕** | Foco atencional | Presença, concentração | Estar aqui e agora | `zoom-presence` |
| **Wave 〰️** | Fluxo natural | Movimento orgânico | Naturalidade, suavidade | `wave-flow` |

## 📦 Uso Básico

### 1. Via HTML (Atributos AOS)

```html
<!-- Animação de futuro/ação -->
<div 
  data-aos="slide-right-future"
  data-aos-duration="800"
  data-aos-delay="100"
  data-aos-easing="ease-out-expo">
  Conteúdo que representa ação futura
</div>

<!-- Animação de reflexão/emoção -->
<div 
  data-aos="slide-left-reflection"
  data-aos-duration="800"
  data-aos-delay="100">
  Conteúdo que evoca memória ou emoção
</div>

<!-- Animação de inspiração -->
<div 
  data-aos="slide-up-inspiration"
  data-aos-duration="900"
  data-aos-delay="150">
  Conteúdo inspirador ou aspiracional
</div>
```

### 2. Via Diretiva Angular

```html
<!-- Uso simples com contexto -->
<div appAnimate="future" [animateDelay]="200">
  Tarefas e ações futuras
</div>

<!-- Uso com configuração completa -->
<div 
  appAnimate="inspiration"
  [animateDuration]="900"
  [animateDelay]="150"
  [animateEasing]="'ease-out-expo'"
  [animateOnce]="false">
  Metas e sonhos
</div>

<!-- Uso com contexto explícito -->
<div 
  appAnimate
  [animateContext]="'harmony'"
  [animateDuration]="1000">
  Conteúdo equilibrado
</div>
```

### 3. Via Serviço TypeScript

```typescript
import { AnimationService } from '@shared/services/animation.service';

export class MyComponent implements OnInit {
  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    // Inicializar animações
    this.animationService.initAnimations({
      duration: 800,
      once: false,
      mirror: true,
    });

    // Obter animação por contexto
    const animation = this.animationService.getAnimationByContext('future');
    
    // Obter duração por importância
    const duration = this.animationService.getDurationByImportance('high');
    
    // Obter delay por ordem
    const delay = this.animationService.getDelayByOrder(2, 100); // 200ms
  }

  refreshAnimations() {
    this.animationService.refreshAnimations();
  }
}
```

## 🎨 Animações Disponíveis

### 1. **slide-right-future** (Direita →)
- **Contexto**: Futuro, Ação, Decisão
- **Uso**: Tarefas, ações, próximos passos, botões de ação
- **Hemisfério**: Esquerdo (lógico)
- **Duração recomendada**: 800ms

### 2. **slide-left-reflection** (Esquerda ←)
- **Contexto**: Passado, Reflexão, Emoção
- **Uso**: Histórico, memórias, citações, reflexões
- **Hemisfério**: Direito (emocional)
- **Duração recomendada**: 800ms

### 3. **slide-up-inspiration** (Cima ↑)
- **Contexto**: Inspiração, Transcendência, Sonhos
- **Uso**: Metas, visão, propósito, aspirações
- **Estímulo**: Neocórtex
- **Duração recomendada**: 900ms

### 4. **slide-down-grounding** (Baixo ↓)
- **Contexto**: Aterramento, Segurança, Concretude
- **Uso**: Headers, fundamentos, base, segurança
- **Estímulo**: Sistema límbico
- **Duração recomendada**: 800ms

### 5. **rotate-harmony** (Circular ⟳)
- **Contexto**: Harmonia, Fluxo, Integração
- **Uso**: Elementos de equilíbrio, ciclos, processos
- **Estímulo**: Integração hemisférica
- **Duração recomendada**: 1000ms

### 6. **zoom-presence** (Zoom ⊕)
- **Contexto**: Presença, Foco, Atenção
- **Uso**: Elementos importantes, calls-to-action, destaques
- **Estímulo**: Foco atencional
- **Duração recomendada**: 900ms

### 7. **wave-flow** (Wave 〰️)
- **Contexto**: Fluxo Natural, Movimento Orgânico
- **Uso**: Transições suaves, elementos fluidos
- **Estímulo**: Movimento natural
- **Duração recomendada**: 1200ms

### 8. **fade-reveal** (Fade)
- **Contexto**: Revelação Gradual
- **Uso**: Elementos secundários, informações complementares
- **Duração recomendada**: 1000ms

### 9. **flip-transform** (Flip)
- **Contexto**: Transformação, Mudança de Perspectiva
- **Uso**: Cards que viram, mudanças de estado
- **Duração recomendada**: 1000ms

### 10. **pulse-vital** (Pulse)
- **Contexto**: Energia, Vitalidade (Contínuo)
- **Uso**: Indicadores ativos, elementos vivos
- **Duração**: 2000ms (infinito)

## ⚙️ Configurações

### Durações
- **400ms**: Micro-interações
- **600ms**: Transições rápidas
- **800ms**: Padrão (equilibrado)
- **1000ms**: Elementos importantes
- **1200ms**: Elementos complexos

### Delays
- **0ms**: Primeiro elemento
- **100ms**: Sequência rápida
- **150ms**: Sequência média
- **200ms**: Sequência espaçada
- **300ms**: Sequência lenta

### Easing
- **ease-out-cubic**: Padrão (suave)
- **ease-out-expo**: Dramático (impactante)
- **ease-in-out-back**: Elástico (divertido)

## 🎯 Boas Práticas

### 1. **Hierarquia de Animações**
```html
<!-- Header (primeiro, aterramento) -->
<header data-aos="slide-down-grounding" data-aos-delay="0">

<!-- Conteúdo principal (segundo, presença) -->
<main data-aos="zoom-presence" data-aos-delay="200">

<!-- Ações (terceiro, futuro) -->
<section data-aos="slide-right-future" data-aos-delay="300">

<!-- Reflexões (quarto, emoção) -->
<aside data-aos="slide-left-reflection" data-aos-delay="400">
```

### 2. **Consistência Semântica**
- Use **direita** para ações e futuro
- Use **esquerda** para reflexões e passado
- Use **cima** para inspiração e metas
- Use **baixo** para fundamentos e segurança

### 3. **Performance**
- Limite animações simultâneas a 5-7 elementos
- Use `once: true` para elementos que não precisam reanimar
- Considere `prefers-reduced-motion` (já implementado)

### 4. **Responsividade**
- Animações são automaticamente reduzidas em mobile
- Delays são ajustados para telas menores

## 🔄 Refresh e Atualização

```typescript
// Após adicionar elementos dinamicamente
this.animationService.refreshAnimations();

// Ao mudar de rota
ngOnInit() {
  this.animationService.initAnimations();
}

ngOnDestroy() {
  this.animationService.refreshAnimations();
}
```

## 🎨 Exemplo Completo

```html
<div class="page-container">
  <!-- Header: Aterramento -->
  <header 
    data-aos="slide-down-grounding"
    data-aos-duration="1000"
    data-aos-delay="0">
    <h1>Bem-vindo</h1>
  </header>

  <!-- Welcome: Presença -->
  <section 
    data-aos="zoom-presence"
    data-aos-duration="900"
    data-aos-delay="200">
    <p>Mensagem de boas-vindas</p>
  </section>

  <!-- Tarefas: Futuro/Ação -->
  <section 
    data-aos="slide-right-future"
    data-aos-duration="800"
    data-aos-delay="300">
    <h2>Suas Tarefas</h2>
    <ul>...</ul>
  </section>

  <!-- Metas: Inspiração -->
  <section 
    data-aos="slide-up-inspiration"
    data-aos-duration="900"
    data-aos-delay="400">
    <h2>Suas Metas</h2>
    <div>...</div>
  </section>

  <!-- Reflexões: Emoção -->
  <section 
    data-aos="slide-left-reflection"
    data-aos-duration="800"
    data-aos-delay="500">
    <h2>Reflexão do Dia</h2>
    <blockquote>...</blockquote>
  </section>

  <!-- Valores: Harmonia -->
  <section 
    data-aos="rotate-harmony"
    data-aos-duration="1000"
    data-aos-delay="600">
    <h2>Seus Valores</h2>
    <div>...</div>
  </section>
</div>
```

## 🌟 Contextos de Animação

Use o serviço para obter a animação correta:

```typescript
// Contextos disponíveis
type AnimationContext = 
  | 'future' | 'action' | 'decision'        // → Direita
  | 'past' | 'reflection' | 'emotion'       // ← Esquerda
  | 'inspiration' | 'dream' | 'transcendence' // ↑ Cima
  | 'grounding' | 'security' | 'concrete'   // ↓ Baixo
  | 'harmony' | 'flow' | 'integration'      // ⟳ Circular
  | 'presence' | 'focus'                    // ⊕ Zoom
  | 'reveal' | 'transform' | 'vitality';    // Outros

// Uso
const animation = this.animationService.getAnimationByContext('inspiration');
// Retorna: 'slide-up-inspiration'
```

## 📱 Acessibilidade

O sistema respeita automaticamente:
- `prefers-reduced-motion`: Desabilita animações se o usuário preferir
- Responsividade: Reduz movimento em telas pequenas
- Performance: Otimiza para dispositivos mais lentos

---

**Criado com ❤️ para ManaVitae**
*Movimento com significado, design com propósito*
