export const minLength = (n: number) => (s: string) => s.length >= n || `Too short. Minimal length is ${n} characters`;

export const maxLength = (n: number) => (s: string) => s.length <= n || `Too long. Maximal length is ${n} characters`;

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
