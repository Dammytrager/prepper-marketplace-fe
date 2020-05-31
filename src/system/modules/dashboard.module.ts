import {NgModule} from '@angular/core';

import {SharedModule} from './shared.module';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {DashboardRoutes} from '../routes/dashboard.routes';
import {DashboardHome} from '../../pages/dashboard/dashboard-home/dashboard-home';
import {Subjects} from '../../pages/dashboard/subjects/subjects';
import {Earnings} from '../../pages/dashboard/earnings/earnings';
import {ChartsModule} from 'ng2-charts';
import {DashboardFooterComponent} from '../../components/dashboard-footer/dashboard-footer.component';
import {DashboardHeaderComponent} from '../../components/dashboard-header/dashboard-header.component';
import {SubheaderComponent} from '../../components/subheader/subheader.component';
import {CourseComponent} from '../../components/courses/course.component';
import {CreateContentComponent} from '../../components/create-content/create-content.component';
import {Topics} from '../../pages/dashboard/subjects/topics/topics';
import {Lessons} from '../../pages/dashboard/subjects/topics/lessons/lessons';
import {Conversations} from '../../pages/dashboard/subjects/topics/lessons/conversations/conversations';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    Dashboard,
    DashboardHome,
    Subjects,
    Earnings,
    Topics,
    Lessons,
    Conversations,
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


