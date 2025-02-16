import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-module.component.html',
  styleUrls: ['./quiz-module.component.scss']
})
export class QuizModuleComponent {
  // Controle das etapas do quiz
  step: 'question' | 'response' | 'modal' | 'end' = 'question';
  isCorrect = false;

  // Lista de perguntas
  questions = [
    {
      question: 'O que é a fatura do cartão de crédito?',
      image: 'assets/images/questions/cartao_de_credito.png',
      options: [
        { text: 'Um extrato com o total a ser pago no mês' },
        { text: 'Um documento de cobrança do cartão' },
        { text: 'Um relatório de compras feitas no mês' },
      ],
      correctAnswer: 0,
      modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'A fatura é o extrato detalhado de tudo o que você gastou no mês e o total que precisa ser pago.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
    },
    {
      question: 'O limite do cartão de crédito é o valor máximo que você pode _________________.',
      image: 'assets/images/questions/menina_cartao_credito.png',
      options: [
        { text: 'Gastar' },
        { text: 'Poupar' },
        { text: 'Investir' },
      ],
      correctAnswer: 2,
      modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'O pagamento mínimo é uma opção quando você não consegue pagar toda a fatura, mas ele gera juros sobre o saldo restante.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
    },
    {
      question: 'Qual é a principal diferença entre o pagamento mínimo e o pagamento total da fatura?',
      image: 'assets/images/questions/cartao_e_moeda.png',
      options: [
        { text: 'O pagamento mínimo cobre apenas parte da dívida' },
        { text: 'O pagamento total não inclui juros' },
        { text: 'O pagamento mínimo elimina a dívida' },
      ],
      correctAnswer: 1,
      modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'O pagamento mínimo cobre apenas uma parte da dívida, e o restante acumula juros.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
    },
    {
     question: 'Os juros do cartão de crédito incidem sobre o valor que você ______________.',
     image: 'assets/images/questions/falencia.png',
     options: [
       { text: 'deixou de pagar' },
       { text: 'pagou à vista' },
       { text: 'pagou adiantado' },
     ],
     correctAnswer: 0,
     modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'Os juros incidem sobre o valor que você deixou de pagar, então é sempre bom pagar o total.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
   },
   {
     question: 'Se eu pagar a fatura do cartão de crédito em dia, não preciso pagar juros.',
     image: 'assets/images/questions/recibo.png',
     options: [
       { text: 'Verdadeiro' },
       { text: 'Falso' },
     ],
     correctAnswer: 0,
     modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'Quando usado de forma responsável, o cartão pode gerar pontos que podem ser trocados por produtos ou descontos, além de aumentar seu limite.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
   },
   {
     question: 'O que acontece se você sempre paga apenas o valor mínimo da fatura?',
     image: 'assets/images/questions/menina_boleto.png',
     options: [
       { text: 'Seu limite aumenta.' },
       { text: 'Você acumula juros.' },
       { text: 'Você ganha descontos' },
     ],
     correctAnswer: 1,
     modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'A primeira ação deve ser ligar para o banco e solicitar o bloqueio do cartão para evitar que alguém use indevidamente.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
   },
   {
     question: 'Para evitar dívidas, é recomendado usar apenas __% do limite do cartão.',
     image: 'assets/images/questions/limite-de-credito.png',
     options: [
       { text: '70' },
       { text: '90' },
       { text: '30' },
     ],
     correctAnswer: 2,
     modal: {
       title: 'Uhuuuuu! Mandou bem!',
       description:
         'Usar até 30% do limite é uma prática saudável que ajuda a controlar os gastos.',
       image: 'assets/images/mandou_bem.png',
       score: 10,
     },
   },
 ];


  totalQuestions = this.questions.length;
  currentQuestionIndex = 0;
  selectedOption: number | null = null;
  totalScore = 0;

  // Dados do modal
  modalTitle = '';
  modalDescription = '';
  modalImage = '';
  modalScore = 0;
  User: string = 'Maria';

  // Método para abrir ajuda
  openHelp() {
    console.log('Ajuda acionada');
  }

  // Selecionar opção
  selectOption(index: number) {
    this.selectedOption = index;
  }

  // Confirmar resposta
  confirmAnswer() {
    if (this.selectedOption !== null) {
      const question = this.questions[this.currentQuestionIndex];
      this.isCorrect = this.selectedOption === question.correctAnswer;

      if (this.isCorrect) {
        this.totalScore += question.modal.score;
      }

      this.modalTitle = this.isCorrect ? 'Uhuuuuu! Mandou bem!' : 'Eita, quase lá...';
      this.modalDescription = this.isCorrect ? question.modal.description : 'Continue tentando, você está quase acertando!';
      this.modalImage = this.isCorrect ? question.modal.image : 'assets/images/quase_la.png';
      this.modalScore = this.isCorrect ? question.modal.score : 0;

      this.step = 'modal';
    }
  }

  // Ir para a próxima pergunta
  goToNextQuestion() {
    this.selectedOption = null;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.totalQuestions) {
      this.step = 'question';
    } else {
      this.step = 'end';
    }
  }

  // Finalizar módulo
  finishModule() {
    console.log('Módulo finalizado. Pontuação:', this.totalScore);
  }
}
