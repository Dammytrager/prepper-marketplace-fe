export interface CoursePackData {
  title: string;
  price: number;
  lessons: number;
  hours: string;
  approved?: boolean;
  ratings?: number;
  reviews?: number;
}

export interface CourseInterface {
  title: string;
  lessons: number;
}
