import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/auth';

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('authUser', JSON.stringify(result));
        }
      }));
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

  getUserRole() {
    if (this.isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem('authUser')!);
      return user.role;
    }
    return null;
  }
  
}
