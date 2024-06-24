import { Component, OnInit, inject } from '@angular/core';
import { AnalisiService } from '../services/analisi.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTable, 
    MatTableModule
  ],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent implements OnInit {
  analisi: any[] = [];
  displayedColumns: string[] = ['data', 'tipo', 'risultato'];
  username: string;
  private router = inject(Router);

  constructor(private analisiService: AnalisiService, private authService: AuthService) {
    const currentUser: any = this.authService.getCurrentUser();
    this.username = currentUser ? currentUser['username'] : null;
  }

  ngOnInit(): void {
    this.loadAnalisi();
  }

  loadAnalisi(): void {
    this.analisiService.getAnalisi().subscribe((data: any[]) => {
      this.analisi = data;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
