import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  readonly tasks = signal<Task[]>([
    { id: 1, label: 'Revisar e-mails prioritários', completed: false },
    { id: 2, label: 'Planejar tarefas do dia', completed: false },
    { id: 3, label: 'Fazer pausa para alongamento', completed: false },
    { id: 4, label: 'Revisar progresso de projetos', completed: false },
    { id: 5, label: 'Organizar workspace e documentos', completed: false },
  ]);

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
