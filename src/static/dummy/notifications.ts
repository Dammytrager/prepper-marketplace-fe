import {NotificationsInterface} from '../../system/interfaces/notifications.interface';

export const NOTIFICATIONS: NotificationsInterface[] = [
  {
    type: 'success',
    message: 'You\'ve upgraded to a VIP account successfully!',
    time: '15 min ago'
  },
  {
    type: 'warning',
    message: 'Please check your payment info since e cant validate them!',
    time: '50 min ago'
  },
  {
    type: 'danger',
    message: 'Web server stopped responding and it was automatically restarted!',
    time: '4 hours ago'
  },
  {
    type: 'warning',
    message: 'Please consider upgrading your plan. You are running out of space',
    time: '16 hours ago'
  },
  {
    type: 'info',
    message: 'New Purchases! +$250',
    time: '1 day ago'
  },
];
