import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';


interface Role {
  id: number; 
  codice: string;
  descrizione: string;
}

interface User {
  attivo: boolean;
  id: number;
  codice_fiscale: string; 
  cognome: string; 
  nome: string; 
  username: string;
  email: string;
  role: Role;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatPaginatorModule, 
    UserEditComponent,
    ConfirmDialogComponent,
    RouterModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition(':enter', [
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class UserManagementComponent implements OnInit {
  users: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
  selectedUser: User | null = null;
  userForm: FormGroup;
  searchForm: FormGroup;
  private baseUrl = 'http://localhost:8080/api/utente';
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      id: [''],
      attivo: ['',Validators.required],
      codice_fiscale: ['', Validators.required],
      cognome: ['', Validators.required],
      nome: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required], 
      medicoId: ['']
    });

    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users.data = data;
    });
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue(user);
  }

  clearSelection(): void {
    this.selectedUser = null;
    this.userForm.reset();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.selectedUser) {
        this.userService.updateUser(this.selectedUser.id, this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.clearSelection();
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe(() => {
          this.loadUsers();
          this.clearSelection();
        });
      }
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  promoteUser(id: number, roleCode: string): void {
    this.userService.promoteUser(id, roleCode).subscribe(() => {
      this.loadUsers();
    });
  }

  demoteUser(id: number, roleCode: string): void {
    this.userService.demoteUser(id, roleCode).subscribe(() => {
      this.loadUsers();
    });
  }

  searchUsers(): void {
    const searchValue = this.searchForm.get('search')?.value;
    this.userService.searchUsers(searchValue).subscribe(data => {
      this.users.data = data;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /*
  addPazienteToMedico(medicoId: number | undefined, pazienteId: number | undefined): void {
    if (medicoId !== undefined && pazienteId !== undefined) {
      this.userService.addPazienteToMedico(medicoId, pazienteId).subscribe({
        next: () => {
          this.loadUsers();
          this.clearSelection();
          console.log('Paziente collegato con successo al medico.');
        },
        error: (err) => {
          console.error('Errore durante il collegamento del paziente al medico:', err);
        }
      });
    } else {
      
      if (medicoId === undefined) {
        console.error('Invalid medicoId');
      }
      if (pazienteId === undefined) {
        console.error('Invalid pazienteId');
      }
    }
  }
  */

  openConfirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }


  getCodice(ruoli: Role[]): string {
    if (ruoli && ruoli.length > 0) {
      return ruoli.map(ruolo => ruolo.codice).join(', ');
    }
    return 'No Role';
  }

}