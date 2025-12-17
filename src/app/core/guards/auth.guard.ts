import { CanActivateFn, Router } from "@angular/router";

import { inject } from "@angular/core";
import { Auth } from "../services/auth/auth";

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    
    if(auth.isAuthenticated()){
        return true
    }

    router.navigate(['login'])
    return false
}