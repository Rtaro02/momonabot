var Twitter = require('twitter');
const credential = require('./credential.js');

var client = new Twitter({
    consumer_key: credential.keys.consumer_key,
    consumer_secret: credential.keys.consumer_secret,
    access_token_key: credential.keys.access_token_key,
    access_token_secret: credential.keys.access_token_secret
});

exports.post = function(content) {
  client.post('statuses/update', {status: content}, function(error, tweet, response) {
    if (!error) {
      console.log("tweet success: " + content);
    } else {
      console.log(error);
    }
  });
}
