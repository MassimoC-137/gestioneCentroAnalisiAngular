import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface ExtendedJwtPayload extends JwtPayload {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  private baseUrl = 'http://localhost:8080/api/auth';

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .subscribe({
        next: (res:any) => {
          localStorage.setItem('authUser', res['jwt.token'])
          this.router.navigateByUrl('/post-login');
        }, 
        error: (err) => {
          console.log("Errore:", err);
          this.router.navigateByUrl('/login');
        }
      });
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authUser');
    }
  }

  isLoggedIn() {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return localStorage.getItem('authUser') !== null;
  }

  getUserRoles() {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem('authUser')!;
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded.roles;
    }
    return null;
  }

  getCurrentUser() {
    if (this.isLoggedIn()) {
      const token = localStorage.getItem('authUser')!;
      return jwtDecode(token);
    }
    return null;
  }
}
