import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BottomNabvbarComponent } from "../../shared/bottom-nabvbar/bottom-nabvbar.component";

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
  users = [
    { id: 1,name: 'Luiza', xp: 500, photo: 'assets/images/ranking/luiza.png' },
    { id: 2,name: 'Teresa', xp: 400, photo: 'assets/images/ranking/teresa.png' },
    { id: 3,name: 'Bruno', xp: 0, photo: 'assets/images/ranking/bruno.png' },
    { id: 4,name: 'João', xp: 600, photo: 'assets/images/ranking/joao.png' },
    { id: 5,name: 'Amelia', xp: 0, photo: 'assets/images/ranking/amelia.png' },
    { id: 6,name: 'Maria', xp: 100, photo: 'assets/images/ranking/maria.png' }
  ];

  topThree: any[] = [];
  remainingUsers: any[] = [];
  maxBarHeight = 200; // Altura máxima da barra em pixels

  loggedUser = { id: 3, name: 'Bruno' };

  constructor() {}

  ngOnInit(): void {
    this.updateRanking();
  }

  /**
   * Atualiza a lista de Top 3 e os usuários restantes.
   * Ordena pelo maior XP e divide a lista.
   */
  updateRanking(): void {
    const sortedUsers = [...this.users].sort((a, b) => b.xp - a.xp); // Ordenar em ordem decrescente
    this.topThree = sortedUsers.slice(0, 3); // Top 3 primeiros
    this.remainingUsers = sortedUsers.slice(3); // Restante
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
