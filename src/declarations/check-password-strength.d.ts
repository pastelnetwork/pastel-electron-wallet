declare module 'check-password-strength' {
  export type TPasswordStrengthResult = {
    id: 0 | 1 | 2 | 3
    value: 'Too weak' | 'Weak' | 'Medium' | 'Strong'
  }
  export function passwordStrength(password: string): TPasswordStrengthResult
}
