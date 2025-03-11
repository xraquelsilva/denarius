import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-field',
  imports: [FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }
}
