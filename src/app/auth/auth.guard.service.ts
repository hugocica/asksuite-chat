import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UserStorageService} from '../util/user.storage.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: UserStorageService, public router: Router) {}

   async canActivate() {

    let isAuth =   await this.auth.isAuthenticated();

    if (!isAuth) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}