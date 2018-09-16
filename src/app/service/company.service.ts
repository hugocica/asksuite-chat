import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {RequestUtil} from './requestutil';


@Injectable()
export class CompanyService {

    constructor(private http: HttpClient, private requestUtil: RequestUtil) {
    }

    async list() {

        let requestObj = await this.requestUtil.getDefaultRequestOptions();

        return this.http.get(`${environment.url_rest}/companies`, requestObj).toPromise();
    }

}