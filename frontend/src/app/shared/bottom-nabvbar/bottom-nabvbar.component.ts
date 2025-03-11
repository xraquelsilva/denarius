import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bottom-nabvbar',
  templateUrl: './bottom-nabvbar.component.html',
  styleUrls: ['./bottom-nabvbar.component.scss']
})
export class BottomNabvbarComponent implements OnInit {
  activeTab: string = 'modulos';
  wavePosition: string = '0%';

  constructor(private router: Router) {}

  ngOnInit() {
    // Atualiza a aba ativa com base na rota atual ao iniciar o componente
    this.updateActiveTab(this.router.url);

    // Atualiza a aba ativa toda vez que há uma mudança de rota
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveTab(event.urlAfterRedirects);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    // Define a posição da onda e navega para a rota correspondente
    switch (tab) {
      case 'modulos':
        this.wavePosition = '0%';
        this.router.navigate(['/modulos']);
        break;
      case 'ranking':
        this.wavePosition = '25%';
        this.router.navigate(['/ranking']);
        break;
      case 'recompensas':
        this.wavePosition = '50%';
        this.router.navigate(['/recompensas']);
        break;
      case 'perfil':
        this.wavePosition = '75%';
        this.router.navigate(['/perfil']);
        break;
    }
  }

  updateActiveTab(url: string) {
    // Define a aba ativa e a posição da onda com base na URL atual
    if (url.includes('/modulos')) {
      this.activeTab = 'modulos';
      this.wavePosition = '0%';
    } else if (url.includes('/ranking')) {
      this.activeTab = 'ranking';
      this.wavePosition = '25%';
    } else if (url.includes('/recompensas')) {
      this.activeTab = 'recompensas';
      this.wavePosition = '50%';
    } else if (url.includes('/perfil')) {
      this.activeTab = 'perfil';
      this.wavePosition = '75%';
    }
  }
}
