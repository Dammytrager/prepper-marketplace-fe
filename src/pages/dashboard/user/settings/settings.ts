import {Component, OnDestroy, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {confirmPassword, patternMatch} from '../../../../system/utils/validators';
import {REGEX} from '../../../../system/constants/regex';
import {BUTTON} from '../../../../system/constants/static-content';
import {UserService} from '../../../../system/services/user.service';

@Component({
  selector: 'plm-user-settings',
  templateUrl: './settings.html'
})
export class Settings implements OnInit, OnDestroy {
  @select(['user', 'data']) userData$: Observable<any>;
  $userData$: Subscription;
  fullname: any;
  profileForm: FormGroup;
  personalDetailsForm: FormGroup;
  passwordForm: FormGroup;
  showProfileLoader = false;
  showPersonalDetailsLoader = false;
  showPasswordLoader = false;
  profileBtnText = BUTTON.UPDATE;
  personalDetailsBtnText = BUTTON.UPDATE;
  passwordBtnText = BUTTON.UPDATE;

  constructor(private _fb: FormBuilder,
              private _user: UserService) {
    this.profileForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, patternMatch(REGEX.EMAIL)]]
    });

    this.personalDetailsForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: this._fb.group({
        street1: ['', Validators.required],
        street2: [''],
        city: ['', Validators.required],
        postalCode: ['', Validators.required]
      })
    });

    this.passwordForm = this._fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {validator: confirmPassword});
  }

  get username() {
    return this.profileForm.get('username');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get firstname() {
    return this.personalDetailsForm.get('firstname');
  }
  get lastname() {
    return this.personalDetailsForm.get('lastname');
  }
  get address() {
    return this.personalDetailsForm.get('address');
  }
  get street1() {
    return this.address.get('street1');
  }
  get street2() {
    return this.address.get('street2');
  }
  get city() {
    return this.address.get('city');
  }
  get postalCode() {
    return this.address.get('postalCode');
  }
  get currentPassword() {
    return this.passwordForm.get('currentPassword');
  }
  get password() {
    return this.passwordForm.get('password');
  }
  get confirm_password() {
    return this.passwordForm.get('confirm_password');
  }

  ngOnInit() {
    this.$userData$ = this.userData$.subscribe((data) => {
      this.fullname = data.firstname + ' ' + data.lastname || data.username;
      this.username.setValue(data.username);
      this.email.setValue(data.email);
      this.firstname.setValue(data.firstname);
      this.lastname.setValue(data.lastname);
      const address = data && data.address;
      if (address) {
        this.address.patchValue(address);
      }
    });
  }

  async updateProfile() {
    if (this.profileForm.valid) {
      this.profileBtnText = BUTTON.UPDATING;
      this.showProfileLoader = true;
      const profileData = this.profileForm.value;
      await this._user.updateProfile(profileData);
      this.profileBtnText = BUTTON.UPDATE;
      this.showProfileLoader = false;
    }
  }

  async updatePersonalDetails() {
    if (this.personalDetailsForm.valid) {
      this.personalDetailsBtnText = BUTTON.UPDATING;
      this.showPersonalDetailsLoader = true;
      const personalDetailsData = this.personalDetailsForm.value;
      await this._user.updatePersonalDetails(personalDetailsData);
      this.personalDetailsBtnText = BUTTON.UPDATE;
      this.showPersonalDetailsLoader = false;
    }
  }

  async updatePassword() {
    if (this.passwordForm.valid) {
      this.passwordBtnText = BUTTON.UPDATING;
      this.showPasswordLoader = true;
      const passwordData = {
        currentPassword: this.currentPassword.value,
        newPassword: this.password.value
      };
      await this._user.updatePassword(passwordData);
      this.passwordBtnText = BUTTON.UPDATE;
      this.showPasswordLoader = false;
      this.passwordForm.reset();
    }
  }


  ngOnDestroy() {
    this.$userData$.unsubscribe();
  }
}
