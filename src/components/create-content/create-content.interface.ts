export interface CreateContentInterface {
  title: string;
  formFields: FieldInterface[];
  formFieldsCount: number;
  button?: CreateContentButtonInterface;
}

interface FieldInterface {
  placeholder?: string;
  formControl?: string;
  type: 'text' | 'select';
  options?: OptionsInterface[];
}

interface CreateContentButtonInterface {
  text: string;
  action?: () => void;
  icon?: string[];
}

interface OptionsInterface {
  value: string;
  text: string;
}
