import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

interface WeekDay {
  index: number;
  name: string;
  theme: string;
  icon: string;
}

@Component({
  selector: 'p-welcome-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './welcome-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCardComponent {
  private readonly now = signal(new Date());

  readonly weekDays: WeekDay[] = [
    { index: 0, name: 'Dom', theme: 'Renovação', icon: '🌅' },
    { index: 1, name: 'Seg', theme: 'Planejamento', icon: '📋' },
    { index: 2, name: 'Ter', theme: 'Experimentação', icon: '🎨' },
    { index: 3, name: 'Qua', theme: 'Fluxo Criativo', icon: '⚡' },
    { index: 4, name: 'Qui', theme: 'Refinamento', icon: '✨' },
    { index: 5, name: 'Sex', theme: 'Síntese', icon: '🎉' },
    { index: 6, name: 'Sáb', theme: 'Conexão', icon: '🌿' }
  ];

  // Atualiza o horário a cada minuto
  constructor() {
    setInterval(() => this.now.set(new Date()), 60000);
  }

  get currentDayIndex() {
    return this.now().getDay();
  }

  get orderedWeekDays() {
    const currentIndex = this.currentDayIndex;
    // Reorganiza array para começar com o dia atual
    return [
      ...this.weekDays.slice(currentIndex),
      ...this.weekDays.slice(0, currentIndex)
    ];
  }

  get greeting() {
    const hour = this.now().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  get dayOfWeek() {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[this.now().getDay()];
  }

  get dayTheme() {
    const themes = [
      { name: 'Recarga', description: 'Energia se renova, possibilidades se expandem', icon: '🌙' },
      { name: 'Impulso', description: 'Movimento inicial que cria momentum infinito', icon: '🚀' },
      { name: 'Foco', description: 'Atenção concentrada manifesta realidades', icon: '⚛️' },
      { name: 'Revisão', description: 'Observar transforma o que está em potencial', icon: '🔮' },
      { name: 'Execução', description: 'Ação colapsa ondas em resultados tangíveis', icon: '💫' },
      { name: 'Colheita', description: 'Reconhecer conquistas amplifica frequências', icon: '✨' },
      { name: 'Reflexão', description: 'Consciência expande o campo de possibilidades', icon: '🌌' }
    ];
    return themes[this.now().getDay()];
  }

  get formattedDate() {
    const date = this.now();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
