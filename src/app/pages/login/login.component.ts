import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(Auth);

  router = inject(Router);

  isLoading: boolean = false;

  formSubmit = signal<boolean>(false);

  senha = signal<string>("");

  email = signal<string>("");

  emailInvalid = computed(() => {
    return this.email() === "";
  })

  senhaInvalid = computed(() => {
    return this.senha() === "";
  })

  errorMessage = computed(() => {
    return this.senhaInvalid() || this.emailInvalid()
      ? "Usuário ou senha inválido"
      : ""
  })

  onSubmit() {

    if (!this.emailInvalid() && !this.senhaInvalid()) {

      let result = this.authService.autenticar(
        this.email(),
        this.senha()
      );

      if (result) {
        this.formSubmit.set(false);
        this.router.navigate([''])
      }

      this.email.set("");
      this.senha.set("");

      this.formSubmit.set(true);
    }

    this.formSubmit.set(true);

  }
}
