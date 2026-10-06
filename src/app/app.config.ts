import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

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
    // Blocking, so the first client render already knows the route and matches the server HTML
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideClientHydration(withEventReplay()),

    // Initializers
    provideAppInitializer(initializeAnalytics()),
  ],
};
