import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recompensas',
  imports: [CommonModule],
  templateUrl: './recompensas.component.html',
  styleUrl: './recompensas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecompensasComponent implements OnInit, OnDestroy {
  cards = [
    {
      title: 'Proteja sua identidade ',
      description: 'Monitore seus dados de forma eficaz, controle quem pode consultá-los e mantenha seu crédito seguro com 3 meses de Serasa Premium.',
      photo: 'assets/images/recompensas/serasa.png',
      timeLeft: '23:59:59 horas restantes',
      coins: 70
    },
    {
      title: 'Imersão no futuro',
      description: 'Participe do maior festival de tecnologia, empreendedorismo, ciência e disruptividade com o ingresso campuseiro, garantindo acesso a todos os dias da CP Nordeste.',
      photo: 'assets/images/recompensas/campus.png',
      timeLeft: '12:34:56 horas restantes',
      coins: 400
    },
    {
      title: 'Cuide da sua saúde',
      description: 'Acesso a consultas, exames, telemedicina 24h e descontos em farmácias, com uma rede médica de qualidade, com a assinatura anual Exmed Pass.',
      photo: 'assets/images/recompensas/examed.png',
      timeLeft: '03:21:45 horas restantes',
      coins: 700
    },
  ];
  activeIndex = 0;
  intervalId: any;
  isDragging = false;
  startX = 0;
  currentTranslate = 0;
  previousTranslate = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    // Nenhuma contagem regressiva necessária agora, removido o código do timer
  }

  ngOnDestroy() {
    this.clearCountdown();
  }

  clearCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
    this.cdRef.detectChanges(); // Força a detecção de mudanças após atualizar o índice
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getPosition(event);
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const currentPosition = this.getPosition(event);
    this.currentTranslate = this.previousTranslate + currentPosition - this.startX;

    this.updateCarouselTransform();
  }

  onDragEnd(event: MouseEvent | TouchEvent) {
    this.isDragging = false;
    const movedBy = this.currentTranslate - this.previousTranslate;

    if (movedBy < -100 && this.activeIndex < this.cards.length - 1) {
      this.setActiveIndex(this.activeIndex + 1);
    } else if (movedBy > 100 && this.activeIndex > 0) {
      this.setActiveIndex(this.activeIndex - 1);
    }

    this.previousTranslate = this.currentTranslate;
    this.updateCarouselTransform();
  }

  getPosition(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  updateCarouselTransform() {
    const carousel = document.querySelector('.carousel-cards');
    if (carousel) {
      carousel.setAttribute(
        'style',
        `transform: translateX(${this.currentTranslate}px)`
      );
    }
  }
}
