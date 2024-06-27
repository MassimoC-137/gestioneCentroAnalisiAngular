import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  @Input() user: any;
  userForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  userId!: number;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.userId);
    
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.user && this.user.id) {
        this.userService.updateUser(this.user.id, this.userForm.value).subscribe(() => {
          console.log('Utente aggiornato con successo.');
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe(() => {
          console.log('Utente aggiunto con successo.');
        });
      }
    }
  }

  clearSelection(): void {
    this.userForm.reset();
  }

  addPazienteToMedico(medicoId: number | undefined, pazienteId: number | undefined): void {
    if (medicoId !== undefined && pazienteId !== undefined) {
      this.userService.addPazienteToMedico(medicoId, pazienteId).subscribe(() => {
        console.log('Paziente collegato con successo al medico.');
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
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
