import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.playBellSound();
  }

  private async playBellSound(): Promise<void> {
    try {
      await this.audioService.playAudio(AUDIO_PATHS.BELLS);
    } catch (error) {
      console.error('Error playing bell sound:', error);
    }
  }
}
