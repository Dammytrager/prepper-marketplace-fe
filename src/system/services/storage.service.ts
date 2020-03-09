import {Injectable} from '@angular/core';
import * as localForage from 'localforage';
import {STORAGE_NAME, STORE_DESCRIPTION, STORE_VERSION, STORE_NAME} from '../constants/storage';

@Injectable({
    providedIn: 'root'
})
export class ForageService {

    forageOptions = {
        storeName: STORE_NAME,
        name: STORAGE_NAME,
        version: STORE_VERSION,
        description: STORE_DESCRIPTION
    };

    constructor() {
        // localForage.config(this.forageOptions);
    }

    localGet(key: string) {
        return localForage.getItem(key);
    }

    localSet(obj: { key: string, data: any }) {
        if (obj && obj.key) {
            return localForage.setItem(obj.key, obj.data);
        }
    }

    localRemove(key: string) {
        return localForage.removeItem(key);
    }

    keys(cb?) {
        return localForage.keys(cb);
    }

    localClear() {
        localForage.clear();
    }
}
