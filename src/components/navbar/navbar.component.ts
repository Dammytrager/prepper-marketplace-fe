import { Component, OnInit } from '@angular/core';
import {NOTIFICATIONS} from '../../static/dummy/notifications';

@Component({
  selector: 'plm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSearch = false;
  showMobile = false;
  notifications = NOTIFICATIONS;

  constructor() {}

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
}
