import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from './quiz-module.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-module.component.html',
  styleUrls: ['./quiz-module.component.scss']
})
export class QuizModuleComponent implements OnInit{
  // Controle das etapas do quiz
  step: 'question' | 'response' | 'modal' | 'end' = 'question';
  isCorrect = false;
  questions: any[] = []; // Garante que questions sempre é um array vazio ao iniciar
  currentQuestionIndex: number = 0; // Garante que não seja undefined



  totalQuestions = 0;
  selectedOption: number | null = null;
  totalScore = 0;

  // Dados do modal
  modalTitle = '';
  modalDescription = '';
  modalImage = '';
  modalScore = 0;
  nameUser: string = '';
  currentModuleId = '';
  userId: string | null = ''

  constructor(private router: Router, private quizService: QuizService, private http: HttpClient) {}

  ngOnInit() {
    const moduleId = 1; // Substitua pelo ID do módulo desejado
    this.userId = localStorage.getItem('userId');
    this.quizService.getQuestionsByModule(moduleId).subscribe(
      (data) => {
        this.questions = data;
        this.totalQuestions = this.questions.length;
        this.currentModuleId = this.questions[0].module_id
        console.log('teste');
        console.log(this.questions);
      },
      (error) => {
        console.error('Erro ao buscar perguntas:', error);
      }
    );
    if (this.userId) {
      this.http.get(`http://localhost:8000/user/${this.userId}`).subscribe(
        (user: any) => {
          this.nameUser = user.name;
        },
        (error: any) => {
          console.error('Erro ao buscar usuário:', error);
        }
      );
    } else {
      console.error('Erro: userId não encontrado no localStorage!');
    }
  }


  get currentQuestion() {
    return this.questions.length > 0 && this.currentQuestionIndex < this.questions.length
      ? this.questions[this.currentQuestionIndex]
      : null;
  }

  // Selecionar opção
  selectOption(index: number) {
    this.selectedOption = index;
  }

  // Confirmar resposta
  confirmAnswer() {
    if (this.selectedOption !== null) {
      const question = this.questions[this.currentQuestionIndex];
      this.isCorrect = this.selectedOption === question.correct_answer;

      if (this.isCorrect) {
        this.totalScore += 10;
        console.log(this.totalScore);
      }

      this.modalTitle = this.isCorrect ? 'Uhuuuuu! Mandou bem!' : 'Eita, quase lá...';
      this.modalDescription = this.isCorrect ? question.description : 'Continue tentando, você está quase acertando!';
      this.modalImage = this.isCorrect ? "assets/images/mandou_bem.png" : 'assets/images/quase_la.png';
      this.modalScore = this.isCorrect ? 10 : 0;

      this.step = 'modal';
    }
  }

  exit() {
    console.log('Indo para tela inicial');
    this.router.navigate(['/modulos']); // Redireciona para a rota /modulos
  }


  // Ir para a próxima pergunta
  goToNextQuestion() {
    this.selectedOption = null;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.totalQuestions) {
      this.step = 'question';
    } else {
      this.currentQuestionIndex--;
      this.step = 'end';
      this.checkNextModule(); // Verificar o desbloqueio do próximo módulo
    }
  }

  checkNextModule() {
    const scorePercentage = (this.totalScore / (this.totalQuestions * 10)) * 100;

    if (scorePercentage >= 70) {
      // Verificar o status do próximo módulo
      this.quizService.getNextModuleStatus(this.userId, this.currentModuleId+1).subscribe(status => {
        if (status === 'bloqueado') {
          this.unlockNextModule(); // Desbloquear o próximo módulo
        } else {
        }
      });
    } else {
    }
  }

  unlockNextModule() {
    const nextModuleId = this.currentModuleId + 1;
    console.log('nextModuleId:', nextModuleId); // Verifique se o ID está correto

    this.quizService.unlockModule(this.userId, nextModuleId).subscribe(
      response => {
        console.log('Módulo desbloqueado:', response);
        if (response.success) {
          this.quizService.updateUserProgress(this.userId,100, this.totalScore ).subscribe(progressResponse => {
            console.log('Progress Response:', progressResponse);
            if (progressResponse.success) {
            } else {
            }
          });
        } else {
        }
      },
      error => {
        console.error('Erro ao desbloquear o módulo:', error);
      }
    );
  }



  // Finalizar módulo
  finishModule() {
    console.log('Módulo finalizado. Pontuação:', this.totalScore);
    this.router.navigate(['/modulos']);
  }
}
