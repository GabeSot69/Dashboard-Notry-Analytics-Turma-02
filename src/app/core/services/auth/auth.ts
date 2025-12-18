import { inject, Injectable, signal } from "@angular/core";
import { User } from "../../../shared/models/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})

export class Auth {
    private usuarios: User[] = [
        { email: 'adm1@admin.com', senha: '123' },
        { email: 'adm2@admin.com', senha: '456' },
    ]

    private router = inject(Router)

    private getInitialUser(): User | null {
        const userJson = localStorage.getItem('auth');

        return userJson ? JSON.parse(userJson) : null;
    }

    userAuth = signal<User | null>(this.getInitialUser());

    isAuthenticated = signal<boolean>(!!this.getInitialUser());

    autenticar(email: string, senha: string): boolean {
        let user = this.usuarios.find(
            (user) => user.email == email
        )

        if (user) {
            if (user.senha !== senha) {
                this.isAuthenticated.set(false)
                return false;
            }

            this.userAuth.set(user)

            localStorage.setItem( 'auth', JSON.stringify(user))
            this.isAuthenticated.set(true)
            return true;
        }
        this.isAuthenticated.set(false)
        return false;
    }

    logout(): void {
        this.userAuth.set(null);
        this.isAuthenticated.set(false);
        localStorage.removeItem('auth');
        this.router.navigate(['login']);
    }
}