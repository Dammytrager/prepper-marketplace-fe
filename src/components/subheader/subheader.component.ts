import {Component, Input, OnInit} from '@angular/core';
import {SubheaderInterface} from './subheader.interface';

@Component({
  selector: 'plm-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  @Input() data: SubheaderInterface;

  _defaultData: SubheaderInterface = {
    title: {
      icon: false,
      text: ''
    },
    action: {
      icon: false,
      text: '',
      color: 'primary',
      template: false
    }
  };

   constructor() {}

   ngOnInit() {
     this.data = {...this._defaultData, ...this.data};
   }
}
