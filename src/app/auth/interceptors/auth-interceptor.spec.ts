import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthInterceptor } from './auth-interceptor';
import { AUTH_CONFIGURATION, AuthConfiguration } from '../auth.config';

describe('AuthInterceptor', () => {
  const authConfiguration: AuthConfiguration = {
    loginURL: 'login',
    loginApiURL: 'api/auth/login'
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthInterceptor,
        provideMockStore({}),
        { provide: AUTH_CONFIGURATION, useValue: authConfiguration }
      ]
    });
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);

    expect(interceptor).toBeTruthy();
  });

});
