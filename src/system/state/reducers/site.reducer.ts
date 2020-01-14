import {SiteInterface} from '../../interfaces/state/site.interface';
import {SITE} from '../actions/site.action';

export const INITIAL_SITE_STATE: SiteInterface = {
  url: '',
  title: '',
  extraInfo: {}
};

export function siteReducer(state: SiteInterface = INITIAL_SITE_STATE, action) {
  switch (action.type) {
    case SITE.CHANGE_URL:
      return Object.assign({}, state, {
        url: action.url
      });
    case SITE.CHANGE_TITLE:
      return Object.assign({}, state, {
        title: action.title
      });
    case SITE.CHANGE_EXTRA_INFO:
      return Object.assign({}, state, {
        extraInfo: action.extraInfo
      });

    default:
      return state;
  }
}
