import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LocalStorageService } from './app/services/local-storage.service';
import { NgZone } from '@angular/core';

interface color {
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((moduleRef) => {
    const localStorageService = moduleRef.injector.get(LocalStorageService);
    const ngZone = moduleRef.injector.get(NgZone);
    let isLoggedIn = false;
    let initialColorSchema: color = {
      primaryColor: '',
      secondaryColor: '',
      accentColor: '',
    };
    // Get initial color schema

    // Subscribe to color schema changes
    localStorageService.userCredentials$.subscribe((userCredentials) => {
      if (userCredentials) {
        initialColorSchema = userCredentials.colorSchema;
        isLoggedIn = true;

        ngZone.run(() => {
          document.body.style.backgroundColor =
            initialColorSchema.primaryColor || '';
          document.body.style.color = initialColorSchema.accentColor || '';
        });
        // Do something with the updated color schema if needed
      } else {
        initialColorSchema = {
          primaryColor: '#575454',
          secondaryColor: '#b4ff28',
          accentColor: 'black',
        };

        ngZone.run(() => {
          document.body.style.backgroundColor =
            initialColorSchema.primaryColor || '';
          document.body.style.color = initialColorSchema.accentColor || '';
        });
      }
    });

    if (!isLoggedIn) {
      initialColorSchema = {
        primaryColor: '#575454',
        secondaryColor: '#b4ff28',
        accentColor: 'black',
      };

      ngZone.run(() => {
        document.body.style.backgroundColor =
          initialColorSchema.primaryColor || '';
        document.body.style.color = initialColorSchema.accentColor || '';
      });
    }
  })
  .catch((err) => console.error(err));
