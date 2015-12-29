/**
 * Created by colinjlacy on 12/29/15.
 */
import {Injectable} from 'angular2/core'

import {LIST_ITEMS} from './list-item.data';

@Injectable()

export class ListItemService {
    getItems() {
        return Promise.resolve(LIST_ITEMS);
    }
}