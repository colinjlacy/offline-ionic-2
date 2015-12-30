import {App, Platform, Storage, LocalStorage} from 'ionic-framework/ionic';
import {LIST_ITEMS} from './data/list-item.data';

import {List} from './pages/list/list.page';
import {Create} from './pages/create/create.page';
import {Edit} from './pages/edit/edit.page';


@App({
    templateUrl: 'build/app.html',
})
export class MyApp {
    constructor(platform: Platform) {

        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.rootPage = List;
        this.local = new Storage(LocalStorage);
        this.local.set('data', JSON.stringify(LIST_ITEMS));

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready

        });
    }
}
