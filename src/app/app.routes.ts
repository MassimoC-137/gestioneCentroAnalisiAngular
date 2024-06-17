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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PostLoginComponent } from './post-login/post-login.component';
import { UserManagementComponent } from './user-management/user-management.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard/user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'detailutente', component: DetailutenteComponent, canActivate: [AuthGuard] },
  { path: 'listaanalisi', component: ListaanalisiComponent, canActivate: [AuthGuard] },
  { path: 'detailanalisi', component: DetailanalisiComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorpageComponent }
];