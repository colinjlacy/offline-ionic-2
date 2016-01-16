/**
 * Created by colinjlacy on 12/29/15.
 */
import {Injectable} from 'angular2/core';

import {DataService} from './data.service';

@Injectable()

export class ListItemService {
    constructor(private _data: DataService) {}
    getLists() {
        return new Promise((res, rej) => {
            this._data.get('1').then(data => {
                res(data);
            });
        })
    }

    getItem(id) {
        let item;
        return this._data.get('1').then(data => {
            item = (JSON.parse(data)).items.find(x => x._id === id);
            return item;
        });
    }

    addItem(item, listId) {
        return new Promise((res, rej) => {
            this._data.get('1').then(data => {
                console.log(data);
                data.items.push(item);
                this._data.updateDoc(data);
            });
        });
    }

    updateItem(item) {
        return new Promise((res, rej) => {
            this._data.get('1').then(data => {
                const
                    ind = data.items.findIndex(x => x._id === item._id);
                data.items[ind] = item;
                console.log(data.items);
                this._data.updateDoc(data);
            });
        });
    }
}