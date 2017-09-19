import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
  } from '@angular/router';
  import { Observable } from 'rxjs/Observable';
  import { Injectable } from '@angular/core';
  
  import { FacebookAppService } from './facebook.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private facebookAppService: FacebookAppService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.facebookAppService.isAuthenticated())
        return true;
      else{
        this.router.navigate(['/']);
      }
    }
  
    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }
  }
  