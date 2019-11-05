export interface PaginationInterface {
  collectionSize?: number;
  maxSize?: number;
  page?: number;
  ellipses?: boolean;
  boundaryLinks?: boolean;
  rotate?: boolean;
  directionLinks?: boolean;
  size?: 'sm' | 'lg' | '';
  classNames: string;
}
