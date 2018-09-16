import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class SecureJsonStorage {


  constructor(public storage: Storage) {
  }

  save(key, value, pin) {
    const strValue = JSON.stringify(value);
    console.log(strValue);
    return this.storage.set(key, CryptoJS.AES.encrypt(strValue, pin).toString());
  }

  get(key, pin) {

    let promise = null;
    if (pin) {

      promise = new Promise(async (resolve, reject) => {

        const value =  await this.storage.get(key);
          if (value != null) {
            console.log('get data', pin);
            const bytes = CryptoJS.AES.decrypt(value, pin);
              const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            resolve(decryptedData);
          } else {
            resolve(null);
          }

      });

    } else {
      promise = Promise.resolve(null);
    }

    return promise;
  }

  remove(key) {
    return this.storage.remove(key);
  }

}
