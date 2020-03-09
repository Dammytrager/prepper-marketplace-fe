import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plm-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() data;
  _dataDefaults = {
    type: 1,
    color: 'green',
    size: '1x'
  };

  constructor() { }

  ngOnInit() {
    this.data = {...this._dataDefaults, ...this.data};
  }
}
