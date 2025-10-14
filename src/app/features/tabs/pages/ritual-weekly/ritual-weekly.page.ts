import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { StorageService } from '../../../../core/services/storage.service';
import { AudioService } from '../../../../core/services/audio.service';
import { STORAGE_KEY_QUANTUM_ACTIVITIES } from '../../../../config/storage';

@Component({
  selector: 'f-tabs-ritual-weekly-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-weekly.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualWeeklyPage implements OnInit {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);
  private readonly audioService = inject(AudioService);
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

  ngOnInit(): void {
    // Toca som ao entrar na página do ritual
    this.audioService.playRitualSound();
  }

  completeRitual() {
    // Toca som ao completar o ritual (não aguarda)
    this.audioService.playRitualSound();
    
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_ACTIVITIES) || {};
    data['weekly'] = Date.now();
    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, data);
    this.router.navigate(['/tabs/home']);
  }
}
