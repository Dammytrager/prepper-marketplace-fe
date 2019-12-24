import {NgModule} from '@angular/core';

import {SharedModule} from './shared.module';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {DashboardRoutes} from '../routes/dashboard.routes';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Coursepacks} from '../../pages/dashboard/coursepacks/coursepacks';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {ChartsModule} from 'ng2-charts';
import {DashboardFooterComponent} from '../../components/dashboard-footer/dashboard-footer.component';
import {DashboardHeaderComponent} from '../../components/dashboard-header/dashboard-header.component';
import {SubheaderComponent} from '../../components/subheader/subheader.component';
import {CourseComponent} from '../../components/courses/course.component';
import {CreateContentComponent} from '../../components/create-content/create-content.component';
import {Courses} from '../../pages/dashboard/coursepacks/courses/courses';

@NgModule({
  declarations: [
    Dashboard,
    DashboardHome,
    Coursepacks,
    Earnings,
    Courses,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    SubheaderComponent,
    CourseComponent,
    CreateContentComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutes,
    ChartsModule
  ],
  providers: []
})
export class DashboardModule {}


