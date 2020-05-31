import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {RatingsComponent} from '../../components/ratings/ratings.component';
import {NgbModalModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {HttpClientModule} from '@angular/common/http';
import {SubjectsModal} from '../../pages/dashboard/subjects/modal/subjects.modal';
import {TopicsModal} from '../../pages/dashboard/subjects/topics/modal/topics.modal';
import {LessonsModal} from '../../pages/dashboard/subjects/topics/lessons/modal/lessons.modal';
import {ConversationsModal} from '../../pages/dashboard/subjects/topics/lessons/conversations/modal/conversations.modal';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    NavbarComponent,
    RatingsComponent,
    PaginationComponent,
    LoaderComponent,
    SubjectsModal,
    TopicsModal,
    LessonsModal,
    ConversationsModal
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgbPaginationModule,
    HttpClientModule,
    CKEditorModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    CKEditorModule,
    NavbarComponent,
    RatingsComponent,
    PaginationComponent,
    LoaderComponent,
    SubjectsModal,
    TopicsModal,
    LessonsModal,
    ConversationsModal
  ],
  entryComponents: [
    SubjectsModal,
    TopicsModal,
    LessonsModal,
    ConversationsModal
  ]
})
export class SharedModule {}
