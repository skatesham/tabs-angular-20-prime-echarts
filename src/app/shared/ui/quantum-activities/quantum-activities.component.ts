import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { QUANTUM_ACTIVITIES, ZEN_MESSAGES, type ActivityTemplate } from '../../../data/constants';
import { QuantumActivitiesService } from '../../../core/services/quantum-activities.service';

@Component({
  selector: 'p-quantum-activities',
  standalone: true,
  imports: [CardModule, NgClass],
  templateUrl: './quantum-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumActivitiesComponent {
  private readonly router = inject(Router);
  private readonly activitiesService = inject(QuantumActivitiesService);
  private readonly now = signal(new Date());
  
  readonly showAll = input<boolean>(false);
  readonly activities = QUANTUM_ACTIVITIES;
  readonly completedActivities = signal<Set<string>>(this.activitiesService.loadCompletedActivities(this.now()));
  readonly monthlyFocus = signal<string | null>(null);
  readonly monthlyGoal = signal<string | null>(null);

  constructor() {
    const monthlyData = this.activitiesService.loadMonthlyData();
    this.monthlyFocus.set(monthlyData.focus);
    this.monthlyGoal.set(monthlyData.goal);
    
    setInterval(() => this.now.set(new Date()), 60000);
    
    effect(() => {
      this.now();
      this.completedActivities.set(this.activitiesService.checkAndResetActivities(this.now()));
    });
  }

  get visibleActivities() {
    // Se showAll = true, mostra todas as atividades (modo Ideas)
    // Se showAll = false, mostra apenas as não concluídas (modo Home)
    let visible = this.showAll() 
      ? this.activities 
      : this.activities.filter(activity => !this.isCompleted(activity.id));
    
    // Se não for showAll, inverte a ordem (mais recente primeiro)
    if (!this.showAll()) {
      visible = [...visible].reverse();
    }
    
    // Inicializa pending dates para atividades visíveis
    visible.forEach(activity => {
      this.activitiesService.initializePendingDate(activity.id);
    });
    return visible;
  }

  isCompleted(activityId: string): boolean {
    return this.completedActivities().has(activityId);
  }

  getPendingDays(activityId: string): number {
    return this.activitiesService.getPendingDays(activityId, this.now());
  }

  shouldShowPendingBadge(activityId: string): boolean {
    return !this.isCompleted(activityId) && this.getPendingDays(activityId) > 0;
  }

  get hasOpenActivities(): boolean {
    return this.visibleActivities.length > 0;
  }

  get zenMessage(): string {
    const dayIndex = new Date().getDay();
    return ZEN_MESSAGES[dayIndex % ZEN_MESSAGES.length];
  }

  onActivityClick(activityId: string) {
    // Navega para a página do ritual correspondente
    if (activityId === 'daily') {
      this.router.navigate(['/tabs/ritual-daily']);
    } else if (activityId === 'weekly') {
      this.router.navigate(['/tabs/ritual-weekly']);
    } else if (activityId === 'monthly') {
      this.router.navigate(['/tabs/ritual-monthly']);
    }
  }
}
