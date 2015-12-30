import {Page, NavController} from 'ionic-framework/ionic';
import {OnInit} from 'angular2/core';

import {ListItemService} from '../../data/list-item.service';
import {ListItem} from '../../data/list-item.interface';
import {Create} from '../create/create.page';
import {Edit} from '../edit/edit.page';

@Page({
    templateUrl: 'build/pages/list/list.template.html',
    providers: [ListItemService]
})
export class List {
    constructor(private _service: ListItemService, public nav: NavController) {
        this.title = "List";
    }

    public title: string;
    public listItems: ListItem[];

    goToCreate() {
        return this.nav.push(Create, {length: this.listItems.length}, {}, () => null);
    }

    goToEdit(id) {
        return this.nav.push(Edit, {id: id}, {}, () => null);
    }

    toggleDone(id, e) {
        e.stopPropagation();
        let item = this.listItems.find(x => x.id === id);
        item.active = !item.active;
        this._service.updateItem(item);
    }

    onPageWillEnter() {
        return this._service.getItems().then(items => this.listItems = items);
    }
}
