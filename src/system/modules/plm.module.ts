import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlmComponent } from '../../pages/plm.component';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {AppState} from '../interfaces/state/plm.interface';
import {StoreEnhancer} from 'redux';
import {environment} from '../../environments/environment';
import {INITIAL_STATE, RootReducer} from '../state/reducers/root.reducer';
import {MainRoute} from '../routes/main.route';
import {SharedModule} from './shared.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardGuard} from '../routes/dashboard.guard';
import {AuthGuard} from '../routes/auth.guard';

@NgModule({
  declarations: [
    PlmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgReduxModule,
    SharedModule,
    ToastrModule.forRoot(),
    MainRoute
  ],
  providers: [DashboardGuard, AuthGuard],
  bootstrap: [PlmComponent]
})
export class PlmModule {
  constructor(private _ngRedux: NgRedux<AppState>, private _reduxDevTools: DevToolsExtension) {
    const enhancers: StoreEnhancer<AppState>[] = !environment.production && this._reduxDevTools.isEnabled() ?
      [this._reduxDevTools.enhancer()] : [];

    this._ngRedux.configureStore(RootReducer, INITIAL_STATE, [], enhancers);
  }
}
