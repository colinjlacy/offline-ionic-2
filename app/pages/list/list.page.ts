import {Page, NavController} from 'ionic-framework/ionic';
import {OnInit} from 'angular2/core'

import {ListItemService} from '../../data/list-item.service'
import {ListItem} from '../../data/list-item.interface'

@Page({
    templateUrl: 'build/pages/list/list.template.html',
    providers: [ListItemService]
})
export class List {
    constructor(private _service: ListItemService, public nav: NavController) {
        this.title = "List";
        this.icon = "clipboard";
    }

    public title: string;
    public icon: string;
    public listItems: ListItem[];

    ngOnInit() {
        return this._service.getItems().then(items => this.listItems = items);
    }
}
