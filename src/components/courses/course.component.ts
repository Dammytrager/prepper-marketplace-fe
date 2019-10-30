import {Component, Input, OnInit} from '@angular/core';
import {CourseData} from './courses.interface';

@Component({
  selector: 'plm-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() data: CourseData;
  constructor() {}
}
