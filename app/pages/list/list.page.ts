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

    goToEdit(index) {
        return this.nav.push(Edit, {id: index}, {}, () => null);
    }

    onPageWillEnter() {
        this._service.getItems().then(items => this.listItems = items);
    }
}
