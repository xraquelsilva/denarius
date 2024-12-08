import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModuleCardComponent } from './shared/module-card/module-card.component';
import { HomeModulesComponent } from './pages/home-modules/home-modules.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'card', component: ModuleCardComponent },
  { path: 'modulos', component: HomeModulesComponent },
];
