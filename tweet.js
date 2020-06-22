var Twitter = require('twitter');

const consumer_key = "";
const consumer_secret = "";
const access_token_key = "";
const access_token_secret = "";

var client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
});

function tweetPost(content) {
    client.post('statuses/update', {status: content}, function(error, tweet, response) {
      if (!error) {
        console.log("tweet success: " + content);
      } else {
        console.log(error);
      }
    });
}

tweetPost(process.argv[2]);