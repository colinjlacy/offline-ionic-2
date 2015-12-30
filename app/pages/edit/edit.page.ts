import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {OnInit} from 'angular2/core';

import {ListItemService} from '../../data/list-item.service';
import {ListItem} from '../../data/list-item.interface';


@Page({
    templateUrl: 'build/pages/edit/edit.template.html',
    providers: [ListItemService]
})
export class Edit {
    constructor(public nav: NavController, private _params: NavParams, private _service: ListItemService) {
        this.title = "Edit";
        this.id = parseInt(this._params.get('id'));
    }

    public title: string;
    public listItem: ListItem;
    public id: number;

    public options: Array = [
        {value: 'here', label: 'Current location'},
        {value: 'home', label: 'Home'},
        {value: 'work', label: 'Work'}
    ];

    public save() {
        console.log(this.listItem);
        this.nav.pop();
    }

    ngOnInit() {
        return this._service.getItem(this.id).then(item => {
            this.listItem = item;
        });
    }

}
