import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/auth.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.isAdmin()) {
    return true;
  } else {
    return router.createUrlTree(['/not-found'])
  }
};
