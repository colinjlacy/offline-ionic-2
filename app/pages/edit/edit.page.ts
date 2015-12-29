import {Page} from 'ionic-framework/ionic';


@Page({
    templateUrl: 'build/pages/edit/edit.template.html'
})
export class Edit {
    constructor() {
        this.title = "Edit";
    }

    public title: string;

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
