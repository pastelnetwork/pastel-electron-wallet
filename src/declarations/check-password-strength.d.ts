declare module 'check-password-strength' {
  export type TPasswordStrengthResult = {
    id: 0 | 1 | 2 | 3
    value: 'Too weak' | 'Weak' | 'Medium' | 'Strong'
  }
  export interface IPasswordOption extends TPasswordStrengthResult {
    minDiversity: number
    minLength: number
  }
  export function passwordStrength(
    password: string,
    options?: IPasswordOption[],
  ): TPasswordStrengthResult
}
