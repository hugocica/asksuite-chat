import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {Router} from '@angular/router';
import {UserStorageService} from '../../../util/user.storage.service';
import {LoginService} from '../../../service/login.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        showCloseButton: true
    });

    constructor(public settings: SettingsService,
                fb: FormBuilder,
                private router : Router,
                private userStorage : UserStorageService,
                private spinner: NgxSpinnerService,
                public toasterService: ToasterService,
                private loginService : LoginService) {

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });
    }

   async submitForm($ev, value: any) {

        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {


            try{
                this.spinner.show();

                let doneUser = await this.loginService.doLogin(this.valForm.value.email, this.valForm.value.password);
                await this.userStorage.save(doneUser);
                this.router.navigate(['home']);
                console.log('Valid!');
                console.log(value);

            }catch (e) {
                this.toasterService.pop('error', 'Erro', 'Usuário/Senha inválida');
                console.log(e);
            }finally {
                this.spinner.hide();
            }

        }
    }

    ngOnInit() {
    }

}
