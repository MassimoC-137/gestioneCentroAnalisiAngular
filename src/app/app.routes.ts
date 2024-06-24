import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { DetailutenteComponent } from './detailutente/detailutente.component';
import { ListaanalisiComponent } from './listaanalisi/listaanalisi.component';
import { DetailanalisiComponent } from './detailanalisi/detailanalisi.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { authGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DettagliComponent } from './dettagli/dettagli.component';
import { PostLoginComponent } from './post-login/post-login.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'post-login', component: PostLoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dettagli', component: DettagliComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin-dashboard/user-management', component: UserManagementComponent, canActivate: [authGuard] },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [authGuard] },
  { path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [authGuard] },
  { path: 'detailutente', component: DetailutenteComponent, canActivate: [authGuard] },
  { path: 'listaanalisi', component: ListaanalisiComponent, canActivate: [authGuard] },
  { path: 'detailanalisi', component: DetailanalisiComponent, canActivate: [authGuard] },
  { path: '**', component: ErrorpageComponent }
];