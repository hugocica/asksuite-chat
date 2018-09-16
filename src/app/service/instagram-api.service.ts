import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {RequestUtil} from './requestutil';


@Injectable()
export class InstagramApiService {


    constructor(private http: HttpClient, private requestUtil: RequestUtil) {
    }

    async findBy(companyId) {
        return this.http.get(`${environment.url_instagram}/accounts/${companyId}`).toPromise();
    }

    async listAll() {
        return this.http.get(`${environment.url_instagram}/accounts`).toPromise();
    }

    async validateAccount(username, password) {
        let obj = {
            username: username,
            password: password,
        }
        return this.http.post(`${environment.url_instagram}/accounts/validate`, obj).toPromise();
    }

    async saveAccount(username, password, companyId) {
        let obj = {
            username: username,
            password: password,
            companyId: companyId
        }
        console.log(obj);
        return this.http.post(`${environment.url_instagram}/accounts`, obj).toPromise();
    }


    async challenge(username, code) {
        let obj = {
            username: username,
            code: code,
        }
        return this.http.post(`${environment.url_instagram}/accounts/challenge`, obj).toPromise();
    }


    async delete(companyId) {
        return this.http.delete(`${environment.url_instagram}/accounts/${companyId}`).toPromise();
    }





}