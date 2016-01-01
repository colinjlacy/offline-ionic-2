/**
 * Created by colinjlacy on 12/31/15.
 */
import {Config} from '../config/config';

export class DataService extends Config {
    private config: Object;
    constructor() {
        // inherit API key properties
        super();

        // create local DB instances
        this.remoteDB = new PouchDB(`https://${this.cloudant.apiKey}:${this.cloudant.password}@colinjlacy.cloudant.com/lists`);
        this.localDB = new PouchDB('lists');

        // config sync
        this.localDB.sync(this.remoteDB, {
            live: true,
            retry: true
        }).on('change', change => {
            console.log(change);
            if((change.direction) === 'pull' && change.change.docs.lenth) {
                console.log("Change occurred.  Synchronizing.");
            }
        });
        console.log(this.localDB);
    }

    insert(obj) {
        return this.pouch.post(obj);
    }

    getAll() {
        return this.pouch.allDocs({include_docs: true}, docs => docs);
    }

}