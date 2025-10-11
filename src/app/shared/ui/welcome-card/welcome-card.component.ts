import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'p-welcome-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './welcome-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCardComponent {
  private readonly now = signal(new Date());

  // Atualiza o horário a cada minuto
  constructor() {
    setInterval(() => this.now.set(new Date()), 60000);
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
