import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component'
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    { path: 'home', canActivate: [authGuard], component: HomeComponent},
    { path: 'login', canActivate: [loginGuard],component: LoginComponent}
];
