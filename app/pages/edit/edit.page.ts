import {Page} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/edit/edit.template.html'
})
export class Edit {
    constructor() {
        this.title = "Edit";
        this.icon = "edit";
    }

    public title: string;
    public icon: string;
}
