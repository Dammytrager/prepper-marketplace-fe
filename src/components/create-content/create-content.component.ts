import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateContentInterface} from './create-content.interface';

@Component({
  selector: 'plm-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() data: CreateContentInterface;
  defaultData: CreateContentInterface = {
    title: '',
    formFields: [
      {
        placeholder: '',
        type: 'text'
      }
    ],
    formFieldsCount: 1,
    button: {
      text: 'Create',
      icon: ['fas', 'plus']
    }
  };

  constructor() {}

  ngOnInit() {
    this.data = {...this.defaultData, ...this.data};
  }

  closeDialog() {
    this.close.emit();
  }
}
