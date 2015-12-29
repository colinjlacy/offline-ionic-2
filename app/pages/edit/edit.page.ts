import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {OnInit} from 'angular2/core';

import {ListItemService} from '../../data/list-item.service';
import {ListItem} from '../../data/list-item.interface';


@Page({
    templateUrl: 'build/pages/edit/edit.template.html'
})
export class Edit {
    constructor(public nav: NavController, private _params: NavParams, private _service: ListItemService) {
        this.title = "Edit";
    }

    public title: string;
    public listItem: ListItem;

    public item: {description: string, location: string} = {};
    public options: Array = [
        {value: 'here', label: 'Current location'},
        {value: 'home', label: 'Home'},
        {value: 'work', label: 'Work'}
    ];

    public save() {
        console.log(this.item);
        this.nav.pop();
    }

    ngOnInit() {
        return this._service.getItem(this._params.get('id')).then(item => this.listItem = item);
    }

}
