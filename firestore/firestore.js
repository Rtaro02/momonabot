const admin = require('firebase-admin');
const serviceAccount = require('../secret/momonabot-firestore-sa.json');
const AMEBA = "ameba";
const ELINE = 'eline';
const HPFC = 'hpfc';
const INSTAGRAM = 'instagram';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

function removeSlash(url) {
  return url.replace(/\//g, "");
}

async function saveData(collection, document, field) {
  db.collection(collection).doc(document).set(field);
}

exports.addAmebaResult = async function(obj) {
  await saveData(AMEBA, removeSlash(obj.url), obj)
}

exports.addElineResult = async function(obj) {
  await saveData(ELINE, removeSlash(obj.url), obj)
}

exports.addHpFcResult = async function(obj) {
  await saveData(HPFC, removeSlash(obj.url), obj)
}

exports.addInstagramResult = async function(obj) {
  await saveData(INSTAGRAM, removeSlash(obj.url), obj)
}

async function findData(collection, key, value) {
  var snapshot = await db.collection(collection).where(key, '==', value).get().then();
  if (snapshot.empty) {
    return;
  }
  var result;
  snapshot.forEach(doc => {
    result = doc.data();
  });
  return result;
}

exports.findAmebaResult = async function(value) {
  return await findData(AMEBA, 'url', value);
}

exports.findElineResult = async function(value) {
  return await findData(ELINE, 'url', value);
}

exports.findHpFcResult = async function(value) {
  return await findData(HPFC, 'url', value);
}

exports.findInstagramResult = async function(value) {
  return await findData(INSTAGRAM, 'url', value);
}