import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternMatch(value: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const pass = value.test(control.value);
    return pass ? null : {'patternFail': true};
  };
}

export function confirmPassword(control: AbstractControl): {[key: string]: boolean} | null {
  const password = control.get('password');
  const confirm_password = control.get('confirm_password');
  return password && confirm_password && password.value === confirm_password.value ? null : {'misMatch': true};
}
