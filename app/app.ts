import {App, Platform, Storage, LocalStorage} from 'ionic-framework/ionic';
import {Data} from './data/list-item.data';

import {List} from './pages/list/list.page';
import {Create} from './pages/create/create.page';
import {Edit} from './pages/edit/edit.page';
import {DataService} from './data/data.service';


@App({
    templateUrl: 'build/app.html',
    providers: [DataService]
})
export class MyApp {
    public rootPage;
    private local;
    constructor(platform: Platform, private _data: DataService) {

        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.rootPage = List;
        this.local = new Storage(LocalStorage);

        //this.local.set(Data._id, JSON.stringify(Data));



        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready

        });
    }
}
