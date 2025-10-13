import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { StorageService } from '../../../../core/services/storage.service';
import { STORAGE_KEY_QUANTUM_ACTIVITIES } from '../../../../config/storage';

@Component({
  selector: 'f-tabs-ritual-weekly-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-weekly.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualWeeklyPage {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);
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
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_ACTIVITIES) || {};
    data['weekly'] = Date.now();
    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, data);
    this.router.navigate(['/tabs/ideas']);
  }
}
