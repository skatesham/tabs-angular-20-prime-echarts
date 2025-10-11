import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'p-goal-focus',
  standalone: true,
  imports: [CardModule],
  templateUrl: './goal-focus.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalFocusComponent {
  readonly goal = signal('Aumentar produtividade e entregar projetos com qualidade');
  readonly focus = signal('Focar em tarefas prioritárias e eliminar distrações');
}
