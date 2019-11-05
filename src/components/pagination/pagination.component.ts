import {Component, Input, OnInit} from '@angular/core';
import {PaginationInterface} from './pagination.Interface';

@Component({
  selector: 'plm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() options: PaginationInterface;
  _defaultsOptions: PaginationInterface = {
    collectionSize: 100,
    maxSize: 5,
    rotate: true,
    boundaryLinks: false,
    ellipses: true,
    directionLinks: true,
    page: 1,
    size: '',
    classNames: ''
  };

  constructor() {
  }

  ngOnInit() {
    this.options = {...this._defaultsOptions, ...this.options};
  }
}
