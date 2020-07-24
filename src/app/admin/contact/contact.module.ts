import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DialogModule } from '@app/shared/dialog';
import { NotificationModule } from '@app/shared/notification';
import { ContactRoutingModule } from './contact.routing.module';
import { featureKey } from './contact.config';
import { reducer } from './reducers';
import { EFFECTS } from './effects';
import { SERVICES } from './services';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

const MAT_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(EFFECTS),
    TranslateModule.forChild(),
    PerfectScrollbarModule,
    MAT_MODULES,
    FlexLayoutModule,
    DialogModule,
    NotificationModule,
    ContactRoutingModule
  ],
  declarations: [
    CONTAINERS,
    COMPONENTS
  ],
  providers: [SERVICES]
})
export class ContactModule {
}
