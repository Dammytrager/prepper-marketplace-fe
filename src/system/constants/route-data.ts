const TITLE = {
  DASHBOARD_HOME: 'Dashboard',
  DASHBOARD_COURSEPACKS: 'Dashboard | Your Coursepacks',
  DASHBOARD_EARNINGS: 'Dashboard | Your Earnings',
  DASHBOARD_COURSES: 'Dashboard | Your Courses',
  DASHBOARD_LESSONS: 'Dashboard | Your Lessons',
  USER_SIGN_IN: 'User | Sign In',
  USER_SIGN_UP: 'User | Sign Up',
  USER_FORGOT_PASSWORD: 'User | Forgot Password',
  USER_ADMIN_UNLOCK: 'User | Admin Unlock'
};

const AUTH_PAGE = {
  SIGN_IN: {
    backdrop: {
      bigText: 'Get Inspired and Create'
    },
    contentArea: {
      title: 'Welcome to Your Dashboard',
      subtitle: 'Please sign in'
    },
    background: 'black'
  },
  SIGN_UP: {
    backdrop: {
      bigText: 'We\'re very happy you are joining our community!',
      smallText: 'Create your account today and receive 50% off.'
    },
    contentArea: {
      title: 'Create New Account',
      subtitle: 'Please add your details'
    },
    background: 'green'
  },
  FORGOT_PASSWORD: {
    backdrop: {
      bigText: 'You are awesome! Build something amazing!'
    },
    contentArea: {
      title: 'Don’t worry, we’ve got your back',
      subtitle: 'Please enter your username or email'
    },
    background: 'blue'
  },
  ADMIN_UNLOCK: {
    backdrop: {
      bigText: ' You have 5 new notifications!'
    },
    contentArea: {
      title: 'Welcome back, Admin',
      subtitle: 'Please enter your password',
      position: 'center'
    },
    background: 'red'
  }
};

export {TITLE, AUTH_PAGE};