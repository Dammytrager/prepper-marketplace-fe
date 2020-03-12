import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BUTTON} from '../../../system/constants/static-content';
import {UserService} from '../../../system/services/user.service';

@Component({
  selector: 'plm-sign-in',
  templateUrl: './sign-in.html'
})
export class SignIn implements OnInit, OnDestroy {

  signInForm: FormGroup;
  showLoader = false;
  btnText: String;

  constructor(
    private _fb: FormBuilder,
    private _user: UserService
  ) {}

  ngOnInit() {
    this.btnText = BUTTON.SIGN_IN;
    this.signInForm = this._fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get username() {
    return this.signInForm.get('username');
  }

  get password() {
    return this.signInForm.get('password');
  }

  async signIn() {
    if (this.signInForm.valid) {
      this.btnText = BUTTON.SIGNING_IN;
      this.showLoader = true;
      await this._user.login(this.signInForm.value);
      this.btnText = BUTTON.SIGN_IN;
      this.showLoader = false;
    }
  }

  ngOnDestroy() {}
}

