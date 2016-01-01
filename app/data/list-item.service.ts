/**
 * Created by colinjlacy on 12/29/15.
 */
import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-framework/ionic';

@Injectable()

export class ListItemService {
    private local;
    constructor() {
        this.local = new Storage(LocalStorage);
    }
    getItems() {
        return this.local.get('data').then(data => JSON.parse(data));
    }

    getItem(id) {
        let item;
        return this.local.get('data').then(data => {
            item = (JSON.parse(data)).find(x => x._id == id);
            return item;
        });
    }

    addItem(item) {
        return this.local.get('data').then(data => {
            let dataArray = JSON.parse(data);
            dataArray.push(item);
            this.local.set('data', JSON.stringify(dataArray));
        });
    }

    updateItem(item) {
        return this.local.get('data').then(data => {
            const
                dataArray = JSON.parse(data),
                ind = dataArray.findIndex(x => x.id === item.id);
            dataArray[ind] = item;
            console.log(dataArray);
            this.local.set('data', JSON.stringify(dataArray));
            return false;
        });
    }
}