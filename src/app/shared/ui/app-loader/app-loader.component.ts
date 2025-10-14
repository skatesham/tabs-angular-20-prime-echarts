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
  
  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.tryAutoplaySound();
  }

  private async tryAutoplaySound(): Promise<void> {
    try {
      await this.audioService.playAudio(AUDIO_PATHS.BELLS);
      this.soundPlaying.set(true);
    } catch (error) {
      // Autoplay bloqueado - mostrar botão para mobile
      console.log('Autoplay bloqueado - mostrando botão de som');
      this.showSoundButton.set(true);
    }
  }

  async activateSound(): Promise<void> {
    try {
      await this.audioService.playAudio(AUDIO_PATHS.BELLS);
      this.soundPlaying.set(true);
      this.showSoundButton.set(false);
    } catch (error) {
      console.error('Error playing bell sound:', error);
    }
  }
}
