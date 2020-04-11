import {ERROR_CODES, FAILURE_MSG, INFO_MSG} from '../constants/static-content';

export function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function handleOtherErrors(code) {
 if (code === ERROR_CODES.UNKNOWN_ERROR) {
    return this._toastr.error(FAILURE_MSG.UNKNOWN_ERROR);
  } else {
    return this._toastr.error(INFO_MSG.CHECK_INTERNET);
  }
}

export function handleValidationError(errors, toast) {
  let message = '';
  errors.forEach((error) => {
    message += error + '<br>';
  });
  return toast.error(message, '', {
    enableHtml: true,
    timeOut: 7000
  });
}
