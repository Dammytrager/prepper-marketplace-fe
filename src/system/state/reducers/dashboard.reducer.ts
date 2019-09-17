import {DASHBOARD} from '../actions/dashboard.action';
import {DashboardInterface} from '../../interfaces/state/dashboard.interface';

export const INITIAL_DASHBOARD_STATE: DashboardInterface = {
  test: ''
};

export function dashboardReducer(state: DashboardInterface = INITIAL_DASHBOARD_STATE, action) {
  switch (action.type) {
    case DASHBOARD.TEST:
      return {...state, ...{test: 'tested'}};

    default:
      return state;
  }
}
