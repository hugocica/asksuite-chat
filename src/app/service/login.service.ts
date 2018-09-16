import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class LoginService {

    constructor(private http : HttpClient) {}

    doLogin(user, password) {

        const obj = {
            email: user,
            password : password
        }

        return this.http.post(`${environment.url_rest}/users/login`,obj, httpOptions).toPromise();
    }
}