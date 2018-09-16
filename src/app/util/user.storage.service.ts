import {Injectable} from '@angular/core';
import {SecureJsonStorage} from '../util/secure.json.storage';
import {PinStorage} from '../util/pin.storage';

@Injectable()
export class UserStorageService {

  static readonly key = 'info'
  private user;

  constructor(public jsonStorage: SecureJsonStorage, public pinManager : PinStorage) {
  }

  async isAuthenticated() {

    return  new Promise(async (resolve, reject) => {

      try{
          const user = await this.getCurrentUser();
          if (user != null){
              resolve(true);
          }else{
              resolve(false);
          }
      }  catch (e) {
          resolve(false);
      }

    });
  }


  async save(user) {

    const pin = await this.pinManager.get();
    return this.jsonStorage.save(UserStorageService.key, user, pin);
  }

  logout() {
    return this.jsonStorage.remove(UserStorageService.key);
  }

  async getCurrentUser(): Promise<any> {

    return new Promise( async (resolve, reject) => {
        const pin = await this.pinManager.get();
        if (pin != null) {
           const user = await  this.jsonStorage.get(UserStorageService.key, pin);
           resolve(user);
        } else {
            reject(null);
        }
    });
  }




}
