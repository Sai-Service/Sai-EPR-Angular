import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { AppComponent } from './app.component';
import {  HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ Import this


export const appConfig: ApplicationConfig = {
   providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(), // ✅ Instead of HttpClientModule
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ] 
};
