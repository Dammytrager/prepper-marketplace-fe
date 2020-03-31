import { Component, OnInit } from '@angular/core';
import {NOTIFICATIONS} from '../../static/dummy/notifications';
import {UserService} from '../../system/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'plm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSearch = false;
  showMobile = false;
  notifications = NOTIFICATIONS;

  constructor(private _user: UserService,
              private _router: Router) {}

  ngOnInit() {}

  notificationIcon(type) {
    let icon = [];
    if (type === 'success') {
      icon = ['fas', 'check'];
    } else if (type === 'info') {
      icon = ['fas', 'plus'];
    } else if (type === 'warning') {
      icon = ['fas', 'exclamation-triangle'];
    } else if (type === 'danger') {
      icon = ['fas', 'times'];
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
    await this._user.logout();
    this._router.navigate(['/auth/sign-in']);
  }
}
