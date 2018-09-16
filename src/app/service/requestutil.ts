import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';
import {UserStorageService} from '../util/user.storage.service';

/**
 * Created by Avell on 03/05/2017.
 */


@Injectable()
export class RequestUtil {


  constructor(private userStorageService: UserStorageService) {

  }


  async getDefaultRequestOptions() {
      return  {
         headers :  await this.getHeaders()
      };

  }

  async getHeaders()  {

    let user = await this.userStorageService.getCurrentUser();

    let current = { 'Content-Type': 'application/json' };


    let obj = null;
    if (user != null){
      obj = {
        "Authorization" : user.email+":"+user.password
      }
    }

    let objHeaders = Object.assign(current, obj);
      let httpHeaders = new HttpHeaders(objHeaders)

    return httpHeaders;
  }



}

