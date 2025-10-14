import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { StorageService } from '../../../../core/services/storage.service';
import { AudioService } from '../../../../core/services/audio.service';
import { STORAGE_KEY_QUANTUM_ACTIVITIES } from '../../../../config/storage';

@Component({
  selector: 'f-tabs-ritual-monthly-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-monthly.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualMonthlyPage implements OnInit {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);
  private readonly audioService = inject(AudioService);
  readonly stepsCompleted = signal<boolean[]>([false, false, false, false, false, false, false, false, false]);
  readonly showTroubleshooting = signal(false);

  private readonly poems = [
    {
      text: "A pintura é uma poesia que se vê e não se ouve; a poesia é uma pintura que se ouve e não se vê.",
      author: "Leonardo da Vinci"
    },
    {
      text: "O essencial é invisível aos olhos. Só se vê bem com o coração.",
      author: "Antoine de Saint-Exupéry"
    },
    {
      text: "Não é sobre ter tempo. É sobre fazer tempo.",
      author: "Provérbio"
    },
    {
      text: "A criatividade é a inteligência se divertindo.",
      author: "Albert Einstein"
    },
    {
      text: "Cada dia é uma nova oportunidade de criar algo único e especial.",
      author: "Sabedoria Artesã"
    },
    {
      text: "As mãos que criam também curam. A arte é medicina para a alma.",
      author: "Provérbio Ancestral"
    }
  ];

  readonly randomPoem = this.poems[Math.floor(Math.random() * this.poems.length)];
  readonly monthlyFocus = signal('');
  readonly monthlyGoal = signal('');
  readonly previousFocus = signal<string | null>(null);
  readonly previousGoal = signal<string | null>(null);

  constructor() {
    this.loadPreviousData();
  }

  ngOnInit(): void {
    // Toca som ao entrar na página do ritual
    this.audioService.playRitualSound();
  }

  private loadPreviousData() {
    const data = this.storage.getItem<Record<string, any>>(STORAGE_KEY_QUANTUM_ACTIVITIES);
    if (data && data['monthly'] && typeof data['monthly'] === 'object') {
      this.previousFocus.set(data['monthly'].focus || null);
      this.previousGoal.set(data['monthly'].goal || null);
    }
  }

  readonly completedSteps = computed(() => 
    this.stepsCompleted().filter(step => step).length
  );

  get canComplete() {
    return this.monthlyFocus().trim().length > 0 && this.monthlyGoal().trim().length > 0;
  }

  readonly progressPercentage = computed(() => 
    (this.completedSteps() / 9) * 100
  );

  toggleStep(index: number) {
    const current = this.stepsCompleted();
    current[index] = !current[index];
    this.stepsCompleted.set([...current]);
  }

  toggleTroubleshooting() {
    this.showTroubleshooting.update(v => !v);
  }

  usePreviousData() {
    if (this.previousFocus()) {
      this.monthlyFocus.set(this.previousFocus()!);
    }
    if (this.previousGoal()) {
      this.monthlyGoal.set(this.previousGoal()!);
    }
  }

  completeRitual() {
    if (!this.canComplete) return;

    // Toca som ao completar o ritual (não aguarda)
    this.audioService.playRitualSound();

    const data = this.storage.getItem<Record<string, any>>(STORAGE_KEY_QUANTUM_ACTIVITIES) || {};
    data['monthly'] = {
      timestamp: Date.now(),
      focus: this.monthlyFocus(),
      goal: this.monthlyGoal()
    };
    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, data);
    this.router.navigate(['/tabs/home']);
  }
}
