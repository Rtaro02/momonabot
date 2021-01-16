var Twitter = require('twitter');
const credential = require('../secret/credential.js');

var client = new Twitter({
    consumer_key: credential.keys.consumer_key,
    consumer_secret: credential.keys.consumer_secret,
    access_token_key: credential.keys.access_token_key,
    access_token_secret: credential.keys.access_token_secret
});

exports.post = async function(content) {
  try {
    await client.post('statuses/update', {status: content});
    console.log(new Date()+ ' tweet success: ' + content);
  } catch(e) {
    console.log(e)
    if(Array.isArray(e) && e.length > 0 && e[0].code) {
      return null;
    } else {
      return e;
    }
  }
}