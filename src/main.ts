import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig). 
catch(err => console.error(err));