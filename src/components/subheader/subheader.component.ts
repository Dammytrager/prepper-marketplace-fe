import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubheaderInterface} from './subheader.interface';

@Component({
  selector: 'plm-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();
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
      template: false,
    }
  };

   constructor() {}

   runAction() {
     this.open.emit();
   }

   ngOnInit() {
     this.data = {...this._defaultData, ...this.data};
   }
}
