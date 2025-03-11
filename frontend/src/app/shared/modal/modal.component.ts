import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isModalOpen: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() moduleXp: number = 0;
  @Input() objectiveTitle: string = 'Objetivo';
  @Input() objectiveDesc: string = '';
  @Input() topics: string[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() start = new EventEmitter<void>();

  constructor(private router: Router) {}

  closeModal() {
    this.close.emit();
  }

  startModule() {
    this.router.navigate(['/modulo-resumo']);
  }
}
