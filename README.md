## A not-so-working offline-first Todo

### Installation

First, make sure you have [Couchbase Server](http://www.couchbase.com/nosql-databases/downloads) installed and running, as well as an up-to-date copy of the Couchbase Sync Gateway.  For info on starting your Sync Gateway, you can check out the steps [in my other repo](https://github.com/colinjlacy/pouchdb-demo), where I first used PouchDB.  You can start your Sync Gateway using the `sync-gateway.json` file in this project's root.

Also, make sure your Couchbase Server has a data bucket called **lists**.  That'll be the bucket that PouchDB will try to sync to.  Once that bucket has been created, you'll need to [add an index](https://github.com/colinjlacy/pouchdb-demo#create-an-index-on-the-bucket) to it.

Finally, clone this repo, and install all NPM dependencies.

### First run

The first time you run the application, there will be no data in the local database.  We should fix that.  Open `app/app.ts`, and scroll down to line 24:
```
//this.local.set(Data._id, JSON.stringify(Data));
```

Uncomment that line to add data, and then run the application from the project root:
```
$ ionic serve
```

That will start up a new browser window with the application started.  Be sure to re-comment the data insertion in `app/app.ts` before you refresh or change any other code (which will cause a refresh) as that will cause the data to be inserted again.
 
### Problems

Once you have data, and you're able to work with your application, try toggling a couple of items.  You should see them update in the Sync Gateway console, and if you look into your Couchbase Server admin portal you should see your documents update.  

Now refresh the page, and do it again.  Continue to do this until you see your Sync Gateway console enter an infinite loop.  Usually for me it happens around the third or fourth refresh.  

**PouchDB version 5.1.0**
**Sync Gateway version 1.1.1-10**

#### Typical Sync Gateway console output:

This what the output looks like, from the command to start the Sync Gateway, into the infinite loop.  Note that I only took part of the infinite loop since it continues - in theory - infinitely.

```
Colins-MacBook-Pro:couchbase-sync-gateway colinjlacy$ ./bin/sync_gateway ../offline/sync-gateway.json 
2016-01-16T12:03:36.232-06:00 Enabling logging: [CRUD+ REST+ Changes+ Attach+]
2016-01-16T12:03:36.232-06:00 ==== Couchbase Sync Gateway/1.1.1(10;2fff9eb) ====
2016-01-16T12:03:36.232-06:00 Configured Go to use all 8 CPUs; setenv GOMAXPROCS to override this
2016-01-16T12:03:36.232-06:00 Configured process to allow 5000 open file descriptors
2016-01-16T12:03:36.233-06:00 Opening db /lists as bucket "lists", pool "default", server <http://localhost:8091>
2016-01-16T12:03:36.233-06:00 Opening Couchbase database lists on <http://localhost:8091>
2016/01/16 12:03:36  Trying with http://127.0.0.1:8091/pools/default/bucketsStreaming/lists
2016/01/16 12:03:36  Trying with selected node 0
2016/01/16 12:03:36 Got new configuration for bucket lists
2016/01/16 12:03:36  Trying with selected node 0
2016-01-16T12:03:36.324-06:00     Reset guest user to config
2016-01-16T12:03:36.324-06:00 Starting admin server on 127.0.0.1:4985
2016-01-16T12:03:36.327-06:00 Starting server on :4984 ...
2016-01-16T12:03:52.316-06:00 HTTP:  #001: OPTIONS /lists/_revs_diff?_nonce=1452967432315
2016-01-16T12:03:52.319-06:00 HTTP:  #002: OPTIONS /lists/_revs_diff?_nonce=1452967432315
2016-01-16T12:03:52.320-06:00 HTTP:  #003: OPTIONS /lists/_revs_diff?_nonce=1452967432316
2016-01-16T12:03:52.320-06:00 HTTP:  #004: OPTIONS /lists/_revs_diff?_nonce=1452967432317
2016-01-16T12:03:52.320-06:00 HTTP:  #005: POST /lists/_revs_diff?_nonce=1452967432315
2016-01-16T12:03:52.325-06:00 HTTP:  #006: POST /lists/_revs_diff?_nonce=1452967432315
2016-01-16T12:03:52.325-06:00 HTTP:  #007: POST /lists/_revs_diff?_nonce=1452967432316
2016-01-16T12:03:52.326-06:00 HTTP:  #008: POST /lists/_revs_diff?_nonce=1452967432317
2016-01-16T12:03:52.340-06:00 HTTP:  #009: OPTIONS /lists/_bulk_docs?_nonce=1452967432339
2016-01-16T12:03:52.341-06:00 HTTP:  #010: OPTIONS /lists/_bulk_docs?_nonce=1452967432339
2016-01-16T12:03:52.342-06:00 HTTP:  #011: POST /lists/_bulk_docs?_nonce=1452967432339
2016-01-16T12:03:52.343-06:00 HTTP:  #012: POST /lists/_bulk_docs?_nonce=1452967432339
2016-01-16T12:03:52.343-06:00 CRUD+: Invoking sync on doc "1" rev 113-c1e189d52c4c2cce54eba24ecbe366a9
2016-01-16T12:03:52.345-06:00 CRUD+: Invoking sync on doc "1" rev 113-c1e189d52c4c2cce54eba24ecbe366a9
2016-01-16T12:03:52.395-06:00 CRUD+: Saving old revision "1" / "112-bd43875edc1f4280f939f46c6ea02c63" (999 bytes)
2016-01-16T12:03:52.395-06:00 CRUD+: Backed up obsolete rev "1"/"112-bd43875edc1f4280f939f46c6ea02c63"
2016-01-16T12:03:52.396-06:00 CRUD+: Saving old revision "1" / "112-bd43875edc1f4280f939f46c6ea02c63" (999 bytes)
2016-01-16T12:03:52.396-06:00 CRUD+: Backed up obsolete rev "1"/"112-bd43875edc1f4280f939f46c6ea02c63"
2016-01-16T12:03:52.397-06:00 CRUD: Stored doc "1" / "113-c1e189d52c4c2cce54eba24ecbe366a9"
2016-01-16T12:03:52.398-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:03:52.401-06:00 HTTP:  #013: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967432399
2016-01-16T12:03:52.401-06:00 HTTP:  #014: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967432400
2016-01-16T12:03:52.404-06:00 HTTP:  #015: OPTIONS /lists/_bulk_docs?_nonce=1452967432403
2016-01-16T12:03:52.405-06:00 HTTP:  #016: OPTIONS /lists/_bulk_docs?_nonce=1452967432404
2016-01-16T12:03:52.406-06:00 HTTP:  #017: POST /lists/_bulk_docs?_nonce=1452967432403
2016-01-16T12:03:52.406-06:00 WARNING: parseRevID failed on "0-54" -- db.parseRevID() at revision.go:122
2016-01-16T12:03:52.406-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:03:52.408-06:00 HTTP:  #018: POST /lists/_bulk_docs?_nonce=1452967432404
2016-01-16T12:03:52.408-06:00 WARNING: parseRevID failed on "0-54" -- db.parseRevID() at revision.go:122
2016-01-16T12:03:52.408-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:03:53.025-06:00 HTTP:  #019: OPTIONS /lists/_bulk_docs?_nonce=1452967433024
2016-01-16T12:03:53.026-06:00 HTTP:  #020: OPTIONS /lists/_bulk_docs?_nonce=1452967433025
2016-01-16T12:03:53.028-06:00 HTTP:  #021: POST /lists/_bulk_docs?_nonce=1452967433024
2016-01-16T12:03:53.028-06:00 HTTP:  #022: POST /lists/_bulk_docs?_nonce=1452967433025
2016-01-16T12:03:53.030-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:03:53.030-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:03:53.034-06:00 HTTP:  #023: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967433032
2016-01-16T12:03:53.035-06:00 HTTP:  #024: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967433033
2016-01-16T12:03:53.038-06:00 HTTP:  #025: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:53.039-06:00 HTTP:  #026: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:53.041-06:00 HTTP:  #027: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:53.042-06:00 HTTP:  #028: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:53.042-06:00 HTTP: #028:     --> 409 Document update conflict  (0.5 ms)
2016-01-16T12:03:53.047-06:00 HTTP:  #029: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967433045
2016-01-16T12:03:53.051-06:00 HTTP:  #030: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:53.053-06:00 HTTP:  #031: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:53.253-06:00 HTTP:  #032: GET /?_nonce=1452967433252
2016-01-16T12:03:53.256-06:00 HTTP:  #033: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967433255
2016-01-16T12:03:53.540-06:00 HTTP:  #034: GET /?_nonce=1452967433539
2016-01-16T12:03:53.544-06:00 HTTP:  #035: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967433542
2016-01-16T12:03:54.329-06:00 Changes+: Notifying that "lists" changed (keys="{*}") count=2
2016-01-16T12:03:58.376-06:00 HTTP:  #036: OPTIONS /lists/_revs_diff?_nonce=1452967438375
2016-01-16T12:03:58.378-06:00 HTTP:  #037: OPTIONS /lists/_revs_diff?_nonce=1452967438375
2016-01-16T12:03:58.379-06:00 HTTP:  #038: OPTIONS /lists/_revs_diff?_nonce=1452967438376
2016-01-16T12:03:58.379-06:00 HTTP:  #039: POST /lists/_revs_diff?_nonce=1452967438375
2016-01-16T12:03:58.382-06:00 HTTP:  #040: OPTIONS /lists/_revs_diff?_nonce=1452967438377
2016-01-16T12:03:58.383-06:00 HTTP:  #041: POST /lists/_revs_diff?_nonce=1452967438375
2016-01-16T12:03:58.384-06:00 HTTP:  #042: POST /lists/_revs_diff?_nonce=1452967438376
2016-01-16T12:03:58.385-06:00 HTTP:  #043: POST /lists/_revs_diff?_nonce=1452967438377
2016-01-16T12:03:58.396-06:00 HTTP:  #044: OPTIONS /lists/_bulk_docs?_nonce=1452967438394
2016-01-16T12:03:58.396-06:00 HTTP:  #045: OPTIONS /lists/_bulk_docs?_nonce=1452967438395
2016-01-16T12:03:58.398-06:00 HTTP:  #046: POST /lists/_bulk_docs?_nonce=1452967438394
2016-01-16T12:03:58.398-06:00 HTTP:  #047: POST /lists/_bulk_docs?_nonce=1452967438395
2016-01-16T12:03:58.400-06:00 CRUD+: Invoking sync on doc "1" rev 114-5ae905a9dfc434fa0b9a701c37567c98
2016-01-16T12:03:58.400-06:00 CRUD+: Invoking sync on doc "1" rev 114-5ae905a9dfc434fa0b9a701c37567c98
2016-01-16T12:03:58.400-06:00 CRUD+: Saving old revision "1" / "113-c1e189d52c4c2cce54eba24ecbe366a9" (1000 bytes)
2016-01-16T12:03:58.400-06:00 CRUD+: Saving old revision "1" / "113-c1e189d52c4c2cce54eba24ecbe366a9" (1000 bytes)
2016-01-16T12:03:58.400-06:00 CRUD+: Backed up obsolete rev "1"/"113-c1e189d52c4c2cce54eba24ecbe366a9"
2016-01-16T12:03:58.400-06:00 CRUD+: Backed up obsolete rev "1"/"113-c1e189d52c4c2cce54eba24ecbe366a9"
2016-01-16T12:03:58.402-06:00 CRUD: Stored doc "1" / "114-5ae905a9dfc434fa0b9a701c37567c98"
2016-01-16T12:03:58.402-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:03:58.405-06:00 HTTP:  #048: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967438403
2016-01-16T12:03:58.405-06:00 HTTP:  #049: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967438404
2016-01-16T12:03:58.408-06:00 HTTP:  #050: OPTIONS /lists/_bulk_docs?_nonce=1452967438407
2016-01-16T12:03:58.409-06:00 HTTP:  #051: OPTIONS /lists/_bulk_docs?_nonce=1452967438408
2016-01-16T12:03:58.410-06:00 HTTP:  #052: POST /lists/_bulk_docs?_nonce=1452967438407
2016-01-16T12:03:58.410-06:00 WARNING: parseRevID failed on "0-56" -- db.parseRevID() at revision.go:122
2016-01-16T12:03:58.410-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:03:58.412-06:00 HTTP:  #053: POST /lists/_bulk_docs?_nonce=1452967438408
2016-01-16T12:03:58.412-06:00 WARNING: parseRevID failed on "0-56" -- db.parseRevID() at revision.go:122
2016-01-16T12:03:58.412-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:03:59.040-06:00 HTTP:  #054: OPTIONS /lists/_bulk_docs?_nonce=1452967439038
2016-01-16T12:03:59.041-06:00 HTTP:  #055: OPTIONS /lists/_bulk_docs?_nonce=1452967439039
2016-01-16T12:03:59.043-06:00 HTTP:  #056: POST /lists/_bulk_docs?_nonce=1452967439038
2016-01-16T12:03:59.043-06:00 HTTP:  #057: POST /lists/_bulk_docs?_nonce=1452967439039
2016-01-16T12:03:59.045-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:03:59.045-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:03:59.048-06:00 HTTP:  #058: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967439047
2016-01-16T12:03:59.050-06:00 HTTP:  #059: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967439048
2016-01-16T12:03:59.052-06:00 HTTP:  #060: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:59.054-06:00 HTTP:  #061: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:59.056-06:00 HTTP:  #062: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:59.058-06:00 HTTP:  #063: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:59.058-06:00 HTTP: #063:     --> 409 Document update conflict  (0.5 ms)
2016-01-16T12:03:59.062-06:00 HTTP:  #064: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967439061
2016-01-16T12:03:59.066-06:00 HTTP:  #065: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:59.069-06:00 HTTP:  #066: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:03:59.236-06:00 HTTP:  #067: GET /?_nonce=1452967439234
2016-01-16T12:03:59.240-06:00 HTTP:  #068: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967439238
2016-01-16T12:04:00.392-06:00 HTTP:  #069: GET /?_nonce=1452967440391
2016-01-16T12:04:00.395-06:00 HTTP:  #070: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967440394
2016-01-16T12:04:02.445-06:00 HTTP:  #071: GET /lists/?_nonce=1452967442443
2016-01-16T12:04:02.457-06:00 HTTP:  #072: GET /lists/?_nonce=1452967442455
2016-01-16T12:04:02.481-06:00 HTTP:  #073: GET /?_nonce=1452967442478
2016-01-16T12:04:02.481-06:00 HTTP:  #074: GET /?_nonce=1452967442478
2016-01-16T12:04:02.485-06:00 HTTP:  #075: GET /?_nonce=1452967442483
2016-01-16T12:04:02.486-06:00 HTTP:  #076: GET /?_nonce=1452967442483
2016-01-16T12:04:02.585-06:00 HTTP:  #077: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967442583
2016-01-16T12:04:02.588-06:00 HTTP:  #078: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967442587
2016-01-16T12:04:02.589-06:00 HTTP:  #079: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967442587
2016-01-16T12:04:02.592-06:00 HTTP:  #080: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967442590
2016-01-16T12:04:02.595-06:00 HTTP:  #081: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=118%3A%3A132&limit=100&_nonce=1452967442593
2016-01-16T12:04:02.595-06:00 Changes: MultiChangesFeed({*}, {Since:118::132 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083c56e0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:02.595-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:02.614-06:00 HTTP:  #082: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=118%3A%3A132&limit=100&_nonce=1452967442612
2016-01-16T12:04:02.614-06:00 Changes: MultiChangesFeed({*}, {Since:118::132 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208420d80 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:02.614-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:02.675-06:00 Changes+: MultiChangesFeed sending &{Seq:135 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:113-c1e189d52c4c2cce54eba24ecbe366a9] map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:02.675-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:02.677-06:00 Changes+: MultiChangesFeed sending &{Seq:135 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:113-c1e189d52c4c2cce54eba24ecbe366a9] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:114-5ae905a9dfc434fa0b9a701c37567c98]] Err:<nil> branched:true} 
2016-01-16T12:04:02.677-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:02.696-06:00 HTTP:  #083: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135&limit=100&_nonce=1452967442694
2016-01-16T12:04:02.696-06:00 Changes: MultiChangesFeed({*}, {Since:135 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f02a0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:02.696-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:02.696-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:02.697-06:00 HTTP:  #084: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135&limit=100&_nonce=1452967442695
2016-01-16T12:04:02.698-06:00 Changes: MultiChangesFeed({*}, {Since:135 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f0480 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:02.698-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:02.698-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:02.702-06:00 HTTP:  #085: GET /lists/?_nonce=1452967442700
2016-01-16T12:04:02.703-06:00 HTTP:  #086: GET /lists/_changes?timeout=25000&style=all_docs&feed=longpoll&heartbeat=10000&since=135&limit=100&_nonce=1452967442700
2016-01-16T12:04:02.703-06:00 Changes: MultiChangesFeed({*}, {Since:135 Limit:100 Conflicts:true IncludeDocs:false Wait:true Continuous:false Terminator:0xc2083f0840 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:02.703-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:02.703-06:00 Changes+: MultiChangesFeed waiting... 
2016-01-16T12:04:02.703-06:00 Changes+: Waiting for "lists"'s count to pass 2
2016-01-16T12:04:02.704-06:00 HTTP:  #087: GET /lists/?_nonce=1452967442701
2016-01-16T12:04:02.704-06:00 HTTP:  #088: GET /lists/_changes?timeout=25000&style=all_docs&feed=longpoll&heartbeat=10000&since=135&limit=100&_nonce=1452967442701
2016-01-16T12:04:02.704-06:00 Changes: MultiChangesFeed({*}, {Since:135 Limit:100 Conflicts:true IncludeDocs:false Wait:true Continuous:false Terminator:0xc2083f0a80 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:02.704-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:02.704-06:00 Changes+: MultiChangesFeed waiting... 
2016-01-16T12:04:02.704-06:00 Changes+: Waiting for "lists"'s count to pass 2
2016-01-16T12:04:02.711-06:00 HTTP:  #089: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967442708
2016-01-16T12:04:02.715-06:00 HTTP:  #090: OPTIONS /lists/_bulk_docs?_nonce=1452967442713
2016-01-16T12:04:02.716-06:00 HTTP:  #091: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967442714
2016-01-16T12:04:02.717-06:00 HTTP:  #092: POST /lists/_bulk_docs?_nonce=1452967442713
2016-01-16T12:04:02.717-06:00 WARNING: parseRevID failed on "0-1055" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:02.717-06:00 	BulkDocs: Doc "_local/HrR9dThOBb6zxV9AXrKX9g==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:02.720-06:00 HTTP:  #093: OPTIONS /lists/_bulk_docs?_nonce=1452967442719
2016-01-16T12:04:02.722-06:00 HTTP:  #094: POST /lists/_bulk_docs?_nonce=1452967442719
2016-01-16T12:04:02.722-06:00 WARNING: parseRevID failed on "0-1055" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:02.722-06:00 	BulkDocs: Doc "_local/HrR9dThOBb6zxV9AXrKX9g==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:06.357-06:00 Changes+: Notifying that "lists" changed (keys="{*}") count=3
2016-01-16T12:04:06.357-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:06.357-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:06.359-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:06.359-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:06.360-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:06.360-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:06.365-06:00 HTTP:  #095: GET /lists/_changes?timeout=25000&style=all_docs&feed=longpoll&heartbeat=10000&since=135%3A%3A137&limit=99&_nonce=1452967446363
2016-01-16T12:04:06.365-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:99 Conflicts:true IncludeDocs:false Wait:true Continuous:false Terminator:0xc2083f1800 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:06.365-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:06.365-06:00 Changes+: MultiChangesFeed waiting... 
2016-01-16T12:04:06.365-06:00 Changes+: Waiting for "lists"'s count to pass 3
2016-01-16T12:04:06.366-06:00 HTTP:  #096: GET /lists/_changes?timeout=25000&style=all_docs&feed=longpoll&heartbeat=10000&since=135%3A%3A137&limit=99&_nonce=1452967446364
2016-01-16T12:04:06.366-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:99 Conflicts:true IncludeDocs:false Wait:true Continuous:false Terminator:0xc2083f1a40 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:06.366-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:06.366-06:00 Changes+: MultiChangesFeed waiting... 
2016-01-16T12:04:06.366-06:00 Changes+: Waiting for "lists"'s count to pass 3
2016-01-16T12:04:10.374-06:00 HTTP:  #097: OPTIONS /lists/_revs_diff?_nonce=1452967450372
2016-01-16T12:04:10.374-06:00 HTTP:  #098: OPTIONS /lists/_revs_diff?_nonce=1452967450372
2016-01-16T12:04:10.376-06:00 HTTP:  #099: OPTIONS /lists/_revs_diff?_nonce=1452967450373
2016-01-16T12:04:10.377-06:00 HTTP:  #100: OPTIONS /lists/_revs_diff?_nonce=1452967450373
2016-01-16T12:04:10.379-06:00 HTTP:  #101: POST /lists/_revs_diff?_nonce=1452967450372
2016-01-16T12:04:10.379-06:00 HTTP:  #102: POST /lists/_revs_diff?_nonce=1452967450372
2016-01-16T12:04:10.381-06:00 HTTP:  #103: POST /lists/_revs_diff?_nonce=1452967450373
2016-01-16T12:04:10.381-06:00 HTTP:  #104: POST /lists/_revs_diff?_nonce=1452967450373
2016-01-16T12:04:10.393-06:00 HTTP:  #106: OPTIONS /lists/_bulk_docs?_nonce=1452967450392
2016-01-16T12:04:10.393-06:00 HTTP:  #105: OPTIONS /lists/_bulk_docs?_nonce=1452967450391
2016-01-16T12:04:10.396-06:00 HTTP:  #107: POST /lists/_bulk_docs?_nonce=1452967450392
2016-01-16T12:04:10.396-06:00 HTTP:  #108: POST /lists/_bulk_docs?_nonce=1452967450391
2016-01-16T12:04:10.397-06:00 CRUD+: Invoking sync on doc "1" rev 115-5f6d5ec12365fe0c6339f5f3c952748d
2016-01-16T12:04:10.397-06:00 CRUD+: Saving old revision "1" / "114-5ae905a9dfc434fa0b9a701c37567c98" (1001 bytes)
2016-01-16T12:04:10.397-06:00 CRUD+: Invoking sync on doc "1" rev 115-5f6d5ec12365fe0c6339f5f3c952748d
2016-01-16T12:04:10.397-06:00 CRUD+: Backed up obsolete rev "1"/"114-5ae905a9dfc434fa0b9a701c37567c98"
2016-01-16T12:04:10.397-06:00 CRUD+: Saving old revision "1" / "114-5ae905a9dfc434fa0b9a701c37567c98" (1001 bytes)
2016-01-16T12:04:10.397-06:00 CRUD+: Backed up obsolete rev "1"/"114-5ae905a9dfc434fa0b9a701c37567c98"
2016-01-16T12:04:10.399-06:00 CRUD: Stored doc "1" / "115-5f6d5ec12365fe0c6339f5f3c952748d"
2016-01-16T12:04:10.400-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:04:10.402-06:00 HTTP:  #109: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967450400
2016-01-16T12:04:10.402-06:00 HTTP:  #110: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967450401
2016-01-16T12:04:10.405-06:00 HTTP:  #111: OPTIONS /lists/_bulk_docs?_nonce=1452967450404
2016-01-16T12:04:10.406-06:00 HTTP:  #112: OPTIONS /lists/_bulk_docs?_nonce=1452967450405
2016-01-16T12:04:10.407-06:00 HTTP:  #113: POST /lists/_bulk_docs?_nonce=1452967450404
2016-01-16T12:04:10.407-06:00 WARNING: parseRevID failed on "0-58" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:10.407-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:10.409-06:00 HTTP:  #114: POST /lists/_bulk_docs?_nonce=1452967450405
2016-01-16T12:04:10.409-06:00 WARNING: parseRevID failed on "0-58" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:10.409-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:10.697-06:00 HTTP:  #115: GET /?_nonce=1452967450695
2016-01-16T12:04:10.699-06:00 HTTP:  #116: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967450698
2016-01-16T12:04:10.704-06:00 HTTP:  #117: OPTIONS /lists/_revs_diff?_nonce=1452967450703
2016-01-16T12:04:10.706-06:00 HTTP:  #118: POST /lists/_revs_diff?_nonce=1452967450703
2016-01-16T12:04:10.710-06:00 HTTP:  #119: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967450709
2016-01-16T12:04:10.713-06:00 HTTP:  #120: OPTIONS /lists/_bulk_docs?_nonce=1452967450712
2016-01-16T12:04:10.714-06:00 HTTP:  #121: POST /lists/_bulk_docs?_nonce=1452967450712
2016-01-16T12:04:10.714-06:00 WARNING: parseRevID failed on "0-58" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:10.714-06:00 	BulkDocs: Doc "_local/Hn9QFjufozhJfVizLAXQhA==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:11.169-06:00 HTTP:  #122: OPTIONS /lists/_bulk_docs?_nonce=1452967451166
2016-01-16T12:04:11.171-06:00 HTTP:  #123: OPTIONS /lists/_bulk_docs?_nonce=1452967451168
2016-01-16T12:04:11.173-06:00 HTTP:  #124: POST /lists/_bulk_docs?_nonce=1452967451166
2016-01-16T12:04:11.174-06:00 HTTP:  #125: POST /lists/_bulk_docs?_nonce=1452967451168
2016-01-16T12:04:11.175-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:04:11.176-06:00 CRUD+: PutExistingRev("1"): No new revisions to add
2016-01-16T12:04:11.179-06:00 HTTP:  #126: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967451177
2016-01-16T12:04:11.180-06:00 HTTP:  #127: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967451178
2016-01-16T12:04:11.183-06:00 HTTP:  #128: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:04:11.185-06:00 HTTP:  #129: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:04:11.187-06:00 HTTP:  #130: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:04:11.188-06:00 HTTP:  #131: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:04:11.188-06:00 HTTP: #131:     --> 409 Document update conflict  (0.4 ms)
2016-01-16T12:04:11.192-06:00 HTTP:  #132: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?_nonce=1452967451191
2016-01-16T12:04:11.196-06:00 HTTP:  #133: OPTIONS /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:04:11.199-06:00 HTTP:  #134: PUT /lists/_local/Hn9QFjufozhJfVizLAXQhA==
2016-01-16T12:04:11.245-06:00 HTTP:  #135: GET /?_nonce=1452967451244
2016-01-16T12:04:11.248-06:00 HTTP:  #136: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967451247
2016-01-16T12:04:12.635-06:00 HTTP:  #137: GET /?_nonce=1452967452634
2016-01-16T12:04:12.638-06:00 HTTP:  #138: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967452637
2016-01-16T12:04:15.490-06:00 HTTP:  #139: GET /lists/?_nonce=1452967455488
2016-01-16T12:04:15.501-06:00 HTTP:  #140: GET /lists/?_nonce=1452967455500
2016-01-16T12:04:15.505-06:00 HTTP:  #141: GET /?_nonce=1452967455503
2016-01-16T12:04:15.505-06:00 HTTP:  #142: GET /?_nonce=1452967455504
2016-01-16T12:04:15.524-06:00 HTTP:  #143: GET /?_nonce=1452967455523
2016-01-16T12:04:15.524-06:00 HTTP:  #144: GET /?_nonce=1452967455523
2016-01-16T12:04:15.630-06:00 HTTP:  #145: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967455628
2016-01-16T12:04:15.634-06:00 HTTP:  #146: GET /lists/_local/Hn9QFjufozhJfVizLAXQhA==?&_nonce=1452967455632
2016-01-16T12:04:15.634-06:00 HTTP:  #147: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967455633
2016-01-16T12:04:15.637-06:00 HTTP:  #148: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967455635
2016-01-16T12:04:15.641-06:00 HTTP:  #149: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=118%3A%3A132&limit=100&_nonce=1452967455639
2016-01-16T12:04:15.641-06:00 Changes: MultiChangesFeed({*}, {Since:118::132 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc20830e900 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.641-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.659-06:00 HTTP:  #150: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=118%3A%3A132&limit=100&_nonce=1452967455657
2016-01-16T12:04:15.659-06:00 Changes: MultiChangesFeed({*}, {Since:118::132 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc20830ecc0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.659-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.690-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.690-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.692-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.692-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.716-06:00 HTTP:  #151: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455715
2016-01-16T12:04:15.716-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2088da540 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.716-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.718-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.718-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.718-06:00 HTTP:  #152: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455716
2016-01-16T12:04:15.718-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2088da720 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.718-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.720-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.720-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.723-06:00 HTTP:  #153: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455721
2016-01-16T12:04:15.723-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c0900 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.723-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.725-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.725-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.726-06:00 HTTP:  #154: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455721
2016-01-16T12:04:15.726-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c0b40 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.727-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.728-06:00 HTTP:  #155: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455726
2016-01-16T12:04:15.728-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec2360 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.728-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.728-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.728-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.729-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.729-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.731-06:00 HTTP:  #156: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967455728
2016-01-16T12:04:15.732-06:00 HTTP:  #157: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455730
2016-01-16T12:04:15.732-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f0540 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.732-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.733-06:00 HTTP:  #158: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455731
2016-01-16T12:04:15.733-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec2ea0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.733-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.733-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.733-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.734-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.734-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.736-06:00 HTTP:  #159: OPTIONS /lists/_bulk_docs?_nonce=1452967455735
2016-01-16T12:04:15.738-06:00 HTTP:  #160: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455736
2016-01-16T12:04:15.738-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3200 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.738-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.739-06:00 HTTP:  #161: POST /lists/_bulk_docs?_nonce=1452967455735
2016-01-16T12:04:15.739-06:00 WARNING: parseRevID failed on "0-1055" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:15.739-06:00 	BulkDocs: Doc "_local/HrR9dThOBb6zxV9AXrKX9g==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:15.740-06:00 HTTP:  #162: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455737
2016-01-16T12:04:15.740-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3560 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.740-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.740-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.740-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.741-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.741-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.743-06:00 HTTP:  #163: GET /lists/_local/HrR9dThOBb6zxV9AXrKX9g==?&_nonce=1452967455740
2016-01-16T12:04:15.743-06:00 HTTP:  #164: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455742
2016-01-16T12:04:15.743-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208a84960 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.743-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.744-06:00 HTTP:  #165: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455743
2016-01-16T12:04:15.744-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f15c0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.744-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.745-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.745-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.746-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.746-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.747-06:00 HTTP:  #166: OPTIONS /lists/_bulk_docs?_nonce=1452967455745
2016-01-16T12:04:15.748-06:00 HTTP:  #167: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455747
2016-01-16T12:04:15.748-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3ce0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.748-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.749-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.749-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.750-06:00 HTTP:  #168: POST /lists/_bulk_docs?_nonce=1452967455745
2016-01-16T12:04:15.750-06:00 WARNING: parseRevID failed on "0-1055" -- db.parseRevID() at revision.go:122
2016-01-16T12:04:15.750-06:00 	BulkDocs: Doc "_local/HrR9dThOBb6zxV9AXrKX9g==" --> 400 Invalid revision ID (400 Invalid revision ID)
2016-01-16T12:04:15.750-06:00 HTTP:  #169: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455748
2016-01-16T12:04:15.750-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3f80 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.751-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.753-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.753-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.753-06:00 HTTP:  #170: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455752
2016-01-16T12:04:15.753-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec2120 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.754-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.755-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.755-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.757-06:00 HTTP:  #171: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455755
2016-01-16T12:04:15.757-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec2420 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.757-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.759-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.759-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.759-06:00 HTTP:  #172: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455757
2016-01-16T12:04:15.759-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c1140 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.759-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.760-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.760-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.762-06:00 HTTP:  #173: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455760
2016-01-16T12:04:15.762-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc20880f5c0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.762-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.764-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.764-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.764-06:00 HTTP:  #174: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455762
2016-01-16T12:04:15.764-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc20880f860 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.764-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.765-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.765-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.767-06:00 HTTP:  #175: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455765
2016-01-16T12:04:15.767-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec2fc0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.767-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.768-06:00 HTTP:  #176: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455767
2016-01-16T12:04:15.768-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec31a0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.768-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.769-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.769-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.770-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.770-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.772-06:00 HTTP:  #177: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455770
2016-01-16T12:04:15.772-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3440 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.772-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.773-06:00 HTTP:  #178: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455772
2016-01-16T12:04:15.774-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3620 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.774-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.774-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.774-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.775-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.775-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.777-06:00 HTTP:  #179: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455775
2016-01-16T12:04:15.777-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f0540 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.777-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.778-06:00 HTTP:  #180: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455776
2016-01-16T12:04:15.778-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3980 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.778-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.779-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.779-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.781-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.781-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.784-06:00 HTTP:  #181: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455782
2016-01-16T12:04:15.784-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208a85320 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.784-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.784-06:00 HTTP:  #182: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455783
2016-01-16T12:04:15.784-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208a85da0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.785-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.785-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.785-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.786-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.786-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.789-06:00 HTTP:  #183: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455787
2016-01-16T12:04:15.789-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f0180 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.789-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.790-06:00 HTTP:  #184: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455788
2016-01-16T12:04:15.790-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec2360 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.790-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.790-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.790-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.791-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.791-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.793-06:00 HTTP:  #185: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455792
2016-01-16T12:04:15.794-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c0c60 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.794-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.795-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.795-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.807-06:00 HTTP:  #186: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455806
2016-01-16T12:04:15.807-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c0ea0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.807-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.809-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.809-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.812-06:00 HTTP:  #187: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455811
2016-01-16T12:04:15.812-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3080 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.812-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.814-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.814-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.815-06:00 HTTP:  #188: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455813
2016-01-16T12:04:15.815-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c13e0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.815-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.816-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.816-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.819-06:00 HTTP:  #189: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455816
2016-01-16T12:04:15.819-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c1620 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.819-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.820-06:00 HTTP:  #190: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455818
2016-01-16T12:04:15.820-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc20880f9e0 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.820-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.821-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.821-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.822-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.822-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.824-06:00 HTTP:  #191: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455822
2016-01-16T12:04:15.824-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc208ec3860 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.824-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.826-06:00 HTTP:  #192: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455824
2016-01-16T12:04:15.826-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2087c1b00 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.826-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"*":0x1, "!":0x1} ... 
2016-01-16T12:04:15.826-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.826-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.827-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f]] Err:<nil> branched:true} 
2016-01-16T12:04:15.827-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.830-06:00 HTTP:  #193: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455828
2016-01-16T12:04:15.830-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083c4420 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.830-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.831-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.831-06:00 Changes: MultiChangesFeed done 
2016-01-16T12:04:15.848-06:00 HTTP:  #194: GET /lists/_changes?timeout=25000&style=all_docs&heartbeat=10000&since=135%3A%3A137&limit=100&_nonce=1452967455847
2016-01-16T12:04:15.849-06:00 Changes: MultiChangesFeed({*}, {Since:135::137 Limit:100 Conflicts:true IncludeDocs:false Wait:false Continuous:false Terminator:0xc2083f0900 HeartbeatMs:25000 TimeoutMs:25000}) ... 
2016-01-16T12:04:15.849-06:00 Changes+: MultiChangesFeed: channels expand to channels.TimedSet{"!":0x1, "*":0x1} ... 
2016-01-16T12:04:15.850-06:00 Changes+: MultiChangesFeed sending &{Seq:135::137 ID:1 Deleted:false Removed:{} Doc:map[] Changes:[map[rev:114-5ae905a9dfc434fa0b9a701c37567c98] map[rev:14-6f3ec4f5be3369a924fed4ddb4a2626f] map[rev:115-5f6d5ec12365fe0c6339f5f3c952748d]] Err:<nil> branched:true} 
2016-01-16T12:04:15.850-06:00 Changes: MultiChangesFeed done 
```


