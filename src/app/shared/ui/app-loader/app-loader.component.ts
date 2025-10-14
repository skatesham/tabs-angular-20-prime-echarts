import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AudioService } from '../../../core/services/audio.service';
import { AUDIO_PATHS } from '../../../core/constants/audio-paths';

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
  private audioElement: HTMLAudioElement | null = null;
  
  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    // Pré-carrega o áudio
    this.audioElement = new Audio(AUDIO_PATHS.BELLS);
    this.audioElement.volume = 0.7;
    this.audioElement.load();
    
    // Tenta autoplay após um pequeno delay
    setTimeout(() => {
      this.tryAutoplaySound();
    }, 100);
  }

  private async tryAutoplaySound(): Promise<void> {
    if (!this.audioElement) return;
    
    try {
      await this.audioElement.play();
      this.soundPlaying.set(true);
      this.showSoundButton.set(false);
      console.log('✅ Áudio tocando automaticamente');
    } catch (error) {
      // Autoplay bloqueado - mostrar botão para mobile
      console.log('🔇 Autoplay bloqueado - mostrando botão de som');
      this.showSoundButton.set(true);
    }
  }

  async activateSound(): Promise<void> {
    if (!this.audioElement) {
      this.audioElement = new Audio(AUDIO_PATHS.BELLS);
      this.audioElement.volume = 0.7;
    }
    
    try {
      // Reseta o áudio se já foi tocado
      this.audioElement.currentTime = 0;
      await this.audioElement.play();
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
