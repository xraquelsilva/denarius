import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-top-nabvbar',
  imports: [CommonModule],
  templateUrl: './top-nabvbar.component.html',
  styleUrl: './top-nabvbar.component.scss'
})
export class TopNabvbarComponent {
  isMenuOpen = false;

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
