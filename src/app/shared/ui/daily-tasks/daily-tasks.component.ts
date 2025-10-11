import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  label: string;
  completed: boolean;
}

@Component({
  selector: 'p-daily-tasks',
  standalone: true,
  imports: [CardModule, CheckboxModule, ProgressBarModule, FormsModule],
  templateUrl: './daily-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyTasksComponent {
  readonly progressChanged = output<{ completed: number; total: number }>();
  
  readonly tasks = signal<Task[]>(this.loadTasks());

  constructor() {
    this.checkDayChange();
    
    // Emite mudanças de progresso
    effect(() => {
      const tasks = this.tasks();
      this.saveTasks(tasks);
      this.progressChanged.emit({
        completed: this.completedCount,
        total: this.totalCount
      });
    });
  }

  private loadTasks(): Task[] {
    const today = this.formatDate(new Date());
    const stored = localStorage.getItem('daily-tasks');
    
    if (!stored) {
      return this.getDefaultTasks();
    }

    try {
      const data = JSON.parse(stored);
      if (data.date === today) {
        return data.tasks;
      }
      // Novo dia, reseta tarefas
      return this.getDefaultTasks();
    } catch {
      return this.getDefaultTasks();
    }
  }

  private saveTasks(tasks: Task[]) {
    const today = this.formatDate(new Date());
    localStorage.setItem('daily-tasks', JSON.stringify({
      date: today,
      tasks
    }));
  }

  private getDefaultTasks(): Task[] {
    return [
      { id: 1, label: 'Revisar e-mails prioritários', completed: false },
      { id: 2, label: 'Planejar tarefas do dia', completed: false },
      { id: 3, label: 'Fazer pausa para alongamento', completed: false },
      { id: 4, label: 'Revisar progresso de projetos', completed: false },
      { id: 5, label: 'Organizar workspace e documentos', completed: false },
    ];
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private checkDayChange() {
    setInterval(() => {
      const today = this.formatDate(new Date());
      const stored = localStorage.getItem('daily-tasks');
      
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.date !== today) {
            this.tasks.set(this.getDefaultTasks());
          }
        } catch {
          // Ignore
        }
      }
    }, 60000);
  }

  get completedCount() {
    return this.tasks().filter(t => t.completed).length;
  }

  get totalCount() {
    return this.tasks().length;
  }

  get progressPercentage() {
    return this.totalCount > 0 ? Math.round((this.completedCount / this.totalCount) * 100) : 0;
  }
}
