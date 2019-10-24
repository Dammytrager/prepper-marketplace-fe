import {Component, Input, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from './dashboard-header.interface';

@Component({
  selector: 'plm-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  @Input() data: DashboardHeaderInterface;
  _dataDefaults: DashboardHeaderInterface = {
    bigHeader: '',
    smallHeader: ''
};

  constructor() {}

  ngOnInit() {
    this.data = {...this._dataDefaults, ...this.data};
  }

}
