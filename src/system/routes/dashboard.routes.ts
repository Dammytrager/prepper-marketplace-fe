import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {Courses} from '../../pages/dashboard/courses/courses';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';

const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'home',
        component: DashboardHome,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'courses',
        component: Courses,
        data: {
          title: 'Dashboard | Your Courses'
        }
      },
      {
        path: 'earnings',
        component: Earnings,
        data: {
          title: 'Dashboard | Your Earnings'
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
