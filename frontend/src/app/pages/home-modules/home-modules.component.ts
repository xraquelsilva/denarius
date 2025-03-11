import { Component, OnInit } from '@angular/core';
import { ModuleCardComponent } from '../../shared/module-card/module-card.component';
import { TopNabvbarComponent } from "../../shared/top-nabvbar/top-nabvbar.component";
import { ModalComponent } from '../../shared/modal/modal.component';
import { HomeModuleService } from './home-modules.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-modules',
  imports: [ModuleCardComponent, TopNabvbarComponent, ModalComponent, CommonModule],
  templateUrl: './home-modules.component.html',
  styleUrl: './home-modules.component.scss'
})
export class HomeModulesComponent {
  showBottomNavbar = true;
  modules: any[] = [];
  nameUser: any;

  constructor(private moduleService: HomeModuleService, private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId)
      if (userId) {
        this.http.get(`http://localhost:8000/user/${userId}`).subscribe(
          (user: any) => {
            this.nameUser = user.name;
          },
          (error) => {
            console.error('Erro ao buscar usuário:', error);
          }
        );
    this.moduleService.getModules(userId).subscribe((data) => {
      this.modules = data;
      console.log(this.modules);
      });
    }
  }
}
