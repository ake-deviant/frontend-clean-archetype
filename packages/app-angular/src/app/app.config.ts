import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CORE_PROVIDERS } from './di/app.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    ...CORE_PROVIDERS,
  ],
};
