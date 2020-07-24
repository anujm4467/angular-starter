import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth.effect';
import { AuthService } from '../services';
import { Credential, AuthToken } from '../models';
import { LoginPageActions, AuthApiActions } from '../actions';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions$: Observable<any>;
  let routerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: { login: () => { } },
        },
        {
          provide: Router,
          useValue: { navigate: () => { } },
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => { }
          }
        }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    actions$ = TestBed.inject(Actions);
    routerService = TestBed.inject(Router);

    spyOn(routerService, 'navigate').and.callThrough();
  });

  describe('login$', () => {
    it('should return an loginSuccess action, with user information if login succeeds', () => {
      const credential: Credential = { username: 'test', password: '' };
      const authToken: AuthToken = new AuthToken('', 6000);
      const action = LoginPageActions.login({ credential });
      const completion = AuthApiActions.loginSuccess({ authToken });
      const response = cold('-a|', { a: authToken });
      const expected = cold('--b', { b: completion });

      spyOn(authService, 'login').and.returnValue(response);

      actions$ = hot('-a---', { a: action });

      expect(effects.login$).toBeObservable(expected);
    });
  });

});
