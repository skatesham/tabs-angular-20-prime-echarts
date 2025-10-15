import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

// PRIME NG
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ManaVitaePreset } from './theme/mana-vitae.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ManaVitaePreset,
        options: {
          darkModeSelector: 'system'
        }
      }
    })
  ]
};
