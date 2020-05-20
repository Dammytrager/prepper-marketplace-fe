export interface CoursePackData {
  title: string;
  price: number;
  courses: any[];
  hours: string;
  approve?: boolean;
  user?: string;
  ratings?: number;
  reviews?: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}

export interface CourseInterface {
  name: string;
  lessons: number | any[];
}
