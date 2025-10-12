export interface Pillar {
  icon: string;
  title: string;
  description?: string;
  values?: string[];
  color: string;
}

export const DEFAULT_MISSION_VISION_VALUES: readonly Pillar[] = [
  {
    icon: '🎯',
    title: 'Missão',
    description: 'Criar e entregar produtos artísticos inovadores que conectam arte, espiritualidade e funcionalidade, transformando energia criativa em objetos únicos que elevam a consciência e inspiram transformação pessoal.',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: '✨',
    title: 'Visão',
    description: 'Ser referência em criação xamânica contemporânea, integrando técnicas ancestrais com inovação artística, expandindo fronteiras criativas e estabelecendo um ateliê onde cada peça carrega intenção, beleza e propósito.',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: '💎',
    title: 'Valores',
    values: [
      'Autenticidade criativa',
      'Excelência artesanal',
      'Consciência espiritual',
      'Inovação constante',
      'Ciclos naturais',
      'Integridade',
      'Sustentabilidade'
    ],
    color: 'text-green-600 dark:text-green-400'
  }
] as const;

export const PILLAR_ICONS = {
  MISSION: '🎯',
  VISION: '✨',
  VALUES: '💎'
} as const;

export const PILLAR_COLORS = {
  MISSION: 'text-blue-600 dark:text-blue-400',
  VISION: 'text-purple-600 dark:text-purple-400',
  VALUES: 'text-green-600 dark:text-green-400'
} as const;
