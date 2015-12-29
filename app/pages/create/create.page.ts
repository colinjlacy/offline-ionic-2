import {Page} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/create/create.template.html',
})
export class Create {
    constructor() {
        this.title = "Create";
        this.icon = "plus";
    }

    public title: string;
    public icon: string;
}
