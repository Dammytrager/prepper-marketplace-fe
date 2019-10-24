import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {DashboardHeaderComponent} from '../../components/dashboard-header/dashboard-header.component';


@NgModule({
  declarations: [
    NavbarComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NavbarComponent,
    DashboardHeaderComponent
  ],
  entryComponents: []
})
export class SharedModule {}
