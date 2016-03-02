import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {ControlMessages} from './control-messages.component';
import {ValidationService} from './validation.service';


interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'ae-app',
  template:`
              <form [ngFormModel]="userForm" (submit)="saveUser()">
                <label for="name">Name</label>
                <input ngControl="name" id="name" />
                <control-messages control="name"></control-messages>

                <label for="email">Email</label>
                <input ngControl="email" id="email" />
                <control-messages control="email"></control-messages>

                <button type="submit" [disabled]="!userForm.valid">Submit</button>
              </form>
              `,
 directives: [ControlMessages]
})
export class AppComponent {
  userForm: any;

  constructor(private _formBuilder: FormBuilder) {
    this.userForm = this._formBuilder.group({
        'name': ['', Validators.required],
        'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])
    });
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(`Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`);
    }
  }
}
