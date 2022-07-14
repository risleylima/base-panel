import { TestBed } from '@angular/core/testing';

import { RefreshTokenInterceptor } from './refresh-token.interceptor';

describe('RefreshTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshTokenInterceptor = TestBed.get(RefreshTokenInterceptor);
    expect(service).toBeTruthy();
  });
});
