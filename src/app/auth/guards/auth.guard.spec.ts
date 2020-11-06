import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';
import { AuthState } from '../reducers';
import { AuthSelectors } from '../selectors';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore<AuthState>;
  let isAuthenticated: MemoizedSelector<AuthState, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore()
      ],
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AuthGuard);

    isAuthenticated = store.overrideSelector(AuthSelectors.selectIsAuthenticated, false);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return false if the user state is not authenticated', () => {
      const expected = cold('(a|)', { a: false });

      expect(guard.canActivate()).toBeObservable(expected);
    });

    it('should return true if the user state is authenticated', () => {
      const expected = cold('(a|)', { a: true });
      isAuthenticated.setResult(true);

      expect(guard.canActivate()).toBeObservable(expected);
    });
  });

  describe('canActivateChild', () => {
    it('should return false if the user state is not authenticated', () => {
      const expected = cold('(a|)', { a: false });

      expect(guard.canActivate()).toBeObservable(expected);
    });

    it('should return true if the user state is authenticated', () => {
      const expected = cold('(a|)', { a: true });
      isAuthenticated.setResult(true);

      expect(guard.canActivate()).toBeObservable(expected);
    });
  });

});
