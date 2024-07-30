import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const loginGuard: CanActivateFn = () => {
  if (inject(AuthService).isLoggedIn()) {
    return false;
  } else {
    return true;
  }
};
