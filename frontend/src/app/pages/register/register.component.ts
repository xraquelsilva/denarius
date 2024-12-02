import { Component } from '@angular/core';
import { InputFieldComponent } from "../../shared/input-field/input-field.component";

@Component({
  selector: 'app-register',
  imports: [InputFieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
}
