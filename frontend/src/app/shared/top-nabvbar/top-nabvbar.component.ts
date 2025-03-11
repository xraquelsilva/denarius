import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-nabvbar',
  imports: [CommonModule],
  templateUrl: './top-nabvbar.component.html',
  styleUrl: './top-nabvbar.component.scss'
})
export class TopNabvbarComponent implements OnInit {
  isMenuOpen = false;
  nameUser: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {  // Verifica se o código está no navegador
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.http.get(`http://localhost:8000/user/${userId}`).subscribe(
          (user: any) => {
            this.nameUser = user.name;
          },
          (error) => {
            console.error('Erro ao buscar usuário:', error);
          }
        );
      } else {
        console.error('Erro: userId não encontrado no localStorage!');
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.isMenuOpen = false;
    }
  }
}
