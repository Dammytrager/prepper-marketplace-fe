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
    private _user: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService) {}

  ngOnInit() {
    this.btnText = BUTTON.CREATE_ACCOUNT;
    this.signUpForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, patternMatch(REGEX.EMAIL)]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      terms: ['', Validators.required]
    }, {validator: confirmPassword});

    // this._toastr.error('hello \n hi');
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

  register() {
    if (this.signUpForm.valid) {
      this.showLoader = true;
      this.btnText = BUTTON.CREATING;
      const userData = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      };
      this._user.registerUser(userData)
        .then((response) => {
        const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/auth/sign-in';
        this._router.navigate([returnUrl]).then(() => {
          this._toastr.success(SUCCESS_MSG.ACCOUNT_CREATED, '', {timeOut: 7000});
        });
      })
        .catch((err) => {
        console.log(err);
        if (err.error.code === ERROR_CODES.DUPLICATE_KEY) {
          this._toastr.error(FAILURE_MSG.ACCOUNT_EXISTS);
        } else if (err.error.code === ERROR_CODES.VALIDATION_ERROR) {
          let message = '';
          err.error.errors.forEach((error) => {
            message += error + ',br>';
          });
          this._toastr.error(message, '', {
            enableHtml: true,
            timeOut: 7000
          });
        }
      })
        .finally(() => {
          this.showLoader = false;
          this.btnText = BUTTON.CREATE_ACCOUNT;
      });
    }
  }

  ngOnDestroy() {}
}

