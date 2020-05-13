export interface DashboardInterface {
  coursepacks: any[];
  coursepacksLength: number;
  courses: any[];
  coursesLength: number;
  popupData: PopupInterface;
  selectedCoursepack: any;
  selectedCourse: any;
}

export interface PopupInterface {
  title?: string;
  button?: string;
  data?: any;
}
