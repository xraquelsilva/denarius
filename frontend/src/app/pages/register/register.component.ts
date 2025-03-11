import { Component } from '@angular/core';
import { InputFieldComponent } from "../../shared/input-field/input-field.component";
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  register() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('✅ Resposta do backend:', response);

        if (!response || !response.userId || !response.token) {
          console.error('❌ Resposta inválida do backend:', response);
          return;
        }

        // 🔹 Salva no localStorage e verifica se está certo
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('accessToken', response.token);

        console.log('✅ Dados salvos no localStorage:', {
          userId: localStorage.getItem('userId'),
          token: localStorage.getItem('accessToken')
        });

        // 🔹 Aguarde um tempo antes de redirecionar para garantir que o storage foi atualizado
        setTimeout(() => {
          this.router.navigate(['/modulos']);
        }, 200);
      },
      error: (error) => {
        console.error('❌ Erro ao cadastrar usuário:', error);
      }
    });
  }

}
