import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {HashGenerator} from './hash.generator';


@Injectable()
export class PinStorage {

    isReady: boolean;
    pin;
    readonly key = 'info_pin';

    constructor(public storage: Storage, private generator: HashGenerator) {
    }


    save(value) {

        console.log(value);
        const salt = 'fixed';
        const hashedPassword = this.generator.hashPassword(value, salt);
        const pin = hashedPassword + ':' + salt;
        return this.storage.set(this.key, pin);
    }

    async match(possiblePin) {
        const completeSplit = await this.get();
        const split = completeSplit.split(':');
        return this.generator.checkPassword(possiblePin, split[0], split[1]);
    }

    get() {
        return this.storage.get(this.key);
    }

    remove() {
        return this.storage.remove(this.key);
    }


}
