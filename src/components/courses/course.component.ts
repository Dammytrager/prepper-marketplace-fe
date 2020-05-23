import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoursePackData} from './courses.interface';

@Component({
  selector: 'plm-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() data: CoursePackData;
  @Output() navigate = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() {}

  triggerNavigation() {
    this.navigate.emit();
  }

  triggerEdit() {
    this.edit.emit();
  }

  triggerDelete() {
    this.delete.emit();
  }
}
