import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post-login',
  standalone: true,
  imports: [],
  templateUrl: './post-login.component.html',
  styleUrl: './post-login.component.scss'
})
export class PostLoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'ROLE_CLASSIC_PATIENT') {
      this.router.navigate(['/patient-dashboard']);
    } else if (role === 'ROLE_CLASSIC_DOCTOR') {
      this.router.navigate(['/doctor-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
