import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isLoggedIn()) {
      // Check if route is admin and user is not admin
      if (route.url[0] && route.url[0].path === 'admin' && !this.authService.isAdmin()) {
        this.router.navigate(['/home']); // Or some other unauthorized page
        return false;
      }
      return true;
    } else {
      // Store the attempted URL for redirecting after login
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      this.router.navigate(['/login']);
      return false;
    }
  }
}