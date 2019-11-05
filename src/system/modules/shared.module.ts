import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {RatingsComponent} from '../../components/ratings/ratings.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationComponent} from '../../components/pagination/pagination.component';


@NgModule({
  declarations: [
    NavbarComponent,
    RatingsComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NavbarComponent,
    RatingsComponent,
    PaginationComponent
  ],
  entryComponents: []
})
export class SharedModule {}
