import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {select} from '@angular-redux/store';
import {UserService} from '../services/user.service';
import {AppState} from '../interfaces/state/plm.interface';

@Injectable()

export class AuthGuard implements CanActivate {
  @select(['user', 'isLoggedIn']) $isLoggedIn: Observable<AppState>;
  $isLoggedIn$: Subscription;
  private isLoggedIn;

  constructor(
    private _router: Router,
    private _user: UserService
  ) {
    this.$isLoggedIn$ = this.$isLoggedIn.subscribe((data) => this.isLoggedIn = data);
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this._user.isLoggedin();
    if (this.isLoggedIn) {
      this._router.navigate(['/dashboard/home']);
      return false;
    }
    return true;
  }
}
