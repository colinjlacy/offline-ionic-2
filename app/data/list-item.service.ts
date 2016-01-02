/**
 * Created by colinjlacy on 12/29/15.
 */
import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-framework/ionic';

import {DataService} from './data.service';

@Injectable()

export class ListItemService {
    private local;
    constructor(private _data: DataService) {
        this.local = new Storage(LocalStorage);
    }
    getLists() {
        return new Promise((res, rej) => {
            this.local.get('1').then(data => {
                console.log(JSON.parse(data));
                res((JSON.parse(data)).items);
                this._data.get('1').then(
                    doc => {
                        console.log(doc);
                        this.local.set('1', JSON.stringify(doc));
                    },
                    err => console.log(err)
                );
            });
        })
    }

    getItem(id) {
        let item;
        return this.local.get('1').then(data => {
            item = (JSON.parse(data)).items.find(x => x._id === id);
            return item;
        });
    }

    addItem(item) {
        return new Promise((res, rej) => {
            this.local.get('1').then(data => {
                let list = JSON.parse(data);
                list.items.push(item);
                res(this.local.set('1', JSON.stringify(list)));
                this._data.syncItems('1', list);
            });
        });
    }

    updateItem(item) {
        return new Promise((res, rej) => {
            this.local.get('1').then(data => {
                const
                    dataArray = JSON.parse(data),
                    ind = dataArray.items.findIndex(x => x._id === item._id);
                dataArray.items[ind] = item;
                res(this.local.set('1', JSON.stringify(dataArray)));
                this._data.updateItem(item);
            });
        });
    }
}