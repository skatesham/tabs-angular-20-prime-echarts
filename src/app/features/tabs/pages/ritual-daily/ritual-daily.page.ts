import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/ui/page-header/page-header.component';
import { StorageService } from '../../../../core/services/storage.service';
import { AudioService } from '../../../../core/services/audio.service';
import { AUDIO_PATHS } from '../../../../core/constants/audio-paths';
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
    this.playRitualSound();
  }

  private async playRitualSound(): Promise<void> {
    try {
      const baseUrl = document.baseURI;
      const audioUrl = new URL(AUDIO_PATHS.BELLS, baseUrl).href;
      await this.audioService.playAudio(audioUrl);
    } catch (error) {
      console.log('Som não pôde ser reproduzido:', error);
    }
  }

  completeRitual() {
    // Toca som ao completar o ritual (não aguarda)
    this.playRitualSound();
    
    // Salva conclusão no storage usando o service
    const data = this.storage.getItem<Record<string, number>>(STORAGE_KEY_QUANTUM_ACTIVITIES) || {};
    data['daily'] = Date.now();
    this.storage.setItem(STORAGE_KEY_QUANTUM_ACTIVITIES, data);

    // Navega de volta para a página de rituais
    this.router.navigate(['/tabs/ideas']);
  }
}
