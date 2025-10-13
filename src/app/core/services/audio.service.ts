import { Injectable } from '@angular/core';
import { AudioPath } from '../constants/audio-paths';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  /**
   * Play an audio file
   * @param audioPath Path to the audio file (relative to public folder)
   * @returns Promise that resolves when audio finishes playing
   */
  async playAudio(audioPath: AudioPath | string): Promise<void> {
    try {
      const audio = new Audio(audioPath);
      audio.volume = 0.7; // Set volume to 70%
      
      return new Promise((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = (error) => reject(error);
        audio.play().catch((error) => {
          console.warn('Audio playback blocked by browser. User interaction required.', error);
          reject(error);
        });
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  }
}
