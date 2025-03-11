import { Component } from '@angular/core';
import { InputFieldComponent } from "../../shared/input-field/input-field.component";
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);  // Verifique a resposta aqui

          // Verifique se a resposta tem os campos corretos
          if (response.user_id && response.access_token) {
            // 🔹 Salva no localStorage
            localStorage.setItem('userId', response.user_id.toString());
            localStorage.setItem('accessToken', response.access_token);

            console.log('✅ Dados salvos no localStorage:', {
              userId: localStorage.getItem('userId'),
              token: localStorage.getItem('accessToken')
            });

            // 🔹 Aguarde um tempo antes de redirecionar
            setTimeout(() => {
              this.router.navigate(['/modulos']);
            }, 200);
          } else {
            console.error('Erro: Dados incompletos na resposta', response);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }





}
