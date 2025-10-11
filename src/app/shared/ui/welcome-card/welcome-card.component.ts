import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

interface WeekDay {
  index: number;
  name: string;
  theme: string;
  description: string;
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

  // Única fonte de verdade para os temas dos dias
  readonly weekDays: WeekDay[] = [
    { index: 0, name: 'Dom', theme: 'Renovação', description: 'Energia se renova, possibilidades se expandem', icon: '🌙' },
    { index: 1, name: 'Seg', theme: 'Planejamento', description: 'Movimento inicial que cria momentum infinito', icon: '🚀' },
    { index: 2, name: 'Ter', theme: 'Experimentação', description: 'Atenção concentrada manifesta realidades', icon: '⚛️' },
    { index: 3, name: 'Qua', theme: 'Fluxo Criativo', description: 'Observar transforma o que está em potencial', icon: '🔮' },
    { index: 4, name: 'Qui', theme: 'Refinamento', description: 'Ação colapsa ondas em resultados tangíveis', icon: '💫' },
    { index: 5, name: 'Sex', theme: 'Síntese', description: 'Reconhecer conquistas amplifica frequências', icon: '✨' },
    { index: 6, name: 'Sáb', theme: 'Conexão', description: 'Consciência expande o campo de possibilidades', icon: '🌌' }
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
    // Reutiliza weekDays como fonte única de verdade
    const currentDay = this.weekDays[this.now().getDay()];
    return {
      name: currentDay.theme,
      description: currentDay.description,
      icon: currentDay.icon
    };
  }

  get formattedDate() {
    const date = this.now();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
