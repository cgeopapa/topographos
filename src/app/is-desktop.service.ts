import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

declare var WURFL: any;

@Injectable({
  providedIn: 'root'
})
export class IsDesktopService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!WURFL.is_mobile) {
      return true;
    }
    this.router.navigate(["mobile"]);
    return false;
  }
}
