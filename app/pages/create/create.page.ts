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

    public item: {description: string, location: string} = {};
    public options: Array = [
        {value: 'here', label: 'Current location'},
        {value: 'home', label: 'Home'},
        {value: 'work', label: 'Work'}
    ];

    public save() {
        console.log(this.item);
    }
}
