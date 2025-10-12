import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WEEK_DAYS, type WeekDay } from '../../../config/rituals';
import { QUANTUM_MESSAGES } from '../../../config/content';
import { DateUtils } from '../../utils/date.utils';

@Component({
  selector: 'p-welcome-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './welcome-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCardComponent {
  private readonly now = signal(new Date());

  // Usa constantes imutáveis do /data
  readonly weekDays = WEEK_DAYS;

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
    return DateUtils.getGreeting(this.now().getHours());
  }

  get dayOfWeek() {
    return DateUtils.getDayName(this.now().getDay());
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
    return DateUtils.formatDisplayDate(this.now());
  }

  get quantumMessage() {
    const hour = this.now().getHours();
    const dayIndex = this.now().getDay();
    const timeIndex = DateUtils.getTimeOfDayIndex(hour);
    return QUANTUM_MESSAGES[dayIndex][timeIndex];
  }
}
