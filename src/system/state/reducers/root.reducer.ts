import {combineReducers, Reducer} from 'redux';
import {INITIAL_SITE_STATE, siteReducer} from './site.reducer';
import {dashboardReducer, INITIAL_DASHBOARD_STATE} from './dashboard.reducer';
import {AppState} from '../../interfaces/state/plm.interface';
import {INITIAL_USER_STATE, userReducer} from './user.reducer';

export const INITIAL_STATE: AppState = {
  dashboard: INITIAL_DASHBOARD_STATE,
  site: INITIAL_SITE_STATE,
  user: INITIAL_USER_STATE
};

export const RootReducer: Reducer<AppState> = combineReducers({
  site: siteReducer,
  dashboard: dashboardReducer,
  user: userReducer
});
