import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html'  
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(ValidatorsService.firstNameAndLastnamePattern)]],
    //email: ['', [Validators.required, Validators.pattern(ValidatorsService.emailPattern)], [ new EmailValidator() ]],
    email: ['', [Validators.required, Validators.pattern(ValidatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {    
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ],
    
    
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService:ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  isInvalidField(field: string): boolean | null {
    return this.validatorsService.isInvalidField(this.myForm, field);
  }  

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
