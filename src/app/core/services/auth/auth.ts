import { Injectable, signal } from "@angular/core";
import { User } from "../../../shared/models/User";

@Injectable({
    providedIn: 'root',
})

export class Auth {
    private usuarios: User[] = [
        { email: 'bla1@gmail.com', senha: '123' },
        { email: 'bla2@gmail.com', senha: '456' },
    ]

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
                return false;
            }

            this.userAuth.set(user)

            localStorage.setItem(
                'auth',
                JSON.stringify(user)
            )

            return true;
        }

        return false;
    }
}