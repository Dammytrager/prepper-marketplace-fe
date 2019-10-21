import {NgModule} from '@angular/core';

import {SharedModule} from './shared.module';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {DashboardRoutes} from '../routes/dashboard.routes';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Courses} from '../../pages/dashboard/courses/courses';
import {Earnings} from '../../pages/dashboard/earnings/earnings';

@NgModule({
  declarations: [
    Dashboard,
    DashboardHome,
    Courses,
    Earnings
  ],
  imports: [
    SharedModule,
    DashboardRoutes
  ],
  providers: []
})
export class DashboardModule {}


