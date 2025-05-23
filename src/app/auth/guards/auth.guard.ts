import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    console.log('Access denied. Redirecting to login.');
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
