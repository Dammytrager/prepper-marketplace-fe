import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {Subjects} from '../../pages/dashboard/subjects/subjects';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Topics} from '../../pages/dashboard/subjects/topics/topics';
import {Lessons} from '../../pages/dashboard/subjects/topics/lessons/lessons';
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
        path: 'subjects',
        component: Subjects,
        data: {
          title: TITLE.DASHBOARD_SUBJECTS
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
        matcher: RouteMatcher.subjectsRoute,
        component: Topics,
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
