import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const user: JwtPayload | null = this.authService.getCurrentUser();
    if (user !== null) {
      console.log('Dentro il blocco if');
      this.router.navigateByUrl('/post-login')
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
