import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { DailyTasksService, type Task } from '../../../core/services/daily-tasks.service';

@Component({
  selector: 'p-daily-tasks',
  standalone: true,
  imports: [CardModule, CheckboxModule, ProgressBarModule, FormsModule],
  templateUrl: './daily-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyTasksComponent {
  private readonly tasksService = inject(DailyTasksService);
  readonly progressChanged = output<{ completed: number; total: number }>();
  
  readonly tasks = signal<Task[]>([]);
  private isInitialized = false;

  constructor() {
    this.tasks.set(this.tasksService.loadTasks());
    this.isInitialized = true;
    this.checkDayChange();
    
    effect(() => {
      const tasks = this.tasks();
      
      if (this.isInitialized) {
        this.tasksService.saveTasks(tasks);
      }
      
      this.progressChanged.emit({
        completed: this.completedCount,
        total: this.totalCount
      });
    });
  }

  private checkDayChange() {
    setInterval(() => {
      this.tasks.set(this.tasksService.loadTasks());
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

  onTaskChange() {
    // Força atualização do signal para disparar o effect
    this.tasks.set([...this.tasks()]);
  }
}
