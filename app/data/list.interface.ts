/**
 * Created by colinjlacy on 1/1/16.
 */
import {ListItem} from './list-item.interface';

export interface ListInterface {
    _id: string,
    name: string,
    owner: string,
    collaborators: [string],
    items: ListItem[]
}