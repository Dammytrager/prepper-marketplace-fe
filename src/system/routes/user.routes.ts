import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TITLE} from '../constants/route-data';
import {User} from '../../pages/dashboard/user/user';
import {Settings} from '../../pages/dashboard/user/settings/settings';

const USER_ROUTES: Routes = [
  {
    path: '',
    component: User,
    children: [
      {
        path: 'settings',
        component: Settings,
        data: {
          title: TITLE.USER_SETTINGS
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})

export class UserRoutes { }
