import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AnalisiService } from '../services/analisi.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Analisi {
  id: number;
  esito_buono: boolean;
  tipo: string; 
  data_ora: string;
  paziente: string;
  medico: string; 
}

@Component({
  selector: 'app-analisi-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule
  ],
  templateUrl: './analisi-management.component.html',
  styleUrl: './analisi-management.component.scss'
})
export class AnalisiManagementComponent implements OnInit {
  analisiList: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['dataOra', 'tipo', 'esitoBuono', 'paziente', 'actions'];
  analisiForm: FormGroup;
  selectedAnalisi: any | null = null;

  constructor(
    private analisiService: AnalisiService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.analisiForm = this.fb.group({
      id: [''],
      tipo: ['', Validators.required],
      dataOra: ['', Validators.required],
      esitoBuono: ['', Validators.required],
      pazienteId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAnalisi();
  }

  loadAnalisi(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const medicoId = currentUser.id;
      this.analisiService.getAnalisiByMedicoId(medicoId).subscribe((data: any[]) => {
        this.analisiList.data = data;
      });
    } else {
      console.error('Current user is null or does not have an id');
    }
  }

  selectAnalisi(analisi: any): void {
    this.selectedAnalisi = analisi;
    this.analisiForm.patchValue({
      id: analisi.id,
      tipo: analisi.tipo,
      dataOra: analisi.dataOra,
      esitoBuono: analisi.esitoBuono,
      pazienteId: analisi.paziente.id
    });
  }

  clearSelection(): void {
    this.selectedAnalisi = null;
    this.analisiForm.reset();
  }

  saveAnalisi(): void {
    if (this.analisiForm.valid) {
      if (this.selectedAnalisi) {
        this.analisiService.updateAnalisi(this.selectedAnalisi.id, this.analisiForm.value).subscribe(() => {
          this.loadAnalisi();
          this.clearSelection();
        });
      } else {
        this.analisiService.addAnalisi(this.analisiForm.value).subscribe(() => {
          this.loadAnalisi();
          this.clearSelection();
        });
      }
    }
  }

  deleteAnalisi(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa analisi?')) {
      this.analisiService.deleteAnalisi(id).subscribe(() => {
        this.loadAnalisi();
      });
    }
  }
}
