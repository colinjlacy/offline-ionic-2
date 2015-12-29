import {App, Platform} from 'ionic-framework/ionic';
import {List} from './pages/list/list.page';
import {Create} from './pages/create/create.page';
import {Edit} from './pages/edit/edit.page';


@App({
    templateUrl: 'build/app.html'
})
export class MyApp {
    constructor(platform: Platform) {

        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = List;
        this.tab1Settings = new List();
        this.tab2Root = Create;
        this.tab2Settings = new Create();
        this.tab3Root = Edit;
        this.tab3Settings = new Edit();

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}
