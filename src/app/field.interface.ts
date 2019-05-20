export interface FieldConfig {
  label?: string;
  id?: number;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type?: string;
  default_value?: any;
  elements?: FieldConfig[]
  // validations?: Validator[];
}

export interface editFieldConfig {
    label?: string;
    id?: number;
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type?: string;
    default_value?: any;
    elements?: FieldConfig[]
}