import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

interface Activity {
  id: string;
  name: string;
  frequency: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

@Component({
  selector: 'p-quantum-activities',
  standalone: true,
  imports: [CardModule],
  templateUrl: './quantum-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantumActivitiesComponent {
  private readonly router = inject(Router);
  private readonly now = signal(new Date());
  
  // Input para controlar se deve mostrar todas as atividades ou apenas pendentes
  readonly showAll = input<boolean>(false);

  readonly activities: Activity[] = [
    {
      id: 'daily',
      name: 'Ressonância Interna',
      frequency: 'diário',
      icon: '🧘',
      color: 'text-cyan-700 dark:text-cyan-300',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
      borderColor: 'border-cyan-200 dark:border-cyan-800'
    },
    {
      id: 'weekly',
      name: 'Portal da Prosperidade',
      frequency: 'semanal',
      icon: '🌀',
      color: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'monthly',
      name: 'Ciclo da Abundância',
      frequency: 'mensal',
      icon: '🌊',
      color: 'text-indigo-700 dark:text-indigo-300',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    }
  ];

  readonly completedActivities = signal<Set<string>>(this.loadCompletedActivities());
  readonly monthlyFocus = signal<string | null>(null);
  readonly monthlyGoal = signal<string | null>(null);

  // Atualiza a cada minuto para verificar se alguma atividade deve reaparecer
  constructor() {
    this.loadMonthlyData();
    setInterval(() => this.now.set(new Date()), 60000);
    effect(() => {
      this.now();
      this.checkAndResetActivities();
    });
  }

  private loadMonthlyData() {
    const stored = localStorage.getItem('quantum-activities');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data['monthly'] && typeof data['monthly'] === 'object') {
          this.monthlyFocus.set(data['monthly'].focus || null);
          this.monthlyGoal.set(data['monthly'].goal || null);
        }
      } catch {
        // Ignore errors
      }
    }
  }

  get visibleActivities() {
    // Se showAll = true, mostra todas as atividades (modo Ideas)
    // Se showAll = false, mostra apenas as não concluídas (modo Home)
    const visible = this.showAll() 
      ? this.activities 
      : this.activities.filter(activity => !this.isCompleted(activity.id));
    
    // Inicializa pending dates para atividades visíveis
    visible.forEach(activity => {
      const stored = localStorage.getItem('quantum-activities-pending');
      if (!stored || !JSON.parse(stored)[activity.id]) {
        this.initializePendingDate(activity.id);
      }
    });
    return visible;
  }

  private loadCompletedActivities(): Set<string> {
    const stored = localStorage.getItem('quantum-activities');
    if (!stored) return new Set();
    
    try {
      const data = JSON.parse(stored);
      return new Set(Object.keys(data).filter(key => {
        const value = data[key];
        // Se for objeto (novo formato com focus/goal), pega o timestamp
        const timestamp = typeof value === 'object' ? value.timestamp : value;
        return this.isStillValid(key, timestamp);
      }));
    } catch {
      return new Set();
    }
  }

  private isStillValid(activityId: string, timestamp: number): boolean {
    const completed = new Date(timestamp);
    const now = this.now();

    switch (activityId) {
      case 'daily':
        return this.isSameDay(completed, now);
      case 'weekly':
        return this.isSameWeek(completed, now);
      case 'monthly':
        return this.isSameMonth(completed, now);
      default:
        return false;
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  private isSameWeek(date1: Date, date2: Date): boolean {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDayOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    };
    
    const week1 = Math.floor(firstDayOfWeek(new Date(date1)).getTime() / oneDay);
    const week2 = Math.floor(firstDayOfWeek(new Date(date2)).getTime() / oneDay);
    return week1 === week2;
  }

  private isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  private checkAndResetActivities() {
    const stored = localStorage.getItem('quantum-activities');
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      const updated: Record<string, any> = {};
      let hasChanges = false;

      Object.keys(data).forEach(key => {
        const value = data[key];
        const timestamp = typeof value === 'object' ? value.timestamp : value;
        if (this.isStillValid(key, timestamp)) {
          updated[key] = data[key];
        } else {
          hasChanges = true;
        }
      });

      if (hasChanges) {
        localStorage.setItem('quantum-activities', JSON.stringify(updated));
        this.completedActivities.set(new Set(Object.keys(updated)));
      }
    } catch {
      // Ignore errors
    }
  }

  isCompleted(activityId: string): boolean {
    return this.completedActivities().has(activityId);
  }

  getPendingDays(activityId: string): number {
    const stored = localStorage.getItem('quantum-activities-pending');
    if (!stored) {
      this.initializePendingDate(activityId);
      return 0;
    }

    try {
      const data = JSON.parse(stored);
      const pendingDate = data[activityId];
      if (!pendingDate) {
        this.initializePendingDate(activityId);
        return 0;
      }

      const daysDiff = Math.floor((this.now().getTime() - pendingDate) / (1000 * 60 * 60 * 24));
      return Math.max(0, daysDiff);
    } catch {
      return 0;
    }
  }

  // Verifica se deve mostrar o badge de dias pendentes
  shouldShowPendingBadge(activityId: string): boolean {
    // Se a atividade foi concluída, não mostra o badge
    if (this.isCompleted(activityId)) {
      return false;
    }
    // Se não foi concluída, mostra apenas se tiver dias pendentes
    return this.getPendingDays(activityId) > 0;
  }

  private initializePendingDate(activityId: string) {
    const stored = localStorage.getItem('quantum-activities-pending');
    const data = stored ? JSON.parse(stored) : {};
    
    // Se não existe data pendente, salva a data atual
    if (!data[activityId]) {
      // MOCK: Para testar, descomente a linha abaixo e comente a linha seguinte
      // const daysAgo = activityId === 'daily' ? 2 : activityId === 'weekly' ? 5 : 12;
      // data[activityId] = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);
      
      // Produção: salva data atual (0 dias pendentes)
      data[activityId] = Date.now();
    }
    
    localStorage.setItem('quantum-activities-pending', JSON.stringify(data));
    // this.mockPendingDays();
  }

  // MOCK HELPER: Descomente para forçar dias pendentes (útil para testes)
  // Chame no constructor: this.mockPendingDays();
  private mockPendingDays() {
    const mockData = {
      'daily': Date.now() - (3 * 24 * 60 * 60 * 1000),    // 3 dias atrás
      'weekly': Date.now() - (7 * 24 * 60 * 60 * 1000),   // 7 dias atrás
      'monthly': Date.now() - (15 * 24 * 60 * 60 * 1000)  // 15 dias atrás
    };
    localStorage.setItem('quantum-activities-pending', JSON.stringify(mockData));
  }

  get hasOpenActivities(): boolean {
    return this.visibleActivities.length > 0;
  }

  get zenMessage(): string {
    const messages = [
      'O caminho se revela a cada passo',
      'A prática diária cultiva a paz interior',
      'Pequenas ações criam grandes transformações',
      'O presente é o único momento de poder',
      'Cada respiração é uma nova oportunidade'
    ];
    const dayIndex = new Date().getDay();
    return messages[dayIndex % messages.length];
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
