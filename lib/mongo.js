//@concept Library MONGO file

//@o Require from mongodb package
const { MongoClient, ObjectId } = require('mongodb');

//@o Require debug and set a namespace for DB related themes.
const debug = require('debug')('app:db');

//@o Require the config file
const { config } = require('../config');

//@o Create env vars const
//@o With the encodeURIComponent we ensure that if there's any special character won't have connection problems.
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//@o Create the MongoDB URI
//@o As this is an standard from MONGO we don't have to set the DB port.
//@o A recommended configuration for MONGO is retryWrites=true&w=majority
let MONGO_URI = '';
if(config.dev){
  MONGO_URI = `mongodb://${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;
}else{
  MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
}


//@o Create the MONGO Library
class MongoLib {
  constructor() {
    //@o With useNewUrlParser let use the last configuration or Parser
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  /**
   * @o Implement the connect Method by the singleton pattern
   * @o The idea it's that every time we connect to DB don't create a new client.
   * @o If the client and the connection already exists use it. This way we avoid to saturate connections and errors.
  **/
  connect() {
    //@o If the connection doesn't exist create one
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          debug('Successfully connected to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    //@o If the connection exists return it
    return MongoLib.connection;
  }

  //@o Return all the elements.
  getAll(collection, query) {
    //@o For every action we need to return the created connection
    return this.connect().then(db => {
      /**
       * @o Return the db so we return the promise and can use it async
       * @o Then call the collection by the name we pass to the func and then pass an optional query with a find
       * @o Last so it can be used as a json convert it to an array.
      **/
      return db.collection(collection).find(query).toArray();
    });
  }

  //@o Return one element.
  get(collection, id) {
    return this.connect().then(db => {
      //@o In this case we use the findOne function
      //@o Pass a created query where going to find by id, enclosing it with the method ObjectId
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  //@o Creates an element.
  create(collection, data) {
    return this.connect().then(db => {
      //@o To crete use the method insertOne and will pass the data that the function receive.
      return db.collection(collection).insertOne(data);
    }).then(result => result.insertedId);
    //@o As we are creating a new element, at the end of the function we return the id of the new element
  }

  //@o Update an element.
  update(collection, id, data) {
    return this.connect().then(db => {
      /**
       * @o This it's a little trickier than create because we want to find if the element exist, so we pass the query as finOne
       * @o Then if it exists or not, with the $set keyword tell mongo that update it or crete it.
       * @o Finally with the keyword upsert (combination of update and insert) we declare that we want this functionality as true
      **/
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    }).then(result => result.upsertedId || id);
    //@o Return the id of the updated element
  }

  //@o Delete an element.
  delete(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) });
    }).then(() => id);
    //@o When deleting a element lastly we don't have an id of this action.
    //@o So we return the id of the element we ask to delete.
  }

}

module.exports = MongoLib;