import {Component, OnInit} from '@angular/core';
import {InstagramApiService} from '../../service/instagram-api.service';
import {UserStorageService} from '../../util/user.storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ToasterService} from 'angular2-toaster';
import {SweetAlertService} from 'ng2-sweetalert2';
import {ActivatedRoute} from '@angular/router';

@Component({
    providers: [SweetAlertService],
    selector: 'app-instagram-auth',
    templateUrl: './instagram-auth.component.html',
    styleUrls: ['./instagram-auth.component.scss']
})
export class InstagramAuthComponent implements OnInit {

    user;
    showSearchCompany = true;
    valForm: FormGroup;
    items;
    companyId;
    instagramAccount;

    //

    constructor(private fb: FormBuilder,
                public toasterService: ToasterService,
                private api: InstagramApiService,
                private userStorage: UserStorageService,
                private spinner: NgxSpinnerService,
                private route: ActivatedRoute,
    ) {
        this.valForm = this.fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
        });

    }

    async  delete(){
        try{
            await this.api.delete(this.companyId);
            this.instagramAccount = null;

            this.toasterService.pop('success', 'Sucesso', 'Sua conta foi excluída com sucesso!');

        }catch (e) {
            this.toasterService.pop('error', 'Erro', e.error.message);
        }

    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
        this.companyId = value;
        this.refreshData();
    }

    removed() {
        this.companyId = null;
        this.refreshData();
    }


    async ngOnInit() {
        this.user = await this.userStorage.getCurrentUser();
        this.refreshData();

        if (this.isSingleHotel()) {
            this.showSearchCompany = false;
        }

        this.items = this.route.snapshot.data.company.map(item => {
            return {companyId: item.companyId, name: item.json.hotelName ? item.json.hotelName : item.companyId};
        });
    }

    async submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {

            this.spinner.show();

            try {

                let validateAccount = await this.api.validateAccount(value.username, value.password);

                console.log(validateAccount);

                let doneUser = await this.api.saveAccount(value.username, value.password, this.companyId);
                this.toasterService.pop('success', 'Sucesso', 'Você foi conectado ao Instagram com sucesso!');

                this.instagramAccount = doneUser;


            } catch (e) {

                console.log(e);

                if (e.status == 0) {
                    this.toasterService.pop('error', 'Erro', 'Erro de conexão, tente novamente mais tarde ');

                } else if (e.status == 400 || e.status == 500) {
                    this.toasterService.pop('error', 'Erro', e.error.message);
                } else {


                    let stepData = e.error.error.step_data;
                     this.toasterService.pop("info", "Vefique seu Celular", "Verifique seu celular e clique na opção 'Fui Eu' e clique no botão 'Enviar' novamente");


                    // var x = window.prompt("Verifique seu email: "+ stepData.contact_point+ " e digite o código que você receber abaixo")

                    // try{
                    //     await this.api.challenge(value.username, x);
                    // }catch (e) {
                    //     console.log("erro no challenge")
                    // }
                }

                //  console.log(e);
                // this.toasterService.pop("error", "Erro", e.error.message);

            } finally {
                this.spinner.hide();
            }
            console.log('Valid!');
        }

    }


    async refreshData() {

        this.spinner.show();

        if (this.isSingleHotel()) {
            this.showSearchCompany = false;
            this.companyId = this.user.companiesIds[0];
        }


        try {
            if (this.companyId != null) {
                let instagram = await this.api.findBy(this.companyId);

                this.instagramAccount = instagram;
                console.log(instagram);
            }
        } catch (e) {

            this.instagramAccount = null;
            console.log('deu erro');


        } finally {
            this.spinner.hide();
        }
    }

    isSingleHotel(){
        return this.user.role == 'HOTEL_USER';
    }




}
