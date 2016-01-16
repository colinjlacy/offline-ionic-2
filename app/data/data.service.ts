/**
 * Created by colinjlacy on 12/31/15.
 */
import {Data} from './list-item.data';

export class DataService {
    //constructor() {
    constructor() {

        // create local DB instances
        this.remoteDB = `http://localhost:4984/lists`;
        this.localDB = new PouchDB('pouch_lists');

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

    post(doc) {
        return this.localDB.post(doc);
    }

    syncItems(id, list) {
        let addArray = [];
        this.localDB.get(id).then(doc => {
            list.items.forEach(item => {
                if(!doc.items.find(x => x._id === item._id)) {
                    addArray.push(item);
                }
            });
            if(addArray.length) {
                console.log(addArray);
                doc.items = doc.items.concat(addArray);
                this.localDB.put(doc);
            }
        });
    }

    updateItem(item) {
        this.localDB.get('1').then(doc => {
            doc.items = doc.items.map(x => {
                if(x._id === item._id) {
                    return item;
                } else {
                    return x;
                }
            });
            this.localDB.upsert(doc);
        });
    }

    updateDoc(doc) {
        this.localDB.get(doc._id).then(data => {
            console.log(data);
            let rev = data._rev;
            console.log(data._rev);
            this.localDB.put(doc, doc._id, rev).then(res => console.log(res), err => console.log(err));
        });
    }

    insert(obj) {
        return this.localDB.post(obj);
    }

    getAll() {
        return this.localDB.allDocs({include_docs: true}, docs => docs);
    }



}