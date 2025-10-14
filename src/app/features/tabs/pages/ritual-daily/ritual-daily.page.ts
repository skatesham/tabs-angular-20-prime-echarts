import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { StorageService } from '../../../../core/services/storage.service';
import { AudioService } from '../../../../core/services/audio.service';
import { STORAGE_KEY_QUANTUM_ACTIVITIES } from '../../../../config/storage';

@Component({
  selector: 'f-tabs-ritual-daily-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './ritual-daily.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RitualDailyPage implements OnInit {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);
  private readonly audioService = inject(AudioService);

  ngOnInit(): void {
    // Toca som ao entrar na página do ritual
    this.audioService.playRitualSound().catch(() => {
      // Ignora erro de autoplay bloqueado
    });
  }

  completeRitual() {
    // Toca som ao completar o ritual (não aguarda)
    this.audioService.playRitualSound().catch(() => {
      // Ignora erro se som não puder tocar
    });
    
    // Salva conclusão no storage usando o service
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_ACTIVITIES) || {};
    data['daily'] = Date.now();
    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, data);

    // Navega para a home
    this.router.navigate(['/tabs/home']);
  }
}
