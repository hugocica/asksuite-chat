import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {RequestUtil} from './requestutil';


@Injectable()
export class UserService {

    constructor(private http: HttpClient, private requestUtil: RequestUtil) {
    }

    async changePassword(currentPassword, newPassword) {

        let requestObj = await this.requestUtil.getDefaultRequestOptions();

        const obj = {
            currentPassword: currentPassword,
            newPassword : newPassword
        }

        return this.http.post(`${environment.url_rest}/users/password/changePasswordForUser`, obj, requestObj).toPromise();
    }

}