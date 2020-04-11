import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {select} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {AuthService} from '../services/auth.service';

@Injectable()

export class DashboardGuard implements CanActivate {
  @select(['user', 'isLoggedIn']) $isLoggedIn: Observable<AppState>;
  $isLoggedIn$: Subscription;
  private isLoggedIn;

  constructor(
    private _router: Router,
    private _auth: AuthService
  ) {
    this.$isLoggedIn$ = this.$isLoggedIn.subscribe((data) => this.isLoggedIn = data);
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this._auth.isLoggedin();
    if (!this.isLoggedIn) {
      this._router.navigate(['/auth/sign-in'], {queryParams: {
          returnUrl: state.url
        }});
      return false;
    }
    return true;
  }
}
