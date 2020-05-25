const CURRENCY = '&#36;';
const BUTTON = {
  CREATE_ACCOUNT: 'Create Account',
  CREATING: 'Creating...',
  SIGN_IN: 'Sign In',
  SIGNING_IN: 'Signing In...',
  UPDATE: 'Update',
  UPDATING: 'Updating...'
};

const SUCCESS_MSG = {
  ACCOUNT_CREATED: 'Account created successfully, Please Sign in',
  LOGIN_SUCCESSFUL: 'Login Successful',
  successMessage: (entity, task) => `${entity} ${task} successfully`
};

const FAILURE_MSG = {
  ACCOUNT_EXISTS: 'The Username or Email exist',
  UNKNOWN_ERROR: 'Some error occurred, Please check back later',
  INCORRECT_OLD_PASSWORD: 'Current password is incorrect'
};

const WARNING_MSG = {};

const TASK = {
  CREATED: 'created',
  UPDATED: 'updated',
  DELETED: 'deleted'
};

const INFO_MSG = {
  CHECK_INTERNET: 'No Internet connection'
};

const ERROR_CODES = {
  DUPLICATE_KEY: 11000,
  VALIDATION_ERROR: 11100,
  UNAUTHORIZED_KEY: 10100,
  UNKNOWN_ERROR: 10000,
  NOT_FOUND: 10101
};

const ERROR_MESSAGE = {
  JWT_EXPIRED: 'jwt expired'
};

export const SUBJECT = 'Subject';
export const TOPIC = 'Topic';
export const LESSON = 'Lesson';
export const USER = 'User';

export { CURRENCY, BUTTON, SUCCESS_MSG, FAILURE_MSG, ERROR_CODES, INFO_MSG, WARNING_MSG, ERROR_MESSAGE, TASK };
