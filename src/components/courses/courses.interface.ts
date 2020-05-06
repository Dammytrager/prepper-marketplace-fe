export interface CoursePackData {
  title: string;
  price: number;
  lessons: number;
  hours: string;
  approve?: boolean;
  user?: string;
  ratings?: number;
  reviews?: number;
  _id?: string;
  createdAt?: string;
  __v?: string;
}

export interface CourseInterface {
  title: string;
  lessons: number;
}
