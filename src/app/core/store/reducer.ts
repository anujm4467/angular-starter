import { ActionReducerMap, MetaReducer, Action } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment as env } from '@app/env';
import { RouterStateModel } from '../router';
import { logger, localStorageSyncReducer } from './meta-reducers';
import { AppSettingsState, appSettingsReducer } from './app-settings';

export interface AppState {
  router: RouterReducerState<RouterStateModel>;
  appSettings: AppSettingsState;
}

export const reducers: ActionReducerMap<AppState, Action> = {
  router: routerReducer,
  appSettings: appSettingsReducer
};

export const metaReducers: Array<MetaReducer<AppState>> = !env.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];
