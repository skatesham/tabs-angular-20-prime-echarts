/**
 * Centralized audio file paths for the application
 */
export const AUDIO_PATHS = {
  BELLS: '/audios/bells-1-72261.mp3',
  // Add more audio paths here as needed
  // NOTIFICATION: '/audios/notification.mp3',
  // SUCCESS: '/audios/success.mp3',
} as const;

export type AudioPath = typeof AUDIO_PATHS[keyof typeof AUDIO_PATHS];
