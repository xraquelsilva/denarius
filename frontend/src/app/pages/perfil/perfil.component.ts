import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './perfil.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  constructor(private router: Router, private http: HttpClient, private profileService: ProfileService) {}
  nameUser: string = '';
  statusModules: any | null = ['disponivel', 'bloqueado', 'bloqueado']

  ngOnInit() {
    console.log("📌 Iniciando PerfilComponent...");

    setTimeout(() => {
      const userId = localStorage.getItem('userId');
      console.log("📌 userId encontrado:", userId);

      if (userId) {
        this.http.get(`http://localhost:8000/user/${userId}`).subscribe(
          (response: any) => {
            console.log("✅ Resposta do backend:", response); // Verifica o que o backend está retornando

            if (response && response.name) {
              this.nameUser = response.name;
              console.log("✅ Nome do usuário definido:", this.nameUser);

              for (let i = 1; i < 3 ; i++){
                this.profileService.getModuleStatus(userId, i+1).subscribe(
                  response => {
                    this.statusModules[i] = response.status;
                    console.log("aqui")
                    console.log(response.status)
                  },
                  error => {
                    console.error('Erro ao buscar o status do módulo', error);
                    this.statusModules[i] = 'error';  // Ou qualquer outro valor de fallback
                  }
                );
              }

              console.log(this.statusModules)



            } else {
              console.error("❌ Resposta inesperada do backend:", response);
            }
          },
          (error) => {
            console.error('❌ Erro ao buscar usuário:', error);
          }
        );
      } else {
        console.error('❌ Erro: userId não encontrado no localStorage!');
      }
    }, 200);
  }



  logout() {
    localStorage.clear();
    sessionStorage.clear(); // Garante que tudo seja apagado
    this.router.navigate(['/login']).then(() => {
      window.location.href = '/login';
    });
  }
}
