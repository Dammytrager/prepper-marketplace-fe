import {NgModule} from '@angular/core';

import {SharedModule} from './shared.module';
import {Auth} from '../../pages/auth/auth';
import {AuthRoutes} from '../routes/auth.routes';
import {SignIn} from '../../pages/auth/sign-in/sign-in';
import {SignUp} from '../../pages/auth/sign-up/sign-up';
import {ForgotPassword} from '../../pages/auth/forgot-password/forgot-password';
import {AdminUnlock} from '../../pages/auth/admin-unlock/admin-unlock';

@NgModule({
  declarations: [
    Auth,
    SignIn,
    SignUp,
    ForgotPassword,
    AdminUnlock
  ],
  imports: [
    AuthRoutes,
    SharedModule,
  ],
  providers: []
})
export class AuthModule {}


