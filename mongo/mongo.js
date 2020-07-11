const mongodb = require('mongodb');
const URI = 'mongodb://root:example@mongohost:27017'; 
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const MongoClient = mongodb.MongoClient;
const DB = 'fetch_result';
const AMEBA = 'ameba';
const ELINE = 'eline';
const HPFC = 'HPFC';

exports.addAmebaResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(AMEBA).insertOne(obj);
    client.close();
    return result.insertedCount;
}

exports.findAmebaResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(AMEBA).findOne(obj);
    client.close();
    return result;
}

exports.addElineResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(ELINE).insertOne(obj);
    client.close();
    return result.insertedCount;
}

exports.findElineResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(ELINE).findOne(obj);
    client.close();
    return result;
}

exports.addHpfcResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(HPFC).insertOne(obj);
    client.close();
    return result.insertedCount;
}

exports.findHpfcResult = async function(obj) {
    var client = await MongoClient.connect(URI, OPTIONS);
    const db = client.db(DB);
    var result = await db.collection(HPFC).findOne(obj);
    client.close();
    return result;
}