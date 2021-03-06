import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {CompanyService} from '../company.service';

@Injectable()
export class CompanyResolver implements Resolve<any> {
    constructor(private companyService : CompanyService) {}

    resolve() {
        return this.companyService.list();
    }
}