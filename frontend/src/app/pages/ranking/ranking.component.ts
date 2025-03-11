import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BottomNabvbarComponent } from "../../shared/bottom-nabvbar/bottom-nabvbar.component";
import { UserService } from './ranking.service';


interface User {
  name: string;
  xp: number;
  photo: string; // Caminho da imagem

}


@Component({
  selector: 'app-ranking',
  imports: [CommonModule, BottomNabvbarComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {
  users: any[] = [];
  topThree: any[] = [];
  remainingUsers: any[] = [];
  maxBarHeight = 200; // Altura máxima da barra em pixels
  loggedUser = { id: 3, name: 'Bruno' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Carregar usuários ao inicializar o componente
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.updateRanking();
      },
      (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    );
  }

  /**
   * Atualiza a lista de Top 3 e os usuários restantes.
   * Ordena pelo maior XP e divide a lista.
   */
  updateRanking(): void {
    if (!this.users || this.users.length === 0) {
      console.warn("Nenhum usuário encontrado!");
      return;
    }

    const sortedUsers = [...this.users].sort((a, b) => b.xp - a.xp);
    this.topThree = sortedUsers.slice(0, 3);
    this.remainingUsers = sortedUsers.slice(3);
    console.log(this.remainingUsers)

  }


  /**
   * Calcula a altura da barra com base no XP relativo ao maior XP.
   * @param xp Valor de XP do usuário
   * @returns Altura em pixels
   */
  calculateHeight(xp: number): number {
    const maxXp = Math.max(...this.users.map(user => user.xp)); // Obter maior XP
    return (xp / maxXp) * this.maxBarHeight;
  }


  isLoggedUser(userId: number): boolean {
    return this.loggedUser?.id === userId;
  }

}
