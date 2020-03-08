import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {RatingsComponent} from '../../components/ratings/ratings.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NavbarComponent,
    RatingsComponent,
    PaginationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    HttpClientModule
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
    PaginationComponent,
    LoaderComponent
  ],
  entryComponents: []
})
export class SharedModule {}
