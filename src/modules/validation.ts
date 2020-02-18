export const minLength = (n: number) => (s: string) => s.length >= n || `Too short. Minimal length is ${n} characters`;

export const maxLength = (n: number) => (s: string) => s.length <= n || `Too long. Maximal length is ${n} characters`;

export const minValue = (n: number) => (s: string) => +s >= n || `Too small. Must be greater than or equal to ${n}`;

export const maxValue = (n: number) => (s: string) => +s <= n || `Too large. Must be less than or equal to ${n}`;

export const isNumber = (s: string) => !isNaN(Number(s)) || `Not an integer value`;

export const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s) || `Invalid email`;

export type Validator = (arg: string) => boolean | string;

export const combineValidator = (validators: Validator[]) => {
  return (s: string) => {
    for (const k in validators) {
      const validator = validators[k];
      const result = validator(s);
      if (result !== true) {
        return result;
      }
    }
    return true;
  };
};
