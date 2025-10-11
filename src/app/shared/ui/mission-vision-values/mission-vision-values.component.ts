import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

interface Pillar {
  icon: string;
  title: string;
  description?: string;
  values?: string[];
  color: string;
}

@Component({
  selector: 'p-mission-vision-values',
  standalone: true,
  imports: [CardModule],
  templateUrl: './mission-vision-values.component.html',
  styleUrls: ['./mission-vision-values.component.css']
})
export class MissionVisionValuesComponent {
  readonly pillars = signal<Pillar[]>([]);

  private readonly defaultPillars: Pillar[] = [
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
  ];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mission-vision-values');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.pillars.set(data);
      } catch {
        this.setDefaults();
      }
    } else {
      this.setDefaults();
    }
  }

  private setDefaults() {
    this.pillars.set(this.defaultPillars);
    localStorage.setItem('mission-vision-values', JSON.stringify(this.defaultPillars));
  }
}
