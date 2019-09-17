import {SiteInterface} from '../../interfaces/state/site.interface';
import {SITE} from '../actions/site.action';

export const INITIAL_SITE_STATE: SiteInterface = {
  route: ''
};

export function siteReducer(state: SiteInterface = INITIAL_SITE_STATE, action) {
  switch (action.type) {
    case SITE.CHANGE_ROUTE:
      return Object.assign({}, state, {
        route: action.route
      });

    default:
      return state;
  }
}
