const CURRENCY = '&#36;';
const BUTTON = {
  CREATE_ACCOUNT: 'Create Account',
  CREATING: 'Creating...',
  SIGN_IN: 'Sign In',
  SIGNING_IN: 'Signing In...'
};

const SUCCESS_MSG = {
  ACCOUNT_CREATED: 'Account created successfully, Please Sign in',
  LOGIN_SUCCESSFUL: 'Login Successful'
};

const FAILURE_MSG = {
  ACCOUNT_EXISTS: 'The Username or Email exist'
};

const ERROR_CODES = {
  DUPLICATE_KEY: 11000,
  VALIDATION_ERROR: 11100,
  UNAUTHORIZED_KEY: 10100
};

export { CURRENCY, BUTTON, SUCCESS_MSG, FAILURE_MSG, ERROR_CODES };
