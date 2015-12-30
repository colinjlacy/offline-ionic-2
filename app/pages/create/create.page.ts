import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {ListItem} from '../../data/list-item.interface';
import {ListItemService} from '../../data/list-item.service';

@Page({
    templateUrl: 'build/pages/create/create.template.html',
    providers: [ListItemService]
})
export class Create {
    public title: string;

    constructor(private _service: ListItemService, public nav: NavController, private _params: NavParams) {
        this.title = "Create";
        console.log(parseInt(this._params.get('length')) + 1);
        this.item = {
            id: parseInt(this._params.get('length')) + 1,
            name: '',
            media: '',
            latitude: '',
            longitude: ''
        };
    }

    public item: ListItem;

    public options: Array = [
        {value: 'here', label: 'Current location'},
        {value: 'home', label: 'Home'},
        {value: 'work', label: 'Work'}
    ];

    public save() {
        this._service.addItem(this.item).then(() => this.nav.pop());
    }
}
