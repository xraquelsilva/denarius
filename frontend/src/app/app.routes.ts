import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModuleCardComponent } from './shared/module-card/module-card.component';
import { HomeModulesComponent } from './pages/home-modules/home-modules.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { RecompensasComponent } from './pages/recompensas/recompensas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopicsModuleComponent } from './shared/topics-module/topics-module.component';
import { DetailModuleComponent } from './shared/detail-module/detail-module.component';
import { QuizModuleComponent } from './shared/quiz-module/quiz-module.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'card', component: ModuleCardComponent },
  { path: 'modulos', component: HomeModulesComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'recompensas', component: RecompensasComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'modulo-resumo', component: TopicsModuleComponent},
  { path: 'modulo-detalhes', component: DetailModuleComponent },
  { path: 'modulo-quiz', component: QuizModuleComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule {}
