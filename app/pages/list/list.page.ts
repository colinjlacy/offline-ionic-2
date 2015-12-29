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
        {name: 'Eat food'},
        {name: 'Fetch slippers'},
        {name: 'Sit/stay'},
        {name: 'Chew bone'},
        {name: 'Go for a walk'},
        {name: 'Chase the mail carrier'},
        {name: ''},
        {name: 'Deleted items'},
        {name: 'Play with Sparky'},
        {name: 'Howl at the moon'},
        {name: 'Chase the cat'}
    ]
}
