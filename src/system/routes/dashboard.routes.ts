import { NgModule } from '@angular/core';
import {Routes, RouterModule, UrlSegment} from '@angular/router';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {Coursepacks} from '../../pages/dashboard/coursepacks/coursepacks';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Courses} from '../../pages/dashboard/coursepacks/courses/courses';
import {Lessons} from '../../pages/dashboard/coursepacks/courses/lessons/lessons';
import {TITLE} from '../constants/route-data';
import {DashboardGuard} from './dashboard.guard';
import {RouteMatcher} from '../classes/route-matcher';

const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [DashboardGuard],
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
        path: 'user',
        loadChildren: '../modules/user.module#UserModule'
      },
      {
        matcher: RouteMatcher.coursesRoute,
        component: Courses,
        data: {
          title: TITLE.DASHBOARD_COURSES
        }
      },
      {
        matcher: RouteMatcher.lessonsRoute,
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  exports: [RouterModule]
})

export class DashboardRoutes { }
