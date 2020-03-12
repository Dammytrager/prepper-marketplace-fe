import {Component, OnDestroy, OnInit} from '@angular/core';
import {patternMatch, confirmPassword} from '../../../system/utils/validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {REGEX} from '../../../system/constants/regex';
import {BUTTON, ERROR_CODES, FAILURE_MSG, SUCCESS_MSG} from '../../../system/constants/static-content';
import {UserService} from '../../../system/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'plm-sign-up',
  templateUrl: './sign-up.html'
})
export class SignUp implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  showLoader = false;
  btnText: String;

  constructor(
    private _fb: FormBuilder,
    private _user: UserService) {}

  ngOnInit() {
    this.btnText = BUTTON.CREATE_ACCOUNT;
    this.signUpForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, patternMatch(REGEX.EMAIL)]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      terms: ['', Validators.required]
    }, {validator: confirmPassword});

  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirm_password() {
    return this.signUpForm.get('confirm_password');
  }

  get terms() {
    return this.signUpForm.get('terms');
  }

  async register() {
    if (this.signUpForm.valid) {
      this.showLoader = true;
      this.btnText = BUTTON.CREATING;
      const userData = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      };
      await this._user.registerUser(userData);
      this.showLoader = false;
      this.btnText = BUTTON.CREATE_ACCOUNT;
    }
  }

  ngOnDestroy() {}
}

