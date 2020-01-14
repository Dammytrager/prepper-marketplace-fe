import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {Coursepacks} from '../../pages/dashboard/coursepacks/coursepacks';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Courses} from '../../pages/dashboard/coursepacks/courses/courses';
import {Lessons} from '../../pages/dashboard/coursepacks/courses/lessons/lessons';
import {TITLE} from '../constants/route-data';

const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'home',
        component: DashboardHome,
        data: {
          title: TITLE.DASHBOARD_HOME
        }
      },
      {
        path: 'courses',
        component: Coursepacks,
        data: {
          title: TITLE.DASHBOARD_COURSEPACKS
        }
      },
      {
        path: 'earnings',
        component: Earnings,
        data: {
          title: TITLE.DASHBOARD_EARNINGS
        }
      },
      {
        path: 'courses/:id',
        component: Courses,
        data: {
          title: TITLE.DASHBOARD_COURSES
        }
      },
      {
        path: ':courseId/:lessonId',
        component: Lessons,
        data: {
          title: TITLE.DASHBOARD_LESSONS
        }
      },
      {
        path: '',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutes { }
