import {UserInterface} from '../../interfaces/state/user.interface';
import {USER} from '../actions/user.action';

export const INITIAL_USER_STATE: UserInterface = {
  isLoggedIn: false,
  data: {},
  noOfLogin: 0
};

export function userReducer(state: UserInterface = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case USER.CHANGE_LOGIN_STATUS:
      return {...state, ...{isLoggedIn: action.status}};
      case USER.CHANGE_USER_DATA:
        return {...state, ...{data: action.data}};
      case USER.CHANGE_NO_OF_LOGIN:
        return {...state, ...{noOfLogin: action.noOfLogin}};

    default:
      return state;
  }
}
