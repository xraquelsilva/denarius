import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue);
  }
}
