import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-module-card',
  imports: [CommonModule, ModalComponent],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.scss'
})
export class ModuleCardComponent {
  isModalOpen = false;

  modalData = {
    title: 'Lidando com Cartão de Crédito',
    description: 'Aprenda a usar o cartão de crédito de forma responsável e evite dívidas.',
    moduleXp: 10,
    objectiveTitle: 'Objetivo',
    objectiveDesc: 'Aprenda a usar o cartão de crédito de forma responsável e a evitar dívida',
    topics: [
      'Introdução ao Cartão de Crédito',
      'Juros e Taxas',
      'Estratégias para Evitar Dívidas',
      'Gerenciamento do Crédito',
    ],
  };
  /** Título do cartão */
  @Input() title: string = 'Título padrão';

  /** Descrição do cartão */
  @Input() description: string = 'Descrição padrão do cartão.';

  /** Caminho para a imagem exibida no cartão */
  @Input() imageSrc: string = '/assets/images/ranking/user.jpg';

  /** Cor de fundo do cartão */
  @Input() backgroundColor: string = '#FFFFFF';

  /** Cor do texto no cartão */
  @Input() textColor: string = '#000000';

  @Input() textColorTitle: string = '#000000';
  @Input() block: boolean = false;

  @Input() route: string = '';


  /** Tags exibidas no cartão */
  @Input() tags: { name: string; color: string; background: string }[] = [];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  startModule() {
    this.closeModal();
  }
}

