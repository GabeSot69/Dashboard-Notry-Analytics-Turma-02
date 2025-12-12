import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    dadosLogin = {
      email: '',
      senha: ''
    }

    onSubmit() {
      console.log('Dados Enviados: ', this.dadosLogin);
      alert(`Login de ${this.dadosLogin.email} efetivado.`)
    }
}
