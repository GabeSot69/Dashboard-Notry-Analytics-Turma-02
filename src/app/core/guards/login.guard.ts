import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../services/auth/auth";


export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth)
    const router = inject(Router)

    if (auth.isAuthenticated()){
        router.navigate(['home']);
        return false;
    }

    return true;
}