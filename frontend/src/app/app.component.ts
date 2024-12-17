import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';  // Importando Router e NavigationEnd
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf
import { BottomNabvbarComponent } from './shared/bottom-nabvbar/bottom-nabvbar.component';
import { RouterModule } from '@angular/router'; // Importando RouterModule



@Component({
  selector: 'app-root',
  standalone: true,  // Componente standalone
  imports: [CommonModule, BottomNabvbarComponent, RouterModule],  // Importando CommonModule para usar *ngIf
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showBottomNavbar = false; // Variável que controla a exibição do Bottom Navbar

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Define as páginas nas quais o BottomNavbar deve ser mostrado
        const pagesWithNavbar = ['/modulos', '/ranking', '/recompensas', '/perfil'];
        // Verifica se a URL atual corresponde a alguma das páginas que devem exibir o BottomNavbar
        this.showBottomNavbar = pagesWithNavbar.some(page => event.urlAfterRedirects.startsWith(page));
      }
    });
  }
}
