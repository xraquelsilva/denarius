import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topics-module',
  imports: [CommonModule],
  templateUrl: './topics-module.component.html',
  styleUrl: './topics-module.component.scss'
})
export class TopicsModuleComponent {
  moduleData = {
    title: '1. Introdução ao Cartão de Crédito',
    objective: 'Ensinar o básico sobre cartões de crédito e como funcionam.',
    content: [
      'Limite do cartão',
      'Fatura e Pagamento Mínimo',
      'Juros',
      'Parcelamento',
      'Pagando em Dia',
      'Dicas para o Uso Responsável',
    ],
    mascot: 'assets/images/mascote-alerta.png', // Caminho da imagem do mascote
  };

    constructor(private router: Router) {}
  // Ações dos botões
  startModule() {
    // Lógica para iniciar o módulo
    console.log('Iniciando o módulo...');
  }

  learnMore() {
    this.router.navigate(['/modulo-detalhes']);
  }

  exitModule() {
    this.router.navigate(['/modulos']); // Redireciona para a rota /modulos
  }
}
