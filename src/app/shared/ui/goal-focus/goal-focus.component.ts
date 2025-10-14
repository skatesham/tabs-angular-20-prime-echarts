import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'p-goal-focus',
  standalone: true,
  imports: [FormsModule, AnimateOnScrollModule],
  templateUrl: './goal-focus.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalFocusComponent {
  readonly goal = signal('Aumentar produtividade e entregar projetos com qualidade');
  readonly focus = signal('Focar em tarefas prioritárias e eliminar distrações');
  
  readonly editingGoal = signal(false);
  readonly editingFocus = signal(false);
  
  readonly tempGoal = signal('');
  readonly tempFocus = signal('');

  startEditGoal() {
    this.tempGoal.set(this.goal());
    this.editingGoal.set(true);
  }

  saveGoal() {
    if (this.tempGoal().trim().length > 0) {
      this.goal.set(this.tempGoal());
    }
    this.editingGoal.set(false);
  }

  cancelEditGoal() {
    this.editingGoal.set(false);
  }

  startEditFocus() {
    this.tempFocus.set(this.focus());
    this.editingFocus.set(true);
  }

  saveFocus() {
    if (this.tempFocus().trim().length > 0) {
      this.focus.set(this.tempFocus());
    }
    this.editingFocus.set(false);
  }

  cancelEditFocus() {
    this.editingFocus.set(false);
  }
}
