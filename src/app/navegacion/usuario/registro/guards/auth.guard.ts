import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

export const authGuard= () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userState$.pipe(
    take(1), 
    tap( isLoggedIn => {isLoggedIn ? router.navigate(['']) : true} )
  )
};