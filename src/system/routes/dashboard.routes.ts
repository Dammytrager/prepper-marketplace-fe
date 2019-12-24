import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {Coursepacks} from '../../pages/dashboard/coursepacks/coursepacks';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Courses} from '../../pages/dashboard/coursepacks/courses/courses';

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
        component: Coursepacks,
        data: {
          title: 'Dashboard | Your Coursepacks'
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
        path: 'courses/:id',
        component: Courses,
        data: {
          title: 'Dashboard | Your Coursepacks'
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
