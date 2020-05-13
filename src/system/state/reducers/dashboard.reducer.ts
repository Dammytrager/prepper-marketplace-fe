import {DASHBOARD} from '../actions/dashboard.action';
import {DashboardInterface} from '../../interfaces/state/dashboard.interface';
import {updateArray} from '../../utils/utils';

export const INITIAL_DASHBOARD_STATE: DashboardInterface = {
  coursepacks: [],
  coursepacksLength: 0,
  courses: [],
  coursesLength: 0,
  popupData: {},
  selectedCoursepack: {},
  selectedCourse: {}
};

export function dashboardReducer(state: DashboardInterface = INITIAL_DASHBOARD_STATE, action) {
  switch (action.type) {
    case DASHBOARD.CHANGE_USER_COURSEPACKS:
      return {...state, ...{coursepacks: action.coursepacks, coursepacksLength: action.coursepacks.length}};
    case DASHBOARD.UPDATE_USER_COURSEPACKS_DATA:
      return {...state, ...{coursepacks: updateArray(state.coursepacks, action.coursepacks)}};
    case DASHBOARD.UPDATE_USER_COURSEPACKS_LENGTH:
      return {...state, ...{coursepacksLength: state.coursepacksLength + 1}};
    case DASHBOARD.CHANGE_POPUP_DATA:
      return {...state, ...{popupData: action.popupData}};
    case DASHBOARD.CHANGE_SELECTED_COURSEPACK:
      return {...state, ...{selectedCoursepack: action.selectedCoursepack}};
    case DASHBOARD.CHANGE_COURSES:
      return {...state, ...{courses: action.courses, coursesLength: action.courses.length}};
    case DASHBOARD.UPDATE_COURSE_DATA:
      return {...state, ...{courses: updateArray(state.courses, action.courses)}};
    case DASHBOARD.UPDATE_COURSES_LENGTH:
      return {...state, ...{coursesLength: state.coursesLength + 1}};
    case DASHBOARD.CHANGE_SELECTED_COURSE:
      return {...state, ...{selectedCourse: action.selectesCourse}};
    default:
      return state;
  }
}
