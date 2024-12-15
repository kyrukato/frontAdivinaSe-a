import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { necesitaNombreGuard } from './necesita-nombre.guard';

describe('necesitaNombreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => necesitaNombreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
