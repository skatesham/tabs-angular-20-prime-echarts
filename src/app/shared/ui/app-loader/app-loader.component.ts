import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'p-app-loader',
  standalone: true,
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoaderComponent implements OnInit {
  readonly showSoundButton = signal(false);
  readonly soundPlaying = signal(false);
  
  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    // Tenta autoplay após um pequeno delay
    setTimeout(() => {
      this.tryAutoplaySound();
    }, 100);
  }

  private async tryAutoplaySound(): Promise<void> {
    try {
      console.log('🔊 Tentando autoplay...');
      await this.audioService.playRitualSound();
      this.soundPlaying.set(true);
      this.showSoundButton.set(false);
      console.log('✅ Áudio tocando automaticamente');
    } catch (error) {
      // Autoplay bloqueado - mostrar botão para mobile
      console.log('🔇 Autoplay bloqueado - mostrando botão de som', error);
      this.showSoundButton.set(true);
      this.soundPlaying.set(false);
    }
  }

  async activateSound(): Promise<void> {
    try {
      await this.audioService.playRitualSound();
      this.soundPlaying.set(true);
      this.showSoundButton.set(false);
      console.log('✅ Áudio ativado pelo usuário');
    } catch (error) {
      console.error('❌ Erro ao tocar áudio:', error);
      // Mantém o botão visível se falhar
      this.showSoundButton.set(true);
    }
  }
}
