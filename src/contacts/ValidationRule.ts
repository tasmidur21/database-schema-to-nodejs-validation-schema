export interface ValidationRule {
    required?: boolean;
    allowNull?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    min?: number;
    max?: number;
    minLength?: number,
    maxLength?: number,
    length?: number;
    pattern?: RegExp;
    validValues?: Array<string | number | boolean>;
    customValidator?: (value: any) => boolean | Promise<boolean>;
    nestedSchema?: ValidationSchema; // for nested objects or arrays
  }
  
  export interface ValidationSchema {
    [key: string]: string[];
  }
  
  