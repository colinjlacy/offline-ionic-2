/**
 * Created by colinjlacy on 12/29/15.
 */
import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-framework/ionic';

@Injectable()

export class ListItemService {
    constructor() {
        this.local = new Storage(LocalStorage);
    }
    getItems() {
        return this.local.get('data').then(data => JSON.parse(data));
    }

    getItem(id) {
        return this.local.get('data').then(data => data.find(x => x.id === id));
    }
}