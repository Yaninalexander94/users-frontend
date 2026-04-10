import { HttpClient, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Injector, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { appInitializerFactory, HttpLoaderFactory } from '../main';
import { USERS_REDUCER, USERS_REDUCER_NODE } from '../widgets';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler,
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
    importProvidersFrom(
      StoreModule.forRoot({}, {}),
      StoreModule.forFeature(USERS_REDUCER_NODE, USERS_REDUCER),
      StoreDevtoolsModule.instrument({maxAge: 25}),
    ),
  ],
};
