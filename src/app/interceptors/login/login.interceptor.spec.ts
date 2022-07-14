import { TestBed } from '@angular/core/testing';

import { LoginInterceptor } from './login.interceptor';

describe('LoginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginInterceptor = TestBed.get(LoginInterceptor);
    expect(service).toBeTruthy();
  });
});
