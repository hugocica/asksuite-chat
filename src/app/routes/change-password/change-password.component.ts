import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {UserService} from '../../service/user.service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {UserStorageService} from '../../util/user.storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


    valForm: FormGroup;


  constructor(private fb: FormBuilder,
              private userService : UserService,
              public toasterService: ToasterService,
              private router : Router,
              private spinner: NgxSpinnerService,
              private userStorage : UserStorageService,) {


  }

    async submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {

            this.spinner.show();

            try{
                let doneUser = await this.userService.changePassword(value.currentPassword, value.passwordGroup.password)
                this.toasterService.pop("success", "Sucesso", "Sua senha foi trocada com sucesso!");
                await this.userStorage.save(doneUser);
                this.router.navigate(['home']);

            }catch (e) {

                console.log(e);
                this.toasterService.pop("error", "Erro", e.error.message);

            }finally {
                this.spinner.hide();
            }

            console.log('Valid!');
        }

    }

  ngOnInit() {

      let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
      let certainPassword = new FormControl('', CustomValidators.equalTo(password));
      // Model Driven validation
      this.valForm = this.fb.group({
          'currentPassword': [null, Validators.required],
          'passwordGroup': this.fb.group({
              password: password,
              confirmPassword: certainPassword
          })

      });
  }

}
