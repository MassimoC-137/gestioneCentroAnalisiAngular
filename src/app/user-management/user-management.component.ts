import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  private httpClient = inject(HttpClient);
  users: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'email', 'actions'];
  private baseUrl = 'http://localhost:4200/api/users';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.httpClient.get<User[]>(this.baseUrl).subscribe((data: User[]) => {
      this.users.data = data;
    });
  }

  addUser(): void {
    // Implementa la logica per aggiungere un nuovo utente
    console.log('Aggiungi utente');
  }

  editUser(user: User): void {
    // Implementa la logica per modificare un utente
    console.log('Modifica utente', user);
  }

  deleteUser(id: number): void {
    this.httpClient.delete(`${this.baseUrl}/${id}`).subscribe(() => {
      this.users.data = this.users.data.filter(user => user.id !== id);
    });
  }
}
