import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Auth} from '../../pages/auth/auth';
import {SignIn} from '../../pages/auth/sign-in/sign-in';
import {SignUp} from '../../pages/auth/sign-up/sign-up';
import {ForgotPassword} from '../../pages/auth/forgot-password/forgot-password';
import {AdminUnlock} from '../../pages/auth/admin-unlock/admin-unlock';
import {TITLE, AUTH_PAGE} from '../constants/route-data';
import {AuthGuard} from './auth.guard';

const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: Auth,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sign-in',
        component: SignIn,
        data: {
          title: TITLE.AUTH_SIGN_IN,
          pageInfo: AUTH_PAGE.SIGN_IN
        },
      },
      {
        path: 'sign-up',
        component: SignUp,
        data: {
          title: TITLE.AUTH_SIGN_UP,
          pageInfo: AUTH_PAGE.SIGN_UP
        },
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        data: {
          title: TITLE.AUTH_FORGOT_PASSWORD,
          pageInfo: AUTH_PAGE.FORGOT_PASSWORD
        }
      },
      {
        path: 'admin-unlock',
        component: AdminUnlock,
        data: {
          title: TITLE.AUTH_ADMIN_UNLOCK,
          pageInfo: AUTH_PAGE.ADMIN_UNLOCK
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})

export class AuthRoutes { }
