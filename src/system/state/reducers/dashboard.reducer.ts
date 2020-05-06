import {DASHBOARD} from '../actions/dashboard.action';
import {DashboardInterface} from '../../interfaces/state/dashboard.interface';
import {updateArray} from '../../utils/utils';

export const INITIAL_DASHBOARD_STATE: DashboardInterface = {
  coursepacks: [],
  coursepacksLength: 0
};

export function dashboardReducer(state: DashboardInterface = INITIAL_DASHBOARD_STATE, action) {
  switch (action.type) {
    case DASHBOARD.CHANGE_USER_COURSEPACKS:
      return {...state, ...{coursepacks: action.coursepacks, coursepacksLength: action.coursepacks.length}};
    case DASHBOARD.UPDATE_USER_COURSEPACKS_DATA:
      return {
        ...state, ...{
          coursepacks: updateArray(state.coursepacks, action.coursepacks),
          coursepacksLength: state.coursepacksLength + 1
        }
      };
    default:
      return state;
  }
}
