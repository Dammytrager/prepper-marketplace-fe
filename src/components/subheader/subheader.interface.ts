interface SubheaderContent {
  icon?: boolean | string[];
  text?: string;
  color?: 'primary' | 'secondary';
  template?: boolean;
  run?: () => void;
}

export interface SubheaderInterface {
  title: SubheaderContent;
  action?: boolean | SubheaderContent;
}
