import { provideRouter, RouterModule, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { DetailutenteComponent } from './detailutente/detailutente.component';
import { ListaanalisiComponent } from './listaanalisi/listaanalisi.component';
import { DetailanalisiComponent } from './detailanalisi/detailanalisi.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'detailutente', component: DetailutenteComponent, canActivate: [AuthGuard] },
  { path: 'listaanalisi', component: ListaanalisiComponent, canActivate: [AuthGuard] },
  { path: 'detailanalisi', component: DetailanalisiComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorpageComponent }
];