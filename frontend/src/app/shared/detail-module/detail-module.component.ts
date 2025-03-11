import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-module',
  imports: [CommonModule],
  templateUrl: './detail-module.component.html',
  styleUrl: './detail-module.component.scss'
})
export class DetailModuleComponent {
  moduleDetails = [
    {
      title: 'Limite do Cartão',
      description:
        'É o valor máximo que você pode gastar. Usar todo limite pode comprometer seu orçamento. É recomendado gastar apenas até 30% do limite para manter o controle.',
    },
    {
      title: 'Fatura e Pagamento Mínimo',
      description:
        'Todo mês, você recebe uma fatura com o total das suas compras. O pagamento mínimo é uma opção para pagar apenas uma parte dessa dívida, mas isso faz com que o restante acumule juros, o que aumenta sua dívida rapidamente.',
    },
    {
      title: 'Juros',
      description:
        'Se você não paga o valor total da fatura, os juros incidem sobre o valor que ficou pendente. Os juros do cartão de crédito estão entre os maiores do mercado, então é melhor pagar o máximo que puder para evitar acúmulo de dívida.',
    },
    {
      title: 'Parcelamento',
      description:
        'Parcelar compras pode ser uma boa opção para dividir valores maiores em várias parcelas. Mas cuidado, pois algumas vezes essas parcelas vêm com juros embutidos. Sempre verifique antes de parcelar.',
    },
    {
      title: 'Pagando em Dia',
      description:
        'Quando você paga a fatura do cartão de crédito em dia, evita os juros e mantém seu crédito saudável. Isso também ajuda a manter uma boa relação com seu banco e evita o acúmulo de dívidas.',
    },
    {
      title: 'Dicas para o Uso Responsável',
      description:
        '- Sempre revise sua fatura e anote seus gastos\n- Não use o cartão como uma extensão da sua renda. Gaste apenas o que pode pagar no próximo mês\n- Priorize pagar o valor total da fatura ou pelo menos o máximo que puder para evitar juros',
    },
  ];

  mascot = 'assets/images/avatar-start-module.png'; // Caminho para a imagem do mascote

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/modulo-resumo']); // Volta para a lista de módulos
  }

  startModule() {
    console.log('Iniciando módulo...');
    this.router.navigate(['/modulo-quiz']);
  }
}
