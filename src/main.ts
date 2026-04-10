import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { App } from './app/app';
import { appConfig } from './app/app.config';

/**
 * Модуль загрузки переводов
 */
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', `.json?version=${ crypto.randomUUID() }`);
}

/**
 * Модуль загрузки переводов
 */
export function appInitializerFactory(translate: TranslateService, injector: Injector): () => Promise<void> {
  return (): Promise<void> =>
    injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => firstValueFrom(translate.use('ru')));
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
