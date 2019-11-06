export interface NotificationsInterface {
  type: 'success' | 'info' | 'warning' | 'danger';
  message: string;
  time: string;
}
