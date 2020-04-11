import {Component, OnDestroy, OnInit} from '@angular/core';
import {NOTIFICATIONS} from '../../static/dummy/notifications';
import {Router} from '@angular/router';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../system/services/auth.service';

@Component({
  selector: 'plm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @select(['user', 'data', 'username']) displayName$: Observable<string>;
  $displayName$: Subscription;
  showSearch = false;
  showMobile = false;
  notifications = NOTIFICATIONS;
  displayName;

  constructor(private _auth: AuthService,
              private _router: Router) {}

  ngOnInit() {
    this.$displayName$ = this.displayName$.subscribe((data) => {
      this.displayName = data;
    });
  }

  notificationIcon(type) {
    let icon = [];
    switch (type) {
      case 'success':
        icon = ['fas', 'check'];
        break;
      case 'info':
        icon = ['fas', 'plus'];
        break;
      case 'warning':
        icon = ['fas', 'exclamation-triangle'];
        break;
      case 'danger':
        icon = ['fas', 'times'];
        break;
    }

    return icon;
  }

  hideSideNav() {
    this.showMobile = false;
  }

  showSideNav() {
    this.showMobile = true;
  }

  async logout() {
    await this._auth.logout();
    this._router.navigate(['/auth/sign-in']);
  }

  ngOnDestroy() {
    this.$displayName$.unsubscribe();
  }
}
