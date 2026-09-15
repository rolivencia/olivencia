import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Analytics } from './providers/analytics';

function initializeAnalytics() {
  return async () => {
    if (!environment.production) {
      return;
    }

    const analytics = inject(Analytics);
    await analytics.init();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Initializers
    provideAppInitializer(initializeAnalytics()),
  ],
};
