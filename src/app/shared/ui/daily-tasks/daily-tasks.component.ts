import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FormsModule } from '@angular/forms';
import { DailyTasksService, type Task } from '../../../core/services/daily-tasks.service';
import { AudioService } from '../../../core/services/audio.service';
import { AUDIO_PATHS } from '../../../core/constants/audio-paths';

@Component({
  selector: 'p-daily-tasks',
  standalone: true,
  imports: [CardModule, CheckboxModule, ProgressBarModule, FormsModule, AnimateOnScrollModule],
  templateUrl: './daily-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyTasksComponent {
  private readonly tasksService = inject(DailyTasksService);
  private readonly audioService = inject(AudioService);
  readonly progressChanged = output<{ completed: number; total: number }>();
  
  readonly tasks = signal<Task[]>([]);
  private isInitialized = false;
  private previousCompletedCount = 0;

  constructor() {
    this.tasks.set(this.tasksService.loadTasks());
    this.previousCompletedCount = this.completedCount;
    this.isInitialized = true;
    this.checkDayChange();
    
    effect(() => {
      const tasks = this.tasks();
      const currentCompletedCount = this.completedCount;
      
      if (this.isInitialized) {
        this.tasksService.saveTasks(tasks);
        
        // Play bell every 3 completed tasks
        if (currentCompletedCount > this.previousCompletedCount && currentCompletedCount % 3 === 0) {
          this.playBellSound();
        }
        
        this.previousCompletedCount = currentCompletedCount;
      }
      
      this.progressChanged.emit({
        completed: currentCompletedCount,
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

  private async playBellSound(): Promise<void> {
    try {
      await this.audioService.playAudio(AUDIO_PATHS.BELLS);
    } catch (error) {
      // Silently fail if audio is blocked
    }
  }
}
