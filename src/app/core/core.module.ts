import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer, DefaultRouterStateSerializer } from '@ngrx/router-store';

import { environment } from '@app/env';
import { reducers, metaReducers } from './store';
import { CustomRouterStateSerializer } from './router';
import { AppSettingsEffects } from './store/app-settings';
import {
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  RetryHttpRequestInterceptor
} from './http';
import { LoggerService, /* SentryService */ } from './logger';
import { AppErrorHandler } from './exception';

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
      },
    }),
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      name: 'angular-starter-app'
    }),
    EffectsModule.forRoot([
      AppSettingsEffects
    ])
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RetryHttpRequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
        { provide: LoggerService, useClass: LoggerService },
        { provide: ErrorHandler, useClass: AppErrorHandler }
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
