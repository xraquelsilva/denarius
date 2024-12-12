import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-nabvbar',
  imports: [],
  templateUrl: './bottom-nabvbar.component.html',
  styleUrl: './bottom-nabvbar.component.scss'
})
export class BottomNabvbarComponent {
  activeTab: string = 'home';
  wavePosition: string = '0%';

  setActiveTab(tab: string) {
    this.activeTab = tab;

    // Define a posição da onda com base na aba ativa
    switch (tab) {
      case 'home':
        this.wavePosition = '0%';
        break;
      case 'medal':
        this.wavePosition = '25%';
        break;
      case 'money':
        this.wavePosition = '50%';
        break;
      case 'profile':
        this.wavePosition = '75%';
        break;
    }
  }
}
