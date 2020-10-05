import { AbstractControl, ValidatorFn } from '@angular/forms';


export class CustomValidators {
  static minLengthValidator(minLength): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const { value } = control;

      if (!value) {
        return null;
      }

      const min = value ? value.trim().length >= minLength : 0;

      return !min ? { minlength: true } : null;
    };
  }
}
