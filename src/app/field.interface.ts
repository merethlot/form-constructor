export interface FieldConfig {
  label?: string;
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
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type?: string;
    default_value?: any;
    elements?: FieldConfig[]
}