import {Page} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/list/list.template.html',
})
export class List {
    constructor() {

    }

    public title = "List";

    public icon = "clipboard";

    public listItems = [
    ]
}
