import { CanActivateFn } from '@angular/router';
import { JwtPayload } from 'jwt-decode';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const user: JwtPayload | null = inject(AuthService).getCurrentUser();
    if (user !== null) {
      return true;
    } else {
      return false;
    }
};
