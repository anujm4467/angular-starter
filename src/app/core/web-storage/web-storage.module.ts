import { NgModule } from '@angular/core';

import {
  WEB_STORAGE_CONFIGURATION,
  defaultWebStorageConfig
} from './web-storage.config';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  providers: [
    {
      provide: WEB_STORAGE_CONFIGURATION,
      useValue: defaultWebStorageConfig
    },
    LocalStorageService
  ]
})
export class WebStorageModule { }
