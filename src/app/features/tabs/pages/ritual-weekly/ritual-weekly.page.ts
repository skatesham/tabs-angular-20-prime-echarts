import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'f-tabs-ritual-weekly-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-weekly.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualWeeklyPage {
  private readonly router = inject(Router);
  readonly stepsCompleted = signal<boolean[]>([false, false, false, false, false, false]);
  readonly showTroubleshooting = signal(false);

  readonly completedSteps = computed(() => 
    this.stepsCompleted().filter(step => step).length
  );

  readonly progressPercentage = computed(() => 
    (this.completedSteps() / 6) * 100
  );

  toggleStep(index: number) {
    const current = this.stepsCompleted();
    current[index] = !current[index];
    this.stepsCompleted.set([...current]);
  }

  toggleTroubleshooting() {
    this.showTroubleshooting.update(v => !v);
  }

  completeRitual() {
    const stored = localStorage.getItem('quantum-activities');
    const data = stored ? JSON.parse(stored) : {};
    data['weekly'] = Date.now();
    localStorage.setItem('quantum-activities', JSON.stringify(data));
    this.router.navigate(['/tabs/ideas']);
  }
}
