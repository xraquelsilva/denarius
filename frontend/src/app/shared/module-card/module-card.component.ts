import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-card',
  imports: [CommonModule],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.scss'
})
export class ModuleCardComponent {
  /** Título do cartão */
  @Input() title: string = 'Título padrão';

  /** Descrição do cartão */
  @Input() description: string = 'Descrição padrão do cartão.';

  /** Caminho para a imagem exibida no cartão */
  @Input() imageSrc: string = 'assets/images/default-image.svg';

  /** Cor de fundo do cartão */
  @Input() backgroundColor: string = '#FFFFFF';

  /** Cor do texto no cartão */
  @Input() textColor: string = '#000000';

  @Input() textColorTitle: string = '#000000';



  /** Tags exibidas no cartão */
  @Input() tags: { name: string; color: string; background: string }[] = [];
}

