import {NgModule} from '@angular/core';

import {SharedModule} from './shared.module';
import {Settings} from '../../pages/dashboard/user/settings/settings';
import {UserRoutes} from '../routes/user.routes';
import {User} from '../../pages/dashboard/user/user';

@NgModule({
  declarations: [
    User,
    Settings,
  ],
  imports: [
    UserRoutes,
    SharedModule,
  ],
  providers: []
})
export class UserModule {}


