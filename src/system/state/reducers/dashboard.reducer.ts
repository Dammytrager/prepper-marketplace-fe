import {DASHBOARD} from '../actions/dashboard.action';
import {DashboardInterface} from '../../interfaces/state/dashboard.interface';
import {removeItem, updateArray} from '../../utils/utils';

export const INITIAL_DASHBOARD_STATE: DashboardInterface = {
  coursepacks: [],
  coursepacksLength: 0,
  courses: [],
  coursesLength: 0,
  lessons: [],
  lessonsLength: 0,
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
    case DASHBOARD.CHANGE_LESSONS:
      return {...state, ...{lessons: action.lessons, lessonsLength: action.lessons.length}};
    case DASHBOARD.UPDATE_LESSON_DATA:
      return {...state, ...{lessons: updateArray(state.lessons, action.lessons)}};
    case DASHBOARD.UPDATE_COURSES_LENGTH:
      return {...state, ...{coursesLength: state.coursesLength + 1}};
    case DASHBOARD.UPDATE_LESSONS_LENGTH:
      return {...state, ...{lessonsLength: state.lessonsLength + 1}};
    case DASHBOARD.CHANGE_SELECTED_COURSE:
      return {...state, ...{selectedCourse: action.selectedCourse}};
    case DASHBOARD.REMOVE_COURSEPACK:
      return {...state, ...{coursepacks: removeItem(state.coursepacks, action.coursepack), coursepacksLength: state.coursepacksLength - 1}};
    case DASHBOARD.REMOVE_COURSE:
      return {...state, ...{courses: removeItem(state.courses, action.course), coursesLength: state.coursesLength - 1}};
    case DASHBOARD.REMOVE_LESSON:
      return {...state, ...{lessons: removeItem(state.lessons, action.lesson), lessonsLength: state.lessonsLength - 1}};
    default:
      return state;
  }
}
