export interface WeekDay {
  index: number;
  name: string;
  theme: string;
  description: string;
  icon: string;
}

export const WEEK_DAYS: readonly WeekDay[] = [
  { 
    index: 0, 
    name: 'Dom', 
    theme: 'Renovação', 
    description: 'Energia se renova, possibilidades se expandem', 
    icon: '🌙' 
  },
  { 
    index: 1, 
    name: 'Seg', 
    theme: 'Planejamento', 
    description: 'Movimento inicial que cria momentum infinito', 
    icon: '🚀' 
  },
  { 
    index: 2, 
    name: 'Ter', 
    theme: 'Experimentação', 
    description: 'Atenção concentrada manifesta realidades', 
    icon: '⚛️' 
  },
  { 
    index: 3, 
    name: 'Qua', 
    theme: 'Fluxo Criativo', 
    description: 'Observar transforma o que está em potencial', 
    icon: '🔮' 
  },
  { 
    index: 4, 
    name: 'Qui', 
    theme: 'Refinamento', 
    description: 'Ação colapsa ondas em resultados tangíveis', 
    icon: '💫' 
  },
  { 
    index: 5, 
    name: 'Sex', 
    theme: 'Síntese', 
    description: 'Reconhecer conquistas amplifica frequências', 
    icon: '✨' 
  },
  { 
    index: 6, 
    name: 'Sáb', 
    theme: 'Conexão', 
    description: 'Consciência expande o campo de possibilidades', 
    icon: '🌌' 
  }
] as const;
