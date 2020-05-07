export interface DashboardInterface {
  coursepacks: any[];
  coursepacksLength: number;
  popupData: PopupInterface;
}

export interface PopupInterface {
  title?: string;
  button?: string;
  data?: any;
}
