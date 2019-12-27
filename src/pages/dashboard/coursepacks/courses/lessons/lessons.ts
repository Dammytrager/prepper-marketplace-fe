import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../../../components/dashboard-header/dashboard-header.interface';
import {CreateContentInterface} from '../../../../../components/create-content/create-content.interface';
import {SubheaderInterface} from '../../../../../components/subheader/subheader.interface';
import {LESSONS} from '../../../../../static/dummy/lessons';

@Component({
  selector: 'plm-lessons',
  templateUrl: './lessons.html'
})
export class Lessons implements OnInit, OnDestroy {
  lessons = LESSONS;
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Creative Thinking',
    smallHeader: '3 Lessons',
    bgColor: 'white',
    additionalContent: false
  };
  subheaderData: SubheaderInterface = {
    title: {
      text: 'Lessons(3)'
    },
    action: {
      text: 'Add Lesson',
      color: 'primary',
      icon: ['fas', 'plus']
    }
  };
  createContentData: CreateContentInterface = {
    title: 'Add a new Lesson',
    formFieldsCount: 1,
    formFields: [
      {
        placeholder: 'Lesson title',
        type: 'text'
      }
    ],
    button: {
      text: 'Add',
      icon: ['fas', 'plus']
    }
  };
  showCreate = false;

  constructor() {
  }

  ngOnInit() {}

  showCreateContent() {
    this.showCreate = true;
  }

  hideCreateContent() {
    this.showCreate = false;
  }

  ngOnDestroy() {}
}
