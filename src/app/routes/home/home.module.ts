import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import {ChartsModule as Ng2ChartsModule} from 'ng2-charts/ng2-charts';
import {SharedModule} from '../../shared/shared.module';
import {SelectModule} from 'ng2-select';
import {NgxSelectModule} from 'ngx-select-ex';
import {CompanyService} from '../../service/company.service';
import {CompanyResolver} from '../../service/resolver/company.resolver';
import {NgxSpinnerModule} from 'ngx-spinner';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ],
    providers:[
        CompanyService,
    ]
})
export class HomeModule { }
