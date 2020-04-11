import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../system/services/user.service';

@Component({
  selector: 'plm-dashboard',
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit, OnDestroy {

  constructor(private _user: UserService) {}

  ngOnInit() {
    this._user.getProfile();
  }

  ngOnDestroy() {}
}
