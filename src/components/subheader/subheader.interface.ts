interface SubheaderContent {
  icon?: boolean | string[];
  text?: string;
  color?: 'primary' | 'secondary';
}

export interface SubheaderInterface {
  title: SubheaderContent;
  action?: boolean | SubheaderContent;
}
