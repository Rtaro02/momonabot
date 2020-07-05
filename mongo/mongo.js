const mongodb = require('mongodb');
const URI = "mongodb://root:example@mongohost:27017"; 
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const MongoClient = mongodb.MongoClient;
const DB = 'fetch_result';
const COLLECTION = 'ameba';

exports.addAmebaResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(COLLECTION).insertOne(obj);
    client.close();
    return result.insertedCount;
}

exports.findAmebaResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(COLLECTION).findOne(obj);
    client.close();
    return result;
}
