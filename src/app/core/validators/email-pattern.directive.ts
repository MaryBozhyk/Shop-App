import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailPatternValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: EmailPatternDirective,
      multi: true
  }]
})
export class EmailPatternDirective implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    const pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    const email = c.value;

    if (email.match(pattern) || !email) {
        return null;
    }

    return { emailMatch: true };
  }
}
