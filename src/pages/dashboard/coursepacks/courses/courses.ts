import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../../components/dashboard-header/dashboard-header.interface';
import {CreateContentInterface} from '../../../../components/create-content/create-content.interface';
import {SubheaderInterface} from '../../../../components/subheader/subheader.interface';
import {COURSES} from '../../../../static/dummy/courses';
import {CourseInterface} from '../../../../components/courses/courses.interface';

@Component({
  selector: 'plm-dashboard-coursepacks-courses',
  templateUrl: './courses.html'
})
export class Courses implements OnInit, OnDestroy {
  courses: CourseInterface[] = COURSES;
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Prepare for the workforce',
    smallHeader: '6 courses',
    bgColor: 'white',
    additionalContent: true
  };
  subheaderData: SubheaderInterface = {
    title: {
      text: 'Courses(6)'
    },
    action: {
      text: 'Add Course',
      color: 'primary',
      icon: ['fas', 'plus']
    }
  };
  createContentData: CreateContentInterface = {
    title: 'Add a new Course',
    formFieldsCount: 1,
    formFields: [
      {
        placeholder: 'Course name',
        type: 'text'
      }
    ],
  };
  showCreate = false;

  constructor() {
  }

  ngOnInit() {}

  bookColors(index) {
    const isPrimary = index % 3 === 0;
    const isElegance = (index - 1) % 3 === 0;
    const isPulse = (index - 2) % 3 === 0;
    return {
      'text-primary-blue': isPrimary,
      'text-elegance': isElegance,
      'text-pulse': isPulse
    };
  }

  showCreateContent() {
    this.showCreate = true;
  }

  hideCreateContent() {
    this.showCreate = false;
  }

  ngOnDestroy() {}
}
