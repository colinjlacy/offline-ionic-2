/**
 * Created by colinjlacy on 12/31/15.
 */
import {Config} from '../config/config';

export class DataService extends Config {
    //constructor() {
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
    }

    get(id) {
        return this.localDB.get(id).then(doc => doc);
    }

    syncItems(id, list) {
        let addArray = [];
        this.localDB.get(id).then(doc => {
            list.items.forEach(item => {
                if(doc.items.find(x => x._id === item._id) === null) {
                    addArray.push(item);
                }
            });
            if(addArray.length) {
                doc.items = doc.items.concat(addArray);
                this.localDB.put(doc);
            }
        });
    }

    updateItem(item) {
        this.localDB.get('1').then(doc => {
            doc.items = doc.items.map(x => {
                if(x._id === item._id) {
                    console.log(x);
                    console.log(item);
                    return item;
                } else {
                    return x;
                }
            });
            this.localDB.put(doc);
        });
    }

    insert(obj) {
        return this.localDB.post(obj);
    }

    getAll() {
        return this.localDB.allDocs({include_docs: true}, docs => docs);
    }



}